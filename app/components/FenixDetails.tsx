'use client';

import { useState } from "react";
import { ChevronUp, ChevronDown, ImageIcon } from "lucide-react";

const features = [
  {
    title: "Fio 2,50 mm",
    description:
      "Fio de alta espessura, feito para suportar tração e impacto em cercamentos exigentes.",
    image: null,
  },
  {
    title: "Aço galvanizado a fogo",
    description:
      "Camada de zinco aplicada a quente que protege contra ferrugem e prolonga a vida útil da cerca.",
    image: null,
  },
  {
    title: "Malha bifásica",
    description:
      "Aberturas menores na base e maiores no topo, unindo contenção eficiente e visibilidade.",
    image: null,
  },
  {
    title: "Nó em X (stiff stay)",
    description:
      "Trava os fios em X, mantendo a tensão e a rigidez da estrutura por mais tempo.",
    image: null,
  },
];

const FenixDetails = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goPrev = () =>
    setActiveIndex((i) => (i - 1 + features.length) % features.length);
  const goNext = () => setActiveIndex((i) => (i + 1) % features.length);

  const activeFeature = features[activeIndex];

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 sm:px-8 lg:flex-row lg:items-center">
      <div className="lg:w-1/3">
        <div className="pl-14">
          <span className="inline-block rounded-full border border-zinc-300 px-4 py-1.5 text-sm font-medium text-[#002d4d]">
            Cerca Pronta
          </span>
          <h2 className="poppins mt-3 text-5xl font-bold text-[#ff5500]">
            FENIX
          </h2>
        </div>

        <div className="mt-6 flex gap-3">
          <div className="flex flex-col items-center gap-1 pt-1">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Item anterior"
              className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
            >
              <ChevronUp size={16} />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Próximo item"
              className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
            >
              <ChevronDown size={16} />
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-2">
            {features.map((feature, i) => {
              const active = i === activeIndex;
              return (
                <button
                  key={feature.title}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={`rounded-2xl px-4 py-3 text-left transition-colors ${
                    active ? "bg-zinc-100" : "hover:bg-zinc-50"
                  }`}
                >
                  <span className="text-sm font-medium text-zinc-800">
                    {feature.title}
                  </span>
                  {active && (
                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">
                      {feature.description}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-zinc-100 lg:w-2/3">
        {activeFeature.image ? (
          <img
            src={activeFeature.image}
            alt={activeFeature.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-zinc-400">
            <ImageIcon size={32} />
            <span className="text-sm">Imagem em breve</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default FenixDetails;
