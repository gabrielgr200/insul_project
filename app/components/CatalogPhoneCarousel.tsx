"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import iosFrame from "../../public/images/Mockup-catalogo/mockup-ios.png";
import androidFrame from "../../public/images/Mockup-catalogo/mockup-android.png";
import catalog1 from "../../public/Catalogo/Capa.png";
import catalog2 from "../../public/Catalogo/Soldada_2.png";
import catalog3 from "../../public/Catalogo/Gradil_3.png";
import catalog4 from "../../public/Catalogo/Fenix_4.png";
import catalog5 from "../../public/Catalogo/Info_5.png";
import catalog6 from "../../public/Catalogo/Cerca_6.png";
import catalog7 from "../../public/Catalogo/Hexagonal_7.png";
import catalog8 from "../../public/Catalogo/Torção_8.png";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { useTranslation } from "./LanguageProvider";
import styles from "./CatalogPhoneCarousel.module.css";
import FillButton from "./FillButton";

const catalogPages = [catalog1, catalog2, catalog3, catalog4, catalog5, catalog6, catalog7, catalog8];

export default function CatalogPhoneCarousel({ onPageChange, menuOpen = false }: { onPageChange?: (page: number) => void; menuOpen?: boolean }) {
  const indicatorId = useId();
  const { locale } = useTranslation();
  const labels = {
    pt: { name: "Páginas do catálogo", previous: "Página anterior", next: "Próxima página", page: "Página", view: "Ver catálogo" },
    en: { name: "Catalog pages", previous: "Previous page", next: "Next page", page: "Page", view: "View catalog" },
    es: { name: "Páginas del catálogo", previous: "Página anterior", next: "Página siguiente", page: "Página", view: "Ver catálogo" },
  }[locale];
  const [device, setDevice] = useState<"android" | "ios">("ios");
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const pointerStart = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();
  const advance = (direction: number) => setActive((index) => (index + direction + catalogPages.length) % catalogPages.length);
  useEffect(() => { onPageChange?.(active); }, [active, onPageChange]);

  useEffect(() => {
    if (!root.current) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .25 });
    observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || menuOpen || !visible || reducedMotion) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive((index) => (index + 1) % catalogPages.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [paused, menuOpen, visible, reducedMotion, active]);

  return (
    <div data-home-entrance ref={root} className={styles.carousel} role="region" aria-label={labels.name}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}>
      <div className={styles.devices} role="group" aria-label="Android / iOS">
        {(["ios", "android"] as const).map((option) => (
          <button key={option} type="button" aria-pressed={device === option} onClick={() => setDevice(option)}>
            {device === option && (
              <motion.span className={styles.deviceIndicator} layoutId={indicatorId}
                initial={false}
                animate={{ scaleX: reducedMotion ? 1 : [1, .55, .55, 1], scaleY: reducedMotion ? 1 : [1, .55, .55, 1] }}
                transition={{ duration: reducedMotion ? 0 : .6, times: [0, .25, .65, 1], ease: "easeInOut", layout: { duration: reducedMotion ? 0 : .6, ease: [.22, 1, .36, 1] } }} />
            )}
            <span className={styles.deviceLabel}>{option === "ios" ? "iOS" : "Android"}</span>
          </button>
        ))}
      </div>
      <div className={`${styles.stage} ${device === "ios" ? styles.ios : styles.android}`} tabIndex={0} aria-label={labels.name}
        onKeyDown={(event) => { if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); advance(event.key === "ArrowDown" ? 1 : -1); } }}
        onPointerDown={(event) => { pointerStart.current = event.clientY; event.currentTarget.setPointerCapture(event.pointerId); }}
        onPointerUp={(event) => { if (pointerStart.current !== null && Math.abs(event.clientY - pointerStart.current) > 35) advance(event.clientY < pointerStart.current ? 1 : -1); pointerStart.current = null; }}
        onPointerCancel={() => { pointerStart.current = null; }}>
        <div className={styles.screen}>
        {catalogPages.map((page, index) => {
          let offset = (index - active + catalogPages.length) % catalogPages.length;
          if (offset > catalogPages.length / 2) offset -= catalogPages.length;
          const distance = Math.abs(offset);
          return (
            <motion.div key={page.src} className={styles.page} aria-hidden={index !== active}
              initial={false} animate={{ y: `${offset * 106}%`, scale: distance === 0 ? 1 : Math.max(.6, 1 - distance * .08), rotateX: offset === 0 ? 0 : offset < 0 ? -12 : 12, opacity: distance > 2 ? 0 : 1 - distance * .22, filter: `saturate(${distance === 0 ? 1 : .65})` }}
              transition={{ duration: reducedMotion ? 0 : .75, ease: [.22, 1, .36, 1] }} style={{ zIndex: 10 - distance }}>
              <Image src={page} alt={`${labels.page} ${index + 1}`} fill sizes="(min-width: 1920px) 320px, (min-width: 768px) 240px, 44vw" className={styles.catalogImage} draggable={false} />
            </motion.div>
          );
        })}
        </div>
        <div className={styles.phone} aria-hidden="true">
          <AnimatePresence initial={false}>
            <motion.div key={device} className={styles.phoneFrame}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : .45, ease: "easeInOut" }}>
              <Image src={device === "ios" ? iosFrame : androidFrame} alt="" fill sizes="(min-width: 1920px) 320px, (min-width: 768px) 240px, 44vw" draggable={false} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <FillButton className={styles.catalogLink} href="https://heyzine.com/flip-book/49699c1aec.html#page/2" target="_blank" rel="noopener noreferrer">{labels.view}<span aria-hidden="true">↗</span></FillButton>
    </div>
  );
}
