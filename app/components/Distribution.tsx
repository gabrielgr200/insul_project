'use client';

import { useEffect, useRef } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { gsap } from "gsap";
import BrazilMap from "./BrazilMap";
import GuilhermeChatbot from "./GuilhermeChatbot";
import { useTranslation } from "./LanguageProvider";

const Distribution = () => {
  const { t, dict } = useTranslation();
  const distributionCenters = dict.distribution.centers;
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power1.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.from(".DISTRIBUTION-LABEL", { y: 20, opacity: 0, duration: 0.5 })
        .from(
          ".DISTRIBUTION-TITLE",
          { x: -80, opacity: 0, duration: 0.8, ease: "power2.out" },
          "-=0.2",
        )
        .from(".DISTRIBUTION-TEXT", { y: 20, opacity: 0, duration: 0.5 }, "-=0.5")
        .from(
          ".DISTRIBUTION-CARD",
          { y: 20, opacity: 0, duration: 0.5, stagger: 0.12, clearProps: "transform" },
          "-=0.3",
        )
        .from(".DISTRIBUTION-MAP", { scale: 0.9, opacity: 0, duration: 0.9 }, "-=0.6");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="distribuicao"
      className="bg-white dark:bg-background max-w-7xl mx-auto p-4 sm:p-8 mt-20 mb-20"
    >
      <h3 className="DISTRIBUTION-LABEL text-center sm:text-left text-[#002d4d] dark:text-white font-semibold text-2xl poppins py-3">
        {t("distribution.label")}
      </h3>

      <div className="relative flex justify-center sm:justify-between items-end mb-12">
        <h2 className="DISTRIBUTION-TITLE text-center sm:text-left text-[#ff5500] text-[clamp(2.5rem,11vw,4.75rem)] lg:text-9xl impact uppercase text-nowrap leading-tight">
          {t("distribution.tituloLinha1")} <br /> {t("distribution.tituloLinha2")}
        </h2>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-x-20">
        <div className="lg:col-start-1 lg:row-start-1">
          <p className="DISTRIBUTION-TEXT text-center sm:text-left text-base lg:text-lg text-[#002d4d] dark:text-white max-w-sm mx-auto sm:mx-0 sm:max-w-none">
            {t("distribution.texto")}
          </p>

          <div className="flex flex-col gap-4 mt-12 items-center lg:items-start">
            {distributionCenters.map((center) => (
              <div
                key={center.state}
                className="DISTRIBUTION-CARD flex items-center gap-3 sm:gap-2 bg-white dark:bg-white/5 dark:backdrop-blur-md border border-zinc-200 dark:border-white/10 rounded-2xl shadow-sm p-3 sm:p-2 w-full max-w-sm lg:max-w-xs
                transition-[box-shadow,border-color] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:border-zinc-300 dark:hover:border-white/20 cursor-pointer"
              >
                <div className="w-20 h-20 shrink-0 rounded-xl bg-gradient-to-br from-[#002d4d] to-[#0a5c9c] flex items-center justify-center">
                  <MapPin className="text-white" size={28} />
                </div>
                <div className="flex flex-col gap-1 px-2">
                  <p className="text-[#ff5500] text-xs font-semibold uppercase tracking-wide">
                    {t("distribution.cardLabel")}
                  </p>
                  <p className="text-[#002d4d] dark:text-white font-bold text-lg leading-tight">
                    {center.state}
                  </p>
                  <p className="text-zinc-500 text-sm flex items-center gap-1">
                    <ArrowRight size={14} /> {center.city}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="DISTRIBUTION-MAP mt-10 lg:mt-0 lg:translate-x-32 lg:col-start-2 lg:col-span-2 lg:row-start-1 lg:row-span-2">
          <BrazilMap />
        </div>

        <div className="lg:col-start-1 lg:row-start-2">
          <GuilhermeChatbot />
        </div>
      </div>
    </section>
  );
};

export default Distribution;
