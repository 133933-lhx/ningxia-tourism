import { attractions } from "@/content/attractions";
import { foods } from "@/content/foods";
import { routes } from "@/content/routes";
import { dialectEntries } from "@/content/dialect";
import type { AskCitation, AskResponse } from "@/types/content";

/**
 * 轻量中文检索：bigram 分词 + BM25。
 * 目标是在没有向量库、没有大模型的情况下，仍能从站内内容里找出最相关的片段。
 */

export interface Chunk {
  id: string;
  title: string;
  href: string;
  kind: "attraction" | "food" | "route" | "dialect";
  text: string;
  tokens: string[];
}

export interface SearchHit {
  chunk: Chunk;
  score: number;
  matchedTerms: string[];
  /** 命中词在「站内已知词」中的 idf 占比，0–1，用于判断相关度 */
  coverage: number;
}

const CJK = /[\u4e00-\u9fff]/;
const ASCII_WORD = /[a-z0-9]/;

export function tokenize(input: string): string[] {
  const text = input.toLowerCase();
  const out: string[] = [];
  let run = "";
  let word = "";

  const flushRun = () => {
    if (!run) return;
    const chars = [...run];
    if (chars.length === 1) {
      out.push(chars[0]);
    } else {
      for (let i = 0; i < chars.length - 1; i += 1) out.push(chars[i] + chars[i + 1]);
      for (const c of chars) out.push(c);
    }
    run = "";
  };
  const flushWord = () => {
    if (word) out.push(word);
    word = "";
  };

  for (const ch of text) {
    if (CJK.test(ch)) {
      flushWord();
      run += ch;
    } else if (ASCII_WORD.test(ch)) {
      flushRun();
      word += ch;
    } else {
      flushRun();
      flushWord();
    }
  }
  flushRun();
  flushWord();
  return out;
}

function buildChunks(): Chunk[] {
  const chunks: Chunk[] = [];

  for (const a of attractions) {
    const text = [
      `${a.name}位于宁夏${a.region}，属于${a.type}类景区。`,
      `${a.summary}。`,
      `亮点：${a.highlights.join("；")}。`,
      `开放时间：${a.hours}。`,
      `门票：${a.ticket}。`,
      `交通：${a.transport}。`,
      `最佳季节：${a.bestSeason}。`,
      `标签：${a.tags.join("、")}。`,
    ].join("");
    chunks.push({ id: `attraction-${a.slug}`, title: a.name, href: `/attractions/${a.slug}`, kind: "attraction", text, tokens: tokenize(text) });
  }

  for (const f of foods) {
    const text = [
      `${f.name}是宁夏${f.region}的地方美食。`,
      `${f.summary}。`,
      `${f.story}。`,
      `口味特点：${f.flavorTags.join("、")}。`,
      `参考价格：${f.priceRange}。`,
    ].join("");
    chunks.push({ id: `food-${f.slug}`, title: `${f.name}（美食）`, href: `/foods/${f.slug}`, kind: "food", text, tokens: tokenize(text) });
  }

  for (const r of routes) {
    const dayText = r.dayPlans
      .map((d) => `第${d.day}天在${d.region}，${d.title}。`)
      .join("");
    const text = [
      `${r.title}，共${r.days}天，覆盖${r.regions.join("、")}，主题是${r.theme}。`,
      `${r.summary}。`,
      `预算参考：${r.budget}。`,
      `路线标签：${r.tags.join("、")}。`,
      dayText,
    ].join("");
    chunks.push({ id: `route-${r.slug}`, title: r.title, href: `/routes/${r.slug}`, kind: "route", text, tokens: tokenize(text) });
  }

  for (const d of dialectEntries) {
    const exampleText = d.examples.length
      ? `例句：${d.examples.map((x) => `${x.mandarin}说成「${x.dialect}」`).join("；")}。`
      : "";
    const text = [
      `普通话「${d.mandarin}」在${d.region}方言里说「${d.dialect}」。`,
      `读音：${d.pinyin}。`,
      `${d.note}。`,
      exampleText,
    ].join("");
    chunks.push({ id: `dialect-${d.id}`, title: `方言：${d.mandarin} → ${d.dialect}`, href: `/dialect?q=${encodeURIComponent(d.mandarin)}`, kind: "dialect", text, tokens: tokenize(text) });
  }

  return chunks;
}

let cache: { chunks: Chunk[]; df: Map<string, number>; avgdl: number } | null = null;

function getIndex() {
  if (cache) return cache;
  const chunks = buildChunks();
  const df = new Map<string, number>();
  let total = 0;
  for (const c of chunks) {
    total += c.tokens.length;
    for (const t of new Set(c.tokens)) df.set(t, (df.get(t) ?? 0) + 1);
  }
  cache = { chunks, df, avgdl: chunks.length ? total / chunks.length : 0 };
  return cache;
}

const K1 = 1.5;
const B = 0.75;

/** 这类疑问/虚词词元对定位内容没帮助，反而会把方言词条等无关内容拉进来。 */
const STOPWORDS = new Set([
  "怎么",
  "么样",
  "什么",
  "一下",
  "请问",
  "可以",
  "如何",
  "我们",
  "这个",
  "那个",
  "是不",
  "不是",
  "知道",
  "告诉",
  "哪个",
  "合适",
]);

/** 口语句子和站内书面标签之间的桥：把口语词展开成站内用词。 */
const SYNONYMS: Array<[string, string[]]> = [
  ["小孩", ["亲子"]],
  ["孩子", ["亲子"]],
  ["儿童", ["亲子"]],
  ["带娃", ["亲子"]],
  ["遛娃", ["亲子"]],
  ["票价", ["门票"]],
  ["多少钱", ["门票", "价格"]],
  ["贵不贵", ["门票", "价格"]],
  ["怎么去", ["交通"]],
  ["怎么走", ["交通"]],
  ["玩什么", ["体验项目"]],
  ["好玩", ["体验项目"]],
  ["吃什么", ["美食"]],
  ["好吃", ["美食"]],
  ["住哪", ["住宿"]],
];

export function search(query: string, k = 5): SearchHit[] {
  const { chunks, df, avgdl } = getIndex();
  const expansions = SYNONYMS.filter(([key]) => query.includes(key)).flatMap(([, values]) => values);
  const expanded = expansions.length ? `${query} ${expansions.join(" ")}` : query;
  const allTerms = [...new Set(tokenize(expanded))];
  let qTerms = allTerms.filter((t) => !STOPWORDS.has(t));
  if (!qTerms.length) qTerms = allTerms;
  if (qTerms.length === 0) return [];
  const N = chunks.length;

  const idf = (t: string) => {
    const n = df.get(t) ?? 0;
    return Math.log(1 + (N - n + 0.5) / (n + 0.5));
  };

  // 覆盖率按「多字词命中数 / 多字词总数」算：单字（我、的、是）信号太弱，不参与。
  const strongTerms = qTerms.filter((t) => t.length >= 2);
  const useStrong = strongTerms.length > 0;
  const denominator = useStrong ? strongTerms.length : qTerms.length;

  const hits: SearchHit[] = [];
  for (const chunk of chunks) {
    if (!chunk.tokens.length) continue;
    const tf = new Map<string, number>();
    for (const t of chunk.tokens) tf.set(t, (tf.get(t) ?? 0) + 1);
    let score = 0;
    const matched: string[] = [];
    for (const q of qTerms) {
      const freq = tf.get(q);
      if (!freq) continue;
      const denom = freq + K1 * (1 - B + (B * chunk.tokens.length) / (avgdl || 1));
      score += idf(q) * ((freq * (K1 + 1)) / denom);
      matched.push(q);
    }
    if (score > 0) {
      // 标题命中优先：用户搜「沙坡头」时，景点详情页应排在提到它的路线之前。
      const trimmed = query.trim();
      if (chunk.title === trimmed) score += 6;
      else if (trimmed.length >= 2 && chunk.title.includes(trimmed)) score += 3;
      const matchedDenominatorTerms = matched.filter((t) => (useStrong ? t.length >= 2 : true));
      hits.push({
        chunk,
        score,
        matchedTerms: matched,
        coverage: denominator > 0 ? matchedDenominatorTerms.length / denominator : 0,
      });
    }
  }

  return hits.sort((a, b) => b.score - a.score).slice(0, k);
}

const SENTENCE_SPLIT = /(?<=[。！？；])|\n/;
const ATTRIBUTE_LABELS = ["门票", "开放时间", "交通", "最佳季节", "价格", "预算", "读音", "亮点"];

function pickSentences(text: string, terms: string[], query: string, limit = 3): string[] {
  const sentences = text
    .split(SENTENCE_SPLIT)
    .map((s) => s.trim())
    .filter((s) => s.length > 3);

  const scored = sentences
    .map((s) => {
      const lower = s.toLowerCase();
      let score = terms.reduce((acc, t) => (lower.includes(t) ? acc + 1 : acc), 0);
      // 问「门票/交通/开放时间」时，优先把对应字段的句子挑出来
      for (const label of ATTRIBUTE_LABELS) {
        if (query.includes(label) && s.includes(label)) score += 3;
      }
      return { s, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored
    .filter((x) => x.score > 0)
    .slice(0, limit)
    .map((x) => x.s);
}

export function isRefusal(hits: SearchHit[]): boolean {
  if (hits.length === 0) return true;
  const top = hits[0];
  return top.coverage < 0.2 || top.score < 3;
}

const DISCLAIMER =
  "本回答由站内资料自动整理，票务、开放时间等信息请以景区与官方发布为准。";

export function buildRetrievalAnswer(question: string): AskResponse {
  const hits = search(question, 5);

  if (isRefusal(hits)) {
    const suggestions = ["沙坡头怎么玩", "宁夏有哪些必吃美食", "三天时间怎么安排", "「咥饭」是什么意思"];
    return {
      answer:
        `抱歉，站内资料里没有找到与「${question}」足够相关的内容，所以不猜测作答。\n\n` +
        `你可以试试这些方向：\n- ${suggestions.join("\n- ")}\n\n` +
        `如果问题超出本站范围（如实时天气、交通班次），建议查官方渠道。`,
      citations: [],
      mode: "retrieval",
      confidence: 0,
      disclaimer: DISCLAIMER,
    };
  }

  const top = hits.filter((h) => h.coverage >= hits[0].coverage * 0.85).slice(0, 3);
  const lines: string[] = [];
  const citations: AskCitation[] = [];

  for (const hit of top) {
    const sentences = pickSentences(hit.chunk.text, hit.matchedTerms, question, 2);
    const snippet = sentences.join("") || hit.chunk.text.slice(0, 90);
    if (snippet) lines.push(`- **${hit.chunk.title}**：${snippet}`);
    citations.push({
      id: hit.chunk.id,
      title: hit.chunk.title,
      href: hit.chunk.href,
      snippet: snippet.slice(0, 80),
    });
  }

  const confidence = Number(hits[0].coverage.toFixed(2));
  const lowConfidence = hits[0].coverage < 0.4;

  return {
    answer:
      `关于「${question}」，本站资料整理如下：\n\n` +
      lines.join("\n") +
      (lowConfidence ? "\n\n（相关度一般，以上信息仅供参考。）" : ""),
    citations,
    mode: "retrieval",
    confidence,
    disclaimer: DISCLAIMER,
  };
}

export const SAMPLE_QUESTIONS = [
  "沙坡头怎么玩？门票多少？",
  "宁夏有哪些必吃美食？",
  "三天时间怎么安排路线？",
  "「咥饭」在宁夏话里是什么意思？",
  "带小孩去哪个景区合适？",
  "西夏王陵和贺兰山岩画能一天看完吗？",
];
