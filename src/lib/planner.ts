import { attractions, getAttraction } from "@/content/attractions";
import { foods } from "@/content/foods";
import type { Attraction, Food, Region } from "@/types/content";

export type BudgetLevel = "经济" | "舒适" | "深度";

export const INTERESTS = ["自然风光", "历史人文", "美食", "亲子", "摄影", "徒步", "冬季"] as const;
export type Interest = (typeof INTERESTS)[number];

export const BUDGET_LEVELS: BudgetLevel[] = ["经济", "舒适", "深度"];

const INTEREST_TAGS: Record<Interest, string[]> = {
  自然风光: ["自然", "湖泊", "湿地", "峡谷", "沙漠", "森林", "观鸟"],
  历史人文: ["历史", "西夏", "岩画", "石窟", "人文", "考古", "长城", "红色旅游", "佛教艺术", "影视", "博物馆"],
  美食: [],
  亲子: ["亲子"],
  摄影: ["摄影"],
  徒步: ["徒步"],
  冬季: ["冬季"],
};

export interface PlanInput {
  days: number;
  regions: Region[];
  interests: Interest[];
  budget: BudgetLevel;
}

export interface PlanDay {
  day: number;
  region: Region;
  attractions: Attraction[];
  food?: Food;
  note: string;
}

export interface PlanResult {
  days: PlanDay[];
  budgetEstimate: string;
  warnings: string[];
  relaxedInterests: boolean;
  relaxedRegions: boolean;
}

const REGION_ORDER: Region[] = ["银川", "石嘴山", "吴忠", "中卫", "固原"];

const PER_DAY_BUDGET: Record<BudgetLevel, number> = {
  经济: 350,
  舒适: 700,
  深度: 1100,
};

function scoreAttraction(a: Attraction, interests: Interest[], regions: Region[]): number {
  let score = 0;
  if (regions.length && regions.includes(a.region)) score += 2;
  for (const interest of interests) {
    if (interest === "美食") continue;
    const tags = INTEREST_TAGS[interest] ?? [];
    if (a.tags.some((t) => tags.includes(t))) score += 3;
  }
  if (a.tags.includes("5A")) score += 1;
  return score;
}

function pickFoodFor(region: Region, used: Set<string>, attraction?: Attraction): Food | undefined {
  if (attraction?.tags.includes("黄河") || attraction?.tags.includes("沙漠")) {
    // 沙漠/黄河沿线优先推荐当地面食与羊肉
  }
  const local = foods.filter((f) => f.region === region && !used.has(f.slug));
  if (local.length) return local[0];
  const paired = foods.filter(
    (f) => attraction && f.pairWith?.includes(attraction.slug) && !used.has(f.slug),
  );
  return paired[0] ?? foods.find((f) => !used.has(f.slug));
}

export function planRoute(input: PlanInput): PlanResult {
  const warnings: string[] = [];
  const days = Math.min(7, Math.max(1, Math.round(Number(input.days) || 1)));
  if (days !== input.days) warnings.push(`天数已调整为 ${days} 天（支持 1–7 天）。`);

  const regions = input.regions.length ? input.regions : [];
  const interests = input.interests.length ? input.interests : [...INTERESTS];

  // 选了区域就严格限定在该区域内，否则「按兴趣」会把其他区域的景区带进来。
  const regionPool = regions.length ? attractions.filter((a) => regions.includes(a.region)) : attractions;

  let pool = regionPool
    .map((a) => ({ a, score: scoreAttraction(a, interests, regions) }))
    .filter((x) => x.score > 0);

  let relaxedInterests = false;
  let relaxedRegions = false;

  if (!pool.length) {
    relaxedInterests = true;
    pool = regionPool.map((a) => ({ a, score: scoreAttraction(a, [], regions) }));
    warnings.push("所选兴趣在目标区域内没有匹配的景区，已放宽兴趣条件。");
  }
  if (!pool.length) {
    relaxedRegions = true;
    pool = attractions.map((a) => ({ a, score: 1 }));
    warnings.push("所选区域没有可安排的景区，已放宽区域条件。");
  }

  const scored = pool.sort((x, y) => y.score - x.score);
  const candidates = scored.map((x) => x.a);

  // 按区域聚拢候选，避免「银川 → 固原 → 吴忠」这种来回横穿宁夏的排法。
  const byRegion = new Map<Region, Attraction[]>();
  for (const { a } of scored) {
    const list = byRegion.get(a.region) ?? [];
    list.push(a);
    byRegion.set(a.region, list);
  }
  const regionRank = [...byRegion.entries()]
    .map(([region, list]) => ({
      region,
      list,
      score: list.reduce((sum, a) => sum + scoreAttraction(a, interests, regions), 0),
    }))
    .sort((x, y) => y.score - x.score);

  // 最多铺开 3 个区域；天数多时优先给候选多的区域补天。
  const chosen = regionRank.slice(0, Math.min(days, 3, regionRank.length));
  const dayRegions: Region[] = [];
  for (let i = 0; i < days; i += 1) dayRegions.push(chosen[i % chosen.length].region);
  dayRegions.sort((x, y) => REGION_ORDER.indexOf(x) - REGION_ORDER.indexOf(y));

  const usedAttractions = new Set<string>();
  const usedFoods = new Set<string>();
  const plan: PlanDay[] = [];
  const poolByRegion = new Map<Region, Attraction[]>(
    chosen.map((c) => [c.region, c.list]),
  );

  for (let day = 1; day <= days; day += 1) {
    const region = dayRegions[day - 1];
    const localList = (poolByRegion.get(region) ?? []).filter((a) => !usedAttractions.has(a.slug));
    const picked = localList.slice(0, 2);

    if (!picked.length) {
      const fallback = candidates.find((a) => !usedAttractions.has(a.slug));
      if (!fallback) {
        plan.push({
          day,
          region,
          attractions: [],
          note: "景区已排满，这一天留作机动：可自由活动、补拍或休息。",
        });
        continue;
      }
      usedAttractions.add(fallback.slug);
      const food = pickFoodFor(fallback.region, usedFoods, fallback);
      if (food) usedFoods.add(food.slug);
      plan.push({
        day,
        region: fallback.region,
        attractions: [fallback],
        food,
        note: "该区域已排满，换到剩余评分最高的景区。",
      });
      continue;
    }

    for (const a of picked) usedAttractions.add(a.slug);
    const food = pickFoodFor(region, usedFoods, picked[0]);
    if (food) usedFoods.add(food.slug);

    plan.push({
      day,
      region,
      attractions: picked,
      food,
      note:
        picked.length === 1
          ? "当天景区较少，可结合周边自由安排或放慢节奏。"
          : "两个景区为同区域组合，车程较短。",
    });
  }

  const budgetEstimate = `人均约 ${(PER_DAY_BUDGET[input.budget] * days).toLocaleString("zh-CN")} 元（${input.budget}档 × ${days} 天，不含往返大交通）`;

  return { days: plan, budgetEstimate, warnings, relaxedInterests, relaxedRegions };
}

export function planFromSlugs(slugs: string[]) {
  return slugs.map((s) => getAttraction(s)).filter((x): x is Attraction => Boolean(x));
}
