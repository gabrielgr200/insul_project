"use client";

import { useRef, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const stopHandlerRef = useRef<(() => void) | null>(null);
  const introPlayedRef = useRef(false);

  const playFeature = (i: number) => {
    setActiveIndex(i);
    const video = videoRef.current;
    if (!video) return;

    if (stopHandlerRef.current) {
      video.removeEventListener("timeupdate", stopHandlerRef.current);
    }

    const { start, end } = features[i];
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
      } else if (video.currentTime >= end) {
        video.pause();
        video.removeEventListener("timeupdate", handleTimeUpdate);
        stopHandlerRef.current = null;
      }
    };
    stopHandlerRef.current = handleTimeUpdate;

    video.currentTime = skipIntro ? start : 0;
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.play();
  };

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

      <div className="absolute inset-0 flex items-center pt-36">
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
