"use client";

import { useLayoutEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useTranslation } from "./LanguageProvider";

gsap.registerPlugin(ScrollTrigger, SplitText);

/** Word-by-word blur and lift, without changing the element's typography. */
export function useScrollTextReveal(ref: RefObject<HTMLElement | null>, selector: string) {
  const { locale } = useTranslation();

  useLayoutEffect(() => {
    let cancelled = false;
    let context: gsap.Context | undefined;
    const splits: SplitText[] = [];
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const clear = () => {
      context?.revert();
      context = undefined;
      splits.splice(0).forEach((split) => split.revert());
    };
    const setup = () => {
      clear();
      if (cancelled || media.matches || !ref.current) return;
      context = gsap.context(() => {
        ref.current!.querySelectorAll<HTMLElement>(selector).forEach((element) => {
          const split = new SplitText(element, {
            type: "words",
            wordsClass: "scroll-reveal-word",
            reduceWhiteSpace: false,
            aria: "auto",
          });
          splits.push(split);
          gsap.fromTo(split.words,
            { opacity: 0, y: 28, filter: "blur(6px)" },
            {
              opacity: 1, y: 0, filter: "blur(0px)",
              duration: 0.85, ease: "power3.out",
              stagger: Math.min(0.065, 0.8 / Math.max(1, split.words.length)),
              scrollTrigger: { trigger: element, start: "top 90%", once: true },
              onComplete: () => { gsap.set(split.words, { clearProps: "transform,filter,opacity" }); },
            },
          );
        });
      }, ref);
    };
    document.fonts.ready.then(setup);
    media.addEventListener("change", setup);
    return () => {
      cancelled = true;
      media.removeEventListener("change", setup);
      clear();
    };
  }, [ref, selector, locale]);
}
