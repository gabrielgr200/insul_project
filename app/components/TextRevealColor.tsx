"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

type TextRevealColorProps = {
  text: string;
  className?: string;
};

const ACCENT = "#ff5500";
const BASE_LIGHT = "#2c2c2c";
const BASE_DARK = "#ffffff";

const gradientFor = (base: string) =>
  `linear-gradient(to right, ${ACCENT} 0%, ${ACCENT} 42%, ${base} 58%, ${base} 100%)`;

const TextRevealColor = ({ text, className = "" }: TextRevealColorProps) => {
  const ref = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    let ctx: gsap.Context | undefined;

    const build = () => {
      ctx?.revert();
      if (!ref.current) return;
      const isDark = document.documentElement.classList.contains("dark");
      const base = isDark ? BASE_DARK : BASE_LIGHT;

      ctx = gsap.context(() => {
        gsap.set(".tr-word", { backgroundImage: gradientFor(base) });
        gsap.fromTo(
          ".tr-word",
          { backgroundPosition: "100% 0" },
          {
            backgroundPosition: "0% 0",
            ease: "none",
            duration: 1,
            stagger: 0.6,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
              end: "top 30%",
              scrub: true,
            },
          },
        );
      }, ref);
    };

    build();

    const obs = new MutationObserver(() => build());
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    return () => {
      obs.disconnect();
      ctx?.revert();
    };
  }, [text]);

  const words = text.split(" ");

  return (
    <p ref={ref} className={`poppins font-bold ${className}`}>
      {words.map((word, i) => (
        <span
          key={i}
          className="tr-word"
          style={{
            backgroundImage: gradientFor(BASE_LIGHT),
            backgroundSize: "300% 100%",
            backgroundPosition: "100% 0",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
};

export default TextRevealColor;
