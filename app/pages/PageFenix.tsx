"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import FenixDetails from "../components/FenixDetails";
import Specifications from "../components/Specifications";
import ImgCarousel from "../components/ImgCarousel";

const PageFenix = () => {
  return (
    <div className="min-h-screen overflow-clip">
      <Header />

      <main className="pt-44 pb-20">
        <FenixDetails />
        <Specifications />
        <ImgCarousel />
      </main>

      <Footer />
    </div>
  );
};

export default PageFenix;
