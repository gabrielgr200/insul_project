"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { notFound } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ImgCarousel from "../components/ImgCarousel";
import BlurRevealText from "../components/BlurRevealText";
import VideoCardCarousel from "../components/VideoCardCarousel";
import VideoCard3D from "../components/VideoCard3DLazy";
import CercaImageHero from "../components/CercaImageHero";
import CercaShowcaseTeste from "../components/CercaShowcaseTeste";
import SimilarProducts, {
  type SimilarProductItem,
} from "../components/SimilarProducts";
import ScrollReveal from "../components/ScrollReveal";
import { cercasProntas } from "../assets/data";
import { useTranslation } from "../components/LanguageProvider";
import { localizeCerca } from "../utils/localizeCerca";

const CUTOUT_IMAGES: Record<string, string> = {
  fenix: "https://d2c3kthzw0ta10.cloudfront.net/CercasProntas/Campeira_fenix.png",
  campeira: "https://d2c3kthzw0ta10.cloudfront.net/CercasProntas/Campeira.png",
  "campeira-boi": "https://d2c3kthzw0ta10.cloudfront.net/CercasProntas/Campeira_boi.png",
  "campeira-maxx": "https://d2c3kthzw0ta10.cloudfront.net/CercasProntas/Campeira_maxx.png",
};

const BACKGROUND_IMAGES: Record<string, string> = {
  fenix: "https://d2c3kthzw0ta10.cloudfront.net/img_fenix_carousel/1.jpeg",
  campeira: "https://d2c3kthzw0ta10.cloudfront.net/img-similares/img-similar-campeira.jpg",
  "campeira-boi": "https://d2c3kthzw0ta10.cloudfront.net/img-similares/img-similar-boi.jpg",
  "campeira-maxx": "https://d2c3kthzw0ta10.cloudfront.net/img-similares/img-similar-maxx.HEIC",
};

const CercaProntaPage = ({ slug }: { slug: string }) => {
  const { dict } = useTranslation();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!["campeira-maxx", "fenix", "campeira", "campeira-boi"].includes(slug) || !wrapperRef.current || !contentRef.current) return;

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current!,
        content: contentRef.current!,
        smooth: 1.8,
        effects: true,
        normalizeScroll: true,
      });
      let refreshTimeout: ReturnType<typeof setTimeout>;
      const refresh = () => {
        clearTimeout(refreshTimeout);
        refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 200);
      };
      const observer = new ResizeObserver(refresh);
      observer.observe(contentRef.current!);
      window.addEventListener("load", refresh);
      refresh();

      return () => {
        clearTimeout(refreshTimeout);
        observer.disconnect();
        window.removeEventListener("load", refresh);
        smoother.kill();
      };
    });
    return () => media.revert();
  }, [slug]);

  const baseCerca = cercasProntas.find((item) => item.slug === slug);
  if (!baseCerca) notFound();

  const FALLBACK_CERCA = useMemo(() => {
    const base = cercasProntas.find((c) => c.slug === "fenix")!;
    return localizeCerca(base, dict.cercasProntas.fenix);
  }, [dict]);

  const cerca = useMemo(
    () => localizeCerca(baseCerca, dict.cercasProntas[baseCerca.slug]),
    [baseCerca, dict],
  );

  const similarCercas: SimilarProductItem[] = useMemo(
    () =>
      cercasProntas
        .filter((c) => c.slug !== slug)
        .slice(0, 3)
        .map((c) => {
          const localized = localizeCerca(c, dict.cercasProntas[c.slug]);
          return {
            to: localized.to,
            title: localized.title,
            name: localized.name,
            src: BACKGROUND_IMAGES[c.slug] || localized.src,
            color: localized.color,
            cutout: CUTOUT_IMAGES[c.slug],
          };
        }),
    [slug, dict],
  );

  return (
    <div className="min-h-screen overflow-clip">
      <Header />

      <div ref={wrapperRef}>
      <div ref={contentRef} className="relative">
      <main className={`space-y-24 pb-20 pt-0`}>
        <CercaImageHero key={`hero-${slug}`} hero={cerca.hero} color={cerca.color} />
        <ImgCarousel perspective title={cerca.name} images={cerca.gallery.length > 0 ? cerca.gallery : FALLBACK_CERCA.gallery} />
        {cerca.showcase && <CercaShowcaseTeste key={`showcase-${slug}`} showcase={cerca.showcase} color={cerca.color} />}
        <BlurRevealText
          text={cerca.paragraphs}
          className="mx-auto max-w-[1300px] poppins px-4 text-left text-xl font-light leading-relaxed text-[#002d4d] dark:text-white sm:px-8"
        />
        <ScrollReveal>
          <VideoCardCarousel
            cards={cerca.videoCards.length > 0 ? cerca.videoCards : FALLBACK_CERCA.videoCards}
            fenceName={cerca.name}
          />
        </ScrollReveal>
            <ScrollReveal>
              <VideoCard3D videoSrc={cerca.video3D || FALLBACK_CERCA.video3D} />
            </ScrollReveal>
        <ScrollReveal>
          <SimilarProducts products={similarCercas} />
        </ScrollReveal>
      </main>

      <Footer />
      </div>
      </div>
    </div>
  );
};

export default CercaProntaPage;
