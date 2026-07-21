"use client";

import { Fragment } from "react";
import { motion, Variants } from "framer-motion";

const WORD_STAGGER = 0.08;

const word: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  show: (globalIndex: number) => ({
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: globalIndex * WORD_STAGGER,
    },
  }),
};

interface BlurRevealTextProps {
  text: string | string[];
  className?: string;
}

const BlurRevealText = ({ text, className }: BlurRevealTextProps) => {
  const paragraphs = Array.isArray(text) ? text : [text];

  let globalIndex = 0;

  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
      {paragraphs.map((paragraph, pIndex) => {
        const words = paragraph.split(" ");

        return (
          <p key={pIndex} className={`${className ?? ""} ${pIndex !== 0 ? "mt-4" : ""}`}>
            {words.map((w, i) => {
              const index = globalIndex++;
              return (
                <Fragment key={i}>
                  <motion.span
                    variants={word}
                    custom={index}
                    className="inline-block will-change-[filter,opacity]"
                  >
                    {w}
                  </motion.span>
                  {i !== words.length - 1 ? " " : ""}
                </Fragment>
              );
            })}
          </p>
        );
      })}
    </motion.div>
  );
};

export default BlurRevealText;
