"use client";

import ProductCard from "./ProductCard";
import ScrollReveal from "./ScrollReveal";
import { arameCardsPvc } from "../assets/data";
import { wireProductHref } from "../assets/wireProducts";
import { useContentTranslation } from "./LanguageProvider";

const ArameProductsCardsPvc = () => {
  const translateText = useContentTranslation();
  return (
    <>
      <ScrollReveal className="telas-category-wide pt-40 pb-16 text-center">
        <h3 className="poppins text-3xl font-bold text-[#ff5500] dark:text-[#ff5500]">
          {translateText("Arames com Revestimento em PVC Verde")}</h3>
        <p className="poppins text-[20px] font-light text-[#002d4d] dark:text-white">
          {translateText("Mais proteção contra corrosão e um acabamento discreto para áreas externas.")}</p>
      </ScrollReveal>
      <ScrollReveal className="cercas-cards-wide grid grid-cols-1 items-start gap-6 sm:grid-cols-2">
        {arameCardsPvc.map((card) => (
          <ProductCard
            key={card.name}
            {...card}
            to={wireProductHref(card.name, true)}
            imageClassName={`${card.imageClassName ?? "object-contain"} min-[1920px]:scale-110 min-[2560px]:scale-[1.15]`}
          />
        ))}
      </ScrollReveal>
    </>
  );
};

export default ArameProductsCardsPvc;
