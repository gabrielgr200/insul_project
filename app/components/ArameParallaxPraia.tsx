"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import gallery1 from "../../public/images/imgs-cards-parallax/imgcard-1.jpg";
import gallery2 from "../../public/images/imgs-cards-parallax/imgcard-2.jpg";
import gallery3 from "../../public/images/imgs-cards-parallax/imgcard-3.jpg";
import gallery4 from "../../public/images/imgs-cards-parallax/imgcard-4.jpg";
import gallery5 from "../../public/images/imgs-cards-parallax/imgcard-5.jpg";
import gallery6 from "../../public/images/imgs-cards-parallax/imgcard-6.jpg";
import gallery7 from "../../public/images/imgs-cards-parallax/imgcard-7.jpg";
import gallery8 from "../../public/images/imgs-cards-parallax/imgcard-8.jpg";
import { useContentTranslation } from "./LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

const galleryColumns = [
  [gallery1, gallery2, gallery3],
  [gallery4, gallery5, gallery6],
  [gallery7, null, gallery8],
  [gallery2, gallery4, gallery6],
];

const cardAspectRatios = [
  ["200 / 254", "200 / 165", "200 / 187"],
  ["200 / 197", "200 / 281", "200 / 127"],
  ["200 / 281", "200 / 154", "200 / 172"],
  ["200 / 140", "200 / 337", "200 / 129"],
];

const ArameParallaxPraia = () => {
  const translateText = useContentTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const verdeRef = useRef<HTMLDivElement>(null);
  const azulRef = useRef<HTMLDivElement>(null);
  const textVerdeRef = useRef<HTMLDivElement>(null);
  const textAzulRef = useRef<HTMLDivElement>(null);
  const blurRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {

      const satellites = gsap.utils.toArray<HTMLElement>(
        ".arame-gallery-cell",
        sectionRef.current,
      );

      const slotBounds = () => {
        const slot = slotRef.current!.getBoundingClientRect();
        const section = sectionRef.current!.getBoundingClientRect();
        return { x: slot.left - section.left, y: slot.top - section.top, width: slot.width, height: slot.height };
      };
      gsap.set(azulRef.current, { opacity: 0 });
      gsap.set(blurRef.current, { opacity: 0 });
      gsap.set([textVerdeRef.current, textAzulRef.current], {
        y: 60,
        opacity: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: () => `top+=${Math.max(0, sectionRef.current!.clientHeight - window.innerHeight)} top`,
          end: "+=350%",
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(cardRef.current, {
        x: () => slotBounds().x,
        y: () => slotBounds().y,
        width: () => slotBounds().width,
        height: () => slotBounds().height,
        borderRadius: 16,
      }, {
        x: 0,
        y: () => Math.max(0, sectionRef.current!.clientHeight - window.innerHeight),
        width: () => sectionRef.current!.clientWidth,
        height: () => window.innerHeight,
        borderRadius: 0,
        ease: "none",
        duration: 1,
      });

      tl.to(
        satellites,
        {
          // Move each image away from the center, preserving the grid's depth.
          x: (_, target: HTMLElement) => {
            const grid = galleryRef.current!;
            return (target.offsetLeft + target.offsetWidth / 2 - grid.clientWidth / 2) * 2.4;
          },
          y: (_, target: HTMLElement) => {
            const grid = galleryRef.current!;
            return (target.offsetTop + target.offsetHeight / 2 - grid.clientHeight / 2) * 2.4;
          },
          scale: (index) => 2.2 + (index % 3) * 0.3,
          ease: "none",
          duration: 1,
        },
        0,
      );

      tl.to(
        blurRef.current,
        { opacity: 1, ease: "power2.out", duration: 0.3 },
        1,
      );

      tl.to(
        textVerdeRef.current,
        { y: 0, opacity: 1, ease: "power2.out", duration: 0.3 },
        1.1,
      ).to(
        textVerdeRef.current,
        { y: -40, opacity: 0, ease: "power1.in", duration: 0.25 },
        1.75,
      );

      tl.to(
        textAzulRef.current,
        { y: 0, opacity: 1, ease: "power2.out", duration: 0.3 },
        2.1,
      );

      tl.to(
        verdeRef.current,
        { opacity: 0, ease: "none", duration: 0.35 },
        2.5,
      ).to(azulRef.current, { opacity: 1, ease: "none", duration: 0.35 }, "<");

      tl.to(
        textAzulRef.current,
        { y: -40, opacity: 0, ease: "power1.in", duration: 0.25 },
        3.1,
      );
    },
    { scope: sectionRef },
  );

  return (
    <div
      ref={sectionRef}
      className="relative min-h-svh w-full overflow-hidden bg-white dark:bg-[#090b0c]"
    >
      <div className="relative mx-auto w-full p-4">
        <div
          ref={galleryRef}
          className="relative z-0 grid grid-cols-2 items-start gap-4 md:grid-cols-4"
        >
          {galleryColumns.map((column, columnIndex) => (
            <div key={columnIndex} className="grid gap-4">
              {column.map((src, imageIndex) => src ? (
                <div
                  key={imageIndex}
                  style={{ aspectRatio: cardAspectRatios[columnIndex][imageIndex] }}
                  className="arame-gallery-cell relative isolate w-full overflow-hidden rounded-2xl will-change-transform"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 24vw, 47vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div
                  key={imageIndex}
                  ref={slotRef}
                  aria-hidden="true"
                  style={{ aspectRatio: cardAspectRatios[columnIndex][imageIndex] }}
                  className="w-full rounded-2xl"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div
        ref={cardRef}
        className="absolute left-0 top-0 z-10 h-full w-full overflow-hidden rounded-2xl will-change-transform"
      >

        <Image
          src="/images/img-parallax-praia/img-ceu-praia-arame-pvc.png"
          alt=""
          fill
          priority
          className="object-cover"
        />

        <div
          ref={textVerdeRef}
          className="absolute left-6 top-1/4 z-0 max-w-xs text-left sm:left-16 sm:max-w-sm"
        >
          <p className="text-4xl font-light text-[#ff5500] sm:text-2xl">
            {translateText("Arame com revestimento em")}<br />
            <span className="text-[#1d5b34] font-bold text-6xl">{translateText("PVC verde")}</span>
          </p>
          <p className="poppins mt-6 text-sm font-light text-[#002d4d] sm:text-base">
            {translateText("Mais proteção contra corrosão e um acabamento discreto para áreas externas.")}</p>
        </div>

        <div
          ref={textAzulRef}
          className="absolute left-6 top-1/4 z-0 max-w-xs text-left sm:left-16 sm:max-w-sm"
        >
          <p className="text-4xl font-light text-[#ff5500] sm:text-2xl">
            {translateText("Também disponível em")}<br />
            <span className="text-[#1065a1] font-bold text-6xl">{translateText("PVC azul")}</span>
          </p>
          <p className="poppins mt-6 text-sm text-[#002d4d] font-light sm:text-base">
            {translateText("A mesma resistência, com um visual diferenciado para o seu projeto.")}</p>
        </div>

        <Image
          src="/images/img-parallax-praia/img-praia-arame.png"
          alt={translateText("Praia")}
          fill
          className="relative z-1 object-cover"
        />

        <div ref={verdeRef} className="absolute inset-0 z-2">
          <Image
            src="/images/img-parallax-praia/arame-pvc-verde.png"
            alt={translateText("Arame PVC verde")}
            fill
            className="object-cover"
          />
        </div>
        <div ref={azulRef} className="absolute inset-0 z-2">
          <Image
            src="/images/img-parallax-praia/arame-pvc-azul.png"
            alt={translateText("Arame PVC azul")}
            fill
            className="object-cover"
          />
        </div>

        <div
          ref={blurRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[70%] -bottom-40 z-3"
        >
          <div className="absolute inset-0 backdrop-blur-[2px] mask-[linear-gradient(to_bottom,transparent,black_35%)]" />
          <div className="absolute inset-0 backdrop-blur-[5px] mask-[linear-gradient(to_bottom,transparent_15%,black_55%)]" />
          <div className="absolute inset-0 backdrop-blur-[10px] mask-[linear-gradient(to_bottom,transparent_30%,black_70%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,#ffffff80_25%,#ffffff_60%)] dark:bg-[linear-gradient(to_bottom,transparent_0%,#090b0c80_25%,#090b0c_60%)]" />
        </div>
      </div>
    </div>
  );
};

export default ArameParallaxPraia;
