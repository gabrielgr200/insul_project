'use client';

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

const partnerLogos = [
  { name: "Empresa 1", image: "/images/Gerdau.png" },
  { name: "Empresa 2", image: "/images/Karina.png" },
  { name: "Empresa 3", image: "/images/Voestalpine.webp" },
  { name: "Empresa 4", image: "/images/tambasa.png" },
  { name: "Empresa 5", image: "/images/Braskem.webp" },
  { name: "Empresa 6", image: "/images/MLA.webp" },
];

const REPEAT_COUNT = 8;
const allLogos = Array.from({ length: REPEAT_COUNT }, () => partnerLogos).flat();

const PIXELS_PER_SECOND = 60;

const PartnersLogos = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const repeatStartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const repeatStart = repeatStartRef.current;
    if (!container || !repeatStart) return;

    const ctx = gsap.context(() => {
      const distance =
        repeatStart.getBoundingClientRect().left -
        container.getBoundingClientRect().left;

      gsap.to(container, {
        x: -distance,
        duration: distance / PIXELS_PER_SECOND,
        repeat: -1,
        ease: "linear",
        force3D: true,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-16 overflow-x-clip bg-white dark:bg-background">
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div
          ref={containerRef}
          className="flex gap-16 w-max items-center will-change-transform"
        >
          {allLogos.map((logo, i) =>
            logo.image ? (
              <div
                key={`${logo.name}-${i}`}
                ref={i === partnerLogos.length ? repeatStartRef : undefined}
                className="relative flex h-16 w-36 flex-shrink-0 items-center justify-center"
              >
                <Image
                  src={logo.image}
                  alt={logo.name}
                  fill
                  sizes="144px"
                  loading={i < partnerLogos.length ? "eager" : "lazy"}
                  className="object-contain grayscale dark:grayscale-0 transition-all duration-300 hover:grayscale-0"
                />
              </div>
            ) : (
              <div
                key={`${logo.name}-${i}`}
                ref={i === partnerLogos.length ? repeatStartRef : undefined}
                className="h-16 w-36 flex items-center justify-center bg-zinc-100 rounded-md text-zinc-400 text-sm font-medium flex-shrink-0"
              >
                {logo.name}
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default PartnersLogos;
