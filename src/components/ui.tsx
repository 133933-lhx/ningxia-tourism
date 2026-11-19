import Link from "next/link";
import type { ReactNode } from "react";
import type { Citation, Region } from "@/types/content";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center border border-line px-2.5 py-1 font-ui text-[12px] leading-none tracking-[0.04em] text-ink-500">
      {children}
    </span>
  );
}

export function RegionBadge({ region }: { region: Region | "通用" }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-ui text-[11px] tracking-[0.12em] text-vermilion">
      <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-vermilion" />
      {region}
    </span>
  );
}

export function UnverifiedBadge() {
  return (
    <span
      title="内容由公开资料整理，尚未人工核实"
      className="inline-flex items-center border border-ochre/60 bg-ochre/5 px-2 py-1 font-ui text-[11px] tracking-[0.08em] text-ochre"
    >
      待核实
    </span>
  );
}

export function SourceNote({
  sources,
  updatedAt,
  verified,
}: {
  sources: Citation[];
  updatedAt?: string;
  verified?: boolean;
}) {
  return (
    <p className="border-t border-line pt-3 text-[12px] leading-[1.9] text-ink-500">
      资料来源：
      {sources.map((s, i) => (
        <span key={s.id}>
          {i > 0 && "、"}
          <a
            className="link-line"
            href={s.href}
            target="_blank"
            rel="noreferrer noopener"
          >
            {s.title}
          </a>
        </span>
      ))}
      {updatedAt && <span className="font-mono-ui"> · 更新 {updatedAt}</span>}
      {verified === false && <span> · 尚未人工核实</span>}
    </p>
  );
}

/**
 * 图录页头：测绘角标 + 空心描边底纹大字（拓片感），
 * 标题用宋体大字紧排，避免「小标题 + 一行灰字」的默认落地页配方。
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  ghost,
  aside,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  /** 仅需要时传入装饰字，避免所有内容页共享同一个模板动作。 */
  ghost?: string;
  aside?: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden border-b border-line">
      {ghost && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-4 -top-12 select-none font-display text-[200px] leading-none text-transparent md:right-8 md:text-[280px]"
          style={{ WebkitTextStroke: "1px var(--color-line-strong)" }}
        >
          {ghost}
        </span>
      )}
      <div className="container-page relative py-12 md:py-16">
        <div className={`grid gap-8 ${aside ? "lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end" : ""}`}>
          <div>
            {eyebrow && (
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-vermilion" />
                <p className="font-ui text-[11px] tracking-[0.14em] text-ink-500">{eyebrow}</p>
              </div>
            )}
            <h1 className="mt-4 max-w-4xl font-display text-[clamp(40px,7vw,68px)] leading-[1.02] tracking-[0.01em]">{title}</h1>
            {description && (
              <p className="mt-6 max-w-2xl border-l border-line-strong pl-4 text-[14px] leading-[1.95] text-ink-500">
                {description}
              </p>
            )}
          </div>
          {aside && <div>{aside}</div>}
        </div>
      </div>
    </div>
  );
}

export function Breadcrumb({ items }: { items: Array<{ href?: string; label: string }> }) {
  return (
    <nav aria-label="面包屑" className="mb-6 font-ui text-[11px] tracking-[0.08em] text-ink-500">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true" className="text-line-strong">/</span>}
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-vermilion">
                {item.label}
              </Link>
            ) : (
              <span className="text-ink-700">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function SectionTitle({
  title,
  description,
  action,
  index,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  index?: string;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-4">
      <div className="flex items-end gap-4">
        {index && (
            <span className="mb-0.5 inline-block bg-ink px-2 py-1 font-ui text-[11px] tracking-[0.1em] text-paper">
            {index}
          </span>
        )}
        <div>
          <h2 className="font-display text-[28px] leading-none tracking-[0.03em] md:text-[36px]">{title}</h2>
          {description && <p className="mt-2.5 text-[13px] leading-relaxed text-ink-500">{description}</p>}
        </div>
      </div>
      {action && <div className="font-ui text-[12px] tracking-[0.06em]">{action}</div>}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center border border-dashed border-line px-6 py-14 text-center">
      <p className="font-display text-lg">{title}</p>
      {description && <p className="mt-2 text-sm text-ink-500">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function Disclaimer() {
  return (
    <div className="flex flex-col gap-2 border-l-2 border-vermilion bg-paper-deep/60 px-4 py-3.5 text-[12px] leading-[1.9] text-ink-700 md:flex-row md:items-center md:gap-4">
      <span className="font-ui text-[11px] tracking-[0.1em] text-vermilion">声明</span>
      <p>
        本站内容基于公开资料整理，<strong className="font-medium">门票、开放时间、交通班次以官方发布为准</strong>
        ；方言存在区域差异，仅供参考。发现错误欢迎指正。
      </p>
    </div>
  );
}
