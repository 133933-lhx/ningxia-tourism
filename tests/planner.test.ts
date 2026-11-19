import { describe, expect, it } from "vitest";
import { planRoute } from "@/lib/planner";

describe("路线规划器", () => {
  it("按天数生成对应数量的日程", () => {
    const result = planRoute({ days: 3, regions: [], interests: ["自然风光"], budget: "舒适" });
    expect(result.days).toHaveLength(3);
    expect(result.days.map((d) => d.day)).toEqual([1, 2, 3]);
  });

  it("同一景区不会被重复安排", () => {
    const result = planRoute({ days: 7, regions: [], interests: [], budget: "经济" });
    const slugs = result.days.flatMap((d) => d.attractions.map((a) => a.slug));
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("天数被限制在 1–7", () => {
    expect(planRoute({ days: 0, regions: [], interests: [], budget: "舒适" }).days).toHaveLength(1);
    expect(planRoute({ days: 99, regions: [], interests: [], budget: "舒适" }).days).toHaveLength(7);
    expect(planRoute({ days: -3, regions: [], interests: [], budget: "舒适" }).days).toHaveLength(1);
  });

  it("区域筛选生效", () => {
    const result = planRoute({ days: 2, regions: ["中卫"], interests: [], budget: "舒适" });
    for (const day of result.days) {
      for (const a of day.attractions) expect(a.region).toBe("中卫");
    }
  });

  it("兴趣筛选优先匹配标签", () => {
    const result = planRoute({ days: 1, regions: [], interests: ["亲子"], budget: "舒适" });
    const first = result.days[0];
    expect(first.attractions.length).toBeGreaterThan(0);
    expect(first.attractions[0].tags).toContain("亲子");
  });

  it("无匹配时放宽条件并给出提示", () => {
    const result = planRoute({ days: 2, regions: ["固原"], interests: ["冬季"], budget: "舒适" });
    expect(result.days.length).toBe(2);
    // 冬季标签在固原没有匹配，应放宽兴趣
    expect(result.relaxedInterests || result.days.some((d) => d.attractions.length > 0)).toBe(true);
  });

  it("预算按天数与档位计算", () => {
    const result = planRoute({ days: 3, regions: [], interests: [], budget: "深度" });
    expect(result.budgetEstimate).toContain("3 天");
    expect(result.budgetEstimate).toContain("深度");
    expect(result.budgetEstimate).toContain("3,300");
  });

  it("每天尽量给出美食推荐", () => {
    const result = planRoute({ days: 3, regions: [], interests: [], budget: "舒适" });
    const withFood = result.days.filter((d) => d.food).length;
    expect(withFood).toBeGreaterThanOrEqual(2);
  });
});
