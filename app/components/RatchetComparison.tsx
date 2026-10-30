"use client";

import { useId, useState } from "react";
import { ImageIcon } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type ComparisonSlide = { title: string; description: string; items: string[] };

const microSlides: ComparisonSlide[] = [
  { title: "Características", description: "Modelo compacto para manter o arame liso e as cercas de tela firmes e tensionados.", items: ["Aço carbono galvanizado", "Parede: 2,5 mm", "Capacidade de enrolamento: até 3 mm"] },
  { title: "Aplicações", description: "Permite tensionar e emendar arames em diferentes pontos do cercamento.", items: ["Esticar arame liso, ovalado e cercas de tela"] },
  { title: "Especificações", description: "Uma opção leve para os projetos compatíveis com a capacidade da Micro.", items: ["Peso e Dimensões: 0,200kg - 75mm x 57mm x 26mm"] },
];

const t7Slides: ComparisonSlide[] = [
  { title: "Características", description: "Modelo reforçado para cercamentos que exigem uma peça mais robusta.", items: ["Aço carbono galvanizado", "Parede: 3 mm", "Capacidade de enrolamento: até 3,5 m"] },
  { title: "Aplicações", description: "Indicada para trabalhos pesados e arames que exigem mais robustez do que a Micro oferece.", items: ["Esticar arame liso, ovalado, farpados e cercas de tela"] },
  { title: "Especificações", description: "Chapa mais espessa e maior limite de diâmetro do fio em comparação à Micro.", items: ["Peso e Dimensões: 0,300kg - 94mm x 81mm x 31mm"] },
];

function ComparisonCard({ name, orange, slides }: { name: string; orange: boolean; slides: ComparisonSlide[] }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const reducedMotion = useReducedMotion();
  const slide = slides[active];
  return (
    <article className="relative flex min-w-0 flex-col overflow-hidden rounded-3xl bg-zinc-100 text-[#082d49] dark:bg-zinc-900 dark:text-white">
      <header className={`flex items-center gap-5 px-6 py-6 sm:px-8 ${orange ? "bg-[#ff5500]" : "bg-[#082d49]"} text-white`}>
        <div role="img" aria-label={`Espaço reservado para a imagem da ${name}`} className="flex size-24 shrink-0 flex-col items-center justify-center gap-2 rounded-full border border-dashed border-white/60 bg-white/10 p-3 text-center sm:size-28">
          <ImageIcon size={28} strokeWidth={1.3} aria-hidden="true" />
          <span className="text-[9px] uppercase tracking-wider">Imagem placeholder</span>
        </div>
        <h3 className="text-xl font-semibold sm:text-2xl">{name}</h3>
      </header>
      <div className="flex flex-1 flex-col px-6 pb-8 pt-7 sm:px-10">
        <div id={id} aria-live="polite" aria-atomic="true" className="min-h-[260px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={active} initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }} transition={{ duration: reducedMotion ? 0 : 0.18 }}>
              <h4 className={`text-sm font-semibold uppercase tracking-wider ${orange ? "text-[#ff5500]" : "text-[#082d49] dark:text-zinc-200"}`}>{slide.title}</h4>
              <p className="mt-4 text-sm leading-relaxed opacity-70 sm:text-base">{slide.description}</p>
              <ul className="mt-6 space-y-3 text-sm opacity-75">
                {slide.items.map(item => <li key={item} className="flex items-start gap-3"><span aria-hidden="true" className={`mt-1.5 size-2 shrink-0 rounded-full ${orange ? "bg-[#ff5500]" : "bg-[#082d49] dark:bg-zinc-400"}`} />{item}</li>)}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-auto flex justify-center gap-1 pt-6" role="group" aria-label={`Textos da ${name}`}>
          {slides.map((item, index) => <button key={item.title} type="button" onClick={() => setActive(index)} aria-controls={id} aria-pressed={active === index} aria-label={`${name}: ${item.title}`} className={`grid size-9 cursor-pointer place-items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5500] ${orange ? "text-[#ff5500]" : "text-[#082d49] dark:text-white"}`}><span className={`size-2.5 rounded-full bg-current transition-[opacity,transform] ${active === index ? "scale-125 opacity-100" : "opacity-25 hover:opacity-60"}`} /></button>)}
        </div>
      </div>
      <div aria-hidden="true" className={`h-3 ${orange ? "bg-[#ff5500]" : "bg-[#082d49]"}`} />
    </article>
  );
}

export default function RatchetComparison({ title = "Compare as catracas", firstName = "Catraca Micro", secondName = "Catraca T7" }: { title?: string; firstName?: string; secondName?: string }) {
  return (
    <section aria-labelledby="ratchet-comparison-title" className="poppins mx-auto max-w-[1300px] px-4 py-16 sm:px-8">
      <h2 id="ratchet-comparison-title" className="mb-10 text-center text-3xl font-bold text-[#082d49] dark:text-white sm:text-4xl">{title}</h2>
      <div className="grid gap-8 md:grid-cols-2">
        <ComparisonCard name={firstName} orange={false} slides={microSlides} />
        <ComparisonCard name={secondName} orange slides={t7Slides} />
      </div>
    </section>
  );
}
