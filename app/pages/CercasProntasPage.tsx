"use client";

import { useEffect, useMemo, useRef } from "react";
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
  type ProductCardData,
} from "../assets/data";
import CardPost from "../components/CardPost";
import { useTranslation } from "../components/LanguageProvider";
import { localizeCerca } from "../utils/localizeCerca";

const LOCAL_CARD_SRC: Record<string, string> = {
  fenix: "https://d2c3kthzw0ta10.cloudfront.net/CercasProntas/Campeira_fenix.png",
  campeira: "https://d2c3kthzw0ta10.cloudfront.net/CercasProntas/Campeira.png",
  "campeira-maxx": "https://d2c3kthzw0ta10.cloudfront.net/CercasProntas/Campeira_maxx.png",
  "campeira-boi": "https://d2c3kthzw0ta10.cloudfront.net/CercasProntas/Campeira_boi.png",
};

const CercasProntasPage = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { dict } = useTranslation();

  const localizedCercas = useMemo(
    () => cercasProntas.map((c) => localizeCerca(c, dict.cercasProntas[c.slug])),
    [dict],
  );

  const cercasProntasCardsPages: ProductCardData[] = useMemo(
    () =>
      localizedCercas.map((c) => ({
        src: LOCAL_CARD_SRC[c.slug] ?? c.src,
        title: c.title,
        name: c.name,
        paragraph: c.paragraph,
        shortDescription: c.shortDescription,
        description: c.paragraphs.join("\n\n"),
        postSpacing: c.postSpacing,
        animals: c.animals,
        to: c.to,
      })),
    [localizedCercas],
  );

  const cercasProntasCarousel = useMemo(
    () =>
      localizedCercas.map((c) => ({
        src: c.heroSlide.src,
        label: c.name,
        hotspot: c.heroSlide.hotspot,
      })),
    [localizedCercas],
  );

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
          <main className="max-w-7xl lg:max-w-6xl mx-auto px-4 sm:px-8 pb-20">
            <CercasCarousel slides={cercasProntasCarousel} fullBleedMedia />

            <div className="mt-16 grid grid-cols-1 items-start gap-6 sm:grid-cols-2">
              {cercasProntasCardsPages.map((card) => (
                <ProductCard key={card.name} {...card} />
              ))}
            </div>

            <div className="mt-16">
              <CardPost
                title={dict.cercasProntasPage.cardPostTitle}
                description={
                  <>
                    <span className="font-bold">
                      {dict.cercasProntasPage.cardPostDescriptionLead}
                    </span>
                    {dict.cercasProntasPage.cardPostDescriptionRest}
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
