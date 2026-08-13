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

const FALLBACK_CERCA = cercasProntas.find((c) => c.slug === "fenix")!;

const CUTOUT_IMAGES: Record<string, string> = {
  fenix: "/images/CercasProntas/Campeira_fenix.png",
  campeira: "/images/CercasProntas/Campeira.png",
  "campeira-boi": "/images/CercasProntas/Campeira_boi.png",
  "campeira-maxx": "/images/CercasProntas/Campeira_maxx.png",
};

const BACKGROUND_IMAGES: Record<string, string> = {
  fenix: "/images/img_fenix_carousel/1.jpeg",
  campeira: "/images/img-similares/img-similar-campeira.jpg",
  "campeira-boi": "/images/img-similares/img-similar-boi.jpg",
  "campeira-maxx": "/images/img-similares/img-similar-maxx.HEIC",
};

const CercaProntaPage = ({ slug }: { slug: string }) => {
  const cerca = cercasProntas.find((item) => item.slug === slug);
  if (!cerca) notFound();

  const similarCercas: SimilarProductItem[] = cercasProntas
    .filter((c) => c.slug !== slug)
    .slice(0, 3)
    .map((c) => ({
      to: c.to,
      title: c.title,
      name: c.name,
      src: BACKGROUND_IMAGES[c.slug] || c.src,
      color: c.color,
      cutout: CUTOUT_IMAGES[c.slug],
    }));

  return (
    <div className="min-h-screen overflow-clip">
      <Header />

      <main className="space-y-24 pb-20 pt-30">
        <div className="mb-0">
          <CercaHeroDetails
            name={cerca.name}
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
