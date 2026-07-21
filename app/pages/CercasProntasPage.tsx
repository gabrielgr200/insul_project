"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import CercasCarousel from "../components/CercasCarousel";
import ProductCard from "../components/ProductCard";
import { cercasProntasCarousel, poductsCardsPages } from "../assets/data";
import CardPost from "../components/CardPost";

const CercasProntasPage = () => {
  return (
    <div className="min-h-screen overflow-clip">
      <Header />

      <main className="max-w-7xl lg:max-w-6xl mx-auto px-4 sm:px-8 pt-44 pb-20">
        <CercasCarousel slides={cercasProntasCarousel} />

        <div className="mt-16 grid grid-cols-1 items-start gap-6 sm:grid-cols-2">
          {poductsCardsPages.map((card) => (
            <ProductCard key={card.name} {...card} />
          ))}
        </div>

        <div className="mt-16">
          <CardPost />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CercasProntasPage;
