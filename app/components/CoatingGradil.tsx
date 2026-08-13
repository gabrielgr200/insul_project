"use client";

import { useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useTranslation } from "./LanguageProvider";

type Layer = {
  src: string;
  label: string;
  n: string;
};

const LAYERS: Layer[] = [
  {
    src: "/images/img-arame/ARAME-1_st.webp",
    label: "Pintura eletrostática",
    n: "01",
  },
  {
    src: "/images/img-arame/ARAME-2_st.webp",
    label: "Fosfato tricatiônico",
    n: "02",
  },
  {
    src: "/images/img-arame/ARAME-3_st.webp",
    label: "Galvanização a fogo",
    n: "03",
  },
  { src: "/images/img-arame/ARAME-4_st.webp", label: "Aço Gerdau", n: "04" },
];

const N = LAYERS.length;
const SEG = 1 / N;
const FADE = 0.09;

const CENTERS = [0.308, 0.674, 0.803, 0.936];

const stepProgress = (k: number) => Math.min(1, (k + 0.5) * SEG + FADE);

const imageOpacityFor = (i: number) => {
  if (i === 0) return { input: [0, 1], output: [1, 1] };
  const start = i * SEG;
  return { input: [start, start + FADE * 2], output: [0, 1] };
};

const revealRangeFor = (i: number) => {
  if (i === 0) return { input: [0, 1], output: [1, 1] };
  const start = i * SEG;
  return { input: [start + FADE, start + FADE * 2], output: [0, 1] };
};

const bigRangeFor = (i: number) => {
  const start = i * SEG;
  const end = (i + 1) * SEG;
  if (i === N - 1) return { input: [start, start + FADE], output: [0, 1] };
  return {
    input: [start, start + FADE, end, end + FADE],
    output: [i === 0 ? 1 : 0, 1, 1, 0],
  };
};

const WireLayer = ({
  layer,
  index,
  progress,
  label,
}: {
  layer: Layer;
  index: number;
  progress: MotionValue<number>;
  label: string;
}) => {
  const { input, output } = imageOpacityFor(index);
  const opacity = useTransform(progress, input, output);
  const enterFrom = index * SEG;
  const xIn = index === 0 ? [0, 1] : [enterFrom, enterFrom + FADE * 2];
  const x = useTransform(progress, xIn, index === 0 ? [0, 0] : [-90, 0]);

  return (
    <motion.img
      src={layer.src}
      alt={`Arame — ${label}`}
      draggable={false}
      style={{ opacity, x, zIndex: N - index }}
      className="pointer-events-none absolute inset-0 h-full w-full object-contain"
    />
  );
};

const LayerLabel = ({
  layer,
  index,
  progress,
  label,
}: {
  layer: Layer;
  index: number;
  progress: MotionValue<number>;
  label: string;
}) => {
  const reveal = useTransform(
    progress,
    revealRangeFor(index).input,
    revealRangeFor(index).output,
  );
  const big = useTransform(
    progress,
    bigRangeFor(index).input,
    bigRangeFor(index).output,
  );

  const scale = useTransform(big, [0, 1], [0.72, 1]);
  // Camada atual = bold; ao mostrar o próximo texto, o anterior fica font-light.
  const weight = useTransform(big, [0, 1], [300, 700]);

  return (
    <motion.div
      style={{
        opacity: reveal,
        scale,
        left: `${CENTERS[index] * 100}%`,
        x: "-50%",
        bottom: index * 40 + 12,
        transformOrigin: "center bottom",
      }}
      className="absolute flex items-baseline gap-2 whitespace-nowrap"
    >
      <span className="impact text-2xl leading-none text-[#ff5500] lg:text-4xl">
        {layer.n}
      </span>
      <motion.span
        style={{ fontWeight: weight }}
        className="poppins text-base leading-none text-[#002d4d] dark:text-white lg:text-2xl"
      >
        {label}
      </motion.span>
    </motion.div>
  );
};

const CoatingGradil = () => {
  const { dict } = useTranslation();
  const c = dict.gradil.coating;
  const [step, setStep] = useState(0);
  const progress = useMotionValue(stepProgress(0));

  const goTo = (k: number) => {
    const next = Math.min(N - 1, Math.max(0, k));
    setStep(next);
    animate(progress, stepProgress(next), {
      type: "spring",
      stiffness: 120,
      damping: 24,
      mass: 0.5,
    });
  };

  return (
    <section className="relative overflow-hidden bg-white py-14 dark:bg-zinc-950">
      <div className="mx-auto w-full max-w-6xl px-6 text-center sm:text-left">
        <h3 className="INDUSTRY-LABEL text-center sm:text-left text-[#002d4d] dark:text-white font-light text-2xl poppins py-3">
          {c.label}
        </h3>
        <div className="relative flex justify-center sm:justify-between items-end mb-12">
          <h2 className="INDUSTRY-TITLE text-center sm:text-left text-[#ff5500] text-[clamp(2.5rem,11vw,4.75rem)] lg:text-8xl impact uppercase leading-tight">
            {c.title}
          </h2>
        </div>
        <p className="INDUSTRY-TEXT text-center sm:text-left text-base lg:text-lg text-[#002d4d] dark:text-zinc-400 max-w-sm mx-auto sm:mx-0 sm:max-w-none lg:w-full">
          {c.subtitle}
        </p>
      </div>

      <div className="mt-12 w-[88%] sm:w-[72%]">
        <div className="relative h-40 w-full lg:h-48">
          {LAYERS.map((layer, i) => (
            <LayerLabel
              key={layer.n}
              layer={layer}
              index={i}
              progress={progress}
              label={c.layers[i]}
            />
          ))}
        </div>

        <div className="relative aspect-[1549/124] w-full">
          {LAYERS.map((layer, i) => (
            <WireLayer
              key={layer.n}
              layer={layer}
              index={i}
              progress={progress}
              label={c.layers[i]}
            />
          ))}
        </div>
      </div>

      <div className="mt-10 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => goTo(step - 1)}
          disabled={step === 0}
          aria-label={c.prev}
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[#002d4d]/15 text-[#002d4d] transition hover:bg-[#ff5500] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 dark:border-white/20 dark:text-white"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M15 5l-7 7 7 7"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <span className="poppins w-14 text-center text-sm font-semibold tabular-nums text-[#002d4d] dark:text-white/70">
          {step + 1} / {N}
        </span>

        <button
          type="button"
          onClick={() => goTo(step + 1)}
          disabled={step === N - 1}
          aria-label={c.next}
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[#002d4d]/15 text-[#002d4d] transition hover:bg-[#ff5500] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 dark:border-white/20 dark:text-white"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M9 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default CoatingGradil;
