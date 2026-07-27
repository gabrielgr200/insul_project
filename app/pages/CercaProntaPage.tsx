import { notFound } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CercaHeroDetails from "../components/CercaHeroDetails";
import { ExpandableCardExample } from "../components/Specifications";
import ImgCarousel from "../components/ImgCarousel";
import BlurRevealText from "../components/BlurRevealText";
import VideoCardCarousel from "../components/VideoCardCarousel";
import VideoCard3D from "../components/VideoCard3D";
import SimilarProducts from "../components/SimilarProducts";
import {
  cercasProntasInfo,
  cercasGalleryImages,
  cercasVideoCards,
  videoMaxxExample,
  videoCard3DSlides,
} from "../assets/data";

const CercaProntaPage = ({ slug }: { slug: string }) => {
  const cerca = cercasProntasInfo.find((item) => item.slug === slug);
  if (!cerca) notFound();

  return (
    <div className="min-h-screen overflow-clip">
      <Header />

      <main className="pb-20 pt-30">
        <CercaHeroDetails
          name={cerca.name}
          videoSrc={cerca.videoSrc || videoMaxxExample[0].src}
          features={cerca.features}
        />
        <ExpandableCardExample color={cerca.color} />
        <ImgCarousel images={cerca.gallery.length > 0 ? cerca.gallery : cercasGalleryImages} />
        <BlurRevealText
          text={cerca.paragraphs}
          className="mx-auto poppins px-4 text-left text-xl font-light leading-relaxed text-[#002d4d] dark:text-white sm:px-8"
        />
        <VideoCardCarousel
          cards={cerca.videoCards.length > 0 ? cerca.videoCards : cercasVideoCards}
          fenceName={cerca.name}
        />
        <VideoCard3D videoSrc={cerca.video3D || videoCard3DSlides.fenix} />
        <SimilarProducts currentSlug={cerca.slug} />
      </main>

      <Footer />
    </div>
  );
};

export default CercaProntaPage;
