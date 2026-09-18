import { notFound } from "next/navigation";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CercaHeroDetails from "../components/CercaHeroDetails";
import ImgCarousel from "../components/ImgCarousel";
import BlurRevealText from "../components/BlurRevealText";
import VideoCardCarousel from "../components/VideoCardCarousel";
import VideoCard3D from "../components/VideoCard3DLazy";
import SimilarProducts, {
  type SimilarProductItem,
} from "../components/SimilarProducts";
import ScrollReveal from "../components/ScrollReveal";
import { soldadasHexagonais } from "../assets/data";

const CUTOUT_IMAGES: Record<string, string> = {
  "tela-titan": "https://d2c3kthzw0ta10.cloudfront.net/telas-soldada/titan.png",
  "tela-morada":
    "https://d2c3kthzw0ta10.cloudfront.net/telas-soldada/morada.png",
  "tela-morada-open":
    "https://d2c3kthzw0ta10.cloudfront.net/telas-soldada/morada-open.png",
  "tela-brava": "https://d2c3kthzw0ta10.cloudfront.net/telas-soldada/brava.png",
  "tela-morada-leve":
    "https://d2c3kthzw0ta10.cloudfront.net/telas-soldada/morada-leve.png",
  "tela-brava-leve":
    "https://d2c3kthzw0ta10.cloudfront.net/telas-soldada/brava-leve.png",
  "tela-mangueirao-16":
    "https://d2c3kthzw0ta10.cloudfront.net/telas-hexagonais/mangueirao-16.png",
  "tela-mangueirao-18":
    "https://d2c3kthzw0ta10.cloudfront.net/telas-hexagonais/mangueirao-18.png",
  "tela-galinheiro-18":
    "https://d2c3kthzw0ta10.cloudfront.net/telas-hexagonais/galinheiro.png",
  "tela-pinteiro-22":
    "https://d2c3kthzw0ta10.cloudfront.net/telas-hexagonais/pinteiro.png",
  "tela-viveiro-24":
    "https://d2c3kthzw0ta10.cloudfront.net/telas-hexagonais/viveiro.png",
};

const BACKGROUND_IMAGES: Record<string, string> = {
  "tela-titan":
    "https://d2c3kthzw0ta10.cloudfront.net/similares-soldadas/img-titan-similar.jpg",
  "tela-morada":
    "https://d2c3kthzw0ta10.cloudfront.net/similares-soldadas/img-morada-similar.jpg",
  "tela-morada-open":
    "https://d2c3kthzw0ta10.cloudfront.net/similares-soldadas/img-open-similar.jpg",
  "tela-brava":
    "https://d2c3kthzw0ta10.cloudfront.net/similares-soldadas/img-brava-similar.jpg",
  "tela-morada-leve":
    "https://d2c3kthzw0ta10.cloudfront.net/similares-soldadas/img-morada-leve-similar.jpg",
  "tela-brava-leve":
    "https://d2c3kthzw0ta10.cloudfront.net/img-similar-bravaLeve.webp",
  "tela-mangueirao-16":
    "https://d2c3kthzw0ta10.cloudfront.net/similar-hexagonais/mangueirao16-similar.webp",
  "tela-mangueirao-18":
    "https://d2c3kthzw0ta10.cloudfront.net/similar-hexagonais/mangueirao18-similar.jpg",
  "tela-galinheiro-18":
    "https://d2c3kthzw0ta10.cloudfront.net/similar-hexagonais/galinheiro-similar.jpg",
  "tela-pinteiro-22":
    "https://d2c3kthzw0ta10.cloudfront.net/similar-hexagonais/pinteiro-similar.jpg",
  "tela-viveiro-24":
    "https://d2c3kthzw0ta10.cloudfront.net/similar-hexagonais/viveiro-similar.jpg",
};

const familyKey = (name: string) => name.split(" ")[1]?.toLowerCase() ?? "";

const SoldadaHexagonalPage = ({ slug }: { slug: string }) => {
  const item = soldadasHexagonais.find((i) => i.slug === slug);
  if (!item) notFound();

  const currentFamily = familyKey(item.name);
  const otherTelas = soldadasHexagonais.filter((i) => i.slug !== slug);
  const sameCategory = otherTelas.filter((i) => i.category === item.category);
  const otherCategory = otherTelas.filter((i) => i.category !== item.category);
  const sameFamily = sameCategory.filter(
    (i) => familyKey(i.name) === currentFamily,
  );
  const restSameCategory = sameCategory.filter(
    (i) => familyKey(i.name) !== currentFamily,
  );

  const similarTelas: SimilarProductItem[] = [
    ...sameFamily,
    ...restSameCategory,
    ...otherCategory,
  ]
    .slice(0, 3)
    .map((i) => ({
      to: `/soldadas-hexagonais/${i.slug}`,
      title: i.category === "Soldada" ? "Tela Soldada" : "Tela Hexagonal",
      name: i.name,
      src: BACKGROUND_IMAGES[i.slug] || i.src,
      color: i.color,
      cutout: CUTOUT_IMAGES[i.slug],
    }));

  const badgeLabel =
    item.category === "Soldada" ? "Tela Soldada" : "Tela Hexagonal";
  const hasFullSpec = Boolean(item.features && item.videoSrc);

  return (
    <div className="min-h-screen overflow-clip">
      <Header />

      <main className="pb-20 pt-32">
        {hasFullSpec ? (
          <ScrollReveal>
            <CercaHeroDetails
              name={item.name}
              videoSrc={item.videoSrc!}
              features={item.features!}
              badge={badgeLabel}
            />
          </ScrollReveal>
        ) : (
          <ScrollReveal>
            <section
              className="relative flex min-h-[40vh] items-end overflow-hidden px-4 pb-10 sm:px-8"
              style={{ backgroundColor: item.color }}
            >
              {item.gallery[0]?.src && (
                <Image
                  src={item.gallery[0].src}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="100vw"
                  className="object-cover opacity-30"
                />
              )}
              <div className="relative mx-auto w-full max-w-6xl">
                <span className="inline-block rounded-full border border-white/40 px-4 py-1.5 text-sm font-medium text-white">
                  {badgeLabel}
                </span>
                <h1 className="poppins mt-3 text-4xl font-bold text-white lg:text-5xl">
                  {item.name}
                </h1>
              </div>
            </section>
          </ScrollReveal>
        )}

        <ImgCarousel perspective title={item.name} images={item.gallery} />

        <BlurRevealText
          text={item.description.split("\n\n")}
          className="mx-auto poppins px-4 text-left text-xl font-light leading-relaxed text-[#002d4d] dark:text-white sm:px-8"
        />

        {hasFullSpec && (
          <ScrollReveal>
            <VideoCardCarousel cards={item.videoCards!} fenceName={item.name} />
          </ScrollReveal>
        )}

        {item.video3D && (
          <ScrollReveal>
            <VideoCard3D videoSrc={item.video3D} />
          </ScrollReveal>
        )}

        <ScrollReveal>
          <SimilarProducts products={similarTelas} />
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  );
};

export default SoldadaHexagonalPage;
