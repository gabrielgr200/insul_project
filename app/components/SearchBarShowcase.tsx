"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useTranslation } from "./LanguageProvider";

export default function SearchBarShowcase() {
  const { dict } = useTranslation();
  const { query, suggestions, mostSearched } = dict.searchShowcase;

  const [displayedText, setDisplayedText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);

  const suggestionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const suggestBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        searchBarRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.3,
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    function getCenter(el: HTMLElement) {
      const r = el.getBoundingClientRect();
      const containerR = containerRef.current!.getBoundingClientRect();
      return {
        x: r.left - containerR.left + r.width / 2,
        y: r.top - containerR.top + r.height / 2,
      };
    }

    function moveTo(el: HTMLElement, cb: () => void) {
      const pos = getCenter(el);
      setCursorPos(pos);
      timeout = setTimeout(cb, 900);
    }

    function loop() {
      setDisplayedText("");
      setShowSuggestions(false);
      setHoveredIndex(null);
      setShowCursor(false);

      let i = 0;
      function typeChar() {
        if (i < query.length) {
          setDisplayedText(query.slice(0, i + 1));
          i++;
          timeout = setTimeout(typeChar, 55);
        } else {
          timeout = setTimeout(() => {
            setShowSuggestions(true);
            timeout = setTimeout(() => {
              setShowCursor(true);
              const s0 = suggestionRefs.current[0];
              if (s0)
                moveTo(s0, () => {
                  setHoveredIndex(0);
                  timeout = setTimeout(() => {
                    setHoveredIndex(null);
                    const s1 = suggestionRefs.current[1];
                    if (s1)
                      moveTo(s1, () => {
                        setHoveredIndex(1);
                        timeout = setTimeout(() => {
                          setHoveredIndex(null);
                          setShowCursor(false);
                          timeout = setTimeout(loop, 800);
                        }, 1200);
                      });
                  }, 900);
                });
            }, 600);
          }, 400);
        }
      }
      timeout = setTimeout(typeChar, 600);
    }

    loop();
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto flex w-full max-w-sm select-none flex-col items-center px-4 sm:max-w-md md:max-w-lg md:px-0 lg:max-w-2xl"
    >
      <div
        ref={searchBarRef}
        className="flex w-full items-center gap-3 rounded-full bg-white px-5 py-3.5 shadow-lg shadow-black/5 ring-1 ring-black/5 md:gap-4 md:px-6 md:py-4 dark:bg-white/5 dark:ring-white/10"
        style={{ opacity: 0 }}
      >
        <svg
          className="h-4 w-4 flex-shrink-0 text-[#002d4d]/40 md:h-5 md:w-5 dark:text-white/40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <span className="poppins min-h-[24px] flex-1 truncate text-sm text-[#002d4d] md:text-lg dark:text-white">
          {displayedText}
          <span className="ml-[1px] inline-block h-[18px] w-[2px] animate-pulse bg-[#002d4d] align-middle dark:bg-white" />
        </span>
      </div>

      <div
        ref={suggestBoxRef}
        className={`mt-2 w-full overflow-hidden rounded-2xl bg-white shadow-lg shadow-black/5 ring-1 ring-black/5 transition-all duration-300 dark:bg-white/5 dark:ring-white/10 ${
          showSuggestions
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        {suggestions.map((s, idx) => (
          <div
            key={idx}
            ref={(el) => {
              suggestionRefs.current[idx] = el;
            }}
            className={`flex items-center gap-3 px-5 py-3.5 text-sm transition-colors duration-150 md:gap-4 md:px-6 md:py-4 md:text-base ${
              idx !== suggestions.length - 1
                ? "border-b border-black/5 dark:border-white/10"
                : ""
            } ${hoveredIndex === idx ? "bg-black/[0.03] dark:bg-white/10" : ""}`}
          >
            <svg
              className="h-4 w-4 flex-shrink-0 text-[#002d4d]/40 md:h-5 md:w-5 dark:text-white/40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <span className="poppins truncate text-[#002d4d]/80 dark:text-white/80">
              {s}
            </span>
            <span className="ml-auto hidden flex-shrink-0 text-sm text-[#002d4d]/40 sm:inline dark:text-white/30">
              {mostSearched}
            </span>
          </div>
        ))}
      </div>

      {showCursor && (
        <div
          className="pointer-events-none absolute z-50 text-[#002d4d] transition-all duration-700 ease-in-out dark:text-white"
          style={{ left: cursorPos.x, top: cursorPos.y }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 2L4 18L8 14L11 20L13 19L10 13L16 13L4 2Z" />
          </svg>
        </div>
      )}
    </div>
  );
}
