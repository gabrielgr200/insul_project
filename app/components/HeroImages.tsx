"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useTranslation } from "./LanguageProvider";

const images = [
  { src: "/images/img-hero-animation/simples-torção.png", label: "Simples torção", left: "10%", width: "90%", bottom: "10%" },
  { src: "/images/img-hero-animation/campeiraJava.png", label: "Campeira Java", left: "-5%", width: "90%", bottom: "0%" },
  { src: "/images/img-hero-animation/mangueirão16.png", label: "Mangueirão", left: "30%", width: "90%", bottom: "0%" },
  { src: "/images/img-hero-animation/morada.png", label: "Morada", left: "15%", width: "75%", bottom: "0%" },
];

const HeroImages = ({ ready = true }: { ready?: boolean }) => {
  const { t } = useTranslation();
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ready || !rootRef.current) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const slides = gsap.utils.toArray<HTMLElement>("[data-hero-slide]", rootRef.current);
      gsap.set(slides, { autoAlpha: 0, xPercent: 110, scale: 0.4, transformOrigin: "50% 100%" });
      const timeline = gsap.timeline({ delay: 0.35 });
      slides.forEach(slide => {
        timeline
          .to(slide, { autoAlpha: 1, xPercent: 0, scale: 0.86, duration: 1.25, ease: "power3.out" })
          .to(slide, { scale: 1, duration: 0.9, ease: "sine.inOut" });
      });
      const pause = () => document.hidden ? timeline.pause() : timeline.resume();
      document.addEventListener("visibilitychange", pause);
      return () => document.removeEventListener("visibilitychange", pause);
    }, rootRef);
    return () => media.revert();
  }, [ready]);

  return (
    <div ref={rootRef} className="relative aspect-square w-full overflow-hidden" style={{ visibility: ready ? "visible" : "hidden" }}>
      {images.map(({ src, label, left, width, bottom }, index) => (
        <div key={src} data-hero-slide className="absolute aspect-square" style={{ left, width, bottom, zIndex: index + 1 }}>
          <Image
            src={src}
            alt={`${t("hero.imagemAlt")} — ${label}`}
            fill
            sizes="(min-width: 1920px) 70vw, (min-width: 1024px) 65vw, (min-width: 640px) 80vw, 58vw"
            preload={index === 0}
            loading={index === 0 ? undefined : "eager"}
            className="object-contain saturate-120"
          />
        </div>
      ))}
    </div>
  );
};

export default HeroImages;
