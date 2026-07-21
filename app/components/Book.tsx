'use client';

import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { gsap } from "gsap";
import TextArrowCTA from "./TextArrowCTA";
import { productCategories } from "../assets/data";
import type { ProductCategory } from "../assets/data";
import { scrollToSection } from "../utils/ScrollToSection";

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
            Clique no botão para escolher um produto
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
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={`Ver ${category.title}`}
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
  const bookRef = useRef<FlipBookHandle>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const playFlipSound = () => {
    const audio = new Audio("/sounds/page-flip.mp3");
    audio.volume = 0.4;
    audio.play().catch(() => {});
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power1.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.from(".BOOK-LABEL", { y: 20, opacity: 0, duration: 0.5 })
        .from(
          ".BOOK-TITLE",
          { x: -80, opacity: 0, duration: 0.8, ease: "power2.out" },
          "-=0.2",
        )
        .from(".BOOK-TEXT", { y: 20, opacity: 0, duration: 0.5 }, "-=0.5")
        .from(".BOOK-CONTENT", { scale: 0.9, opacity: 0, duration: 0.8 }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="catalogo"
      className="relative max-w-7xl mx-auto p-4 sm:p-8 mt-20 mb-20"
    >
      <h3 className="BOOK-LABEL text-[#002d4d] font-semibold text-2xl poppins py-3">
        Telas e acessórios
      </h3>
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-10 gap-4">
        <h2 className="BOOK-TITLE heading-2 impact text-[#ff5500]">
          CATÁLOGO DE <br /> PRODUTOS
        </h2>
        <div className="BOOK-TEXT flex flex-col items-center w-full lg:w-auto lg:max-w-[400px] lg:mr-14">
          <p className="text-base lg:text-[22px] text-[#002d4d] text-left ">
            Baixe nosso catálogo de produtos e conheça em detalhes toda a
            nossa linha de produtos.
          </p>
        </div>
      </div>
      <div className="BOOK-CONTENT flex flex-col items-center gap-6 lg:flex-row lg:justify-center">
        <TextArrowCTA
          onClick={() => bookRef.current?.pageFlip().flipNext()}
          className="lg:mr-6"
        />

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
              <img
                src={src}
                alt={`Página ${i + 1}`}
                className="w-full h-full object-contain"
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
                      alt="Insul"
                      className="h-[52%] w-auto object-contain"
                    />
                    <div className="w-px h-[60%] bg-[#ff5500]/40 shrink-0" />
                    <img
                      src="/images/logo_casa_das_cercas.png"
                      alt="Casa das Cercas"
                      className="h-[68%] w-auto object-contain"
                    />
                  </div>

                  <p className="absolute left-[11.7%] top-[17%] w-[85%] whitespace-nowrap text-white font-extrabold poppins leading-[1.05] text-[6.4cqw]">
                    Ficou interessado?
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
                    Clique aqui e saiba mais
                  </a>
                </div>
              )}
            </div>
          ))}
        </HTMLFlipBook>
      </div>
    </section>
  );
};

export default Book;
