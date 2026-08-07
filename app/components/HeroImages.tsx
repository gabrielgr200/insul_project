"use client";

import { useTranslation } from "./LanguageProvider";

const HeroImages = ({ src }: { src: string }) => {
  const { t } = useTranslation();
  return (
    <img
      src={src}
      alt={t("hero.imagemAlt")}
      className="block w-full h-auto object-contain saturate-120 HERO-IMAGE-WRAPPER"
    />
  );
};

export default HeroImages;
