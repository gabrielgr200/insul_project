"use client";

import { useTranslation } from "./LanguageProvider";
import { useContentTranslation } from "./LanguageProvider";
import { useEffect, useRef } from "react";

const GuaranteeGradil = () => {
  const translateText = useContentTranslation();
  const { dict, locale } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const g = dict.gradil.guarantee;
  useEffect(() => {
    const video = videoRef.current;
    if (!video || locale !== "pt") return;
    const media = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    let visible = false;
    const update = () => {
      if (media.matches && visible && !document.hidden) void video.play().catch(() => {});
      else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(video);
    media.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); media.removeEventListener("change", update); document.removeEventListener("visibilitychange", update); video.pause(); };
  }, [locale]);
  return (
    <section className="overflow-hidden bg-gradient-to-r from-[#ff5500] via-[#d94400] to-[#a83400]">
      {locale === "pt" && <div className="relative hidden lg:block motion-reduce:lg:hidden">
        <video ref={videoRef} src="/videos/motion_gradil.mp4" poster="/videos/motion-gradil-preview.jpg" width={3840} height={560} muted loop playsInline preload="metadata" aria-hidden="true" className="block h-auto w-full" />
        <div className="sr-only"><h2>{g.title1} {g.title2}</h2><p>{g.side}</p></div>
      </div>}
      <div className={`px-6 py-16 sm:py-20 ${locale === "pt" ? "lg:hidden motion-reduce:lg:block" : ""}`}>
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-center md:justify-between md:gap-8">
        <div className="flex items-center gap-6">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="h-20 w-20 shrink-0 text-white lg:h-24 lg:w-24"
          >
            <path d="M12 2.75l7.25 2.75v5.5c0 4.75-3.1 8.2-7.25 9.75-4.15-1.55-7.25-5-7.25-9.75v-5.5L12 2.75z" />
            <path d="M8.5 12.2l2.4 2.4 4.6-4.8" />
          </svg>

          <div>
            <h2 className="poppins text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-[2.1rem]">
              {translateText(g.title1)}
              <br /> {translateText(g.title2)}
            </h2>
            <p className="poppins mt-3 text-sm text-white/85">{translateText(g.note)}</p>
          </div>
        </div>

        <div className="hidden h-28 w-px shrink-0 bg-white/40 md:block" />

        <p className="poppins max-w-md text-base font-light leading-relaxed text-white sm:text-lg">
          {translateText(g.side)}
        </p>
      </div>
      </div>
    </section>
  );
};

export default GuaranteeGradil;
