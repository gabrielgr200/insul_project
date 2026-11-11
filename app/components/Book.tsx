'use client';

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import mobileMockup from "../../public/images/Mockup-catalogo/mockup-androids-4.png";
import CatalogPhoneCarousel from "./CatalogPhoneCarousel";
import CatalogWheelNav from "./CatalogWheelNav";

import notebookMockup from "../../public/images/Mockup-catalogo/mockup-mac-1.png";
import styles from "./Book.module.css";

import HTMLFlipBook from "react-pageflip";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, LayoutGrid } from "lucide-react";
import { gsap } from "gsap";
import { useScrollTextReveal } from "./useScrollTextReveal";
import TextArrowCTA from "./TextArrowCTA";
import { productCategories } from "../assets/data";
import type { ProductCategory } from "../assets/data";
import { scrollToSection } from "../utils/ScrollToSection";
import { useTranslation } from "./LanguageProvider";
import { useContentTranslation } from "./LanguageProvider";

const findCategory = (title: string): ProductCategory =>
  productCategories.find((category) => category.title === title)!;

const acessoriosResumo: ProductCategory = {
  title: "Acessórios",
  items: ["Catraca T7", "Catraca Micro", "Poste T", "Batedor de poste T"],
};

const pages: {
  src: string;
  categories: ProductCategory[];
  backCover?: boolean;
}[] = [
    { src: "/Catalogo/Capa.png", categories: [] },
    { src: "/Catalogo/Soldada_2.png", categories: [findCategory("Soldada")] },
    { src: "/Catalogo/Gradil_3.png", categories: [findCategory("Gradil")] },
    { src: "/Catalogo/Fenix_4.png", categories: [] },
    { src: "/Catalogo/Info_5.png", categories: [] },
    { src: "/Catalogo/Cerca_6.png", categories: [findCategory("Cercas Prontas")] },
    { src: "/Catalogo/Hexagonal_7.png", categories: [findCategory("Hexagonal")] },
    {
      src: "/Catalogo/Torção_8.png",
      categories: [findCategory("Torção Simples"), acessoriosResumo],
    },
    { src: "/Catalogo/ContraCapa.png", categories: [], backCover: true },
  ];

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.06,
      when: "afterChildren",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.4, y: 26 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    scale: 0.4,
    y: 26,
    transition: { duration: 0.18, ease: [0.7, 0, 0.84, 0] as const },
  },
};

const CategoryToggle = ({ category }: { category: ProductCategory }) => {
  const translateText = useContentTranslation();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleSelect = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection("produtos");
    setOpen(false);
  };

  const stop = (e: React.SyntheticEvent) => e.stopPropagation();

  return (
    <div
      className="relative flex flex-col items-center"
      onClick={stop}
      onMouseDown={stop}
      onPointerDown={stop}
      onTouchStart={stop}
    >
      <AnimatePresence>
        {hovered && !open && (
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-full top-1/2 -translate-y-1/2 mr-3 z-20
              whitespace-nowrap bg-[#ff5500] text-white text-xs font-medium
            px-3 py-2 rounded-lg shadow-lg pointer-events-none"
          >
            {t("book.tooltip")}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute bottom-full mb-3 flex flex-col-reverse items-center gap-2
            min-w-[190px]"
          >
            {[...category.items].reverse().map((item) => (
              <motion.a
                key={item}
                variants={itemVariants}
                style={{ transformOrigin: "bottom center" }}
                href="#produtos"
                onClick={handleSelect}
                className="text-sm text-zinc-600 font-medium whitespace-nowrap w-full text-center
                bg-white shadow-md border border-zinc-200 hover:text-[#ff5500] hover:bg-zinc-50
                transition-colors duration-150 px-3 py-2 rounded-lg"
              >
                {translateText(item)}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={translateText(`${t("book.ver")} ${category.title}`)}
        className="flex items-center justify-center w-11 h-11 rounded-full
        bg-[#ff5500] text-white shadow-xl border border-[#FF6A1A] cursor-pointer
        transition-colors duration-150 ease-in hover:bg-white hover:text-[#ff5500]"
      >
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex pointer-events-none"
        >
          <Plus size={20} />
        </motion.span>
      </button>
    </div>
  );
};

interface FlipBookHandle {
  pageFlip: () => { flipNext: () => void };
}

const Book = () => {
  const [catalogPage, setCatalogPage] = useState(0);
  const [catalogMenuOpen, setCatalogMenuOpen] = useState(false);
  const handleCatalogPageChange = useCallback((page: number) => {
    setCatalogPage(page);
    setCatalogMenuOpen(false);
  }, []);
  const translateText = useContentTranslation();
  const { t } = useTranslation();
  const bookRef = useRef<FlipBookHandle>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useScrollTextReveal(sectionRef, ".BOOK-LABEL, .BOOK-TITLE > span, .BOOK-TEXT > p, [data-catalog-description]");

  const playFlipSound = () => {
    const audio = new Audio("/sounds/page-flip.mp3");
    audio.volume = 0.4;
    audio.play().catch(() => { });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power1.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });

      tl.from(".BOOK-CONTENT", { scale: 0.9, opacity: 0, duration: 0.8 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="catalogo"
      className="home-wide-section relative max-w-7xl mx-auto p-4 sm:p-8 !pb-0 mt-20 mb-0"
    >
      <div className={styles.header}>
        <h3 className={`BOOK-LABEL poppins font-semibold text-2xl text-[#002d4d] dark:text-white ${styles.label}`}>
          {t("book.label")}
        </h3>
        <h2 className={`BOOK-TITLE heading-2 poppins text-5xl ${styles.title}`}>
          <span>{t("book.tituloLinha1")}</span>
          <span>{t("book.tituloLinha2")}</span>
        </h2>
        <div className={`BOOK-TEXT text-[#002d4d] dark:text-white ${styles.description}`}>
          <p className="poppins">{t("book.texto")}</p>
        </div>
        <div className={styles.notebook}>
          <Image
            src={notebookMockup}
            alt={translateText("Catálogo digital de produtos Insul no notebook")}
            fill
            sizes="(min-width: 1920px) 1200px, (min-width: 1024px) 850px, 100vw"
            className="object-contain"
          />
        </div>
        <div className={styles.cards} aria-label={translateText("Conheça nosso catálogo")}>
          <div className={`${styles.statCard} ${styles.statCardLight} poppins`}>
            <div className={styles.statTop}>
              <span className={styles.statBadge}><span />{translateText("Produtos")}</span>
              <span>01</span>
            </div>
            <p className={styles.statValue}>25+</p>
            <p className={styles.statTitle}>{translateText("Modelos de cercamento")}</p>
            <p className={styles.statDescription}>{translateText("Telas, gradis, cercas e acessórios para o seu projeto.")}</p>
          </div>
          <div className={`${styles.statCard} ${styles.statCardAccent} poppins`}>
            <div className={styles.statTop}>
              <span className={styles.statBadge}><span />{translateText("Catálogo")}</span>
              <span>02</span>
            </div>
            <p className={styles.statValue}>{translateText("Digital")}</p>
            <p className={styles.statTitle}>{translateText("Tudo em um só lugar")}</p>
            <p className={styles.statDescription}>{translateText("Explore os produtos e consulte medidas e aplicações.")}</p>
          </div>
        </div>
      </div>
      <div className={`${styles.responsiveCatalog} text-[#002d4d] dark:text-white`}>
        <div className={styles.abstractBackground} aria-hidden="true">
        </div>
        <p data-catalog-description className={`poppins ${styles.responsiveBadge}`}>{t("book.responsiveBadge")}</p>
        <h3 data-catalog-description className={`poppins ${styles.responsiveTitle}`}>{t("book.responsiveTitle")}</h3>
        <p data-catalog-description className={`poppins ${styles.responsiveSubtitle}`}>{t("book.responsiveSubtitle")}</p>
        <div className={styles.responsiveImage}>
          <Image src={mobileMockup} alt={translateText("Catálogo Insul responsivo em celulares")} sizes="(min-width: 1920px) 2100px, 180vw" className={styles.responsiveMockup} />
        </div>
      </div>
      <div className={styles.features}>
        <div className={styles.feature}>
          <div className={`${styles.mobileCopy} text-[#002d4d] dark:text-white`}>
            <div className={styles.mobileEyebrow}>
              <LayoutGrid size={19} className="shrink-0 text-[#ff5500]" aria-hidden="true" />
              <p data-catalog-description className="poppins">{t("book.mobileIntro")}</p>
            </div>
            <p data-catalog-description className={`poppins whitespace-pre-line ${styles.featureText}`}>
              {t("book.mobileDetails")}
            </p>
            <CatalogWheelNav page={catalogPage} onOpenChange={setCatalogMenuOpen} />
          </div>
          <CatalogPhoneCarousel onPageChange={handleCatalogPageChange} menuOpen={catalogMenuOpen} />
        </div>
      </div>
      <div className="BOOK-CONTENT empty:hidden mt-20 lg:mt-0 flex flex-col items-center gap-6 lg:gap-20 lg:flex-row lg:justify-between">
        {/* <TextArrowCTA
          onClick={() => bookRef.current?.pageFlip().flipNext()}
          className="lg:mr-6"
        />

        <div className="w-full max-w-[250px] sm:max-w-[340px] lg:max-w-[800px] lg:flex lg:justify-end">
          <HTMLFlipBook
            className=""
            style={{}}
            startPage={0}
            width={360}
            height={508}
            size="stretch"
            minWidth={220}
            maxWidth={460}
            minHeight={311}
            maxHeight={650}
            showCover={true}
            mobileScrollSupport={true}
            flippingTime={1000}
            drawShadow={false}
            usePortrait={true}
            startZIndex={0}
            autoSize={true}
            maxShadowOpacity={0.5}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
            disableFlipByClick={false}
            onFlip={playFlipSound}
            ref={bookRef}
          >
            {pages.map(({ src, categories, backCover }, i) => (
              <div key={i} className="page relative bg-white shadow-2xl @container">
                <Image
                  src={src}
                  alt={translateText(`${t("book.pagina")} ${i + 1}`)}
                  fill
                  sizes="(min-width: 1024px) 460px, (min-width: 640px) 340px, 250px"
                  quality={70}
                  priority={i === 0}
                  className="object-contain"
                />
                {categories.length > 0 && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
                    {categories.map((category) => (
                      <CategoryToggle key={category.title} category={category} />
                    ))}
                  </div>
                )}
                {backCover && (
                  <div className="absolute inset-0">
                    <div className="absolute left-0 top-[4.1%] h-[6.2%] w-[46.7%] flex items-center gap-[3%] pl-[6%] pr-[4%]">
                      <img
                        src="/images/logo_site.png"
                        alt={translateText("Insul")}
                        className="h-[52%] w-auto object-contain"
                      />
                      <div className="w-px h-[60%] bg-[#ff5500]/40 shrink-0" />
                      <img
                        src="/images/logo_casa_das_cercas.png"
                        alt={translateText("Casa das Cercas")}
                        className="h-[68%] w-auto object-contain"
                      />
                    </div>

                    <p className="absolute left-[11.7%] top-[17%] w-[85%] whitespace-nowrap text-white font-extrabold poppins leading-[1.05] text-[6.4cqw]">
                      {t("book.interessado")}
                    </p>

                    <a
                      href="#produtos"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection("produtos");
                      }}
                      className="absolute left-[10.7%] top-[23.8%] h-[5.6%] w-[56.3%]
                    flex items-center justify-center rounded-lg bg-[#ff5500]
                    text-white font-semibold poppins text-[3.4cqw] text-center
                    shadow-lg transition-colors duration-150 hover:bg-[#e64d00]"
                    >
                      {t("book.ctaSaibaMais")}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </HTMLFlipBook>
        </div> */}
      </div>
    </section>
  );
};

export default Book;













