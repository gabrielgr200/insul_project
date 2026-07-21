'use client';

import { ArrowRight } from "lucide-react";
import HeroImages from "./HeroImages";
import { heroImage } from "../assets/data";
import { scrollToSection } from "../utils/ScrollToSection";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

const Hero = ({ ready = true }) => {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {
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
        className="max-w-7xl mt-30 mx-auto p-4 sm:p-8 pb-0 mb-0"
      >
        <div className="flex relative flex-col lg:flex-row lg:space-x-12 overflow-clip">
          <div className="lg:w-1/2">
            <h1 className="text-7xl sm:text-8xl font-medium leading-none mb-6">
              <span
                className="inline-block impact lg:text-[250px] text-transparent
                bg-clip-text bg-gradient-to-r from-[#8a2e00] to-[#ff5500] FIRME"
              >
                FIRME
              </span>
            </h1>
            <div className="absolute right-0 top-0 lg:-top-[2%] w-full lg:w-[65%] max-h-full z-10">
              <HeroImages src={heroImage} />
            </div>
            <h1 className="font-medium leading-none -mt-4 lg:-mt-10">
              <span
                className="inline-block impact text-7xl sm:text-8xl lg:text-[250px] tracking-tight
                whitespace-nowrap text-transparent bg-clip-text
                bg-gradient-to-r from-[#8a2e00] to-[#ff5500] DURADOURO"
              >
                DURADOURO
              </span>
            </h1>
            <div className="text-base lg:text-lg text-[#002d4d] max-w-md lg:w-full mb-8 py-2 HERO-SUBTEXT">
              A Insul é líder na fabricação de telas, gradis, alambrados e
              cercas prontas com maior mix de produtos do mercado.
            </div>
            <button
              onClick={() => scrollToSection("produtos")}
              className="HERO-CTA group flex items-center space-x-3 bg-[#ff5500] text-white
              text-sm font-semibold py-4 px-6 rounded-full transition-colors duration-150
              hover:bg-white/10 hover:backdrop-blur-md border border-[#FF6A1A] hover:text-[#ff5500] ease-in lg:absolute
              lg:text-lg lg:py-5 lg:px-10 bottom-10 right-10 hover:animate-wiggle cursor-pointer z-20"
            >
              <span>Nossos produtos</span>
              <ArrowRight
                size={20}
                className="group-hover:rotate-360 -routae-35 transition-all duration-500 ease-in"
              />
            </button>
          </div>
        </div>
      </section>
      <hr className="text-zinc-300 -mt-8" />
    </>
  );
};
export default Hero;
