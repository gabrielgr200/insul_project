"use client";

import { SimilarProductCard } from "./SimilarProducts";
import { useTranslation } from "./LanguageProvider";

const OTHER_MEDIA = [
  {
    to: "/cercas-prontas/fenix",
    color: "#b2020d",
    src: "https://d2c3kthzw0ta10.cloudfront.net/img_fenix_carousel/1.jpeg",
    cutout:
      "https://d2c3kthzw0ta10.cloudfront.net/CercasProntas/Campeira_fenix.png",
  },
  {
    to: "/soldadas-hexagonais/tela-mangueirao-16",
    color: "#b3071b",
    src: "https://d2c3kthzw0ta10.cloudfront.net/similar-hexagonais/mangueirao16-similar.webp",
    cutout:
      "https://d2c3kthzw0ta10.cloudfront.net/telas-hexagonais/mangueirao-16.png",
  }, //colocar imagens de uma tela soldada
  {
    to: "/soldadas-hexagonais/tela-morada",
    color: "#12568f",
    src: "https://d2c3kthzw0ta10.cloudfront.net/similares-soldadas/img-morada-similar.jpg",
    cutout:
      "https://d2c3kthzw0ta10.cloudfront.net/telas-soldada/morada.png",
  }, // colocar imagens de uma tela hexagonal
];

const OtherProducts = () => {
  const { dict } = useTranslation();
  const o = dict.gradil.other;
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
      <h3 className="poppins mb-8 text-4xl font-bold text-[#ff5500] dark:text-white">
        {o.title}
      </h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {OTHER_MEDIA.map((m, i) => (
          <SimilarProductCard
            key={m.to}
            {...m}
            title={o.products[i].title}
            name={o.products[i].name}
          />
        ))}
      </div>
    </section>
  );
};

export default OtherProducts;
