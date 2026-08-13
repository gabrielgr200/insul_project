"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useTranslation } from "./LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

const GradilProcess = () => {
  const { dict } = useTranslation();
  const p = dict.gradil.process;
  const STEPS = p.steps;
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const ringRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      const cells = rowRef.current
        ? (Array.from(rowRef.current.children) as HTMLElement[])
        : [];
      gsap.from(cells, {
        y: 50,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 78%" },
      });
    },
    { scope: rootRef },
  );

  useGSAP(
    () => {
      const ring = ringRefs.current[active];
      if (!ring) return;
      gsap.fromTo(
        ring,
        { scale: 0.9, opacity: 0.5 },
        { scale: 1.9, opacity: 0, duration: 0.7, ease: "power2.out" },
      );
    },
    { dependencies: [active], scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="bg-white px-6 pb-24 pt-0 dark:bg-zinc-950"
    >
      <div className="mx-auto w-full max-w-6xl px-6 text-center sm:text-left">
        <h3 className="INDUSTRY-LABEL text-center sm:text-left text-[#002d4d] dark:text-white font-light text-2xl poppins">
          {p.label}
        </h3>
        <div className="relative flex justify-center sm:justify-between items-end mb-12">
          <h2 className="INDUSTRY-TITLE text-center sm:text-left text-[#ff5500] text-[clamp(2.5rem,11vw,4.75rem)] lg:text-8xl impact uppercase text-nowrap leading-tight">
            {p.title}
          </h2>
        </div>
        <p className="poppins mx-auto mt-4 max-w-2xl text-[#002d4d] dark:text-zinc-400 sm:mx-0 lg:text-[18px]">
          {p.capacityLead}
          <span className="font-bold text-[#ff5500] dark:text-white">
            {p.capacityM2}
          </span>
          {p.capacityMid}
          <span className="font-bold text-[#ff5500] dark:text-white">
            {p.capacityModels}
          </span>
          .
        </p>
      </div>

      <div
        ref={rowRef}
        className="mx-auto mt-40 grid max-w-6xl grid-cols-1 items-start gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0"
      >
        {STEPS.map((step, i) => {
          const isActive = i === active;
          const isFilled = i <= active;
          const lineFilled = i < active;
          return (
            <div
              key={step.num}
              className="relative cursor-pointer text-left"
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
            >
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className={`absolute left-16 right-6 top-[21px] hidden h-[2px] rounded-full transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:block ${
                    lineFilled
                      ? "bg-[#ff5500] shadow-[0_0_8px_rgba(255,85,0,0.55)]"
                      : "bg-[#ff5500]/20"
                  }`}
                />
              )}

              <div className="relative h-11 w-11">
                <span
                  ref={(el) => {
                    ringRefs.current[i] = el;
                  }}
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-full bg-[#ff5500] opacity-0"
                />
                <div
                  className={`relative flex h-11 w-11 items-center justify-center rounded-full text-xs font-semibold transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isFilled
                      ? "bg-[#ff5500] text-white"
                      : "border border-[#ff5500]/40 bg-transparent text-[#002d4d] dark:text-white/70"
                  } ${isActive ? "scale-110 shadow-lg shadow-[#ff5500]/30" : ""}`}
                >
                  {step.num}
                </div>
              </div>

              <h3
                className={`poppins mt-5 text-lg font-bold transition-colors duration-300 ${
                  isActive ? "text-[#ff5500]" : "text-[#002d4d] dark:text-white"
                }`}
              >
                {step.title}
              </h3>

              <div
                className={`grid transition-all duration-500 ease-out ${
                  isActive
                    ? "mt-3 grid-rows-[1fr] opacity-100"
                    : "mt-0 grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="poppins max-w-[15rem] text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default GradilProcess;
