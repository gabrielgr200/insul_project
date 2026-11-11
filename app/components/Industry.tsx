'use client';

import { useRef } from "react";
import { useScrollTextReveal } from "./useScrollTextReveal";
import ScrollTimeline from "./Timeline";
import { useTranslation } from "./LanguageProvider";

export const IndustryHeader = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  useScrollTextReveal(sectionRef, ".INDUSTRY-LABEL, .INDUSTRY-TITLE, .INDUSTRY-TEXT");

  return (
    <section
      ref={sectionRef}
      id="industria"
      className="home-wide-section relative max-w-7xl mx-auto p-4 sm:p-8 mt-28 sm:mt-20 mb-20"
    >
      <h3 className="INDUSTRY-LABEL text-center sm:text-left text-[#002d4d] dark:text-white font-semibold text-2xl poppins py-3">
        {t("industry.label")}
      </h3>
      <div className="relative flex justify-center sm:justify-between items-end mb-12">
        <h2 className="INDUSTRY-TITLE text-center sm:text-left text-[#ff5500] text-[clamp(2.5rem,11vw,4.75rem)] lg:text-[clamp(4.75rem,7.5vw,8rem)] impact uppercase text-nowrap leading-tight">
          {t("industry.titulo")}
        </h2>
      </div>

      <p className="INDUSTRY-TEXT text-center sm:text-left text-base lg:text-lg text-[#002d4d] dark:text-white max-w-sm mx-auto sm:mx-0 sm:max-w-none lg:w-full">
        {t("industry.texto")}
      </p>
    </section>
  );
};

export const IndustryTimeline = () => {
  const { dict } = useTranslation();
  return (
    <section className="relative isolate z-0 min-h-[200vh] bg-white dark:bg-background">
      <ScrollTimeline items={dict.industry.timeline} />
    </section>
  );
};

