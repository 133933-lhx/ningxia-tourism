import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { foods, getFood } from "@/content/foods";
import { attractions } from "@/content/attractions";
import { Breadcrumb, SourceNote, Tag, UnverifiedBadge } from "@/components/ui";
import { DestinationArt, DishArt } from "@/components/EditorialArt";
import { ArrowRight, ArrowUpRight, Utensils } from "@/components/icons";

export function generateStaticParams() {
  return foods.map((food) => ({ slug: food.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const food = getFood(slug);
  if (!food) return { title: "美食未找到" };
  return { title: food.name, description: food.summary.slice(0, 80) };
}

export default async function FoodDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const food = getFood(slug);
  if (!food) notFound();

  const related = (food.pairWith ?? [])
    .map((item) => attractions.find((attraction) => attraction.slug === item))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: food.name,
    servesCuisine: "宁夏菜",
    description: food.summary,
    address: {
      "@type": "PostalAddress",
      addressRegion: "宁夏回族自治区",
      addressLocality: food.region,
      addressCountry: "CN",
    },
  };

  return (
    <article className="container-page py-8 md:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb items={[{ href: "/", label: "首页" }, { href: "/foods", label: "美食" }, { label: food.name }]} />

      <header className="grid gap-8 border-b border-line pb-10 lg:grid-cols-[minmax(340px,0.92fr)_minmax(0,1fr)] lg:items-end">
        <DishArt food={food} className="aspect-[4/3] lg:aspect-[5/4]" />
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 font-ui text-[11px] text-vermilion">
              <Utensils size={15} />
              {food.region} · {food.priceRange}
            </span>
            <UnverifiedBadge />
          </div>
          <h1 className="mt-5 font-display text-[clamp(54px,9vw,104px)] leading-[0.92] tracking-[0.01em]">{food.name}</h1>
          <p className="mt-6 max-w-2xl border-l border-line-strong pl-4 text-[14px] leading-[1.95] text-ink-500">
            {food.summary}
          </p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {food.flavorTags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
        <div>
          <section>
            <p className="font-ui text-[11px] tracking-[0.12em] text-vermilion">这道菜的门道</p>
            <h2 className="mt-2 font-display text-[36px] leading-[1.2] tracking-[0.03em]">本地人为什么这样吃</h2>
            <p className="dropcap mt-6 max-w-3xl text-[15px] leading-[2] text-ink-700">{food.story}</p>
          </section>

          <blockquote className="mt-12 border-y border-line py-7">
            <p className="font-display text-[clamp(26px,4vw,42px)] leading-[1.35] tracking-[0.03em] text-ink-700">
              “{food.flavorTags.join("、")}。”
            </p>
            <footer className="mt-3 font-ui text-[11px] text-ink-500">风味关键词 · {food.region}</footer>
          </blockquote>

          {related.length > 0 && (
            <section className="mt-14">
              <div className="border-b border-line pb-3">
                <p className="font-ui text-[11px] text-vermilion">吃完接着走</p>
                <h2 className="mt-1 font-display text-[30px] tracking-[0.03em]">顺路去看看</h2>
              </div>
              <div className={`mt-6 grid gap-6 ${related.length > 1 ? "md:grid-cols-2" : ""}`}>
                {related.map((attraction) => (
                  <Link key={attraction.slug} href={`/attractions/${attraction.slug}`} className="group block focus-ring">
                    <DestinationArt attraction={attraction} className="aspect-[16/10]" />
                    <div className="mt-3 flex items-start justify-between gap-4">
                      <div>
                        <p className="font-display text-[22px] transition-colors group-hover:text-vermilion">{attraction.name}</p>
                        <p className="mt-1 text-[12px] leading-[1.75] text-ink-500">{attraction.region} · 最佳 {attraction.bestSeason}</p>
                      </div>
                      <ArrowUpRight size={17} className="mt-1 shrink-0 text-ink-500 group-hover:text-vermilion" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="mt-12">
            <SourceNote sources={food.sources} updatedAt={food.updatedAt} verified={food.verified} />
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="bg-ink p-6 text-paper-light">
            <p className="font-ui text-[11px] tracking-[0.1em] text-paper-light/55">怎么吃</p>
            <ul className="mt-4 space-y-3 text-[12px] leading-[1.8] text-paper-light/75">
              <li>到本地老店先看本地人点什么。</li>
              <li>羊肉类优先清汤或手抓，最容易吃出品质差异。</li>
              <li>价格按大众参考，具体以门店为准。</li>
            </ul>
            <p className="mt-5 border-t border-paper-light/15 pt-4 text-[11px] leading-[1.75] text-paper-light/50">
              本站不收录具体商户，避免信息过时与广告嫌疑。
            </p>
          </div>
          <Link
            href="/routes/plan"
            className="focus-ring mt-4 inline-flex w-full items-center justify-between gap-3 border border-line px-4 py-3 font-ui text-[12px] text-vermilion transition-colors hover:border-vermilion"
          >
            把这一站放进路线
            <ArrowRight size={15} />
          </Link>
        </aside>
      </div>
    </article>
  );
}
