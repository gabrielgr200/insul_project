'use client';

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const IMAGE_CARDS = [
  "https://d2c3kthzw0ta10.cloudfront.net/CardImg-gradil-marquee/imgVideo-1-gradil.jpg",
  "https://d2c3kthzw0ta10.cloudfront.net/CardImg-gradil-marquee/imgVideo-2-gradil.jpg",
  "https://d2c3kthzw0ta10.cloudfront.net/CardImg-gradil-marquee/imgVideo-3-gradil.jpeg",
  "https://d2c3kthzw0ta10.cloudfront.net/CardImg-gradil-marquee/imgVideo-4-gradil.jpeg",
  "https://d2c3kthzw0ta10.cloudfront.net/CardImg-gradil-marquee/imgVideo-gradil-5.jpg",
  "https://d2c3kthzw0ta10.cloudfront.net/CardImg-gradil-marquee/imgVideo-gradil-6.png",
];

type CardMedia = { src: string; alt: string };

const ORDERED_CARDS: CardMedia[] = IMAGE_CARDS.map((src) => ({
  src,
  alt: "Gradil Insul - cor disponível",
}));

const REPEAT = 4;
const CARDS: CardMedia[] = Array.from({ length: REPEAT }, () => ORDERED_CARDS).flat();
const TRACK = [...CARDS, ...CARDS];

const SPEED_PX_PER_SEC = 45;

const GradilCardsMarquee = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const offsetRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const blurOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const halfWidth = track.scrollWidth / 2;
    let lastTime: number | null = null;
    let frameId: number;

    const step = (time: number) => {
      if (lastTime !== null) {
        const delta = (time - lastTime) / 1000;
        offsetRef.current += SPEED_PX_PER_SEC * delta;
        if (offsetRef.current >= halfWidth) {
          offsetRef.current -= halfWidth;
        }
        track.style.transform = `translateX(-${offsetRef.current}px)`;
      }
      lastTime = time;
      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-10">
      <div
        className="overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div ref={trackRef} className="flex w-max gap-2 will-change-transform sm:gap-3">
          {TRACK.map((card, i) => (
            <div
              key={`card-${i}`}
              className={`relative h-76 w-30 shrink-0 overflow-hidden bg-zinc-100 sm:h-100 sm:w-42 lg:h-120 lg:w-56 ${
                i % 2 === 0
                  ? "rounded-tl-[68px] rounded-br-[68px] sm:rounded-tl-[92px] sm:rounded-br-[92px] lg:rounded-tl-[120px] lg:rounded-br-[120px]"
                  : "rounded-tr-[68px] rounded-bl-[68px] sm:rounded-tr-[92px] sm:rounded-bl-[92px] lg:rounded-tr-[120px] lg:rounded-bl-[120px]"
              }`}
            >
              <Image
                src={card.src}
                alt={card.alt}
                fill
                quality={90}
                sizes="(min-width: 1024px) 224px, (min-width: 640px) 168px, 120px"
                draggable={false}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-30 h-20 border-t border-white/45 bg-white/28 shadow-[0_-18px_50px_rgba(0,45,77,0.12)] backdrop-blur-2xl backdrop-saturate-150 sm:h-28 lg:h-32 dark:border-white/15 dark:bg-[#07131f]/35 dark:shadow-[0_-18px_55px_rgba(0,0,0,0.35)]"
        style={{
          opacity: blurOpacity,
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 100%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
        }}
      />
    </section>
  );
};

export default GradilCardsMarquee;
