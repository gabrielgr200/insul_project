"use client";

import { useMemo } from "react";
import { notFound } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CercaHeroDetails from "../components/CercaHeroDetails";
import { ExpandableCardExample } from "../components/Specifications";
import ImgCarousel from "../components/ImgCarousel";
import BlurRevealText from "../components/BlurRevealText";
import VideoCardCarousel from "../components/VideoCardCarousel";
import VideoCard3D from "../components/VideoCard3D";
import SimilarProducts, {
  type SimilarProductItem,
} from "../components/SimilarProducts";
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

      <main className="space-y-24 pb-20 pt-30">
        <div className="mb-0">
          <CercaHeroDetails
            name={cerca.name}
            badge={cerca.title}
            videoSrc={cerca.videoSrc || FALLBACK_CERCA.videoSrc}
            features={cerca.features}
          />
        </div>
        <ExpandableCardExample color={cerca.color} />
        <ImgCarousel images={cerca.gallery.length > 0 ? cerca.gallery : FALLBACK_CERCA.gallery} />
        <BlurRevealText
          text={cerca.paragraphs}
          className="mx-auto max-w-[1300px] poppins px-4 text-left text-xl font-light leading-relaxed text-[#002d4d] dark:text-white sm:px-8"
        />
        <VideoCardCarousel
          cards={cerca.videoCards.length > 0 ? cerca.videoCards : FALLBACK_CERCA.videoCards}
          fenceName={cerca.name}
        />
        <VideoCard3D videoSrc={cerca.video3D || FALLBACK_CERCA.video3D} />
        <SimilarProducts products={similarCercas} />
      </main>

      <Footer />
    </div>
  );
};

export default CercaProntaPage;
