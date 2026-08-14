"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import type { ProductCardData } from "../assets/data";
import { useTranslation } from "./LanguageProvider";

export const ANIMAL_IMAGES: Record<string, string> = {
  Avestruz:
    "https://d2c3kthzw0ta10.cloudfront.net/animals/avestruz.png",
  Bovino:
    "https://d2c3kthzw0ta10.cloudfront.net/animals/bovinos.png",
  Cães: "https://d2c3kthzw0ta10.cloudfront.net/animals/caninos.png",
  Capivara:
    "https://d2c3kthzw0ta10.cloudfront.net/animals/capivara.png",
  Galinha:
    "https://d2c3kthzw0ta10.cloudfront.net/animals/galinha.png",
  Javaporco:
    "https://d2c3kthzw0ta10.cloudfront.net/animals/javaporco.png",
  Suínos:
    "https://d2c3kthzw0ta10.cloudfront.net/animals/suinos.png",
  Ganso:
    "https://d2c3kthzw0ta10.cloudfront.net/animals/ganso.png",
  Caprino:
    "https://d2c3kthzw0ta10.cloudfront.net/animals/caprino.png",
  Ovinos:
    "https://d2c3kthzw0ta10.cloudfront.net/animals/ovino.png",
};

const AnimalThumb = ({ animal }: { animal: string }) => {
  const [broken, setBroken] = useState(false);
  const { dict } = useTranslation();
  const src = ANIMAL_IMAGES[animal] ?? null;
  const label = dict.animalNames[animal] ?? animal;

  return (
    <div
      title={label}
      className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#002d4d]/10 ring-1 ring-[#002d4d]/15 dark:bg-white/10 dark:ring-white/15"
    >
      {src && !broken ? (
        <img
          src={src}
          alt={label}
          className="h-full w-full object-contain p-0.5"
          onError={() => setBroken(true)}
        />
      ) : (
        <span className="text-[10px] font-semibold text-[#002d4d]/70 dark:text-white/70">
          {label.charAt(0)}
        </span>
      )}
    </div>
  );
};

const PostSpacingDiagram = ({
  value,
  label,
}: {
  value: string;
  label: string;
}) => (
  <div className="flex flex-col items-center gap-1.5">
    <svg width="176" height="66" viewBox="0 0 176 66" fill="none">
      <g className="text-[#8a94a3] dark:text-white/50" fill="currentColor">
        <rect x="4" y="4" width="7" height="52" />
        <rect x="165" y="4" width="7" height="52" />
      </g>
      <g
        className="text-[#4a5568] dark:text-white/30"
        stroke="currentColor"
        strokeWidth="1"
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={`v-${i}`}
            className="mesh-v"
            x1={19 + i * 17}
            y1="6"
            x2={19 + i * 17}
            y2="58"
          />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <line
            key={`h-${i}`}
            className="mesh-h"
            x1="12"
            y1={8 + i * 12}
            x2="164"
            y2={8 + i * 12}
          />
        ))}
      </g>
      <line
        className="dim-arrow"
        x1="12"
        y1="62"
        x2="164"
        y2="62"
        stroke="#ff5500"
        strokeWidth="1.5"
        markerStart="url(#dimStart)"
        markerEnd="url(#dimEnd)"
      />
      <defs>
        <marker
          id="dimStart"
          markerWidth="8"
          markerHeight="8"
          refX="4"
          refY="4"
          orient="auto"
        >
          <path
            d="M8,0 L0,4 L8,8"
            fill="none"
            stroke="#ff5500"
            strokeWidth="1.5"
          />
        </marker>
        <marker
          id="dimEnd"
          markerWidth="8"
          markerHeight="8"
          refX="4"
          refY="4"
          orient="auto"
        >
          <path
            d="M0,0 L8,4 L0,8"
            fill="none"
            stroke="#ff5500"
            strokeWidth="1.5"
          />
        </marker>
      </defs>
    </svg>
    <p className="mourao-label text-[10px] font-medium uppercase tracking-widest text-[#002d4d]/60 dark:text-white/60">
      {label}
    </p>
    <p className="mourao-value poppins text-xl font-bold text-[#ff5500]">
      {value}
    </p>
  </div>
);

const ProductCard = ({
  src,
  title,
  name,
  paragraph,
  shortDescription,
  postSpacing,
  animals,
  indicatedFor,
  to,
}: ProductCardData) => {
  const { dict } = useTranslation();
  const [open, setOpen] = useState(false);
  const firstRender = useRef(true);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelInnerRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<SVGSVGElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const animalRowRef = useRef<HTMLDivElement>(null);
  const hoverTlRef = useRef<gsap.core.Timeline | null>(null);

  const handleInfoPanelEnter = () => {
    hoverTlRef.current?.kill();

    const posts = diagramRef.current?.querySelectorAll("rect");
    const hLines = diagramRef.current?.querySelectorAll(".mesh-h");
    const vLines = diagramRef.current?.querySelectorAll(".mesh-v");
    const dimArrow = diagramRef.current?.querySelector(".dim-arrow");
    const label = diagramRef.current?.querySelector(".mourao-label");
    const valueEl = diagramRef.current?.querySelector(".mourao-value");
    const animalEls = animalRowRef.current?.children;

    const tl = gsap.timeline();
    hoverTlRef.current = tl;

    if (posts?.length) {
      tl.fromTo(
        posts,
        { attr: { y: -24 }, opacity: 0 },
        {
          attr: { y: 4 },
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "bounce.out",
        },
      );
    }

    if (hLines?.length) {
      tl.fromTo(
        hLines,
        { attr: { x1: 88, x2: 88 }, opacity: 0 },
        {
          attr: { x1: 12, x2: 164 },
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.15",
      );
    }

    if (vLines?.length) {
      tl.fromTo(
        vLines,
        { attr: { y1: 32, y2: 32 }, opacity: 0 },
        {
          attr: { y1: 6, y2: 58 },
          opacity: 1,
          duration: 0.3,
          stagger: 0.02,
          ease: "power2.out",
        },
        "-=0.25",
      );
    }

    if (dimArrow) {
      tl.fromTo(
        dimArrow,
        { attr: { x1: 88, x2: 88 }, opacity: 0 },
        {
          attr: { x1: 12, x2: 164 },
          opacity: 1,
          duration: 0.4,
          ease: "power3.out",
        },
        "-=0.15",
      );
    }

    if (label) {
      tl.fromTo(
        label,
        { y: 8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
        "-=0.15",
      );
    }

    if (valueEl) {
      tl.fromTo(
        valueEl,
        { y: 8, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "back.out(2)",
        },
        "-=0.15",
      );
    }

    const indicadoLabel =
      animalRowRef.current?.parentElement?.querySelector(".indicado-label");
    if (indicadoLabel) {
      tl.fromTo(
        indicadoLabel,
        { y: 8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
        "-=0.1",
      );
    }

    if (animalEls?.length) {
      tl.fromTo(
        animalEls,
        { scale: 0, y: 16, opacity: 0 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.05,
          ease: "back.out(2.5)",
        },
        "-=0.1",
      );
    }
  };

  useGSAP(() => {
    if (firstRender.current) {
      firstRender.current = false;
      gsap.set(chevronRef.current, { rotate: open ? 180 : 0 });
      if (ctaRef.current) gsap.set(ctaRef.current, { opacity: open ? 1 : 0 });
      gsap.set(panelRef.current, { height: open ? "auto" : 0 });
      return;
    }

    const panel = panelRef.current;

    gsap.to(chevronRef.current, {
      rotate: open ? 180 : 0,
      duration: 0.35,
      ease: "power2.out",
    });

    if (ctaRef.current) {
      gsap.to(ctaRef.current, {
        opacity: open ? 1 : 0,
        duration: 0.1,
        ease: "none",
        pointerEvents: open ? "auto" : "none",
      });
    }

    if (open) {
      gsap.set(panel, { height: "auto" });
      const targetHeight = panel!.offsetHeight;
      gsap.fromTo(
        panel,
        { height: 0 },
        {
          height: targetHeight,
          duration: 0.45,
          ease: "power2.out",
          onComplete: () => gsap.set(panel, { height: "auto" }),
        },
      );
      gsap.fromTo(
        panelInnerRef.current!.children,
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.35,
          stagger: 0.08,
          delay: 0.12,
          ease: "power2.out",
        },
      );
    } else {
      gsap.to(panel, { height: 0, duration: 0.35, ease: "power2.in" });
      gsap.to(panelInnerRef.current!.children, { opacity: 0, duration: 0.15 });
    }
  }, [open]);

  return (
    <div className="w-full overflow-hidden rounded-2xl bg-white shadow-lg shadow-black/5 ring-1 ring-black/5 cursor-pointer dark:bg-white/5 dark:ring-white/10">
      <div
        className="group relative h-56 overflow-hidden bg-[#f5f5f5] dark:bg-white/5 sm:h-64"
        onMouseEnter={handleInfoPanelEnter}
      >
        <div className="absolute inset-y-0 left-0 w-full transition-[width] duration-500 ease-in-out group-hover:w-2/5">
          <img
            src={src}
            alt={name}
            className="absolute inset-0 h-full w-full object-contain"
          />
          <div className="absolute bottom-4 left-5">
            <p className="font-semibold text-[#ff5500]">{name}</p>
            <p className="text-xs text-[#002d4d]/70 dark:text-white/70">
              {title}
            </p>
          </div>

          {to && (
            <Link
              ref={ctaRef}
              href={to}
              className="group/cta absolute bottom-4 right-4 rounded-full bg-[#002d4d]/10 px-6 py-2 text-xs font-medium text-[#002d4d] opacity-0 ring-1 ring-[#002d4d]/20 backdrop-blur transition-colors hover:bg-[#002d4d]/20 dark:bg-white/10 dark:text-white dark:ring-white/20 dark:hover:bg-white/20"
            >
              <span className="relative grid h-4 grid-cols-1 grid-rows-1 overflow-hidden">
                <span className="col-start-1 row-start-1 block whitespace-nowrap transition-transform duration-300 ease-out group-hover/cta:-translate-y-4">
                  {dict.productCard.likedFence}
                </span>
                <span
                  aria-hidden="true"
                  className="relative col-start-1 row-start-1 top-4 block whitespace-nowrap transition-transform duration-300 ease-out group-hover/cta:-translate-y-4"
                >
                  {dict.productCard.seeDetails}
                </span>
              </span>
            </Link>
          )}
        </div>

        {(postSpacing || animals?.length > 0 || indicatedFor?.length) && (
          <div className="absolute inset-y-0 right-0 flex w-3/5 translate-x-full flex-col items-center justify-center gap-3 bg-[#f5f5f5] p-4 text-center transition-transform duration-500 ease-in-out group-hover:translate-x-0 dark:bg-white/5">
            {postSpacing && (
              <div ref={diagramRef}>
                <PostSpacingDiagram
                  value={postSpacing}
                  label={dict.productCard.postSpacingLabel}
                />
              </div>
            )}
            {(animals?.length > 0 || indicatedFor?.length) && (
              <div>
                <p className="indicado-label mb-1.5 text-[10px] font-medium uppercase tracking-widest text-[#002d4d]/60 dark:text-white/60">
                  {dict.productCard.indicatedFor}
                </p>
                <div
                  ref={animalRowRef}
                  className="flex flex-wrap items-center justify-center gap-1.5"
                >
                  {animals?.map((animal) => (
                    <AnimalThumb key={animal} animal={animal} />
                  ))}
                  {indicatedFor?.map((use) => (
                    <div
                      key={use.name}
                      title={use.name}
                      className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#002d4d]/10 ring-1 ring-[#002d4d]/15 dark:bg-white/10 dark:ring-white/15"
                    >
                      <img
                        src={use.src}
                        alt={use.name}
                        className="h-full w-full object-contain p-0.5"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div ref={panelRef} style={{ height: 0 }} className="overflow-hidden">
        <div ref={panelInnerRef} className="space-y-3 p-5">
          <div className="flex flex-wrap gap-2">
            {paragraph.split(", ").map((spec) => (
              <span
                key={spec}
                className="inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-white/10 dark:text-white/70"
              >
                {spec.trim()}
              </span>
            ))}
          </div>
          <p className="text-sm px-4 py-4 leading-relaxed text-zinc-500 dark:text-white/60">
            {shortDescription}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={
          open ? `Recolher detalhes de ${name}` : `Ver detalhes de ${name}`
        }
        className="group flex w-full items-center justify-center gap-1.5 py-2 text-zinc-400 transition-colors hover:text-zinc-600 cursor-pointer dark:text-white/40 dark:hover:text-white/70"
      >
        <ChevronDown ref={chevronRef} size={18} />
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-medium opacity-0 transition-all duration-200 ease-out group-hover:max-w-[3rem] group-hover:opacity-100">
          {open ? "Fechar" : "Abrir"}
        </span>
      </button>
    </div>
  );
};

export default ProductCard;
