"use client";

import type { WireProduct } from "../assets/wireProducts";
import ProductDetailHero from "./ProductDetailHero";

export default function WireProductHero({ product }: { product: WireProduct }) {
  const name = product.family === "eletrica" ? product.name : `${product.title} ${product.name}`;
  return (
    <ProductDetailHero
      name={name}
      category="Arames"
      description={product.shortDescription}
      image={product.src}
      specifications={product.paragraph}
      circularOrbit
      imageScale={1.2}
      backgroundColor="#E9ECEF"
    />
  );
}
