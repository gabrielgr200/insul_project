import { notFound } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ImgCarousel from "../components/ImgCarousel";
import BlurRevealText from "../components/BlurRevealText";
import SimilarProducts, {
  type SimilarProductItem,
} from "../components/SimilarProducts";
import { gradilModels } from "../assets/data";

const GradilModelPage = ({ slug }: { slug: string }) => {
  const item = gradilModels.find((i) => i.slug === slug);
  if (!item) notFound();

  const similarModels: SimilarProductItem[] = gradilModels
    .filter((i) => i.slug !== slug)
    .map((i) => ({
      to: `/gradil/${i.slug}`,
      title: "Gradil",
      name: i.name,
      src: i.src,
      color: i.color,
    }));

  return (
    <div className="min-h-screen overflow-clip">
      <Header />

      <main className="pb-20 pt-32">
        <section
          className="relative flex min-h-[40vh] items-end overflow-hidden px-4 pb-10 sm:px-8"
          style={{ backgroundColor: item.color }}
        >
          <img
            src={item.gallery[0]?.src}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="relative mx-auto w-full max-w-6xl">
            <span className="inline-block rounded-full border border-white/40 px-4 py-1.5 text-sm font-medium text-white">
              Gradil
            </span>
            <h1 className="poppins mt-3 text-4xl font-bold text-white lg:text-5xl">
              {item.name}
            </h1>
            <p className="poppins mt-4 max-w-xl text-sm text-white/80 sm:text-base">
              {item.paragraph}
            </p>
          </div>
        </section>

        <ImgCarousel images={item.gallery} />

        <BlurRevealText
          text={item.description.split("\n\n")}
          className="mx-auto poppins px-4 text-left text-xl font-light leading-relaxed text-[#002d4d] dark:text-white sm:px-8"
        />

        <SimilarProducts products={similarModels} />
      </main>

      <Footer />
    </div>
  );
};

export default GradilModelPage;
