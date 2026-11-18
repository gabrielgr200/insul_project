"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Same fade as the home, without a transform that would move fixed headers. */
export default function PageEntrance({ ready, children }: { ready: boolean; children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  return <motion.div
    className="min-w-0 flex-1"
    initial={{ opacity: 0 }}
    animate={{ opacity: ready ? 1 : 0 }}
    transition={{ duration: reducedMotion || !ready ? 0 : 0.95, ease: [0.22, 1, 0.36, 1] }}
    style={{ visibility: ready ? "visible" : "hidden" }}
    inert={!ready}
    aria-hidden={!ready}
  >{children}</motion.div>;
}
