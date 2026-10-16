import pt, { type Dictionary } from "../i18n/pt";

const normalize = (value: string) => value.replace(/\s+/g, " ").trim();
const lookups = new WeakMap<Dictionary, Map<string, string>>();
const patterns = new WeakMap<Dictionary, { source: RegExp; target: string; names: string[] }[]>();

function buildLookup(source: unknown, target: unknown, lookup: Map<string, string>) {
  if (typeof source === "string" && typeof target === "string") {
    if (source.trim()) lookup.set(normalize(source), target);
    return;
  }
  if (!source || !target || typeof source !== "object" || typeof target !== "object") return;
  for (const key of Object.keys(source)) {
    buildLookup((source as Record<string, unknown>)[key], (target as Record<string, unknown>)[key], lookup);
  }
}

// Keep source identifiers and product data unchanged; translate visible copy only.
export function translateContentText<T>(value: T, dictionary: Dictionary): T {
  if (typeof value !== "string" || dictionary === pt) return value;
  let lookup = lookups.get(dictionary);
  if (!lookup) {
    lookup = new Map();
    buildLookup(pt, dictionary, lookup);
    lookups.set(dictionary, lookup);
    const templates: { source: RegExp; target: string; names: string[] }[] = [];
    for (const [source, target] of lookup) {
      if (!/\{\w+\}/.test(source)) continue;
      const names: string[] = [];
      const escaped = source.split(/(\{\w+\})/).map((part) => {
        if (/^\{\w+\}$/.test(part)) {
          names.push(part.slice(1, -1));
          return "(.+?)";
        }
        return part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }).join("");
      templates.push({ source: new RegExp(`^${escaped}$`), target, names });
    }
    patterns.set(dictionary, templates);
  }
  const normalized = normalize(value);
  let translated = lookup.get(normalized);
  if (!translated) {
    for (const template of patterns.get(dictionary) ?? []) {
      const match = normalized.match(template.source);
      if (!match) continue;
      translated = template.target;
      template.names.forEach((name, index) => {
        translated = translated!.replaceAll(`{${name}}`, translateContentText(match[index + 1], dictionary));
      });
      break;
    }
  }
  // Product model names stay intact; translate the generic product category.
  if (!translated && normalized.length < 80 && !/[.,:;]/.test(normalized)) {
    const model = normalized.match(/^(Tela|Telas|Cerca|Cercas|Gradil|Arame) ([A-ZÀ-Ý0-9].*)$/);
    if (model) {
      const category = lookup.get(model[1]);
      if (category) translated = category === "Mesh" || category === "Fence" || category === "Wire"
        ? `${model[2]} ${category.toLowerCase()}`
        : `${category} ${model[2]}`;
    }
  }
  if (!translated) return value;
  const leading = value.match(/^\s*/)?.[0] ?? "";
  const trailing = value.match(/\s*$/)?.[0] ?? "";
  return `${leading}${translated}${trailing}` as T;
}
