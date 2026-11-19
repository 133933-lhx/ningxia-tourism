"use client";

import { useMemo, useState } from "react";
import type { Attraction, Region } from "@/types/content";
import { REGIONS } from "@/types/content";
import { AttractionFeature, AttractionRow } from "./cards";
import { EmptyState } from "./ui";
import { NingxiaMap } from "./NingxiaMap";
import { RotateCcw, Search, SlidersHorizontal } from "./icons";

const TYPES = ["全部", "自然", "历史", "人文", "综合"] as const;

export function AttractionExplorer({ attractions }: { attractions: Attraction[] }) {
  const [region, setRegion] = useState<Region | null>(null);
  const [type, setType] = useState<(typeof TYPES)[number]>("全部");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const out: Partial<Record<Region, number>> = {};
    for (const attraction of attractions) out[attraction.region] = (out[attraction.region] ?? 0) + 1;
    return out;
  }, [attractions]);

  const filtered = useMemo(() => {
    const normalized = query.trim();
    return attractions.filter((attraction) => {
      if (region && attraction.region !== region) return false;
      if (type !== "全部" && attraction.type !== type) return false;
      if (normalized && !`${attraction.name}${attraction.summary}${attraction.tags.join("")}`.includes(normalized)) {
        return false;
      }
      return true;
    });
  }, [attractions, query, region, type]);

  const clear = () => {
    setRegion(null);
    setType("全部");
    setQuery("");
  };

  const featured = filtered[0];
  const remaining = filtered.slice(1);
  const regionAttractions = region ? attractions.filter((item) => item.region === region) : [];

  return (
    <div>
      <div className="sticky top-16 z-20 border-y border-line bg-paper/94 py-3 backdrop-blur md:top-[114px]">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2" aria-label="按城市筛选">
            <button
              type="button"
              onClick={() => setRegion(null)}
              aria-pressed={region === null}
              className={`focus-ring font-ui text-[12px] transition-colors ${
                region === null ? "text-vermilion" : "text-ink-500 hover:text-ink"
              }`}
            >
              全部城市
            </button>
            {REGIONS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setRegion(region === item ? null : item)}
                aria-pressed={region === item}
                className={`focus-ring font-ui text-[12px] transition-colors ${
                  region === item ? "text-vermilion" : "text-ink-500 hover:text-ink"
                }`}
              >
                {item} <span className="text-[11px] opacity-65">{counts[item] ?? 0}</span>
              </button>
            ))}
          </div>

          <div className="ml-auto flex flex-wrap items-center gap-2">
            <label className="relative block">
              <span className="sr-only">搜索景区</span>
              <Search size={15} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-500" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜索景区"
                className="focus-ring w-36 border border-line bg-paper-light py-2 pl-8 pr-3 text-[12px] text-ink-700"
              />
            </label>
            <label className="relative">
              <span className="sr-only">按类型筛选</span>
              <SlidersHorizontal size={15} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-500" />
              <select
                value={type}
                onChange={(event) => setType(event.target.value as (typeof TYPES)[number])}
                className="focus-ring appearance-none border border-line bg-paper-light py-2 pl-8 pr-8 font-ui text-[12px] text-ink-700"
              >
                {TYPES.map((item) => (
                  <option key={item} value={item}>
                    {item === "全部" ? "全部类型" : item}
                  </option>
                ))}
              </select>
            </label>
            <span className="min-w-14 text-right font-ui text-[11px] text-ink-500">{filtered.length} 个结果</span>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-12">
        <aside className="lg:sticky lg:top-48 lg:self-start">
          <div className="border border-line bg-paper-light p-3">
            <div className="flex items-center justify-between border-b border-line px-1 pb-2">
              <p className="font-ui text-[11px] text-ink-500">五市位置示意</p>
              <span className="font-ui text-[11px] text-vermilion">{region ?? "全宁夏"}</span>
            </div>
            <NingxiaMap selected={region} onSelect={setRegion} counts={counts} />
            <p className="px-1 pb-1 text-[11px] leading-[1.7] text-ink-500">
              点击城市缩小范围，再点一次取消。
            </p>
          </div>

          <div className="mt-4 border-t border-line pt-4">
            <p className="font-ui text-[11px] text-ink-500">当前范围</p>
            {regionAttractions.length ? (
              <ul className="mt-2 space-y-1.5">
                {regionAttractions.map((item) => (
                  <li key={item.slug} className="text-[12px] leading-relaxed text-ink-700">
                    {item.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-[12px] leading-[1.75] text-ink-700">
                从西到东穿过沙漠、黄河与贺兰山。先按城市收窄，再看季节与车程。
              </p>
            )}
          </div>
        </aside>

        <section aria-live="polite">
          {featured ? (
            <>
              <AttractionFeature attraction={featured} />
              {remaining.length > 0 && (
                <div className="mt-8">
                  <div className="flex items-center justify-between border-b border-line pb-3">
                    <h2 className="font-display text-[26px] tracking-[0.03em]">继续挑选</h2>
                    <span className="font-ui text-[11px] text-ink-500">按当前筛选显示</span>
                  </div>
                  <div>
                    {remaining.map((attraction, index) => (
                      <AttractionRow key={attraction.slug} attraction={attraction} index={index + 2} />
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <EmptyState
              title="没有符合条件的景区"
              description="换个关键词，或清除城市与类型筛选后再看。"
              action={
                <button
                  type="button"
                  onClick={clear}
                  className="focus-ring inline-flex items-center gap-2 border border-line px-4 py-2.5 font-ui text-[12px] text-vermilion transition-colors hover:border-vermilion"
                >
                  <RotateCcw size={15} />
                  清除筛选
                </button>
              }
            />
          )}
        </section>
      </div>
    </div>
  );
}
