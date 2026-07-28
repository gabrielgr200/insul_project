"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowRight, ChevronUp, ChevronDown, Plus, X } from "lucide-react";
import type { CercaFeature } from "../assets/data";

const INTRO_END = 4.5;

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
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
        const isLast = idx >= checkpointTargetsRef.current.length - 1;
        if (isLast) {
          video.removeEventListener("timeupdate", handleTimeUpdate);
          stopHandlerRef.current = null;
        } else {
          checkpointIndexRef.current = idx + 1;
          setWaitingAtCheckpoint(true);
          setCardOpen(false);
          setArrowUnlocked(false);
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

  const closeCard = () => {
    setCardOpen(false);
  };

  const resumeAtCheckpoint = () => {
    setWaitingAtCheckpoint(false);
    setCardOpen(false);
    setArrowUnlocked(false);
    setStageIndex(checkpointIndexRef.current);
    videoRef.current?.play();
  };

  const activeFeature = activeIndex !== null ? features[activeIndex] : null;
  const isCheckpointFeature = !!(
    activeFeature?.checkpoints && activeFeature.captions
  );
  const checkpointCaption = isCheckpointFeature
    ? activeFeature!.captions![stageIndex]
    : undefined;
  const plainCaption = !isCheckpointFeature ? activeFeature?.caption : undefined;

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
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/20 to-transparent" />

      {waitingAtCheckpoint && !cardOpen && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={openCard}
            aria-label="Mostrar informações"
            className="pointer-events-auto flex h-9 w-9 animate-pulse items-center justify-center rounded-full border-2 border-white bg-white/20 text-white backdrop-blur-sm transition-transform hover:scale-110 hover:bg-white/30"
          >
            <Plus size={16} />
          </button>
          {arrowUnlocked && (
            <button
              type="button"
              onClick={resumeAtCheckpoint}
              aria-label="Avançar vídeo"
              className="pointer-events-auto flex h-9 w-9 animate-pulse items-center justify-center rounded-full border-2 border-white bg-white/20 text-white backdrop-blur-sm transition-transform hover:scale-110 hover:bg-white/30"
            >
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      )}

      {waitingAtCheckpoint && isCheckpointFeature && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4">
          <div
            ref={cardRef}
            className="invisible relative w-[min(22rem,90vw)] rounded-2xl bg-black/70 p-5 opacity-0 shadow-2xl backdrop-blur-md"
          >
            <button
              type="button"
              onClick={closeCard}
              aria-label="Fechar"
              className="pointer-events-auto absolute -top-3 -right-3 flex h-7 w-7 items-center justify-center rounded-full border border-white/60 bg-black text-white transition-colors hover:bg-white/20"
            >
              <X size={14} />
            </button>
            <p className="poppins pointer-events-auto text-sm leading-relaxed text-white">
              {checkpointCaption}
            </p>
            <button
              type="button"
              onClick={resumeAtCheckpoint}
              aria-label="Avançar vídeo"
              className="pointer-events-auto mt-4 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-white/20 text-white transition-transform hover:scale-110 hover:bg-white/30"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {plainCaption && (
        <div className="absolute bottom-10 left-4 z-10 max-w-sm sm:left-8">
          <p className="poppins rounded-xl bg-black/40 px-4 py-3 text-sm leading-relaxed text-white backdrop-blur-sm">
            {plainCaption}
          </p>
        </div>
      )}

      <div className="absolute inset-0 flex items-center pt-2">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-8">
          <div className="lg:ml-auto lg:w-1/3">
            <div className="pl-14">
              <span className="inline-block rounded-full border border-white/40 px-4 py-1.5 text-sm font-medium text-white">
                Cerca Pronta
              </span>
              <h2 className="poppins mt-3 text-5xl font-bold text-[#ff5500]">
                {name}
              </h2>
            </div>

            <div className="mt-6 flex gap-3">
              <div className="flex flex-col items-center gap-1 pt-1">
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Item anterior"
                  className="flex h-7 w-7 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <ChevronUp size={16} />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Próximo item"
                  className="flex h-7 w-7 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <ChevronDown size={16} />
                </button>
              </div>

              <div className="flex flex-1 flex-col gap-2">
                {features.map((feature, i) => {
                  const active = i === activeIndex;
                  return (
                    <button
                      key={feature.title}
                      type="button"
                      onClick={() => playFeature(i)}
                      className={`rounded-2xl px-4 py-3 text-left transition-colors ${
                        active ? "bg-white/10" : "hover:bg-white/5"
                      }`}
                    >
                      <span className="text-sm font-medium text-white">
                        {feature.title}
                      </span>
                      {active && (
                        <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                          {feature.description}
                        </p>
                      )}
                    </button>
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
