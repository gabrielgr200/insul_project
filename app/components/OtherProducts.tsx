"use client";

import { SimilarProductCard } from "./SimilarProducts";
import { useTranslation } from "./LanguageProvider";

const OTHER_MEDIA = [
  {
    to: "/cercas-prontas/fenix",
    color: "#b2020d",
    src: "/images/img_fenix_carousel/1.jpeg",
    cutout:
      "https://res.cloudinary.com/kcqitv3l/image/upload/v1784917804/FENX_grkczf.png",
  },
  {
    to: "/cercas-prontas/campeira",
    color: "#ff711b",
    src: "https://res.cloudinary.com/kcqitv3l/image/upload/v1784911999/ovino_pdivdh.jpg",
    cutout:
      "https://res.cloudinary.com/kcqitv3l/image/upload/v1784917794/CAMPEIRA_t68olb.png",
  },
  {
    to: "/cercas-prontas/campeira-boi",
    color: "#959e24",
    src: "https://res.cloudinary.com/kcqitv3l/image/upload/v1784912387/boi_zlfbxt.jpg",
    cutout:
      "https://res.cloudinary.com/kcqitv3l/image/upload/v1784917794/CAMPEIRA-BOI_qyuhzs.png",
  },
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
            title={o.productTitle}
            name={o.products[i].name}
          />
        ))}
      </div>
    </section>
  );
};

export default OtherProducts;
