"use client";

import { useTranslation } from "./LanguageProvider";

const GuaranteeGradil = () => {
  const { dict } = useTranslation();
  const g = dict.gradil.guarantee;
  return (
    <section className="overflow-hidden bg-gradient-to-r from-[#ff5500] via-[#d94400] to-[#a83400] px-6 py-16 sm:py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-center md:justify-between md:gap-8">
        <div className="flex items-center gap-6">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="h-20 w-20 shrink-0 text-white lg:h-24 lg:w-24"
          >
            <path d="M12 2.75l7.25 2.75v5.5c0 4.75-3.1 8.2-7.25 9.75-4.15-1.55-7.25-5-7.25-9.75v-5.5L12 2.75z" />
            <path d="M8.5 12.2l2.4 2.4 4.6-4.8" />
          </svg>

          <div>
            <h2 className="poppins text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-[2.1rem]">
              {g.title1}
              <br /> {g.title2}
            </h2>
            <p className="poppins mt-3 text-sm text-white/85">{g.note}</p>
          </div>
        </div>

        <div className="hidden h-28 w-px shrink-0 bg-white/40 md:block" />

        <p className="poppins max-w-md text-base font-light leading-relaxed text-white sm:text-lg">
          {g.side}
        </p>
      </div>
    </section>
  );
};

export default GuaranteeGradil;
