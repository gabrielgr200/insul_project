"use client";

import { useLayoutEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Image from "next/image";
import ArameCards from "../components/ArameCards";
import ArameProductsCards from "../components/ArameProductsCards";
import AramesArc from "../components/AramesArc";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Wires = () => {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const landscapeY = useTransform(scrollY, [0, 1100], [0, 160]);
  const blurY = useTransform(scrollY, [0, 1100], [0, -160]);
  const textY = useTransform(scrollY, [0, 650], [0, -130]);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.8,
      effects: true,
      normalizeScroll: true,
    });

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleLoad);

    let refreshTimeout: ReturnType<typeof setTimeout>;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(refreshTimeout);
      refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 200);
    });
    if (contentRef.current) resizeObserver.observe(contentRef.current);

    const initialRefresh = setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(refreshTimeout);
      clearTimeout(initialRefresh);
      resizeObserver.disconnect();
      smoother && smoother.kill();
    };
  }, []);

  return (
    <div className="relative isolate min-h-screen overflow-clip">
      <Header />

      <div id="smooth-wrapper">
        <div id="smooth-content" ref={contentRef} className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[820px] overflow-hidden sm:h-[1040px]"
          >
            <Image
              src="/images/ceu-arame.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-top"
            />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[820px] overflow-hidden sm:h-[1040px]"
          >
            <motion.div
              style={{ y: reduceMotion ? 0 : landscapeY }}
              className="absolute inset-0 bg-[url('/images/fundo-page-arames.png')] bg-[length:100%_auto] bg-bottom bg-no-repeat motion-safe:will-change-transform"
            />
            <motion.div
              style={{ y: reduceMotion ? 0 : blurY }}
              className="absolute inset-x-0 top-[70%] -bottom-[160px] motion-safe:will-change-transform"
            >
              <div className="absolute inset-0 backdrop-blur-[2px] [mask-image:linear-gradient(to_bottom,transparent,black_35%)]" />
              <div className="absolute inset-0 backdrop-blur-[5px] [mask-image:linear-gradient(to_bottom,transparent_15%,black_55%)]" />
              <div className="absolute inset-0 backdrop-blur-[10px] [mask-image:linear-gradient(to_bottom,transparent_30%,black_70%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,#ffffff80_25%,#ffffff_60%)] dark:bg-[linear-gradient(to_bottom,transparent_0%,#090b0c80_25%,#090b0c_60%)]" />
            </motion.div>
          </div>
          <main className="poppins mx-auto max-w-7xl px-4 pt-40 pb-20 text-[#002d4d] sm:px-8 sm:pt-48">
            <section
              aria-labelledby="arames-title"
              className="relative isolate flex min-h-[660px] flex-col bg-transparent text-center sm:min-h-[850px]"
            >
              <motion.div
                style={{ y: reduceMotion ? 0 : textY }}
                className="relative z-10 mx-auto max-w-3xl motion-safe:will-change-transform"
              >
                <p className="text-[11px] font-medium tracking-[.24em]">
                  ARAMES INSUL
                </p>
                <h1
                  id="arames-title"
                  className="mt-5 text-[clamp(36px,5.5vw,68px)] leading-[1.08] font-normal tracking-[-.045em]"
                >
                  Cada fio,{" "}
                  <span className="text-[#ff5500] font-semibold">
                    uma possibilidade.
                  </span>
                </h1>
                <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-[#536777] sm:text-base">
                  Conheça a linha de arames galvanizados Insul e encontre o fio
                  para o seu próximo projeto.
                </p>
              </motion.div>
            </section>

            <ArameCards />
            <AramesArc />
            <ArameProductsCards />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Wires;
