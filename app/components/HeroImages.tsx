"use client";

import Image from "next/image";
import { useTranslation } from "./LanguageProvider";

const HeroImages = ({ src }: { src: string }) => {
  const { t } = useTranslation();
  return (
    <Image
      src={src}
      alt={t("hero.imagemAlt")}
      width={1000}
      height={1000}
      priority
      className="block w-full h-auto object-contain saturate-120 HERO-IMAGE-WRAPPER"
    />
  );
};

export default HeroImages;
