'use client';

import { ArrowUp } from "lucide-react";
import { scrollToSection } from "../utils/ScrollToSection";
import SocialLinks from "./SocialLinks";

const footerColumns = [
  {
    title: "PRODUTOS",
    items: [
      { label: "Telas Soldadas", id: "produtos" },
      { label: "Telas Hexagonais", id: "produtos" },
      { label: "Cercas Prontas", id: "produtos" },
      { label: "Gradil", id: "produtos" },
      { label: "Arames", id: "produtos" },
    ],
  },
  {
    title: "EMPRESA",
    items: [
      { label: "Início", id: "inicio" },
      { label: "Indústria", id: "industria" },
      { label: "Distribuição", id: "distribuicao" },
      { label: "Dúvidas", id: "duvidas" },
    ],
  },
  {
    title: "CONTATO",
    items: [
      { label: "(51) 3723-1519", href: "tel:+555137231519" },
      { label: "WhatsApp", href: "https://wa.me/5551995098453" },
      {
        label: "contato@casadascercas.com.br",
        href: "mailto:contato@casadascercas.com.br",
      },
    ],
  },
  {
    title: "LOJA",
    items: [
      { label: "Casa das Cercas", href: "https://www.casadascercas.com.br" },
      { label: "Catálogo", id: "catalogo" },
    ],
  },
];

interface FooterItem {
  label: string;
  href?: string;
  id?: string;
}

const FooterLink = ({ item }: { item: FooterItem }) => {
  if (item.href) {
    return (
      <a
        href={item.href}
        target={item.href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        className="text-sm text-white/60 hover:text-[#ff5500] transition-colors"
      >
        {item.label}
      </a>
    );
  }

  return (
    <button
      onClick={() => item.id && scrollToSection(item.id)}
      className="text-sm text-white/60 hover:text-[#ff5500] transition-colors text-left cursor-pointer"
    >
      {item.label}
    </button>
  );
};

const Footer = () => {
  return (
    <footer className="relative bg-[#001b30] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-20 pb-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-12">
          <div className="max-w-xs">
            <p className="text-2xl font-bold uppercase tracking-tight">
              Insul
            </p>
            <p className="text-sm text-white/50 leading-relaxed mt-4">
              Fabricamos telas, cercas e gradis com qualidade industrial e
              entrega para todo o Brasil.
            </p>

            <SocialLinks />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <p className="text-xs text-white/40 tracking-widest mb-4">
                  {col.title}
                </p>
                <ul className="flex flex-col gap-3">
                  {col.items.map((item) => (
                    <li key={item.label}>
                      <FooterLink item={item} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Insul. Todos os direitos reservados.</p>
          <button
            onClick={() => scrollToSection("inicio")}
            className="flex items-center gap-1 hover:text-[#ff5500] transition-colors cursor-pointer"
          >
            <ArrowUp size={14} /> Voltar ao topo
          </button>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute -bottom-[0.14em] left-1/2 -translate-x-1/2
        text-[18vw] leading-none font-black uppercase text-white/5 whitespace-nowrap"
      >
        INSUL
      </span>
    </footer>
  );
};

export default Footer;
