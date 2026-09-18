"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const galleryCells = [
  {
    src:
      "https://d2c3kthzw0ta10.cloudfront.net/imgs-cards-parallax/imgcard-1.jpg",
    className: "col-start-1 col-span-2 row-start-1"
  },
  {
    src:
      "https://d2c3kthzw0ta10.cloudfront.net/imgs-cards-parallax/imgcard-2.jpg",
    className: "col-start-3 row-start-1"
  },
  {
    src:
      "https://d2c3kthzw0ta10.cloudfront.net/imgs-cards-parallax/imgcard-3.jpg",
    className: "col-start-4 row-start-1"
  },
  {
    src:
      "https://d2c3kthzw0ta10.cloudfront.net/imgs-cards-parallax/imgcard-4.jpg",
    className: "col-start-1 row-start-2 row-span-2"
  },
  {
    src:
      "https://d2c3kthzw0ta10.cloudfront.net/imgs-cards-parallax/imgcard-5.jpg",
    className: "col-start-4 row-start-2 row-span-2"
  },
  {
    src:
      "https://d2c3kthzw0ta10.cloudfront.net/imgs-cards-parallax/imgcard-6.jpg",
    className: "col-start-1 row-start-4"
  },
  {
    src:
      "https://d2c3kthzw0ta10.cloudfront.net/imgs-cards-parallax/imgcard-7.jpg",
    className: "col-start-2 col-span-2 row-start-4"

  },
  {
    src:
      "https://d2c3kthzw0ta10.cloudfront.net/imgs-cards-parallax/imgcard-8.jpg",
    className: "col-start-4 row-start-4"
  },
];

const ArameParallaxPraia = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
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

      gsap.set(cardRef.current, { scale: 0.46, borderRadius: 16 / 0.46 });
      gsap.set(azulRef.current, { opacity: 0 });
      gsap.set(blurRef.current, { opacity: 0 });
      gsap.set([textVerdeRef.current, textAzulRef.current], {
        y: 60,
        opacity: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=350%",
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      tl.to(cardRef.current, {
        scale: 1,
        borderRadius: 0,
        ease: "none",
        duration: 1,
      });

      tl.to(
        satellites,
        {
          // Move each image away from the center, preserving the grid's depth.
          x: (_, target: HTMLElement) => {
            const grid = target.parentElement!;
            return (target.offsetLeft + target.offsetWidth / 2 - grid.clientWidth / 2) * 2.4;
          },
          y: (_, target: HTMLElement) => {
            const grid = target.parentElement!;
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
      className="relative h-svh w-full overflow-hidden bg-white dark:bg-[#090b0c]"
    >
      <div className="relative mx-auto h-full w-full">
        <div className="absolute inset-[3%] z-0 grid grid-cols-4 grid-rows-4 gap-2 sm:gap-4">
          {galleryCells.map(({ src, className }) => (
            <div
              key={src}
              className={`arame-gallery-cell relative isolate overflow-hidden rounded-2xl will-change-transform ${className}`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div
        ref={cardRef}
        className="absolute inset-0 z-10 h-full w-full overflow-hidden rounded-[35px] will-change-transform"
      >

        <Image
          src="https://d2c3kthzw0ta10.cloudfront.net/img-parallax-praia/img-ceu-praia-arame-pvc.png"
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
            Arame com revestimento em<br />
            <span className="text-[#1d5b34] font-bold text-6xl">PVC verde</span>
          </p>
          <p className="poppins mt-6 text-sm font-light text-[#002d4d] sm:text-base">
            Mais proteção contra corrosão e um acabamento discreto para
            áreas externas.
          </p>
        </div>

        <div
          ref={textAzulRef}
          className="absolute left-6 top-1/4 z-0 max-w-xs text-left sm:left-16 sm:max-w-sm"
        >
          <p className="text-4xl font-light text-[#ff5500] sm:text-2xl">
            Também disponível em<br />
            <span className="text-[#1065a1] font-bold text-6xl">PVC azul</span>
          </p>
          <p className="poppins mt-6 text-sm text-[#002d4d] font-light sm:text-base">
            A mesma resistência, com um visual diferenciado para o seu
            projeto.
          </p>
        </div>

        <Image
          src="https://d2c3kthzw0ta10.cloudfront.net/img-parallax-praia/img-praia-arame.png"
          alt="Praia"
          fill
          className="relative z-1 object-cover"
        />

        <div ref={verdeRef} className="absolute inset-0 z-2">
          <Image
            src="https://d2c3kthzw0ta10.cloudfront.net/img-parallax-praia/arame-pvc-verde.png"
            alt="Arame PVC verde"
            fill
            className="object-cover"
          />
        </div>
        <div ref={azulRef} className="absolute inset-0 z-2">
          <Image
            src="https://d2c3kthzw0ta10.cloudfront.net/img-parallax-praia/arame-pvc-azul.png"
            alt="Arame PVC azul"
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
