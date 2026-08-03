"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronUp, ChevronDown, Plus, X } from "lucide-react";
import type { CercaFeature } from "../assets/data";

const INTRO_END = 4.5;

const MALHA_HOVER_OPTIONS = [
  { name: "Fenix", image: "/images/malha_hover_icons/fenix.png" },
  { name: "Campeira", image: "/images/malha_hover_icons/campeira.png" },
  { name: "Campeira Boi", image: "/images/malha_hover_icons/campeira-boi.png" },
];
const MALHA_HOVER_INTERVAL = 1100;

const MALHA_BUTTON_RADIUS = 19;
const MALHA_BUTTON_HEIGHT = 40;

const getMalhaButtonPath = (width: number) => {
  const r = MALHA_BUTTON_RADIUS;
  const h = MALHA_BUTTON_HEIGHT;
  const leftX = r + 1;
  const rightArcStartX = Math.max(width - r - 1, leftX);
  const rightEdgeX = Math.max(width - 1, leftX + 1);
  const midY = h / 2;
  const botY = h - 1;
  return `M ${leftX} 1 H ${rightArcStartX} A ${r} ${r} 0 0 1 ${rightEdgeX} ${midY} A ${r} ${r} 0 0 1 ${rightArcStartX} ${botY} H ${leftX} A ${r} ${r} 0 0 1 1 ${midY} A ${r} ${r} 0 0 1 ${leftX} 1 Z`;
};

const KNOT_LINE = { x1: 16, y1: 190, x2: 80, y2: 133 };

const MALHA_GLOW_DURATION = 4.5;
const MALHA_GLOW_COMET_FRACTION = 0.12;

interface CercaHeroDetailsProps {
  name: string;
  videoSrc: string;
  features: CercaFeature[];
}

const CercaHeroDetails = ({
  name,
  videoSrc,
  features,
}: CercaHeroDetailsProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [waitingAtCheckpoint, setWaitingAtCheckpoint] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);
  const [arrowUnlocked, setArrowUnlocked] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const [activeOptionIndex, setActiveOptionIndex] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const knotLineRef = useRef<SVGLineElement>(null);
  const knotCircleRef = useRef<HTMLDivElement>(null);
  const malhaButtonBoxRef = useRef<HTMLDivElement>(null);
  const malhaBorderPathRef = useRef<SVGPathElement>(null);
  const malhaGlowPathRef = useRef<SVGPathElement>(null);
  const malhaGlowLengthRef = useRef(0);
  const [malhaButtonWidth, setMalhaButtonWidth] = useState(220);
  const [malhaHovering, setMalhaHovering] = useState(false);
  const [malhaOptionIndex, setMalhaOptionIndex] = useState(0);
  const malhaCycleIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const malhaRotateTweenRef = useRef<gsap.core.Tween | null>(null);
  const malhaFillTweenRef = useRef<gsap.core.Tween | null>(null);
  const malhaFillProxyRef = useRef({ frac: MALHA_GLOW_COMET_FRACTION });
  const stopHandlerRef = useRef<(() => void) | null>(null);
  const introPlayedRef = useRef(false);
  const checkpointTargetsRef = useRef<number[]>([]);
  const checkpointIndexRef = useRef(0);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (cardOpen) {
      gsap.fromTo(
        card,
        { autoAlpha: 0, scale: 0.85, y: 16 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 0.45, ease: "back.out(1.7)" },
      );
    } else {
      gsap.to(card, {
        autoAlpha: 0,
        scale: 0.85,
        y: 16,
        duration: 0.25,
        ease: "power2.in",
      });
    }
  }, [cardOpen]);

  const playFeature = (i: number) => {
    setActiveIndex(i);
    setWaitingAtCheckpoint(false);
    setCardOpen(false);
    setArrowUnlocked(false);
    setStageIndex(0);
    setActiveOptionIndex(null);
    const video = videoRef.current;
    if (!video) return;

    if (stopHandlerRef.current) {
      video.removeEventListener("timeupdate", stopHandlerRef.current);
    }

    const { start, end, checkpoints } = features[i];
    const targets = checkpoints && checkpoints.length > 0 ? checkpoints : [end];
    checkpointTargetsRef.current = targets;
    checkpointIndexRef.current = 0;

    const skipIntro = introPlayedRef.current;
    let phase: "intro" | "feature" = skipIntro ? "feature" : "intro";
    const handleTimeUpdate = () => {
      if (phase === "intro") {
        if (video.currentTime >= INTRO_END) {
          phase = "feature";
          introPlayedRef.current = true;

          if (start > video.currentTime) {
            video.currentTime = start;
          }
        }
        return;
      }

      const idx = checkpointIndexRef.current;
      const target = checkpointTargetsRef.current[idx];
      if (video.currentTime >= target) {
        video.pause();
        checkpointIndexRef.current = idx + 1;
        setWaitingAtCheckpoint(true);
        setCardOpen(false);
        setArrowUnlocked(false);
        if (idx >= checkpointTargetsRef.current.length - 1) {
          video.removeEventListener("timeupdate", handleTimeUpdate);
          stopHandlerRef.current = null;
        }
      }
    };
    stopHandlerRef.current = handleTimeUpdate;

    video.currentTime = skipIntro ? start : 0;
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.play();
  };

  const openCard = () => {
    setCardOpen(true);
    setArrowUnlocked(true);
  };

  const openOption = (idx: number) => {
    setActiveOptionIndex(idx);
    setCardOpen(true);
    setArrowUnlocked(true);
  };

  const closeCard = () => {
    setCardOpen(false);
  };

  const resumeAtCheckpoint = () => {
    setCardOpen(false);
    setArrowUnlocked(false);
    setWaitingAtCheckpoint(false);
    setActiveOptionIndex(null);
    const nextIdx = checkpointIndexRef.current;
    const hasMore = nextIdx < checkpointTargetsRef.current.length;
    if (hasMore) {
      setStageIndex(nextIdx);
      videoRef.current?.play();
    } else {
      goNext();
    }
  };

  const activeFeature = activeIndex !== null ? features[activeIndex] : null;
  const isCheckpointFeature = !!(
    activeFeature?.checkpoints && activeFeature.captions
  );
  const checkpointCaption = isCheckpointFeature
    ? activeFeature!.captions![stageIndex]
    : undefined;
  const showKnotCallout = cardOpen && !!checkpointCaption?.image;

  useEffect(() => {
    if (!showKnotCallout) return;
    const line = knotLineRef.current;
    const circle = knotCircleRef.current;
    if (!line || !circle) return;

    gsap.killTweensOf([line, circle]);
    gsap.set(line, { attr: { x2: KNOT_LINE.x1, y2: KNOT_LINE.y1 } });

    const tl = gsap.timeline();
    tl.to(line, {
      attr: { x2: KNOT_LINE.x2, y2: KNOT_LINE.y2 },
      duration: 0.35,
      ease: "power2.out",
    }).fromTo(
      circle,
      { autoAlpha: 0, scale: 0.4 },
      { autoAlpha: 1, scale: 1, duration: 0.45, ease: "back.out(1.7)" },
      "-=0.05",
    );

    return () => {
      tl.kill();
    };
  }, [showKnotCallout]);

  const checkpointOptions = checkpointCaption?.options;
  const hasOptions = !!checkpointOptions?.length;
  const selectedOption =
    hasOptions && activeOptionIndex !== null
      ? checkpointOptions![activeOptionIndex]
      : undefined;
  const displayLabel = selectedOption?.label ?? checkpointCaption?.label;
  const displayValue = selectedOption?.value ?? checkpointCaption?.value;
  const isMalhaInferiorStage = checkpointCaption?.label === "Malha inferior";

  useEffect(() => {
    if (!isMalhaInferiorStage) return;
    const box = malhaButtonBoxRef.current;
    if (!box) return;

    const updateWidth = () => setMalhaButtonWidth(box.getBoundingClientRect().width);
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(box);
    return () => observer.disconnect();
  }, [isMalhaInferiorStage]);

  useEffect(() => {
    const glow = malhaGlowPathRef.current;
    if (!glow || !isMalhaInferiorStage) return;

    const length = glow.getTotalLength();
    if (!length) return;
    malhaGlowLengthRef.current = length;
    malhaFillProxyRef.current.frac = MALHA_GLOW_COMET_FRACTION;
    const segment = length * MALHA_GLOW_COMET_FRACTION;
    glow.setAttribute("stroke-dasharray", `${segment} ${length - segment}`);
    gsap.set(glow, { strokeDashoffset: 0 });

    const tween = gsap.to(glow, {
      strokeDashoffset: -length,
      duration: MALHA_GLOW_DURATION,
      repeat: -1,
      ease: "none",
    });
    malhaRotateTweenRef.current = tween;
    return () => {
      tween.kill();
      malhaRotateTweenRef.current = null;
      malhaFillTweenRef.current?.kill();
      malhaFillTweenRef.current = null;
    };
  }, [isMalhaInferiorStage, malhaButtonWidth]);

  const handleMalhaButtonEnter = () => {
    const glow = malhaGlowPathRef.current;
    const length = malhaGlowLengthRef.current;
    if (!glow || !length) return;
    malhaRotateTweenRef.current?.pause();
    malhaFillTweenRef.current?.kill();
    malhaFillTweenRef.current = gsap.to(malhaFillProxyRef.current, {
      frac: 1,
      duration: 0.9,
      ease: "power2.out",
      onUpdate: () => {
        const dash = length * malhaFillProxyRef.current.frac;
        glow.setAttribute("stroke-dasharray", `${dash} ${Math.max(length - dash, 0)}`);
      },
    });
  };

  const handleMalhaButtonLeave = () => {
    const glow = malhaGlowPathRef.current;
    const length = malhaGlowLengthRef.current;
    if (!glow || !length) return;
    malhaFillTweenRef.current?.kill();
    malhaFillTweenRef.current = gsap.to(malhaFillProxyRef.current, {
      frac: MALHA_GLOW_COMET_FRACTION,
      duration: 0.9,
      ease: "power2.out",
      onUpdate: () => {
        const dash = length * malhaFillProxyRef.current.frac;
        glow.setAttribute("stroke-dasharray", `${dash} ${Math.max(length - dash, 0)}`);
      },
      onComplete: () => {
        malhaRotateTweenRef.current?.play();
      },
    });
  };

  const startMalhaHoverCycle = () => {
    setMalhaHovering(true);
    setMalhaOptionIndex(0);
    if (malhaCycleIntervalRef.current) clearInterval(malhaCycleIntervalRef.current);
    malhaCycleIntervalRef.current = setInterval(() => {
      setMalhaOptionIndex((i) => (i + 1) % MALHA_HOVER_OPTIONS.length);
    }, MALHA_HOVER_INTERVAL);
  };

  const stopMalhaHoverCycle = () => {
    setMalhaHovering(false);
    if (malhaCycleIntervalRef.current) {
      clearInterval(malhaCycleIntervalRef.current);
      malhaCycleIntervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (malhaCycleIntervalRef.current) clearInterval(malhaCycleIntervalRef.current);
    };
  }, []);

  const goPrev = () =>
    playFeature(((activeIndex ?? 0) - 1 + features.length) % features.length);
  const goNext = () => playFeature(((activeIndex ?? 0) + 1) % features.length);

  return (
    <section className="relative h-[100vh] min-h-[480px] max-h-[820px] w-full overflow-hidden bg-zinc-100">
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover object-[center_80%] transition-transform duration-700 ease-out"
        style={{
          transform: checkpointCaption?.zoom
            ? `scale(${checkpointCaption.zoom.scale})`
            : "scale(1)",
          transformOrigin: checkpointCaption?.zoom?.origin ?? "center",
        }}
      />

      {waitingAtCheckpoint && !cardOpen && (
        <div className="pointer-events-none absolute inset-0 z-10 flex -translate-x-24 items-start justify-center gap-3 pt-[19rem]">
          {hasOptions ? (
            <div className="flex flex-col gap-3">
              {checkpointOptions!.map((option, idx) => (
                <div
                  key={option.label}
                  className={`relative flex h-9 w-9 items-center justify-center ${idx === 0 ? "-translate-y-20" : "translate-y-8"}`}
                >
                  <span className="absolute inset-0 animate-ping rounded-full bg-[#ff5500]/60" />
                  <button
                    type="button"
                    onClick={() => openOption(idx)}
                    aria-label={option.label}
                    className="pointer-events-auto relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#ff5500] bg-[#ff5500]/20 text-[#ff5500] backdrop-blur-sm transition-transform hover:scale-110 hover:bg-[#ff5500]/30"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative flex h-9 w-9 items-center justify-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#ff5500]/60" />
              <button
                type="button"
                onClick={openCard}
                aria-label="Mostrar informações"
                className="pointer-events-auto relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#ff5500] bg-[#ff5500]/20 text-[#ff5500] backdrop-blur-sm transition-transform hover:scale-110 hover:bg-[#ff5500]/30"
              >
                <Plus size={16} />
              </button>
            </div>
          )}
          {arrowUnlocked && (
            <div className="relative flex h-9 w-9 items-center justify-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#ff5500]/60" />
              <button
                type="button"
                onClick={resumeAtCheckpoint}
                aria-label="Avançar vídeo"
                className="pointer-events-auto relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#ff5500] bg-[#ff5500]/20 text-[#ff5500] backdrop-blur-sm transition-transform hover:scale-110 hover:bg-[#ff5500]/30"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      )}

      {waitingAtCheckpoint && isCheckpointFeature && (
        <div className="pointer-events-none absolute inset-0 z-10 flex -translate-x-24 items-start justify-center pt-[19rem]">
          <div className="relative">
            {showKnotCallout && (
              <div className="absolute bottom-full left-1/2 mb-8 h-[220px] w-[220px] -translate-x-1/2">
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 220 220"
                  fill="none"
                >
                  <line
                    ref={knotLineRef}
                    x1={KNOT_LINE.x1}
                    y1={KNOT_LINE.y1}
                    x2={KNOT_LINE.x1}
                    y2={KNOT_LINE.y1}
                    stroke="#002d4d"
                    strokeWidth="4"
                    strokeDasharray="2 16"
                    strokeLinecap="round"
                  />
                </svg>
                <div
                  ref={knotCircleRef}
                  className="invisible absolute right-0 top-0 flex h-40 w-40 items-center justify-center overflow-hidden rounded-full bg-white/90 opacity-0 shadow-xl"
                >
                  <img
                    src={checkpointCaption.image}
                    alt={checkpointCaption.label}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            )}
            <div
              ref={cardRef}
              className="invisible relative flex w-[min(22rem,85vw)] items-center gap-3 rounded-2xl bg-[#ff5500]/90 p-4 opacity-0 shadow-2xl backdrop-blur-md"
            >
              {displayLabel && (
                <div className="pointer-events-auto flex-1">
                  <p className="poppins text-sm font-bold tracking-wide text-white/90 uppercase">
                    {displayLabel}
                  </p>
                  <p className="poppins mt-1 text-sm leading-relaxed text-white/80">
                    {displayValue}
                  </p>
                </div>
              )}
              <button
                type="button"
                onClick={resumeAtCheckpoint}
                aria-label="Avançar vídeo"
                className="pointer-events-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-white bg-white/20 text-white transition-transform hover:scale-110 hover:bg-white/30"
              >
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                onClick={closeCard}
                aria-label="Fechar"
                className="pointer-events-auto absolute -top-3 -right-3 flex h-7 w-7 items-center justify-center rounded-full border border-white/60 bg-black text-white transition-colors hover:bg-white/20"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="absolute inset-0 flex items-center pt-2">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-8">
          <div className="rounded-3xl bg-black/10 p-6 shadow-2xl backdrop-blur-lg lg:ml-auto lg:w-1/3">
            <div className="pl-6 lg:pl-10 xl:pl-14">
              <span className="inline-block rounded-full border border-[#002d4d]/40 px-4 py-1.5 text-sm font-medium text-[#002d4d]">
                Cerca Pronta(rurais)
              </span>
              <h2 className="poppins mt-3 text-3xl font-bold text-[#ff5500] lg:text-4xl xl:text-5xl">
                {name}
              </h2>
            </div>

            <div className="mt-6 flex gap-3">
              <div className="flex flex-col items-center gap-1 pt-1">
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Item anterior"
                  className="flex h-7 w-7 items-center justify-center rounded-full text-[#002d4d]/60 transition-colors hover:bg-[#002d4d]/10 hover:text-[#002d4d]"
                >
                  <ChevronUp size={16} />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Próximo item"
                  className="flex h-7 w-7 items-center justify-center rounded-full text-[#002d4d]/60 transition-colors hover:bg-[#002d4d]/10 hover:text-[#002d4d]"
                >
                  <ChevronDown size={16} />
                </button>
              </div>

              <div className="flex flex-1 flex-col gap-2">
                {features.map((feature, i) => {
                  const active = i === activeIndex;
                  const showMalhaInferiorButton = active && isMalhaInferiorStage;
                  return (
                    <div key={feature.title} className="flex flex-col">
                      <button
                        type="button"
                        onClick={() => playFeature(i)}
                        className={`rounded-2xl px-4 py-3 text-left transition-colors ${
                          active ? "bg-zinc-400/30" : "hover:bg-[#002d4d]/5"
                        }`}
                      >
                        <span className="text-sm font-medium text-[#002d4d]">
                          {feature.title}
                        </span>
                        {active && (
                          <p className="mt-1.5 text-sm leading-relaxed text-[#002d4d]/70">
                            {feature.description}
                          </p>
                        )}
                      </button>
                      {showMalhaInferiorButton && (
                        <div className="mt-4">
                          <div
                            ref={malhaButtonBoxRef}
                            className="relative h-10 w-full"
                          >
                            <button
                              type="button"
                              onClick={resumeAtCheckpoint}
                              onMouseEnter={() => {
                                handleMalhaButtonEnter();
                                startMalhaHoverCycle();
                              }}
                              onMouseLeave={() => {
                                handleMalhaButtonLeave();
                                stopMalhaHoverCycle();
                              }}
                              aria-label="Avançar vídeo"
                              className="relative flex h-10 w-full items-center justify-between gap-2 rounded-full bg-transparent pl-5 pr-2 text-xs font-semibold text-[#002d4d]"
                            >
                              <span className="relative block h-4 flex-1 overflow-hidden text-left">
                                <AnimatePresence mode="wait" initial={false}>
                                  {malhaHovering ? (
                                    <motion.span
                                      key={MALHA_HOVER_OPTIONS[malhaOptionIndex].name}
                                      initial={{ y: 14, opacity: 0 }}
                                      animate={{ y: 0, opacity: 1 }}
                                      exit={{ y: -14, opacity: 0 }}
                                      transition={{ duration: 0.3, ease: "easeOut" }}
                                      className="absolute inset-0 block whitespace-nowrap"
                                    >
                                      {MALHA_HOVER_OPTIONS[malhaOptionIndex].name}
                                    </motion.span>
                                  ) : (
                                    <motion.span
                                      key="default"
                                      initial={{ y: 14, opacity: 0 }}
                                      animate={{ y: 0, opacity: 1 }}
                                      exit={{ y: -14, opacity: 0 }}
                                      transition={{ duration: 0.3, ease: "easeOut" }}
                                      className="absolute inset-0 block whitespace-nowrap"
                                    >
                                      Conheça outras opções
                                    </motion.span>
                                  )}
                                </AnimatePresence>
                              </span>
                              <span className="relative block h-7 w-7 shrink-0 overflow-hidden rounded-full bg-transparent">
                                <AnimatePresence mode="wait" initial={false}>
                                  {malhaHovering && (
                                    <motion.img
                                      key={MALHA_HOVER_OPTIONS[malhaOptionIndex].name}
                                      src={MALHA_HOVER_OPTIONS[malhaOptionIndex].image}
                                      alt={MALHA_HOVER_OPTIONS[malhaOptionIndex].name}
                                      initial={{ y: 14, opacity: 0 }}
                                      animate={{ y: 0, opacity: 1 }}
                                      exit={{ y: -14, opacity: 0 }}
                                      transition={{ duration: 0.3, ease: "easeOut" }}
                                      className="absolute inset-0 h-full w-full object-contain p-0.5"
                                    />
                                  )}
                                </AnimatePresence>
                              </span>
                            </button>
                            <svg
                              className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                              viewBox={`0 0 ${malhaButtonWidth} ${MALHA_BUTTON_HEIGHT}`}
                              fill="none"
                            >
                              <path
                                ref={malhaBorderPathRef}
                                d={getMalhaButtonPath(malhaButtonWidth)}
                                stroke="#002d4d"
                                strokeWidth="1.5"
                                opacity="0.3"
                              />
                              <path
                                ref={malhaGlowPathRef}
                                d={getMalhaButtonPath(malhaButtonWidth)}
                                stroke="#ffb877"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                style={{
                                  filter:
                                    "drop-shadow(0 0 3px #ffb877) drop-shadow(0 0 10px #ff9a45) drop-shadow(0 0 24px #ff9a45) drop-shadow(0 0 42px rgba(255,154,69,0.6))",
                                }}
                              />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CercaHeroDetails;
