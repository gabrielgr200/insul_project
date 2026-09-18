"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import type { CercaShowcaseData } from "../assets/data";
import CercaShowcaseIndication from "./CercaShowcaseIndication";
import CercaShowcaseMesh from "./CercaShowcaseMesh";
import CercaShowcaseKnot from "./CercaShowcaseKnot";
import CercaShowcaseLength from "./CercaShowcaseLength";

export default function CercaShowcaseTeste({ showcase, color }: { showcase: CercaShowcaseData; color: string }) {
  const titleId = useId();
  const [selected, setSelected] = useState(0);
  const reducedMotion = useReducedMotion();
  const active = showcase.options[selected];

  return (
    <section aria-labelledby={titleId} className="poppins">
      <div className="mx-auto max-w-3xl px-5 pb-10 text-center sm:px-10 lg:pb-12">
        <h2 id={titleId} style={{ color }} className="text-[clamp(30px,4vw,48px)] leading-[1.12] font-bold tracking-[-.04em]">{showcase.title}{showcase.subtitle && <><br /><span className="font-light text-[#002d4d] dark:text-white">{showcase.subtitle}</span></>}</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed font-light text-black/70 dark:text-white/80 sm:text-base">{showcase.description}</p>
      </div>
      <div className="relative isolate overflow-hidden bg-[#f5f5f5] pt-12 dark:bg-[#191b1e] lg:pt-0">
        <AnimatePresence>
          {active.background && (
            <motion.div key={active.background} aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.3 }} className="pointer-events-none absolute inset-0 -z-10">
              <Image src={active.background} alt="" fill quality={90} sizes="100vw" className="object-cover object-bottom" />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="grid items-center gap-8 px-5 sm:px-10 lg:min-h-[680px] lg:grid-cols-[400px_1fr] lg:gap-12 lg:pr-0 lg:pl-[6vw]">
          <div className="flex flex-col items-start gap-3">
            {showcase.options.map((option, index) => {
              const expanded = selected === index;
              return (
                <motion.button key={option.title} layout={!reducedMotion} transition={{ duration: reducedMotion ? 0 : 0.35 }} type="button" aria-pressed={expanded} aria-expanded={expanded} onClick={() => setSelected(index)} className={`bg-[#e7e7e9] text-left text-sm text-[#002d4d] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 dark:bg-[#292c31] dark:text-white sm:text-base ${expanded ? "w-full rounded-[28px] p-7 leading-relaxed" : "flex items-center gap-3 rounded-full px-5 py-4 font-semibold hover:bg-[#dcdcdf] dark:hover:bg-[#353940]"}`}>
                  {expanded ? <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reducedMotion ? 0 : 0.25 }} className="block"><strong className="font-semibold">{option.title}.</strong>{" "}{option.description}</motion.span> : <><Plus aria-hidden="true" className="size-6 shrink-0 rounded-full border border-current p-1" />{option.title}</>}
                </motion.button>
              );
            })}
          </div>
          <div className="relative aspect-[4/3] min-w-0 overflow-hidden lg:aspect-auto lg:h-[max(680px,90svh)]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={active.title} initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.3 }} className="absolute inset-0">
                {active.kind === "indication" ? <CercaShowcaseIndication option={active} />
                  : active.kind === "upperMesh" || active.kind === "lowerMesh" ? <CercaShowcaseMesh option={active} />
                    : active.kind === "length" ? <CercaShowcaseLength option={active} />
                      : active.kind === "knot" ? <span className="sr-only">{active.title}</span>
                        : <CercaShowcaseIndication option={active} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        {active.kind === "knot" && <CercaShowcaseKnot option={active} />}
      </div>
    </section>
  );
}
