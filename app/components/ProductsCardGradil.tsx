"use client";

import ProductCard from "./ProductCard";
import type { ProductCardData } from "../assets/data";
import { gradilModels } from "../assets/data";
import { useTranslation } from "./LanguageProvider";

const GRADIL_MEDIA = [
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/Gradil_Cores/INSUL_00_GRADIL_VERDE_placas.webp",
    to: "/gradil/g4",
    postSpacing: "2,5 m",
  },
  {
    src: "https://d2c3kthzw0ta10.cloudfront.net/Gradil_Cores/INSUL_00_GRADIL_AZUL_placas.webp",
    to: "/gradil/g5",
    postSpacing: "2,5 m",
  },
  {
    src: "/images/Gradil_Cores/INSUL_G12.png",
    to: "/gradil/g12",
    postSpacing: "2,5 m",
  },
];

const GRADIL_HOVER_IMAGES: Record<string, string> = {
  g4: "/images/img-outromodelo-gradil/gradil-g4-verde.png",
  g5: "/images/img-outromodelo-gradil/img-gradil-G4.png",
  g12: "/images/img-outromodelo-gradil/img-gradil-G12.png",
};

const ProductsCardGradil = () => {
  const { dict } = useTranslation();
  const p = dict.gradil.products;

  const cards: ProductCardData[] = GRADIL_MEDIA.map((m, i) => {
    const slug = m.to.split("/").pop();
    const model = gradilModels.find((g) => g.slug === slug);

    return {
      src: m.src,
      to: m.to,
      postSpacing: m.postSpacing,
      animals: [],
      title: p.title,
      name: p.cards[i].name,
      paragraph: p.cards[i].paragraph,
      shortDescription: p.cards[i].shortDescription,
      description: p.cards[i].description,
      indicatedFor: model?.indicatedFor ?? [],
      hoverImage: slug ? GRADIL_HOVER_IMAGES[slug] : undefined,
    };
  });

  return (
    <section className="bg-white px-6 pb-20 pt-0 dark:bg-zinc-950">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <ProductCard key={card.name} {...card} />
        ))}
      </div>
    </section>
  );
};

export default ProductsCardGradil;
