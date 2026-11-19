"use client";

/**
 * 滚动入场编排：IntersectionObserver 触发，只动 transform / opacity。
 * - 默认进入视口 15% 时播放一次，不重播；
 * - `prefers-reduced-motion: reduce` 时 CSS 层直接显示，JS 无需判断；
 * - 通过 --reveal-delay 错峰（建议组间隔 60–120ms）。
 */

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  /** 错峰延迟（毫秒） */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "figure" | "article";
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // 无 IntersectionObserver 的老环境直接显示，不阻塞内容
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
