"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Pause, Play, Plus, X } from "lucide-react";
import { cercasProntas, type CercaSlide } from "../assets/data";
import { ANIMAL_IMAGES } from "./ProductCard";

const AUTOPLAY_INTERVAL = 5000;

const MESH_WIDTH = 400;
const MESH_HEIGHT = 120;
const DEFAULT_MESH_COLOR = "#ff5500";

const MESH_EXT_WIDTH = 130;
const TOTAL_MESH_WIDTH = MESH_WIDTH + MESH_EXT_WIDTH;
const CONTAINER_WIDTH_PCT = (TOTAL_MESH_WIDTH / MESH_WIDTH) * 50;
const PERSPECTIVE_POST_COUNT = 5;

const HEIGHT_SCALE_START = 1;
const HEIGHT_SCALE_END = 0.2;
const PERSPECTIVE_EASE = (t: number) => 1 - (1 - t) ** 2;
const heightScaleAt = (t: number) =>
  HEIGHT_SCALE_START +
  (HEIGHT_SCALE_END - HEIGHT_SCALE_START) * PERSPECTIVE_EASE(t);

const LAST_POST_MIN_HEIGHT = 42;

const PERSPECTIVE_POSTS = Array.from(
  { length: PERSPECTIVE_POST_COUNT },
  (_, i) => {
    const t = (i + 1) / PERSPECTIVE_POST_COUNT;
    const eased = PERSPECTIVE_EASE(t);
    const isLast = i === PERSPECTIVE_POST_COUNT - 1;
    const heightScale = heightScaleAt(t);
    const height = isLast
      ? Math.max(MESH_HEIGHT * heightScale, LAST_POST_MIN_HEIGHT)
      : MESH_HEIGHT * heightScale;
    return {
      x: MESH_WIDTH + MESH_EXT_WIDTH * eased,
      topY: MESH_HEIGHT - height,
      height,
      width: 2 + 3 * heightScale,
      isLast,
    };
  },
);

const PERSPECTIVE_CHAIN = [
  { x: MESH_WIDTH, topY: 0, height: MESH_HEIGHT },
  ...PERSPECTIVE_POSTS,
];

const SHADOW_OFFSET = 7;
const POST_TOP_OVERHANG = 14;
const POST_Y = -POST_TOP_OVERHANG;
const POST_HEIGHT = MESH_HEIGHT + POST_TOP_OVERHANG + SHADOW_OFFSET;

const FENCE_HEIGHT_CM = 140;
const BOTTOM_ZONE_CM = 60;
const HORIZONTAL_REF_CM = 240;

interface MeshZoneSpec {
  widthCm: number;
  heightCm: number;
}

interface MeshSpec {
  bottom: MeshZoneSpec;
  top: MeshZoneSpec;
}

const MESH_SPECS: Record<string, MeshSpec> = {
  "Cerca Fenix Insul": {
    bottom: { widthCm: 10, heightCm: 10 },
    top: { widthCm: 10, heightCm: 20 },
  },
  "Cerca Campeira Maxx Insul": {
    bottom: { widthCm: 22, heightCm: 10 },
    top: { widthCm: 22, heightCm: 20 },
  },
  "Cerca Campeira Insul": {
    bottom: { widthCm: 30, heightCm: 10 },
    top: { widthCm: 30, heightCm: 20 },
  },
  "Cerca Campeira Boi Insul": {
    bottom: { widthCm: 30, heightCm: 20 },
    top: { widthCm: 30, heightCm: 20 },
  },
};

const getMeshConfig = (label: string) => {
  const info = cercasProntas.find((c) => c.name === label);
  const spec = MESH_SPECS[label] ?? MESH_SPECS["Cerca Campeira Insul"];

  const unitsPerCm = MESH_HEIGHT / FENCE_HEIGHT_CM;
  const bottomBoundaryY = MESH_HEIGHT - BOTTOM_ZONE_CM * unitsPerCm;

  const rowsY: number[] = [];
  for (
    let y = MESH_HEIGHT;
    y > bottomBoundaryY + 1;
    y -= spec.bottom.heightCm * unitsPerCm
  ) {
    rowsY.push(y);
  }
  for (let y = bottomBoundaryY; y > 2; y -= spec.top.heightCm * unitsPerCm) {
    rowsY.push(y);
  }
  rowsY.push(0);

  const verticalCount = Math.max(
    6,
    Math.min(16, Math.round(HORIZONTAL_REF_CM / spec.bottom.widthCm)),
  );

  return { color: info?.color ?? DEFAULT_MESH_COLOR, verticalCount, rowsY };
};

const InstalledMeshOverlay = ({
  color,
  verticalCount,
  rowsY,
  playKey,
  onLanded,
}: {
  color: string;
  verticalCount: number;
  rowsY: number[];
  playKey: number;
  onLanded?: () => void;
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);

  const rowFractions = useMemo(
    () => rowsY.map((y) => y / MESH_HEIGHT),
    [rowsY],
  );

  const perspectiveLines = useMemo(
    () =>
      PERSPECTIVE_CHAIN.slice(0, -1).flatMap((node, k) => {
        const next = PERSPECTIVE_CHAIN[k + 1];
        return rowFractions.map((frac) => ({
          key: `${k}-${frac}`,
          x1: node.x,
          y1: node.topY + frac * node.height,
          x2: next.x,
          y2: next.topY + frac * next.height,
        }));
      }),
    [rowFractions],
  );

  const perspectiveVerticals = useMemo(
    () =>
      Array.from({ length: verticalCount }, (_, i) => {
        const t = (i + 1) / verticalCount;
        const eased = PERSPECTIVE_EASE(t);
        const height = MESH_HEIGHT * heightScaleAt(t);
        return {
          key: t,
          x: MESH_WIDTH + MESH_EXT_WIDTH * eased,
          y1: MESH_HEIGHT - height,
          y2: MESH_HEIGHT,
        };
      }),
    [verticalCount],
  );

  useGSAP(() => {
    const root = wrapRef.current;
    if (!root) return;
    const hLines = root.querySelectorAll<SVGLineElement>(".mesh-h-line");
    const vLines = root.querySelectorAll<SVGLineElement>(".mesh-v-line");
    const shadowLine = root.querySelector<SVGLineElement>(".mesh-shadow-line");
    const post = root.querySelector<SVGRectElement>(".mesh-post");
    const perspLines = root.querySelectorAll<SVGLineElement>(
      ".mesh-perspective-line",
    );
    const perspVLines = root.querySelectorAll<SVGLineElement>(
      ".mesh-perspective-v-line",
    );
    const perspPosts = root.querySelectorAll<SVGRectElement>(
      ".mesh-perspective-post",
    );

    gsap.set(hLines, { attr: { x2: 0 }, opacity: 0 });
    gsap.set(vLines, { attr: { y1: MESH_HEIGHT }, opacity: 0 });
    gsap.set(shadowLine, { attr: { x2: 0 }, opacity: 0 });
    gsap.set(post, { attr: { y: POST_Y - MESH_HEIGHT }, opacity: 0 });
    gsap.set(perspLines, { opacity: 0 });
    gsap.set(perspVLines, { opacity: 0 });
    gsap.set(perspPosts, {
      opacity: 0,
      scaleY: 0,
      transformOrigin: "50% 100%",
    });

    const tl = gsap.timeline({ delay: 0.2 });
    tl.to(hLines, {
      attr: { x2: MESH_WIDTH },
      opacity: 1,
      duration: 0.7,
      stagger: 0.05,
      ease: "power2.out",
    })
      .to(
        shadowLine,
        {
          attr: { x2: MESH_WIDTH },
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
        },
        "<",
      )
      .to(
        vLines,
        {
          attr: { y1: 0 },
          opacity: 1,
          duration: 0.4,
          stagger: 0.04,
          ease: "power2.out",
        },
        "-=0.4",
      )
      .to(post, {
        attr: { y: POST_Y },
        opacity: 1,
        duration: 0.5,
        ease: "bounce.out",
        onComplete: () => onLanded?.(),
      })
      .to(
        perspPosts,
        {
          opacity: 1,
          scaleY: 1,
          duration: 0.4,
          stagger: 0.06,
          ease: "back.out(1.6)",
        },
        "-=0.1",
      )
      .to(
        perspLines,
        {
          opacity: 1,
          duration: 0.4,
          stagger: 0.015,
          ease: "power1.out",
        },
        "-=0.3",
      )
      .to(
        perspVLines,
        {
          opacity: 1,
          duration: 0.4,
          stagger: 0.02,
          ease: "power1.out",
        },
        "-=0.3",
      );

    return () => {
      tl.kill();
    };
  }, [playKey]);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none absolute left-0 z-10"
      style={{ bottom: "14%", height: "45%", width: `${CONTAINER_WIDTH_PCT}%` }}
    >
      <svg
        viewBox={`0 0 ${TOTAL_MESH_WIDTH} ${MESH_HEIGHT}`}
        preserveAspectRatio="none"
        className="h-full w-full overflow-visible"
      >
        <g
          className="text-black/15 dark:text-black/35"
          stroke="currentColor"
          strokeWidth={5}
          strokeLinecap="round"
        >
          <line
            className="mesh-shadow-line"
            x1={0}
            y1={MESH_HEIGHT + SHADOW_OFFSET}
            x2={0}
            y2={MESH_HEIGHT + SHADOW_OFFSET}
          />
        </g>
        <g
          className="text-[#4a5568] dark:text-white/60"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          {rowsY.map((y) => (
            <line key={y} className="mesh-h-line" x1={0} y1={y} x2={0} y2={y} />
          ))}
        </g>
        <g
          className="text-[#8a94a3] dark:text-white/40"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          {Array.from({ length: verticalCount }).map((_, i) => {
            const x = (MESH_WIDTH / verticalCount) * i + 6;
            return (
              <line
                key={x}
                className="mesh-v-line"
                x1={x}
                y1={MESH_HEIGHT}
                x2={x}
                y2={MESH_HEIGHT}
              />
            );
          })}
        </g>
        <g
          className="text-[#4a5568] dark:text-white/60"
          stroke="currentColor"
          strokeWidth={1}
        >
          {perspectiveLines.map((line) => (
            <line
              key={line.key}
              className="mesh-perspective-line"
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
            />
          ))}
        </g>
        <g
          className="text-[#8a94a3] dark:text-white/40"
          stroke="currentColor"
          strokeWidth={1}
        >
          {perspectiveVerticals.map((line) => (
            <line
              key={line.key}
              className="mesh-perspective-v-line"
              x1={line.x}
              y1={line.y1}
              x2={line.x}
              y2={line.y2}
            />
          ))}
        </g>
        <g opacity={0.85}>
          {PERSPECTIVE_POSTS.filter((p) => p.isLast).map((p) => (
            <rect
              key={p.x}
              className="mesh-perspective-post"
              x={p.x - p.width / 2}
              y={p.topY}
              width={p.width}
              height={p.height}
              rx={1}
              fill={color}
            />
          ))}
        </g>
        <rect
          className="mesh-post"
          x={MESH_WIDTH - 10}
          y={POST_Y}
          width={10}
          height={POST_HEIGHT}
          rx={2}
          fill={color}
        />
      </svg>
    </div>
  );
};

const SLIDE_ANIMALS: Record<
  string,
  { animal: string; mode: "collide" | "escape" }[]
> = {
  "Cerca Fenix Insul": [
    { animal: "Javaporco", mode: "collide" },
    { animal: "Ganso", mode: "escape" },
  ],
  "Cerca Campeira Maxx Insul": [
    { animal: "Javaporco", mode: "collide" },
    { animal: "Avestruz", mode: "escape" },
  ],
  "Cerca Campeira Insul": [{ animal: "Ovinos", mode: "collide" }],
  "Cerca Campeira Boi Insul": [{ animal: "Bovino", mode: "collide" }],
};

const ESCAPE_ANIMAL_HEIGHT: Record<string, string> = {
  Ganso: "h-[13%]",
  Avestruz: "h-[36%]",
};

const COLLIDE_ANIMAL_HEIGHT: Record<string, string> = {
  Ovinos: "h-[27%]",
  Bovino: "h-[60%]",
};

const COLLIDE_ANIMAL_BOTTOM: Record<string, string> = {
  Bovino: "-2%",
};

const TELA_ORDER = [
  "Cerca Campeira Boi Insul",
  "Cerca Campeira Insul",
  "Cerca Campeira Maxx Insul",
  "Cerca Fenix Insul",
];

const TELA_META: Record<string, { name: string; color: string }> =
  Object.fromEntries(
    TELA_ORDER.map((label) => {
      const info = cercasProntas.find((c) => c.name === label);
      return [
        label,
        { name: info?.name ?? label, color: info?.color ?? DEFAULT_MESH_COLOR },
      ];
    }),
  );

const ANIMAL_BASE_HEIGHT: Record<string, number> = {
  Bovino: 100,
  Cães: 76,
  Caprino: 64,
  Suínos: 90,
  Ovinos: 90,
  Capivara: 96,
  Avestruz: 86,
  Javaporco: 96,
  Galinha: 40,
  Ganso: 46,
};

const TELA_ANIMAL_HEIGHT_OVERRIDE: Record<string, Record<string, number>> = {
  "Cerca Campeira Insul": {
    Ovinos: 80,
    Suínos: 80,
    Caprino: 80,
    Bovino: 92,
  },
  "Cerca Campeira Maxx Insul": {
    Bovino: ANIMAL_BASE_HEIGHT.Javaporco,
  },
};

const getAnimalBarHeight = (animal: string, telaLabel: string) =>
  TELA_ANIMAL_HEIGHT_OVERRIDE[telaLabel]?.[animal] ??
  ANIMAL_BASE_HEIGHT[animal];

const telaContainsAnimal = (telaLabel: string, animal: string) => {
  const info = cercasProntas.find((c) => c.name === telaLabel);
  return info?.animals.includes(animal) ?? false;
};

const ANIMAL_CLASSES: {
  label: string;
  animals: string[];
  collapseIcon?: string;
}[] = [
  { label: "Bovinos", animals: ["Bovino"] },
  { label: "Caprinos", animals: ["Caprino"] },
  { label: "Ovinos", animals: ["Ovinos"] },
  { label: "Suínos", animals: ["Suínos", "Javaporco"] },
  {
    label: "Aves",
    animals: ["Avestruz", "Galinha", "Ganso"],
    collapseIcon: "Avestruz",
  },
  { label: "Cães e silvestres", animals: ["Cães", "Capivara"] },
];

interface ChartItem {
  key: string;
  displayLabel: string;
  iconAnimal: string;
  coverageAnimals: string[];
  baseHeight: number;
  classLabel: string;
}

const ANIMAL_DISPLAY_NAME: Record<string, string> = {
  Bovino: "Bovinos",
  Caprino: "Caprinos",
};

const CHART_ITEMS: ChartItem[] = ANIMAL_CLASSES.flatMap((c) => {
  if (c.collapseIcon) {
    return [
      {
        key: c.label,
        displayLabel: c.label,
        iconAnimal: c.collapseIcon,
        coverageAnimals: c.animals,
        baseHeight: Math.max(...c.animals.map((a) => ANIMAL_BASE_HEIGHT[a])),
        classLabel: c.label,
      },
    ];
  }
  return c.animals.map((animal) => ({
    key: animal,
    displayLabel: ANIMAL_DISPLAY_NAME[animal] ?? animal,
    iconAnimal: animal,
    coverageAnimals: [animal],
    baseHeight: ANIMAL_BASE_HEIGHT[animal],
    classLabel: c.label,
  }));
});

const BAR_MAX_VALUE = Math.max(
  ...CHART_ITEMS.map((i) => i.baseHeight),
  ...Object.values(TELA_ANIMAL_HEIGHT_OVERRIDE).flatMap((o) =>
    Object.values(o),
  ),
);

const BAR_MIN_VALUE = 5;

const ANIMAL_CLASS_RANGES = (() => {
  let idx = 0;
  return ANIMAL_CLASSES.map((c) => {
    const start = idx;
    idx += c.collapseIcon ? 1 : c.animals.length;
    return { label: c.label, start, end: idx - 1 };
  });
})();

const BAR_CHART_W = 640;
const BAR_CHART_H = 276;
const BAR_PAD_L = 46;
const BAR_PAD_R = 20;
const BAR_PAD_T = 24;
const BAR_PAD_B = 76;
const BAR_PLOT_W = BAR_CHART_W - BAR_PAD_L - BAR_PAD_R;
const BAR_PLOT_H = BAR_CHART_H - BAR_PAD_T - BAR_PAD_B;
const BAR_PLOT_BOTTOM = BAR_PAD_T + BAR_PLOT_H;

const BAR_SLOT_W = BAR_PLOT_W / CHART_ITEMS.length;
const BAR_WIDTH = BAR_SLOT_W * 0.55;

const barX = (i: number) => BAR_PAD_L + BAR_SLOT_W * i + BAR_SLOT_W / 2;
const slotEdgeX = (i: number) => BAR_PAD_L + BAR_SLOT_W * i;

const BAR_PALETTE = [
  "#b5c327",
  "#4fc1c1",
  "#1f3d5c",
  "#e0575b",
  "#f5a623",
  "#8a6fbe",
  "#2fb6a5",
  "#d94f70",
];

const BAR_GRID_TICKS = [0, 0.25, 0.5, 0.75, 1];

const JavaliCollision = ({
  activeLabel,
  trigger,
}: {
  activeLabel: string;
  trigger: boolean;
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const slideAnimals = SLIDE_ANIMALS[activeLabel] ?? [];

  useGSAP(() => {
    const root = rootRef.current;
    if (!root) return;
    const collideImgs = root.querySelectorAll<HTMLImageElement>(".collide-img");
    const escapeImgs = root.querySelectorAll<HTMLImageElement>(".escape-img");

    if (!trigger) {
      gsap.set(collideImgs, {
        left: "90%",
        xPercent: -50,
        scaleX: -1,
        scaleY: 1,
        opacity: 0,
      });
      gsap.set(escapeImgs, {
        left: "25%",
        xPercent: -50,
        rotate: 0,
        opacity: 0,
      });
      return;
    }

    const tl = gsap.timeline({ delay: 0.15 });
    tl.to(collideImgs, { opacity: 1, duration: 0.1 })
      .to(collideImgs, {
        left: "47%",
        duration: 0.55,
        ease: "power1.in",
      })
      .to(collideImgs, {
        scaleX: -0.75,
        scaleY: 1.2,
        duration: 0.08,
        ease: "power1.out",
      })
      .to(collideImgs, {
        left: "63%",
        scaleX: -1,
        scaleY: 1,
        duration: 0.5,
        ease: "power3.out",
      });

    if (escapeImgs.length) {
      tl.to(escapeImgs, { opacity: 1, duration: 0.1 }, 0.3)
        .to(
          escapeImgs,
          { left: "46%", duration: 0.5, ease: "power1.out" },
          "-=0.05",
        )
        .to(escapeImgs, { rotate: -8, duration: 0.12, ease: "power1.out" })
        .to(escapeImgs, {
          left: "38%",
          rotate: 5,
          duration: 0.35,
          ease: "power2.out",
        })
        .to(escapeImgs, {
          left: "45%",
          rotate: -6,
          duration: 0.35,
          ease: "power2.inOut",
        })
        .to(escapeImgs, {
          left: "39%",
          rotate: 0,
          duration: 0.4,
          ease: "power2.out",
        });
    }

    return () => {
      tl.kill();
    };
  }, [trigger]);

  return (
    <div ref={rootRef} className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 z-[5] overflow-hidden">
        {slideAnimals
          .filter(({ mode }) => mode === "escape")
          .map(({ animal }) => {
            const src = ANIMAL_IMAGES[animal];
            if (!src) return null;
            const heightClass = ESCAPE_ANIMAL_HEIGHT[animal] ?? "h-[13%]";
            return (
              <img
                key={animal}
                src={src}
                alt={`${animal} tentando escapar pelo cercamento`}
                className={`escape-img absolute w-auto drop-shadow-md ${heightClass}`}
                style={{ bottom: "15%" }}
              />
            );
          })}
      </div>

      <div className="absolute inset-0 z-10 overflow-hidden">
        {slideAnimals
          .filter(({ mode }) => mode === "collide")
          .map(({ animal }) => {
            const src = ANIMAL_IMAGES[animal];
            if (!src) return null;
            const heightClass = COLLIDE_ANIMAL_HEIGHT[animal] ?? "h-[21%]";
            const bottom = COLLIDE_ANIMAL_BOTTOM[animal] ?? "6%";
            return (
              <img
                key={animal}
                src={src}
                alt={`${animal} colidindo com a tela`}
                className={`collide-img absolute w-auto drop-shadow-md ${heightClass}`}
                style={{ bottom }}
              />
            );
          })}
      </div>
    </div>
  );
};

const AnimalCoverageChart = ({ activeLabel }: { activeLabel: string }) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const root = rootRef.current;
    if (!root) return;
    const bars = root.querySelectorAll<SVGRectElement>(".coverage-bar");

    gsap.to(bars, {
      attr: {
        height: (_i: number, target: SVGRectElement) =>
          Number(target.dataset.targetH ?? 0),
        y: (_i: number, target: SVGRectElement) =>
          Number(target.dataset.targetY ?? BAR_PLOT_BOTTOM),
      },
      duration: 0.7,
      stagger: 0.04,
      ease: "power2.out",
    });
  }, [activeLabel]);

  const activeName = TELA_META[activeLabel]?.name ?? activeLabel;

  return (
    <div
      ref={rootRef}
      className="mt-4 w-full rounded-2xl bg-white p-4 shadow-lg ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10 sm:p-6"
    >
      <p className="poppins mb-3 text-center text-[15px] font-bold text-[#002d4d] dark:text-white sm:text-lg">
        {activeName}: capacidade de conter cada animal
      </p>
      <svg
        viewBox={`0 0 ${BAR_CHART_W} ${BAR_CHART_H}`}
        className="h-64 w-full overflow-visible sm:h-72"
      >
        {BAR_GRID_TICKS.map((t) => {
          const y = BAR_PLOT_BOTTOM - t * BAR_PLOT_H;
          return (
            <line
              key={t}
              x1={BAR_PAD_L}
              y1={y}
              x2={BAR_CHART_W - BAR_PAD_R}
              y2={y}
              strokeWidth={1}
              strokeDasharray="2 3"
              className="text-black/15 dark:text-white/15"
              stroke="currentColor"
            />
          );
        })}

        {ANIMAL_CLASS_RANGES.slice(1).map((range) => (
          <line
            key={range.label}
            x1={slotEdgeX(range.start)}
            y1={BAR_PAD_T}
            x2={slotEdgeX(range.start)}
            y2={BAR_PLOT_BOTTOM}
            strokeWidth={1}
            strokeDasharray="2 3"
            className="text-black/15 dark:text-white/15"
            stroke="currentColor"
          />
        ))}

        {ANIMAL_CLASS_RANGES.filter((range) => range.end > range.start).map(
          (range) => (
            <text
              key={range.label}
              x={(slotEdgeX(range.start) + slotEdgeX(range.end + 1)) / 2}
              y={BAR_PLOT_BOTTOM + 62}
              textAnchor="middle"
              className="fill-[#002d4d]/55 font-bold uppercase tracking-wide dark:fill-white/55"
              style={{ fontSize: 8 }}
            >
              {range.label}
            </text>
          ),
        )}

        {CHART_ITEMS.map((item, i) => {
          const isCollapsedGroup = item.coverageAnimals.length > 1;
          const contained = item.coverageAnimals.filter((a) =>
            telaContainsAnimal(activeLabel, a),
          );
          const effectiveCoverage =
            isCollapsedGroup && contained.length > 0
              ? contained
              : item.coverageAnimals;
          const supported = effectiveCoverage.every((a) =>
            telaContainsAnimal(activeLabel, a),
          );
          const isPartialGroup =
            isCollapsedGroup &&
            supported &&
            contained.length < item.coverageAnimals.length;
          const displayLabel = isPartialGroup
            ? contained.map((a) => ANIMAL_DISPLAY_NAME[a] ?? a).join(" / ")
            : item.displayLabel;
          const isFenix = activeLabel === "Cerca Fenix Insul";
          const itemHeight = Math.max(
            ...effectiveCoverage.map((a) =>
              getAnimalBarHeight(a, activeLabel),
            ),
          );
          const value = !supported
            ? BAR_MIN_VALUE
            : isFenix
              ? BAR_MAX_VALUE
              : itemHeight;
          const targetH = (value / BAR_MAX_VALUE) * BAR_PLOT_H;
          const targetY = BAR_PLOT_BOTTOM - targetH;
          const x = barX(i);
          const color = BAR_PALETTE[i % BAR_PALETTE.length];
          const src = ANIMAL_IMAGES[item.iconAnimal];

          return (
            <g key={item.key}>
              <rect
                className="coverage-bar transition-[fill-opacity] duration-300"
                data-target-h={targetH}
                data-target-y={targetY}
                x={x - BAR_WIDTH / 2}
                y={BAR_PLOT_BOTTOM}
                width={BAR_WIDTH}
                height={0}
                rx={3}
                fill={color}
                fillOpacity={supported ? 1 : 0.35}
              />
              {src && (
                <image
                  href={src}
                  x={x - 10}
                  y={BAR_PLOT_BOTTOM + 8}
                  width={20}
                  height={20}
                  className="transition-opacity duration-300"
                  opacity={supported ? 1 : 0.5}
                  preserveAspectRatio="xMidYMid meet"
                />
              )}
              <text
                x={x}
                y={BAR_PLOT_BOTTOM + 40}
                textAnchor="middle"
                fill="currentColor"
                className={`text-[#002d4d] transition-opacity duration-300 dark:text-white ${
                  supported ? "font-bold opacity-100" : "font-medium opacity-45"
                }`}
                style={{ fontSize: 9 }}
              >
                {displayLabel}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const RuralBackdrop = () => (
  <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
    <svg
      viewBox="0 0 400 225"
      preserveAspectRatio="none"
      className="h-full w-full"
    >
      <rect
        x={0}
        y={0}
        width={400}
        height={225}
        className="text-[#f5f5f5] dark:text-[#1a1a1a]"
        fill="currentColor"
      />
      <path
        d="M0,158 C60,140 110,150 170,142 C230,134 260,150 400,138 L400,225 L0,225 Z"
        className="text-emerald-700"
        fill="currentColor"
      />
      <path
        d="M0,175 C70,160 140,172 210,163 C280,154 330,168 400,158 L400,225 L0,225 Z"
        className="text-emerald-600"
        fill="currentColor"
      />
      <g className="text-emerald-400" fill="currentColor">
        <rect x={334} y={120} width={6} height={45} rx={2} />
        <ellipse cx={337} cy={108} rx={26} ry={24} />
      </g>
    </svg>
  </div>
);

const ANIMALS_BUTTON_LEFT_PCT = 70;
const ANIMALS_BUTTON_TOP_PCT = 40;
const ANIMALS_CIRCLE_RADIUS_PX = 105;

const AnimalCirclesReveal = ({
  activeLabel,
  open,
}: {
  activeLabel: string;
  open: boolean;
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const info = cercasProntas.find((c) => c.name === activeLabel);
  const animals = info?.animals ?? [];

  useGSAP(() => {
    const root = rootRef.current;
    if (!root) return;
    const circles = root.querySelectorAll<HTMLDivElement>(".animal-circle");
    gsap.fromTo(
      circles,
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.35,
        stagger: 0.06,
        ease: "back.out(1.7)",
      },
    );
  }, [open, activeLabel]);

  if (!open) return null;

  const angleStep = (2 * Math.PI) / animals.length;

  return (
    <div ref={rootRef} className="absolute inset-0 z-10">
      {animals.map((animal, i) => {
        const src = ANIMAL_IMAGES[animal];
        const angle = -Math.PI / 2 + i * angleStep;
        const dx = ANIMALS_CIRCLE_RADIUS_PX * Math.cos(angle);
        const dy = ANIMALS_CIRCLE_RADIUS_PX * Math.sin(angle);
        return (
          <div
            key={animal}
            className="absolute flex flex-col items-center gap-1"
            style={{
              left: `calc(${ANIMALS_BUTTON_LEFT_PCT}% + ${dx}px)`,
              top: `calc(${ANIMALS_BUTTON_TOP_PCT}% + ${dy}px)`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="animal-circle w-10 h-10 rounded-full bg-white/90 shadow-md ring-1 ring-black/5 flex items-center justify-center overflow-hidden dark:bg-white/10 dark:ring-white/10">
              {src && (
                <img
                  src={src}
                  alt={animal}
                  className="w-7 h-7 object-contain"
                />
              )}
            </div>
            <span className="whitespace-nowrap rounded bg-white/70 px-1 text-[8px] font-medium text-[#002d4d] dark:bg-black/40 dark:text-white">
              {animal}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const CercasCarousel = ({ slides }: { slides: CercaSlide[] }) => {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [postLanded, setPostLanded] = useState(false);
  const [showAnimals, setShowAnimals] = useState(false);

  const slide = slides[index];
  const mesh = getMeshConfig(slide.label);
  const titleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -14 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.2 },
    );
  }, [index]);

  const goTo = (i: number) => {
    const nextIndex = (i + slides.length) % slides.length;
    if (nextIndex === index) return;
    setIndex(nextIndex);
    setPostLanded(false);
    setShowAnimals(false);
  };
  const goNext = () => goTo(index + 1);

  useEffect(() => {
    if (!isPlaying || slides.length < 2) return;
    const id = setInterval(goNext, AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
  }, [isPlaying, index, slides.length]);

  return (
    <div className="w-full">
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden select-none">
        <RuralBackdrop />
        <InstalledMeshOverlay
          key={index}
          color={mesh.color}
          verticalCount={mesh.verticalCount}
          rowsY={mesh.rowsY}
          playKey={index}
          onLanded={() => setPostLanded(true)}
        />
        <JavaliCollision
          key={`javali-${index}`}
          activeLabel={slide.label}
          trigger={postLanded}
        />

        <button
          type="button"
          onClick={() => setShowAnimals((v) => !v)}
          aria-label={
            showAnimals
              ? "Esconder animais que a tela contém"
              : "Mostrar animais que a tela contém"
          }
          className="absolute z-20 w-7 h-7 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-[#002d4d]/10 hover:bg-[#002d4d]/20 text-[#002d4d] transition-colors duration-200 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white"
          style={{
            left: `${ANIMALS_BUTTON_LEFT_PCT}%`,
            top: `${ANIMALS_BUTTON_TOP_PCT}%`,
          }}
        >
          {showAnimals ? <X size={14} /> : <Plus size={14} />}
        </button>
        <AnimalCirclesReveal activeLabel={slide.label} open={showAnimals} />

        <p
          ref={titleRef}
          className="absolute poppins left-1/4 top-[22%] z-10 -translate-x-1/2 text-[26px] font-bold tracking-widest text-[#ff5500] dark:text-white"
        >
          {slide.label}
        </p>

        <p className="absolute top-5 right-14 z-10 text-sm font-medium text-[#002d4d]/70 dark:text-white/70">
          {index + 1}/{slides.length}
        </p>

        <button
          type="button"
          onClick={() => setIsPlaying((v) => !v)}
          aria-label={isPlaying ? "Pausar slide" : "Reproduzir slide"}
          className="absolute top-4 right-4 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-[#002d4d]/10 hover:bg-[#002d4d]/20 text-[#002d4d] transition-colors duration-200 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white"
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 max-w-[92%]">
          <div className="flex items-center gap-3 bg-white/80 shadow-lg ring-1 ring-black/5 backdrop-blur rounded-2xl px-3 py-3 overflow-x-auto dark:bg-white/10 dark:ring-white/10">
            {slides.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ir para ${s.label}`}
                className={`shrink-0 w-16 h-2.5 rounded-full sm:w-20 transition-all duration-200 ${
                  i === index
                    ? "bg-[#002d4d] dark:bg-white"
                    : "bg-[#002d4d]/20 hover:bg-[#002d4d]/40 dark:bg-white/20 dark:hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimalCoverageChart activeLabel={slide.label} />
    </div>
  );
};

export default CercasCarousel;
