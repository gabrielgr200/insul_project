"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { CercaImageHero as HeroData } from "../assets/data";

export default function CercaImageHero({ hero, color }: { hero: HeroData; color: string }) {
  const titleId = useId();
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const landscapeY = useTransform(scrollY, [0, 1100], [0, 160]);
  const blurY = useTransform(scrollY, [0, 1100], [0, -160]);
  const textY = useTransform(scrollY, [0, 650], [0, -130]);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});

  return (
    <section aria-labelledby={titleId} className={`poppins relative isolate overflow-hidden bg-white text-[#002d4d] dark:bg-[#090b0c] ${hero.sectionClassName || "aspect-video"}`}>
      {hero.background && <Image src={hero.background} alt="" fill preload sizes="100vw" className={hero.sectionClassName === "aspect-video" ? "object-contain" : "object-cover object-left"} />}
      <motion.div style={{ y: reducedMotion ? 0 : landscapeY }} className="pointer-events-none absolute inset-0 motion-safe:will-change-transform">
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
      </motion.div>
      <motion.div aria-hidden="true" style={{ y: reducedMotion ? 0 : blurY, top: hero.blurTop || "85%" }} className="pointer-events-none absolute inset-x-0 -bottom-[160px] z-20 motion-safe:will-change-transform">
        <div className="absolute inset-0 backdrop-blur-[2px] [mask-image:linear-gradient(to_bottom,transparent,black_35%)]" />
        <div className="absolute inset-0 backdrop-blur-[5px] [mask-image:linear-gradient(to_bottom,transparent_15%,black_55%)]" />
        <div className="absolute inset-0 backdrop-blur-[10px] [mask-image:linear-gradient(to_bottom,transparent_30%,black_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,#ffffff80_25%,#ffffff_60%)] dark:bg-[linear-gradient(to_bottom,transparent_0%,#090b0c80_25%,#090b0c_60%)]" />
      </motion.div>
      <div className={`z-30 mx-auto max-w-7xl px-5 sm:px-10 ${hero.textClassName || "absolute inset-x-0 top-[37%]"}`}>
        <motion.div style={{ y: reducedMotion ? 0 : textY }} className="mr-0 ml-auto max-w-[48%] text-left motion-safe:will-change-transform">
          <h1 id={titleId} style={{ color }} className="mt-5 text-[clamp(22px,5vw,68px)] leading-[1.08] font-bold tracking-[-.045em]">{hero.title}</h1>
          <p className="mt-3 text-[clamp(10px,1.2vw,16px)] font-normal leading-relaxed text-white sm:text-base">{hero.description}</p>
        </motion.div>
      </div>
    </section>
  );
}
