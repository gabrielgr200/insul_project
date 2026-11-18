import { accessoriesCards, cercasProntas, gradilModels, soldadasHexagonais } from "../assets/data";
import { wireProducts } from "../assets/wireProducts";
import { accessorySlug } from "./accessorySlug";

const pages: Record<string, string> = {
  "/": "Home",
  "/cercas-prontas": "Cercas Prontas",
  "/soldadas-hexagonais": "Telas Soldadas e Hexagonais",
  "/gradil": "Gradil",
  "/arames": "Arames",
  "/acessorios": "Acessórios",
  "/cerca-fenix": "Cerca Fênix",
};

export function transitionPageName(href: string) {
  const pathname = decodeURIComponent(href.split(/[?#]/)[0]).replace(/\/$/, "") || "/";
  if (pages[pathname]) return pages[pathname];
  const [category, slug] = pathname.split("/").filter(Boolean);
  const product = category === "cercas-prontas" ? cercasProntas.find(item => item.slug === slug)
    : category === "soldadas-hexagonais" ? soldadasHexagonais.find(item => item.slug === slug)
    : category === "gradil" ? gradilModels.find(item => item.slug === slug)
    : category === "arames" ? wireProducts.find(item => item.slug === slug)
    : category === "acessorios" ? accessoriesCards.find(item => accessorySlug(item.name) === slug)
    : undefined;
  return product?.name ?? (slug || category || "Home").replaceAll("-", " ").replace(/\b\w/g, letter => letter.toUpperCase());
}
