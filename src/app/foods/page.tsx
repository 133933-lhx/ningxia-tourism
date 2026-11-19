import type { Metadata } from "next";
import Link from "next/link";
import { FoodRow } from "@/components/cards";
import { DishArt } from "@/components/EditorialArt";
import { ArrowUpRight, Utensils } from "@/components/icons";
import { foods } from "@/content/foods";
import { REGIONS } from "@/types/content";

export const metadata: Metadata = {
  title: "宁夏美食推荐",
  description:
    "手抓羊肉、羊杂碎、羊肉臊子面、蒿子面、辣糊糊、沙湖大鱼头等宁夏地方美食推荐，含口味、价格参考与来由。",
};

export default function FoodsPage() {
  const grouped = REGIONS.map((region) => ({
    region,
    items: foods.filter((food) => food.region === region),
  })).filter(({ items }) => items.length > 0);

  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-paper-deep/25">
        <div className="container-page grid gap-10 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div>
            <p className="font-ui text-[11px] tracking-[0.14em] text-vermilion">味觉 / TASTE</p>
            <h1 className="mt-4 max-w-4xl font-display text-[clamp(46px,8vw,90px)] leading-[0.95] tracking-[0.01em]">
              一碗羊肉
              <br />
              吃出五种宁夏
            </h1>
            <p className="mt-6 max-w-2xl border-l border-line-strong pl-4 text-[14px] leading-[1.95] text-ink-500">
              银川的夜宵、吴忠的手抓、中卫的面食、固原的暖汤。先按城市看本地人怎么吃，再决定下一站去哪。
            </p>
          </div>
          <div className="border-t border-line pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
            <Utensils size={20} className="text-vermilion" />
            <p className="mt-3 font-display text-[42px] leading-none">{foods.length}</p>
            <p className="mt-1 font-ui text-[12px] text-ink-500">道地方风味，覆盖 {grouped.length} 座城市</p>
            <p className="mt-4 text-[12px] leading-[1.8] text-ink-500">价格为大众参考，不收具体商户信息。</p>
          </div>
        </div>
      </section>

      <nav
        aria-label="按城市跳转美食"
        className="sticky top-16 z-20 border-b border-line bg-paper/94 backdrop-blur md:top-[114px]"
      >
        <div className="container-page flex items-center gap-5 overflow-x-auto py-3">
          <span className="shrink-0 font-ui text-[11px] text-ink-500">按城市</span>
          {grouped.map(({ region, items }) => (
            <a
              key={region}
              href={`#food-${region}`}
              className="focus-ring shrink-0 font-ui text-[12px] text-ink-700 transition-colors hover:text-vermilion"
            >
              {region} <span className="text-[11px] text-ink-500">{items.length}</span>
            </a>
          ))}
        </div>
      </nav>

      <div className="container-page py-12 md:py-16">
        <div className="space-y-16 md:space-y-20">
          {grouped.map(({ region, items }) => {
            const signature = items[0];
            const rest = items.slice(1);
            return (
              <section key={region} id={`food-${region}`} className="section-anchor">
                <div className="grid gap-7 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-12">
                  <aside className="lg:sticky lg:top-48 lg:self-start">
                    <Link href={`/foods/${signature.slug}`} className="group block focus-ring">
                      <DishArt food={signature} className="aspect-[4/3] transition-transform duration-300 group-hover:-translate-y-1" />
                      <div className="mt-4 flex items-start justify-between gap-4">
                        <div>
                          <p className="font-ui text-[11px] text-vermilion">本区招牌</p>
                          <h2 className="mt-1 font-display text-[34px] leading-none tracking-[0.03em]">{region}</h2>
                        </div>
                        <ArrowUpRight size={18} className="mt-1 text-ink-500 transition-colors group-hover:text-vermilion" />
                      </div>
                      <p className="mt-3 font-display text-[20px] text-ink-700">{signature.name}</p>
                      <p className="mt-2 line-clamp-2 text-[12px] leading-[1.8] text-ink-500">{signature.summary}</p>
                    </Link>
                  </aside>

                  <div>
                    <div className="flex items-end justify-between border-b border-line pb-3">
                      <div>
                        <p className="font-ui text-[11px] text-ink-500">{items.length} 道地方味</p>
                        <h3 className="mt-1 font-display text-[26px] tracking-[0.03em]">从这里继续吃</h3>
                      </div>
                      <Link href="/attractions" className="hidden font-ui text-[11px] text-vermilion sm:block">
                        查看同城景区
                      </Link>
                    </div>
                    {rest.length ? (
                      <div>
                        {rest.map((food) => (
                          <FoodRow key={food.slug} food={food} index={foods.indexOf(food) + 1} />
                        ))}
                      </div>
                    ) : (
                      <p className="border-b border-line py-8 text-[13px] text-ink-500">这一城目前收录 1 道代表风味。</p>
                    )}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
