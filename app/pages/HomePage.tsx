"use client";

import Header from "../components/Header";
import Hero from "../components/Hero";
import Partners from "../components/Partners";
import PartnersLogos from "../components/PartnersLogos";
import SearchBarShowcase from "../components/SearchBarShowcase";
import { IndustryHeader, IndustryTimeline } from "../components/Industry";
import Products from "../components/Products";
import Loader from "../components/Loader";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import VideoShowcase from "../components/VideoShowcase";
import TextReveal from "../components/TextReveal";
import Distribution from "../components/Distribution";
import Frequently from "../components/Frequently";
import Footer from "../components/Footer";
import { useScrollTextReveal } from "../components/useScrollTextReveal";
import { useHomeEntrance } from "../components/useHomeEntrance";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { scrollToSection } from "../utils/ScrollToSection";
import { hasSiteLoaded, markSiteLoaded } from "../utils/siteLoaded";
import { useTranslation } from "../components/LanguageProvider";

const Book = dynamic(() => import("../components/Book"), {
  ssr: false,
  loading: () => (
    <div className="mx-auto h-[508px] max-w-[800px] animate-pulse rounded-2xl bg-black/5 dark:bg-white/5" />
  ),
});

const HomePage = () => {
  const reducedMotion = useReducedMotion();
  const [loading, setLoading] = useState(() => !hasSiteLoaded());
  const [entranceReady, setEntranceReady] = useState(() => hasSiteLoaded());
  const handleComplete = useCallback(() => {
    markSiteLoaded();
    setLoading(false);
  }, []);
  const contentRef = useRef(null);
  const { t } = useTranslation();
  useScrollTextReveal(contentRef, ".home-numbers-title, [data-home-statistics] p");
  useHomeEntrance(contentRef, entranceReady);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.8,
      effects: true,
      normalizeScroll: true,
    });

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleLoad);

    let refreshTimeout: ReturnType<typeof setTimeout>;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(refreshTimeout);
      refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 200);
    });
    if (contentRef.current) resizeObserver.observe(contentRef.current);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(refreshTimeout);
      resizeObserver.disconnect();
      smoother && smoother.kill();
    };
  }, []);

  useEffect(() => {
    if (loading) return;
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
      const hash = window.location.hash.replace("#", "");
      if (hash) scrollToSection(hash);
    }, 950);
    return () => clearTimeout(timeout);
  }, [loading]);

  return (
    <div className="min-h-screen overflow-clip">
      <AnimatePresence mode="wait" onExitComplete={() => setEntranceReady(true)}>
        {loading && (
          <Loader
            key="loader"
            brandName="INSUL"
            duration={3}
            onComplete={handleComplete}
          />
        )}
      </AnimatePresence>
      <motion.div
        className="relative z-[150]"
        inert={!entranceReady}
        aria-hidden={!entranceReady}
        initial={{ opacity: 0 }}
        animate={{ opacity: entranceReady ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{ visibility: entranceReady ? "visible" : "hidden" }}
      ><Header /></motion.div>
      <motion.div
        id="smooth-wrapper"
        inert={!entranceReady}
        aria-hidden={!entranceReady}
        initial={{ opacity: 0 }}
        animate={{ opacity: entranceReady ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.95, ease: [0.22, 1, 0.36, 1] }}
        style={{ visibility: entranceReady ? "visible" : "hidden" }}
      >
        <main id="smooth-content" ref={contentRef} className="pt-px">
          <hr className="text-zinc-800 -mt-2" />
          <Hero ready={entranceReady} />
          <h3 className="home-numbers-title text-center text-[#002d4d] dark:text-white font-bold text-2xl poppins py-20">
            {t("home.numerosTitulo")}
          </h3>
          <div data-home-statistics><Partners /></div>
          <PartnersLogos />
          <section className="py-20 sm:py-28">
            <SearchBarShowcase />
          </section>
          <VideoShowcase />
          <section className="py-20 sm:py-28">
            <IndustryHeader />
          </section>
          <div data-home-reveal-preserved><TextReveal /></div>
          <div data-home-reveal-preserved><IndustryTimeline /></div>
          {/* <hr className="text-zinc-100" /> */}
          <Products />
          {/* <hr className="text-zinc-100" /> */}
          <Book />
          {/* <hr className="text-zinc-100" /> */}
          <Distribution />
          <Frequently />
          <Footer />
        </main>
      </motion.div>
    </div>
  );
};

export default HomePage;
