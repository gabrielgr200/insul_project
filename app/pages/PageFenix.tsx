"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import FenixDetails from "../components/FenixDetails";
import Specifications from "../components/Specifications";
import ImgCarousel from "../components/ImgCarousel";
import BlurRevealText from "../components/BlurRevealText";
import VideoCardCarousel from "../components/VideoCardCarousel";
import VideoCard3D from "../components/VideoCard3D";
import { textDescription } from "../assets/data";

const PageFenix = () => {
  return (
    <div className="min-h-screen overflow-clip">
      <Header />

      <main className="pb-20 pt-30">
        <FenixDetails />
        <Specifications />
        <ImgCarousel />
        <BlurRevealText
          text={textDescription[0].paragraphs}
          className="mx-auto poppins px-4 text-left text-xl font-light leading-relaxed text-[#002d4d] sm:px-8"
        />
        <VideoCardCarousel />
        <VideoCard3D />
      </main>

      <Footer />
    </div>
  );
};

export default PageFenix;
