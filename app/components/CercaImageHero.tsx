"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { CercaImageHero as HeroData } from "../assets/data";

export default function CercaImageHero({ hero, color }: { hero: HeroData; color: string }) {
  const titleId = useId();
  const hasScrollTransition = Boolean(hero.scrollTransition);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollLockedRef = useRef(false);
  const transitionUnlockedRef = useRef(false);
  const waitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const releasedStageHeightRef = useRef<number | null>(null);
  const [releasedStageHeight, setReleasedStageHeight] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const blurY = useTransform(scrollY, [0, 1100], [0, -160]);
  const textY = useTransform(scrollY, [0, 650], [0, -130]);
  const firstSceneOpacity = useTransform(
    scrollYProgress,
    [0, 0.16, 0.62, 0.7, 1],
    [1, 1, 0.2, 0, 0],
  );
  const secondSceneOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.65, 0.7, 1],
    [0, 0, 1, 1, 1],
  );
  const secondTextY = useTransform(scrollYProgress, [0.3, 0.7], [70, 0]);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (
      !hasScrollTransition ||
      progress < 0.7 ||
      transitionUnlockedRef.current ||
      waitTimerRef.current
    ) {
      return;
    }

    scrollLockedRef.current = true;
    const sectionHeight = sectionRef.current?.offsetHeight ?? window.innerHeight;
    const scrollDistance = Math.max(0, sectionHeight - window.innerHeight);
    releasedStageHeightRef.current = window.innerHeight + progress * scrollDistance;
    waitTimerRef.current = setTimeout(() => {
      transitionUnlockedRef.current = true;
      scrollLockedRef.current = false;
      waitTimerRef.current = null;
      setReleasedStageHeight(releasedStageHeightRef.current);
    }, 2200);
  });

  useEffect(() => {
    scrollLockedRef.current = false;
    transitionUnlockedRef.current = false;
    if (waitTimerRef.current) clearTimeout(waitTimerRef.current);
    waitTimerRef.current = null;
    releasedStageHeightRef.current = null;
    setReleasedStageHeight(null);
  }, [hero.title, hasScrollTransition]);

  useEffect(() => {
    if (!hasScrollTransition) return;

    const preventWhileWaiting = (event: Event) => {
      if (scrollLockedRef.current) event.preventDefault();
    };
    const preventKeysWhileWaiting = (event: KeyboardEvent) => {
      if (
        scrollLockedRef.current &&
        ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)
      ) {
        event.preventDefault();
      }
    };

    window.addEventListener("wheel", preventWhileWaiting, { capture: true, passive: false });
    window.addEventListener("touchmove", preventWhileWaiting, { capture: true, passive: false });
    window.addEventListener("keydown", preventKeysWhileWaiting, true);
    return () => {
      window.removeEventListener("wheel", preventWhileWaiting, true);
      window.removeEventListener("touchmove", preventWhileWaiting, true);
      window.removeEventListener("keydown", preventKeysWhileWaiting, true);
      if (waitTimerRef.current) clearTimeout(waitTimerRef.current);
    };
  }, [hasScrollTransition]);

  return (
    <section ref={sectionRef} aria-labelledby={titleId} style={hasScrollTransition && releasedStageHeight !== null ? { height: `${releasedStageHeight}px` } : undefined} className={`poppins relative isolate bg-white text-[#002d4d] dark:bg-[#090b0c] ${hasScrollTransition ? "h-[190vh] overflow-clip" : `overflow-hidden ${hero.sectionClassName || "aspect-video"}`}`}>
      <div className={hasScrollTransition ? "sticky top-0 h-screen overflow-hidden" : "contents"}>
      {hero.background && <Image src={hero.background} alt="" fill preload sizes="100vw" className={!hasScrollTransition && hero.sectionClassName === "aspect-video" ? "object-contain" : "object-cover object-left"} />}
      {hero.scrollTransition && (
        <motion.div
          aria-hidden="true"
          style={{ opacity: secondSceneOpacity }}
          className="pointer-events-none absolute inset-0 z-[1]"
        >
          <Image
            src={hero.scrollTransition.background}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      )}
      <div className="pointer-events-none absolute inset-0">
        {hero.layers.map((layer, index) => (
          <motion.div
            key={layer.src}
            initial={layer.animated ? { opacity: 0, y: reducedMotion ? 0 : 90, x: reducedMotion ? 0 : index % 2 === 0 ? -35 : 35 } : false}
            animate={{ opacity: !layer.animated || loaded[layer.src] ? 1 : 0, y: !layer.animated || loaded[layer.src] || reducedMotion ? 0 : 90, x: !layer.animated || loaded[layer.src] || reducedMotion ? 0 : index % 2 === 0 ? -35 : 35 }}
            transition={{ duration: reducedMotion ? 0 : 1.2, delay: reducedMotion ? 0 : index * 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute inset-0 motion-safe:will-change-transform ${layer.className || ""}`}
          >
            <Image src={layer.src} alt={layer.alt} fill preload sizes="100vw" onLoad={() => setLoaded((previous) => ({ ...previous, [layer.src]: true }))} className={layer.imageClassName || "object-contain"} />
          </motion.div>
        ))}
        {hero.scrollTransition?.layers.map((layer) => (
          <motion.div
            key={layer.src}
            aria-hidden="true"
            style={{ opacity: secondSceneOpacity }}
            className={`absolute inset-0 ${layer.className || ""}`}
          >
            <Image
              src={layer.src}
              alt={layer.alt}
              fill
              sizes="100vw"
              className={layer.imageClassName || "object-cover"}
            />
          </motion.div>
        ))}
      </div>
      <motion.div aria-hidden="true" style={{ y: reducedMotion ? 0 : blurY, top: hero.blurTop || "85%" }} className="pointer-events-none absolute inset-x-0 -bottom-[160px] z-20 motion-safe:will-change-transform">
        <div className="absolute inset-0 backdrop-blur-[2px] [mask-image:linear-gradient(to_bottom,transparent,black_35%)]" />
        <div className="absolute inset-0 backdrop-blur-[5px] [mask-image:linear-gradient(to_bottom,transparent_15%,black_55%)]" />
        <div className="absolute inset-0 backdrop-blur-[10px] [mask-image:linear-gradient(to_bottom,transparent_30%,black_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,#ffffff80_25%,#ffffff_60%)] dark:bg-[linear-gradient(to_bottom,transparent_0%,#090b0c80_25%,#090b0c_60%)]" />
      </motion.div>
      <motion.div style={{ opacity: hasScrollTransition ? firstSceneOpacity : 1 }} className="absolute inset-0 z-30">
      <div className={`z-30 mx-auto max-w-7xl px-5 sm:px-10 ${hero.textClassName || "absolute inset-x-0 top-[37%]"}`}>
        <motion.div style={{ y: reducedMotion ? 0 : textY }} className={`${hero.textBoxClassName || `${hero.textAlign === "left" ? "mr-auto ml-0" : "mr-0 ml-auto"} max-w-[48%]`} text-left motion-safe:will-change-transform`}>
          <h1 id={titleId} style={{ color: hero.titleColor || color }} className="poppins mt-5 text-[clamp(22px,5vw,60px)] leading-[1.08] font-bold tracking-[-.045em]">{hero.title}{hero.titleSmallText && <span className="block text-[.56em] font-light tracking-[-.02em]">{hero.titleSmallText}</span>}</h1>
          <p style={hero.descriptionColor ? { color: hero.descriptionColor } : undefined} className="poppins mt-3 whitespace-pre-line text-[clamp(10px,1.0vw,16px)] font-light leading-relaxed text-[#002d4d] sm:text-base">{hero.description}</p>
        </motion.div>
      </div>
      </motion.div>
      {hero.scrollTransition && (
        <motion.div
          style={{
            opacity: secondSceneOpacity,
            y: reducedMotion ? 0 : secondTextY,
          }}
          className={`z-30 mx-auto max-w-7xl px-5 text-left sm:px-10 ${hero.scrollTransition.textClassName || "absolute inset-x-0 top-[26%]"}`}
        >
          <div className={hero.scrollTransition.textBoxClassName || "ml-auto max-w-[48%]"}>
            <h2 style={{ color: hero.titleColor || color }} className="poppins mt-5 text-[clamp(22px,5vw,60px)] leading-[1.08] font-bold tracking-[-.045em]">
              {hero.scrollTransition.title}
            </h2>
            <p style={hero.descriptionColor ? { color: hero.descriptionColor } : undefined} className="poppins mt-3 whitespace-pre-line text-[clamp(10px,1vw,16px)] font-light leading-relaxed text-[#002d4d] sm:text-base">
              {hero.scrollTransition.description}
            </p>
          </div>
        </motion.div>
      )}
      </div>
    </section>
  );
}
