"use client";

import type { Region } from "@/types/content";

const SHAPES: Array<{
  region: Region;
  path: string;
  label: [number, number];
}> = [
  { region: "石嘴山", path: "M82 24 166 20 185 54 146 78 78 64Z", label: [128, 49] },
  { region: "银川", path: "M78 64 146 78 169 108 116 133 61 112Z", label: [114, 102] },
  { region: "吴忠", path: "M116 133 169 108 215 145 194 197 132 183Z", label: [164, 157] },
  { region: "中卫", path: "M61 112 116 133 132 183 83 221 31 181Z", label: [86, 160] },
  { region: "固原", path: "M132 183 194 197 215 244 134 256 83 221Z", label: [151, 224] },
];

export function NingxiaMap({
  selected,
  onSelect,
  counts,
}: {
  selected?: Region | null;
  onSelect?: (region: Region | null) => void;
  counts?: Partial<Record<Region, number>>;
}) {
  return (
    <svg
      viewBox="0 0 240 286"
      role="group"
      aria-label="宁夏五市示意地图，可选择城市筛选景区"
      className="h-auto w-full"
    >
      <rect x="0" y="0" width="240" height="286" fill="transparent" />
      <text x="14" y="17" fontSize="10" fill="var(--color-ink-500)" fontFamily="sans-serif" letterSpacing="1">
        N ↑
      </text>

      {SHAPES.map(({ region, path, label }) => {
        const active = selected === region;
        return (
          <g
            key={region}
            role="button"
            tabIndex={0}
            aria-pressed={active}
            aria-label={`筛选${region}，${counts?.[region] ?? 0}个景区`}
            onClick={() => onSelect?.(active ? null : region)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect?.(active ? null : region);
              }
            }}
            className="map-region cursor-pointer"
          >
            <path
              d={path}
              fill={active ? "var(--color-vermilion)" : "var(--color-paper-light)"}
              stroke={active ? "var(--color-vermilion-deep)" : "var(--color-line-strong)"}
              strokeWidth={active ? 2 : 1.2}
              className="transition-colors duration-200"
            />
            <text
              x={label[0]}
              y={label[1]}
              textAnchor="middle"
              fontSize="12"
              fontWeight={active ? 700 : 500}
              fill={active ? "var(--color-paper-light)" : "var(--color-ink-700)"}
            >
              {region}
            </text>
            <text
              x={label[0]}
              y={label[1] + 16}
              textAnchor="middle"
              fontSize="10"
              fill={active ? "var(--color-paper-light)" : "var(--color-ink-500)"}
              opacity={active ? 0.8 : 1}
            >
              {counts?.[region] ?? 0} 个
            </text>
          </g>
        );
      })}

      <path d="M27 279h186" stroke="var(--color-line)" />
      <text x="14" y="279" fontSize="9" fill="var(--color-ink-500)" fontFamily="sans-serif">
        方位示意 · 非精确行政区划
      </text>
    </svg>
  );
}
