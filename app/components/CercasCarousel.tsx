'use client';

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Pause, Play } from "lucide-react";
import {
  poductsCardsPages,
  cercasProntasInfo,
  type CercaSlide,
} from "../assets/data";

const AUTOPLAY_INTERVAL = 5000;

const MESH_WIDTH = 400;
const MESH_HEIGHT = 120;
const DEFAULT_MESH_COLOR = "#ff5500";

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

  useGSAP(() => {
    const root = wrapRef.current;
    if (!root) return;
    const hLines = root.querySelectorAll<SVGLineElement>(".mesh-h-line");
    const vLines = root.querySelectorAll<SVGLineElement>(".mesh-v-line");
    const post = root.querySelector<SVGRectElement>(".mesh-post");

    gsap.set(hLines, { attr: { x2: 0 }, opacity: 0 });
    gsap.set(vLines, { attr: { y1: MESH_HEIGHT }, opacity: 0 });
    gsap.set(post, { attr: { y: POST_Y - MESH_HEIGHT }, opacity: 0 });

    const tl = gsap.timeline({ delay: 0.2 });
    tl.to(hLines, {
      attr: { x2: MESH_WIDTH },
      opacity: 1,
      duration: 0.7,
      stagger: 0.05,
      ease: "power2.out",
    })
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
      });

    return () => {
      tl.kill();
    };
  }, [playKey]);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none absolute left-0 z-10 w-1/2"
      style={{ bottom: "14%", height: "45%" }}
    >
      <svg
        viewBox={`0 0 ${MESH_WIDTH} ${MESH_HEIGHT}`}
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
            className="mesh-h-line"
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

const JAVALI_SRC =
  "https://res.cloudinary.com/kcqitv3l/image/upload/v1785435812/javaporco_b7wa7q.png";

// % ilustrativa de contenção (não é laudo técnico) — estimada a partir da largura
// da malha na base (quanto menor, mais fechada) e de a tela listar Javaporco entre
// os animais indicados no card do produto.
const RESISTANCE_PCT: Record<string, number> = {
  "Cerca Fenix Insul": 96,
  "Cerca Campeira Maxx Insul": 90,
  "Cerca Campeira Insul": 68,
  "Cerca Campeira Boi Insul": 72,
};

const RESISTANCE_ITEMS = [
  "Cerca Fenix Insul",
  "Cerca Campeira Maxx Insul",
  "Cerca Campeira Insul",
  "Cerca Campeira Boi Insul",
].map((label) => {
  const product = poductsCardsPages.find((p) => p.name === label);
  const slug = product?.to?.split("/").pop();
  const info = cercasProntasInfo.find((c) => c.slug === slug);
  return {
    label,
    shortLabel: info?.name ?? label,
    color: info?.color ?? DEFAULT_MESH_COLOR,
    pct: RESISTANCE_PCT[label] ?? 80,
  };
});

const JavaliCollision = ({
  activeLabel,
  trigger,
}: {
  activeLabel: string;
  trigger: boolean;
}) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const root = rootRef.current;
    if (!root) return;
    const javali = root.querySelector<HTMLImageElement>(".javali-img");
    const stat = root.querySelector<HTMLDivElement>(".javali-stat");
    const fills = root.querySelectorAll<HTMLDivElement>(".mesh-fill");

    if (!trigger) {
      gsap.set(javali, { left: "90%", xPercent: -50, scale: 1, opacity: 0 });
      gsap.set(stat, { opacity: 0, y: 10 });
      gsap.set(fills, { height: "0%" });
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
      })
      .to(
        stat,
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
        "-=0.25",
      )
      .to(
        fills,
        {
          height: (_, target) => `${target.dataset.pct}%`,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.15",
      );

    return () => {
      tl.kill();
    };
  }, [trigger]);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
    >
      <img
        src={JAVALI_SRC}
        alt="Javali colidindo com a tela"
        className="javali-img absolute h-[21%] w-auto drop-shadow-md"
        style={{ bottom: "15%" }}
      />
      <div className="javali-stat absolute left-3/4 top-[46%] z-10 flex -translate-x-1/2 -translate-y-1/2 items-end gap-6 rounded-2xl bg-[#002d4d]/5 px-5 py-4 backdrop-blur-md ring-1 ring-[#002d4d]/10 dark:bg-white/10 dark:ring-white/10">
        {RESISTANCE_ITEMS.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-2.5">
            <span
              className={`text-[10px] font-bold uppercase leading-tight tracking-tight whitespace-nowrap text-[#002d4d] dark:text-white ${
                item.label === activeLabel ? "" : "opacity-40"
              }`}
            >
              {item.shortLabel}
            </span>
            <div className="flex h-36 w-5 flex-col justify-end overflow-hidden rounded-full bg-[#002d4d]/10 dark:bg-white/10">
              <div
                className="mesh-fill w-full rounded-full"
                data-pct={item.pct}
                style={{ backgroundColor: item.color }}
              />
            </div>
            <span
              className="text-xl font-bold leading-none"
              style={{ color: item.color }}
            >
              {item.pct}%
            </span>
          </div>
        ))}
      </div>
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
      <g className="text-emerald-950" fill="currentColor">
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
          Porcentagem de dano <br /> contra grandes impactos
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
    </div>
  );
};

export default CercasCarousel;
