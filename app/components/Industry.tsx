'use client';

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTimeline from "./Timeline";
import { useTranslation } from "./LanguageProvider";

export const IndustryHeader = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power1.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });

      tl.from(".INDUSTRY-LABEL", { y: 20, opacity: 0, duration: 0.5 })
        .from(
          ".INDUSTRY-TITLE",
          { x: -80, opacity: 0, duration: 0.8, ease: "power2.out" },
          "-=0.2",
        )
        .from(".INDUSTRY-TEXT", { y: 20, opacity: 0, duration: 0.5 }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="industria"
      className="relative max-w-7xl mx-auto p-4 sm:p-8 mt-28 sm:mt-20 mb-20"
    >
      <h3 className="INDUSTRY-LABEL text-center sm:text-left text-[#002d4d] dark:text-white font-semibold text-2xl poppins py-3">
        {t("industry.label")}
      </h3>
      <div className="relative flex justify-center sm:justify-between items-end mb-12">
        <h2 className="INDUSTRY-TITLE text-center sm:text-left text-[#ff5500] text-[clamp(2.5rem,11vw,4.75rem)] lg:text-9xl impact uppercase text-nowrap leading-tight">
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
