"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, ShoppingBag, Phone, MessageCircle, Mail } from "lucide-react";
import NavBtn from "./NavBtn";
import NavDropdown from "./NavDropdown";
import { useBeginPageTransition } from "./RouteTransition";
import { scrollToSection } from "../utils/ScrollToSection";
import { productCategories } from "../assets/data";

const contatoItems = [
  {
    label: "(51) 3723-1519",
    href: "tel:+555137231519",
    icon: Phone,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/5551995098453",
    icon: MessageCircle,
  },
  {
    label: "contato@casadascercas.com.br",
    href: "mailto:contato@casadascercas.com.br",
    icon: Mail,
  },
];

const sectionIds = ["inicio", "industria", "produtos", "catalogo"];

const Header = () => {
  const [activeId, setActiveId] = useState("inicio");
  const pathname = usePathname();
  const router = useRouter();
  const beginPageTransition = useBeginPageTransition();
  const isHome = pathname === "/";

  const goHome = () => {
    if (isHome) {
      scrollToSection("inicio");
    } else {
      beginPageTransition();
      router.push("/");
    }
  };

  const handleNavigate = (id?: string) => {
    if (id) setActiveId(id);
  };

  const toProdutos = (label: string) => ({
    label,
    onClick: () => scrollToSection("produtos"),
  });

  const produtosColumns = productCategories.map((col) =>
    col.title === "Cercas Prontas"
      ? {
          title: col.title,
          items: col.items.map((label) => ({
            label,
            onClick: () => {
              beginPageTransition();
              router.push(
                label === "Cerca Fenix" ? "/cerca-fenix" : "/cercas-prontas"
              );
            },
          })),
        }
      : {
          title: col.title,
          items: col.items.map(toProdutos),
        }
  );

  useEffect(() => {
    if (!isHome) return;
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -70% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isHome]);

  return (
    <header className="fixed border-b border-b-zinc-300 bg-white/50 backdrop-blur-lg min-w-full py-6 lg:py-7 px-4 sm:px-8 max-w-7xl overflow-x-clip z-99">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <img
            src="/images/logos.png"
            alt="Insul"
            className="h-20 w-auto"
          />
        </Link>
        <nav className="hidden lg:flex items-center text-xs space-x-8">
          <NavBtn
            active={isHome && activeId === "inicio"}
            onClick={goHome}
          >
            Ínicio
          </NavBtn>
          <NavDropdown
            label="Produtos"
            to="produtos"
            id="produtos"
            columns={produtosColumns}
            active={activeId === "produtos"}
            onNavigate={handleNavigate}
          />
          <NavBtn
            to="catalogo"
            active={activeId === "catalogo"}
            onNavigate={handleNavigate}
          >
            Catálogo
          </NavBtn>
          <NavBtn
            to="industria"
            active={activeId === "industria"}
            onNavigate={handleNavigate}
          >
            Indústria
          </NavBtn>
          <NavDropdown
            label="Contato"
            id="contato"
            items={contatoItems}
            active={activeId === "contato"}
            onNavigate={handleNavigate}
          />
          <a
            href="https://www.casadascercas.com.br"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-2 bg-[#ff5500]
            text-white text-sm py-4 px-6 rounded-full cursor-pointer
            transition-all duration-150 ease-in ml-4 hover:bg-transparent
            border border-[#FF6A1A] hover:text-[#ff5500]"
          >
            <ShoppingBag size={16} />
            <span>Loja virtual</span>
          </a>
        </nav>
        <div className="lg:hidden">
          <Menu className="size-10 text-zinc-900" />
        </div>
      </div>
    </header>
  );
};

export default Header;
