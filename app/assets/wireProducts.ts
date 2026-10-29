import { arameCards, arameCardsPvc, type ProductCardData } from "./data";

export type WireProduct = ProductCardData & { slug: string; menuLabel: string; family: "galvanizado" | "pvc" | "eletrica" };

export const wireProducts: WireProduct[] = [
  ...arameCards.map(product => ({ ...product, slug: `galvanizado-${product.name.toLowerCase().replaceAll(" ", "-")}`, menuLabel: `Arame ${product.name.replace("BWG ", "")}`, family: "galvanizado" as const })),
  ...arameCardsPvc.map(product => ({ ...product, slug: `pvc-${product.name.toLowerCase().replaceAll(" ", "-")}`, menuLabel: `Arame ${product.name.replace("BWG ", "")} + PVC`, family: "pvc" as const })),
  {
    slug: "arame-cerca-eletrica", menuLabel: "Arame Cerca Elétrica", family: "eletrica",
    name: "Arame Cerca Elétrica", title: "Arame para cerca elétrica",
    src: "/images/img-produtos-avatar/arame_eletrica.png",
    paragraph: "Texto placeholder para as especificações do arame para cerca elétrica.",
    shortDescription: "Texto placeholder para a apresentação do arame para cerca elétrica.",
    description: "Texto placeholder para a descrição do arame para cerca elétrica. Substituir pelas informações do produto.",
    postSpacing: "", animals: [],
  },
];

export function wireProductHref(name: string, pvc = false) {
  return `/arames/${pvc ? "pvc" : "galvanizado"}-${name.toLowerCase().replaceAll(" ", "-")}`;
}
