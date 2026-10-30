"use client";

import { useLayoutEffect, useRef } from "react";
import { notFound } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WireProductHero from "../components/WireProductHero";
import BlurRevealText from "../components/BlurRevealText";
import SimilarProducts from "../components/SimilarProducts";
import ScrollReveal from "../components/ScrollReveal";
import { useContentTranslation } from "../components/LanguageProvider";
import { wireProducts } from "../assets/wireProducts";

export default function WireProductPage({ slug }: { slug: string }) {
  const text = useContentTranslation();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return;
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const smoother = ScrollSmoother.create({ wrapper: wrapperRef.current!, content: contentRef.current!, smooth: 1.8, effects: true, normalizeScroll: true });
      let timer: ReturnType<typeof setTimeout>;
      const refresh = () => { clearTimeout(timer); timer = setTimeout(() => ScrollTrigger.refresh(), 200); };
      const observer = new ResizeObserver(refresh);
      observer.observe(contentRef.current!);
      window.addEventListener("load", refresh);
      refresh();
      return () => { clearTimeout(timer); observer.disconnect(); window.removeEventListener("load", refresh); smoother.kill(); };
    });
    return () => media.revert();
  }, [slug]);

  const product = wireProducts.find(item => item.slug === slug);
  if (!product) notFound();
  const remaining = wireProducts.filter(item => item.slug !== slug);
  const similar = [...remaining.filter(item => item.family === product.family), ...remaining.filter(item => item.family !== product.family)].slice(0, 3)
    .map(item => ({ src: item.src, cutout: item.src, title: item.title, name: `${item.title} ${item.name}`, color: "#082d49", to: `/arames/${item.slug}` }));

  return (
    <div className="min-h-screen overflow-clip">
      <div data-theme="light"><Header /></div>
      <div ref={wrapperRef}><div ref={contentRef} className="relative">
        <main>
          <WireProductHero product={product} />
          <section className="py-16">
            <BlurRevealText text={product.description.split("\n\n")} className="poppins mx-auto max-w-[1300px] px-4 text-left text-xl font-light leading-relaxed text-[#002d4d] dark:text-white sm:px-8" />
            <p className="poppins mx-auto mt-8 max-w-[1300px] px-4 text-sm leading-relaxed text-[#082d49]/65 dark:text-white/65 sm:px-8">{text(product.paragraph)}</p>
          </section>
          {[0, 1].map(index => <ScrollReveal key={index} className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
            <div className={`flex flex-col items-center gap-10 lg:justify-between ${index === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
              <div className="max-w-md text-center lg:text-left">
                <h3 className="poppins text-2xl font-bold text-[#ff5500] lg:text-3xl">{text(index === 0 ? "Detalhes do produto" : "Aplicação e instalação")}</h3>
                <p className="poppins mt-3 text-sm leading-relaxed text-[#082d49] dark:text-white sm:text-base">{text(index === 0 ? product.paragraph : "Texto placeholder para os detalhes de aplicação e instalação do produto.")}</p>
              </div>
              <div className="w-full lg:w-1/2"><div role="img" aria-label={`Espaço reservado para o vídeo ${index + 1}: ${product.title} ${product.name}`} className="poppins mx-4 my-16 flex aspect-video flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#082d49]/30 bg-zinc-100 p-6 text-center text-[#082d49] dark:border-white/20 dark:bg-zinc-900 dark:text-white"><span className="font-semibold">{text(product.title)} {product.name} — 0{index + 1}</span><span className="text-sm opacity-50">{text("Placeholder para o vídeo")}</span></div></div>
            </div>
          </ScrollReveal>)}
          <div className="py-20"><SimilarProducts products={similar} /></div>
        </main>
        <Footer />
      </div></div>
    </div>
  );
}
