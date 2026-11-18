'use client';

import { motion } from "framer-motion";

export const SPLIT_DURATION = 0.7;
export const SPLIT_EASE = [0.76, 0, 0.24, 1] as const;

const TransitionOverlay = ({ covering, label }: { covering: boolean; label: string }) => (
  <div aria-hidden="true" className="pointer-events-auto fixed inset-0 z-[9999] overflow-hidden">
    {[-1, 1].map(direction => (
      <motion.div
        key={direction}
        className="absolute inset-x-0 h-[50.5%] bg-[#ff5500]"
        style={direction === -1 ? { top: 0 } : { bottom: 0 }}
        initial={{ y: `${direction * 100}%` }}
        animate={{ y: covering ? "0%" : `${direction * 100}%` }}
        transition={{ duration: SPLIT_DURATION, ease: SPLIT_EASE }}
      />
    ))}
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-6 text-center text-[clamp(2.5rem,6vw,3.5rem)] font-semibold leading-none tracking-[-0.03em] text-white"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: covering ? 1 : 0, y: covering ? 0 : 16 }}
      transition={covering
        ? { duration: 0.385, delay: 0.315, ease: [0.22, 1, 0.36, 1] }
        : { duration: 0.21, ease: "easeIn" }}
    >
      {label}
    </motion.div>
  </div>
);

export default TransitionOverlay;
