import { notFound } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CercaHeroDetails from "../components/CercaHeroDetails";
import Specifications from "../components/Specifications";
import ImgCarousel from "../components/ImgCarousel";
import BlurRevealText from "../components/BlurRevealText";
import VideoCardCarousel from "../components/VideoCardCarousel";
import VideoCard3D from "../components/VideoCard3D";
import {
  cercasProntasInfo,
  cercasGalleryImages,
  cercasVideoCards,
  specifications,
  videoMaxxExample,
  videoCard3D,
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
        <Specifications specifications={specifications} color={cerca.color} />
        <ImgCarousel images={cercasGalleryImages} />
        <BlurRevealText
          text={cerca.paragraphs}
          className="mx-auto poppins px-4 text-left text-xl font-light leading-relaxed text-[#002d4d] sm:px-8"
        />
        <VideoCardCarousel
          cards={cerca.videoCards.length > 0 ? cerca.videoCards : cercasVideoCards}
        />
        <VideoCard3D videoSrc={videoCard3D[0].src} />
      </main>

      <Footer />
    </div>
  );
};

export default CercaProntaPage;
