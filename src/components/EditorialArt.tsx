import type { Attraction, Food, TravelRoute } from "@/types/content";
import { RockGlyph, glyphForAttraction, type RockGlyphKind } from "./RockArt";

function hashText(text: string) {
  return Array.from(text).reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
}

function sceneFor(kind: RockGlyphKind) {
  if (kind === "wave" || kind === "camel") return "water";
  if (kind === "mountain" || kind === "dune") return "mountain";
  return "heritage";
}

export function DestinationArt({
  attraction,
  className = "",
  priority = false,
}: {
  attraction: Attraction;
  className?: string;
  priority?: boolean;
}) {
  const glyph = glyphForAttraction(attraction.name, attraction.tags);
  const scene = sceneFor(glyph);
  const id = `scene-${attraction.slug.replace(/[^a-z0-9-]/gi, "")}`;
  const isHeritage = scene === "heritage";
  const isWater = scene === "water";

  return (
    <div
      className={`destination-art relative isolate overflow-hidden border border-line bg-paper-deep ${className}`}
      aria-label={`${attraction.name}目的地插画`}
      role="img"
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 640 440" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--scene-sky-top)" />
            <stop offset="1" stopColor="var(--scene-sky-bottom)" />
          </linearGradient>
          <linearGradient id={`${id}-ground`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--scene-ground-1)" />
            <stop offset="1" stopColor="var(--scene-ground-2)" />
          </linearGradient>
          <pattern id={`${id}-hatch`} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(18)">
            <path d="M0 0v14" stroke="var(--scene-line)" strokeOpacity=".23" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="640" height="440" fill={`url(#${id}-sky)`} />
        <circle cx="500" cy="104" r="58" fill="var(--scene-sun)" />
        <circle cx="500" cy="104" r="82" fill="none" stroke="var(--scene-line)" strokeOpacity=".2" />

        {isWater ? (
          <>
            <path d="M0 279C104 244 165 299 265 274s159-19 260 4c50 11 85 12 115 3v159H0Z" fill="var(--scene-water)" />
            <path d="M0 344c110-44 181 20 276-11s174-38 262-8c39 14 70 15 102 7v108H0Z" fill={`url(#${id}-ground)`} />
            <path d="M35 323c67-20 112 11 174-3s109-25 170-6 120 5 225-18" fill="none" stroke="var(--scene-line)" strokeOpacity=".45" />
            <path d="M55 357c73-23 132 15 205-5s116-27 203-2 115 2 151-10" fill="none" stroke="var(--scene-line)" strokeOpacity=".26" />
            <g fill="none" stroke="var(--scene-reed)" strokeWidth="3" strokeLinecap="round">
              <path d="M56 395c15-45 6-81 15-119M76 397c-2-44 13-83 1-113M98 397c11-47 23-67 35-97" />
              <path d="M61 328l-18-21M75 317l23-20M112 335l25-23" />
            </g>
          </>
        ) : (
          <>
            <path d="M0 265 119 161l68 63 98-121 109 125 73-82 173 132v162H0Z" fill={`url(#${id}-ground)`} />
            <path d="M0 315c126-35 194 20 300-3s184-7 340 28v100H0Z" fill="var(--scene-dune)" />
            <path d="M0 378c109-35 194 3 287-17s209-22 353 18v61H0Z" fill="var(--scene-foreground)" />
            <path d="M0 392c132-35 223 6 321-13s196-10 319 18" fill="none" stroke="var(--scene-line)" strokeOpacity=".32" />
          </>
        )}

        {isHeritage && (
          <g
            transform="translate(262 126)"
            fill="none"
            stroke="var(--scene-monument)"
            strokeWidth="5"
            strokeLinejoin="round"
            strokeLinecap="round"
          >
            {glyph === "pagoda" ? (
              <>
                <path d="M-68 184h136M-54 154h108l-10-36H-44Z" />
                <path d="M-42 118H42L28 82H-28ZM-25 82H25L12 43H-12Z" />
                <path d="M0 43V4M-25 4h50" />
              </>
            ) : glyph === "fort" ? (
              <>
                <path d="M-96 184v-82h20v-24h30v24h30v-24h32v24h30v-24h30v24h20v82Z" />
                <path d="M-28 184v-42c0-24 56-24 56 0v42" />
              </>
            ) : (
              <>
                <path d="M-100 184v-68c0-56 44-92 100-92s100 36 100 92v68" />
                <path d="M-43 184c-6-54 12-84 43-104 31 20 49 50 43 104" />
                <circle cx="0" cy="116" r="8" />
              </>
            )}
          </g>
        )}

        <rect width="640" height="440" fill={`url(#${id}-hatch)`} />
      </svg>

      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 font-ui text-[11px] tracking-[0.12em] text-ink-700">
        <span>{attraction.region}</span>
        <span>{attraction.type}</span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink/60 to-transparent px-4 pb-4 pt-14 text-paper-light">
        <div>
          <p className="font-display text-[clamp(22px,3vw,42px)] leading-none tracking-[0.04em]">{attraction.name}</p>
          <p className="mt-2 max-w-md text-[11px] leading-relaxed text-paper-light/75">{attraction.bestSeason}</p>
        </div>
        <RockGlyph
          kind={glyph}
          className="h-12 w-12 shrink-0 opacity-85"
          strokeWidth={priority ? 1.7 : 1.9}
        />
      </div>
    </div>
  );
}

export function DishArt({
  food,
  className = "",
}: {
  food: Food;
  className?: string;
}) {
  const tone = hashText(food.slug) % 3;
  const toneClass = tone === 0 ? "dish-art-vermilion" : tone === 1 ? "dish-art-ochre" : "dish-art-teal";
  const isTea = food.flavorTags.includes("茶饮");
  const isSkewer = food.flavorTags.includes("烧烤") || food.name.includes("羊排");
  const isNoodle = food.flavorTags.includes("面食") || food.name.includes("面");

  return (
    <div
      className={`dish-art ${toneClass} relative isolate overflow-hidden border border-line ${className}`}
      aria-label={`${food.name}风味插画`}
      role="img"
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 360 260" preserveAspectRatio="xMidYMid slice">
        <rect width="360" height="260" fill="var(--dish-wash)" />
        <circle cx="292" cy="48" r="72" fill="var(--dish-glow)" />
        <g fill="none" stroke="var(--dish-line)" strokeOpacity=".18" strokeWidth="1">
          <path d="M-30 210 390 85M-25 240 395 113M-28 270 392 141" />
        </g>
        {isTea ? (
          <g transform="translate(178 142)" fill="none" stroke="var(--dish-line)" strokeWidth="4">
            <path d="M-72 12h132v45c0 37-28 58-66 58s-66-21-66-58Z" fill="var(--dish-bowl)" />
            <path d="M60 22c47-8 51 49 3 59" />
            <path d="M-88 121h178" />
            <g strokeOpacity=".5">
              <path d="M-38 2c14-18 24 18 38 0s24 18 38 0" />
              <path d="M-18 -31c9-18 17 18 26 0M20 -42c8-16 15 16 23 0" />
            </g>
          </g>
        ) : isSkewer ? (
          <g transform="translate(178 142)" fill="none" stroke="var(--dish-line)" strokeWidth="4">
            <path d="M-108 76 74-70M-72 102 110-44M-25 118 156-27" strokeOpacity=".55" />
            <g fill="var(--dish-bowl)">
              <rect x="-82" y="-18" width="66" height="45" rx="20" transform="rotate(-38)" />
              <rect x="-35" y="4" width="66" height="45" rx="20" transform="rotate(-38)" />
              <rect x="10" y="27" width="66" height="45" rx="20" transform="rotate(-38)" />
            </g>
            <path d="M-126 114h252" strokeOpacity=".22" />
          </g>
        ) : isNoodle ? (
          <g transform="translate(178 144)" fill="none" stroke="var(--dish-line)" strokeWidth="4">
            <ellipse cx="0" cy="30" rx="118" ry="56" fill="var(--dish-surface)" />
            <ellipse cx="0" cy="30" rx="92" ry="40" fill="var(--dish-bowl)" opacity=".86" />
            <g stroke="var(--dish-surface)" strokeWidth="3" strokeOpacity=".8">
              <path d="M-74 23c45-38 94 36 145-4M-80 43c41-28 99 28 155-5M-54 57c36-19 78 17 116-4" />
            </g>
            <path d="M-65 -25c17-24 30 24 48 0s31 24 49 0M-24 -62c9-18 17 18 26 0" strokeOpacity=".45" />
          </g>
        ) : (
          <g transform="translate(178 144)" fill="none" stroke="var(--dish-line)" strokeWidth="4">
            <ellipse cx="0" cy="28" rx="112" ry="54" fill="var(--dish-surface)" />
            <path d="M-87 25c8 58 45 80 87 80s79-22 87-80" fill="var(--dish-bowl)" />
            <path d="M-55 8c17-17 33 17 50 0s33 17 50 0" strokeOpacity=".72" />
            <path d="M-65 -26c17-24 30 24 48 0s31 24 49 0M-24 -63c9-18 17 18 26 0" strokeOpacity=".45" />
          </g>
        )}
        <g fill="var(--dish-line)" opacity=".56">
          <circle cx="74" cy="205" r="4" />
          <circle cx="92" cy="191" r="2.5" />
          <circle cx="55" cy="184" r="3" />
          <path d="m280 202 5-9 5 9-5 9Z" />
          <path d="m306 181 4-7 4 7-4 7Z" />
        </g>
      </svg>
      <span className="absolute left-4 top-3 font-display text-[clamp(32px,5vw,64px)] leading-none text-ink/10">
        {Array.from(food.name)[0]}
      </span>
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-3">
        <span className="bg-paper-light/90 px-2 py-1 font-ui text-[11px] tracking-[0.1em] text-ink-700">
          {food.region}
        </span>
        <span className="font-ui text-[11px] text-ink-700">{food.priceRange}</span>
      </div>
    </div>
  );
}

export function RouteBand({ route, className = "" }: { route: TravelRoute; className?: string }) {
  return (
    <div className={`route-band ${className}`} aria-label={`路线经过：${route.regions.join("、")}`}>
      <div className="flex items-start">
        {route.regions.map((region, index) => (
          <div key={region} className="relative min-w-0 flex-1">
            {index < route.regions.length - 1 && (
              <span className="absolute left-2 right-0 top-[5px] h-px bg-line-strong" aria-hidden="true" />
            )}
            <span className="relative z-10 block h-2.5 w-2.5 rotate-45 bg-vermilion" aria-hidden="true" />
            <span className="mt-2 block truncate pr-2 font-ui text-[11px] text-ink-500">{region}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
