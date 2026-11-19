import { describe, expect, it } from "vitest";
import { attractions } from "@/content/attractions";
import { foods } from "@/content/foods";
import { routes } from "@/content/routes";
import { dialectEntries } from "@/content/dialect";

const unique = (values: string[]) => new Set(values).size === values.length;

describe("内容数据完整性", () => {
  it("数量达到 MVP 目标", () => {
    expect(attractions.length).toBeGreaterThanOrEqual(10);
    expect(foods.length).toBeGreaterThanOrEqual(20);
    expect(routes.length).toBeGreaterThanOrEqual(8);
    expect(dialectEntries.length).toBeGreaterThanOrEqual(150);
  });

  it("slug / id 唯一", () => {
    expect(unique(attractions.map((a) => a.slug))).toBe(true);
    expect(unique(foods.map((f) => f.slug))).toBe(true);
    expect(unique(routes.map((r) => r.slug))).toBe(true);
    expect(unique(dialectEntries.map((d) => d.id))).toBe(true);
  });

  it("景区缺少必填字段", () => {
    for (const a of attractions) {
      expect(a.name.length, a.slug).toBeGreaterThan(1);
      expect(a.summary.length, a.slug).toBeGreaterThan(20);
      expect(a.highlights.length, a.slug).toBeGreaterThanOrEqual(3);
      expect(a.sources.length, a.slug).toBeGreaterThan(0);
      expect(Number.isFinite(a.coords.lat), a.slug).toBe(true);
      expect(Number.isFinite(a.coords.lng), a.slug).toBe(true);
    }
  });

  it("美食缺少必填字段", () => {
    for (const f of foods) {
      expect(f.summary.length, f.slug).toBeGreaterThan(15);
      expect(f.story.length, f.slug).toBeGreaterThan(10);
      expect(f.flavorTags.length, f.slug).toBeGreaterThan(0);
      expect(f.sources.length, f.slug).toBeGreaterThan(0);
    }
  });

  it("路线天数与逐日安排一致", () => {
    for (const r of routes) {
      expect(r.dayPlans.length, r.slug).toBe(r.days);
      expect(r.dayPlans.map((d) => d.day).sort((a, b) => a - b), r.slug).toEqual(
        Array.from({ length: r.days }, (_, i) => i + 1),
      );
      for (const day of r.dayPlans) {
        expect(day.items.length, `${r.slug}-d${day.day}`).toBeGreaterThan(0);
        for (const item of day.items) expect(item.title.length).toBeGreaterThan(0);
      }
    }
  });

  it("路线里的景区引用都存在", () => {
    const slugs = new Set(attractions.map((a) => a.slug));
    const foodSlugs = new Set(foods.map((f) => f.slug));
    for (const r of routes) {
      for (const day of r.dayPlans) {
        for (const item of day.items) {
          if (!item.refSlug) continue;
          if (item.kind === "景区") expect(slugs.has(item.refSlug), item.refSlug).toBe(true);
          if (item.kind === "美食") expect(foodSlugs.has(item.refSlug), item.refSlug).toBe(true);
        }
      }
    }
  });

  it("方言语义字段合法", () => {
    for (const d of dialectEntries) {
      expect(d.mandarin.length, d.id).toBeGreaterThan(0);
      expect(d.dialect.length, d.id).toBeGreaterThan(0);
      expect(d.pinyin.length, d.id).toBeGreaterThan(0);
      expect([1, 2, 3]).toContain(d.confidence);
      expect(d.sources.length, d.id).toBeGreaterThan(0);
      for (const ex of d.examples) {
        expect(ex.mandarin.length).toBeGreaterThan(0);
        expect(ex.dialect.length).toBeGreaterThan(0);
      }
    }
  });

  it("所有内容默认标记为待核实", () => {
    expect(attractions.every((a) => a.verified === false)).toBe(true);
    expect(foods.every((f) => f.verified === false)).toBe(true);
    expect(routes.every((r) => r.verified === false)).toBe(true);
    expect(dialectEntries.every((d) => d.verified === false)).toBe(true);
  });
});
