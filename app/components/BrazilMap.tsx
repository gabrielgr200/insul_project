import { BRAZIL_STATES } from "../constants/brazilStates";
import { LATAM_COUNTRIES, LATAM_CAPITALS } from "../constants/latamCountries";

const ORANGE_STATES = new Set(["SP", "MG", "PR", "SC", "RS"]);

type Point = [number, number];

const HUB_TOP: Point = [679.8, 596.7]; // Minas Gerais
const HUB_BOTTOM: Point = [551.6, 799.3]; // Rio Grande do Sul

const CORRIDOR_POINTS: Point[] = [
  HUB_TOP, // MG
  [629.6, 662.1], // SP
  [587.6, 697], // PR
  [591.4, 749.7], // SC
  HUB_BOTTOM, // RS
];

interface Arrow {
  from: Point;
  to: Point;
  bend: number;
}

const ARROWS: Arrow[] = [
  { from: HUB_TOP, to: [423.9, 262], bend: -50 },
  { from: HUB_TOP, to: [572, 232], bend: 30 },
  { from: HUB_TOP, to: [682, 380], bend: 35 },
  { from: HUB_TOP, to: [815, 390], bend: 45 },
  { from: HUB_TOP, to: [734, 505], bend: 25 },
  { from: HUB_BOTTOM, to: [255, 305], bend: -70 },
  { from: HUB_BOTTOM, to: [292, 440], bend: -45 },
  { from: HUB_BOTTOM, to: [400, 465], bend: -30 },
  { from: HUB_BOTTOM, to: [569, 355], bend: -20 },
  { from: HUB_BOTTOM, to: [795, 428], bend: 55 },
  { from: HUB_BOTTOM, to: LATAM_CAPITALS.URY, bend: -20 },
  { from: HUB_BOTTOM, to: LATAM_CAPITALS.ARG, bend: 30 },
  { from: HUB_BOTTOM, to: LATAM_CAPITALS.PRY, bend: -25 },
];

const curve = ([x1, y1]: Point, [x2, y2]: Point, bend: number) => {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const px = -dy / len;
  const py = dx / len;
  const cx = mx + px * bend;
  const cy = my + py * bend;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
};

const ARROW_PATHS = ARROWS.map((a) => ({
  ...a,
  d: curve(a.from, a.to, a.bend),
}));

const smoothPath = (points: Point[]) => {
  let d = `M ${points[0][0]} ${points[0][1]} `;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p2[0]} ${p2[1]} `;
  }
  return d.trim();
};

const CORRIDOR_D = smoothPath(CORRIDOR_POINTS);

const BrazilMap = () => {
  return (
    <div className="mx-auto h-[560px] lg:h-[850px] aspect-[780/1230] rounded-2xl overflow-hidden bg-white dark:bg-background">
      <svg
        viewBox="90 30 780 1230"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full block"
      >
        <style>{`
          @keyframes flowDash {
            to { stroke-dashoffset: -60; }
          }
          .flow-dash {
            animation: flowDash 1.8s linear infinite;
          }
          @keyframes hubPulse {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 0.9; transform: scale(1.25); }
          }
          .hub-pulse {
            animation: hubPulse 1.8s ease-in-out infinite;
            transform-origin: center;
            transform-box: fill-box;
          }
        `}</style>

        <defs>
          <pattern
            id="mapDots"
            width="16"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.7" fill="#cfe3f2" />
          </pattern>
          <marker
            id="arrowHead"
            viewBox="0 0 10 10"
            refX="7.5"
            refY="5"
            markerWidth="6.5"
            markerHeight="6.5"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="var(--map-path)" />
          </marker>
          <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--map-path)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--map-path)" stopOpacity="0" />
          </radialGradient>
          <filter id="dotGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="1.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect x="90" y="30" width="780" height="1230" fill="url(#mapDots)" />

        <g>
          {LATAM_COUNTRIES.map((c) => (
            <path
              key={c.code}
              d={c.d}
              fill="var(--map-state)"
              stroke="var(--map-line)"
              strokeWidth="1.4"
              strokeOpacity="0.8"
            />
          ))}
        </g>

        <g>
          {BRAZIL_STATES.map((s) => (
            <g key={s.code} transform={`translate(${s.gx + 540} ${s.gy + 540})`}>
              <path
                transform={`translate(${s.tx} ${s.ty})`}
                d={s.d}
                fill={ORANGE_STATES.has(s.code) ? "#ff5500" : "var(--map-state)"}
                stroke="var(--map-line)"
                strokeWidth="0.8"
                strokeOpacity="0.8"
              />
            </g>
          ))}
        </g>

        <path
          d={CORRIDOR_D}
          fill="none"
          stroke="var(--map-path)"
          strokeWidth="2"
          strokeDasharray="1.3 5.5"
          strokeLinecap="round"
          opacity="0.9"
          className="flow-dash"
        />

        <g filter="url(#dotGlow)">
          <circle r="3.2" fill="var(--map-path)">
            <animateMotion dur="3.2s" repeatCount="indefinite" path={CORRIDOR_D} />
          </circle>
          <circle r="3.2" fill="var(--map-path)">
            <animateMotion
              dur="3.2s"
              begin="1.1s"
              repeatCount="indefinite"
              keyPoints="1;0"
              keyTimes="0;1"
              calcMode="linear"
              path={CORRIDOR_D}
            />
          </circle>
        </g>

        <g fill="none" stroke="var(--map-path)" strokeWidth="1.8" strokeDasharray="1.3 5.5" strokeLinecap="round">
          {ARROW_PATHS.map((a, i) => (
            <path
              key={i}
              d={a.d}
              markerEnd="url(#arrowHead)"
              opacity="0.9"
              className="flow-dash"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </g>

        <g filter="url(#dotGlow)">
          {ARROW_PATHS.map((a, i) => (
            <circle key={i} r="3" fill="var(--map-path)">
              <animateMotion
                dur="2.2s"
                begin={`${i * 0.22}s`}
                repeatCount="indefinite"
                path={a.d}
              />
            </circle>
          ))}
        </g>

        {[HUB_TOP, HUB_BOTTOM].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="32" fill="url(#hubGlow)" className="hub-pulse" />
            <circle cx={x} cy={y} r="9" fill="var(--map-path)" />
          </g>
        ))}
      </svg>
    </div>
  );
};

export default BrazilMap;
