"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { RockGlyph } from "./RockArt";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "./icons";

const NAV = [
  { href: "/", label: "首页" },
  { href: "/attractions", label: "景区" },
  { href: "/foods", label: "美食" },
  { href: "/routes", label: "路线" },
  { href: "/dialect", label: "方言" },
  { href: "/ask", label: "问答" },
  { href: "/about", label: "关于" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/92 backdrop-blur">
      {/* 期刊号细条：田野笔记人格 */}
      <div className="hidden border-b border-line md:block">
        <div className="container-page flex h-8 items-center justify-between font-ui text-[11px] tracking-[0.16em] text-ink-500">
          <span>宁夏 · 中国 / Ningxia</span>
          <span className="hidden items-center gap-2 lg:flex">
            <RockGlyph kind="sun" className="h-3.5 w-3.5 text-vermilion" strokeWidth={2.6} />
            沙与河的田野图录
          </span>
          <span>资料更新 2026.11</span>
        </div>
      </div>

      <div className="container-page flex h-16 items-center gap-6 md:h-[74px]">
        <Link href="/" className="group flex items-center gap-3 focus-ring" onClick={() => setOpen(false)}>
          {/* 岩画太阳神印章：取代文字 logo */}
          <span className="seal transition-transform duration-200 group-hover:rotate-3">
            <RockGlyph kind="sun" className="h-6 w-6" strokeWidth={2.6} />
          </span>
          <span className="leading-none">
            <span className="block font-display text-[19px] tracking-[0.16em]">宁夏文旅指南</span>
            <span className="mt-1.5 block font-mono-ui text-[10px] tracking-[0.24em] text-ink-500">
              NINGXIA FIELD NOTES
            </span>
          </span>
        </Link>

        <nav className="ml-auto hidden h-[74px] items-stretch md:flex" aria-label="主导航">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`focus-ring group relative flex items-center px-2.5 font-ui text-[13px] tracking-[0.06em] transition-colors lg:px-3.5 ${
                isActive(item.href) ? "text-vermilion" : "text-ink-700 hover:text-vermilion"
              }`}
            >
              {item.label}
              <span
                aria-hidden="true"
                className={`absolute inset-x-2.5 bottom-0 h-[2px] origin-left bg-vermilion transition-transform duration-300 lg:inset-x-3.5 ${
                  isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="ml-3 hidden md:block">
          <ThemeToggle />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "关闭菜单" : "打开菜单"}
          className="focus-ring ml-auto flex h-9 items-center gap-2 border border-line px-3 font-ui text-[12px] tracking-[0.08em] md:hidden"
        >
          {open ? <X size={15} /> : <Menu size={15} />}
          {open ? "关闭" : "目录"}
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-paper md:hidden" aria-label="移动端导航">
          <ol className="container-page divide-y divide-line">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between py-3.5 font-display text-lg ${
                    isActive(item.href) ? "text-vermilion" : "text-ink"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && <span className="h-1.5 w-1.5 rotate-45 bg-vermilion" aria-hidden="true" />}
                </Link>
              </li>
            ))}
            <li className="flex items-center justify-between py-3.5">
              <span className="font-display text-lg">显示主题</span>
              <ThemeToggle />
            </li>
          </ol>
        </nav>
      )}
    </header>
  );
}
