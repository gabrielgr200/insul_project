'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TYPE_WORDS = ["QUALIDADE", "PROTEÇÃO", "RESISTÊNCIA", "DURABILIDADE", "SEGURANÇA"];
const TYPE_SPEED = 90;
const DELETE_SPEED = 45;
const HOLD_TIME = 1200;
const PAUSE_TIME = 300;

const TypewriterWord = ({ textColor }: { textColor: string }) => {
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
      <span
        style={{ color: textColor }}
        className="text-xs font-medium tracking-tight md:text-sm"
      >
        NOSSA GARANTIA
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
  background?: string;
  textColor?: string;
  onComplete?: () => void;
}

const Loader = ({
  brandName = "INSUL",
  duration = 3,
  background = "#ffffff",
  textColor = "#111111",
  onComplete,
}: LoaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => onComplete?.(), 350);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.83, 0.05, 0.25, 0.98] }}
      style={{ backgroundColor: background }}
      className="fixed inset-0 z-[999] flex flex-col justify-between p-8 md:p-16"
    >
      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ duration: 0.6, ease: [0.77, 0.02, 0.24, 1.02] }}
        className="flex items-center gap-3"
      >
        <img
          src="/images/logo_site.png"
          alt={brandName}
          className="h-16 w-auto md:h-8"
        />
        <div className="h-4 w-px bg-black/20 md:h-5" />
        <img
          src="/images/logo_casa_das_cercas.png"
          alt="Casa das Cercas"
          className="h-4 w-auto md:h-5"
        />
      </motion.div>

      <div className="relative h-px w-full overflow-hidden bg-black/10">
        <motion.div
          className="absolute inset-y-0 left-0"
          style={{ backgroundColor: textColor }}
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear", duration: 0.1 }}
        />
      </div>

      <div className="flex items-end justify-between">
        <TypewriterWord textColor={textColor} />

        <div className="flex items-end">
          <span
            style={{ color: textColor, fontWeight: 300 }}
            className="text-[18vw] leading-[0.8] tracking-tighter tabular-nums md:text-[12rem]"
          >
            {progress}
          </span>
          <span
            style={{ color: textColor }}
            className="mb-2 text-2xl font-light md:text-4xl"
          >
            %
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
