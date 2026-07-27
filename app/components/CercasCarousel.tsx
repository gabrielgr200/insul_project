'use client';

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import type { CercaSlide } from "../assets/data";

const CercasCarousel = ({ slides }: { slides: CercaSlide[] }) => {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const [hotspotOpen, setHotspotOpen] = useState(false);
  const incomingRef = useRef<HTMLImageElement>(null);

  const slide = slides[index];
  const isTransitioning = prevIndex !== null && prevIndex !== index;

  useGSAP(() => {
    if (!isTransitioning) return;
    gsap.fromTo(
      incomingRef.current,
      { xPercent: direction > 0 ? 100 : -100 },
      {
        xPercent: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => setPrevIndex(index),
      },
    );
  }, [index]);

  const goTo = (i: number, dir?: number) => {
    const nextIndex = (i + slides.length) % slides.length;
    if (nextIndex === index) return;
    setDirection(dir ?? (nextIndex > index ? 1 : -1));
    setPrevIndex(index);
    setIndex(nextIndex);
    setHotspotOpen(false);
  };
  const goPrev = () => goTo(index - 1, -1);
  const goNext = () => goTo(index + 1, 1);

  return (
    <div className="w-full">
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black select-none">
        {isTransitioning && (
          <img
            src={slides[prevIndex].src}
            alt={slides[prevIndex].label}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <img
          key={slide.src}
          ref={incomingRef}
          src={slide.src}
          alt={slide.label}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* label */}
        <p className="absolute top-4 left-5 z-10 text-white font-medium drop-shadow-md">
          {slide.label}
        </p>

        {/* counter */}
        <p className="absolute top-5 right-6 z-10 text-white/90 text-sm font-medium drop-shadow-md">
          {index + 1}/{slides.length}
        </p>

        {/* nav arrows */}
        <button
          type="button"
          onClick={goPrev}
          aria-label="Imagem anterior"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 backdrop-blur text-white transition-colors duration-200"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Próxima imagem"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 backdrop-blur text-white transition-colors duration-200"
        >
          <ChevronRight size={20} />
        </button>

        {/* hotspot */}
        {slide.hotspot && (
          <div
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${slide.hotspot.x}%`, top: `${slide.hotspot.y}%` }}
          >
            <button
              type="button"
              onClick={() => setHotspotOpen((v) => !v)}
              aria-label={`Ver detalhes: ${slide.hotspot.title}`}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/90 text-black shadow-lg hover:scale-110 transition-transform duration-200"
            >
              {hotspotOpen ? <X size={16} /> : <Plus size={16} />}
            </button>

            {hotspotOpen && (
              <div
                className={`absolute top-10 w-60 bg-white rounded-xl shadow-xl p-4 text-left ${
                  slide.hotspot.x > 60 ? "right-0" : "left-0"
                }`}
              >
                <p className="font-semibold text-[#002d4d] dark:text-white text-sm">
                  {slide.hotspot.title}
                </p>
                <p className="text-zinc-500 text-xs mt-1 leading-relaxed">
                  {slide.hotspot.description}
                </p>
              </div>
            )}
          </div>
        )}

        {/* thumbnails */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 max-w-[92%]">
          <div className="flex items-center gap-3 bg-black/40 backdrop-blur rounded-2xl px-3 py-3 overflow-x-auto">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ir para ${s.label}`}
                className={`shrink-0 w-16 h-11 rounded-[10px] sm:w-20 sm:h-14 transition-all duration-200 ${
                  i === index
                    ? "ring-2 ring-white opacity-100"
                    : "ring-1 ring-white/20 opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={s.src}
                  alt={s.label}
                  className="w-full h-full object-cover rounded-[10px]"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CercasCarousel;
