"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import catracasImage from "../../public/images/accessories/ferramentas/catracas.png";
import balancimImage from "../../public/images/accessories/ferramentas/balancim.png";
import alicateImage from "../../public/images/accessories/ferramentas/alicate.png";
import catracaDetailImage from "../../public/images/accessories/ferramentas/img-catraca.png";
import chaveDetailImage from "../../public/images/accessories/ferramentas/img-chave.png";
import alicateDetailImage from "../../public/images/accessories/ferramentas/img-alicate.png";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import {
  CircleCheck,
  CircleUserRound,
  ArrowUpRight,
  Eye,
  ChevronRight,
  ChevronLeft,
  Link2,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PipeFeatures from "../components/PipeFeatures";
import FillButton from "../components/FillButton";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const accessoryDetails = [
  { name: "Tubo para chumbar", description: "Instalado diretamente no solo, oferecendo firmeza e praticidade na montagem do Gradil.", image: "/images/poste/tampa.png", icon: ShieldCheck },
  { name: "Fixador", description: "Prende o painel ao poste com encaixe firme e alinhado.", image: "/images/tubos-card-acessorio/tubo-tampa.png", icon: Link2 },
  { name: "Parafuso", description: "Mantém o fixador preso e a estrutura estável.", image: "/images/tubos-card-acessorio/croque-base.png", icon: Wrench },
  { name: "Tampinha do fixador", description: "Cobre o parafuso e completa o acabamento do conjunto.", image: "/images/poste/tampinha-fixador.png", icon: CircleCheck },
];
const accessoryCards = accessoryDetails.slice(0, 3);

const accessoryTools = [
  {
    name: "Catracas",
    description: "Tensão firme e ajuste preciso para manter o arame no lugar.",
    image: catracasImage,
    detailImage: catracaDetailImage,
    detailName: "Ajuste sob controle",
    detailDescription: "Um detalhe essencial para a estabilidade da cerca.",
  },
  {
    name: "Chave balancim",
    description: "Mais controle e praticidade durante o tensionamento.",
    image: balancimImage,
    detailImage: chaveDetailImage,
    detailName: "Precisão na instalação",
    detailDescription: "A ferramenta certa para trabalhar com segurança e agilidade.",
  },
  {
    name: "Alicate para emendar arame",
    description: "Emendas firmes para dar continuidade à instalação.",
    image: alicateImage,
    detailImage: alicateDetailImage,
    detailName: "Acabamento confiável",
    detailDescription: "Uniões bem feitas em cada trecho da cerca.",
  },
];

function IntroLetter({ letter, index, total, progress }: { letter: string; index: number; total: number; progress: MotionValue<number> }) {
  const reducedMotion = useReducedMotion();
  const start = (index / total) * 0.85;
  const opacity = useTransform(progress, [start, Math.min(start + 0.12, 1)], [0.12, 1]);
  const filter = useTransform(progress, [start, Math.min(start + 0.12, 1)], ["blur(2px)", "blur(0px)"]);
  return <motion.span style={{ opacity: reducedMotion ? 1 : opacity, filter: reducedMotion ? "none" : filter }}>{letter}</motion.span>;
}

function AssemblyArtwork() {
  return (
    <div className="relative h-full aspect-[902/1500]">
      <div data-accessory-hero-image="tube" className="absolute left-0 top-[17%] h-[83%] w-[58%]">
        <Image
          src="/images/poste/tubo.png"
          alt="Tubo de aço galvanizado para montagem do gradil"
          fill
          priority
          sizes="(max-width: 1023px) 45vw, 35vw"
          className="object-contain"
        />
      </div>
      <div className="absolute inset-0">
        <div data-accessory-hero-image="lid" className="hero-part-lid absolute left-[1%] top-[1%] h-[16%] w-[58%]">
          <Image src="/images/poste/tampa.png" alt="Tampa superior do poste" fill sizes="25vw" className="object-contain" />
        </div>
        <div data-accessory-hero-image="fastener" className="hero-part-fastener absolute left-[46%] top-[40%] h-[18%] w-[30%]">
          <Image src="/images/poste/fixador.png" alt="Fixador do gradil no poste" fill sizes="20vw" className="object-contain" />
        </div>
        <div data-accessory-hero-image="screw" className="hero-part-screw absolute left-[71%] top-[49%] h-[9%] w-[17%]">
          <Image src="/images/poste/parafuso.png" alt="Parafuso de fixação" fill sizes="15vw" className="object-contain" />
        </div>
        <div data-accessory-hero-image="cap" className="hero-part-cap absolute left-[86%] top-[51%] h-[13%] w-[14%]">
          <Image src="/images/poste/tampinha-fixador.png" alt="Tampinha de acabamento do fixador" fill sizes="10vw" className="object-contain" />
        </div>
      </div>
    </div>
  );
}

const Accessories = () => {
  const [mountingModel, setMountingModel] = useState<"chumbar" | "parafusar">("chumbar");
  const contentRef = useRef<HTMLDivElement>(null);
  const assemblySectionRef = useRef<HTMLElement>(null);
  const assemblyStageRef = useRef<HTMLDivElement>(null);
  const heroCopyRef = useRef<HTMLDivElement>(null);
  const artStageRef = useRef<HTMLDivElement>(null);
  const detailPanelRef = useRef<HTMLDivElement>(null);
  const accessoryCardsSectionRef = useRef<HTMLElement>(null);
  const accessoryCardsStageRef = useRef<HTMLDivElement>(null);
  const cardsIntroTextRef = useRef<HTMLHeadingElement>(null);
  const firstCardArtworkRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: introTextProgress } = useScroll({ target: cardsIntroTextRef, offset: ["start 85%", "end 45%"] });
  const cardsIntroSentence = "Do encaixe ao acabamento, cada peça garante uma instalação precisa, firme e durável do gradil.";

  useLayoutEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.8,
      effects: true,
      normalizeScroll: true,
    });

    const refreshScroll = () => {
      smoother.refresh();
      ScrollTrigger.refresh();
    };
    const handleLoad = refreshScroll;
    window.addEventListener("load", handleLoad);
    let refreshTimeout: ReturnType<typeof setTimeout>;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(refreshTimeout);
      refreshTimeout = setTimeout(refreshScroll, 200);
    });
    if (contentRef.current) resizeObserver.observe(contentRef.current);
    const initialRefresh = setTimeout(refreshScroll, 300);

    const section = assemblySectionRef.current;
    const assemblyStage = assemblyStageRef.current;
    const heroCopy = heroCopyRef.current;
    const artStage = artStageRef.current;
    const detailPanel = detailPanelRef.current;
    if (!section || !assemblyStage || !heroCopy || !artStage || !detailPanel) {
      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(refreshTimeout);
        clearTimeout(initialRefresh);
        resizeObserver.disconnect();
        smoother.kill();
      };
    }

    const context = gsap.context(() => {
      const heroText = section.querySelectorAll<HTMLElement>("[data-accessory-hero-copy]");
      const heroImages = ["tube", "lid", "fastener", "screw", "cap"]
        .map((part) => section.querySelector<HTMLElement>(`[data-accessory-hero-image="${part}"] img`))
        .filter((element): element is HTMLElement => element !== null);

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const entranceTimeline = gsap.timeline({ defaults: { ease: "power2.out" } });
      entranceTimeline
        .from(heroText, { y: reducedMotion ? 0 : 34, autoAlpha: 0, duration: reducedMotion ? 0.01 : 1, stagger: reducedMotion ? 0 : 0.17 }, 0)
        .fromTo(
          heroImages,
          { autoAlpha: 0, y: reducedMotion ? 0 : 42, scale: reducedMotion ? 1 : 0.94 },
          { autoAlpha: 1, y: 0, scale: 1, duration: reducedMotion ? 0.01 : 1.05, stagger: reducedMotion ? 0 : 0.22, ease: "power3.out" },
          0.2,
        );

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: assemblyStage,
          pinSpacing: false,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .fromTo(
          artStage,
          { x: 24, y: 0, scale: 1 },
          { x: () => (window.innerWidth < 640 ? 100 : 24), y: "9.8svh", scale: 0.82, ease: "none", duration: 1 },
          0,
        )
        .to(heroCopy, { y: -150, autoAlpha: 0, ease: "none", duration: 0.42 }, 0.08)
        .fromTo(
          detailPanel,
          {
            y: 0,
            rotationX: 12,
            scale: 0.94,
            transformPerspective: 1200,
            transformOrigin: "center center",
            autoAlpha: 1,
          },
          {
            y: "-92svh",
            rotationX: 0,
            scale: 1,
            autoAlpha: 1,
            ease: "none",
            duration: 0.62,
          },
          0.55,
        );

      const panelContent = detailPanel.querySelectorAll<HTMLElement>("[data-accessory-panel-reveal]");
      if (panelContent.length) {
        timeline.fromTo(
          panelContent,
          { y: reducedMotion ? 0 : 28, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, stagger: 0.06, duration: reducedMotion ? 0.01 : 0.28, ease: "power2.out" },
          0.76,
        );
      }

      ["lid", "fastener", "screw", "cap"].forEach((part, index) => {
        const offsets = [
          { x: -92, y: 0, rotation: -16, scale: 1.16 },
          { x: 72, y: 64, rotation: 18, scale: 1.14 },
          { x: -78, y: 118, rotation: -20, scale: 1.2 },
          { x: 108, y: -18, rotation: 16, scale: 1.18 },
        ][index];
        const element = section.querySelector<HTMLElement>(`.hero-part-${part}`);
        if (element) {
          timeline.fromTo(
            element,
            offsets,
            { x: 0, y: 0, rotation: 0, scale: 1, ease: "none", duration: 0.72 },
            0.08 + index * 0.04,
          );
        }
      });

      const featuresSection = document.querySelector<HTMLElement>("[data-accessory-features]");
      const featureItems = featuresSection?.querySelectorAll<HTMLElement>("[data-accessory-feature]");
      const featureLines = featuresSection?.querySelectorAll<HTMLElement>("[data-accessory-feature-line]");
      if (featuresSection && featureItems?.length) {
        const featuresTimeline = gsap.timeline({
          scrollTrigger: { trigger: featuresSection, start: "top 50%", toggleActions: "play reverse play reverse" },
        });
        featuresTimeline.fromTo(
          featureItems,
          { y: reducedMotion ? 0 : 44, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            stagger: reducedMotion ? 0 : 0.1,
            duration: reducedMotion ? 0.01 : 0.9,
            ease: "power3.out",
          },
          0,
        );
        if (featureLines?.length) {
          featuresTimeline.fromTo(
            featureLines,
            { clipPath: "inset(0 0 100% 0)", autoAlpha: 0 },
            { clipPath: "inset(0 0 0% 0)", autoAlpha: 1, stagger: 0.12, duration: reducedMotion ? 0.01 : 0.8, ease: "power2.out" },
            reducedMotion ? 0 : 0.18,
          );
        }
      }

      const cardsSection = accessoryCardsSectionRef.current;
      const cardsStage = accessoryCardsStageRef.current;
      const cards = cardsStage?.querySelectorAll<HTMLElement>("[data-accessory-panel]");
      if (cardsSection && cardsStage && cards && cards.length > 1) {
        const cardsIntro = cardsStage.querySelector<HTMLElement>("[data-accessory-cards-intro]");
        if (cardsIntro) gsap.set(cardsIntro, { yPercent: 100 });
        gsap.set(cards, { yPercent: 130 });

        const cardTop = () => {
          const header = document.querySelector<HTMLElement>("header");
          const compactHeaderHeight = Math.min(
            header?.getBoundingClientRect().height ?? 100,
            window.innerWidth < 640 ? 80 : 100,
          );
          return compactHeaderHeight + 24;
        };

        const cardsTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: cardsStage,
            pin: cardsStage,
            start: () => `top ${cardTop()}px`,
            end: () => `+=${window.innerHeight * cards.length}`,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        const artworks = Array.from(cards).map((card) =>
          card.querySelector<HTMLElement>("[data-accessory-artwork]"),
        );
        gsap.set(artworks.filter((artwork): artwork is HTMLElement => artwork !== null), {
          x: 50,
          autoAlpha: 0,
        });

        Array.from(cards).forEach((card, index) => {
          const segmentStart = index;
          cardsTimeline.to(card, { yPercent: 0, duration: 1, ease: "none" }, segmentStart);
          const rectangles = card.querySelectorAll<HTMLElement>("[data-accessory-card-rectangle]");
          cardsTimeline.fromTo(
            rectangles,
            { clipPath: "inset(0 0 16% 0 round 1.5rem)", autoAlpha: 0 },
            { clipPath: "inset(0 0 0% 0 round 1.5rem)", autoAlpha: 1, duration: reducedMotion ? 0.01 : 0.4, ease: "power2.out" },
            segmentStart + 0.46,
          );
          const cardCopy = card.querySelectorAll<HTMLElement>("[data-accessory-card-copy]");
          cardsTimeline.fromTo(
            cardCopy,
            { y: reducedMotion ? 0 : 30, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, stagger: 0.07, duration: reducedMotion ? 0.01 : 0.38, ease: "power2.out" },
            segmentStart + 0.5,
          );
          const artwork = card.querySelector<HTMLElement>("[data-accessory-artwork]");
          if (artwork) {
            cardsTimeline.to(artwork, {
              x: 0,
              autoAlpha: 1,
              duration: 0.72,
              ease: "power2.out",
            }, segmentStart + 0.5);
          }
          const tampaLayers = card.querySelectorAll<HTMLElement>("[data-accessory-tampa-layer]");
          if (tampaLayers.length) {
            cardsTimeline.fromTo(
              tampaLayers,
              { y: reducedMotion ? 0 : 24, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, stagger: reducedMotion ? 0 : 0.1, duration: reducedMotion ? 0.01 : 0.42, ease: "power2.out" },
              segmentStart + 0.5,
            );
          }
        });

        if (cardsIntro) {
          gsap.to(cardsIntro, {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: cardsStage,
              start: "top bottom",
              end: () => `top ${cardTop()}px`,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        }
      }

      const footer = document.querySelector<HTMLElement>("[data-accessory-footer] footer");
      gsap.utils.toArray<HTMLElement>("[data-accessory-tool-card]").forEach((card) => {
        gsap.fromTo(card,
          { y: reducedMotion ? 0 : 48, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: reducedMotion ? 0.01 : 0.9, ease: "power2.out", scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play reverse play reverse" } },
        );
      });
      const installationShowcase = document.querySelector<HTMLElement>("[data-accessory-install-showcase]");
      if (installationShowcase) {
        gsap.fromTo(installationShowcase.querySelectorAll<HTMLElement>("[data-accessory-install-heading]"),
          { y: reducedMotion ? 0 : 30, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, stagger: 0.12, duration: reducedMotion ? 0.01 : 0.8, ease: "power2.out", scrollTrigger: { trigger: installationShowcase, start: "top 76%", toggleActions: "play reverse play reverse" } },
        );
        const stage = installationShowcase.querySelector<HTMLElement>("[data-accessory-install-stage]");
        const frame = stage?.querySelector<HTMLElement>("[data-accessory-install-frame]");
        const copy = stage?.querySelector<HTMLElement>("[data-accessory-install-copy]");
        const screens = stage?.querySelectorAll<HTMLElement>("[data-accessory-install-screen]");
        const steps = stage?.querySelectorAll<HTMLElement>("[data-accessory-install-step]");
        const progressBars = stage?.querySelectorAll<HTMLElement>("[data-accessory-install-progress]");
        if (stage && frame && copy && screens?.length === 2 && steps?.length === 2 && progressBars?.length === 2) {
          const wide = window.matchMedia("(min-width: 1024px)").matches;
          gsap.set(copy, { autoAlpha: 0, x: wide ? -36 : 0, y: wide ? 0 : 24 });
          gsap.set(frame, { transformOrigin: "center center" });
          gsap.set(screens[1], { autoAlpha: 0 });
          gsap.set(steps[1], { opacity: 0.48 });
          gsap.set(progressBars, { scaleY: 0, transformOrigin: "center top" });
          const cycleTimeline = gsap.timeline({ paused: true, repeat: -1 });
          cycleTimeline
            .to(progressBars[0], { scaleY: 1, duration: 3, ease: "none" }, 0.55)
            .to(screens[0], { autoAlpha: 0, duration: 0.35 }, "+=0.1")
            .to(screens[1], { autoAlpha: 1, duration: 0.35 }, "<")
            .to(steps[0], { opacity: 0.48, duration: 0.35 }, "<")
            .to(steps[1], { opacity: 1, duration: 0.35 }, "<")
            .to(progressBars[1], { scaleY: 1, duration: 3, ease: "none" }, "+=0.1")
            .to(screens[1], { autoAlpha: 0, duration: 0.35 }, "+=0.1")
            .to(screens[0], { autoAlpha: 1, duration: 0.35 }, "<")
            .to(steps[1], { opacity: 0.48, duration: 0.35 }, "<")
            .to(steps[0], { opacity: 1, duration: 0.35 }, "<")
            .set(progressBars, { scaleY: 0 });

          let cycleStarted = false;
          const resetCycle = () => {
            if (cycleStarted) {
              cycleStarted = false;
              cycleTimeline.pause(0);
              gsap.set(progressBars, { scaleY: 0 });
              gsap.set(screens[0], { autoAlpha: 1 });
              gsap.set(screens[1], { autoAlpha: 0 });
              gsap.set(steps[0], { opacity: 1 });
              gsap.set(steps[1], { opacity: 0.48 });
            }
          };
          const showcaseTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: stage,
              pin: stage,
              start: "top 100px",
              end: () => `+=${window.innerHeight * 1.1}`,
              scrub: 1,
              invalidateOnRefresh: true,
              anticipatePin: 1,
              onUpdate: (self) => {
                if (self.progress >= 0.82 && !cycleStarted) {
                  cycleStarted = true;
                  cycleTimeline.play();
                } else if (self.progress < 0.74) {
                  resetCycle();
                }
              },
              onLeaveBack: resetCycle,
            },
          });
          showcaseTimeline.fromTo(frame,
            {
              x: () => window.innerWidth >= 1024 ? stage.clientWidth / 2 - (frame.offsetLeft + frame.offsetWidth / 2) : 0,
              scale: () => window.innerWidth >= 1024 ? 1.18 : 1,
            },
            { x: 0, scale: 1, duration: 1, ease: "none", immediateRender: true },
            0,
          );
          showcaseTimeline.to(copy, { autoAlpha: 1, x: 0, y: 0, duration: 0.2, ease: "power2.out" }, 0.76);
        }
      }
      if (footer) {
        gsap.fromTo(
          footer.firstElementChild,
          { y: reducedMotion ? 0 : 38, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: reducedMotion ? 0.01 : 0.95, ease: "power2.out", scrollTrigger: { trigger: footer, start: "top 88%", toggleActions: "play reverse play reverse" } },
        );
      }

    }, section);

    return () => {
      context.revert();
      window.removeEventListener("load", handleLoad);
      clearTimeout(refreshTimeout);
      clearTimeout(initialRefresh);
      resizeObserver.disconnect();
      smoother.kill();
    };
  }, []);

  return (
    <div className="min-h-screen overflow-clip bg-white text-[#082d49] dark:bg-zinc-950 dark:text-white">
      <Header />

      <div id="smooth-wrapper">
        <div id="smooth-content" ref={contentRef} className="relative">
          <main className="pt-24 sm:pt-28">
            <section
              ref={assemblySectionRef}
              aria-labelledby="accessories-title"
              className="relative h-[260svh] bg-white dark:bg-zinc-950"
            >
              <div ref={assemblyStageRef} className="h-svh overflow-hidden">
                <div className="relative mx-auto grid h-full w-full max-w-[1600px] grid-cols-1 items-center gap-2 px-5 py-5 sm:px-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12 lg:px-16 lg:py-0">
                  <div ref={heroCopyRef} className="relative -top-4 z-[100] mx-auto w-full max-w-xl sm:-top-6 lg:mx-0">
                    <p data-accessory-hero-copy className="poppins mb-4 text-[16px] font-medium tracking-[0.24em] text-[#c54809]">
                      Acessórios para gradil
                    </p>
                    <h1
                      id="accessories-title"
                      data-accessory-hero-copy
                      className="poppins text-8xl font-light leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
                    >
                      Cada detalhe,
                      <br />
                      <span className="poppins font-bold text-[#ff5500]">faz diferença.</span>
                    </h1>
                    <p data-accessory-hero-copy className="poppins font-light mt-5 max-w-lg text-base leading-7 text-[#082d49]/75 dark:text-white sm:text-lg sm:leading-8">
                      Peças que encaixam com precisão e garantem uma instalação completa e durável.
                    </p>
                    <div data-accessory-hero-copy>
                      <FillButton
                        href="https://www.casadascercas.com.br/acessorios"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-6 cursor-pointer whitespace-nowrap rounded-full border border-[#FF6A1A] bg-[#ff5500] px-6 py-3.5 text-base text-white transition-all duration-300 ease-out"
                        overlayClassName="bg-white dark:bg-background text-[#ff5500]"
                      >
                        <ArrowUpRight size={19} strokeWidth={2} />
                        <span>Saiba mais</span>
                      </FillButton>
                    </div>
                  </div>

                  <div
                    ref={artStageRef}
                    className="relative z-[90] mx-auto flex h-[64svh] w-full items-center justify-center will-change-transform sm:h-[82svh] lg:h-[94svh]"
                  >
                    <AssemblyArtwork />
                  </div>

                  <div
                    ref={detailPanelRef}
                    className="absolute inset-x-3 top-[108svh] z-[80] mx-auto h-[84svh] w-auto max-w-[1400px] rounded-[2rem] bg-[#f0f1f3] p-1 sm:inset-x-8 sm:rounded-[2.4rem] sm:p-1.5 lg:inset-x-12 dark:bg-[#3b3f43]"
                  >
                    <div className="h-full rounded-[1.75rem] bg-[#e5e7eb] p-2 sm:rounded-[2.15rem] sm:p-2.5 dark:bg-[#2b2e32]">
                      <div className="flex h-full rounded-[1.55rem] bg-[#e5e7eb] sm:rounded-[1.9rem] dark:bg-[#2b2e32]">
                        <aside data-accessory-panel-reveal aria-label="Navegação dos acessórios" className="flex w-[52px] shrink-0 flex-col items-center rounded-l-[1.55rem] bg-[#e5e7eb] pb-3 pt-11 sm:w-[84px] sm:pb-5 sm:pt-12 lg:w-[104px] lg:pt-16 dark:bg-[#2b2e32]">
                          <Image src="/images/loaderLogoAzulInsul.png" alt="Insul" width={64} height={64} className="size-9 object-contain dark:hidden sm:size-11" />
                          <Image src="/images/loaderLogoBrancoInsul.png" alt="Insul" width={64} height={64} className="hidden size-9 object-contain dark:block sm:size-11" />

                          <span title="Perfil" aria-label="Perfil" className="mt-auto grid size-10 place-items-center rounded-full bg-[#ff5500]/10 text-[#ff5500] sm:size-12">
                            <CircleUserRound size={24} strokeWidth={1.7} className="sm:hidden" />
                            <CircleUserRound size={28} strokeWidth={1.7} className="hidden sm:block" />
                          </span>
                        </aside>

                        <div className="min-w-0 flex-1 rounded-[1.55rem] bg-white p-3 sm:rounded-[1.9rem] sm:p-5 lg:p-9 dark:bg-[#191b1d]">
                          <div data-accessory-panel-reveal className="mb-3 sm:mb-5">
                            <div className="py-8">
                              <p className="poppins mb-2 text-[16px] font-medium tracking-[0.2em] text-[#ff5500] sm:text-[16px]">
                                Sistema de fixação
                              </p>
                              <h2 className="poppins text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                                Cada peça no seu lugar.
                              </h2>
                            </div>
                          </div>

                          <div className="grid h-[calc(100%-5rem)] items-center gap-1 sm:h-[calc(100%-6rem)] lg:grid-cols-[1fr_0.82fr] lg:gap-8">
                            <div className="grid grid-cols-1 gap-1 lg:gap-2">
                              {accessoryDetails.map((item) => {
                                return (
                                  <article
                                    key={item.name}
                                    data-accessory-panel-reveal
                                    className="relative min-h-[54px] border-b border-[#082d49]/10 px-1 py-2 sm:min-h-[66px] sm:px-3 sm:py-2.5 dark:border-white/10"
                                  >
                                    <div className="group/item">
                                      <span className="absolute -left-[56px] top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-transparent text-[#082d49]/45 transition-[color,background-color,transform] duration-200 group-hover/item:scale-110 group-hover/item:bg-[#ff5500]/12 group-hover/item:text-[#ff5500] group-focus-within/item:scale-110 group-focus-within/item:bg-[#ff5500]/12 group-focus-within/item:text-[#ff5500] sm:-left-[82px] sm:size-10 lg:-left-[108px] dark:text-white/45">
                                        <item.icon size={20} strokeWidth={1.8} />
                                      </span>
                                      <h3 className="text-xs font-semibold transition-colors duration-200 group-hover/item:text-[#ff5500] group-focus-within/item:text-[#ff5500] sm:text-sm">
                                        {item.name}
                                      </h3>
                                      <p className="mt-1 max-w-[38ch] text-[10px] leading-4 text-[#082d49]/65 transition-colors duration-200 group-hover/item:text-[#ff5500] group-focus-within/item:text-[#ff5500] sm:text-xs sm:leading-5 dark:text-white/60">
                                        {item.description}
                                      </p>
                                    </div>
                                  </article>
                                );
                              })}
                            </div>
                            <div aria-hidden="true" className="hidden h-full lg:block" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <PipeFeatures />
            <section
              ref={accessoryCardsSectionRef}
              aria-labelledby="accessory-cards-title"
              className="relative z-20 min-h-[230svh] bg-white px-5 pb-24 pt-10 dark:bg-zinc-950 sm:px-8 sm:pb-32 sm:pt-16 lg:px-12"
            >
              <div
                ref={accessoryCardsStageRef}
                className="relative z-20 mx-auto h-[82svh] w-full max-w-[1200px] sm:h-[76svh]"
              >
                <div data-accessory-cards-intro className="absolute inset-0 z-0 flex flex-col items-center justify-center rounded-[2rem] bg-white px-6 text-center dark:bg-zinc-950">
                  <span className="poppins inline-block rounded-full bg-white px-3 py-1.5 text-sm text-[#ff5500] shadow-[0_8px_24px_#00000020] dark:bg-[#22272b]">Detalhes da instalação</span>
                  <h2 id="accessory-cards-title" ref={cardsIntroTextRef} aria-label={cardsIntroSentence} className="poppins mt-8 max-w-3xl text-[clamp(26px,3.5vw,40px)] font-light leading-[1.12] tracking-[-.025em] text-[#082d49] dark:text-white">
                    <span aria-hidden="true">{cardsIntroSentence.split(" ").map((word, wordIndex, words) => {
                      const firstLetter = words.slice(0, wordIndex).join(" ").length + (wordIndex ? 1 : 0);
                      return <span key={wordIndex} className="inline-block">{Array.from(word).map((letter, index) => <IntroLetter key={index} letter={letter} index={firstLetter + index} total={cardsIntroSentence.length} progress={introTextProgress} />)}<span>{"\u00a0"}</span></span>;
                    })}</span>
                  </h2>
                </div>
                {accessoryCards.map((item, index) => {
                  const parafusarText = index === 0 && mountingModel === "parafusar";
                  return <article
                    key={item.name}
                    data-accessory-panel
                    style={{ zIndex: index + 1 }}
                    className={`absolute inset-0 grid h-full w-full grid-cols-1 items-center gap-4 overflow-hidden rounded-[2rem] bg-[#082d49] p-5 sm:gap-8 sm:p-8 lg:gap-0 lg:p-2 ${index % 2 === 1 ? "lg:grid-cols-[1.08fr_0.92fr]" : "lg:grid-cols-[0.92fr_1.08fr]"}`}
                  >
                    <div
                      data-accessory-card-rectangle
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]"
                      style={{ background: `linear-gradient(to top ${index % 2 === 0 ? "left" : "right"}, #082d49 0%, #16648f 52%, #4da0c9 100%)` }}
                    >
                      <Image
                        src="/images/tubos-card-acessorio/gradil-bg.png"
                        alt=""
                        fill
                        sizes="(max-width: 1200px) 100vw, 1200px"
                        className={`object-cover opacity-25 ${index % 2 === 0 ? "-scale-x-100" : ""}`}
                      />
                    </div>
                    <div className={`relative z-10 flex h-full flex-col rounded-[1.5rem] p-5 sm:p-8 lg:p-12 ${index % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}>
                      <div data-accessory-card-rectangle aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[1.5rem] bg-white dark:bg-[#24272a]" />
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={index === 0 ? mountingModel : item.name}
                          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="relative flex h-full flex-col"
                        >
                          <span data-accessory-card-copy className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-medium tracking-wide text-[#082d49]/70 dark:bg-white/10 dark:text-white/70">
                            <item.icon size={15} strokeWidth={1.8} />
                            {parafusarText ? "Fixação parafusada" : `Acessório ${String(index + 1).padStart(2, "0")}`}
                          </span>
                          <h2 data-accessory-card-copy className="poppins max-w-lg text-3xl font-bold leading-tight tracking-tight text-[#ff5500] sm:text-4xl lg:text-5xl dark:text-[#ff5500]">
                            {parafusarText ? "Tubo para parafusar" : item.name}
                          </h2>
                          <p data-accessory-card-copy className="poppins mt-5 max-w-md text-base leading-7 text-[#082d49]/65 sm:text-lg sm:leading-8 dark:text-white/60">
                            {parafusarText ? "Com base de fixação, ideal para instalações sobre pisos e superfícies de concreto." : item.description}
                          </p>
                          <p data-accessory-card-copy className="poppins mt-auto hidden pt-10 text-sm text-[#082d49]/50 lg:block dark:text-white/40">
                            {parafusarText ? "Instalação sobre piso com base parafusada" : "Componentes do sistema de fixação do gradil"}
                          </p>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    <div
                      className={`relative mx-auto flex h-[42svh] min-h-64 w-full max-w-[620px] flex-col items-center justify-center sm:h-[54svh] ${index % 2 === 1 ? "lg:order-1" : "lg:order-2"} lg:h-full`}
                    >
                      <div className="relative flex aspect-[4/3] w-[94%] items-center justify-center overflow-hidden rounded-[1.5rem] p-0">
                        <div data-accessory-card-rectangle aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[1.5rem] bg-white dark:bg-[#24272a]" />
                        <div ref={index === 0 ? firstCardArtworkRef : undefined} data-accessory-artwork className="relative aspect-[4/3] w-full">
                          {index === 0 ? (
                            <>
                              <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                  key={mountingModel}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="absolute inset-0"
                                >
                                  <motion.div
                                    className="absolute inset-0"
                                    style={{ clipPath: "inset(0 0 0 60%)" }}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                                  >
                                    <Image
                                      src={`/images/tubos-card-acessorio/montagem-${mountingModel}.png`}
                                      alt={`Tubo para ${mountingModel} com detalhes da instalação`}
                                      fill
                                      unoptimized
                                      sizes="(max-width: 1023px) 94vw, 48vw"
                                      className="object-contain"
                                    />
                                  </motion.div>
                                  <motion.div
                                    aria-hidden="true"
                                    className="absolute inset-0"
                                    style={{ clipPath: "inset(0 40% 0 0)" }}
                                    initial={{ opacity: 0, y: 22 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                                  >
                                    <Image
                                      src={`/images/tubos-card-acessorio/montagem-${mountingModel}.png`}
                                      alt=""
                                      fill
                                      unoptimized
                                      sizes="(max-width: 1023px) 94vw, 48vw"
                                      className="object-contain"
                                    />
                                  </motion.div>
                                </motion.div>
                              </AnimatePresence>
                            </>
                          ) : index === 1 ? (
                            <>
                              <div data-accessory-tampa-layer className="absolute inset-0">
                                <Image
                                  src="/images/tubos-card-acessorio/tubo-tampa.png"
                                  alt="Tubo com tampa instalada"
                                  fill
                                  unoptimized
                                  sizes="(max-width: 1023px) 94vw, 48vw"
                                  className="object-contain"
                                />
                              </div>
                              <div data-accessory-tampa-layer className="absolute inset-0">
                                <div className="absolute inset-0" style={{ transform: "translateX(-13%) scale(0.86)" }}>
                                  <Image
                                    src="/images/tubos-card-acessorio/modelo-tampa.png"
                                    alt="Detalhe ampliado da tampa do tubo"
                                    fill
                                    unoptimized
                                    sizes="(max-width: 1023px) 94vw, 48vw"
                                    className="object-contain"
                                  />
                                </div>
                              </div>
                            </>
                          ) : (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="(max-width: 1023px) 90vw, 48vw"
                              className="object-contain p-3 sm:p-6"
                            />
                          )}
                        </div>
                      </div>
                      {index === 0 && (
                        <div className="z-20 mt-3 flex items-center justify-center gap-7 text-white">
                          <button
                            type="button"
                            aria-label="Mostrar tubo para chumbar"
                            title="Tubo para chumbar"
                            onClick={() => setMountingModel("chumbar")}
                            disabled={mountingModel === "chumbar"}
                            className="grid size-10 place-items-center transition-colors hover:text-[#ff5500] disabled:cursor-default disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5500] focus-visible:ring-offset-2 sm:size-11"
                          >
                            <ChevronLeft size={28} strokeWidth={1.8} />
                          </button>
                          <button
                            type="button"
                            aria-label="Mostrar tubo para parafusar"
                            title="Tubo para parafusar"
                            onClick={() => setMountingModel("parafusar")}
                            disabled={mountingModel === "parafusar"}
                            className="grid size-10 place-items-center transition-colors hover:text-[#ff5500] disabled:cursor-default disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5500] focus-visible:ring-offset-2 sm:size-11"
                          >
                            <ChevronRight size={28} strokeWidth={1.8} />
                          </button>
                        </div>
                      )}
                    </div>
                  </article>;
                })}
              </div>
            </section>
            <section aria-labelledby="accessory-tools-title" className="relative z-20 bg-[#e9ecef] px-5 py-20 text-[#082d49] sm:px-8 sm:py-28 lg:px-12">
              <div className="mx-auto max-w-[1200px]">
                <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
                  <span className="poppins inline-flex rounded-full bg-white px-4 py-1.5 text-xs font-medium text-[#082d49]/75">Ferramentas e acessórios</span>
                  <h2 id="accessory-tools-title" className="poppins mt-5 text-[clamp(32px,4vw,52px)] font-bold leading-tight tracking-tight text-[#0b4f83]">Cada detalhe faz a instalação acontecer.</h2>
                  <p className="poppins mx-auto mt-4 max-w-md text-sm leading-6 text-[#082d49]/70 sm:text-base">Catracas, chave balancim e alicate para emendar arame: soluções para cada etapa da montagem.</p>
                </div>
                <div className="grid gap-5 md:grid-cols-3 md:items-start">
                  {accessoryTools.map((tool, index) => (
                    <div key={tool.name} className="flex flex-col gap-5">
                      {index === 1 && (
                        <article data-accessory-tool-card className="flex min-h-[270px] flex-col items-center overflow-hidden rounded-[1.5rem] bg-[#f4f6f8] px-6 pt-7 text-center text-[#082d49]">
                          <span className="poppins rounded-full bg-white px-3 py-1 text-xs">Instalação</span>
                          <h3 className="poppins mt-6 text-2xl font-bold text-[#ff5500] tracking-tight">{tool.detailName}</h3>
                          <p className="poppins mt-2 max-w-[26ch] text-sm leading-5 text-[#082d49]/65">{tool.detailDescription}</p>
                          <div className="relative mt-auto aspect-[847/306] w-4/5 overflow-hidden rounded-t-2xl">
                            <Image src={tool.detailImage} alt={tool.detailName} fill sizes="(max-width: 767px) 80vw, (max-width: 1200px) 25vw, 271px" className="object-cover" />
                          </div>
                        </article>
                      )}
                      <article data-accessory-tool-card className="group relative flex min-h-[470px] flex-col items-center overflow-hidden rounded-[1.5rem] bg-gradient-to-b from-[#082d49] via-[#496e8b] to-[#f2f3f6] px-6 pt-7 text-center text-white">
                        <span className="poppins rounded-full bg-[#082d49]/30 px-3 py-1 text-xs">{String(index + 1).padStart(2, "0")} / Acessórios</span>
                        <h3 className="poppins mt-7 text-2xl font-bold tracking-tight sm:text-3xl">{tool.name}</h3>
                        <p className="poppins mt-2 max-w-[30ch] text-sm leading-5 text-white/85">{tool.description}</p>
                        <div className="relative mt-8 w-full flex-1 origin-bottom-center translate-y-[42%] rotate-[3deg] overflow-hidden rounded-t-[1.25rem] bg-[#e5e7e979] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:rotate-0 max-md:translate-y-0 max-md:rotate-0 motion-reduce:transition-none">
                          <Image
                            src={tool.image}
                            alt={tool.name}
                            fill
                            sizes="(max-width: 767px) 90vw, (max-width: 1200px) 30vw, 340px"
                            className="object-contain object-center p-4"
                          />
                        </div>
                        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 translate-y-3 bg-gradient-to-b from-transparent to-[#f2f3f6]/90 backdrop-blur-[8px]" style={{ maskImage: "linear-gradient(to bottom, transparent, black 75%)" }} />
                      </article>
                      {index !== 1 && (
                        <article data-accessory-tool-card className="flex min-h-[270px] flex-col items-center overflow-hidden rounded-[1.5rem] bg-[#f4f6f8] px-6 pt-7 text-center text-[#082d49]">
                          <span className="poppins rounded-full bg-white px-3 py-1 text-xs">Instalação</span>
                          <h3 className="poppins mt-6 text-2xl font-bold text-[#ff5500] tracking-tight">{tool.detailName}</h3>
                          <p className="poppins mt-2 max-w-[26ch] text-sm leading-5 text-[#082d49]/65">{tool.detailDescription}</p>
                          <div className="relative mt-auto aspect-[847/306] w-4/5 overflow-hidden rounded-t-2xl">
                            <Image src={tool.detailImage} alt={tool.detailName} fill sizes="(max-width: 767px) 80vw, (max-width: 1200px) 25vw, 271px" className="object-cover" />
                          </div>
                        </article>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <section data-accessory-install-showcase aria-labelledby="accessory-install-title" className="relative z-20 bg-[#e9ecef] px-5 pb-24 pt-12 text-[#082d49] sm:px-8 sm:pb-32 sm:pt-20 lg:px-12">
              <div className="mx-auto max-w-[1200px] text-center">
                <span data-accessory-install-heading className="poppins inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-medium text-[#082d49]/75">
                  <Eye size={15} strokeWidth={1.8} /> Feitos para a instalação
                </span>
                <h2 data-accessory-install-heading id="accessory-install-title" className="poppins mx-auto mt-5 max-w-3xl text-[clamp(32px,4vw,52px)] font-bold leading-tight text-[#0b4f83] tracking-tight">Do poste à montagem, <br /> tudo se encaixa.</h2>
                <p data-accessory-install-heading className="poppins mx-auto mt-4 max-w-lg text-sm leading-6 text-[#082d49]/70 sm:text-base">O poste T de aço e o batedor manual se complementam para uma instalação firme e prática.</p>
                <div data-accessory-install-stage className="relative mx-auto mt-16 grid h-[calc(100svh-110px)] min-h-[650px] max-w-[1200px] items-center text-left sm:mt-20 lg:mt-24 lg:h-[78svh] lg:min-h-[570px] lg:grid-cols-[31%_69%]">
                  <div data-accessory-install-copy className="relative z-10 flex flex-col gap-7 px-3 pb-5 sm:px-6 lg:gap-10 lg:pb-0 lg:pr-9">
                    <h3 className="poppins text-2xl font-semibold text-[#0b4f83] tracking-tight">Instalação em cada etapa.</h3>
                    <div data-accessory-install-step className="relative pl-5">
                      <div aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-[2px] bg-[#082d49]/20">
                        <div data-accessory-install-progress className="h-full w-full bg-[#ff5500]" />
                      </div>
                      <span className="poppins text-xs font-medium uppercase tracking-widest text-[#ff5500]">01 / Estrutura</span>
                      <h4 className="poppins mt-2 text-xl font-semibold">Poste T de aço</h4>
                      <p className="poppins mt-2 text-sm leading-6 text-[#082d49]/65">A base resistente que sustenta a instalação da cerca.</p>
                    </div>
                    <div data-accessory-install-step className="relative pl-5">
                      <div aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-[2px] bg-[#082d49]/20">
                        <div data-accessory-install-progress className="h-full w-full bg-[#ff5500]" />
                      </div>
                      <span className="poppins text-xs font-medium uppercase tracking-widest text-[#ff5500]">02 / Instalação</span>
                      <h4 className="poppins mt-2 text-xl font-semibold">Batedor manual</h4>
                      <p className="poppins mt-2 text-sm leading-6 text-[#082d49]/65">Ferramenta de apoio para posicionar o poste com praticidade.</p>
                    </div>
                  </div>
                  <div data-accessory-install-frame className="relative z-20 h-[42svh] min-h-[260px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#d7dade] via-[#eef0f3] to-[#9badba] p-5 shadow-[0_24px_55px_#082d4914] sm:p-8 lg:h-[66svh] lg:p-10">
                    <div data-accessory-install-screen role="img" aria-label="Espaço reservado para a imagem do poste T de aço" className="absolute inset-0 flex flex-col items-center justify-center p-8">
                      <div className="flex h-full w-full flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-[#082d49]/25 bg-white/85">
                        <span className="poppins text-xs uppercase tracking-widest text-[#ff5500]">01 / Poste T de aço</span>
                        <span className="poppins mt-4 text-lg text-[#082d49]/55">Imagem do poste T de aço</span>
                        <span className="poppins mt-2 text-xs text-[#082d49]/40">Placeholder para a imagem</span>
                      </div>
                    </div>
                    <div data-accessory-install-screen role="img" aria-label="Espaço reservado para a imagem do batedor manual" className="absolute inset-0 flex flex-col items-center justify-center p-8">
                      <div className="flex h-full w-full flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-[#082d49]/25 bg-white/85">
                        <span className="poppins text-xs uppercase tracking-widest text-[#ff5500]">02 / Batedor manual</span>
                        <span className="poppins mt-4 text-lg text-[#082d49]/55">Imagem do batedor manual</span>
                        <span className="poppins mt-2 text-xs text-[#082d49]/40">Placeholder para a imagem</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <div data-accessory-footer><Footer /></div>
        </div>
      </div>
    </div>
  );
};

export default Accessories;
