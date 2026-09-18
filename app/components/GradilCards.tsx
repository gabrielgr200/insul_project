"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useTranslation } from "./LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

const GradilCards = () => {
  const { dict } = useTranslation();
  const CARDS = dict.gradil.cards;
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = rowRef.current
        ? (Array.from(rowRef.current.children) as HTMLElement[])
        : [];
      gsap.from(cards, {
        y: 60,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 78%",
          toggleActions: "play reverse play reverse",
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="bg-white px-6 py-24 dark:bg-zinc-950"
    >
      <div className="mx-auto max-w-6xl">
        <div ref={rowRef} className="flex h-35 gap-3 sm:h-40">
          {CARDS.map((card, i) => {
            const isActive = i === active;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                style={{ flexGrow: isActive ? 4 : 1 }}
                className="group relative flex min-w-0 cursor-pointer flex-col justify-center overflow-hidden rounded-2xl bg-black/3 p-5 text-left shadow-sm transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] dark:bg-white/5 sm:p-7"
              >
                <div className="min-w-0">
                  <h3 className="poppins truncate text-lg font-bold text-[#ff5500] dark:text-white sm:text-xl">
                    {card.title}
                  </h3>
                  <p
                    className={`poppins mt-1 truncate text-sm text-zinc-500 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] dark:text-zinc-400 ${
                      isActive
                        ? "translate-y-0 opacity-100 delay-200"
                        : "-translate-y-1 opacity-0"
                    }`}
                  >
                    {card.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="relative mt-8">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-zinc-300 dark:bg-zinc-700" />
          <div className="relative flex gap-3">
            {CARDS.map((_, i) => {
              const isActive = i === active;
              return (
                <div
                  key={i}
                  style={{ flexGrow: isActive ? 4 : 1 }}
                  className="flex min-w-0 justify-center transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className={`poppins h-9 min-w-12 cursor-pointer rounded-full px-4 text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? "bg-[#002d4d] text-white shadow-md dark:bg-white dark:text-[#002d4d]"
                        : "bg-white text-[#002d4d] shadow-sm dark:bg-zinc-800 dark:text-zinc-300"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GradilCards;
