import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRoute, routes } from "@/content/routes";
import { Breadcrumb, SourceNote, Tag, UnverifiedBadge } from "@/components/ui";
import { RouteBand } from "@/components/EditorialArt";
import { ArrowRight, ArrowUpRight, Clock, MapPin } from "@/components/icons";

export function generateStaticParams() {
  return routes.map((route) => ({ slug: route.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const route = getRoute(slug);
  if (!route) return { title: "路线未找到" };
  return { title: route.title, description: route.summary.slice(0, 80) };
}

const KIND_STYLE: Record<string, string> = {
  景区: "border-teal/50 text-teal",
  美食: "border-vermilion/50 text-vermilion",
  交通: "border-line text-ink-500",
  住宿: "border-line text-ink-500",
  其他: "border-line text-ink-500",
};

export default async function RouteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const route = getRoute(slug);
  if (!route) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: route.title,
    description: route.summary,
    touristType: route.tags,
  };

  return (
    <article className="container-page py-8 md:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb items={[{ href: "/", label: "首页" }, { href: "/routes", label: "路线" }, { label: route.title }]} />

      <header className="grid gap-8 border-b border-line pb-10 lg:grid-cols-[150px_minmax(0,1fr)_280px] lg:items-end">
        <div>
          <p className="font-display text-[clamp(76px,10vw,126px)] leading-[0.8] text-vermilion">{route.days}</p>
          <p className="mt-2 font-ui text-[12px] text-ink-500">天行程</p>
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-ui text-[11px] text-vermilion">{route.theme}</span>
            <UnverifiedBadge />
          </div>
          <h1 className="mt-4 max-w-4xl font-display text-[clamp(38px,6vw,72px)] leading-[1.03] tracking-[0.01em]">
            {route.title}
          </h1>
          <p className="mt-5 max-w-2xl text-[14px] leading-[1.95] text-ink-500">{route.summary}</p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {route.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
        <div className="border-t border-line pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <p className="flex items-center gap-2 font-ui text-[11px] text-ink-500">
            <MapPin size={15} className="text-vermilion" />
            {route.regions.join(" · ")}
          </p>
          <RouteBand route={route} className="mt-5" />
          <p className="mt-5 font-ui text-[12px] leading-[1.75] text-ink-700">{route.budget}</p>
        </div>
      </header>

      <div className="mx-auto mt-12 max-w-5xl">
        <div className="mb-8 flex items-end justify-between border-b border-line pb-3">
          <div>
            <p className="font-ui text-[11px] text-vermilion">逐日安排</p>
            <h2 className="mt-1 font-display text-[32px] tracking-[0.03em]">一天一天看</h2>
          </div>
          <span className="flex items-center gap-2 font-ui text-[11px] text-ink-500">
            <Clock size={15} />
            时间可按实际营业情况微调
          </span>
        </div>

        <div className="relative">
          <span className="absolute bottom-0 left-[23px] top-4 hidden w-px bg-line-strong md:block" aria-hidden="true" />
          {route.dayPlans.map((day) => (
            <section key={day.day} className="relative grid gap-4 border-b border-line py-8 md:grid-cols-[72px_minmax(0,1fr)] md:gap-8">
              <div className="relative hidden md:block">
                <span className="relative z-10 grid h-12 w-12 place-items-center bg-vermilion font-display text-[24px] text-paper-light">
                  {String(day.day).padStart(2, "0")}
                </span>
                <p className="mt-2 font-ui text-[11px] text-ink-500">{day.region}</p>
              </div>

              <div>
                <div className="md:hidden">
                  <p className="font-ui text-[11px] text-vermilion">DAY {String(day.day).padStart(2, "0")} · {day.region}</p>
                </div>
                <h3 className="mt-1 font-display text-[25px] leading-[1.3] tracking-[0.02em] md:mt-0 md:text-[30px]">
                  {day.title}
                </h3>

                <ol className="mt-5">
                  {day.items.map((item, index) => (
                    <li key={`${item.time}-${index}`} className="grid gap-2 border-t border-line py-4 sm:grid-cols-[62px_minmax(0,1fr)] sm:gap-5">
                      <span className="font-ui text-[11px] text-ink-500">{item.time}</span>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`border px-2 py-0.5 font-ui text-[10px] ${KIND_STYLE[item.kind] ?? KIND_STYLE.其他}`}>
                            {item.kind}
                          </span>
                          {item.refSlug && (item.kind === "景区" || item.kind === "美食") ? (
                            <Link
                              href={`/${item.kind === "景区" ? "attractions" : "foods"}/${item.refSlug}`}
                              className="link-line inline-flex items-center gap-1.5 text-[15px] font-medium text-ink-700"
                            >
                              {item.title}
                              <ArrowUpRight size={14} />
                            </Link>
                          ) : (
                            <span className="text-[15px] font-medium text-ink-700">{item.title}</span>
                          )}
                        </div>
                        <p className="mt-2 text-[13px] leading-[1.85] text-ink-500">{item.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                {day.tips && (
                  <p className="mt-4 border-l-2 border-ochre bg-ochre/[0.06] px-3 py-2 text-[12px] leading-[1.9] text-ink-700">
                    当天提醒：{day.tips}
                  </p>
                )}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-5">
          <Link
            href="/routes/plan"
            className="focus-ring inline-flex items-center gap-3 bg-ink px-5 py-3 font-ui text-[12px] tracking-[0.08em] text-paper transition-colors hover:bg-vermilion"
          >
            按我的时间重新排
            <ArrowRight size={16} />
          </Link>
          <Link href="/routes" className="link-line font-ui text-[12px] text-ink-700">
            看其他路线
          </Link>
        </div>

        <div className="mt-10">
          <SourceNote sources={route.sources} updatedAt={route.updatedAt} verified={route.verified} />
        </div>
      </div>
    </article>
  );
}
