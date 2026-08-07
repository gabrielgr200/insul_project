'use client';

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "./LanguageProvider";

const FaqTitle = ({ text, isOpen }: { text: string; isOpen: boolean }) => (
  <h3 className="text-lg sm:text-2xl font-semibold uppercase tracking-tight">
    {text.split("").map((char: string, i: number) => (
      <span
        key={i}
        className={`inline-block transition-colors duration-300 ${
          isOpen ? "text-white" : "text-white/40 group-hover:text-white"
        }`}
        style={{ transitionDelay: `${i * 10}ms` }}
      >
        {char === " " ? " " : char}
      </span>
    ))}
  </h3>
);

interface FaqItemProps {
  index: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FaqItem = ({ index, question, answer, isOpen, onToggle }: FaqItemProps) => (
  <div className="border-b border-white/10">
    <button
      onClick={onToggle}
      className="group w-full flex items-center justify-between gap-6 py-6 text-left cursor-pointer"
    >
      <div className="flex items-center gap-4 sm:gap-8">
        <span className="text-xs text-white/30 font-medium">
          {String(index + 1).padStart(2, "0")}
        </span>
        <FaqTitle text={question} isOpen={isOpen} />
      </div>

      <ChevronDown
        size={20}
        className={`shrink-0 text-white/40 group-hover:text-[#ff5500] transition-all duration-300 ${
          isOpen ? "rotate-180 text-[#ff5500]" : ""
        }`}
      />
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="overflow-hidden"
        >
          <p className="pb-6 pl-[44px] sm:pl-20 pr-8 text-sm sm:text-base text-white/50 max-w-2xl">
            {answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const Frequently = () => {
  const { t, dict } = useTranslation();
  const faqs = dict.faq.items;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="duvidas" className="bg-[#002d4d] text-white py-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs text-white/50 tracking-[0.2em] mb-4">
              <span className="w-2 h-2 rounded-full border border-white/50" />
              {t("faq.eyebrow")}
            </div>
            <h2 className="text-5xl sm:text-7xl font-bold uppercase tracking-tight">
              {t("faq.titulo")}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-white/40 uppercase tracking-wide max-w-xs sm:text-right">
            {t("faq.subtitulo")}
          </p>
        </div>

        <div className="border-t border-white/10">
          {faqs.map((faq, index) => (
            <FaqItem
              key={faq.question}
              index={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex((prev) => (prev === index ? null : index))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Frequently;
