import Link from "next/link";
import { RockGlyph, SymbolMarquee } from "./RockArt";

export function SiteFooter() {
  return (
    <footer className="mt-24">
      {/* 岩画符号跑马灯：纸面上的分隔带 */}
      <div className="border-y border-line">
        <SymbolMarquee />
      </div>

      {/* 墨底拓片区 */}
      <div className="rubbing">
        <div className="container-page relative py-14 md:py-16">
          <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
            <div>
              <p className="font-ui text-[11px] tracking-[0.12em] text-paper/60">关于本站</p>
              <p className="mt-4 flex items-center gap-3">
                <span className="seal">
                  <RockGlyph kind="sun" className="h-6 w-6" strokeWidth={2.6} />
                </span>
                <span className="font-display text-4xl tracking-[0.08em]">宁夏文旅指南</span>
              </p>
              <p className="mt-4 max-w-sm text-sm leading-[1.95] text-paper/65">
                景区、美食、路线、方言与问答。内容基于公开资料整理，门票、开放时间、班次等信息请以景区与官方渠道为准。
              </p>
              <p className="mt-5 font-ui text-[11px] tracking-[0.12em] text-paper/55">
                37.49°N 104.90°E · 宁夏
              </p>
            </div>

            <div>
              <p className="font-ui text-[11px] tracking-[0.12em] text-paper/60">目录</p>
              <ul className="mt-4 space-y-2.5 font-ui text-sm">
                {[
                  ["/attractions", "景区介绍"],
                  ["/foods", "美食推荐"],
                  ["/routes", "旅游路线"],
                  ["/routes/plan", "路线规划器"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <Link className="sweep text-paper/75 transition-colors hover:text-paper" href={href}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-ui text-[11px] tracking-[0.12em] text-paper/60">其他</p>
              <ul className="mt-4 space-y-2.5 font-ui text-sm">
                <li><Link className="sweep text-paper/75 transition-colors hover:text-paper" href="/dialect">方言翻译</Link></li>
                <li><Link className="sweep text-paper/75 transition-colors hover:text-paper" href="/ask">站内问答</Link></li>
                <li><Link className="sweep text-paper/75 transition-colors hover:text-paper" href="/about">内容来源与声明</Link></li>
              </ul>
            </div>
          </div>

          <div className="relative mt-14 flex flex-col justify-between gap-3 border-t border-paper/15 pt-5 font-ui text-[11px] tracking-[0.06em] text-paper/55 md:flex-row">
            <span>© 2026 宁夏文旅指南 · 学习 / 演示项目</span>
            <span>内容基于公开资料整理 · 票务与时间以官方发布为准</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
