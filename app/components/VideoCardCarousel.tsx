"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Maximize2, SkipForward, Volume2, VolumeX } from "lucide-react";
import type { VideoCardData } from "../assets/data";

const OFFSET_STEP = 130;
const MAX_VISIBLE_OFFSET = 2;

const VideoCardCarousel = ({
  cards,
  fenceName,
}: {
  cards: VideoCardData[];
  fenceName: string;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [unmutedIndex, setUnmutedIndex] = useState<number | null>(null);

  const length = cards.length;
  const drag = useRef({ active: false, moved: false, startX: 0 });

  const getOffset = (index: number) => {
    let diff = index - activeIndex;
    if (diff > length / 2) diff -= length;
    if (diff < -length / 2) diff += length;
    return diff;
  };

  const goTo = (index: number) => {
    setActiveIndex(((index % length) + length) % length);
  };

  const goNext = () => goTo(activeIndex + 1);
  const goPrev = () => goTo(activeIndex - 1);

  const handlePointerDown = (e: React.PointerEvent) => {
    drag.current = { active: true, moved: false, startX: e.clientX };
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    if (Math.abs(e.clientX - drag.current.startX) > 4)
      drag.current.moved = true;
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    const delta = e.clientX - drag.current.startX;
    if (delta > 60) goPrev();
    else if (delta < -60) goNext();
  };

  return (
    <section className="overflow-hidden py-16">
      <h3 className="mt-4 text-2xl poppins text-center mb-10 font-bold text-[#ff5500] sm:text-3xl">
        Veja alguns vídeos sobre a cerca {fenceName}
      </h3>
      <div
        className="relative mx-auto flex h-[380px] max-w-6xl cursor-grab items-center justify-center touch-pan-y select-none active:cursor-grabbing sm:h-[440px]"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-72 w-72 rounded-full bg-black/5 blur-3xl sm:h-96 sm:w-96" />
        </div>

        {cards.map((card, index) => {
          const offset = getOffset(index);
          const absOffset = Math.abs(offset);
          const isActive = offset === 0;
          const isVisible = absOffset <= MAX_VISIBLE_OFFSET;
          const muted = !(isActive && unmutedIndex === index);
          const videoSrc = card.src;

          return (
            <motion.div
              key={card.src}
              className="group absolute h-72 w-52 overflow-hidden rounded-3xl bg-zinc-900 shadow-2xl sm:h-96 sm:w-64"
              style={{ zIndex: 10 - absOffset }}
              animate={{
                x: offset * OFFSET_STEP,
                scale: isActive ? 1 : 0.85,
                opacity: isVisible ? (isActive ? 1 : 0.5) : 0,
                filter: isActive ? "blur(0px)" : `blur(${absOffset * 4}px)`,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              onClick={() => {
                if (drag.current.moved) return;
                if (!isActive) goTo(index);
              }}
            >
              <video
                src={videoSrc}
                autoPlay
                loop
                muted={muted}
                playsInline
                className="pointer-events-none h-full w-full object-cover"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

              <span className="playfair-display absolute top-3 left-4 text-3xl text-white">
                {String(index + 1).padStart(2, "0")}
              </span>

              {isActive ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setUnmutedIndex((current) =>
                      current === index ? null : index,
                    );
                  }}
                  aria-label={muted ? "Ativar som" : "Silenciar"}
                  className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60"
                >
                  {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>
              ) : (
                <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="flex h-7 w-7 poppins items-center justify-center rounded-md bg-black/50 text-white">
                    <Maximize2 size={12} />
                  </span>
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-md bg-black/50 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      goTo(index);
                    }}
                  >
                    <SkipForward size={12} />
                  </span>
                </div>
              )}

              {/*<div className="absolute right-0 bottom-0 left-0 p-4">
                <span className="mb-2 block h-px w-6 bg-[#ffb648]" />
                <span className="text-[10px] font-semibold tracking-[0.2em] text-[#ffb648] uppercase">
                  {card.category}
                </span>
                <h3 className="playfair-display mt-1 text-xl text-white">
                  {card.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-white/70">
                  {card.description}
                </p>
              </div>*/}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default VideoCardCarousel;
