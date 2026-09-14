"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
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
import TelasShowcaseArc from "../components/TelasShowcaseArc";
import BentoGallery from "../components/BentoGallery";
import FenceVisualizer, {
  type FenceVisualizerItem,
} from "../components/FenceVisualizer";
import ScrollReveal from "../components/ScrollReveal";

const LOCAL_CARD_SRC: Record<string, string> = {
  fenix: "https://d2c3kthzw0ta10.cloudfront.net/CercasProntas/Campeira_fenix.png",
  campeira: "https://d2c3kthzw0ta10.cloudfront.net/CercasProntas/Campeira.png",
  "campeira-maxx": "https://d2c3kthzw0ta10.cloudfront.net/CercasProntas/Campeira_maxx.png",
  "campeira-boi": "https://d2c3kthzw0ta10.cloudfront.net/CercasProntas/Campeira_boi.png",
};

const ARC_IMAGES = [
  { src: "https://d2c3kthzw0ta10.cloudfront.net/img_fenix_carousel/1.jpeg", alt: "Cerca Fênix Insul" },
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/img_campeira_carousel/img_campeira_1.jpg",
    alt: "Cerca Campeira Insul",
  },
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/img_campeiraBoi_carousel/campeira-img-1.jpg",
    alt: "Cerca Campeira Boi Insul",
  },
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/img_campeiraMaxx_carousel/img-maxx-1.jpeg",
    alt: "Cerca Campeira Maxx Insul",
  },
  { src: "https://d2c3kthzw0ta10.cloudfront.net/img_fenix_carousel/3.jpeg", alt: "Cerca Fênix Insul" },
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/img_campeira_carousel/img_campeira_3.jpg",
    alt: "Cerca Campeira Insul",
  },
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/img_campeiraBoi_carousel/campeira-img-3.jpg",
    alt: "Cerca Campeira Boi Insul",
  },
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/img_campeiraMaxx_carousel/img-maxx-3.png",
    alt: "Cerca Campeira Maxx Insul",
  },
  { src: "https://d2c3kthzw0ta10.cloudfront.net/img_fenix_carousel/5.jpeg", alt: "Cerca Fênix Insul" },
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/img_campeira_carousel/img_campeira_5.jpg",
    alt: "Cerca Campeira Insul",
  },
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/img_campeiraBoi_carousel/campeira-img-5.jpg",
    alt: "Cerca Campeira Boi Insul",
  },
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/img_campeiraMaxx_carousel/img-maxx-5.jpg",
    alt: "Cerca Campeira Maxx Insul",
  },
];

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

  const fenceVisualizerItems: FenceVisualizerItem[] = useMemo(
    () =>
      localizedCercas.map((c) => ({
        slug: c.slug,
        name: c.name,
        src: LOCAL_CARD_SRC[c.slug] ?? c.src,
        paragraph: c.paragraph,
        color: c.color,
      })),
    [localizedCercas],
  );

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
            <CercasCarousel slides={cercasProntasCarousel} fullBleedMedia />

            <TelasShowcaseArc
              images={ARC_IMAGES}
              eyebrow="Cercas Insul"
              heading={
                <>
                  Sua propriedade. <br /> Seu espaço. <br /> A cerca certa.
                </>
              }
              headingClassName="poppins font-bold pt-6 pb-8 text-4xl text-[#002d4d] sm:text-5xl dark:text-white"
              description={
                <>
                  Da contenção de gado à segurança do sítio, <br /> a Insul tem
                  a cerca pronta certa pra sua área.
                </>
              }
            />
            <ScrollReveal>
              <BentoGallery
                images={[
                {
                  src: "https://d2c3kthzw0ta10.cloudfront.net/imgs-showcase/img-gallery-1.png",
                  alt: "Cercas prontas Insul",
                },
                {
                  src: "https://d2c3kthzw0ta10.cloudfront.net/videos-gallery/gallery-1.mp4",
                  alt: "Cerca Fênix Insul",
                },
                {
                  src: "https://d2c3kthzw0ta10.cloudfront.net/videos-gallery/gallery-2.mp4",
                  alt: "Cerca Campeira Insul",
                },
                {
                  src: "https://d2c3kthzw0ta10.cloudfront.net/img_campeiraBoi_carousel/campeira-img-5.jpg",
                  alt: "Cerca Campeira Boi Insul",
                },
                {
                  src: "https://d2c3kthzw0ta10.cloudfront.net/img_fenix_carousel/5.jpeg",
                  alt: "Cerca Campeira Fênix Insul",
                },
                {
                  src: "https://d2c3kthzw0ta10.cloudfront.net/img_campeira_carousel/img_campeira_3.jpg",
                  alt: "Cerca Campeira Insul",
                },
              ]}
              />
            </ScrollReveal>

            <ScrollReveal className="mt-16 grid grid-cols-1 items-start gap-6 sm:grid-cols-2">
              {cercasProntasCardsPages.map((card) => (
                <ProductCard key={card.name} {...card} />
              ))}
            </ScrollReveal>

            <ScrollReveal>
              <FenceVisualizer
                items={fenceVisualizerItems}
                categories={["Todas"]}
                heading="Veja a cerca no seu terreno"
                description="Envie uma foto do seu terreno, escolha o modelo de cerca e visualize como fica antes e depois da instalação."
                stepTwoLabel="2. Modelo de cerca"
                simulationLabel={(name) => (
                  <>Simulação ilustrativa com a {name} — arraste o círculo para comparar.</>
                )}
              />
            </ScrollReveal>

            <ScrollReveal className="mt-16">
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
            </ScrollReveal>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default CercasProntasPage;
