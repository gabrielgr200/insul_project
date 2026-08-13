"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CercasCarousel from "../components/CercasCarousel";
import ProductCard from "../components/ProductCard";
import {
  cercasProntas,
  cercasProntasReels,
  type CercaSlide,
  type ProductCardData,
} from "../assets/data";
import CardPost from "../components/CardPost";

const LOCAL_CARD_SRC: Record<string, string> = {
  fenix: "/images/CercasProntas/Campeira_fenix.png",
  campeira: "/images/CercasProntas/Campeira.png",
  "campeira-maxx": "/images/CercasProntas/Campeira_maxx.png",
  "campeira-boi": "/images/CercasProntas/Campeira_boi.png",
};

const cercasProntasCardsPages: ProductCardData[] = cercasProntas.map((c) => ({
  src: LOCAL_CARD_SRC[c.slug] ?? c.src,
  title: c.title,
  name: c.name,
  paragraph: c.paragraph,
  shortDescription: c.shortDescription,
  description: c.paragraphs.join("\n\n"),
  postSpacing: c.postSpacing,
  animals: c.animals,
  to: c.to,
}));

const cercasProntasCarousel: CercaSlide[] = cercasProntas.map((c) => ({
  src: c.heroSlide.src,
  label: c.name,
  hotspot: c.heroSlide.hotspot,
}));

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
              {cercasProntasCardsPages.map((card) => (
                <ProductCard key={card.name} {...card} />
              ))}
            </div>

            <div className="mt-16">
              <CardPost
                title="Veja sobre as cercas prontas"
                description={
                  <>
                    <span className="font-bold">Especificações e detalhes: </span>
                    acompanhe de perto como cada cerca pronta Insul se comporta
                    no campo.
                  </>
                }
                reels={cercasProntasReels}
              />
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default CercasProntasPage;
