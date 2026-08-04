"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, ShoppingBag, Phone, MessageCircle, Mail } from "lucide-react";
import NavBtn from "./NavBtn";
import NavDropdown from "./NavDropdown";
import { useBeginPageTransition } from "./RouteTransition";
import { scrollToSection } from "../utils/ScrollToSection";
import { markSiteLoaded } from "../utils/siteLoaded";
import { productCategories } from "../assets/data";
import { ThemeTogglerButton } from "@/components/animate-ui/components/effects/theme-toggler";
import FillButton from "./FillButton";

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

  useEffect(() => {
    markSiteLoaded();
  }, []);

  const goHome = () => {
    if (isHome) {
      scrollToSection("inicio");
    } else {
      beginPageTransition();
      router.push("/");
    }
  };

  const goToSection = (id: string) => {
    if (isHome) {
      scrollToSection(id);
    } else {
      beginPageTransition();
      // scroll:false evita o scroll nativo do Next para o hash, que briga
      // com o ScrollSmoother (baseado em transform) e "puxa" de volta pro topo
      router.push(`/#${id}`, { scroll: false });
    }
  };

  const handleNavigate = (id?: string) => {
    if (id) setActiveId(id);
  };

  const toProdutos = (label: string) => ({
    label,
    onClick: () => goToSection("produtos"),
  });

  const cercaSlugByLabel: Record<string, string> = {
    "Cerca Fenix": "fenix",
    "Cerca Campeira Maxx": "campeira-maxx",
    "Cerca Campeira": "campeira",
    "Cerca Campeira Boi": "campeira-boi",
  };

  const produtosColumns = productCategories.map((col) =>
    col.title === "Cercas Prontas"
      ? {
          title: col.title,
          items: col.items.map((label) => ({
            label,
            onClick: () => {
              beginPageTransition();
              router.push(`/cercas-prontas/${cercaSlugByLabel[label]}`);
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
    <header className="fixed border-b border-b-zinc-300 dark:border-b-zinc-700 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-lg min-w-full py-6 lg:py-7 px-4 sm:px-8 max-w-7xl overflow-x-clip z-99">
      <div className="w-full flex items-center justify-between">
        <Link href="/" className="shrink-0">
          <img
            src="/images/logos.png"
            alt="Insul"
            className="h-20 w-auto"
          />
        </Link>
        <nav className="hidden xl:flex items-center text-xs space-x-4 2xl:space-x-8">
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
            onLabelClick={() => goToSection("produtos")}
          />
          <NavBtn
            to="catalogo"
            active={activeId === "catalogo"}
            onNavigate={handleNavigate}
            onClick={() => goToSection("catalogo")}
          >
            Catálogo
          </NavBtn>
          <NavBtn
            to="industria"
            active={activeId === "industria"}
            onNavigate={handleNavigate}
            onClick={() => goToSection("industria")}
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
          <FillButton
            href="https://www.casadascercas.com.br"
            target="_blank"
            rel="noreferrer"
            className="whitespace-nowrap bg-[#ff5500] text-white text-sm py-4 px-4
            2xl:px-6 rounded-full cursor-pointer ml-2 2xl:ml-4 border border-[#FF6A1A]"
            overlayClassName="bg-white dark:bg-background text-[#ff5500]"
          >
            <ShoppingBag size={16} />
            <span>Loja virtual</span>
          </FillButton>
          <ThemeTogglerButton variant="glass" size="sm" modes={["light", "dark"]} />
        </nav>
        <div className="xl:hidden flex items-center gap-3">
          <ThemeTogglerButton variant="glass" size="sm" modes={["light", "dark"]} />
          <Menu className="size-10 text-zinc-900 dark:text-zinc-100" />
        </div>
      </div>
    </header>
  );
};

export default Header;
