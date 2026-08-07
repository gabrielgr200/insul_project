import { notFound } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CercaHeroDetails from "../components/CercaHeroDetails";
import { ExpandableCardExample } from "../components/Specifications";
import ImgCarousel from "../components/ImgCarousel";
import BlurRevealText from "../components/BlurRevealText";
import VideoCardCarousel from "../components/VideoCardCarousel";
import VideoCard3D from "../components/VideoCard3D";
import SimilarProducts, {
  type SimilarProductItem,
} from "../components/SimilarProducts";
import { soldadasHexagonais } from "../assets/data";

const CUTOUT_IMAGES: Record<string, string> = {
  "tela-titan": "https://res.cloudinary.com/kcqitv3l/image/upload/v1785858286/titan_dpveqr.png",
  "tela-morada": "https://res.cloudinary.com/kcqitv3l/image/upload/v1785858287/morada_lcztla.png",
  "tela-morada-open": "https://res.cloudinary.com/kcqitv3l/image/upload/v1785861514/morada-open_p7x0xz.png",
  "tela-brava": "https://res.cloudinary.com/kcqitv3l/image/upload/v1785858285/brava_epowtp.png",
  "tela-morada-leve": "https://res.cloudinary.com/kcqitv3l/image/upload/v1785861531/morada-leve_rkcwhm.png",
};

const BACKGROUND_IMAGES: Record<string, string> = {
  "tela-titan": "https://res.cloudinary.com/kcqitv3l/image/upload/v1785949877/titan_n4hf0a.jpg",
  "tela-morada": "https://res.cloudinary.com/kcqitv3l/image/upload/v1785949730/morada_kyolxk.jpg",
  "tela-morada-open": "https://res.cloudinary.com/kcqitv3l/image/upload/v1785949877/open_rcqtgq.jpg",
  "tela-brava": "https://res.cloudinary.com/kcqitv3l/image/upload/v1785948044/img-brava-6_ccikqo.jpg",
  "tela-morada-leve": "https://res.cloudinary.com/kcqitv3l/image/upload/v1786025112/morada-leve-similares_cluxwd.jpg",
};

// Segunda palavra do nome ("Tela Morada Open" -> "morada") identifica a
// família do produto, pra priorizar variantes (leve, open...) nos similares.
const familyKey = (name: string) => name.split(" ")[1]?.toLowerCase() ?? "";

const SoldadaHexagonalPage = ({ slug }: { slug: string }) => {
  const item = soldadasHexagonais.find((i) => i.slug === slug);
  if (!item) notFound();

  const currentFamily = familyKey(item.name);
  const otherTelas = soldadasHexagonais.filter((i) => i.slug !== slug);
  const sameFamily = otherTelas.filter((i) => familyKey(i.name) === currentFamily);
  const restTelas = otherTelas.filter((i) => familyKey(i.name) !== currentFamily);

  const similarTelas: SimilarProductItem[] = [...sameFamily, ...restTelas]
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
          <CercaHeroDetails
            name={item.name}
            videoSrc={item.videoSrc!}
            features={item.features!}
            badge={badgeLabel}
          />
        ) : (
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
                {badgeLabel}
              </span>
              <h1 className="poppins mt-3 text-4xl font-bold text-white lg:text-5xl">
                {item.name}
              </h1>
            </div>
          </section>
        )}

        {hasFullSpec && <ExpandableCardExample color={item.color} />}

        <ImgCarousel images={item.gallery} />

        <BlurRevealText
          text={item.description.split("\n\n")}
          className="mx-auto poppins px-4 text-left text-xl font-light leading-relaxed text-[#002d4d] dark:text-white sm:px-8"
        />

        {hasFullSpec && (
          <VideoCardCarousel
            cards={item.videoCards!}
            fenceName={item.name}
          />
        )}

        {item.video3D && <VideoCard3D videoSrc={item.video3D} />}

        <SimilarProducts products={similarTelas} />
      </main>

      <Footer />
    </div>
  );
};

export default SoldadaHexagonalPage;
