"use client";

import { notFound } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductDetailHero from "../components/ProductDetailHero";
import { accessoriesCards } from "../assets/data";
import { accessorySlug } from "../utils/accessorySlug";
import { useContentTranslation } from "../components/LanguageProvider";

export default function AccessoryProductPage({ slug }: { slug: string }) {
  const text = useContentTranslation();
  const product = accessoriesCards.find(item => accessorySlug(item.name) === slug);
  if (!product) notFound();

  return (
    <div className="min-h-screen overflow-clip">
      <div data-theme="light"><Header /></div>
      <main>
        <ProductDetailHero name={product.name} category="Acessórios" description={product.shortDescription} image={product.src} specifications={product.paragraph} />
        <section id="product-details" className="poppins mx-auto max-w-5xl scroll-mt-28 px-6 py-20 text-[#082d49] dark:text-white">
          <h2 className="text-3xl font-bold">{text(product.name)}</h2>
          <p className="mt-5 leading-relaxed opacity-70">{text(product.description)}</p>
          <p className="mt-5 leading-relaxed">{text(product.paragraph)}</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
