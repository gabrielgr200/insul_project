interface PriceCatalogEntry {
  keywords: string[];
  slug: string;
  label: string;
}

export const PRICE_CATALOG: PriceCatalogEntry[] = [
  { keywords: ["campeira java", "cerca java", "java"], slug: "cerca-pronta-campeira-java-malha-15x10cm-fios-de-aco-250mm-650kgf-50m-50m", label: "Cerca Campeira Java Insul" },
  { keywords: ["fenix", "fênix"], slug: "alambrado-de-aco-fenix-50m-fios-de-aco-250mm-malha-10x10cm-50m", label: "Cerca Fênix" },
  { keywords: ["campeira maxx"], slug: "cerca-de-aco-campeira-maxx-700kgf-50m-fio-250mm", label: "Cerca Campeira Maxx" },
  { keywords: ["campeira boi"], slug: "cerca-campeira-boi-fios-de-aco-250mm-malha-20x30cm-50m", label: "Cerca Campeira Boi" },
  { keywords: ["campeira"], slug: "tela-campeira-insul", label: "Cerca Campeira" },
  { keywords: ["tela titan", "titan"], slug: "tela-de-protecao-residencial-titan-fio-2.50mm", label: "Tela Titan" },
  { keywords: ["morada open"], slug: "tela-alambrado-soldada-morada-open-fio-230mm-malha-65x15cm-rolo-25m", label: "Tela Morada Open" },
  { keywords: ["morada leve"], slug: "tela-galvanizada-morada-leve-fio-1.90", label: "Tela Morada Leve" },
  { keywords: ["tela morada", "morada"], slug: "tela-alambrado-soldada-fio-230mm-malha-5x15cm", label: "Tela Morada" },
  { keywords: ["tela brava", "brava"], slug: "tela-soldada-revestida-com-pvc-verde-brava-fio-250mm-malha-5x10cm-rolo-25m", label: "Tela Brava" },
  { keywords: ["mangueirão 16", "mangueirao 16"], slug: "tela-hexagonal-mangueirao-fio-16", label: "Tela Mangueirão 16" },
  { keywords: ["mangueirão 18", "mangueirao 18"], slug: "tela-hexagonal-mangueirao-3-x-fio-18-124mm-rolo-50m", label: "Tela Mangueirão 18" },
  { keywords: ["galinheiro"], slug: "tela-para-galinheiro", label: "Tela Galinheiro" },
  { keywords: ["pinteiro"], slug: "tela-pinteiro", label: "Tela Pinteiro" },
  { keywords: ["viveiro"], slug: "tela-viveiro", label: "Tela Viveiro" },
  { keywords: ["gradil g4", "g4"], slug: "gradil-insul-g4", label: "Gradil G4" },
  { keywords: ["gradil g5", "g5"], slug: "gradil-insul-g5-galvanizado-452mm-malha-5x20cm", label: "Gradil G5" },
  { keywords: ["gradil g12", "g12"], slug: "gradil-insul-g12-pintado-380mm-malha-25x20cm", label: "Gradil G12" },
];

const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[-–—]/g, " ").replace(/\s+/g, " ");
const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function findPriceMatches(message: string): PriceCatalogEntry[] {
  const text = normalize(message);
  const occurrences = PRICE_CATALOG.flatMap(entry => entry.keywords.flatMap(keyword => {
    const phrase = normalize(keyword);
    const regex = new RegExp(`(?<![\\p{L}\\p{N}])${escapeRegExp(phrase)}(?![\\p{L}\\p{N}])`, "gu");
    return Array.from(text.matchAll(regex), match => ({ entry, start: match.index!, end: match.index! + match[0].length }));
  }));
  // A mention of "campeira java" must not also select the generic Campeira.
  // Separate mentions in comparisons still remain distinct.
  const specific = occurrences.filter(hit => !occurrences.some(other =>
    other.entry !== hit.entry && other.start <= hit.start && other.end >= hit.end
    && other.end - other.start > hit.end - hit.start,
  ));
  specific.sort((a, b) => (b.end - b.start) - (a.end - a.start));
  return [...new Set(specific.map(hit => hit.entry))].slice(0, 2);
}

export function resolvePriceQuery(message: string, history: { text: string }[]): string {
  if (findPriceMatches(message).length) return message;
  if (!/\b(preco|valor|custa|custam|orcamento|price|cost|precio|altura)\b|\d\s*(?:m|cm)\b/.test(normalize(message))) return message;
  const previous = [...history].reverse().find(item => typeof item?.text === "string" && findPriceMatches(item.text).length);
  return previous ? `${message}\n${previous.text}` : message;
}

