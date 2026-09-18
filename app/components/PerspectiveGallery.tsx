"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useAnimationFrame, useInView, useMotionValue, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import type { GalleryImage } from "../assets/data";

function RevealLetter({ letter, index, total, progress }: { letter: string; index: number; total: number; progress: MotionValue<number> }) {
  const reducedMotion = useReducedMotion();
  const start = (index / total) * 0.85;
  const opacity = useTransform(progress, [start, Math.min(start + 0.12, 1)], [0.12, 1]);
  const filter = useTransform(progress, [start, Math.min(start + 0.12, 1)], ["blur(2px)", "blur(0px)"]);
  return <motion.span style={{ opacity: reducedMotion ? 1 : opacity, filter: reducedMotion ? "none" : filter }}>{letter}</motion.span>;
}

function GalleryCard({ image, slot, count, phase, step, onClick }: { image: GalleryImage; slot: number; count: number; phase: MotionValue<number>; step: MotionValue<number>; onClick: () => void }) {
  const distance = useTransform(phase, (value) => ((slot - value + count / 2) % count + count) % count - count / 2);
  const x = useTransform(() => {
    const value = distance.get();
    return (value + 0.03 * value ** 3) * step.get();
  });
  const rotateY = useTransform(distance, (value) => Math.max(-50, Math.min(50, value * -12)));
  const scale = useTransform(distance, (value) => 1 + 0.07 * value ** 2);
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={`Abrir ${image.alt} em tela cheia`}
      style={{ x, rotateY, scale, transformPerspective: 600 }}
      className="absolute top-1/2 left-1/2 -mt-[75px] -ml-[50px] h-[150px] w-[100px] cursor-pointer overflow-hidden rounded-xl bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff5500] sm:-mt-[7.5vw] sm:-ml-[5.25vw] sm:h-[15vw] sm:w-[10.5vw]"
    >
      <Image src={image.src} alt={image.alt} fill quality={90} sizes="(min-width: 640px) 640px, 400px" className="object-cover" />
    </motion.button>
  );
}

export default function PerspectiveGallery({ images, title, onOpen, paused = false }: { images: GalleryImage[]; title?: string; onOpen: (index: number) => void; paused?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const interactions = useRef({ hover: false, focus: false });
  const phase = useMotionValue(0.5);
  const step = useMotionValue(180);
  const reducedMotion = useReducedMotion();
  const visible = useInView(sectionRef);
  const { scrollYProgress: textProgress } = useScroll({ target: textRef, offset: ["start 85%", "end 45%"] });
  const sentence = `Malhas de alta performance que unem qualidade e resistência para proteger quem trabalha no campo todos os dias.`;
  const count = images.length ? Math.ceil(11 / images.length) * images.length : 0;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      step.set(width >= 640 ? width * 0.128 : 120);
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, [step]);

  useAnimationFrame((_, delta) => {
    if (!count || !visible || paused || reducedMotion || interactions.current.hover || interactions.current.focus || document.hidden) return;
    phase.set((phase.get() + Math.min(delta, 50) * 0.00045) % count);
  });
  if (!images.length) return null;
  return (
    <section ref={sectionRef} className="poppins overflow-hidden bg-background py-16 text-[#002d4d] dark:text-white sm:py-20">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <motion.span initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reducedMotion ? 0 : 0.5 }} className="inline-block rounded-full bg-white px-3 py-1.5 text-sm text-[#ff5500] shadow-[0_8px_24px_#00000020] dark:bg-[#22272b]">Explore e conheça</motion.span>
        <h2 ref={textRef} aria-label={sentence} className="poppins mt-8 text-[clamp(26px,3.5vw,40px)] leading-[1.12] font-light tracking-[-.025em]">
          <span aria-hidden="true">{sentence.split(" ").map((word, wordIndex, words) => {
            const firstLetter = words.slice(0, wordIndex).join(" ").length + (wordIndex ? 1 : 0);
            return <span key={wordIndex} className="inline-block">{Array.from(word).map((letter, index) => <RevealLetter key={index} letter={letter} index={firstLetter + index} total={sentence.length} progress={textProgress} />)}<span>{"\u00a0"}</span></span>;
          })}</span>
        </h2>
      </div>
      <div onPointerEnter={() => { interactions.current.hover = true; }} onPointerLeave={() => { interactions.current.hover = false; }} onFocusCapture={() => { interactions.current.focus = true; }} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) interactions.current.focus = false; }} className="relative mt-8 h-[310px] sm:mt-0 sm:h-[33vw]">
        {Array.from({ length: count }, (_, slot) => {
          const index = slot % images.length;
          return <GalleryCard key={slot} image={images[index]} slot={slot} count={count} phase={phase} step={step} onClick={() => onOpen(index)} />;
        })}
      </div>
    </section>
  );
}
