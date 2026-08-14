"use client";

import Header from "../components/Header";
import Hero from "../components/Hero";
import Partners from "../components/Partners";
import PartnersLogos from "../components/PartnersLogos";
import SearchBarShowcase from "../components/SearchBarShowcase";
import { IndustryHeader, IndustryTimeline } from "../components/Industry";
import Products from "../components/Products";
import Loader from "../components/Loader";
import { useState, useEffect, useRef } from "react";
import { useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Book from "../components/Book";
import VideoShowcase from "../components/VideoShowcase";
import TextReveal from "../components/TextReveal";
import Distribution from "../components/Distribution";
import Frequently from "../components/Frequently";
import Footer from "../components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { scrollToSection } from "../utils/ScrollToSection";
import { hasSiteLoaded, markSiteLoaded } from "../utils/siteLoaded";
import { useTranslation } from "../components/LanguageProvider";

const HomePage = () => {
  const [loading, setLoading] = useState(() => !hasSiteLoaded());
  const handleComplete = useCallback(() => {
    markSiteLoaded();
    setLoading(false);
  }, []);
  const contentRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
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
      <AnimatePresence mode="wait">
        {loading && (
          <Loader
            key="loader"
            brandName="INSUL"
            duration={3}
            onComplete={handleComplete}
          />
        )}
      </AnimatePresence>
      <Header />
      <div id="smooth-wrapper">
        <main id="smooth-content" ref={contentRef} className="pt-px">
          <hr className="text-zinc-800 -mt-2" />
          <Hero ready={!loading} />
          <h3 className="text-center text-[#002d4d] dark:text-white font-bold text-2xl poppins py-20">
            {t("home.numerosTitulo")}
          </h3>
          <Partners />
          <PartnersLogos />
          <section className="py-20 sm:py-28">
            <SearchBarShowcase />
          </section>
          <VideoShowcase />
          <IndustryHeader />
          <TextReveal />
          <IndustryTimeline />
          <hr className="text-zinc-100" />
          <Products />
          <hr className="text-zinc-100" />
          <Book />
          <hr className="text-zinc-100" />
          <Distribution />
          <Frequently />
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default HomePage;
