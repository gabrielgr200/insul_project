'use client';

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { roomDetails } from "../assets/data";
import ProductsLink from "./ProductsLink";
import { useTranslation } from "./LanguageProvider";
import { useContentTranslation } from "./LanguageProvider";

const Products = () => {
  const translateText = useContentTranslation();
  const { t, dict } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(true);

  const updateControls = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    setCanGoBack(carousel.scrollLeft > 2);
    setCanGoForward(carousel.scrollLeft + carousel.clientWidth < carousel.scrollWidth - 2);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const observer = new ResizeObserver(() => {
      const section = sectionRef.current;
      if (section) {
        const atStart = carousel.scrollLeft < 2;
        const inset = section.getBoundingClientRect().left + parseFloat(getComputedStyle(section).paddingLeft);
        carousel.style.setProperty("--products-inset", `${Math.max(0, inset)}px`);
        if (atStart) carousel.scrollLeft = 0;
      }
      updateControls();
    });
    observer.observe(carousel);
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  const moveCarousel = (direction: number) => {
    const carousel = carouselRef.current;
    const card = carousel?.firstElementChild as HTMLElement | null;
    if (!carousel || !card) return;
    const step = card.offsetWidth + 24;
    carousel.scrollTo({
      left: Math.max(0, Math.round(carousel.scrollLeft / step) + direction) * step,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power1.out" },
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play reverse play reverse",
      },
    });

    tl.from(".PRODUCTS-TITLE", { x: -80, opacity: 0, duration: 0.8, ease: "power2.out" })
      .from(
        ".PRODUCTS-LIST > *",
        { y: 20, opacity: 0, duration: 0.5, stagger: 0.08 },
        "-=0.3",
      );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="produtos"
      className="home-wide-section relative max-w-7xl mx-auto p-4 sm:p-8 mt-20 mb-20"
    >
      <h2 className="PRODUCTS-TITLE heading-2 impact text-[#ff5500] text-center sm:text-left">
        {t("products.tituloLinha1")} <br /> {t("products.tituloLinha2")}
      </h2>

      <div className="mt-6 flex justify-end gap-2">
        <button type="button" onClick={() => moveCarousel(-1)} disabled={!canGoBack} aria-label={translateText("Categorias anteriores")} aria-controls="products-carousel" className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-zinc-300 text-zinc-700 transition-colors hover:border-[#ff5500] hover:text-[#ff5500] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5500] disabled:cursor-default disabled:opacity-25 dark:border-zinc-700 dark:text-zinc-200">
          <ChevronLeft size={18} strokeWidth={1.5} />
        </button>
        <button type="button" onClick={() => moveCarousel(1)} disabled={!canGoForward} aria-label={translateText("Próximas categorias")} aria-controls="products-carousel" className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-zinc-300 text-zinc-700 transition-colors hover:border-[#ff5500] hover:text-[#ff5500] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5500] disabled:cursor-default disabled:opacity-25 dark:border-zinc-700 dark:text-zinc-200">
          <ChevronRight size={18} strokeWidth={1.5} />
        </button>
      </div>
      <div className="relative left-1/2 mt-5 w-screen -translate-x-1/2">
        <div
          ref={carouselRef}
          id="products-carousel"
          role="region"
          aria-roledescription={translateText("carrossel")}
          aria-label={t("nav.produtos")}
          onScroll={updateControls}
          className="PRODUCTS-LIST flex snap-x snap-mandatory items-start gap-6 overflow-x-auto px-[var(--products-inset,16px)] py-2 [scroll-padding-inline:var(--products-inset,16px)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {roomDetails.map((room) => (
            <article key={room.name} className="flex w-full shrink-0 snap-start items-stretch overflow-hidden rounded-2xl bg-zinc-100 shadow-xs [container-type:inline-size] sm:w-[calc((100%-24px)/2)] lg:w-[calc((100vw-var(--products-inset,32px)-92px)*0.42)] dark:bg-zinc-900">
              <Link href={room.to || "#"} className="relative block h-[310px] w-[42%] shrink-0 overflow-hidden">
                <Image
                  src={room.src}
                  alt={dict.products.rooms[room.name] ?? room.name}
                  fill
                  sizes="(min-width: 1920px) 30vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col justify-center px-4 py-6 sm:px-5 lg:pl-10 lg:pr-6">
                <Link href={room.to || "#"} className="poppins text-xl font-bold leading-tight tracking-tight text-zinc-900 transition-colors hover:text-[#ff5500] dark:text-white dark:hover:text-[#ff5500] min-[1920px]:text-2xl">
                  <h3>{dict.products.rooms[room.name] ?? room.name}</h3>
                </Link>
                <p className="relative top-12 poppins font-light mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 min-[1920px]:text-base">
                  {dict.products.descriptions[room.name]}
                </p>
                <div className="relative top-12 mt-6 poppins self-start [&>a]:gap-3 [&>a]:rounded-xl [&>a]:border [&>a]:bg-zinc-100 [&>a]:px-4 [&>a]:py-2.5 [&>a]:text-sm [&>a]:font-medium [&>a>svg]:size-4 [&>a>svg]:shrink-0 dark:[&>a]:bg-zinc-800">
                  <ProductsLink to={room.to}>
                    {t("book.ver")} {t("nav.produtos").toLocaleLowerCase()}
                  </ProductsLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
