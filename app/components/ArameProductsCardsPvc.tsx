import ProductCard from "./ProductCard";
import ScrollReveal from "./ScrollReveal";
import { arameCardsPvc } from "../assets/data";

const ArameProductsCardsPvc = () => {
  return (
    <>
      <ScrollReveal className="pt-40 pb-16 text-center">
        <h3 className="poppins text-3xl font-bold text-[#ff5500] dark:text-[#ff5500]">
          Arames com Revestimento em PVC Verde
        </h3>
        <p className="poppins text-[20px] font-light text-[#002d4d] dark:text-white">
          Mais proteção contra corrosão e um acabamento discreto para áreas
          externas.
        </p>
      </ScrollReveal>
      <ScrollReveal className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {arameCardsPvc.map((card) => (
          <ProductCard key={card.name} {...card} />
        ))}
      </ScrollReveal>
    </>
  );
};

export default ArameProductsCardsPvc;
