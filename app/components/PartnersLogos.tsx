'use client';

import { useRef, useEffect } from "react";
import gsap from "gsap";

const partnerLogos = [
  { name: "Empresa 1", image: "/images/Gerdau.png" },
  { name: "Empresa 2", image: "/images/Karina.png" },
  { name: "Empresa 3", image: "/images/Voestalpine.webp" },
  { name: "Empresa 4", image: "/images/tambasa.png" },
  { name: "Empresa 5", image: "/images/Braskem.webp" },
];

const allLogos = [...partnerLogos, ...partnerLogos];

const PartnersLogos = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, {
        xPercent: -50,
        duration: 25,
        repeat: -1,
        ease: "linear",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-16 overflow-x-clip bg-white">
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div
          ref={containerRef}
          className="flex gap-16 pr-16 w-max items-center"
        >
          {allLogos.map((logo, i) =>
            logo.image ? (
              <div
                key={`${logo.name}-${i}`}
                className="flex h-16 w-36 flex-shrink-0 items-center justify-center"
              >
                <img
                  src={logo.image}
                  alt={logo.name}
                  className="h-full w-full object-contain grayscale transition-all duration-300 hover:grayscale-0"
                />
              </div>
            ) : (
              <div
                key={`${logo.name}-${i}`}
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
