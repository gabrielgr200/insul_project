"use client";

import { notFound } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductDetailHero from "../components/ProductDetailHero";
import ImgCarousel from "../components/ImgCarousel";
import BlurRevealText from "../components/BlurRevealText";
import VideoCard3D from "../components/VideoCard3DLazy";
import SimilarProducts from "../components/SimilarProducts";
import ScrollReveal from "../components/ScrollReveal";
import RatchetComparison from "../components/RatchetComparison";
import { accessoriesCards } from "../assets/data";
import { accessorySlug } from "../utils/accessorySlug";
import { useContentTranslation } from "../components/LanguageProvider";

export default function AccessoryProductPage({ slug }: { slug: string }) {
  const text = useContentTranslation();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return;
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current!,
        content: contentRef.current!,
        smooth: 1.8,
        effects: true,
        normalizeScroll: true,
      });
      let refreshTimeout: ReturnType<typeof setTimeout>;
      const refresh = () => {
        clearTimeout(refreshTimeout);
        refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 200);
      };
      const observer = new ResizeObserver(refresh);
      observer.observe(contentRef.current!);
      window.addEventListener("load", refresh);
      refresh();
      return () => {
        clearTimeout(refreshTimeout);
        observer.disconnect();
        window.removeEventListener("load", refresh);
        smoother.kill();
      };
    });
    return () => media.revert();
  }, [slug]);

  const product = accessoriesCards.find(item => accessorySlug(item.name) === slug);
  if (!product) notFound();
  const isMicro = slug === "catraca-micro";
  const isRatchet = isMicro || slug === "catraca-t7";
  const isStretcher = slug === "esticador-caixa";
  const isOriginalRatchetPage = isRatchet || isStretcher;
  const relatedNames = isOriginalRatchetPage
    ? ["Catraca Micro", "Catraca T7", "Esticador(caixa)", "Chave balancim"]
    : ["poste-t", "batedor-manual"].includes(slug)
      ? ["Poste T", "Batedor Manual", "Catraca Micro", "Alicate para emendar arame"]
      : ["chave-balancim", "alicate-para-emendar-arame"].includes(slug)
        ? ["Catraca Micro", "Catraca T7", "Chave balancim", "Alicate para emendar arame"]
        : ["Tubos Pintados", "Fixador de Gradil", "Tampa para Gradil", "Parabolt para fixador"];
  const similarProducts = accessoriesCards
    .filter(item => item.name !== product.name && relatedNames.includes(item.name))
    .slice(0, 3)
    .map(item => ({ src: item.src, cutout: item.src, name: item.name, title: "Acessórios", color: "#082d49", to: `/acessorios/${accessorySlug(item.name)}` }));

  return (
    <div className="min-h-screen overflow-clip">
      <div data-theme="light"><Header /></div>
      <div ref={wrapperRef}>
        <div ref={contentRef} className="relative">
          <main>
            <ProductDetailHero name={product.name} category="Acessórios" description={product.shortDescription} image={product.src} specifications={product.paragraph} circularOrbit imageScale={1.2} backgroundColor={isStretcher ? undefined : "#E9ECEF"} />
            <>
              <div id="product-details" className="scroll-mt-28 pt-40">
                {/* Galeria anterior:
                <ImgCarousel perspective title={text(product.name)} images={[1, 2, 3].map(index => ({ src: isMicro ? `/images/imgs-gallery/catraca_micro/img-gallery-micro_${index}.jpg` : "/images/accessory-placeholder.svg", alt: `${isMicro ? "" : "Imagem placeholder — "}${product.name} — ${index}` }))} />
                */}
                <ImgCarousel perspective clipcut title={text(product.name)} images={[1, 2, 3].map(index => ({ src: isMicro ? `/images/imgs-gallery/catraca_micro/img-gallery-micro_${index}.jpg` : "/images/accessory-placeholder.svg", alt: `${isMicro ? "" : "Imagem placeholder — "}${product.name} — ${index}` }))} />
              </div>
              <section className="py-16">
                <BlurRevealText text={product.description.split("\n\n")} className="poppins mx-auto max-w-[1300px] px-4 text-left text-xl font-light leading-relaxed text-[#002d4d] dark:text-white sm:px-8" />
              </section>
              {isRatchet && <RatchetComparison />}
              {[
                { src: isMicro ? "/videos/videos-catraca-micro/video-3d-1.mp4" : "", title: `${product.name} em detalhes`, description: isMicro ? "Uma solução prática para manter os arames firmes e esticados na instalação de telas e cercas prontas." : isStretcher ? "Esticador em aço carbono galvanizado, para fios de até 3 mm. Peso: 178 g." : isRatchet ? "Aço carbono galvanizado de 3,00 mm, para fios de até 4 mm. Peso: 284 g." : product.paragraph },
                { src: isMicro ? "/videos/videos-catraca-micro/video-3d-2.mp4" : "", title: isMicro ? "Praticidade para tensionar e emendar" : isStretcher ? "Conheça o Esticador" : isRatchet ? "Resistência para trabalhos pesados" : "Aplicação e instalação", description: isMicro ? "A Catraca Micro permite ajustar a tensão e emendar arames em diferentes pontos do cercamento." : isStretcher ? "Texto placeholder para os detalhes de aplicação e instalação do Esticador." : isRatchet ? "A Catraca T7 é uma opção reforçada para trabalhos com arames farpados ou lisos de maior espessura." : `Texto placeholder para os detalhes de aplicação e instalação: ${product.name}.` },
              ].map((video, index) => (
                <ScrollReveal key={video.title} className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
                  <div className={`flex flex-col items-center gap-10 lg:justify-between ${index === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                    <div className="max-w-md text-center lg:text-left">
                      <h3 className="poppins text-2xl font-bold text-[#ff5500] lg:text-3xl">{text(video.title)}</h3>
                      <p className="poppins mt-3 text-sm text-[#002d4d] dark:text-white sm:text-base">{text(video.description)}</p>
                    </div>
                    <div className="w-full lg:w-1/2">{video.src ? <VideoCard3D videoSrc={video.src} /> : <div role="img" aria-label={`Espaço reservado para o vídeo ${index + 1}: ${product.name}`} className="poppins mx-4 my-16 flex aspect-video flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#082d49]/30 bg-zinc-100 p-6 text-center text-[#082d49] dark:border-white/20 dark:bg-zinc-900 dark:text-white"><span className="font-semibold">{product.name} — Vídeo 3D {index + 1}</span><span className="text-sm opacity-50">Placeholder para o vídeo</span></div>}</div>
                  </div>
                </ScrollReveal>
              ))}
              <div className="py-20"><SimilarProducts products={similarProducts} /></div>
            </>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
