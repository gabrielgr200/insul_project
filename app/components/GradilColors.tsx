"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useTranslation } from "./LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

const COLORS = [
  { ral: "RAL 9005", name: "Preto", hex: "#0d0d0f", file: "PRETO" },
  { ral: "RAL 6005", name: "Verde", hex: "#114232", file: "VERDE" },
  { ral: "RAL 9003", name: "Branco", hex: "#ececE7", file: "BRANCO" },
  { ral: "RAL 1021", name: "Amarelo", hex: "#eec900", file: "AMARELO" },
  { ral: "RAL 5010", name: "Azul", hex: "#154c79", file: "AZUL" },
  { ral: "RAL 7040", name: "Cinza", hex: "#9da3a6", file: "CINZA" },
];

const srcFor = (file: string) =>
  `https://d2c3kthzw0ta10.cloudfront.net/Gradil_Cores/INSUL_00_GRADIL_${file}_placas.webp`;

const GradilColors = () => {
  const { dict } = useTranslation();
  const gc = dict.gradil.colors;
  const DESCRIPTIONS = gc.descriptions;
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [selected, setSelected] = useState(0);
  const [animId, setAnimId] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power1.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });

      tl.from(".INDUSTRY-LABEL", { y: 20, opacity: 0, duration: 0.5 }).from(
        ".INDUSTRY-TITLE",
        { x: -80, opacity: 0, duration: 0.8, ease: "power2.out" },
        "-=0.2",
      );
    },
    { scope: sectionRef },
  );

  const pickColor = (i: number) => {
    if (i === selected) return;
    setSelected(i);
    setAnimId((n) => n + 1);
  };

  const swapTo = (next: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
    timeoutRef.current = setTimeout(() => {
      setIndex(next);
      setVisible(true);
    }, 450);
  };

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % DESCRIPTIONS.length;
        setVisible(false);
        setTimeout(() => {
          setIndex(next);
          setVisible(true);
        }, 450);
        return prev;
      });
    }, 5000);
    return () => {
      clearInterval(id);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-white px-6 pb-24 pt-0 dark:bg-zinc-950"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-20 text-center sm:text-left">
        <h3 className="INDUSTRY-LABEL text-center sm:text-left text-[#002d4d] dark:text-white font-light text-2xl poppins">
          {gc.label}
        </h3>
        <div className="relative flex justify-center sm:justify-between items-end mb-12">
          <h2 className="INDUSTRY-TITLE text-center sm:text-left text-[#ff5500] text-[clamp(2.5rem,11vw,4.75rem)] lg:text-8xl impact uppercase text-nowrap leading-tight">
            {gc.title1} <br /> {gc.title2}
          </h2>
        </div>
        <p
          className={`poppins mx-auto mt-4 flex min-h-[4.5rem] max-w-2xl items-start text-[#002d4d] transition-opacity duration-500 ease-out dark:text-zinc-400 sm:mx-0 lg:text-[18px] ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          {DESCRIPTIONS[index]}
        </p>

        <div className="mt-4 flex justify-center gap-2 sm:justify-start">
          {DESCRIPTIONS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => swapTo(i)}
              aria-label={`Mostrar texto ${i + 1}`}
              className={`h-2 cursor-pointer rounded-full transition-all duration-500 ease-out ${
                i === index
                  ? "w-6 bg-[#ff5500]"
                  : "w-2 bg-[#002d4d]/20 hover:bg-[#002d4d]/40 dark:bg-white/20 dark:hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-[220px_1fr] lg:items-stretch">
        <div className="relative z-20 flex flex-wrap justify-center gap-3 lg:flex-col lg:justify-start">
          {COLORS.map((color, i) => {
            const isActive = i === selected;
            return (
              <button
                key={color.ral}
                type="button"
                onClick={() => pickColor(i)}
                className={`group flex cursor-pointer items-center gap-3 rounded-full border px-4 py-2.5 transition-all duration-300 ${
                  isActive
                    ? "border-[#ff5500] bg-[#ff5500]/10"
                    : "border-transparent bg-black/[0.03] hover:bg-black/[0.06] dark:bg-white/5 dark:hover:bg-white/10"
                }`}
              >
                <span
                  className="h-6 w-6 shrink-0 rounded-full ring-1 ring-black/10 dark:ring-white/20"
                  style={{ backgroundColor: color.hex }}
                />
                <span
                  className={`poppins text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-[#ff5500]"
                      : "text-[#002d4d] dark:text-white"
                  }`}
                >
                  {gc.names[color.file as keyof typeof gc.names]}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative z-0 mx-auto aspect-video w-full max-w-4xl overflow-hidden rounded-2xl bg-black/[0.03] dark:bg-white/5 lg:aspect-auto lg:h-full lg:overflow-visible">
          <AnimatePresence initial={false}>
            <motion.img
              key={animId}
              src={srcFor(COLORS[selected].file)}
              alt={`Gradil Insul — ${gc.names[COLORS[selected].file as keyof typeof gc.names]} (${COLORS[selected].ral})`}
              draggable={false}
              initial={{ x: "-100vw" }}
              animate={{ x: "0vw" }}
              exit={{ x: "100vw" }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 h-full w-full object-contain lg:inset-auto lg:left-0 lg:top-[-25%] lg:h-[150%] lg:w-full"
            />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default GradilColors;
