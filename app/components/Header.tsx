"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  Minus,
  ArrowLeft,
  ArrowUpRight,
  ChevronsRight,
  ShoppingBag,
  Phone,
  MessageCircle,
  Mail,
} from "lucide-react";
import NavBtn from "./NavBtn";
import NavDropdown from "./NavDropdown";
import { useBeginPageTransition } from "./RouteTransition";
import { scrollToSection } from "../utils/ScrollToSection";
import { markSiteLoaded } from "../utils/siteLoaded";
import { productCategories, soldadasHexagonais, gradilModels } from "../assets/data";
import { ThemeTogglerButton } from "@/components/animate-ui/components/effects/theme-toggler";
import FillButton from "./FillButton";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "./LanguageProvider";

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

type MobileView = "main" | "produtos" | "contato";

const MobileMenuItem = ({
  label,
  onClick,
  href,
  drill,
}: {
  label: string;
  onClick?: () => void;
  href?: string;
  drill?: boolean;
}) => {
  const Icon = drill ? ChevronsRight : ArrowUpRight;
  const content = (
    <>
      <span className="truncate">{label}</span>
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-zinc-100 dark:bg-white/10">
        <Icon size={13} />
      </span>
    </>
  );
  const className =
    "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-zinc-700 dark:text-zinc-200 transition-colors hover:bg-zinc-100 dark:hover:bg-white/10";

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        onClick={onClick}
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
  );
};

const Header = () => {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState("inicio");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileView, setMobileView] = useState<MobileView>("main");
  const pathname = usePathname();
  const router = useRouter();
  const beginPageTransition = useBeginPageTransition();
  const isHome = pathname === "/";

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileView("main");
  };

  const toggleMobile = () => {
    if (!mobileOpen) {
      setMobileOpen(true);
      setMobileView("main");
    } else if (mobileView !== "main") {
      setMobileView("main");
    } else {
      closeMobile();
    }
  };

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

  const soldadaSlugByLabel: Record<string, string> = Object.fromEntries(
    soldadasHexagonais.map((item) => [item.name, item.slug])
  );

  const gradilSlugByLabel: Record<string, string> = Object.fromEntries(
    gradilModels.map((item) => [item.name, item.slug])
  );

  const goToProductCategory = (title: string) => {
    if (title === "Soldada" || title === "Hexagonal") {
      beginPageTransition();
      router.push("/soldadas-hexagonais");
    } else if (title === "Cercas Prontas") {
      beginPageTransition();
      router.push("/cercas-prontas");
    } else if (title === "Gradil") {
      beginPageTransition();
      router.push("/gradil");
    } else {
      goToSection("produtos");
    }
    closeMobile();
  };

  const produtosColumns = productCategories.map((col) => {
    if (col.title === "Cercas Prontas") {
      return {
        title: col.title,
        items: col.items.map((label) => ({
          label,
          onClick: () => {
            beginPageTransition();
            router.push(`/cercas-prontas/${cercaSlugByLabel[label]}`);
          },
        })),
      };
    }

    if (col.title === "Soldada" || col.title === "Hexagonal") {
      return {
        title: col.title,
        items: col.items.map((label) => {
          const slug = soldadaSlugByLabel[label];
          return {
            label,
            onClick: slug
              ? () => {
                  beginPageTransition();
                  router.push(`/soldadas-hexagonais/${slug}`);
                }
              : () => goToSection("produtos"),
          };
        }),
      };
    }

    if (col.title === "Gradil") {
      return {
        title: col.title,
        items: col.items.map((label) => {
          const slug = gradilSlugByLabel[label];
          return {
            label,
            onClick: slug
              ? () => {
                  beginPageTransition();
                  router.push(`/gradil/${slug}`);
                }
              : () => goToSection("produtos"),
          };
        }),
      };
    }

    return {
      title: col.title,
      items: col.items.map(toProdutos),
    };
  });

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
            className="h-20 w-auto max-[453px]:h-14"
          />
        </Link>
        <nav className="hidden min-[1244px]:flex items-center text-xs space-x-4 2xl:space-x-8">
          <NavBtn
            active={isHome && activeId === "inicio"}
            onClick={goHome}
          >
            {t("nav.inicio")}
          </NavBtn>
          <NavDropdown
            label={t("nav.produtos")}
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
            {t("nav.catalogo")}
          </NavBtn>
          <NavBtn
            to="industria"
            active={activeId === "industria"}
            onNavigate={handleNavigate}
            onClick={() => goToSection("industria")}
          >
            {t("nav.industria")}
          </NavBtn>
          <NavDropdown
            label={t("nav.contato")}
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
            <span>{t("nav.lojaVirtual")}</span>
          </FillButton>
          <LanguageSwitcher />
          <ThemeTogglerButton variant="glass" size="sm" modes={["light", "dark"]} />
        </nav>
        <div className="min-[1244px]:hidden flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeTogglerButton variant="glass" size="sm" modes={["light", "dark"]} />
          <div className="relative">
            <button
              type="button"
              onClick={toggleMobile}
              aria-label={
                !mobileOpen
                  ? t("aria.abrirMenu")
                  : mobileView !== "main"
                    ? t("aria.voltar")
                    : t("aria.fecharMenu")
              }
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ff5500] text-[#002d4d] dark:text-white"
            >
              <AnimatePresence mode="wait" initial={false}>
                {!mobileOpen ? (
                  <motion.span
                    key="menu"
                    initial={{ opacity: 0, rotate: -45 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.15 }}
                    className="flex"
                  >
                    <Menu size={18} />
                  </motion.span>
                ) : mobileView !== "main" ? (
                  <motion.span
                    key="back"
                    initial={{ opacity: 0, rotate: -45 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.15 }}
                    className="flex"
                  >
                    <ArrowLeft size={18} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="minus"
                    initial={{ opacity: 0, rotate: -45 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.15 }}
                    className="flex"
                  >
                    <Minus size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <AnimatePresence>
              {mobileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {mobileView === "main" && (
                      <motion.div
                        key="main"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 8 }}
                        transition={{ duration: 0.15 }}
                        className="flex flex-col p-1.5"
                      >
                        <MobileMenuItem
                          label={t("nav.inicio")}
                          onClick={() => {
                            goHome();
                            closeMobile();
                          }}
                        />
                        <MobileMenuItem
                          label={t("nav.produtos")}
                          drill
                          onClick={() => setMobileView("produtos")}
                        />
                        <MobileMenuItem
                          label={t("nav.catalogo")}
                          onClick={() => {
                            goToSection("catalogo");
                            closeMobile();
                          }}
                        />
                        <MobileMenuItem
                          label={t("nav.industria")}
                          onClick={() => {
                            goToSection("industria");
                            closeMobile();
                          }}
                        />
                        <MobileMenuItem
                          label={t("nav.contato")}
                          drill
                          onClick={() => setMobileView("contato")}
                        />
                        <MobileMenuItem
                          label={t("nav.lojaVirtual")}
                          href="https://www.casadascercas.com.br"
                          onClick={closeMobile}
                        />
                      </motion.div>
                    )}

                    {mobileView === "produtos" && (
                      <motion.div
                        key="produtos"
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.15 }}
                        className="flex flex-col p-1.5"
                      >
                        {produtosColumns.map((col) => (
                          <MobileMenuItem
                            key={col.title}
                            label={col.title}
                            onClick={() => goToProductCategory(col.title)}
                          />
                        ))}
                      </motion.div>
                    )}

                    {mobileView === "contato" && (
                      <motion.div
                        key="contato"
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.15 }}
                        className="flex flex-col p-1.5"
                      >
                        {contatoItems.map((item) => (
                          <MobileMenuItem
                            key={item.label}
                            label={item.label}
                            href={item.href}
                            onClick={closeMobile}
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
