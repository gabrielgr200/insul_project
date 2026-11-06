export interface SimulatorProduct {
  name: string;
  slug?: string;
  paragraph?: string;
  postSpacing?: string;
  heights?: string[];
}
export interface SimulatorSpec {
  name: string;
  kind: "rect" | "hex" | "diamond";
  meshWidth: number;
  meshHeight: number;
  wire: number;
  spacing: number;
  heights: number[];
  color: string;
  gradil: boolean;
  morada: boolean;
  moradaOpen: boolean;
  moradaLeve: boolean;
  multyUso: boolean;
  multyMaxx: boolean;
  brava: boolean;
  bravaLeve: boolean;
  mangueirao16: boolean;
  mangueirao18: boolean;
  galinheiro: boolean;
  g4: boolean;
  g5: boolean;
  g12: boolean;
  titan: boolean;
  java: boolean;
  fenix: boolean;
  maxx: boolean;
  boi: boolean;
  campeira: boolean;
  torcao: boolean;
  torcaoPvc: boolean;
  lowerMeshHeight?: number;
  lowerMeshLimit?: number;
  summary: string;
}
export type Application = "terrain" | "house" | "company" | "park" | "dog" | "rural" | "sheep" | "goat" | "cattle" | "boar" | "peccary" | "whiteLippedPeccary" | "crops" | "pig" | "relief" | "sport" | "coast" | "metalwork" | "eps" | "garden" | "rabbit" | "cat" | "chicken" | "bird" | "padel" | "construction" | "cistern" | "machinery";
export interface SimulatorState {
  color?: string;
  width: number; depth: number; height: number; rotation: number;
  angle: number; zoom: number; application: Application; spacing: number;
}

// Anchor the upper rows to the top wire so the first opening is never shortened.
export function bimodalMeshLevels(spec: SimulatorSpec, height: number): number[] {
  if (!spec.lowerMeshHeight) return [];
  const preferredLimit = spec.lowerMeshLimit ?? height / 2;
  const upperRows = Math.max(1, Math.round((height - preferredLimit) / spec.meshHeight));
  const lowerLimit = Math.max(0, height - upperRows * spec.meshHeight);
  const levels = new Set<number>();
  const add = (value: number) => levels.add(Math.round(value * 1000000) / 1000000);
  for (let y = 0; y < lowerLimit - .001; y += spec.lowerMeshHeight) add(y);
  for (let row = 0; row <= upperRows; row++) add(height - row * spec.meshHeight);
  return [...levels].sort((a, b) => a - b);
}

export function simulatorSpec(product: SimulatorProduct, meshWidth?: string, meshHeight?: string): SimulatorSpec {
  const raw = product.paragraph ?? "";
  const name = product.name;
  const titan = product.slug === "tela-titan";
  const g12 = product.slug === "g12";
  const g5 = product.slug === "g5";
  const g4 = product.slug === "g4";
  const galinheiro = product.slug === "tela-galinheiro-18";
  const mangueirao18 = product.slug === "tela-mangueirao-18";
  const mangueirao16 = product.slug === "tela-mangueirao-16";
  const bravaLeve = product.slug === "tela-brava-leve";
  const brava = product.slug === "tela-brava";
  const multyMaxx = product.slug === "tela-multymax";
  const multyUso = product.slug === "tela-multi-uso";
  const moradaLeve = product.slug === "tela-morada-leve";
  const moradaOpen = product.slug === "tela-morada-open";
  const morada = product.slug === "tela-morada";
  const java = product.slug === "campeira-java";
  const fenix = product.slug === "fenix";
  const maxx = product.slug === "campeira-maxx";
  const boi = product.slug === "campeira-boi";
  const campeira = product.slug === "campeira";
  const torcao = product.slug?.startsWith("tela-torcao-simples-") ?? false;
  const torcaoPvc = product.slug?.startsWith("tela-torcao-simples-pvc-") ?? false;
  const number = (s: string) => parseFloat(s.replace(",", "."));
  const cm = (s?: string) => s ? number(s) / 100 : undefined;
  const pair = raw.match(/Malha\s+([\d.,]+)\s*cm\s*x\s*([\d.,]+)\s*cm/i);
  const single = raw.match(/(?:-\s*|\()([\d.,]+)\s*cm/i);
  const wire = raw.match(/(?:Fio|Bitola)\s+([\d.,]+)\s*mm/i);
  const spacing = product.postSpacing?.match(/[\d]+(?:[.,]\d+)?/);
  const heights = (product.heights ?? []).map(number).filter(h => h > 0 && h <= 6);
  return {
    name, morada, moradaOpen, moradaLeve, multyUso, multyMaxx, brava, bravaLeve, mangueirao16, mangueirao18, galinheiro, g4, g5, g12, titan, java, fenix, maxx, boi, campeira, torcao, torcaoPvc,
    lowerMeshHeight: java || fenix || maxx || campeira ? .10 : undefined,
    lowerMeshLimit: java ? .60 : undefined,
    kind: /hexagonal|mangueirão|galinheiro|pinteiro|viveiro/i.test(name+raw) ? "hex" : /torção/i.test(name) ? "diamond" : "rect",
    meshWidth: g12 ? .025 : g4 || g5 ? .05 : galinheiro ? .05 : mangueirao18 ? .076 : mangueirao16 ? .075 : bravaLeve ? .05 : multyMaxx ? .05 : multyUso ? .05 : moradaLeve ? .05 : moradaOpen ? .065 : titan ? .05 : brava ? .05 : torcao ? .076 : boi || campeira ? .30 : maxx ? .22 : fenix ? .10 : java ? .15 : morada ? .05 : cm(meshWidth) || (pair ? number(pair[1]) / 100 : single ? number(single[1]) / 100 : .10),
    meshHeight: g4 || g5 || g12 ? .20 : galinheiro ? .05 : mangueirao18 ? .076 : mangueirao16 ? .075 : bravaLeve ? .05 : multyMaxx ? .05 : multyUso ? .05 : moradaLeve ? .10 : moradaOpen ? .15 : titan ? .15 : brava ? .10 : torcao ? .076 : java || fenix || maxx || boi || campeira ? .20 : morada ? .15 : cm(meshHeight) || (pair ? number(pair[2]) / 100 : single ? number(single[1]) / 100 : .15),
    wire: morada ? .0023 : wire ? number(wire[1]) / 1000 : .0025,
    spacing: morada ? 3 : spacing ? Math.max(.5, number(spacing[0])) : 2.5,
    heights: morada ? [1,1.2,1.5,1.8,2] : heights.length ? heights : [1,1.5,1.8,2],
    color: g12 ? "#d5bd13" : /azul/i.test(name) ? "#22588a" : /pvc|gradil/i.test(name+raw) ? "#29563d" : "#b6c2c5",
    gradil: /gradil/i.test(name), summary: raw,
  };
}
