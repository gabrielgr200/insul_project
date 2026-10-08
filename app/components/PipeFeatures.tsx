"use client";

import { useTranslation } from "./LanguageProvider";

const svgStroke = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-10 w-10",
};

const icons = [
  <svg key="thickness" {...svgStroke}>
    <line x1="12" y1="4" x2="12" y2="20" />
    <line x1="3" y1="12" x2="9" y2="12" />
    <polyline points="6,9 3,12 6,15" />
    <line x1="15" y1="12" x2="21" y2="12" />
    <polyline points="18,9 21,12 18,15" />
  </svg>,
  <svg key="post" {...svgStroke}>
    <rect x="4" y="8" width="16" height="8" rx="2" />
  </svg>,
  <svg key="uv" {...svgStroke}>
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
  <svg key="galvanized" viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10">
    <path d="M12 22a6 6 0 0 0 6-6c0-2.6-1.6-4.7-3.2-6.2-.4 1.5-1.4 2.1-2 2.2.6-2.1.1-4.7-2-6.5.4 3.1-2.1 4.2-3.1 6.8A6 6 0 0 0 12 22z" />
  </svg>,
  <svg key="phosphating" {...svgStroke}>
    <path d="M9 3h6" />
    <path d="M10 3v6l-4.2 8.1A2 2 0 0 0 7.6 20h8.8a2 2 0 0 0 1.8-2.9L14 9V3" />
    <line x1="8" y1="14" x2="16" y2="14" />
  </svg>,
  <svg key="coating" viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10">
    {[6, 11, 16].map((y) =>
      [7, 12, 17].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.3" />),
    )}
  </svg>,
];

export default function PipeFeatures() {
  const { dict } = useTranslation();
  const features = dict.gradil.pipes.features;

  return (
    <section data-accessory-features aria-label="Características dos tubos" className="bg-white py-16 dark:bg-zinc-950 sm:py-20">
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="relative ml-16 mr-3 grid w-auto max-w-[1400px] grid-cols-1 gap-x-8 gap-y-14 sm:ml-[100px] sm:mr-3 sm:grid-cols-2 lg:ml-[120px] lg:mr-[14px] lg:grid-cols-3">
          <span data-accessory-feature-line className="pointer-events-none absolute inset-y-2 left-1/3 hidden w-px -translate-x-1/2 bg-[#002d4d]/15 dark:bg-white/15 lg:block" />
          <span data-accessory-feature-line className="pointer-events-none absolute inset-y-2 left-2/3 hidden w-px -translate-x-1/2 bg-[#002d4d]/15 dark:bg-white/15 lg:block" />
          {features.map((lines, i) => (
            <div key={i} data-accessory-feature className="flex flex-col items-center text-center">
              <span className="text-[#ff5500]">{icons[i]}</span>
              <p className="poppins mt-4 leading-relaxed text-[#002d4d] dark:text-zinc-300 lg:text-[17px]">
                {lines.map((line) => <span key={line} className="block">{line}</span>)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
