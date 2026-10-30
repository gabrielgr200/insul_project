"use client";

import { useId, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import type { CercaShowcaseData } from "../assets/data";
import CercaShowcaseIndication from "./CercaShowcaseIndication";
import CercaShowcaseMesh from "./CercaShowcaseMesh";
import CercaShowcaseKnot from "./CercaShowcaseKnot";
import type { SimulatorProduct } from "./terrainSimulatorTypes";
import CercaShowcaseColors from "./CercaShowcaseColors";
import { useContentTranslation } from "./LanguageProvider";

const TerrainSimulator = dynamic(() => import("./TerrainSimulator"), {
  ssr: false,
  loading: () => <div className="grid min-h-[400px] place-items-center text-sm text-[#082d49]">Carregando simulador…</div>,
});

export default function CercaShowcaseTeste({ showcase, color, product }: { showcase: CercaShowcaseData; color: string; product: SimulatorProduct }) {
  const translateText = useContentTranslation();
  const titleId = useId();
  const [selected, setSelected] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const reducedMotion = useReducedMotion();
  const simulatorOption = { title: "Simulador", description: "Escolha um cenário e ajuste o cercado para visualizar a instalação deste produto.", image: "", background: undefined, kind: "simulator" as const };
  const hasLength = showcase.options.some(option => option.kind === "length" || option.title === "Comprimento");
  const options = showcase.options.map(option => option.kind === "length" || option.title === "Comprimento" ? simulatorOption : option);
  if (!hasLength) options.push(simulatorOption);
  const active = options[selected];
  const isSimulator = active.kind === "simulator";
  const meshOption = showcase.options.find(option => option.widthLabel && option.heightLabel);

  return (
    <section aria-labelledby={titleId} className="poppins">
      <div className="mx-auto max-w-2xl px-5 pb-10 text-center sm:px-10 lg:pb-12">
        <h2 id={titleId} style={{ color }} className="text-[clamp(30px,4vw,48px)] leading-[1.12] font-bold tracking-[-.04em] poppins">{translateText(showcase.title)}{showcase.subtitle && <><br /><span className="font-light text-[#002d4d] dark:text-white">{translateText(showcase.subtitle)}</span></>}</h2>
        <p className="poppins mx-auto mt-4 max-w-2xl text-sm leading-relaxed font-light text-black/70 dark:text-white/80 sm:text-base">{translateText(showcase.description)}</p>
      </div>
      <div className="relative isolate overflow-hidden bg-[#f5f5f5] pt-12 dark:bg-[#191b1e] lg:pt-0">
        {(active.background || active.kind === "image") && (
          <Image
            src={active.background || active.image}
            alt=""
            fill
            sizes="100vw"
            className="pointer-events-none object-cover"
          />
        )}
        <div className={`relative z-10 ${isSimulator ? "min-h-[1040px] lg:h-[max(760px,90svh)] lg:min-h-0" : "grid items-center gap-8 px-5 sm:px-10 lg:min-h-[680px] lg:grid-cols-[400px_1fr] lg:gap-12 lg:pr-0 lg:pl-[6vw]"}`}>
          <div className={`flex flex-col items-start gap-3 ${isSimulator ? "relative z-20 w-full px-5 pb-6 sm:px-10 lg:absolute lg:left-[6vw] lg:top-1/2 lg:w-[240px] lg:-translate-y-1/2 lg:px-0 lg:pb-0" : ""}`}>
            {options.map((option, index) => {
              const expanded = selected === index;
              if (expanded) {
                return (
                  <motion.div
                    key={option.title}
                    layout={!reducedMotion}
                    transition={{ duration: reducedMotion ? 0 : 0.35 }}
                    role="group"
                    aria-label={translateText(option.title)}
                    className="w-full rounded-[28px] bg-[#e7e7e9] p-7 text-left text-sm leading-relaxed text-[#002d4d] dark:bg-[#292c31] dark:text-white sm:text-base"
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: reducedMotion ? 0 : 0.25 }}
                      className="block"
                    >
                      <strong className="font-semibold">{translateText(option.title)}.</strong>{translateText(" ")}
                      {translateText(option.description)}
                    </motion.span>
                    {option.kind === "colors" && option.colorOptions && (
                      <div
                        role="group"
                        aria-label={translateText("Escolha a cor da tela PVC")}
                        className="mt-4 flex items-center gap-3"
                      >
                        {option.colorOptions.map((color, colorIndex) => (
                          <button
                            key={color.title}
                            type="button"
                            aria-label={translateText(color.title)}
                            aria-pressed={selectedColor === colorIndex}
                            title={translateText(color.title)}
                            onClick={() => setSelectedColor(colorIndex)}
                            className="grid size-11 cursor-pointer place-items-center rounded-full transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff5500]"
                          >
                            <span
                              aria-hidden="true"
                              className={`size-8 rounded-full ring-1 ring-black/10 ${selectedColor === colorIndex ? "outline-2 outline-offset-2 outline-[#ff5500]" : ""}`}
                              style={{ backgroundColor: color.color }}
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              }

              return (
                <motion.button
                  key={option.title}
                  layout={!reducedMotion}
                  transition={{ duration: reducedMotion ? 0 : 0.35 }}
                  type="button"
                  aria-pressed={false}
                  onClick={() => setSelected(index)}
                  className="flex items-center gap-3 rounded-full bg-[#e7e7e9] px-5 py-4 text-left text-sm font-semibold text-[#002d4d] transition-colors hover:bg-[#dcdcdf] focus-visible:outline-2 focus-visible:outline-offset-4 dark:bg-[#292c31] dark:text-white dark:hover:bg-[#353940] sm:text-base"
                >
                  <Plus aria-hidden="true" className="size-6 shrink-0 rounded-full border border-current p-1" />
                  {translateText(option.title)}
                </motion.button>
              );
            })}
          </div>
          <div className={isSimulator ? "relative h-[840px] min-w-0 lg:absolute lg:inset-0 lg:h-auto" : "relative aspect-[4/3] min-w-0 overflow-hidden lg:aspect-auto lg:h-[max(680px,90svh)]"}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={active.title} initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.3 }} className="absolute inset-0">
                {isSimulator ? <TerrainSimulator product={product} meshWidth={meshOption?.widthLabel} meshHeight={meshOption?.heightLabel} /> : translateText(active.kind === "indication" ? <CercaShowcaseIndication option={active} />
                  : active.kind === "upperMesh" || active.kind === "lowerMesh" ? <CercaShowcaseMesh option={active} />
                    : active.kind === "meshDetail" ? <><CercaShowcaseMesh option={active} /><CercaShowcaseKnot option={active} /></>
                    
                    : active.kind === "colors" ? <CercaShowcaseColors option={active} selectedColor={selectedColor} />
                      : active.kind === "image" ? <span className="sr-only">{translateText(active.title)}</span>
                      : active.kind === "knot" ? <span className="sr-only">{translateText(active.title)}</span>
                        : <CercaShowcaseIndication option={active} />)}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        {active.kind === "knot" && <CercaShowcaseKnot option={active} />}
      </div>
    </section>
  );
}
