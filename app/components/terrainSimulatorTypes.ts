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
  summary: string;
}
export type Application = "terrain" | "house" | "company" | "park" | "dog";
export interface SimulatorState {
  width: number; depth: number; height: number; rotation: number;
  angle: number; zoom: number; application: Application;
}
export function simulatorSpec(product: SimulatorProduct, meshWidth?: string, meshHeight?: string): SimulatorSpec {
  const raw = product.paragraph ?? "";
  const name = product.name;
  const morada = product.slug === "tela-morada";
  const number = (s: string) => parseFloat(s.replace(",", "."));
  const cm = (s?: string) => s ? number(s) / 100 : undefined;
  const pair = raw.match(/Malha\s+([\d.,]+)\s*cm\s*x\s*([\d.,]+)\s*cm/i);
  const single = raw.match(/(?:-\s*|\()([\d.,]+)\s*cm/i);
  const wire = raw.match(/(?:Fio|Bitola)\s+([\d.,]+)\s*mm/i);
  const spacing = product.postSpacing?.match(/[\d]+(?:[.,]\d+)?/);
  const heights = (product.heights ?? []).map(number).filter(h => h > 0 && h <= 6);
  return {
    name, morada,
    kind: /hexagonal|mangueirão|galinheiro|pinteiro|viveiro/i.test(name+raw) ? "hex" : /torção/i.test(name) ? "diamond" : "rect",
    meshWidth: morada ? .05 : cm(meshWidth) || (pair ? number(pair[1]) / 100 : single ? number(single[1]) / 100 : .10),
    meshHeight: morada ? .15 : cm(meshHeight) || (pair ? number(pair[2]) / 100 : single ? number(single[1]) / 100 : .15),
    wire: morada ? .0023 : wire ? number(wire[1]) / 1000 : .0025,
    spacing: morada ? 3 : spacing ? Math.max(.5, number(spacing[0])) : 2.5,
    heights: morada ? [1,1.2,1.5,1.8,2] : heights.length ? heights : [1,1.5,1.8,2],
    color: /azul/i.test(name) ? "#22588a" : /pvc|gradil/i.test(name+raw) ? "#29563d" : "#b6c2c5",
    gradil: /gradil/i.test(name), summary: raw,
  };
}
