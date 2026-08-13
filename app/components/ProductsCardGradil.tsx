"use client";

import ProductCard from "./ProductCard";
import type { ProductCardData } from "../assets/data";
import { useTranslation } from "./LanguageProvider";

const casaIcon =
  "https://res.cloudinary.com/kcqitv3l/image/upload/v1785859183/casa_wt8bpr.png";
const condominioIcon =
  "https://res.cloudinary.com/kcqitv3l/image/upload/v1785860803/condominio_i3cfoe.png";
const industriaIcon =
  "https://res.cloudinary.com/kcqitv3l/image/upload/v1785860802/industria_gdhfq2.png";
const portaoIcon =
  "https://res.cloudinary.com/kcqitv3l/image/upload/v1785929375/port%C3%A3o_dnjufp.png";

const GRADIL_MEDIA = [
  {
    src: "/images/Gradil_Cores/INSUL_00_GRADIL_VERDE_placas.webp",
    to: "/gradil",
    postSpacing: "2,5 m",
    indicatedIcons: [casaIcon, condominioIcon],
  },
  {
    src: "/images/Gradil_Cores/INSUL_00_GRADIL_AZUL_placas.webp",
    to: "/gradil",
    postSpacing: "2,5 m",
    indicatedIcons: [condominioIcon, industriaIcon],
  },
  {
    src: "/images/Gradil_Cores/INSUL_00_GRADIL_PRETO_placas.webp",
    to: "/gradil",
    postSpacing: "2,5 m",
    indicatedIcons: [industriaIcon, portaoIcon],
  },
];

const ProductsCardGradil = () => {
  const { dict } = useTranslation();
  const p = dict.gradil.products;

  const cards: ProductCardData[] = GRADIL_MEDIA.map((m, i) => ({
    src: m.src,
    to: m.to,
    postSpacing: m.postSpacing,
    animals: [],
    title: p.title,
    name: p.cards[i].name,
    paragraph: p.cards[i].paragraph,
    shortDescription: p.cards[i].shortDescription,
    description: p.cards[i].description,
    indicatedFor: p.cards[i].indicated.map((name, j) => ({
      name,
      src: m.indicatedIcons[j],
    })),
  }));

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
