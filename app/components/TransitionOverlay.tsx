'use client';

import { motion } from "framer-motion";

export const BAND_COUNT = 6;
export const BAND_DURATION = 0.55;
export const BAND_STAGGER = 0.06;
export const BAND_EASE = [0.83, 0, 0.17, 1] as const;

const TransitionOverlay = ({ covering }: { covering: boolean }) => (
  <div className="pointer-events-auto fixed inset-0 z-[9999] flex flex-col">
    {Array.from({ length: BAND_COUNT }).map((_, i) => (
      <div key={i} className="relative flex-1 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-[#ff5500]"
          initial={{ y: "-100%" }}
          animate={{ y: covering ? "0%" : "100%" }}
          transition={{
            duration: BAND_DURATION,
            delay: i * BAND_STAGGER,
            ease: BAND_EASE,
          }}
        />
      </div>
    ))}
  </div>
);

export default TransitionOverlay;
