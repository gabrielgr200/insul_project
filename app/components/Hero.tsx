'use client';

import { ArrowRight } from "lucide-react";
import HeroImages from "./HeroImages";
import { scrollToSection } from "../utils/ScrollToSection";
import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";
import FillButton from "./FillButton";
import { useTranslation } from "./LanguageProvider";
import styles from "./Hero.module.css";
import HoverGridBackground from "./HoverGridBackground";

const Hero = ({ ready = true }) => {
  const { t } = useTranslation();
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

      tl.from(".FIRME", { y: 48, opacity: 0, duration: 0.9, ease: "power3.out" }).from(
        ".DURADOURO",
        { y: 48, opacity: 0, duration: 1.2, ease: "power3.out" },
        "-=0.6",
      );

      tl.from(".HERO-SUBTEXT", { y: 24, opacity: 0, duration: 0.8 }, "-=0.6");

      tl.from(
        ".HERO-CTA",
        { y: 30, opacity: 0, duration: 0.95, ease: "power3.out" },
        "-=0.4",
      );
    }, rootRef);

    return () => ctx.revert();
  }, [ready]);

  return (
    <>
      <section
        id="inicio"
        ref={rootRef}
        className={`relative isolate max-w-7xl mx-auto px-4 sm:px-8 mb-0 ${styles.heroBanner}`}
      >
        <a
          href="https://www.casadascercas.com.br"
          target="_blank"
          rel="noreferrer"
          className="relative left-1/2 right-1/2 z-10 mb-8 block w-screen max-w-none mx-[-50vw]"
        >
          <video
            src="/videos/Banner-Insul.mp4"
            width={1920}
            height={96}
            className="block aspect-20/1 h-auto w-full object-cover transform-gpu"
            autoPlay
            muted
            loop
            playsInline
          />
        </a>
        <HoverGridBackground />
        <div className={`flex relative flex-col lg:flex-row lg:min-h-[clamp(560px,calc(50vw-10px),640px)] lg:space-x-12 overflow-clip ${styles.heroComposition}`}>
          <div className="lg:w-1/2">
            <div className={styles.heroIndent}>
              <h1 className="font-medium leading-none mb-6">
                <span
                  className={`inline-block impact lg:text-[250px] text-transparent
                  bg-clip-text bg-linear-to-r from-[#8a2e00] to-[#ff5500] FIRME ${styles.heroTitle}`}
                >
                  {t("hero.firme")}
                </span>
              </h1>
              <h1 className="font-medium leading-none -mt-4 lg:-mt-10">
                <span
                  className={`inline-block impact lg:text-[250px] tracking-tight
                  whitespace-nowrap text-transparent bg-clip-text
                  bg-linear-to-r from-[#8a2e00] to-[#ff5500] DURADOURO ${styles.heroTitle}`}
                >
                  {t("hero.duradouro")}
                </span>
              </h1>
              <div className={`lg:text-lg text-[#002d4d] dark:text-white max-w-md lg:w-full mb-8 py-2 HERO-SUBTEXT ${styles.heroSubtext}`}>
                {t("hero.subtitulo")}
              </div>
              <FillButton
                onClick={() => scrollToSection("produtos")}
                className={`HERO-CTA group bg-[#ff5500] text-white font-semibold
                rounded-full border border-[#FF6A1A] ease-in lg:absolute
                lg:text-lg lg:py-5 lg:px-10 lg:bottom-10 lg:right-10 cursor-pointer z-20 ${styles.heroButton}`}
                overlayClassName="bg-white dark:bg-background text-[#ff5500]"
              >
                <span>{t("hero.cta")}</span>
                <ArrowRight
                  size={20}
                  className="shrink-0"
                />
              </FillButton>
            </div>
            <div className={`lg:absolute lg:right-0 lg:top-auto lg:bottom-0 lg:w-[65%] max-h-full z-10 ${styles.heroImage}`}>
              <HeroImages ready={ready} />
            </div>
          </div>
        </div>
      </section>
      <hr className="text-zinc-300 lg:mt-0" />
    </>
  );
};
export default Hero;
