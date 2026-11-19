/**
 * 头版拓片：贺兰口岩画场景。
 *
 * 以「墨底纸线」的拓片语言替代渐变插画——
 * 太阳神图腾居上，贺兰山脊与岩羊群居中，黄河与沙丘居下，
 * 四角带测绘刻度与图版编号，模拟考古图录里的一张拓片。
 */

export function HeroArt() {
  return (
    <svg viewBox="0 0 480 600" role="presentation" aria-hidden="true" className="block h-full w-full">
      <defs>
        <pattern id="rub-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(24)">
          <line x1="0" y1="0" x2="0" y2="7" stroke="var(--color-paper-light)" strokeWidth="0.6" opacity="0.12" />
        </pattern>
      </defs>

      {/* 墨底 */}
      <rect width="480" height="600" fill="var(--color-ink)" />

      {/* 四角测绘刻度 */}
      <g stroke="var(--color-paper-light)" strokeWidth="1" opacity="0.5">
        <path d="M22 22 h20 M22 22 v20" />
        <path d="M458 22 h-20 M458 22 v20" />
        <path d="M22 578 h20 M22 578 v-20" />
        <path d="M458 578 h-20 M458 578 v-20" />
      </g>

      {/* 图版编号与测绘注记 */}
      <text x="30" y="40" fontFamily="ui-monospace, Consolas, monospace" fontSize="11" letterSpacing="3" fill="var(--color-paper-light)" opacity="0.55">
        PLATE HL-01
      </text>
      <text x="450" y="40" textAnchor="end" fontFamily="ui-monospace, Consolas, monospace" fontSize="11" letterSpacing="3" fill="var(--color-paper-light)" opacity="0.55">
        贺兰口
      </text>

      {/* 太阳神图腾：朱砂凿刻 */}
      <g stroke="var(--color-vermilion)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="translate(240 158)">
        <circle r="34" />
        <circle r="52" opacity="0.9" />
        <path d="M-13 -12 v8 M13 -12 v8 M-11 16 h22" strokeWidth="3.4" />
        {/* 长短不一的光芒，保留手工感 */}
        <path d="M0 -52 v-26 M0 52 v26 M-52 0 h-26 M52 0 h26" />
        <path d="M-37 -37 l-18 -18 M37 37 l18 18 M37 -37 l18 -18 M-37 37 l-18 18" opacity="0.85" />
        <path d="M-19 -48 l-9 -22 M19 48 l9 22 M-48 19 l-22 9 M48 -19 l22 -9" opacity="0.7" />
        <path d="M-48 -19 l-22 -9 M48 19 l22 9 M-19 48 l-9 22 M19 -48 l9 -22" opacity="0.55" />
      </g>
      <text x="240" y="290" textAnchor="middle" fontFamily="ui-monospace, Consolas, monospace" fontSize="10" letterSpacing="4" fill="var(--color-vermilion)" opacity="0.8">
        太阳神 · 贺兰山岩画
      </text>

      {/* 贺兰山脊：三重折线 */}
      <g stroke="var(--color-paper-light)" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 400 L90 320 L140 368 L196 306 L262 372 L320 330 L380 386 L430 352 L462 384" strokeWidth="2.6" opacity="0.9" />
        <path d="M20 430 L82 366 L136 408 L198 352 L258 410 L322 372 L384 420 L436 388 L462 412" strokeWidth="2" opacity="0.55" />
        <path d="M20 458 L76 408 L132 446 L200 396 L260 446 L324 410 L386 452 L440 424 L462 442" strokeWidth="1.4" opacity="0.3" />
      </g>
      {/* 山面排线 */}
      <path d="M20 400 L90 320 L140 368 L196 306 L262 372 L320 330 L380 386 L430 352 L462 384 L462 600 L20 600 Z" fill="url(#rub-hatch)" />

      {/* 岩羊群：山脊上的凿刻小像 */}
      <g stroke="var(--color-paper-light)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
        <g transform="translate(96 286) scale(0.62)">
          <path d="M10 30 q8 -4 18 -3 q7 1 12 -1 M13 31 l-1 11 M19 30 l0 12 M30 29 l1 12 M36 28 l2 11 M37 27 q4 -3 4 -8 M41 19 q6 -3 4 -10 q-2 -4 -6 -2" />
        </g>
        <g transform="translate(330 292) scale(0.52)">
          <path d="M8 28 q10 -3 20 -1 q6 1 10 -2 M12 29 l-2 12 M18 28 l-1 13 M28 28 l1 13 M34 27 l2 12 M36 26 q3 -6 6 -9 M41 15 q-1 -6 -5 -8 M41 15 q3 -5 7 -6" />
        </g>
        <g transform="translate(232 328) scale(0.4)">
          <path d="M10 30 q8 -4 18 -3 q7 1 12 -1 M13 31 l-1 11 M19 30 l0 12 M30 29 l1 12 M36 28 l2 11 M37 27 q4 -3 4 -8 M41 19 q6 -3 4 -10 q-2 -4 -6 -2" />
        </g>
      </g>

      {/* 手印：崖壁祭祀符号 */}
      <g stroke="var(--color-vermilion)" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.65" transform="translate(408 300) scale(0.5)">
        <path d="M14 40 q-2 -10 0 -16 M14 24 q-2 -5 1 -5 q2 0 2 5 M18 24 v-8 q0 -3 2 -3 q2 0 2 3 v8 M24 24 v-9 q0 -3 2 -3 q2 0 2 3 v9 M30 25 v-6 q0 -3 2 -3 q2 0 2 3 v7 M36 26 q3 -2 4 1 q1 2 -2 6 q-4 5 -4 7 M14 40 q10 4 20 0" />
      </g>

      {/* 黄河：S 形大弯 */}
      <path
        d="M-10 512 C90 478 150 532 250 502 C350 472 410 522 490 496"
        stroke="var(--color-paper-light)"
        strokeWidth="4.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.95"
      />
      <path
        d="M-10 536 C96 502 156 556 256 526 C356 496 416 546 490 520"
        stroke="var(--color-paper-light)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.45"
      />

      {/* 沙丘线 */}
      <path d="M20 566 C100 542 180 578 268 556 C356 534 420 570 462 552" stroke="var(--color-paper-light)" strokeWidth="1.6" fill="none" opacity="0.5" />

      {/* 底部经纬注记 */}
      <text x="30" y="592" fontFamily="ui-monospace, Consolas, monospace" fontSize="10" letterSpacing="2" fill="var(--color-paper-light)" opacity="0.4">
        38.47°N 105.97°E — 拓片比例 1:∞
      </text>
    </svg>
  );
}
