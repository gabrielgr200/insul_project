"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GradilCards from "../components/GradilCards";
import TextRevealColor from "../components/TextRevealColor";
import ImgCarousel from "../components/ImgCarousel";
import GradilProcess from "../components/GradilProcess";
import { gradilGallery } from "../assets/data";
import GradilColors from "../components/GradilColors";
import ProductsCardGradil from "../components/ProductsCardGradil";
import CoatingGradil from "../components/CoatingGradil";
import GuaranteeGradil from "../components/GuaranteeGradil";
import Pipes from "../components/Pipes";
import OtherProducts from "../components/OtherProducts";
import { useTranslation } from "../components/LanguageProvider";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const LAYERS = [
  { src: "https://d2c3kthzw0ta10.cloudfront.net/parallax/ceu.webp", z: 10 },
  { src: "https://d2c3kthzw0ta10.cloudfront.net/parallax/casa.webp", z: 20 },
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/parallax/gradil-esquerda.webp",
    z: 30,
  },
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/parallax/gradil-direita.webp",
    z: 30,
  },
];

const MOTION_STRONG = [
  { yFrom: 0, yTo: 3, xFrom: 0, xTo: 0, scaleBase: 1.15, scaleTo: 1.15 },
  { yFrom: 42, yTo: 0, xFrom: 0, xTo: 0, scaleBase: 1.15, scaleTo: 1.15 },
  { yFrom: 45, yTo: 0, xFrom: -45, xTo: 0, scaleBase: 1.15, scaleTo: 1.22 },
  { yFrom: 45, yTo: 0, xFrom: 45, xTo: 0, scaleBase: 1.15, scaleTo: 1.22 },
];
const MOTION_REDUCED = [
  { yFrom: 0, yTo: 2, xFrom: 0, xTo: 0, scaleBase: 1.06, scaleTo: 1.06 },
  { yFrom: 40, yTo: 0, xFrom: 0, xTo: 0, scaleBase: 1.06, scaleTo: 1.06 },
  { yFrom: 42, yTo: 0, xFrom: -40, xTo: 0, scaleBase: 1.06, scaleTo: 1.1 },
  { yFrom: 42, yTo: 0, xFrom: 40, xTo: 0, scaleBase: 1.06, scaleTo: 1.1 },
];

const Gradil = () => {
  const { dict } = useTranslation();
  const g = dict.gradil;
  const sectionRef = useRef<HTMLElement>(null);
  const layerRefs = useRef<(HTMLImageElement | null)[]>([]);
  const waveRef = useRef<HTMLDivElement>(null);
  const cardStageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const gateLRef = useRef<HTMLImageElement>(null);
  const gateRRef = useRef<HTMLImageElement>(null);
  const birdRef = useRef<HTMLImageElement>(null);
  const industryRef = useRef<HTMLImageElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const gradilInfoRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    console.log("[Gradil] mount", {
      scrollYBefore: window.scrollY,
      existingSmoother: !!ScrollSmoother.get(),
      existingTriggers: ScrollTrigger.getAll().length,
      contentTransform: document.getElementById("smooth-content")?.style
        .transform,
      t: performance.now(),
    });

    window.scrollTo(0, 0);

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.8,
      effects: true,
    });

    console.log("[Gradil] smoother created", {
      scrollYAfter: window.scrollY,
      triggersAfterCreate: ScrollTrigger.getAll().length,
      t: performance.now(),
    });

    const doRefresh = () => smoother.refresh();
    const earlyRefreshRaf = requestAnimationFrame(() => {
      requestAnimationFrame(doRefresh);
    });
    const earlyRefreshTimeouts = [150, 400, 900].map((delay) =>
      setTimeout(doRefresh, delay),
    );

    let refreshTimeout: ReturnType<typeof setTimeout>;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(refreshTimeout);
      refreshTimeout = setTimeout(doRefresh, 200);
    });
    if (contentRef.current) resizeObserver.observe(contentRef.current);

    const mm = gsap.matchMedia();

    const build = (motion: typeof MOTION_STRONG) => {
      const layers = layerRefs.current;

      layers.forEach((el, i) => {
        gsap.set(el, {
          scale: motion[i].scaleBase,
          yPercent: motion[i].yFrom,
          xPercent: motion[i].xFrom,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1700%",
          scrub: 3,
          pin: true,
          anticipatePin: 1,
        },
      });

      layers.forEach((el, i) => {
        tl.to(
          el,
          {
            yPercent: motion[i].yTo,
            xPercent: motion[i].xTo,
            scale: motion[i].scaleTo,
            ease: "none",
            duration: 1,
          },
          0,
        );
      });

      gsap.set(heroRef.current, { yPercent: 0, autoAlpha: 1 });
      tl.to(
        heroRef.current,
        { yPercent: 120, autoAlpha: 0, ease: "power1.in", duration: 0.75 },
        0,
      );

      gsap.set(waveRef.current, { yPercent: 100 });
      tl.to(
        waveRef.current,
        { yPercent: 0, ease: "power2.inOut", duration: 0.5 },
        1.0,
      );

      const C = 1.5;
      const kids = introRef.current
        ? (Array.from(introRef.current.children) as HTMLElement[])
        : [];

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const cardW = Math.min(vw * 0.82, 520);
      const cardH = (cardW * 9) / 16;
      const OVER_FILL = 1.12;
      const ratio = Math.max(vw / cardW, vh / cardH) * OVER_FILL;
      const coverW = cardW * ratio;
      const coverH = cardH * ratio;

      gsap.set(cardStageRef.current, { autoAlpha: 0 });
      gsap.set(cardRef.current, {
        yPercent: -55,
        scale: 0.32,
        rotateY: 0,
        transformOrigin: "center center",
      });
      gsap.set(bgRef.current, { "--g": 1 });
      gsap.set(gradilInfoRef.current, { autoAlpha: 0, y: 40 });
      gsap.set(gateLRef.current, { xPercent: -120 });
      gsap.set(gateRRef.current, { xPercent: 120 });
      gsap.set(birdRef.current, { xPercent: 0, yPercent: 0 });
      gsap.set(industryRef.current, { scale: 1.9, yPercent: 22 });
      if (kids.length === 3) {
        gsap.set(kids, { yPercent: -50, opacity: 1 });
        gsap.set(kids[0], { x: "-120vw" });
        gsap.set(kids[1], { x: "120vw" });
        gsap.set(kids[2], { x: "-120vw" });
      }

      tl.to(cardStageRef.current, { autoAlpha: 1, duration: 0.2 }, C)
        .to(cardRef.current, { rotateY: 360, ease: "none", duration: 2.65 }, C)
        .to(cardRef.current, { yPercent: 5, ease: "none", duration: 2.65 }, C);

      if (kids.length === 3) {
        tl.to(
          kids[0],
          { x: "120vw", ease: "power1.inOut", duration: 1.1 },
          C + 0.15,
        )
          .to(
            kids[1],
            { x: "-120vw", ease: "power1.inOut", duration: 1.1 },
            C + 0.85,
          )
          .to(
            kids[2],
            { x: "120vw", ease: "power1.inOut", duration: 1.1 },
            C + 1.55,
          );
      }

      tl.to(
        cardRef.current,
        { yPercent: 14, scale: 1, ease: "power2.out", duration: 0.6 },
        C + 2.65,
      )
        .to(
          gradilInfoRef.current,
          { autoAlpha: 1, y: 41, ease: "power2.out", duration: 0.8 },
          C + 3.4,
        )
        .to(
          bgRef.current,
          { "--g": 0, ease: "power1.inOut", duration: 0.8 },
          C + 3.4,
        )
        .to(
          gradilInfoRef.current,
          { autoAlpha: 0, y: -40, ease: "power2.in", duration: 0.7 },
          C + 4.8,
        )
        .to(
          cardRef.current,
          {
            yPercent: -8,
            width: coverW,
            height: coverH,
            borderRadius: 0,
            ease: "power2.inOut",
            duration: 1.4,
          },
          C + 5.4,
        )
        .to(
          gateLRef.current,
          { xPercent: 0, ease: "power2.inOut", duration: 1.3 },
          C + 5.5,
        )
        .to(
          gateRRef.current,
          { xPercent: 0, ease: "power2.inOut", duration: 1.3 },
          C + 5.5,
        )
        .to(
          birdRef.current,
          { xPercent: 10, yPercent: -6, ease: "none", duration: 1.4 },
          C + 5.5,
        );

      tl.to(
        industryRef.current,
        { yPercent: -34, ease: "none", duration: 5.4 },
        C,
      ).to(
        industryRef.current,
        { yPercent: 0, scale: 1, ease: "power2.inOut", duration: 1.4 },
        C + 5.4,
      );
    };

    mm.add("(min-width: 1441px)", () => build(MOTION_STRONG));
    mm.add("(max-width: 1440px)", () => build(MOTION_REDUCED));

    return () => {
      mm.revert();
      cancelAnimationFrame(earlyRefreshRaf);
      earlyRefreshTimeouts.forEach(clearTimeout);
      clearTimeout(refreshTimeout);
      resizeObserver.disconnect();
      smoother && smoother.kill();
    };
  }, []);

  return (
    <div className="min-h-screen overflow-clip">
      <Header />

      <div id="smooth-wrapper">
        <div id="smooth-content" ref={contentRef}>
          <main>
            <section
              ref={sectionRef}
              className="relative h-screen w-full overflow-hidden bg-[#aee0ff]"
            >
              {LAYERS.map((layer, i) => (
                <img
                  key={layer.src}
                  ref={(el) => {
                    layerRefs.current[i] = el;
                  }}
                  src={layer.src}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover will-change-transform"
                  style={{ zIndex: layer.z }}
                />
              ))}

              <div
                ref={heroRef}
                className="pointer-events-none absolute inset-x-0 top-[28%] z-[15] px-6 text-center will-change-transform"
              >
                <h1 className="poppins mx-auto max-w-2xl text-3xl font-bold text-[#ff5500] sm:text-4xl lg:text-[48px]">
                  {g.hero.title1} <br /> {g.hero.title2}
                </h1>
                <p className="poppins mx-auto mt-6 max-w-xl text-sm text-[#002d4d] sm:text-base">
                  <span className="font-bold">{g.hero.subtitleLead}</span>
                  {g.hero.subtitleRest}
                </p>

                <div className="mt-6 flex flex-col items-center gap-2 text-[#002d4d]">
                  <span className="poppins text-xs font-light tracking-widest">
                    {g.hero.scroll}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 animate-bounce"
                    aria-hidden="true"
                  >
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </div>
              </div>

              <div
                ref={waveRef}
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 z-50 h-[140%] text-white will-change-transform dark:text-background"
              >
                <svg
                  viewBox="0 0 1440 900"
                  preserveAspectRatio="none"
                  className="h-full w-full"
                >
                  <path
                    d="M0,120 Q720,0 1440,120 L1440,900 L0,900 Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div ref={cardStageRef} className="absolute inset-0 z-[60]">
                <div
                  ref={introRef}
                  className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
                >
                  <p className="poppins absolute left-0 top-[30%] w-full whitespace-nowrap text-center text-6xl font-extrabold uppercase leading-none text-zinc-300 dark:text-zinc-400 sm:text-[10rem]">
                    {g.showcase.words[0]}
                  </p>
                  <p className="poppins absolute left-0 top-1/2 w-full whitespace-nowrap text-center text-6xl font-extrabold uppercase leading-none text-zinc-300 dark:text-zinc-400 sm:text-[10rem]">
                    {g.showcase.words[1]}
                  </p>
                  <p className="poppins absolute left-0 top-[78%] w-full whitespace-nowrap text-center text-6xl font-extrabold uppercase leading-none text-zinc-300 dark:text-zinc-400 sm:text-[10rem]">
                    {g.showcase.words[2]}
                  </p>
                </div>

                <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-8">
                  <div style={{ perspective: "1400px" }}>
                    <div
                      ref={cardRef}
                      className="relative aspect-video w-[min(82vw,520px)] overflow-hidden rounded-2xl shadow-2xl will-change-transform"
                    >
                      <div
                        ref={bgRef}
                        className="absolute inset-0"
                        style={{ filter: "grayscale(var(--g, 1))" }}
                      >
                        <img
                          src="https://d2c3kthzw0ta10.cloudfront.net/parallax/ceu-industria.webp"
                          alt=""
                          aria-hidden="true"
                          draggable={false}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <img
                          ref={industryRef}
                          src="https://d2c3kthzw0ta10.cloudfront.net/parallax/industria.webp"
                          alt="Indústria protegida por gradil Insul"
                          draggable={false}
                          className="absolute inset-0 h-full w-full object-cover will-change-transform"
                        />
                        <img
                          ref={birdRef}
                          src="https://d2c3kthzw0ta10.cloudfront.net/parallax/passaro.webp"
                          alt=""
                          aria-hidden="true"
                          draggable={false}
                          className="absolute inset-0 h-full w-full object-cover will-change-transform"
                        />

                        <img
                          ref={gateLRef}
                          src="https://d2c3kthzw0ta10.cloudfront.net/parallax/gradil-esquerda-g12.webp"
                          alt=""
                          aria-hidden="true"
                          draggable={false}
                          className="absolute inset-x-0 bottom-0 h-[50%] w-full object-cover object-bottom will-change-transform"
                        />
                        <img
                          ref={gateRRef}
                          src="https://d2c3kthzw0ta10.cloudfront.net/parallax/gradil-direita-g12.webp"
                          alt=""
                          aria-hidden="true"
                          draggable={false}
                          className="absolute inset-x-0 bottom-0 h-[50%] w-full object-cover object-bottom will-change-transform"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  ref={gradilInfoRef}
                  className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6 will-change-transform"
                >
                  <div className="grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[1fr_min(82vw,520px)_1fr]">
                    <div className="hidden h-[293px] flex-col justify-between text-left text-[#002d4d] dark:text-white lg:flex">
                      <h2 className="poppins text-left text-[#ff5500] dark:text-[#ff5500] text-5xl font-bold leading-none xl:text-6xl">
                        {g.showcase.title}
                      </h2>
                      <p className="poppins max-w-[15rem] text-sm font-medium leading-relaxed">
                        {g.showcase.left}
                      </p>
                    </div>
                    <div className="hidden lg:block" aria-hidden="true" />
                    <div className="hidden h-[293px] flex-col justify-end gap-4 text-left text-[#002d4d] dark:text-white lg:flex">
                      <p className="poppins max-w-[16rem] text-sm leading-relaxed">
                        {g.showcase.modelsLead}
                        <span className="font-semibold text-[#ff5500]">
                          {g.showcase.models}
                        </span>
                        {g.showcase.modelsRest}
                      </p>
                      <p className="poppins max-w-[16rem] text-sm leading-relaxed">
                        {g.showcase.securityLead}
                        <span className="font-semibold text-[#ff5500]">
                          {g.showcase.design}
                        </span>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <GradilCards />

            <section className="bg-white px-6 py-32 dark:bg-zinc-950">
              <TextRevealColor
                text={g.reveal}
                className="mx-auto max-w-6xl text-center text-3xl leading-snug sm:text-4xl lg:text-4xl lg:leading-tight"
              />

              <div className="-mx-6 mt-24 sm:mt-32">
                <ImgCarousel images={gradilGallery} />
              </div>
            </section>

            <GradilProcess />

            <div className="mt-24 sm:mt-32">
              <GradilColors />
              <ProductsCardGradil />
            </div>

            <div className="mt-24 sm:mt-32">
              <CoatingGradil />
              <div className="pb-24">
                <GuaranteeGradil />
              </div>
            </div>

            <div className="sm:mt-32">
              <Pipes />
            </div>

            <OtherProducts />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Gradil;
