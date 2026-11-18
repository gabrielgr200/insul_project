"use client";

import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";

/** Observe individual elements, including content mounted after the initial render. */
export function useHomeEntrance(ref: RefObject<HTMLElement | null>, ready: boolean) {
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || !ready) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const seen = new WeakSet<Element>();
      const context = gsap.context(() => {}, root);
      const navbarElements = Array.from(document.querySelectorAll<HTMLElement>(
        "header > div > a, header > div > nav > *, header > div > div:not([aria-hidden]) > *",
      )).filter(element => element.getClientRects().length > 0);
      if (navbarElements.length) context.add(() => {
        // CSS transition-all must not trail the transform/opacity updated by GSAP.
        gsap.set(navbarElements, { transition: "none" });
        gsap.from(navbarElements, {
          y: 24, autoAlpha: 0, duration: 0.65, stagger: 0.1,
          ease: "power3.out", clearProps: "opacity,visibility,transform,transition",
        });
      });
      let cardsEntrance: gsap.core.Timeline;
      context.add(() => { cardsEntrance = gsap.timeline(); });
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          context.add(() => {
            const animation = { autoAlpha: 1, x: 0, y: 0, duration: 0.95,
              ease: "power3.out", clearProps: "opacity,visibility,transform" };
            if (element.matches("#products-carousel > article, [data-home-entrance='left']")) {
              cardsEntrance.to(element, animation, Math.max(cardsEntrance.duration(), cardsEntrance.time()));
            } else {
              gsap.to(element, animation);
            }
          });
          observer.unobserve(element);
        });
      }, { threshold: 0.12 });
      const collect = () => {
        root.querySelectorAll<HTMLElement>("h1,h2,h3,h4,p,button,a[data-home-button],#products-carousel > article,[data-home-entrance]").forEach(element => {
          if (seen.has(element) || element.closest("#inicio, [data-home-reveal-preserved], [aria-hidden='true']")) return;
          if (element.parentElement?.closest("[data-home-entrance]")) return;
          // These texts already have their own word-by-word entrance.
          if (element.matches(".home-numbers-title,.PRODUCTS-TITLE,.DISTRIBUTION-TEXT,.INDUSTRY-LABEL,.INDUSTRY-TITLE,.INDUSTRY-TEXT,.BOOK-LABEL,.BOOK-TITLE,.BOOK-TEXT > p,[data-catalog-description],.DISTRIBUTION-LABEL,.DISTRIBUTION-TITLE,.faq-heading,.faq-description") || element.closest("#products-carousel > article" ) && element.tagName !== "ARTICLE") return;
          if (element.closest("[data-home-statistics]") && element.tagName === "P") return;
          seen.add(element);
          context.add(() => gsap.set(element, { autoAlpha: 0,
            x: element.matches("article,[data-home-entrance='left']") ? -64 : 0,
            y: element.matches("article,[data-home-entrance='left']") ? 0 : 30 }));
          observer.observe(element);
        });
      };
      collect();
      const mutations = new MutationObserver(collect);
      mutations.observe(root, { childList: true, subtree: true });
      return () => { observer.disconnect(); mutations.disconnect(); context.revert(); };
    });
    return () => media.revert();
  }, [ref, ready]);
}
