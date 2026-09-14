import ProductCard from "./ProductCard";
import ScrollReveal from "./ScrollReveal";
import type { ProductCardData } from "../assets/data";

const GAUGES = ["10", "12", "14", "16", "18"];

const arameCards: ProductCardData[] = GAUGES.map((gauge) => ({
  src: `/images/arames/imgs-arames-products/arame-${gauge}.png`,
  title: "Arame Galvanizado",
  name: `BWG ${gauge}`,
  paragraph: "Fio galvanizado a fogo, Rolo de 25 kg",
  postSpacing: "—",
  animals: [],
  shortDescription:
    "Conteúdo de exemplo — especificações reais deste arame ainda não foram cadastradas.",
  description: `Página de exemplo para o Arame Galvanizado BWG ${gauge}. A descrição completa e as especificações técnicas reais serão adicionadas em breve.`,
}));

const ArameProductsCards = () => {
  return (
    <>
      <ScrollReveal className="pt-40 pb-16 text-center">
        <h3 className="poppins text-3xl font-bold text-[#ff5500] dark:text-[#ff5500]">
          Arames Galvanizados
        </h3>
        <p className="poppins text-[20px] font-light text-[#002d4d] dark:text-white">
          Do BWG 10 ao BWG 18, cada rolo é galvanizado para resistir ao tempo
          e se adaptar ao seu projeto.
        </p>
      </ScrollReveal>
      <ScrollReveal className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2">
        {arameCards.map((card) => (
          <ProductCard key={card.name} {...card} />
        ))}
      </ScrollReveal>
    </>
  );
};

export default ArameProductsCards;
