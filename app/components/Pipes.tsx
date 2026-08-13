"use client";

import { useTranslation } from "./LanguageProvider";

const CARD_MEDIA = [
  { src: "/images/poste/tampa.png", imgClass: "h-24 lg:h-28" },
  { src: "/images/poste/fixador.png", imgClass: "h-28 lg:h-32" },
  { src: "/images/poste/parafuso.png", imgClass: "h-28 lg:h-32" },
  { src: "/images/poste/tampinha-fixador.png", imgClass: "h-28 lg:h-32" },
];

const svgStroke = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-10 w-10",
};

const ICONS = [
  <svg key="0" {...svgStroke}>
    <line x1="12" y1="4" x2="12" y2="20" />
    <line x1="3" y1="12" x2="9" y2="12" />
    <polyline points="6,9 3,12 6,15" />
    <line x1="15" y1="12" x2="21" y2="12" />
    <polyline points="18,9 21,12 18,15" />
  </svg>,
  <svg key="1" {...svgStroke}>
    <rect x="4" y="8" width="16" height="8" rx="2" />
  </svg>,
  <svg key="2" {...svgStroke}>
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2" x2="12" y2="4" />
    <line x1="12" y1="20" x2="12" y2="22" />
    <line x1="2" y1="12" x2="4" y2="12" />
    <line x1="20" y1="12" x2="22" y2="12" />
    <line x1="5" y1="5" x2="6.5" y2="6.5" />
    <line x1="17.5" y1="17.5" x2="19" y2="19" />
    <line x1="5" y1="19" x2="6.5" y2="17.5" />
    <line x1="17.5" y1="6.5" x2="19" y2="5" />
  </svg>,
  <svg key="3" viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10">
    <path d="M12 22a6 6 0 0 0 6-6c0-2.6-1.6-4.7-3.2-6.2-.4 1.5-1.4 2.1-2 2.2.6-2.1.1-4.7-2-6.5.4 3.1-2.1 4.2-3.1 6.8A6 6 0 0 0 12 22z" />
  </svg>,
  <svg key="4" {...svgStroke}>
    <path d="M9 3h6" />
    <path d="M10 3v6l-4.2 8.1A2 2 0 0 0 7.6 20h8.8a2 2 0 0 0 1.8-2.9L14 9V3" />
    <line x1="8" y1="14" x2="16" y2="14" />
  </svg>,
  <svg key="5" viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10">
    {[6, 11, 16].map((y) =>
      [7, 12, 17].map((x) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.3" />
      )),
    )}
  </svg>,
];

const Pipes = () => {
  const { dict } = useTranslation();
  const p = dict.gradil.pipes;
  return (
    <section className="overflow-hidden bg-white px-6 pb-24 pt-12 dark:bg-zinc-950">
      <div className="mx-auto grid w-full max-w-6xl gap-10 rounded-3xl bg-[#002d4d]/[0.06] p-8 backdrop-blur-sm dark:bg-white/5 sm:p-12 lg:grid-cols-2 lg:items-center">
        <div className="text-center sm:text-left">
          <h3 className="INDUSTRY-LABEL text-center sm:text-left text-[#002d4d] dark:text-white font-light text-2xl poppins">
            {p.label}
          </h3>
          <div className="relative flex justify-center sm:justify-between items-end mb-12">
            <h2 className="INDUSTRY-TITLE text-center sm:text-left text-[#ff5500] text-[clamp(2.5rem,11vw,4.75rem)] lg:text-8xl impact uppercase text-nowrap leading-tight">
              {p.title1} <br /> {p.title2}
            </h2>
          </div>
          <p className="poppins mx-auto mt-4 max-w-2xl text-[#002d4d] dark:text-zinc-400 sm:mx-0 lg:text-[18px]">
            {p.text}
          </p>
        </div>

        <div className="-mb-8 -mt-16 flex items-end justify-center self-end sm:-mb-12 lg:-mt-24 lg:justify-end">
          <img
            src="/images/poste/conjunto.webp"
            alt={p.imgAlt}
            draggable={false}
            className="h-[520px] w-auto object-contain lg:h-[680px]"
          />
        </div>
      </div>

      <div className="mx-auto mt-14 grid w-full max-w-6xl grid-cols-2 gap-6 sm:mt-16 lg:grid-cols-4 lg:gap-8">
        {p.cards.map((card, i) => (
          <div
            key={card.title}
            className="group relative flex flex-col items-center rounded-3xl bg-[#002d4d]/[0.06] px-6 pb-14 pt-40 text-center shadow-xl shadow-[#002d4d]/15 transition duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl dark:bg-white/5 dark:shadow-black/40"
          >
            <img
              src={CARD_MEDIA[i].src}
              alt={card.title}
              draggable={false}
              className={`absolute -top-10 left-1/2 w-auto -translate-x-1/2 object-contain transition duration-500 ease-out group-hover:-translate-y-2 ${CARD_MEDIA[i].imgClass}`}
            />
            <h3 className="poppins text-lg font-bold uppercase tracking-[0.22em] text-[#ff5500]">
              {card.title}
            </h3>
            <p className="poppins mt-2 max-w-[22ch] text-sm leading-relaxed text-[#002d4d]/60 dark:text-zinc-400">
              {card.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="relative mx-auto mt-24 grid w-full max-w-6xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        <span className="pointer-events-none absolute inset-y-2 left-1/3 hidden w-px -translate-x-1/2 bg-[#002d4d]/15 dark:bg-white/15 lg:block" />
        <span className="pointer-events-none absolute inset-y-2 left-2/3 hidden w-px -translate-x-1/2 bg-[#002d4d]/15 dark:bg-white/15 lg:block" />
        {p.features.map((lines, i) => (
          <div key={i} className="flex flex-col items-center text-center">
            <span className="text-[#ff5500]">{ICONS[i]}</span>
            <p className="poppins mt-4 leading-relaxed text-[#002d4d] dark:text-zinc-300 lg:text-[17px]">
              {lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pipes;
