'use client';

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useContentTranslation } from "./LanguageProvider";

const COLOR_IMAGES = [
  "/images/Gradil_Cores/INSUL_00_GRADIL_AMARELO_placas.webp",
  "/images/Gradil_Cores/INSUL_00_GRADIL_AZUL_placas.webp",
  "/images/Gradil_Cores/INSUL_00_GRADIL_BRANCO_placas.webp",
  "/images/Gradil_Cores/INSUL_00_GRADIL_CINZA_placas.webp",
  "/images/Gradil_Cores/INSUL_00_GRADIL_GALVANIZADO_placas.webp",
  "/images/Gradil_Cores/INSUL_00_GRADIL_PRETO_placas.webp",
  "/images/Gradil_Cores/INSUL_00_GRADIL_VERDE_placas.webp",
];

const G12_COLOR_IMAGES = [
  "/images/Gradil_Cores/G12/INSUL_00_GRADIL-G12_AMARELO_placas.png",
  "/images/Gradil_Cores/G12/INSUL_00_GRADIL-G12_PRETO_placas.png",
];

const GradilColorFade = ({ className = "", model }: { className?: string; model?: string }) => {
  const translateText = useContentTranslation();
  const images = model === "g12" ? G12_COLOR_IMAGES : COLOR_IMAGES;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index % images.length]}
          src={images[index % images.length]}
          alt={translateText("Gradil - cores disponíveis")}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="h-full w-full object-cover"
        />
      </AnimatePresence>
    </div>
  );
};

export default GradilColorFade;
