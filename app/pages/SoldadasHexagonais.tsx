"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import CercasCarousel from "../components/CercasCarousel";
import {
  soldadasHexagonaisCardsPages,
  soldadasHexagonaisCarousel,
  soldadasHexagonaisReels,
} from "../assets/data";
import CardPost from "../components/CardPost";

const soldadaCards = soldadasHexagonaisCardsPages.filter(
  (c) => c.title === "Tela Soldada",
);
const hexagonalCards = soldadasHexagonaisCardsPages.filter(
  (c) => c.title === "Tela Hexagonal",
);

const SoldadasHexagonais = () => {
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
            <CercasCarousel slides={soldadasHexagonaisCarousel} />
            <h3 className="text-center text-[#ff5500] dark:text-white font-bold text-3xl poppins pt-16 pb-6">
              Telas Soldadas
            </h3>
            <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2">
              {soldadaCards.map((card) => (
                <ProductCard key={card.name} {...card} />
              ))}
            </div>

            <h3 className="text-center text-[#ff5500] dark:text-white font-bold text-3xl poppins pt-16 pb-6">
              Telas Hexagonais
            </h3>
            <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2">
              {hexagonalCards.map((card) => (
                <ProductCard key={card.name} {...card} />
              ))}
            </div>

            <div className="mt-16">
              <CardPost
                title="Veja alguns vídeos sobre as telas"
                description={
                  <>
                    <span className="font-bold">Telas soldadas e hexagonais:</span>{" "}
                    vídeos mostrando fabricação e detalhes
                  </>
                }
                reels={soldadasHexagonaisReels}
              />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default SoldadasHexagonais;
