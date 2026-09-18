"use client";

import { useState } from "react";
import Image from "next/image";
import type { CercaShowcaseOption } from "../assets/data";
import { Plus } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const positions = [
  { position: "left-[44.4%] top-[32%]", x: 44.4, y: 32, targetX: 50.7, targetY: 32 },
  { position: "left-[57%] top-[76.8%]", x: 57, y: 76.8, targetX: 67, targetY: 76.8 },
];

export default function CercaShowcaseIndication({ option }: { option: CercaShowcaseOption }) {
  const points = positions.flatMap((position, index) => {
    const hotspot = option.hotspots?.[index];
    return hotspot ? [{ ...position, ...hotspot }] : [];
  });
  const [selected, setSelected] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 flex items-end justify-center">
      <div className="relative aspect-[4/3] w-full lg:max-w-[calc(max(680px,90svh)*4/3)]">
        <Image src={option.image} alt={option.title} fill sizes="(min-width: 1024px) 65vw, 100vw" className="object-contain object-bottom" />
        <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 size-full">
          {points.map((point) => <line key={point.title} x1={point.x} y1={point.y} x2={point.targetX} y2={point.targetY} stroke="white" strokeWidth="2" vectorEffect="non-scaling-stroke" />)}
        </svg>
        {points.map((point) => <span key={point.title} aria-hidden="true" style={{ left: `${point.targetX}%`, top: `${point.targetY}%` }} className="pointer-events-none absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />)}
        {points.map((point, index) => {
          const open = selected === index;
          return (
            <div key={point.title} style={{ left: `${point.x}%`, top: `${point.y}%` }} className="absolute z-10 -translate-x-1/2 -translate-y-1/2">
              <motion.button layout={!reducedMotion} transition={{ duration: reducedMotion ? 0 : 0.35 }} type="button" aria-label={`${open ? "Fechar" : "Ver"} indicação da ${point.title.toLowerCase()}`} aria-expanded={open} onClick={() => setSelected(open ? null : index)} className={`relative cursor-pointer bg-white text-[#002d4d] shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff5500] ${open ? "w-52 rounded-[28px] p-5 text-left text-sm font-normal leading-relaxed sm:w-64 sm:p-7" : "grid size-10 place-items-center rounded-full sm:size-14"}`}>
                {open ? (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reducedMotion ? 0 : 0.25 }} className="block">
                    <strong className="font-semibold">{point.title}.</strong>{" "}{point.description}
                  </motion.span>
                ) : (
                  <Plus className="size-5 sm:size-6" aria-hidden="true" />
                )}
              </motion.button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
