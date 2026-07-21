'use client';

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "O que preciso para ser revendedor Insul?",
    answer:
      "Basta você possuir um CNPJ válido no segmento de atacado, indústria ou revenda de materiais de construção, ferragens ou produtos agropecuários e fazer contato com nosso time de atendimento.",
  },
  {
    question: "A Insul atende em todo Brasil?",
    answer:
      "Sim, atendemos todo o Brasil, porém, com maior foco na Região Sul e Sudeste. Para clientes de outras regiões do país, geralmente operamos com frete até SP, onde acontece o redespacho por uma transportadora da escolha do cliente, ou ainda com coleta de material na fábrica.",
  },
  {
    question: "A Insul atende construtoras diretamente?",
    answer:
      "Sim, atendemos construtoras em todo o Brasil que precisarem de nossos produtos, basta entrar em contato com nosso time de atendimento.",
  },
  {
    question: "A Insul vende para consumidor final (CPF)?",
    answer:
      "Sim, para isso criamos nossa loja virtual, a Casa das Cercas, com atendimento especial para todo tipo de consumidor final. Acesse: www.casadascercas.com.br.",
  },
  {
    question: "Qual matéria-prima é utilizada?",
    answer:
      "A Insul utiliza basicamente matérias-primas nacionais de primeira qualidade e têm a Gerdau como sua principal fornecedora, sendo o seu maior cliente de arames galvanizados no Sul do Brasil.",
  },
  {
    question: "Qual a garantia dos produtos Insul?",
    answer:
      "Todos produtos tem garantia de fábrica e elas variam em 5, 2 ou 1 ano(s), desde que utilizados de maneira correta em ambiente apropriado. Independente disso, as telas galvanizadas a fogo, em sua maioria, são produzidas para durar mais de 15 anos em ambientes não litorâneos.",
  },
];

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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="duvidas" className="bg-[#002d4d] text-white py-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs text-white/50 tracking-[0.2em] mb-4">
              <span className="w-2 h-2 rounded-full border border-white/50" />
              PERGUNTAS FREQUENTES
            </div>
            <h2 className="text-5xl sm:text-7xl font-bold uppercase tracking-tight">
              Dúvidas
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-white/40 uppercase tracking-wide max-w-xs sm:text-right">
            Tudo o que você precisa saber sobre nossos produtos, matéria e
            empresa.
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
