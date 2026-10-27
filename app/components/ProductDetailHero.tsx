"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowDown, ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useContentTranslation } from "./LanguageProvider";
import styles from "./ProductDetailHero.module.css";

type Props = { name: string; category: string; description: string; image: string; specifications?: string; circularOrbit?: boolean; imageScale?: number };

export default function ProductDetailHero({ name, category, description, image, specifications, circularOrbit = false, imageScale = 1 }: Props) {
  const text = useContentTranslation();
  const reducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 100, damping: 22 });
  const rotateY = useSpring(y, { stiffness: 100, damping: 22 });
  const details = (specifications || category).split(/,\s+/).map(value => value.trim()).filter(Boolean).slice(0, 3);

  return (
    <section className={`${styles.hero} poppins`} aria-labelledby="product-hero-title">
      <div className={styles.grid}>
        <motion.div className={styles.copy} initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h1 id="product-hero-title" className="poppins font-bold">{text(name.replace(/ Insul$/i, ""))}<span>.</span></h1>
          <p className={`${styles.description} font-light poppins`}>{text(description)}</p>
        </motion.div>
        <div className={`${styles.visual} ${hovered ? styles.productHovered : ""}`} onPointerMove={event => {
          if (circularOrbit || reducedMotion || event.pointerType === "touch") return;
          const bounds = event.currentTarget.getBoundingClientRect();
          x.set((0.5 - (event.clientY - bounds.top) / bounds.height) * 10);
          y.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 12);
        }} onPointerLeave={() => { x.set(0); y.set(0); }}>
          <div className={`${styles.orbit} ${circularOrbit ? styles.circularOrbit : ""}`} aria-hidden="true">
            {circularOrbit && <><span className={styles.waveRing} /><span className={styles.waveRing} /><span className={styles.waveRing} /></>}
          </div>
          <span className={`${styles.cross} ${styles.topLeft}`} aria-hidden="true">+</span><span className={`${styles.cross} ${styles.bottomRight}`} aria-hidden="true">+</span>
          <motion.div className={styles.product} style={{ rotateX, rotateY }}
            onPointerEnter={event => { if (circularOrbit && !reducedMotion && event.pointerType !== "touch") setHovered(true); }}
            onPointerMove={event => {
              if (!circularOrbit || reducedMotion || event.pointerType === "touch") return;
              const bounds = event.currentTarget.getBoundingClientRect();
              x.set((0.5 - (event.clientY - bounds.top) / bounds.height) * 10);
              y.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 12);
            }}
            onPointerLeave={() => { setHovered(false); x.set(0); y.set(0); }}
            initial={{ opacity: 0, y: reducedMotion ? 0 : 30, scale: imageScale }}
            animate={{ opacity: 1, y: 0, scale: imageScale * (hovered ? 1.08 : 1) }}
            transition={{ opacity: { duration: 0.9, delay: 0.15 }, y: { duration: 0.9, delay: 0.15 }, scale: { duration: 0.4, ease: "easeOut" } }}>
            <Image src={image} alt={text(name)} fill preload unoptimized sizes="(min-width: 1920px) 850px, (min-width: 1024px) 48vw, 90vw" className="object-contain" />
          </motion.div>
          <div className={`${styles.note} ${styles.noteTop}`}><span className={styles.noteIcon}><ShieldCheck size={21} /></span><div><small>INSUL</small><strong>{text(category)}</strong></div><Check size={16} /></div>
          <div className={`${styles.note} ${styles.noteBottom}`}><span className={styles.noteIcon}><Check size={20} /></span><div><small>{text(category)}</small><strong>{text(name)}</strong></div></div>
        </div>
      </div>
      <div className={styles.caption}><span>01 — {text(name)}</span><span>INSUL</span></div>
    </section>
  );
}
