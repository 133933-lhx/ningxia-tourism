import { describe, expect, it } from "vitest";
import { buildRetrievalAnswer, isRefusal, search, tokenize } from "@/lib/retriever";

describe("分词与检索", () => {
  it("中文按 bigram 切分", () => {
    const tokens = tokenize("沙坡头");
    expect(tokens).toContain("沙坡");
    expect(tokens).toContain("坡头");
  });

  it("能检索到对应景区", () => {
    const hits = search("沙坡头", 3);
    expect(hits.length).toBeGreaterThan(0);
    expect(hits[0].chunk.id).toBe("attraction-shapotou");
  });

  it("能检索到美食", () => {
    const hits = search("手抓羊肉", 3);
    expect(hits[0].chunk.kind).toBe("food");
    expect(hits[0].chunk.id).toBe("food-shouzhua-yangrou");
  });

  it("能检索到方言词条", () => {
    const hits = search("咥饭", 3);
    expect(hits[0].chunk.kind).toBe("dialect");
  });

  it("能检索到路线", () => {
    const hits = search("三天 经典 路线", 5);
    expect(hits.some((h) => h.chunk.kind === "route")).toBe(true);
  });

  it("空查询返回空结果", () => {
    expect(search("   ")).toEqual([]);
  });

  it("站内问题给出答案与引用", () => {
    const res = buildRetrievalAnswer("沙坡头门票多少钱？");
    expect(res.mode).toBe("retrieval");
    expect(res.citations.length).toBeGreaterThan(0);
    expect(res.answer).toContain("沙坡头");
    expect(res.confidence).toBeGreaterThan(0);
  });

  it("方言问题会引用方言词条", () => {
    const res = buildRetrievalAnswer("咥饭是什么意思");
    expect(res.confidence).toBeGreaterThan(0);
    expect(res.citations.some((c) => c.id.startsWith("dialect-") || c.title.includes("方言"))).toBe(true);
  });

  it("口语化的亲子问题也能命中", () => {
    const res = buildRetrievalAnswer("带小孩去哪个景区合适？");
    expect(res.citations.length).toBeGreaterThan(0);
    expect(res.confidence).toBeGreaterThan(0);
  });

  it("完全无关的问题应拒答", () => {
    const res = buildRetrievalAnswer("请帮我写一段 Python 排序算法");
    expect(res.confidence).toBe(0);
    expect(res.citations).toHaveLength(0);
    expect(res.answer).toContain("抱歉");
  });

  it("isRefusal 对站内问题为假", () => {
    expect(isRefusal(search("西夏王陵开放时间", 3))).toBe(false);
  });
});
