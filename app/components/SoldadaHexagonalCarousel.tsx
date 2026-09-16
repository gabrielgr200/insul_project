"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Pause, Play } from "lucide-react";
import type { SoldadaHexagonalInfo } from "../assets/data";
import { ANIMAL_IMAGES } from "./ProductCard";

const AUTOPLAY_INTERVAL = 6000;

const VIEW_W = 400;
const VIEW_H = 225;
const DEFAULT_MESH_COLOR = "#8b959c";
const DEFAULT_POST_COLOR = "#8b959c";
const SLIDE_MESH_COLOR: Record<string, string> = {
  "tela-brava": "#1d5b34",
};
const SLIDE_POST_COLOR: Record<string, string> = {
  "tela-brava": "#86be00",
  "tela-mangueirao-16": "#b3805a",
  "tela-galinheiro-22": "#b3805a",
};
const getPostColor = (slide: SoldadaHexagonalInfo) =>
  SLIDE_POST_COLOR[slide.slug] ?? DEFAULT_POST_COLOR;

const SLIDE_BACKDROP: Record<
  string,
  "beach" | "industrial" | "garden" | "court" | "pigpen" | "coop"
> = {
  "tela-brava": "beach",
  "tela-titan": "industrial",
  "tela-morada-leve": "garden",
  "tela-multymax": "court",
  "tela-mangueirao-16": "pigpen",
  "tela-galinheiro-22": "coop",
};

const SLIDE_MESH_TYPE: Record<string, "grid" | "hex"> = {
  "tela-mangueirao-16": "hex",
  "tela-galinheiro-22": "hex",
};

const MESH_WIDTH = 400;
const MESH_HEIGHT = 120;

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
const HEX_POST_EDGE_INSET = 8;

const parseMeshCm = (paragraph: string) => {
  const toNum = (s: string) => parseFloat(s.replace(",", "."));

  const rect = paragraph.match(/Malha\s*([\d,.]+)\s*cm\s*x\s*([\d,.]+)\s*cm/i);
  if (rect) return { widthCm: toNum(rect[1]), heightCm: toNum(rect[2]) };

  const single = paragraph.match(/(\d+(?:,\d+)?)\s*cm/i);
  if (single) return { widthCm: toNum(single[1]), heightCm: toNum(single[1]) };

  return { widthCm: 10, heightCm: 10 };
};

const getMeshConfig = (slide: SoldadaHexagonalInfo) => {
  const { widthCm, heightCm } = parseMeshCm(slide.paragraph);
  const unitsPerCm = MESH_HEIGHT / FENCE_HEIGHT_CM;

  const rowsY: number[] = [];
  for (let y = MESH_HEIGHT; y > 2; y -= heightCm * unitsPerCm) rowsY.push(y);
  rowsY.push(0);

  const cellWidthUnits = widthCm * unitsPerCm;
  const verticalCount = Math.max(6, Math.round(MESH_WIDTH / cellWidthUnits));

  const color = SLIDE_MESH_COLOR[slide.slug] ?? DEFAULT_MESH_COLOR;
  return {
    color,
    verticalCount,
    rowsY,
    hexRx: undefined as number | undefined,
    hexRy: undefined as number | undefined,
  };
};

const parseHexCm = (paragraph: string) => {
  const match = paragraph.match(/(\d+(?:,\d+)?)\s*cm/i);
  if (!match) return 7.6;
  return parseFloat(match[1].replace(",", "."));
};

const HEX_REF_CM = 7.6;
const HEX_REF_RY = 6;
const HEX_ELONGATION = 1.35;
const HEX_UNITS_PER_CM = MESH_HEIGHT / FENCE_HEIGHT_CM;
const HEX_STYLE_SCALE =
  HEX_REF_RY / ((HEX_REF_CM * HEX_UNITS_PER_CM) / Math.sqrt(3));

const HEX_RY = HEX_REF_RY;
const HEX_RX = HEX_REF_RY * HEX_ELONGATION;

const getHexRadii = (hexCm: number) => {
  const rawShort = (hexCm * HEX_UNITS_PER_CM) / Math.sqrt(3);
  const ry = Math.max(3, Math.min(20, rawShort * HEX_STYLE_SCALE));
  return { rx: ry * HEX_ELONGATION, ry };
};

const hexPoints = (cx: number, cy: number, rx: number, ry: number) =>
  Array.from({ length: 6 }, (_, i) => {
    const angle = (i * 60 * Math.PI) / 180;
    return `${(cx + rx * Math.cos(angle)).toFixed(2)},${(cy + ry * Math.sin(angle)).toFixed(2)}`;
  }).join(" ");

const buildHexGrid = (width: number, height: number, rx: number, ry: number) => {
  const colSpacing = 1.5 * rx;
  const rowSpacing = Math.sqrt(3) * ry;
  const colCount = Math.ceil(width / colSpacing) + 2;
  const rowCount = Math.ceil(height / rowSpacing) + 2;
  const hexes: { cx: number; cy: number; key: string }[] = [];
  for (let col = -2; col <= colCount; col++) {
    const cx = col * colSpacing;
    if (cx < -rx || cx > width + rx) continue;
    const offsetY = col % 2 !== 0 ? rowSpacing / 2 : 0;
    for (let row = -2; row <= rowCount; row++) {
      const cy = row * rowSpacing + offsetY;
      if (cy < -ry || cy > height + ry) continue;
      hexes.push({ cx, cy, key: `${col}-${row}` });
    }
  }
  return hexes;
};

const getHexMeshConfig = (slide: SoldadaHexagonalInfo) => {
  const color = SLIDE_MESH_COLOR[slide.slug] ?? DEFAULT_MESH_COLOR;
  const hexCm = parseHexCm(slide.paragraph);
  const { rx: hexRx, ry: hexRy } = getHexRadii(hexCm);

  const colSpacing = 1.5 * hexRx;
  const rowSpacing = Math.sqrt(3) * hexRy;
  const verticalCount = Math.max(6, Math.round(MESH_WIDTH / colSpacing));
  const rowCount = Math.max(3, Math.round(MESH_HEIGHT / rowSpacing));
  const rowsY = Array.from({ length: rowCount + 1 }, (_, i) =>
    Math.max(0, MESH_HEIGHT - i * (MESH_HEIGHT / rowCount)),
  );

  return { color, verticalCount, rowsY, hexRx, hexRy };
};

const BeachBackdrop = () => {
  const rootRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const root = rootRef.current;
    if (!root) return;
    const waves = root.querySelectorAll<SVGPathElement>(".beach-wave");
    gsap.to(waves, {
      x: -12,
      duration: 3.4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.5,
    });
  }, []);

  return (
    <svg
      ref={rootRef}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="none"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="beach-sky-day" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8fd8ff" />
          <stop offset="100%" stopColor="#e7f7ff" />
        </linearGradient>
        <radialGradient id="beach-sun-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff3c4" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#fff3c4" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="beach-sea-day" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3fb6cf" />
          <stop offset="100%" stopColor="#1f8fa8" />
        </linearGradient>
        <linearGradient id="beach-sand-day" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4dfae" />
          <stop offset="100%" stopColor="#e3c07f" />
        </linearGradient>

        <linearGradient id="beach-sky-night" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0c2333" />
          <stop offset="100%" stopColor="#1c3c4f" />
        </linearGradient>
        <radialGradient id="beach-moon-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#dff1ff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#dff1ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="beach-sea-night" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#123f4d" />
          <stop offset="100%" stopColor="#0a2731" />
        </linearGradient>
        <linearGradient id="beach-sand-night" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a2f1f" />
          <stop offset="100%" stopColor="#241c11" />
        </linearGradient>
      </defs>

      <g className="dark:hidden">
        <rect x={0} y={0} width={VIEW_W} height={VIEW_H} fill="url(#beach-sky-day)" />
        <circle cx={336} cy={44} r={40} fill="url(#beach-sun-glow)" />
        <circle cx={336} cy={44} r={17} fill="#ffcf5c" />
        <rect x={0} y={116} width={VIEW_W} height={54} fill="url(#beach-sea-day)" />
        <path
          className="beach-wave"
          d="M-20,124 C 20,118 60,130 100,124 S 180,118 220,124 S 300,130 340,124 S 400,118 420,124 L420,132 C 380,138 340,128 300,132 S 220,140 180,132 S 100,126 60,132 S 0,140 -20,132 Z"
          fill="#7fd4e6"
          opacity={0.55}
        />
        <path
          className="beach-wave"
          d="M-20,144 C 30,138 70,150 110,144 S 190,138 230,144 S 310,150 350,144 S 400,138 420,144 L420,152 C 370,158 330,148 290,152 S 210,160 170,152 S 90,146 50,152 S 0,158 -20,152 Z"
          fill="#a6e3ef"
          opacity={0.4}
        />
        <path
          d="M0,150 C 60,166 140,158 200,168 C 260,178 320,164 400,172 L400,225 L0,225 Z"
          fill="url(#beach-sand-day)"
        />
        <g fill="#c79f5c" opacity={0.5}>
          <circle cx={64} cy={198} r={1.6} />
          <circle cx={94} cy={210} r={1.2} />
          <circle cx={250} cy={204} r={1.4} />
          <circle cx={352} cy={196} r={1.6} />
          <circle cx={310} cy={214} r={1.1} />
        </g>
      </g>

      <g className="hidden dark:block">
        <rect x={0} y={0} width={VIEW_W} height={VIEW_H} fill="url(#beach-sky-night)" />
        <circle cx={336} cy={44} r={36} fill="url(#beach-moon-glow)" />
        <circle cx={336} cy={44} r={14} fill="#eef6ff" opacity={0.9} />
        <g fill="#eaf6ff" opacity={0.7}>
          <circle cx={60} cy={30} r={0.9} />
          <circle cx={120} cy={20} r={0.7} />
          <circle cx={190} cy={38} r={0.8} />
          <circle cx={250} cy={18} r={0.6} />
          <circle cx={30} cy={60} r={0.7} />
        </g>
        <rect x={0} y={116} width={VIEW_W} height={54} fill="url(#beach-sea-night)" />
        <path
          className="beach-wave"
          d="M-20,124 C 20,118 60,130 100,124 S 180,118 220,124 S 300,130 340,124 S 400,118 420,124 L420,132 C 380,138 340,128 300,132 S 220,140 180,132 S 100,126 60,132 S 0,140 -20,132 Z"
          fill="#1f5768"
          opacity={0.6}
        />
        <path
          d="M0,150 C 60,166 140,158 200,168 C 260,178 320,164 400,172 L400,225 L0,225 Z"
          fill="url(#beach-sand-night)"
        />
      </g>
    </svg>
  );
};

const IndustrialBackdrop = () => {
  const rootRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const root = rootRef.current;
    if (!root) return;
    const puffs = root.querySelectorAll<SVGCircleElement>(".factory-smoke");
    puffs.forEach((puff, i) => {
      gsap.set(puff, { transformOrigin: "50% 100%" });
      const tl = gsap.timeline({ repeat: -1, delay: i * 0.9 });
      tl.set(puff, { y: 0, scale: 0.5, opacity: 0 })
        .to(puff, { opacity: 0.6, duration: 0.4, ease: "power1.out" })
        .to(puff, { y: -28, scale: 1.3, duration: 2.8, ease: "power1.out" }, "<")
        .to(puff, { opacity: 0, duration: 0.8, ease: "power1.in" }, "-=0.8");
    });
  }, []);

  return (
    <svg
      ref={rootRef}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="none"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="factory-sky-day" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c3d6e0" />
          <stop offset="100%" stopColor="#eef4f6" />
        </linearGradient>
        <radialGradient id="factory-sun-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff3c9" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#fff3c9" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="factory-ground-day" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b7bec4" />
          <stop offset="100%" stopColor="#8f979d" />
        </linearGradient>

        <linearGradient id="factory-sky-night" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d1520" />
          <stop offset="100%" stopColor="#2a2420" />
        </linearGradient>
        <linearGradient id="factory-ground-night" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2c3236" />
          <stop offset="100%" stopColor="#181c1e" />
        </linearGradient>
      </defs>

      <g className="dark:hidden">
        <rect x={0} y={0} width={VIEW_W} height={VIEW_H} fill="url(#factory-sky-day)" />
        <circle cx={330} cy={40} r={38} fill="url(#factory-sun-glow)" />
        <circle cx={330} cy={40} r={15} fill="#ffe6a0" opacity={0.9} />

        <g transform="translate(-30 0)">
          <rect x={40} y={112} width={230} height={62} fill="#5b6670" />
          <path
            d="M40,112 L70,96 L100,112 L130,96 L160,112 L190,96 L220,112 L250,96 L270,112 Z"
            fill="#4a545c"
          />
          <g fill="#cfd8dd" opacity={0.85}>
            <rect x={56} y={130} width={14} height={16} />
            <rect x={84} y={130} width={14} height={16} />
            <rect x={112} y={130} width={14} height={16} />
            <rect x={168} y={130} width={14} height={16} />
            <rect x={196} y={130} width={14} height={16} />
            <rect x={224} y={130} width={14} height={16} />
          </g>
          <rect x={126} y={150} width={26} height={24} fill="#33393d" />

          <rect x={200} y={70} width={14} height={44} fill="#7a8189" />
          <rect x={230} y={60} width={14} height={54} fill="#6c7379" />
          <circle className="factory-smoke" cx={207} cy={66} r={7} fill="#c8ced2" />
          <circle className="factory-smoke" cx={237} cy={54} r={8} fill="#d6dadd" />
        </g>

        <rect x={0} y={168} width={VIEW_W} height={57} fill="url(#factory-ground-day)" />
        <line
          x1={0}
          y1={196}
          x2={400}
          y2={196}
          stroke="#eef2f4"
          strokeWidth={2}
          strokeDasharray="10 12"
          opacity={0.5}
        />
      </g>

      <g className="hidden dark:block">
        <rect x={0} y={0} width={VIEW_W} height={VIEW_H} fill="url(#factory-sky-night)" />

        <g transform="translate(-30 0)">
          <rect x={40} y={112} width={230} height={62} fill="#20262b" />
          <path
            d="M40,112 L70,96 L100,112 L130,96 L160,112 L190,96 L220,112 L250,96 L270,112 Z"
            fill="#171c1f"
          />
          <g fill="#ffcf6b" opacity={0.85}>
            <rect x={56} y={130} width={14} height={16} />
            <rect x={112} y={130} width={14} height={16} />
            <rect x={168} y={130} width={14} height={16} />
            <rect x={224} y={130} width={14} height={16} />
          </g>
          <g fill="#12171a">
            <rect x={84} y={130} width={14} height={16} />
            <rect x={196} y={130} width={14} height={16} />
          </g>
          <rect x={126} y={150} width={26} height={24} fill="#0f1315" />

          <rect x={200} y={70} width={14} height={44} fill="#33393e" />
          <rect x={230} y={60} width={14} height={54} fill="#2b3033" />
          <circle cx={207} cy={68} r={2} fill="#ff4d4d" opacity={0.9} />
          <circle className="factory-smoke" cx={207} cy={66} r={7} fill="#3a4247" />
          <circle className="factory-smoke" cx={237} cy={54} r={8} fill="#3a4247" />
        </g>

        <rect x={0} y={168} width={VIEW_W} height={57} fill="url(#factory-ground-night)" />
      </g>
    </svg>
  );
};

const GARDEN_ROWS_Y = [176, 196];
const GARDEN_COLS_X = [30, 90, 150, 210, 270, 330];

const GardenSprout = ({
  x,
  y,
  color,
}: {
  x: number;
  y: number;
  color: string;
}) => (
  <g className="garden-sprout" transform={`translate(${x} ${y})`} fill={color}>
    <ellipse cx={-3.5} cy={-6} rx={4} ry={7} transform="rotate(-28 -3.5 -6)" />
    <ellipse cx={3.5} cy={-6} rx={4} ry={7} transform="rotate(28 3.5 -6)" />
    <ellipse cx={0} cy={-3} rx={3.2} ry={5.5} />
  </g>
);

const GardenBackdrop = () => {
  const rootRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const root = rootRef.current;
    if (!root) return;
    const sprouts = root.querySelectorAll<SVGGElement>(".garden-sprout");
    gsap.set(sprouts, { transformOrigin: "50% 100%" });
    gsap.to(sprouts, {
      rotate: 5,
      duration: 1.7,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.12,
    });
  }, []);

  return (
    <svg
      ref={rootRef}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="none"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="garden-sky-day" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bfe6c9" />
          <stop offset="100%" stopColor="#f3fbe9" />
        </linearGradient>
        <radialGradient id="garden-sun-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff3c4" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#fff3c4" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="garden-soil-day" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8a5a34" />
          <stop offset="100%" stopColor="#5f3c20" />
        </linearGradient>

        <linearGradient id="garden-sky-night" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#101f22" />
          <stop offset="100%" stopColor="#1f2f24" />
        </linearGradient>
        <linearGradient id="garden-soil-night" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a2a1a" />
          <stop offset="100%" stopColor="#231708" />
        </linearGradient>
      </defs>

      <g className="dark:hidden">
        <rect x={0} y={0} width={VIEW_W} height={VIEW_H} fill="url(#garden-sky-day)" />
        <circle cx={330} cy={42} r={38} fill="url(#garden-sun-glow)" />
        <circle cx={330} cy={42} r={16} fill="#ffe08a" />

        <rect x={0} y={150} width={VIEW_W} height={75} fill="url(#garden-soil-day)" />
        <path
          d="M0,158 C60,150 140,156 200,150 C260,144 320,154 400,148 L400,225 L0,225 Z"
          fill="#4f3319"
          opacity={0.5}
        />
        <path
          d="M0,186 C60,180 140,188 200,182 C260,176 320,186 400,180 L400,225 L0,225 Z"
          fill="#4f3319"
          opacity={0.35}
        />

        <g transform="translate(5 46.5) scale(0.75)">
          {GARDEN_ROWS_Y.map((rowY) =>
            GARDEN_COLS_X.map((x) => (
              <GardenSprout key={`${rowY}-${x}`} x={x} y={rowY} color="#4c9a3c" />
            )),
          )}
        </g>
      </g>

      <g className="hidden dark:block">
        <rect x={0} y={0} width={VIEW_W} height={VIEW_H} fill="url(#garden-sky-night)" />
        <circle cx={330} cy={42} r={13} fill="#eef6ff" opacity={0.85} />

        <rect x={0} y={150} width={VIEW_W} height={75} fill="url(#garden-soil-night)" />
        <path
          d="M0,158 C60,150 140,156 200,150 C260,144 320,154 400,148 L400,225 L0,225 Z"
          fill="#170f06"
          opacity={0.5}
        />

        <g transform="translate(5 46.5) scale(0.75)">
          {GARDEN_ROWS_Y.map((rowY) =>
            GARDEN_COLS_X.map((x) => (
              <GardenSprout key={`${rowY}-${x}`} x={x} y={rowY} color="#2c4a26" />
            )),
          )}
        </g>
      </g>
    </svg>
  );
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const COURT_TOP_Y = 124;
const COURT_BOTTOM_Y = 184;
const COURT_TOP_W = 84;
const COURT_BOTTOM_W = 168;
const COURT_CENTER_X = 104;

const courtY = (t: number) => lerp(COURT_TOP_Y, COURT_BOTTOM_Y, t);
const courtLeftX = (t: number) =>
  lerp(COURT_CENTER_X - COURT_TOP_W / 2, COURT_CENTER_X - COURT_BOTTOM_W / 2, t);
const courtRightX = (t: number) =>
  lerp(COURT_CENTER_X + COURT_TOP_W / 2, COURT_CENTER_X + COURT_BOTTOM_W / 2, t);

const COURT_OUTLINE = `M${courtLeftX(0)},${courtY(0)} L${courtRightX(0)},${courtY(0)} L${courtRightX(1)},${courtY(1)} L${courtLeftX(1)},${courtY(1)} Z`;
const courtCrossLine = (t: number) =>
  `M${courtLeftX(t)},${courtY(t)} L${courtRightX(t)},${courtY(t)}`;

const COURT_CIRCLE_CY = courtY(0.5);
const COURT_CIRCLE_RX = (courtRightX(0.5) - courtLeftX(0.5)) * 0.14;
const COURT_CIRCLE_RY = COURT_CIRCLE_RX * 0.42;

const BALL_T = 0.62;
const BALL_MARGIN = 16;
const BALL_Y = courtY(BALL_T);
const BALL_START_X = courtLeftX(BALL_T) + BALL_MARGIN;
const BALL_TRAVEL = courtRightX(BALL_T) - BALL_MARGIN - BALL_START_X;

const COURT_POLE_TOP_Y = 84;
const COURT_POLE_LEFT_X = courtLeftX(1) - 14;
const COURT_POLE_RIGHT_X = courtRightX(1) + 14;

const SportsCourtBackdrop = () => {
  const rootRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const root = rootRef.current;
    if (!root) return;
    const ball = root.querySelectorAll<SVGCircleElement>(".court-ball");
    gsap.set(ball, { transformOrigin: "50% 50%" });
    gsap.to(ball, {
      x: BALL_TRAVEL,
      duration: 1.6,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
    gsap.to(ball, {
      y: -6,
      duration: 0.35,
      ease: "sine.out",
      yoyo: true,
      repeat: -1,
    });
  }, []);

  return (
    <svg
      ref={rootRef}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="none"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="court-sky-day" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8fd0ff" />
          <stop offset="100%" stopColor="#eaf7ff" />
        </linearGradient>
        <radialGradient id="court-sun-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff3c4" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#fff3c4" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="court-ground-day" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6fae4f" />
          <stop offset="100%" stopColor="#4f8a37" />
        </linearGradient>

        <linearGradient id="court-sky-night" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0c1a2b" />
          <stop offset="100%" stopColor="#1a2438" />
        </linearGradient>
        <linearGradient id="court-ground-night" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#243620" />
          <stop offset="100%" stopColor="#152014" />
        </linearGradient>
      </defs>

      <g className="dark:hidden">
        <rect x={0} y={0} width={VIEW_W} height={VIEW_H} fill="url(#court-sky-day)" />
        <circle cx={336} cy={40} r={38} fill="url(#court-sun-glow)" />
        <circle cx={336} cy={40} r={16} fill="#ffe08a" />

        <rect x={0} y={114} width={VIEW_W} height={111} fill="url(#court-ground-day)" />

        <rect
          x={COURT_POLE_LEFT_X - 2}
          y={COURT_POLE_TOP_Y}
          width={4}
          height={courtY(1) - COURT_POLE_TOP_Y}
          fill="#7a8189"
        />
        <circle cx={COURT_POLE_LEFT_X} cy={COURT_POLE_TOP_Y - 2} r={6} fill="#ffe9a8" opacity={0.9} />
        <rect
          x={COURT_POLE_RIGHT_X - 2}
          y={COURT_POLE_TOP_Y}
          width={4}
          height={courtY(1) - COURT_POLE_TOP_Y}
          fill="#7a8189"
        />
        <circle cx={COURT_POLE_RIGHT_X} cy={COURT_POLE_TOP_Y - 2} r={6} fill="#ffe9a8" opacity={0.9} />

        <path d={COURT_OUTLINE} fill="#1f6fb2" />
        <path d={COURT_OUTLINE} fill="none" stroke="#ffffff" strokeWidth={2} />
        <line
          x1={COURT_CENTER_X}
          y1={courtY(0)}
          x2={COURT_CENTER_X}
          y2={courtY(1)}
          stroke="#ffffff"
          strokeWidth={1.4}
        />
        <path d={courtCrossLine(0.28)} stroke="#ffffff" strokeWidth={1.2} fill="none" />
        <path d={courtCrossLine(0.72)} stroke="#ffffff" strokeWidth={1.2} fill="none" />
        <ellipse
          cx={COURT_CENTER_X}
          cy={COURT_CIRCLE_CY}
          rx={COURT_CIRCLE_RX}
          ry={COURT_CIRCLE_RY}
          fill="none"
          stroke="#ffffff"
          strokeWidth={1.2}
        />

        <circle className="court-ball" cx={BALL_START_X} cy={BALL_Y} r={2.6} fill="#f5d33f" />
      </g>

      <g className="hidden dark:block">
        <rect x={0} y={0} width={VIEW_W} height={VIEW_H} fill="url(#court-sky-night)" />
        <circle cx={336} cy={40} r={13} fill="#eef6ff" opacity={0.85} />

        <rect x={0} y={114} width={VIEW_W} height={111} fill="url(#court-ground-night)" />

        <rect
          x={COURT_POLE_LEFT_X - 2}
          y={COURT_POLE_TOP_Y}
          width={4}
          height={courtY(1) - COURT_POLE_TOP_Y}
          fill="#3a4247"
        />
        <circle cx={COURT_POLE_LEFT_X} cy={COURT_POLE_TOP_Y - 2} r={7} fill="#fff3c4" opacity={0.8} />
        <rect
          x={COURT_POLE_RIGHT_X - 2}
          y={COURT_POLE_TOP_Y}
          width={4}
          height={courtY(1) - COURT_POLE_TOP_Y}
          fill="#3a4247"
        />
        <circle cx={COURT_POLE_RIGHT_X} cy={COURT_POLE_TOP_Y - 2} r={7} fill="#fff3c4" opacity={0.8} />

        <path d={COURT_OUTLINE} fill="#123a56" />
        <path d={COURT_OUTLINE} fill="none" stroke="#c8d6e0" strokeWidth={2} opacity={0.85} />
        <line
          x1={COURT_CENTER_X}
          y1={courtY(0)}
          x2={COURT_CENTER_X}
          y2={courtY(1)}
          stroke="#c8d6e0"
          strokeWidth={1.4}
          opacity={0.85}
        />
        <path
          d={courtCrossLine(0.28)}
          stroke="#c8d6e0"
          strokeWidth={1.2}
          fill="none"
          opacity={0.85}
        />
        <path
          d={courtCrossLine(0.72)}
          stroke="#c8d6e0"
          strokeWidth={1.2}
          fill="none"
          opacity={0.85}
        />
        <ellipse
          cx={COURT_CENTER_X}
          cy={COURT_CIRCLE_CY}
          rx={COURT_CIRCLE_RX}
          ry={COURT_CIRCLE_RY}
          fill="none"
          stroke="#c8d6e0"
          strokeWidth={1.2}
          opacity={0.85}
        />
      </g>
    </svg>
  );
};

const PigPenBackdrop = () => {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="none"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="pen-sky-day" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bcdcef" />
          <stop offset="100%" stopColor="#f1ede0" />
        </linearGradient>
        <radialGradient id="pen-sun-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff3c4" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#fff3c4" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pen-mud-day" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9c7248" />
          <stop offset="100%" stopColor="#6e4d2c" />
        </linearGradient>

        <linearGradient id="pen-sky-night" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#171f1a" />
          <stop offset="100%" stopColor="#2a241a" />
        </linearGradient>
        <linearGradient id="pen-mud-night" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a2c1c" />
          <stop offset="100%" stopColor="#221909" />
        </linearGradient>
      </defs>

      <g className="dark:hidden">
        <rect x={0} y={0} width={VIEW_W} height={VIEW_H} fill="url(#pen-sky-day)" />
        <circle cx={336} cy={40} r={38} fill="url(#pen-sun-glow)" />
        <circle cx={336} cy={40} r={16} fill="#ffe08a" />

        <rect x={0} y={150} width={VIEW_W} height={75} fill="url(#pen-mud-day)" />
        <ellipse cx={92} cy={198} rx={30} ry={8} fill="#4a3520" opacity={0.5} />
        <ellipse cx={258} cy={208} rx={38} ry={9} fill="#4a3520" opacity={0.4} />

        <image
          href={ANIMAL_IMAGES.Suínos}
          x={16}
          y={148}
          width={60}
          height={52}
          preserveAspectRatio="xMidYMid meet"
        />
        <image
          href={ANIMAL_IMAGES.Suínos}
          x={58}
          y={164}
          width={47}
          height={41}
          preserveAspectRatio="xMidYMid meet"
        />
        <image
          href={ANIMAL_IMAGES.Suínos}
          x={214}
          y={161}
          width={52}
          height={45}
          preserveAspectRatio="xMidYMid meet"
        />
        <image
          href={ANIMAL_IMAGES.Suínos}
          x={252}
          y={176}
          width={36}
          height={31}
          preserveAspectRatio="xMidYMid meet"
        />
      </g>

      <g className="hidden dark:block">
        <rect x={0} y={0} width={VIEW_W} height={VIEW_H} fill="url(#pen-sky-night)" />
        <circle cx={336} cy={40} r={13} fill="#eef6ff" opacity={0.85} />

        <rect x={0} y={150} width={VIEW_W} height={75} fill="url(#pen-mud-night)" />
        <ellipse cx={92} cy={198} rx={30} ry={8} fill="#100c06" opacity={0.5} />
        <ellipse cx={258} cy={208} rx={38} ry={9} fill="#100c06" opacity={0.4} />

        <image
          href={ANIMAL_IMAGES.Suínos}
          x={16}
          y={148}
          width={60}
          height={52}
          opacity={0.8}
          preserveAspectRatio="xMidYMid meet"
        />
        <image
          href={ANIMAL_IMAGES.Suínos}
          x={58}
          y={164}
          width={47}
          height={41}
          opacity={0.8}
          preserveAspectRatio="xMidYMid meet"
        />
        <image
          href={ANIMAL_IMAGES.Suínos}
          x={214}
          y={161}
          width={52}
          height={45}
          opacity={0.8}
          preserveAspectRatio="xMidYMid meet"
        />
        <image
          href={ANIMAL_IMAGES.Suínos}
          x={252}
          y={176}
          width={36}
          height={31}
          opacity={0.8}
          preserveAspectRatio="xMidYMid meet"
        />
      </g>
    </svg>
  );
};

const CoopBackdrop = () => {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="none"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="coop-sky-day" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bfe3ef" />
          <stop offset="100%" stopColor="#f4efdd" />
        </linearGradient>
        <radialGradient id="coop-sun-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff3c4" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#fff3c4" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="coop-yard-day" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c9b177" />
          <stop offset="100%" stopColor="#9c8154" />
        </linearGradient>

        <linearGradient id="coop-sky-night" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#151d1a" />
          <stop offset="100%" stopColor="#282216" />
        </linearGradient>
        <linearGradient id="coop-yard-night" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3c3320" />
          <stop offset="100%" stopColor="#221c10" />
        </linearGradient>
      </defs>

      <g className="dark:hidden">
        <rect x={0} y={0} width={VIEW_W} height={VIEW_H} fill="url(#coop-sky-day)" />
        <circle cx={336} cy={40} r={38} fill="url(#coop-sun-glow)" />
        <circle cx={336} cy={40} r={16} fill="#ffe08a" />

        <rect x={0} y={150} width={VIEW_W} height={75} fill="url(#coop-yard-day)" />

        <g transform="translate(240 90)">
          <rect x={0} y={38} width={92} height={44} fill="#b5773f" />
          <path d="M-8,38 L46,10 L100,38 Z" fill="#8a5a2e" />
          <rect x={16} y={54} width={22} height={28} fill="#6e4622" />
          <rect x={58} y={50} width={16} height={16} fill="#dff0f5" opacity={0.8} />
          <rect x={-6} y={82} width={104} height={5} fill="#6e4622" />
          <rect x={4} y={82} width={4} height={16} fill="#8a5a2e" />
          <rect x={82} y={82} width={4} height={16} fill="#8a5a2e" />
        </g>

        <image
          href={ANIMAL_IMAGES.Galinha}
          x={28}
          y={158}
          width={42}
          height={38}
          preserveAspectRatio="xMidYMid meet"
        />
        <image
          href={ANIMAL_IMAGES.Galinha}
          x={78}
          y={172}
          width={34}
          height={31}
          preserveAspectRatio="xMidYMid meet"
        />
        <image
          href={ANIMAL_IMAGES.Galinha}
          x={150}
          y={164}
          width={38}
          height={35}
          preserveAspectRatio="xMidYMid meet"
        />
        <image
          href={ANIMAL_IMAGES.Galinha}
          x={196}
          y={182}
          width={30}
          height={27}
          preserveAspectRatio="xMidYMid meet"
        />
      </g>

      <g className="hidden dark:block">
        <rect x={0} y={0} width={VIEW_W} height={VIEW_H} fill="url(#coop-sky-night)" />
        <circle cx={336} cy={40} r={13} fill="#eef6ff" opacity={0.85} />

        <rect x={0} y={150} width={VIEW_W} height={75} fill="url(#coop-yard-night)" />

        <g transform="translate(240 90)">
          <rect x={0} y={38} width={92} height={44} fill="#3a2c1a" />
          <path d="M-8,38 L46,10 L100,38 Z" fill="#241a0e" />
          <rect x={16} y={54} width={22} height={28} fill="#160f08" />
          <rect x={58} y={50} width={16} height={16} fill="#ffcf6b" opacity={0.8} />
          <rect x={-6} y={82} width={104} height={5} fill="#241a0e" />
          <rect x={4} y={82} width={4} height={16} fill="#3a2c1a" />
          <rect x={82} y={82} width={4} height={16} fill="#3a2c1a" />
        </g>

        <image
          href={ANIMAL_IMAGES.Galinha}
          x={28}
          y={158}
          width={42}
          height={38}
          opacity={0.8}
          preserveAspectRatio="xMidYMid meet"
        />
        <image
          href={ANIMAL_IMAGES.Galinha}
          x={78}
          y={172}
          width={34}
          height={31}
          opacity={0.8}
          preserveAspectRatio="xMidYMid meet"
        />
        <image
          href={ANIMAL_IMAGES.Galinha}
          x={150}
          y={164}
          width={38}
          height={35}
          opacity={0.8}
          preserveAspectRatio="xMidYMid meet"
        />
        <image
          href={ANIMAL_IMAGES.Galinha}
          x={196}
          y={182}
          width={30}
          height={27}
          opacity={0.8}
          preserveAspectRatio="xMidYMid meet"
        />
      </g>
    </svg>
  );
};

type UseLevel = "max" | "medium" | "none";

interface UseCategory {
  key: string;
  label: string;
  icon: string;
}

const USE_CATEGORIES: UseCategory[] = [
  { key: "praia", label: "Praia", icon: "https://d2c3kthzw0ta10.cloudfront.net/soldadas-icos/praia.png" },
  { key: "casa", label: "Casa", icon: "https://d2c3kthzw0ta10.cloudfront.net/soldadas-icos/casa.png" },
  { key: "terreno", label: "Terreno", icon: "https://d2c3kthzw0ta10.cloudfront.net/soldadas-icos/terreno.png" },
  {
    key: "industria",
    label: "Indústria",
    icon: "https://d2c3kthzw0ta10.cloudfront.net/soldadas-icos/industria.png",
  },
  {
    key: "construcao",
    label: "Construção",
    icon: "https://d2c3kthzw0ta10.cloudfront.net/soldadas-icos/construcao.png",
  },
  {
    key: "quadraEsportiva",
    label: "Quadra esportiva",
    icon: "https://d2c3kthzw0ta10.cloudfront.net/soldadas-icos/quadra-esportiva.png",
  },
  { key: "horta", label: "Horta", icon: "https://d2c3kthzw0ta10.cloudfront.net/soldadas-icos/horta.png" },
  {
    key: "caoMedioPequeno",
    label: "Cão médio/pequeno",
    icon: "https://d2c3kthzw0ta10.cloudfront.net/soldadas-icos/cao-medio-pequeno.png",
  },
];

const SLIDE_USE_LEVELS: Record<string, Partial<Record<string, UseLevel>>> = {
  "tela-brava": {
    praia: "max",
    casa: "medium",
    terreno: "medium",
    industria: "none",
    construcao: "none",
    quadraEsportiva: "none",
    horta: "none",
    caoMedioPequeno: "none",
  },
  "tela-titan": {
    casa: "max",
    terreno: "max",
    industria: "max",
    caoMedioPequeno: "max",
    praia: "none",
    construcao: "none",
    quadraEsportiva: "none",
    horta: "none",
  },
  "tela-morada-leve": {
    horta: "max",
    casa: "max",
    caoMedioPequeno: "medium",
    praia: "none",
    terreno: "none",
    industria: "none",
    construcao: "none",
    quadraEsportiva: "none",
  },
  "tela-multymax": {
    quadraEsportiva: "max",
    praia: "none",
    casa: "none",
    terreno: "none",
    industria: "none",
    construcao: "none",
    horta: "none",
    caoMedioPequeno: "none",
  },
};

const ANIMAL_LABELS: Record<string, string> = {
  Bovino: "Bovinos",
  Caprino: "Caprinos",
};
const ANIMAL_CATEGORIES: UseCategory[] = Object.keys(ANIMAL_IMAGES).map(
  (key) => ({
    key,
    label: ANIMAL_LABELS[key] ?? key,
    icon: ANIMAL_IMAGES[key],
  }),
);

const SLIDE_ANIMAL_LEVELS: Record<string, Partial<Record<string, UseLevel>>> =
{
  "tela-mangueirao-16": {
    Ovinos: "max",
    Suínos: "max",
  },
  "tela-galinheiro-22": {
    Galinha: "max",
  },
};

const SLIDE_CHART_TYPE: Record<string, "usage" | "animals"> = {
  "tela-mangueirao-16": "animals",
  "tela-galinheiro-22": "animals",
};

const LEVEL_VALUE: Record<UseLevel, number> = { max: 1, medium: 0.62, none: 0.16 };

const BAR_CHART_W = 640;
const BAR_CHART_H = 276;
const BAR_PAD_L = 46;
const BAR_PAD_R = 20;
const BAR_PAD_T = 12;
const BAR_PAD_B = 72;
const BAR_PLOT_W = BAR_CHART_W - BAR_PAD_L - BAR_PAD_R;
const BAR_PLOT_H = BAR_CHART_H - BAR_PAD_T - BAR_PAD_B;
const BAR_PLOT_BOTTOM = BAR_PAD_T + BAR_PLOT_H;

const BAR_PALETTE = [
  "#2fb6a5",
  "#4fc1c1",
  "#f5a623",
  "#8a6fbe",
  "#e0575b",
  "#b5c327",
  "#1f8fa8",
  "#d94f70",
  "#5c8fd6",
  "#c77dd6",
];
const BAR_GRID_TICKS = [0, 0.25, 0.5, 0.75, 1];

const CoverageChart = ({ slide }: { slide: SoldadaHexagonalInfo }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const chartType = SLIDE_CHART_TYPE[slide.slug] ?? "usage";
  const isAnimalChart = chartType === "animals";

  const items = useMemo(() => {
    const categories = isAnimalChart ? ANIMAL_CATEGORIES : USE_CATEGORIES;
    const levels = isAnimalChart
      ? (SLIDE_ANIMAL_LEVELS[slide.slug] ?? {})
      : (SLIDE_USE_LEVELS[slide.slug] ?? {});
    const slotW = BAR_PLOT_W / Math.max(categories.length, 1);
    const barWidth = slotW * 0.55;
    return categories.map((cat, i) => {
      const level = levels[cat.key] ?? "none";
      const value = LEVEL_VALUE[level];
      const targetH = value * BAR_PLOT_H;
      const targetY = BAR_PLOT_BOTTOM - targetH;
      return {
        ...cat,
        targetH,
        targetY,
        barWidth,
        x: BAR_PAD_L + slotW * i + slotW / 2,
        color: BAR_PALETTE[i % BAR_PALETTE.length],
        supported: level !== "none",
      };
    });
  }, [slide.slug, isAnimalChart]);

  useGSAP(() => {
    const root = rootRef.current;
    if (!root) return;
    const bars = root.querySelectorAll<SVGRectElement>(".use-coverage-bar");

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
  }, [slide.slug]);

  return (
    <div
      ref={rootRef}
      className="mt-4 w-full overflow-hidden bg-white pt-4 pb-2 shadow-lg ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10 sm:pt-6 sm:pb-3"
    >
      <p className="poppins mb-3 px-4 text-center text-[15px] font-bold text-[#002d4d] dark:text-white sm:px-6 sm:text-lg">
        {slide.name}: {isAnimalChart ? "animais que a tela contém" : "onde utilizar"}
      </p>
      <div className="relative h-96 w-full sm:h-[28rem]">
        {BAR_GRID_TICKS.map((t) => {
          const y = BAR_PLOT_BOTTOM - t * BAR_PLOT_H;
          return (
            <div
              key={t}
              className="absolute left-0 right-0 border-t border-dashed border-black/15 dark:border-white/15"
              style={{ top: `${(y / BAR_CHART_H) * 100}%` }}
            />
          );
        })}
        <svg
          viewBox={`0 0 ${BAR_CHART_W} ${BAR_CHART_H}`}
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          {items.map((item) => (
            <rect
              key={item.key}
              className="use-coverage-bar transition-[fill-opacity] duration-300"
              data-target-h={item.targetH}
              data-target-y={item.targetY}
              x={item.x - item.barWidth / 2}
              y={BAR_PLOT_BOTTOM}
              width={item.barWidth}
              height={0}
              rx={3}
              fill={item.color}
              fillOpacity={item.supported ? 1 : 0.35}
            />
          ))}
        </svg>

        {items.map((item) => (
          <div key={item.key}>
            <img
              src={item.icon}
              alt=""
              className="absolute h-3 w-3 -translate-x-1/2 object-contain transition-opacity duration-300 sm:h-7 sm:w-7"
              style={{
                left: `${(item.x / BAR_CHART_W) * 100}%`,
                top: `${((BAR_PLOT_BOTTOM + 8) / BAR_CHART_H) * 100}%`,
                opacity: item.supported ? 1 : 0.5,
              }}
            />
            <span
              className={`poppins absolute -translate-x-1/2 whitespace-nowrap text-[7px] text-[#002d4d] transition-opacity duration-300 dark:text-white sm:text-[13px] ${item.supported ? "font-bold opacity-100" : "font-medium opacity-45"
                }`}
              style={{
                left: `${(item.x / BAR_CHART_W) * 100}%`,
                top: `${((BAR_PLOT_BOTTOM + 34) / BAR_CHART_H) * 100}%`,
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const InstalledMeshOverlay = ({
  color,
  postColor,
  verticalCount,
  rowsY,
  playKey,
  meshType = "grid",
  hexRx = HEX_RX,
  hexRy = HEX_RY,
}: {
  color: string;
  postColor: string;
  verticalCount: number;
  rowsY: number[];
  playKey: number;
  meshType?: "grid" | "hex";
  hexRx?: number;
  hexRy?: number;
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);

  const panelWidth = meshType === "hex" ? TOTAL_MESH_WIDTH : MESH_WIDTH;

  const hexGrid = useMemo(
    () =>
      meshType === "hex"
        ? buildHexGrid(panelWidth, MESH_HEIGHT, hexRx, hexRy)
        : [],
    [meshType, panelWidth, hexRx, hexRy],
  );

  const hexPostXs = useMemo(
    () =>
      meshType === "hex"
        ? [HEX_POST_EDGE_INSET, panelWidth - HEX_POST_EDGE_INSET]
        : [],
    [meshType, panelWidth],
  );

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
    const post = root.querySelectorAll<SVGRectElement>(".mesh-post");
    const perspLines = root.querySelectorAll<SVGLineElement>(
      ".mesh-perspective-line",
    );
    const perspVLines = root.querySelectorAll<SVGLineElement>(
      ".mesh-perspective-v-line",
    );
    const perspPosts = root.querySelectorAll<SVGRectElement>(
      ".mesh-perspective-post",
    );
    const hexCells = root.querySelectorAll<SVGGraphicsElement>(".hex-cell");
    const hexWireLines = root.querySelectorAll<SVGLineElement>(".hex-wire-line");
    const vLineStagger = Math.min(0.04, 0.55 / Math.max(vLines.length, 1));
    const perspVLineStagger = Math.min(
      0.02,
      0.3 / Math.max(perspVLines.length, 1),
    );
    const hexStagger = Math.min(0.025, 0.6 / Math.max(hexCells.length, 1));

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
    gsap.set(hexCells, { opacity: 0, scale: 0.3, transformOrigin: "50% 50%" });
    gsap.set(hexWireLines, { attr: { x2: 0 }, opacity: 0 });

    const tl = gsap.timeline({ delay: 0.2 });
    tl.to(hLines, {
      attr: { x2: panelWidth },
      opacity: 1,
      duration: 0.7,
      stagger: 0.05,
      ease: "power2.out",
    })
      .to(
        shadowLine,
        {
          attr: { x2: panelWidth },
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
          stagger: vLineStagger,
          ease: "power2.out",
        },
        "-=0.4",
      )
      .to(
        hexWireLines,
        {
          attr: { x2: panelWidth },
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
        },
        "-=0.4",
      )
      .to(
        hexCells,
        {
          opacity: 1,
          scale: 1,
          duration: 0.45,
          stagger: hexStagger,
          ease: "power2.out",
        },
        "-=0.4",
      )
      .to(post, {
        attr: { y: POST_Y },
        opacity: 1,
        duration: 0.5,
        stagger: 0.12,
        ease: "bounce.out",
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
          stagger: perspVLineStagger,
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
      style={{
        bottom: meshType === "hex" ? "8%" : "14%",
        height: "45%",
        width: meshType === "hex" ? "100%" : `${CONTAINER_WIDTH_PCT}%`,
      }}
    >
      <svg
        viewBox={`0 0 ${TOTAL_MESH_WIDTH} ${MESH_HEIGHT}`}
        preserveAspectRatio="none"
        className="h-full w-full overflow-visible"
      >
        <defs>
          <clipPath id="hex-panel-clip">
            <rect x={0} y={0} width={panelWidth} height={MESH_HEIGHT} />
          </clipPath>
        </defs>
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
        {meshType === "hex" ? (
          <g clipPath="url(#hex-panel-clip)">
            <g stroke={color} strokeWidth={0.9} fill="none" opacity={0.9}>
              {hexGrid.map((h) => (
                <polygon
                  key={h.key}
                  className="hex-cell"
                  points={hexPoints(h.cx, h.cy, hexRx, hexRy)}
                />
              ))}
            </g>
            <g stroke={color} strokeWidth={0.9} strokeLinecap="round" opacity={0.95}>
              <line className="hex-wire-line" x1={0} y1={0.6} x2={0} y2={0.6} />
              <line
                className="hex-wire-line"
                x1={0}
                y1={MESH_HEIGHT - 0.6}
                x2={0}
                y2={MESH_HEIGHT - 0.6}
              />
            </g>
          </g>
        ) : (
          <>
            <g stroke={color} strokeWidth={1} opacity={0.95}>
              {rowsY.map((y) => (
                <line key={y} className="mesh-h-line" x1={0} y1={y} x2={0} y2={y} />
              ))}
            </g>
            <g stroke={color} strokeWidth={1} opacity={0.8}>
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
          </>
        )}
        {meshType !== "hex" && (
          <>
            <g stroke={color} strokeWidth={0.7} opacity={0.55}>
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
            <g stroke={color} strokeWidth={0.7} opacity={0.4}>
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
                  fill={postColor}
                />
              ))}
            </g>
          </>
        )}
        {meshType === "hex" ? (
          hexPostXs.map((x, i) => (
            <rect
              key={`post-${i}`}
              className="mesh-post"
              x={x - 5}
              y={POST_Y}
              width={10}
              height={POST_HEIGHT}
              rx={2}
              fill={postColor}
            />
          ))
        ) : (
          <rect
            className="mesh-post"
            x={panelWidth - 10}
            y={POST_Y}
            width={10}
            height={POST_HEIGHT}
            rx={2}
            fill={postColor}
          />
        )}
      </svg>
    </div>
  );
};

const SoldadaHexagonalCarousel = ({
  slides,
  fullBleedMedia = false,
}: {
  slides: SoldadaHexagonalInfo[];
  fullBleedMedia?: boolean;
}) => {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const titleRef = useRef<HTMLParagraphElement>(null);

  const slide = slides[index];

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
  };
  const goNext = () => goTo(index + 1);

  useEffect(() => {
    if (!isPlaying || slides.length < 2) return;
    const id = setInterval(goNext, AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
  }, [isPlaying, index, slides.length]);

  if (!slide) return null;

  const meshType = SLIDE_MESH_TYPE[slide.slug] ?? "grid";
  const mesh = meshType === "hex" ? getHexMeshConfig(slide) : getMeshConfig(slide);

  return (
    <div className="w-full">
      <div
        className={
          fullBleedMedia ? "relative left-1/2 right-1/2 -mx-[50vw] w-screen" : ""
        }
      >
        <div
          className={`relative w-full aspect-video overflow-hidden select-none ${fullBleedMedia ? "" : "rounded-2xl"}`}
        >
          {(() => {
            switch (SLIDE_BACKDROP[slide.slug]) {
              case "industrial":
                return <IndustrialBackdrop />;
              case "garden":
                return <GardenBackdrop />;
              case "court":
                return <SportsCourtBackdrop />;
              case "pigpen":
                return <PigPenBackdrop />;
              case "coop":
                return <CoopBackdrop />;
              default:
                return <BeachBackdrop />;
            }
          })()}
          <InstalledMeshOverlay
            key={index}
            color={mesh.color}
            postColor={getPostColor(slide)}
            verticalCount={mesh.verticalCount}
            rowsY={mesh.rowsY}
            playKey={index}
            meshType={meshType}
            hexRx={mesh.hexRx}
            hexRy={mesh.hexRy}
          />

          <p
            ref={titleRef}
            className="absolute poppins left-1/4 top-[22%] z-10 -translate-x-1/2 text-[26px] font-bold tracking-widest text-[#ff5500] dark:text-white"
          >
            {slide.name}
          </p>

          <div
            className={`absolute z-10 flex items-center gap-2 ${fullBleedMedia ? "top-40 right-8" : "top-4 right-4"}`}
          >
            <p className="text-sm font-medium text-[#002d4d]/70 dark:text-white/70">
              {index + 1}/{slides.length}
            </p>

            <button
              type="button"
              onClick={() => setIsPlaying((v) => !v)}
              aria-label={isPlaying ? "Pausar slide" : "Reproduzir slide"}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-[#002d4d]/10 text-[#002d4d] transition-colors duration-200 hover:bg-[#002d4d]/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 cursor-pointer"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 max-w-[92%]">
            <div className="flex items-center gap-3 overflow-x-auto rounded-2xl bg-white/80 px-3 py-3 shadow-lg ring-1 ring-black/5 backdrop-blur dark:bg-white/10 dark:ring-white/10">
              {slides.map((s, i) => (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Ir para ${s.name}`}
                  className={`h-2.5 w-16 shrink-0 cursor-pointer rounded-full transition-all duration-200 sm:w-20 ${i === index
                    ? "bg-[#002d4d] dark:bg-white"
                    : "bg-[#002d4d]/20 hover:bg-[#002d4d]/40 dark:bg-white/20 dark:hover:bg-white/40"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          fullBleedMedia ? "relative left-1/2 right-1/2 -mx-[50vw] w-screen" : ""
        }
      >
        <CoverageChart slide={slide} />
      </div>
    </div>
  );
};

export default SoldadaHexagonalCarousel;
