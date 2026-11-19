import Link from "next/link";
import type { Attraction, Food, TravelRoute } from "@/types/content";
import { Tag } from "./ui";
import { DestinationArt, DishArt, RouteBand } from "./EditorialArt";
import { ArrowUpRight } from "./icons";

export function AttractionCard({
  attraction,
  index,
}: {
  attraction: Attraction;
  index?: number;
}) {
  return (
    <Link href={`/attractions/${attraction.slug}`} className="group block focus-ring">
      <DestinationArt attraction={attraction} className="aspect-[4/3] transition-transform duration-300 group-hover:-translate-y-1" />
      <div className="flex items-start justify-between gap-4 pt-4">
        <div>
          <p className="font-ui text-[11px] tracking-[0.08em] text-vermilion">
            {String(index ?? 0).padStart(2, "0")} / {attraction.type}
          </p>
          <h3 className="mt-2 font-display text-[25px] leading-none tracking-[0.04em] transition-colors group-hover:text-vermilion">
            {attraction.name}
          </h3>
        </div>
        <ArrowUpRight size={18} className="mt-1 shrink-0 text-ink-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-vermilion" />
      </div>
      <p className="mt-3 line-clamp-2 text-[13px] leading-[1.8] text-ink-500">{attraction.summary}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {attraction.tags.slice(0, 3).map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </Link>
  );
}

export function AttractionFeature({ attraction }: { attraction: Attraction }) {
  return (
    <Link
      href={`/attractions/${attraction.slug}`}
      className="group grid overflow-hidden border border-line bg-paper-light focus-ring lg:grid-cols-[1.18fr_0.82fr]"
    >
      <DestinationArt attraction={attraction} className="min-h-[300px] border-0 lg:min-h-[440px]" priority />
      <div className="flex flex-col justify-between p-6 md:p-8">
        <div>
          <p className="font-ui text-[11px] tracking-[0.12em] text-vermilion">本周先看</p>
          <h2 className="mt-4 font-display text-[clamp(36px,5vw,62px)] leading-[0.98] tracking-[0.02em] transition-colors group-hover:text-vermilion">
            {attraction.name}
          </h2>
          <p className="mt-6 text-[14px] leading-[1.95] text-ink-500">{attraction.summary}</p>
        </div>
        <div className="mt-8">
          <dl className="grid grid-cols-2 gap-x-5 gap-y-4 border-y border-line py-4 text-[12px]">
            <div>
              <dt className="text-ink-500">最适合</dt>
              <dd className="mt-1 text-ink-700">{attraction.bestSeason}</dd>
            </div>
            <div>
              <dt className="text-ink-500">门票参考</dt>
              <dd className="mt-1 text-ink-700">{attraction.ticket}</dd>
            </div>
          </dl>
          <span className="mt-5 inline-flex items-center gap-2 font-ui text-[12px] tracking-[0.06em] text-vermilion">
            查看玩法与实用信息
            <ArrowUpRight size={15} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function AttractionRow({ attraction, index }: { attraction: Attraction; index: number }) {
  return (
    <Link
      href={`/attractions/${attraction.slug}`}
      className="group grid grid-cols-[92px_minmax(0,1fr)_auto] items-center gap-4 border-b border-line py-4 focus-ring sm:grid-cols-[160px_minmax(0,1fr)_auto] sm:gap-6"
    >
      <DestinationArt attraction={attraction} className="h-[92px] sm:h-[118px]" />
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-ui text-[11px] text-vermilion">{String(index).padStart(2, "0")}</span>
          <h3 className="font-display text-[22px] leading-none tracking-[0.03em] transition-colors group-hover:text-vermilion sm:text-[26px]">
            {attraction.name}
          </h3>
          <span className="font-ui text-[11px] text-ink-500">{attraction.type} · {attraction.region}</span>
        </div>
        <p className="mt-2 line-clamp-2 text-[13px] leading-[1.8] text-ink-500">{attraction.summary}</p>
        <p className="mt-2 hidden text-[12px] text-ink-500 sm:block">
          最佳季节：{attraction.bestSeason}
        </p>
      </div>
      <ArrowUpRight size={18} className="text-ink-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-vermilion" />
    </Link>
  );
}

export function FoodCard({ food }: { food: Food }) {
  return (
    <Link href={`/foods/${food.slug}`} className="group block focus-ring">
      <DishArt food={food} className="aspect-[4/3] transition-transform duration-300 group-hover:-translate-y-1" />
      <div className="flex items-start justify-between gap-4 pt-4">
        <div>
          <p className="font-ui text-[11px] text-ink-500">{food.region}</p>
          <h3 className="mt-1 font-display text-[23px] leading-none tracking-[0.03em] transition-colors group-hover:text-vermilion">
            {food.name}
          </h3>
        </div>
        <ArrowUpRight size={17} className="mt-1 text-ink-500 group-hover:text-vermilion" />
      </div>
      <p className="mt-3 line-clamp-2 text-[13px] leading-[1.8] text-ink-500">{food.summary}</p>
    </Link>
  );
}

export function FoodRow({ food, index }: { food: Food; index: number }) {
  return (
    <Link
      href={`/foods/${food.slug}`}
      className="group grid grid-cols-[88px_minmax(0,1fr)_auto] items-center gap-4 border-b border-line py-4 focus-ring sm:grid-cols-[132px_minmax(0,1fr)_auto] sm:gap-6"
    >
      <DishArt food={food} className="h-[88px] sm:h-[104px]" />
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-ui text-[11px] text-vermilion">{String(index).padStart(2, "0")}</span>
          <h3 className="font-display text-[22px] leading-none tracking-[0.03em] transition-colors group-hover:text-vermilion sm:text-[25px]">
            {food.name}
          </h3>
          <div className="hidden flex-wrap gap-1 md:flex">
            {food.flavorTags.slice(0, 2).map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
        <p className="mt-2 line-clamp-2 text-[13px] leading-[1.8] text-ink-500">{food.summary}</p>
      </div>
      <div className="text-right">
        <p className="font-ui text-[12px] text-ink-700">{food.priceRange}</p>
        <ArrowUpRight size={16} className="ml-auto mt-3 text-ink-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-vermilion" />
      </div>
    </Link>
  );
}

export function RouteCard({ route, index }: { route: TravelRoute; index?: number }) {
  return (
    <Link href={`/routes/${route.slug}`} className="group block border-b border-line py-5 focus-ring sm:py-6">
      <div className="grid gap-4 sm:grid-cols-[82px_minmax(0,1fr)_auto] sm:items-start sm:gap-6">
        <div>
          <p className="font-display text-[42px] leading-none text-vermilion">{String(route.days).padStart(2, "0")}</p>
          <p className="mt-1 font-ui text-[11px] tracking-[0.1em] text-ink-500">天行程</p>
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="font-ui text-[11px] text-vermilion">{route.theme}</p>
            <span className="font-ui text-[11px] text-ink-500">第 {String(index ?? 0).padStart(2, "0")} 条</span>
          </div>
          <h3 className="mt-2 max-w-2xl font-display text-[clamp(23px,3vw,32px)] leading-[1.25] tracking-[0.02em] transition-colors group-hover:text-vermilion">
            {route.title}
          </h3>
          <p className="mt-2 line-clamp-2 max-w-2xl text-[13px] leading-[1.8] text-ink-500">{route.summary}</p>
          <RouteBand route={route} className="mt-5 max-w-md" />
        </div>
        <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
          <p className="font-ui text-[11px] leading-relaxed text-ink-500">{route.budget}</p>
          <span className="mt-3 inline-flex items-center gap-2 font-ui text-[12px] text-vermilion">
            查看逐日安排
            <ArrowUpRight size={15} />
          </span>
        </div>
      </div>
    </Link>
  );
}
