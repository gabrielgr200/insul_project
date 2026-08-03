"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Pause, Play } from "lucide-react";
import {
  poductsCardsPages,
  cercasProntasInfo,
  type CercaSlide,
} from "../assets/data";
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
  const product = poductsCardsPages.find((p) => p.name === label);
  const slug = product?.to?.split("/").pop();
  const info = cercasProntasInfo.find((c) => c.slug === slug);
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

// animal que colide com a tela na animação, por produto
const SLIDE_ANIMAL: Record<string, string> = {
  "Cerca Fenix Insul": "Javaporco",
  "Cerca Campeira Maxx Insul": "Javaporco",
  "Cerca Campeira Insul": "Caprino",
  "Cerca Campeira Boi Insul": "Bovino",
};

// ordem crescente de abrangência: cada tela seguinte contém os animais da
// anterior + novos animais (mesma lógica da tabela comparativa de referência)
const TELA_ORDER = [
  "Cerca Campeira Boi Insul",
  "Cerca Campeira Insul",
  "Cerca Campeira Maxx Insul",
  "Cerca Fenix Insul",
];

const TELA_META: Record<string, { name: string; color: string }> =
  Object.fromEntries(
    TELA_ORDER.map((label) => {
      const product = poductsCardsPages.find((p) => p.name === label);
      const slug = product?.to?.split("/").pop();
      const info = cercasProntasInfo.find((c) => c.slug === slug);
      return [
        label,
        { name: info?.name ?? label, color: info?.color ?? DEFAULT_MESH_COLOR },
      ];
    }),
  );

// lista de todos os animais, em ordem de "primeira aparição" subindo de tela
// em tela — a Fenix é a única que cobre todos, por isso fica no topo
const ALL_ANIMALS = (() => {
  const ordered: string[] = [];
  const seen = new Set<string>();
  TELA_ORDER.forEach((telaLabel) => {
    const product = poductsCardsPages.find((p) => p.name === telaLabel);
    product?.animals.forEach((animal) => {
      if (!seen.has(animal)) {
        seen.add(animal);
        ordered.push(animal);
      }
    });
  });
  return ordered;
})();

const COV_CHART_W = 640;
const COV_CHART_H = 240;
const COV_PAD_L = 112;
const COV_PAD_R = 24;
const COV_PAD_T = 26;
const COV_PAD_B = 56;
const COV_PLOT_W = COV_CHART_W - COV_PAD_L - COV_PAD_R;
const COV_PLOT_H = COV_CHART_H - COV_PAD_T - COV_PAD_B;

// eixo x = todos os animais; eixo y = as 4 telas (Boi embaixo, Fenix no topo)
const covX = (i: number) =>
  COV_PAD_L + (i / (ALL_ANIMALS.length - 1)) * COV_PLOT_W;

const covY = (tier: number) =>
  COV_PAD_T + (1 - (tier - 1) / (TELA_ORDER.length - 1)) * COV_PLOT_H;

// para cada animal, a tela mais simples que já é suficiente para contê-lo —
// um único ponto por animal, mostrando qual tela é a indicada para cada bicho
const ANIMAL_BEST_TELA = ALL_ANIMALS.map((animal, i) => {
  const tierIdx = TELA_ORDER.findIndex((telaLabel) => {
    const product = poductsCardsPages.find((p) => p.name === telaLabel);
    return product?.animals.includes(animal);
  });
  const tier = tierIdx + 1;
  const telaLabel = TELA_ORDER[tierIdx];
  return { animal, telaLabel, x: covX(i), y: covY(tier) };
});

const ANIMAL_PATH = ANIMAL_BEST_TELA.map((p) => `${p.x},${p.y}`).join(" ");

const JavaliCollision = ({
  activeLabel,
  trigger,
}: {
  activeLabel: string;
  trigger: boolean;
}) => {
  const animalSrc = ANIMAL_IMAGES[SLIDE_ANIMAL[activeLabel]] ?? null;
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const root = rootRef.current;
    if (!root) return;
    const javali = root.querySelector<HTMLImageElement>(".javali-img");

    if (!trigger) {
      gsap.set(javali, { left: "90%", xPercent: -50, scale: 1, opacity: 0 });
      return;
    }

    const tl = gsap.timeline({ delay: 0.15 });
    tl.to(javali, { opacity: 1, duration: 0.1 })
      .to(javali, {
        left: "47%",
        duration: 0.55,
        ease: "power1.in",
      })
      .to(javali, {
        scaleX: 0.75,
        scaleY: 1.2,
        duration: 0.08,
        ease: "power1.out",
      })
      .to(javali, {
        left: "63%",
        scaleX: 1,
        scaleY: 1,
        duration: 0.5,
        ease: "power3.out",
      });

    return () => {
      tl.kill();
    };
  }, [trigger]);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
    >
      {animalSrc && (
        <img
          src={animalSrc}
          alt={`${SLIDE_ANIMAL[activeLabel]} colidindo com a tela`}
          className="javali-img absolute h-[21%] w-auto drop-shadow-md"
          style={{ bottom: "15%" }}
        />
      )}
    </div>
  );
};

const AnimalCoverageChart = ({ activeLabel }: { activeLabel: string }) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const root = rootRef.current;
    if (!root) return;
    const paths = root.querySelectorAll<SVGPolylineElement>(".coverage-path");
    const points = root.querySelectorAll<SVGCircleElement>(".coverage-point");
    const icons = root.querySelectorAll<SVGImageElement>(".coverage-icon");

    gsap.set(paths, {
      attr: {
        strokeDasharray: (_i: number, target: SVGPolylineElement) =>
          target.getTotalLength(),
        strokeDashoffset: (_i: number, target: SVGPolylineElement) =>
          target.getTotalLength(),
      },
    });
    gsap.set(points, { attr: { r: 0 } });
    gsap.set(icons, { attr: { opacity: 0 } });

    const tl = gsap.timeline({ delay: 0.2 });
    tl.to(paths, {
      attr: { strokeDashoffset: 0 },
      duration: 0.9,
      ease: "power2.out",
    })
      .to(
        points,
        {
          attr: {
            r: (_i: number, target: SVGCircleElement) =>
              Number(target.dataset.r ?? 4),
          },
          duration: 0.35,
          stagger: 0.04,
          ease: "back.out(2.5)",
        },
        "-=0.5",
      )
      .to(
        icons,
        {
          attr: {
            opacity: (_i: number, target: SVGImageElement) =>
              Number(target.dataset.opacity ?? 1),
          },
          duration: 0.35,
          stagger: 0.04,
          ease: "power1.out",
        },
        "-=0.3",
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="mt-4 w-full rounded-2xl bg-white p-4 shadow-lg ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10 sm:p-6"
    >
      <p className="poppins mb-3 text-center text-[15px] font-bold text-[#002d4d] dark:text-white sm:text-lg">
        Qual tela é melhor para conter cada animal
      </p>
      <svg
        viewBox={`0 0 ${COV_CHART_W} ${COV_CHART_H}`}
        className="h-64 w-full overflow-visible sm:h-72"
      >
        <rect
          x={COV_PAD_L}
          y={COV_PAD_T}
          width={COV_PLOT_W}
          height={COV_PLOT_H}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          className="text-black/20 dark:text-white/20"
        />

        {TELA_ORDER.map((telaLabel, tierIdx) => {
          const tier = tierIdx + 1;
          const y = covY(tier);
          const isActive = telaLabel === activeLabel;
          const meta = TELA_META[telaLabel];
          return (
            <g key={telaLabel}>
              <line
                x1={COV_PAD_L}
                y1={y}
                x2={COV_CHART_W - COV_PAD_R}
                y2={y}
                strokeWidth={1}
                stroke={isActive ? meta.color : "currentColor"}
                strokeOpacity={isActive ? 0.35 : 1}
                className="text-black/10 transition-all duration-300 dark:text-white/10"
              />
              <text
                x={COV_PAD_L - 10}
                y={y}
                textAnchor="end"
                dominantBaseline="middle"
                fill={isActive ? meta.color : "currentColor"}
                className={`text-[#002d4d] transition-all duration-300 dark:text-white ${
                  isActive ? "font-bold" : "font-medium opacity-45"
                }`}
                style={{ fontSize: 10 }}
              >
                {meta.name}
              </text>
            </g>
          );
        })}

        <polyline
          className="coverage-path"
          points={ANIMAL_PATH}
          fill="none"
          stroke="#002d4d"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity={0.55}
        />

        {ANIMAL_BEST_TELA.map((p) => {
          const isActive = p.telaLabel === activeLabel;
          const meta = TELA_META[p.telaLabel];
          const src = ANIMAL_IMAGES[p.animal];
          const iconSize = isActive ? 24 : 17;
          return (
            <g key={p.animal}>
              <circle
                className="coverage-point"
                data-r={isActive ? 6 : 4}
                cx={p.x}
                cy={p.y}
                r={0}
                fill={meta.color}
                opacity={isActive ? 1 : 0.55}
              />
              {src && (
                <image
                  className="coverage-icon transition-[opacity] duration-300"
                  data-opacity={isActive ? 1 : 0.6}
                  href={src}
                  x={p.x - iconSize / 2}
                  y={COV_CHART_H - COV_PAD_B + 10}
                  width={iconSize}
                  height={iconSize}
                  opacity={isActive ? 1 : 0.6}
                  preserveAspectRatio="xMidYMid meet"
                />
              )}
              <text
                x={p.x}
                y={COV_CHART_H - COV_PAD_B + 40}
                textAnchor="middle"
                fill={isActive ? meta.color : "currentColor"}
                className={`text-[#002d4d] transition-all duration-300 dark:text-white ${
                  isActive ? "font-bold" : "font-medium opacity-55"
                }`}
                style={{ fontSize: 9 }}
              >
                {p.animal}
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

const CercasCarousel = ({ slides }: { slides: CercaSlide[] }) => {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [postLanded, setPostLanded] = useState(false);

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

        <p
          ref={titleRef}
          className="absolute poppins left-1/4 top-[22%] z-10 -translate-x-1/2 text-[22px] font-bold tracking-widest text-[#ff5500] dark:text-white"
        >
          Variedade de animais <br /> que cada tela contém
        </p>

        {/* label */}
        <p className="absolute top-4 left-5 z-10 font-medium text-[#002d4d] dark:text-white">
          {slide.label}
        </p>

        {/* counter */}
        <p className="absolute top-5 right-14 z-10 text-sm font-medium text-[#002d4d]/70 dark:text-white/70">
          {index + 1}/{slides.length}
        </p>

        {/* play/pause */}
        <button
          type="button"
          onClick={() => setIsPlaying((v) => !v)}
          aria-label={isPlaying ? "Pausar slide" : "Reproduzir slide"}
          className="absolute top-4 right-4 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-[#002d4d]/10 hover:bg-[#002d4d]/20 text-[#002d4d] transition-colors duration-200 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white"
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        </button>

        {/* thumbnails */}
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
