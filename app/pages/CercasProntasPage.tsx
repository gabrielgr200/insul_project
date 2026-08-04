"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CercasCarousel from "../components/CercasCarousel";
import ProductCard from "../components/ProductCard";
import { cercasProntasCarousel, poductsCardsPages } from "../assets/data";
import CardPost from "../components/CardPost";

const CercasProntasPage = () => {
  const contentRef = useRef<HTMLDivElement>(null);

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

    const initialRefresh = setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(refreshTimeout);
      clearTimeout(initialRefresh);
      resizeObserver.disconnect();
      smoother && smoother.kill();
    };
  }, []);

  return (
    <div className="min-h-screen overflow-clip">
      <Header />

      <div id="smooth-wrapper">
        <div id="smooth-content" ref={contentRef}>
          <main className="max-w-7xl lg:max-w-6xl mx-auto px-4 sm:px-8 pt-44 pb-20">
            <CercasCarousel slides={cercasProntasCarousel} />

            <div className="mt-16 grid grid-cols-1 items-start gap-6 sm:grid-cols-2">
              {poductsCardsPages.map((card) => (
                <ProductCard key={card.name} {...card} />
              ))}
            </div>

            <div className="mt-16">
              <CardPost />
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default CercasProntasPage;
