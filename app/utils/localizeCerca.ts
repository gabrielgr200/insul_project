import type { CercaProntaInfo, CercaFeature, CercaCaption } from "../assets/data";

export interface CercaProntaTranslationCaption {
  label: string;
  value: string;
  options?: { label: string; value: string }[];
}

export interface CercaProntaTranslationFeature {
  title: string;
  description: string;
  captions?: CercaProntaTranslationCaption[];
}

export interface CercaProntaTranslation {
  title: string;
  paragraph: string;
  shortDescription: string;
  paragraphs: string[];
  animals: string[];
  hotspot: { title: string; description: string };
  features: CercaProntaTranslationFeature[];
  videoCards: { category: string; title: string; description: string }[];
  gallery: { alt: string }[];
}

export function localizeCerca(
  cerca: CercaProntaInfo,
  tr: CercaProntaTranslation,
): CercaProntaInfo {
  return {
    ...cerca,
    title: tr.title,
    paragraph: tr.paragraph,
    shortDescription: tr.shortDescription,
    paragraphs: tr.paragraphs,
    heroSlide: {
      ...cerca.heroSlide,
      hotspot: {
        ...cerca.heroSlide.hotspot,
        title: tr.hotspot.title,
        description: tr.hotspot.description,
      },
    },
    features: cerca.features.map((f, i): CercaFeature => {
      const trFeature = tr.features[i];
      if (!trFeature) return f;
      return {
        ...f,
        title: trFeature.title,
        description: trFeature.description,
        captions: f.captions?.map((c, j): CercaCaption => {
          const trCaption = trFeature.captions?.[j];
          if (!trCaption) return c;
          return {
            ...c,
            label: trCaption.label,
            value: trCaption.value,
            options: c.options?.map((o, k) => {
              const trOption = trCaption.options?.[k];
              if (!trOption) return o;
              return { ...o, label: trOption.label, value: trOption.value };
            }),
          };
        }),
      };
    }),
    videoCards: cerca.videoCards.map((v, i) => {
      const trVideo = tr.videoCards[i];
      if (!trVideo) return v;
      return {
        ...v,
        category: trVideo.category,
        title: trVideo.title,
        description: trVideo.description,
      };
    }),
    gallery: cerca.gallery.map((g, i) => {
      const trGallery = tr.gallery[i];
      if (!trGallery) return g;
      return { ...g, alt: trGallery.alt };
    }),
  };
}
