import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { attractions, getAttraction } from "@/content/attractions";
import { foods } from "@/content/foods";
import { Breadcrumb, SourceNote, Tag, UnverifiedBadge } from "@/components/ui";
import { DestinationArt } from "@/components/EditorialArt";
import { FoodRow } from "@/components/cards";
import { ArrowRight, ArrowUpRight, CalendarDays, Clock, MapPin, Ticket } from "@/components/icons";

export function generateStaticParams() {
  return attractions.map((attraction) => ({ slug: attraction.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const attraction = getAttraction(slug);
  if (!attraction) return { title: "景区未找到" };
  return {
    title: `${attraction.name}游玩攻略`,
    description: attraction.summary.slice(0, 80),
  };
}

export default async function AttractionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const attraction = getAttraction(slug);
  if (!attraction) notFound();

  const nearbyFoods = foods.filter((food) => food.pairWith?.includes(slug));
  const sameRegion = attractions
    .filter((item) => item.region === attraction.region && item.slug !== slug)
    .slice(0, 4);
  const weakTags = new Set(["5A", "4A", "亲子", "摄影", "体验项目", "半日游", "避暑"]);
  const tagRelated = attractions
    .filter(
      (item) =>
        item.slug !== slug &&
        item.tags.some((tag) => !weakTags.has(tag) && attraction.tags.includes(tag)),
    )
    .slice(0, 4);
  const neighbors = sameRegion.length ? sameRegion : tagRelated;
  const neighborTitle = sameRegion.length ? "同城还能去哪" : "也喜欢这类型";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: attraction.name,
    description: attraction.summary,
    address: {
      "@type": "PostalAddress",
      addressRegion: "宁夏回族自治区",
      addressLocality: attraction.region,
      addressCountry: "CN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: attraction.coords.lat,
      longitude: attraction.coords.lng,
    },
  };

  const facts = [
    { icon: Clock, label: "开放时间", value: attraction.hours },
    { icon: Ticket, label: "门票参考", value: attraction.ticket },
    { icon: MapPin, label: "怎么到达", value: attraction.transport },
    { icon: CalendarDays, label: "最佳季节", value: attraction.bestSeason },
  ];

  return (
    <article className="container-page py-8 md:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb
        items={[{ href: "/", label: "首页" }, { href: "/attractions", label: "景区" }, { label: attraction.name }]}
      />

      <header className="grid gap-8 border-b border-line pb-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.82fr)] lg:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-ui text-[11px] tracking-[0.1em] text-vermilion">{attraction.region} · {attraction.type}</span>
            <UnverifiedBadge />
          </div>
          <h1 className="mt-5 max-w-3xl font-display text-[clamp(52px,9vw,104px)] leading-[0.92] tracking-[0.01em]">
            {attraction.name}
          </h1>
          <p className="mt-6 max-w-2xl border-l border-line-strong pl-4 text-[14px] leading-[1.95] text-ink-500">
            {attraction.summary}
          </p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {attraction.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
        <DestinationArt attraction={attraction} className="aspect-[4/3] lg:aspect-[5/4]" />
      </header>

      <dl className="grid border-b border-line md:grid-cols-2 lg:grid-cols-4">
        {facts.map(({ icon: Icon, label, value }) => (
          <div key={label} className="border-b border-line py-5 md:border-r md:px-5 md:even:border-r-0 lg:border-b-0 lg:even:border-r lg:last:border-r-0">
            <dt className="flex items-center gap-2 font-ui text-[11px] text-ink-500">
              <Icon size={15} className="text-vermilion" />
              {label}
            </dt>
            <dd className="mt-2 text-[12px] leading-[1.75] text-ink-700">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
        <div>
          <section>
            <p className="font-ui text-[11px] tracking-[0.12em] text-vermilion">现场先看什么</p>
            <h2 className="mt-2 font-display text-[34px] tracking-[0.03em]">四处值得停留</h2>
            <ol className="mt-6">
              {attraction.highlights.map((highlight, index) => (
                <li key={highlight} className="grid grid-cols-[42px_1fr] gap-4 border-t border-line py-5 last:border-b">
                  <span className="font-display text-[28px] leading-none text-vermilion">{String(index + 1).padStart(2, "0")}</span>
                  <p className="text-[14px] leading-[1.85] text-ink-700">{highlight}</p>
                </li>
              ))}
            </ol>
          </section>

          {nearbyFoods.length > 0 && (
            <section className="mt-14">
              <div className="flex items-end justify-between border-b border-line pb-3">
                <div>
                  <p className="font-ui text-[11px] text-vermilion">顺路吃</p>
                  <h2 className="mt-1 font-display text-[30px] tracking-[0.03em]">玩完吃什么</h2>
                </div>
                <Link href="/foods" className="font-ui text-[12px] text-vermilion">全部美食</Link>
              </div>
              {nearbyFoods.slice(0, 4).map((food) => (
                <FoodRow key={food.slug} food={food} index={nearbyFoods.indexOf(food) + 1} />
              ))}
            </section>
          )}

          <section className="mt-14">
            <div className="border-b border-line pb-3">
              <p className="font-ui text-[11px] text-vermilion">接下来</p>
              <h2 className="mt-1 font-display text-[30px] tracking-[0.03em]">{neighborTitle}</h2>
            </div>
            {neighbors.length ? (
              <div>
                {neighbors.map((neighbor) => (
                  <Link
                    key={neighbor.slug}
                    href={`/attractions/${neighbor.slug}`}
                    className="group flex items-center justify-between gap-5 border-b border-line py-4 focus-ring"
                  >
                    <div>
                      <p className="font-display text-[20px] transition-colors group-hover:text-vermilion">{neighbor.name}</p>
                      <p className="mt-1 text-[12px] text-ink-500">{neighbor.region} · {neighbor.bestSeason}</p>
                    </div>
                    <ArrowUpRight size={17} className="text-ink-500 group-hover:text-vermilion" />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="mt-5 text-[13px] text-ink-500">暂无相近去处。</p>
            )}
          </section>

          <div className="mt-12">
            <SourceNote sources={attraction.sources} updatedAt={attraction.updatedAt} verified={attraction.verified} />
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="bg-ink p-6 text-paper-light">
            <p className="font-ui text-[11px] tracking-[0.1em] text-paper-light/55">下一站</p>
            <h2 className="mt-3 font-display text-[27px] leading-[1.35]">把这里放进你的宁夏行程</h2>
            <p className="mt-3 text-[12px] leading-[1.85] text-paper-light/65">
              根据天数和区域自动组合景点与当地饭食，结果仅作路线建议。
            </p>
            <Link
              href="/routes/plan"
              className="focus-ring mt-5 inline-flex items-center gap-2 border border-paper-light/30 px-4 py-2.5 font-ui text-[12px] text-paper-light transition-colors hover:bg-paper-light hover:text-ink"
            >
              安排路线
              <ArrowRight size={15} />
            </Link>
          </div>
          <p className="mt-4 text-[11px] leading-[1.8] text-ink-500">
            坐标 {attraction.coords.lat.toFixed(3)}, {attraction.coords.lng.toFixed(3)}。开放信息会随季节调整，出发前请再核对官方公告。
          </p>
        </aside>
      </div>
    </article>
  );
}
