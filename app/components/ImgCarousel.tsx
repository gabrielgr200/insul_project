'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ImageIcon, X } from "lucide-react";
import type { GalleryImage } from "../assets/data";
import PerspectiveGallery from "./PerspectiveGallery";

interface CarouselImage {
  id: number;
  src: string | null;
  alt: string;
}

const LOOPS = 3;

const Thumb = ({
  image,
  className,
  iconSize = 24,
  sizes = "297px",
}: {
  image: CarouselImage;
  className: string;
  iconSize?: number;
  sizes?: string;
}) => (
  <div className={`relative overflow-hidden bg-zinc-800 ${className}`}>
    {image.src ? (
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        draggable={false}
        className="object-cover"
      />
    ) : (
      <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 text-zinc-500">
        <ImageIcon size={iconSize} />
      </div>
    )}
  </div>
);

const ImgCarousel = ({ images: sourceImages, perspective = false, title }: { images: GalleryImage[]; perspective?: boolean; title?: string }) => {
  const imageCount = sourceImages.length;
  const images: CarouselImage[] = sourceImages.map((image, i) => ({
    id: i,
    src: image.src,
    alt: image.alt,
  }));
  const loopedImages = Array.from({ length: LOOPS }, (_, copy) =>
    images.map((image) => ({ ...image, loopKey: `${copy}-${image.id}` }))
  ).flat();

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const isOpen = lightboxIndex !== null;

  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, moved: false, startX: 0, scrollLeft: 0 });

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    drag.current = {
      active: true,
      moved: false,
      startX: e.clientX,
      scrollLeft: trackRef.current!.scrollLeft,
    };
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!drag.current.active) return;
      const walk = e.clientX - drag.current.startX;
      if (Math.abs(walk) > 4) drag.current.moved = true;
      trackRef.current!.scrollLeft = drag.current.scrollLeft - walk;
    };
    const handlePointerUp = () => {
      drag.current.active = false;
    };
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const setWidth = track.scrollWidth / LOOPS;
    track.scrollLeft = setWidth;

    const handleScroll = () => {
      const width = track.scrollWidth / LOOPS;
      if (track.scrollLeft < width * 0.5) {
        track.scrollLeft += width;
        drag.current.scrollLeft += width;
      } else if (track.scrollLeft > width * 1.5) {
        track.scrollLeft -= width;
        drag.current.scrollLeft -= width;
      }
    };
    track.addEventListener("scroll", handleScroll);
    return () => track.removeEventListener("scroll", handleScroll);
  }, [perspective]);

  const close = useCallback(() => setLightboxIndex(null), []);
  const goPrev = useCallback(
    () =>
      setLightboxIndex(
        (i) => ((i ?? 0) - 1 + imageCount) % imageCount
      ),
    [imageCount]
  );
  const goNext = useCallback(
    () => setLightboxIndex((i) => ((i ?? 0) + 1) % imageCount),
    [imageCount]
  );

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, close, goPrev, goNext]);

  const lightbox = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-200 flex flex-col items-center justify-center bg-zinc-950 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Fechar"
            className="absolute right-4 top-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X size={20} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Imagem anterior"
            className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Próxima imagem"
            className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <ChevronRight size={22} />
          </button>

          <div
            className="relative flex w-full max-w-4xl items-center justify-center overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.25 }}
                className="aspect-video w-full"
              >
                <Thumb
                  image={images[lightboxIndex as number]}
                  className="h-full w-full"
                  iconSize={40}
                  sizes="(min-width: 928px) 896px, calc(100vw - 32px)"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-4 flex gap-2" onClick={(e) => e.stopPropagation()}>
            {images.map((image, i) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setLightboxIndex(i)}
                className={`h-14 w-20 shrink-0 cursor-pointer rounded-lg border-2 transition-colors ${
                  i === lightboxIndex
                    ? "border-white"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Thumb
                  image={image}
                  className="h-full w-full rounded-md"
                  iconSize={14}
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (perspective) return (
    <>
      <PerspectiveGallery images={sourceImages} title={title} onOpen={setLightboxIndex} paused={isOpen} />
      {typeof document !== "undefined" && createPortal(lightbox, document.body)}
    </>
  );

  return (
    <section className="py-16">
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        className="no-scrollbar flex cursor-grab gap-4 overflow-x-auto pb-2 pl-4 select-none active:cursor-grabbing sm:pl-8"
      >
        {loopedImages.map((image, i) => (
          <button
            key={image.loopKey}
            type="button"
            onClick={() => {
              if (drag.current.moved) return;
              setLightboxIndex(i % images.length);
            }}
            aria-label={`Abrir ${image.alt} em tela cheia`}
            className="group aspect-4/3 w-72 shrink-0 cursor-grab rounded-2xl active:cursor-grabbing"
          >
            <Thumb
              image={image}
              className="h-full w-full rounded-2xl transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>
      <p className="mt-3 px-4 text-sm text-zinc-500 sm:px-8">
        Clique na imagem para abrir em tela cheia.
      </p>

      {typeof document !== "undefined" && createPortal(lightbox, document.body)}
    </section>
  );
};

export default ImgCarousel;
