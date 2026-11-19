import { describe, expect, it } from "vitest";
import { translate } from "@/lib/dialect";

describe("方言翻译", () => {
  it("普通话转方言（基础词）", () => {
    const res = translate("吃饭", "m2d");
    expect(res.translation).toBe("咥饭");
    expect(res.confidence).toBe(3);
  });

  it("方言转普通话", () => {
    const res = translate("咥饭", "d2m");
    expect(res.translation).toBe("吃饭");
  });

  it("整句部分命中，未收录部分原样保留", () => {
    const res = translate("吃饭了吗", "m2d");
    expect(res.translation).toContain("咥饭");
    expect(res.unmatched.length).toBeGreaterThan(0);
    expect(res.translation.length).toBeGreaterThan(0);
  });

  it("成语/长词优先于单字匹配", () => {
    const res = translate("不要着急", "m2d");
    expect(res.translation).toContain("嫑");
    expect(res.translation).not.toContain("不要");
  });

  it("区域参数不影响通用词", () => {
    const res = translate("吃饭", "m2d", "银川");
    expect(res.translation).toBe("咥饭");
  });

  it("空输入返回提示", () => {
    const res = translate("   ", "m2d");
    expect(res.translation).toBe("");
    expect(res.note).toContain("请输入");
  });

  it("完全未收录时置信度为低并提示", () => {
    const res = translate("量子纠缠", "m2d");
    expect(res.confidence).toBe(1);
    expect(res.segments.every((s) => !s.matched)).toBe(true);
    expect(res.note).toContain("未命中词典");
  });

  it("输出字段结构完整", () => {
    const res = translate("今天天气咋样", "m2d");
    expect(Array.isArray(res.segments)).toBe(true);
    expect(Array.isArray(res.unmatched)).toBe(true);
    expect(typeof res.translation).toBe("string");
    expect([1, 2, 3]).toContain(res.confidence);
  });
});
