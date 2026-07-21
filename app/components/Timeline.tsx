'use client';

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TimelineItem {
  title: string;
  description: string;
  image?: string;
}

interface ScrollTimelineProps {
  items: TimelineItem[];
  theme?: "light" | "dark" | "glass";
}

const ScrollTimeline = ({ items, theme = "light" }: ScrollTimelineProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isLight = theme === "light";
  const isGlass = theme === "glass";
  const cardClasses = isGlass
    ? "border-white/10 bg-black/85 backdrop-blur-md shadow-lg"
    : isLight
      ? "border-black/10 bg-neutral-100 shadow-sm"
      : "border-white/10 bg-neutral-900/95 backdrop-blur-md";
  const titleClasses = isLight && !isGlass ? "text-neutral-900" : "text-white";
  const descClasses =
    isLight && !isGlass ? "text-neutral-600" : "text-white/60";
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.6"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const CARD_HEIGHT = 260;
  const VIEWBOX_WIDTH = 160;
  const totalHeight = items.length * CARD_HEIGHT + 80;
  const buildWavePath = () => {
    const centerX = VIEWBOX_WIDTH / 2;
    const amplitude = 40;
    let d = `M ${centerX} 0`;
    for (let i = 0; i < items.length; i++) {
      const yMid = i * CARD_HEIGHT + CARD_HEIGHT / 2;
      const yEnd = (i + 1) * CARD_HEIGHT;
      const xTarget = i % 2 === 0 ? centerX + amplitude : centerX - amplitude;
      if (i === 0) {
        d += ` C ${centerX} ${yMid - 40}, ${xTarget} ${yMid + 40}, ${xTarget} ${yEnd}`;
      } else {
        d += ` S ${xTarget} ${yMid + 40}, ${xTarget} ${yEnd}`;
      }
    }
    return d;
  };


  return (
    <div
      ref={containerRef}
      className="relative mx-auto max-w-xl px-5 py-10 bg-transparent"
    >
      <svg
        className="pointer-events-none absolute left-1/2 top-0 h-full w-40 -translate-x-1/2"
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${totalHeight}`}
        preserveAspectRatio="none"
      >
        <motion.path
          d={buildWavePath()}
          fill="none"
          stroke="rgba(249,115,22,0.9)"
          strokeWidth="2"
          style={{ pathLength }}
        />
      </svg>
      <div className="relative z-10 flex flex-col">
        {items.map((item, i) => {
          const src =
            item.image ||
            `https://picsum.photos/seed/${encodeURIComponent(item.title)}/600/400`;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`group w-[85%] overflow-hidden rounded-2xl border px-8 py-7 ${cardClasses} ${
                i % 2 === 0 ? "mr-auto" : "ml-auto"
              } ${i === items.length - 1 ? "" : "mb-24"}`}
            >
              <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:mb-4 group-hover:max-h-40 group-hover:opacity-100">
                <img
                  src={src}
                  alt={item.title}
                  className="h-40 w-full rounded-xl object-cover"
                />
              </div>
              <h3 className={`mb-2 text-xl font-bold ${titleClasses}`}>
                {item.title}
              </h3>
              <p className={`text-sm leading-relaxed ${descClasses}`}>
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollTimeline;
