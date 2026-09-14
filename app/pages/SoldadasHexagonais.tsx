"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import SoldadaHexagonalCarousel from "../components/SoldadaHexagonalCarousel";
import {
  soldadasHexagonaisCardsPages,
  soldadasHexagonaisCarousel,
  soldadasHexagonaisReels,
} from "../assets/data";
import CardPost from "../components/CardPost";
import TelasShowcaseArc from "../components/TelasShowcaseArc";
import BentoGallery from "../components/BentoGallery";
import FenceVisualizer from "../components/FenceVisualizer";
import SimplesTorcaoShowcase from "../components/SimplesTorcaoShowcase";
import ScrollReveal from "../components/ScrollReveal";

const soldadaCards = soldadasHexagonaisCardsPages.filter(
  (c) => c.title === "Tela Soldada",
);
const hexagonalCards = soldadasHexagonaisCardsPages.filter(
  (c) => c.title === "Tela Hexagonal",
);
const torcaoSimplesCards = soldadasHexagonaisCardsPages.filter(
  (c) => c.title === "Tela Torção Simples",
);

const SoldadasHexagonais = () => {
  const contentRef = useRef<HTMLDivElement>(null);

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
          <main className="max-w-7xl lg:max-w-6xl mx-auto px-4 sm:px-8 pb-20">
            <SoldadaHexagonalCarousel
              slides={soldadasHexagonaisCarousel}
              fullBleedMedia
            />

            <TelasShowcaseArc />
            <ScrollReveal>
              <BentoGallery
                images={[
                  {
                    src: "https://d2c3kthzw0ta10.cloudfront.net/imgs-showcase/img-gallery-PVC.png",
                    alt: "Telas PVC Insul",
                  },
                  {
                    src: "https://d2c3kthzw0ta10.cloudfront.net/videos-gallery/video-gallery-moradaLeve.mp4",
                    alt: "Video Morada leve Insul",
                  },
                  {
                    src: "https://d2c3kthzw0ta10.cloudfront.net/videos-gallery/video-gallery-hexagonais.mp4",
                    alt: "Videos hexagonais Insul",
                  },
                  {
                    src: "https://d2c3kthzw0ta10.cloudfront.net/similares-soldadas/img-morada-similar.jpg",
                    alt: "Tela Morada Insul",
                  },
                  {
                    src: "https://d2c3kthzw0ta10.cloudfront.net/imgs-showcase/img-showcase-3.webp",
                    alt: "Telas e Alambrados Insul",
                  },
                  {
                    src: "https://d2c3kthzw0ta10.cloudfront.net/similares-soldadas/img-titan-similar.jpg",
                    alt: "Tela Titan Insul",
                  },
                ]}
              />
            </ScrollReveal>

            <ScrollReveal className="text-center pt-40 pb-16">
              <h3 className="text-[#ff5500] dark:text-[#ff5500] font-bold text-3xl poppins">
                Telas Soldadas
              </h3>
              <p className="text-[#002d4d] dark:text-white font-light text-[20px] poppins">
                Resistência, praticidade e segurança para cercamentos duráveis e
                eficientes.
              </p>
            </ScrollReveal>
            <ScrollReveal className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2">
              {soldadaCards.map((card) => (
                <ProductCard key={card.name} {...card} />
              ))}
            </ScrollReveal>

            <ScrollReveal className="text-center pt-36 pb-16">
              <h3 className="text-[#ff5500] dark:text-[#ff5500] font-bold text-3xl poppins">
                Telas Hexagonais
              </h3>
              <p className="text-[#002d4d] dark:text-white font-light text-[20px] poppins">
                Versatilidade e resistência para proteção, cercamentos e
                diversas aplicações no campo.
              </p>
            </ScrollReveal>

            <ScrollReveal className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2">
              {hexagonalCards.map((card) => (
                <ProductCard key={card.name} {...card} />
              ))}
            </ScrollReveal>

            <ScrollReveal>
              <SimplesTorcaoShowcase />
            </ScrollReveal>

            <ScrollReveal className="grid grid-cols-1 items-start gap-6 pt-16 sm:grid-cols-2">
              {torcaoSimplesCards.map((card) => (
                <ProductCard key={card.name} {...card} />
              ))}
            </ScrollReveal>

            <ScrollReveal>
              <FenceVisualizer />
            </ScrollReveal>

            <ScrollReveal className="mt-16">
              <CardPost
                title="Veja alguns vídeos sobre as telas"
                description={
                  <>
                    <span className="font-bold">
                      Telas soldadas e hexagonais:
                    </span>{" "}
                    vídeos mostrando fabricação e detalhes
                  </>
                }
                reels={soldadasHexagonaisReels}
              />
            </ScrollReveal>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default SoldadasHexagonais;
