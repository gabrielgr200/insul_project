'use client';

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const COLOR_IMAGES = [
  "/images/Gradil_Cores/INSUL_00_GRADIL_AMARELO_placas.webp",
  "/images/Gradil_Cores/INSUL_00_GRADIL_AZUL_placas.webp",
  "/images/Gradil_Cores/INSUL_00_GRADIL_BRANCO_placas.webp",
  "/images/Gradil_Cores/INSUL_00_GRADIL_CINZA_placas.webp",
  "/images/Gradil_Cores/INSUL_00_GRADIL_GALVANIZADO_placas.webp",
  "/images/Gradil_Cores/INSUL_00_GRADIL_PRETO_placas.webp",
  "/images/Gradil_Cores/INSUL_00_GRADIL_VERDE_placas.webp",
];

const GradilColorFade = ({ className = "" }: { className?: string }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % COLOR_IMAGES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.img
          key={COLOR_IMAGES[index]}
          src={COLOR_IMAGES[index]}
          alt="Gradil - cores disponíveis"
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
