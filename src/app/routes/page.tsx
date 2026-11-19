import type { Metadata } from "next";
import Link from "next/link";
import { RouteBand } from "@/components/EditorialArt";
import { RouteCard } from "@/components/cards";
import { ArrowRight, RouteIcon } from "@/components/icons";
import { routes } from "@/content/routes";

export const metadata: Metadata = {
  title: "宁夏旅游路线",
  description:
    "宁夏 3 日经典、5 日深度环线、亲子、摄影、西夏文化、冬季、沙漠徒步与黄河研学路线，另有按天数自动生成的行程规划器。",
};

export default function RoutesPage() {
  const classic = routes[0];

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="container-page grid gap-10 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <p className="font-ui text-[11px] tracking-[0.14em] text-vermilion">行程 / ITINERARIES</p>
            <h1 className="mt-4 max-w-4xl font-display text-[clamp(46px,8vw,90px)] leading-[0.95] tracking-[0.01em]">
              路线不是
              <br />
              景点清单
            </h1>
            <p className="mt-6 max-w-2xl border-l border-line-strong pl-4 text-[14px] leading-[1.95] text-ink-500">
              看每天怎么走、在哪吃、附近还能接什么。第一次来选经典线，想走完整南北就选环线。
            </p>
          </div>

          <div className="border-y border-line py-5">
            <p className="font-ui text-[11px] text-vermilion">经典路线预览</p>
            <p className="mt-2 font-display text-[27px] leading-[1.35] tracking-[0.02em]">{classic.title}</p>
            <RouteBand route={classic} className="mt-5" />
            <Link href={`/routes/${classic.slug}`} className="mt-4 inline-flex items-center gap-2 font-ui text-[12px] text-vermilion">
              看逐日安排
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <div className="container-page py-10 md:py-14">
        <div className="grid overflow-hidden border border-line bg-paper-light md:grid-cols-[1fr_auto]">
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 text-vermilion">
              <RouteIcon size={20} />
              <p className="font-ui text-[11px] tracking-[0.1em]">时间不固定</p>
            </div>
            <h2 className="mt-3 font-display text-[30px] leading-[1.3] tracking-[0.03em]">把天数、区域和兴趣交给我们排</h2>
            <p className="mt-2 max-w-2xl text-[13px] leading-[1.8] text-ink-500">
              规划器按同区域聚拢景区，并给每天配一道当地饭食。先生成，再按实际营业时间微调。
            </p>
          </div>
          <Link
            href="/routes/plan"
            className="focus-ring flex items-center justify-between gap-9 bg-ink px-6 py-5 font-ui text-[12px] tracking-[0.06em] text-paper transition-colors hover:bg-vermilion md:px-8"
          >
            打开规划器
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="mt-12">
          <div className="flex items-end justify-between border-b border-line pb-3">
            <div>
              <p className="font-ui text-[11px] text-vermilion">直接照着走</p>
              <h2 className="mt-1 font-display text-[34px] tracking-[0.03em]">精选路线</h2>
            </div>
            <span className="font-ui text-[11px] text-ink-500">{routes.length} 条</span>
          </div>
          <div>
            {routes.map((route, index) => (
              <RouteCard key={route.slug} route={route} index={index + 1} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
