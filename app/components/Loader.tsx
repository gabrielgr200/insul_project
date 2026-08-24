'use client';

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useTranslation } from "./LanguageProvider";

const TYPE_SPEED = 90;
const DELETE_SPEED = 45;
const HOLD_TIME = 1200;
const PAUSE_TIME = 300;

const TypewriterWord = () => {
  const { t, dict } = useTranslation();
  const TYPE_WORDS = dict.loader.palavras;
  const [wordIndex, setWordIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = TYPE_WORDS[wordIndex];
    let delay = deleting ? DELETE_SPEED : TYPE_SPEED;

    if (!deleting && subIndex === word.length) delay = HOLD_TIME;
    if (deleting && subIndex === 0) delay = PAUSE_TIME;

    const timeout = setTimeout(() => {
      if (!deleting && subIndex === word.length) {
        setDeleting(true);
      } else if (deleting && subIndex === 0) {
        setDeleting(false);
        setWordIndex((prev) => (prev + 1) % TYPE_WORDS.length);
      } else {
        setSubIndex((prev) => prev + (deleting ? -1 : 1));
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, wordIndex]);

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium tracking-tight text-foreground md:text-sm">
        {t("loader.garantia")}
      </span>
      <p className="flex items-center">
        <span className="text-xl font-extrabold text-[#ff5500] md:text-3xl">
          {TYPE_WORDS[wordIndex].slice(0, subIndex)}
        </span>
        <motion.span
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
          className="inline-block h-5 w-[2px] bg-[#ff5500] md:h-7"
        />
      </p>
    </div>
  );
};

interface LoaderProps {
  brandName?: string;
  duration?: number;
  onComplete?: () => void;
}

const ROTATE_DURATION = 3.4;
// Matches the white tip's authored angle, so the trace circle starts exactly
// where the tip starts.
const NEEDLE_START_ANGLE = -44.15;

const Loader = ({ brandName = "INSUL", duration = 3, onComplete }: LoaderProps) => {
  const [progress, setProgress] = useState(0);
  const rotate = useMotionValue(0);
  const ringPathLength = useTransform(rotate, (r) => r / 360);
  const rotateControls = useRef<ReturnType<typeof animate> | null>(null);

  useEffect(() => {
    rotateControls.current = animate(rotate, 360, {
      duration: ROTATE_DURATION,
      ease: "easeInOut",
    });
    return () => rotateControls.current?.stop();
  }, [rotate]);

  useEffect(() => {
    let pageReady = document.readyState === "complete";
    const markReady = () => {
      pageReady = true;
    };
    if (!pageReady) window.addEventListener("load", markReady);

    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      const timedPct = Math.min(100, Math.round((elapsed / duration) * 100));
      const pct = pageReady ? timedPct : Math.min(timedPct, 96);
      setProgress(pct);

      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => onComplete?.(), 350);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", markReady);
    };
  }, [duration, onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.83, 0.05, 0.25, 0.98] }}
      className="fixed inset-0 z-[999] flex flex-col justify-between bg-background p-8 md:p-16"
    >
      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ duration: 0.6, ease: [0.77, 0.02, 0.24, 1.02] }}
        className="flex items-center gap-3"
      >
        {/*<img
          src="/images/logo_site.png"
          alt={brandName}
          className="h-16 w-auto md:h-8"
        />
        <div className="h-4 w-px bg-foreground/20 md:h-5" />
        <img
          src="/images/logo_casa_das_cercas.png"
          alt="Casa das Cercas"
          className="h-4 w-auto md:h-5"
        />*/}
      </motion.div>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-6 -translate-y-12">
        <div className="relative h-20 w-20 md:h-28 md:w-28">
          <svg viewBox="0 0 200 200" className="h-full w-full" fill="none">
            <defs>
              <filter id="loaderGlow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="7" />
              </filter>
            </defs>

            <motion.circle
              cx="100"
              cy="100"
              r="90"
              strokeWidth="14"
              strokeLinecap="square"
              className="stroke-[#002d4d] dark:stroke-white"
              style={{
                filter: "url(#loaderGlow)",
                transformBox: "view-box",
                transformOrigin: "100px 100px",
                rotate: NEEDLE_START_ANGLE,
                pathLength: ringPathLength,
                opacity: 0.4,
              }}
            />
            <motion.circle
              cx="100"
              cy="100"
              r="90"
              strokeWidth="8"
              strokeLinecap="square"
              className="stroke-[#002d4d] dark:stroke-white"
              style={{
                transformBox: "view-box",
                transformOrigin: "100px 100px",
                rotate: NEEDLE_START_ANGLE,
                pathLength: ringPathLength,
              }}
            />

            <motion.g style={{ transformBox: "view-box", transformOrigin: "100px 100px", rotate }}>
              <motion.g
                style={{ transformBox: "view-box", transformOrigin: "100px 100px" }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
              >
                <polygon
                  points="78.49,79.08 121.51,120.92 30,172"
                  className="fill-[#ff5500]"
                  style={{ filter: "url(#loaderGlow)" }}
                  opacity={0.45}
                />
                <polygon
                  points="120.92,121.51 79.08,78.49 172,30"
                  className="fill-[#002d4d] dark:fill-white"
                  style={{ filter: "url(#loaderGlow)" }}
                  opacity={0.45}
                />
                <polygon
                  points="85.66,86.06 114.34,113.94 30,172"
                  className="fill-[#ff5500]"
                />
                <polygon
                  points="114.34,113.94 85.66,86.06 172,30"
                  className="fill-[#002d4d] dark:fill-white"
                />
              </motion.g>
            </motion.g>

            <motion.circle
              cx="100"
              cy="100"
              r="16"
              strokeWidth="6"
              className="fill-background stroke-[#002d4d] dark:stroke-white"
              style={{ transformBox: "view-box", transformOrigin: "100px 100px" }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.8, ease: "easeOut" }}
            />
            <motion.circle
              cx="100"
              cy="100"
              r="6"
              className="fill-[#ff5500]"
              style={{ transformBox: "view-box", transformOrigin: "100px 100px" }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.85, ease: "easeOut" }}
            />
          </svg>
        </div>
        <div className="h-[2px] w-40 overflow-hidden rounded-full bg-foreground/15 md:w-56">
          <div
            className="h-full rounded-full bg-foreground transition-[width] duration-150 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-end">
        <TypewriterWord />
      </div>
    </motion.div>
  );
};

export default Loader;
