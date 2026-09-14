import { notFound } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ImgCarousel from "../components/ImgCarousel";
import BlurRevealText from "../components/BlurRevealText";
import GradilColorFade from "../components/GradilColorFade";
import GradilCardsMarquee from "../components/GradilCardsMarquee";
import CercaHeroDetails from "../components/CercaHeroDetails";
import VideoCardCarousel from "../components/VideoCardCarousel";
import VideoCard3D from "../components/VideoCard3D";
import SimilarProducts, {
  type SimilarProductItem,
} from "../components/SimilarProducts";
import ScrollReveal from "../components/ScrollReveal";
import { gradilModels } from "../assets/data";

const CUTOUT_IMAGES: Record<string, string> = {
  g4: "https://d2c3kthzw0ta10.cloudfront.net/img-outromodelo-gradil/img-gradil-G4.png",
  g5: "https://d2c3kthzw0ta10.cloudfront.net/img-outromodelo-gradil/img-gradil-G5.png",
  g12: "https://d2c3kthzw0ta10.cloudfront.net/img-outromodelo-gradil/img-gradil-G12.png",
};

const BACKGROUND_IMAGES: Record<string, string> = {
  g4: "https://d2c3kthzw0ta10.cloudfront.net/outrosModelos/img-gradil-G4.webp",
  g5: "https://d2c3kthzw0ta10.cloudfront.net/outrosModelos/img-gradil-G5.jpg",
  g12: "https://d2c3kthzw0ta10.cloudfront.net/outrosModelos/img-gradil-G12.jpg",
};

const LOGO_IMAGES: Record<
  string,
  { word: string; model: string; alt: string }
> = {
  g4: {
    word: "https://d2c3kthzw0ta10.cloudfront.net/LogoGradilG4Laranja/GradilLaranja_trim.png",
    model:
      "https://d2c3kthzw0ta10.cloudfront.net/LogoGradilG4Laranja/G4Laranja_trim.png",
    alt: "G4",
  },
  g5: {
    word: "https://d2c3kthzw0ta10.cloudfront.net/logo-gradil-g5/GradilLaranja_trim.png",
    model:
      "https://d2c3kthzw0ta10.cloudfront.net/logo-gradil-g5/LaranjaG5_trim.png",
    alt: "G5",
  },
  g12: {
    word: "https://d2c3kthzw0ta10.cloudfront.net/logo-gradil-g12/Gradil_trim.png",
    model: "https://d2c3kthzw0ta10.cloudfront.net/logo-gradil-g12/G12_trim.png",
    alt: "G12",
  },
};

const GradilModelPage = ({ slug }: { slug: string }) => {
  const item = gradilModels.find((i) => i.slug === slug);
  if (!item) notFound();

  const logo = LOGO_IMAGES[slug] || LOGO_IMAGES.g4;

  const similarModels: SimilarProductItem[] = gradilModels
    .filter((i) => i.slug !== slug)
    .map((i) => ({
      to: `/gradil/${i.slug}`,
      title: "Gradil",
      name: i.name,
      src: BACKGROUND_IMAGES[i.slug] || i.src,
      color: i.color,
      cutout: CUTOUT_IMAGES[i.slug],
    }));

  return (
    <div className="min-h-screen overflow-clip">
      <Header />
      <main className="pb-20 pt-16">
        <div className="mx-auto flex max-w-5xl flex-col items-center px-4 py-28">
          <div className="flex items-center justify-center">
            <img
              src={logo.word}
              alt="Gradil"
              className="h-20 w-auto shrink-0 object-contain sm:h-28 lg:h-36"
            />
            <GradilColorFade className="-ml-8 -mr-1 h-32 w-20 shrink-0 rounded-sm sm:-ml-12 sm:-mr-2 sm:h-44 sm:w-28 lg:-ml-16 lg:h-64 lg:w-44" />
            <img
              src={logo.model}
              alt={logo.alt}
              className="relative z-10 -ml-1.5 h-20 w-auto shrink-0 object-contain sm:-ml-2 sm:h-28 lg:-ml-3 lg:h-36"
            />
          </div>
          <p className="poppins mt-4 max-w-xl text-center text-sm text-[#002d4d] dark:text-white sm:text-base">
            {item.tagline}
          </p>
          <GradilCardsMarquee />
        </div>
        <BlurRevealText
          text={item.description.split("\n\n")}
          className="mx-auto poppins px-4 text-left text-xl font-light leading-relaxed text-[#002d4d] dark:text-white sm:px-8"
        />

        <ScrollReveal className="pt-24 pb-24">
          <ImgCarousel images={item.gallery} />
        </ScrollReveal>

        <div className="pt-14 pb-24">
          {item.videoSrc && item.features && item.features.length > 0 && (
            <ScrollReveal>
              <div className="mx-auto max-w-2xl px-4 pb-8 text-center sm:px-8">
                <h2 className="poppins text-3xl font-bold text-[#ff5500] lg:text-4xl">
                  Veja como é feita a instalação
                </h2>
                <p className="poppins mt-3 text-sm text-[#002d4d] dark:text-white sm:text-base">
                  Clique nos tópicos ao lado do vídeo para conferir o passo a
                  passo da instalação e como é a malha superior e inferior do{" "}
                  {item.name}.
                </p>
              </div>
              <CercaHeroDetails
                name={item.name}
                badge="Gradil"
                videoSrc={item.videoSrc}
                features={item.features}
              />
            </ScrollReveal>
          )}
        </div>

        {item.videoCards && item.videoCards.length > 0 && (
          <ScrollReveal>
            <VideoCardCarousel cards={item.videoCards} fenceName={item.name} />
          </ScrollReveal>
        )}

        {item.showcase3D?.map((showcase, i) =>
          showcase.videoSrc ? (
            <ScrollReveal
              key={showcase.title}
              className="mx-auto max-w-6xl px-4 py-16 sm:px-8"
            >
              <div
                className={`flex flex-col items-center gap-10 lg:items-center lg:justify-between ${
                  i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                <div className="max-w-md text-center lg:text-left">
                  <h3 className="poppins text-2xl font-bold text-[#ff5500] lg:text-3xl">
                    {showcase.title}
                  </h3>
                  <p className="poppins mt-3 text-sm text-[#002d4d] dark:text-white sm:text-base">
                    {showcase.description}
                  </p>
                </div>
                <div className="w-full lg:w-1/2">
                  <VideoCard3D videoSrc={showcase.videoSrc} />
                </div>
              </div>
            </ScrollReveal>
          ) : null,
        )}

        <ScrollReveal>
          <SimilarProducts
            products={similarModels}
            heading="Outros modelos de Gradil"
          />
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  );
};

export default GradilModelPage;
