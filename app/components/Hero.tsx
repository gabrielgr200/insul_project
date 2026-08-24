'use client';

import { ArrowRight } from "lucide-react";
import HeroImages from "./HeroImages";
import { heroImage } from "../assets/data";
import { scrollToSection } from "../utils/ScrollToSection";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import FillButton from "./FillButton";
import { useTranslation } from "./LanguageProvider";
import styles from "./Hero.module.css";

const GRID_COLS = 10;
const GRID_ROWS = 6;
const GRID_CELL_SIZE = 200;
const GRID_SQUARES = Array.from({ length: GRID_COLS * GRID_ROWS });

const Hero = ({ ready = true }) => {
  const { t } = useTranslation();
  const rootRef = useRef(null);

  useEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {
      const squareFills = gsap.utils.shuffle(
        gsap.utils.toArray<HTMLElement>(".hero-square-fill"),
      );
      const squaresTl = gsap.timeline({ repeat: -1 });
      squareFills.forEach((el) => {
        squaresTl
          .to(el, { opacity: 1, duration: 0.25, ease: "power1.inOut" })
          .to(el, { opacity: 1, duration: 0.25 })
          .to(el, { opacity: 0, duration: 0.25, ease: "power1.inOut" });
      });

      const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

      tl.from(".FIRME", { x: -120, opacity: 0, duration: 0.9 }).from(
        ".DURADOURO",
        { x: 120, opacity: 0, duration: 1.2 },
        "-=0.6",
      );

      tl.from(
        ".HERO-IMAGE-WRAPPER",
        { x: 50, opacity: 0, duration: 1.2, ease: "power2.out" },
        "-=0.5",
      );

      tl.from(".HERO-SUBTEXT", { y: 24, opacity: 0, duration: 0.8 }, "-=0.6");

      tl.from(
        ".HERO-CTA",
        { scale: 0.7, opacity: 0, duration: 0.7, ease: "back.out(1.7)" },
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
        className={`relative max-w-7xl mx-auto px-4 sm:px-8 mb-0 ${styles.heroBanner}`}
      >
        <a
          href="https://www.casadascercas.com.br"
          target="_blank"
          rel="noreferrer"
          className="relative left-1/2 right-1/2 z-10 mb-8 block w-screen max-w-none -mx-[50vw]"
        >
          <video
            src="/videos/banner-site.mp4"
            className="block h-auto w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        </a>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden text-black/[0.05] dark:text-white/[0.06]"
          style={{
            maskImage:
              "radial-gradient(ellipse 75% 70% at 45% 40%, black 35%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 75% 70% at 45% 40%, black 35%, transparent 78%)",
          }}
        >
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${GRID_COLS}, ${GRID_CELL_SIZE}px)`,
              gridTemplateRows: `repeat(${GRID_ROWS}, ${GRID_CELL_SIZE}px)`,
            }}
          >
            {GRID_SQUARES.map((_, i) => (
              <div
                key={i}
                className="hero-square relative border-r border-b border-current"
              >
                <div className="hero-square-fill absolute inset-0 bg-zinc-400/60 opacity-0 dark:bg-white/10" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex relative flex-col lg:flex-row lg:min-h-[clamp(560px,calc(50vw_-_10px),640px)] lg:space-x-12 overflow-clip">
          <div className="lg:w-1/2">
            <div className={styles.heroIndent}>
              <h1 className="font-medium leading-none mb-6">
                <span
                  className={`inline-block impact lg:text-[250px] text-transparent
                  bg-clip-text bg-gradient-to-r from-[#8a2e00] to-[#ff5500] FIRME ${styles.heroTitle}`}
                >
                  {t("hero.firme")}
                </span>
              </h1>
              <h1 className="font-medium leading-none -mt-4 lg:-mt-10">
                <span
                  className={`inline-block impact lg:text-[250px] tracking-tight
                  whitespace-nowrap text-transparent bg-clip-text
                  bg-gradient-to-r from-[#8a2e00] to-[#ff5500] DURADOURO ${styles.heroTitle}`}
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
                lg:text-lg lg:py-5 lg:px-10 lg:bottom-10 lg:right-10 hover:animate-wiggle cursor-pointer z-20 ${styles.heroButton}`}
                overlayClassName="bg-white dark:bg-background text-[#ff5500]"
              >
                <span>{t("hero.cta")}</span>
                <ArrowRight
                  size={20}
                  className="group-hover:rotate-360 -routae-35 transition-all duration-500 ease-in"
                />
              </FillButton>
            </div>
            <div className={`lg:absolute lg:right-0 lg:top-auto lg:bottom-0 lg:w-[65%] max-h-full z-10 ${styles.heroImage}`}>
              <HeroImages src={heroImage} />
            </div>
          </div>
        </div>
      </section>
      <hr className="text-zinc-300 lg:mt-0" />
    </>
  );
};
export default Hero;
