"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useAnimationFrame, useInView, useMotionValue, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import type { GalleryImage } from "../assets/data";
import { useContentTranslation } from "./LanguageProvider";

function RevealLetter({ letter, index, total, progress }: { letter: string; index: number; total: number; progress: MotionValue<number> }) {
  const translateText = useContentTranslation();
  const reducedMotion = useReducedMotion();
  const start = (index / total) * 0.85;
  const opacity = useTransform(progress, [start, Math.min(start + 0.12, 1)], [0.12, 1]);
  const filter = useTransform(progress, [start, Math.min(start + 0.12, 1)], ["blur(2px)", "blur(0px)"]);
  return <motion.span style={{ opacity: reducedMotion ? 1 : opacity, filter: reducedMotion ? "none" : filter }}>{translateText(letter)}</motion.span>;
}

function GalleryCard({ image, slot, count, phase, step, onClick, clipcut = false }: { image: GalleryImage; slot: number; count: number; phase: MotionValue<number>; step: MotionValue<number>; onClick: () => void; clipcut?: boolean }) {
  const translateText = useContentTranslation();
  const distance = useTransform(phase, (value) => ((slot - value + count / 2) % count + count) % count - count / 2);
  const x = useTransform(() => {
    const value = distance.get();
    return clipcut ? Math.sin(value * Math.PI * 27 / 180) * step.get() : (value + 0.03 * value ** 3) * step.get();
  });
  const z = useTransform(() => clipcut ? -Math.cos(distance.get() * Math.PI * 27 / 180) * step.get() : 0);
  const rotateY = useTransform(distance, (value) => clipcut ? value * -27 : Math.max(-50, Math.min(50, value * -12)));
  const scale = useTransform(distance, (value) => clipcut ? 1 : 1 + 0.07 * value ** 2);
  const opacity = useTransform(distance, value => !clipcut || Math.abs(value) < 4.66 ? 1 : 0);
  const pointerEvents = useTransform(distance, value => !clipcut || Math.abs(value) < 4.66 ? "auto" as const : "none" as const);
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={translateText(`Abrir ${image.alt} em tela cheia`)}
      style={{ x, z, rotateY, scale, opacity, pointerEvents, ...(clipcut ? {} : { transformPerspective: 600 }) }}
      className={`absolute top-1/2 left-1/2 cursor-pointer overflow-hidden rounded-xl bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff5500] ${clipcut ? "-mt-[120px] -ml-[85px] h-[240px] w-[170px] sm:-mt-[9.635vw] sm:-ml-[6.77vw] sm:h-[19.27vw] sm:w-[13.54vw]" : "-mt-[75px] -ml-[50px] h-[150px] w-[100px] sm:-mt-[7.5vw] sm:-ml-[5.25vw] sm:h-[15vw] sm:w-[10.5vw]"}`}
    >
      <Image src={image.src} alt={translateText(image.alt)} fill quality={90} sizes="(min-width: 640px) 640px, 400px" className="object-cover" />
    </motion.button>
  );
}

export default function PerspectiveGallery({ images, title, badge, description, onOpen, paused = false, showIntro = true, clipcut = false }: { images: GalleryImage[]; title?: string; badge?: string; description?: string; onOpen: (index: number) => void; paused?: boolean; showIntro?: boolean; clipcut?: boolean }) {
  const translateText = useContentTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const interactions = useRef({ hover: false, focus: false });
  const phase = useMotionValue(0.5);
  const step = useMotionValue(180);
  const reducedMotion = useReducedMotion();
  const visible = useInView(sectionRef);
  const { scrollYProgress: textProgress } = useScroll({ target: textRef, offset: ["start 85%", "end 45%"] });
  const sentence = description || `Conheça os detalhes, aplicações e diferenciais de ${title || "nossos produtos"}.`;
  const eyebrow = badge || (title ? `Explore ${title}` : "Explore e conheça");
  const count = images.length ? Math.ceil(11 / images.length) * images.length : 0;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      step.set(clipcut ? Math.max(360, width * 0.365) : width >= 640 ? width * 0.128 : 120);
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, [step, clipcut]);

  useAnimationFrame((_, delta) => {
    if (!count || !visible || paused || reducedMotion || interactions.current.hover || interactions.current.focus || document.hidden) return;
    phase.set((phase.get() + Math.min(delta, 50) * 0.00045) % count);
  });
  if (!images.length) return null;
  return (
    <section ref={sectionRef} className={`poppins overflow-hidden bg-background text-[#002d4d] dark:text-white ${clipcut ? "pt-0 pb-8" : "py-16 sm:py-20"}`}>
      {showIntro && <div className="mx-auto max-w-5xl px-6 text-center">
        <motion.span initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reducedMotion ? 0 : 0.5 }} className="inline-block rounded-full bg-white px-3 py-1.5 text-sm text-[#ff5500] shadow-[0_8px_24px_#00000020] dark:bg-[#22272b]">{translateText(eyebrow)}</motion.span>
        <h2 ref={textRef} aria-label={translateText(sentence)} className="poppins mt-8 text-[clamp(26px,3.5vw,40px)] leading-[1.12] font-light tracking-[-.025em]">
          <span aria-hidden="true">{sentence.split(" ").map((word, wordIndex, words) => {
            const firstLetter = words.slice(0, wordIndex).join(" ").length + (wordIndex ? 1 : 0);
            return <span key={wordIndex} className="inline-block">{Array.from(word).map((letter, index) => <RevealLetter key={index} letter={letter} index={firstLetter + index} total={sentence.length} progress={textProgress} />)}<span>{translateText("\u00a0")}</span></span>;
          })}</span>
        </h2>
      </div>}
      {!showIntro && <h2 ref={textRef} className="sr-only">{translateText(title || "Galeria de imagens")}</h2>}
      <div onPointerEnter={() => { interactions.current.hover = true; }} onPointerLeave={() => { interactions.current.hover = false; }} onFocusCapture={() => { interactions.current.focus = true; }} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) interactions.current.focus = false; }} style={clipcut ? { perspective: "max(320px, 31.25vw)", perspectiveOrigin: "50% 50%" } : undefined} className={`relative ${clipcut ? "h-[400px] sm:h-[35vw]" : "mt-8 h-[310px] sm:mt-0 sm:h-[33vw]"}`}>
        {Array.from({ length: count }, (_, slot) => {
          const index = slot % images.length;
          return <GalleryCard key={slot} image={images[index]} slot={slot} count={count} phase={phase} step={step} onClick={() => onOpen(index)} clipcut={clipcut} />;
        })}
      </div>
    </section>
  );
}
