import { dialectEntries } from "@/content/dialect";
import type { DialectRegion, DialectResponse, DialectSegment } from "@/types/content";

export type Direction = "m2d" | "d2m";

interface Keyed {
  key: string;
  entryId: string;
  out: string;
  confidence: 1 | 2 | 3;
  note: string;
}

function preferRegion(entryRegion: DialectRegion, region?: DialectRegion): number {
  if (!region || region === "通用") return entryRegion === "通用" ? 0 : 1;
  if (entryRegion === region) return 0;
  if (entryRegion === "通用") return 1;
  return 2;
}

/**
 * 把词条展开为「匹配键 -> 输出」的列表，按 key 长度降序排列（最长匹配优先）。
 */
function buildKeys(direction: Direction, region?: DialectRegion): Keyed[] {
  const usable = dialectEntries
    .filter((d) => d.confidence >= 1)
    .slice()
    .sort((a, b) => preferRegion(a.region, region) - preferRegion(b.region, region));

  const seen = new Set<string>();
  const keys: Keyed[] = [];
  for (const d of usable) {
    const key = direction === "m2d" ? d.mandarin : d.dialect;
    if (!key || seen.has(key)) continue;
    seen.add(key);
    keys.push({
      key,
      entryId: d.id,
      out: direction === "m2d" ? d.dialect : d.mandarin,
      confidence: d.confidence,
      note: d.note,
    });
  }
  return keys.sort((a, b) => b.key.length - a.key.length);
}

function matchAt(text: string, index: number, keys: Keyed[], multiOnly: boolean): Keyed | null {
  for (const k of keys) {
    if (multiOnly && k.key.length < 2) continue;
    if (text.startsWith(k.key, index)) return k;
  }
  return null;
}

export function translate(
  rawInput: string,
  direction: Direction,
  region?: DialectRegion,
): DialectResponse {
  const input = rawInput.trim();
  if (!input) {
    return {
      translation: "",
      segments: [],
      confidence: 1,
      unmatched: [],
      note: "请输入要翻译的内容。",
    };
  }

  const keys = buildKeys(direction, region);
  const segments: DialectSegment[] = [];
  const unmatched: string[] = [];
  let buffer = "";
  let i = 0;

  const flushBuffer = () => {
    if (!buffer) return;
    segments.push({ src: buffer, out: buffer, note: "词典未收录，原样保留", confidence: 1, matched: false });
    if (!unmatched.includes(buffer)) unmatched.push(buffer);
    buffer = "";
  };

  while (i < input.length) {
    const hit = matchAt(input, i, keys, input.length > 1);
    if (hit) {
      flushBuffer();
      segments.push({
        src: hit.key,
        out: hit.out,
        note: hit.note || undefined,
        confidence: hit.confidence,
        matched: true,
      });
      i += hit.key.length;
    } else {
      buffer += input[i];
      i += 1;
    }
  }
  flushBuffer();

  const matchedSegments = segments.filter((s) => s.matched);
  const confidence: 1 | 2 | 3 = matchedSegments.length
    ? (Math.min(...matchedSegments.map((s) => s.confidence)) as 1 | 2 | 3)
    : 1;

  const notes: string[] = [];
  if (direction === "m2d") notes.push("方言写法为汉字记音，读音以当地口音为准。");
  else notes.push("方言转普通话按词典与常见词序推断，多义词可能不准确。");
  if (unmatched.length) notes.push(`有 ${unmatched.length} 处未收录，已原样保留。`);
  if (matchedSegments.length === 0) notes.push("整句未命中词典，建议人工确认。");

  return {
    translation: segments.map((s) => s.out).join(""),
    segments,
    confidence,
    unmatched,
    note: notes.join(" "),
  };
}
