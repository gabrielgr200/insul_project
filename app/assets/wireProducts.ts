import { arameCards, arameCardsPvc, type ProductCardData } from "./data";

export type WireProduct = ProductCardData & { slug: string; menuLabel: string; family: "galvanizado" | "pvc" | "eletrica"; heroImage?: string };

export const wireProducts: WireProduct[] = [
  ...arameCards.map(product => ({ ...product, slug: product.to?.split("/").pop() ?? `galvanizado-${product.name.toLowerCase().replaceAll(" ", "-")}`, menuLabel: product.to ? product.name : `Arame ${product.name.replace("BWG ", "")}`, family: product.to === "/arames/arame-cerca-eletrica" ? "eletrica" as const : "galvanizado" as const })),
  ...arameCardsPvc.map(product => ({ ...product, slug: `pvc-${product.name.toLowerCase().replaceAll(" ", "-")}`, menuLabel: `Arame ${product.name.replace("BWG ", "")} + PVC`, family: "pvc" as const })),
];

export function wireProductHref(name: string, pvc = false) {
  return `/arames/${pvc ? "pvc" : "galvanizado"}-${name.toLowerCase().replaceAll(" ", "-")}`;
}
