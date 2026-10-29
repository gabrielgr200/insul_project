"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useContentTranslation } from "./LanguageProvider";

const panels = [
  { title: "Malha 5 × 20 cm", width: "5 cm", image: "protecao-5x20.webp", description: "Limite de proteção entre a mão." },
  { title: "Malha 2,5 × 20 cm", width: "2,5 cm", image: "protecao-2-5x20.webp", description: "Limite de proteção entre os dedos." },
  { title: "Malha 2 × 20 cm", width: "2 cm", image: "protecao-2x20.webp", description: "Limite de proteção entre as pontas dos dedos." },
];

export default function GradilProtectionShowcase() {
  const text = useContentTranslation();
  const id = useId();
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();
  const panel = panels[active];
  return (
    <section aria-labelledby={`${id}-heading`} className="poppins overflow-hidden bg-[#e9ecef] px-5 py-20 text-[#082d49] sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-[1300px] items-start gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.5fr)] lg:gap-x-20 lg:gap-y-12 min-[1920px]:max-w-[1600px] min-[2560px]:max-w-[2100px]">
        <header className="lg:col-start-2">
          <h2 id={`${id}-heading`} className="poppins mt-2 mb-8 text-[clamp(36px,5vw,88px)] font-bold leading-[1.05] tracking-tight">{text("Proteção em cada detalhe.")}</h2>
        </header>
        <div className="rounded-2xl grid grid-cols-3 gap-3 lg:col-start-1 lg:row-start-2 lg:grid-cols-1 lg:gap-4" role="group" aria-label={text("Selecione a imagem da malha")}>
          {panels.map((item, index) => <button key={item.image} type="button" onClick={() => setActive(index)} aria-pressed={active === index} aria-controls={`${id}-details`} aria-label={text(`Mostrar informações: ${item.title}`)} className={`rounded-2xl group overflow-hidden bg-[#fff] text-left transition-[opacity,box-shadow] duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff5500] ${active === index ? "opacity-100 ring-2 ring-[#ff5500]" : "opacity-60 hover:opacity-100"}`}>
            <span className="poppins block px-3 pt-3 text-[10px] uppercase tracking-widest text-[#082d49]/60 sm:px-5 sm:pt-4 sm:text-xs">0{index + 1} / {text("Malha")}</span>
            <span className="relative block aspect-square w-full sm:aspect-[16/10] lg:aspect-[16/8]">
              <Image src={`/images/img_gradil/img_G12/protecao/optimized/${item.image}`} alt={text(`Gradil G12 — ${item.title}: comparação da abertura com a mão`)} fill sizes="(min-width: 1920px) 600px, (min-width: 1024px) 400px, 30vw" className="object-contain transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none" />
            </span>
            <span className="block px-3 pb-3 text-xs font-medium sm:px-5 sm:pb-4 sm:text-xl">{text(item.title)}</span>
          </button>)}
        </div>
        <div id={`${id}-details`} className="min-w-0 lg:sticky lg:top-32 lg:col-start-2 lg:row-start-2" aria-live="polite" aria-atomic="true">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={panel.image} initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }} transition={{ duration: reducedMotion ? 0 : 0.25 }}>
              <div className="border-b border-[#082d49]/20 pb-7">
                <p className="poppins text-xs font-normal uppercase tracking-widest text-[#ff5500]">{text("Abertura da malha selecionada")}</p>
                <h3 className="poppins mt-4 text-3xl font-medium tracking-tight sm:text-4xl min-[1920px]:text-5xl">{text(panel.title)}</h3>
              </div>
              <dl>
                <div className="border-b border-[#082d49]/20 py-7"><dt className="poppins text-xs uppercase tracking-widest text-[#082d49]/60">{text("Largura da malha")}</dt><dd className="poppinsmt-3 font-semibold text-xl min-[1920px]:text-2xl">{panel.width}</dd></div>
                <div className="border-b border-[#082d49]/20 py-7"><dt className="poppins text-xs uppercase tracking-widest text-[#082d49]/60">{text("Altura da malha")}</dt><dd className="poppins font-semibold mt-3 text-xl min-[1920px]:text-2xl">20 cm</dd></div>
                <div className="border-b border-[#082d49]/20 py-7"><dt className="poppins text-xs uppercase tracking-widest text-[#082d49]/60">{text("Detalhes")}</dt><dd className="poppins mt-3 max-w-xl text-base font-light leading-relaxed text-[#082d49]/75 min-[1920px]:text-xl">{text(panel.description)}</dd></div>
              </dl>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
