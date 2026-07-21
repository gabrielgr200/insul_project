'use client';

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { roomDetails } from "../assets/data";
import ProductsLink from "./ProductsLink";
import DynamicImg from "./DynamicImg";

const Products = () => {
  const sectionRef = useRef(null);
  const initialImageSrc = roomDetails[0]?.src || "";
  const [currentImageSrc, setCurrentImageSrc] = useState(initialImageSrc);
  const handleMouseEnter = (src: string) => {
    setCurrentImageSrc(src);
  };
  const handleMouseLeave = () => {
    setCurrentImageSrc(initialImageSrc);
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

      tl.from(".PRODUCTS-TITLE", { x: -80, opacity: 0, duration: 0.8, ease: "power2.out" })
        .from(
          ".PRODUCTS-LIST > p",
          { y: 20, opacity: 0, duration: 0.5, stagger: 0.08 },
          "-=0.3",
        )
        .from(".PRODUCTS-IMAGE", { scale: 0.9, opacity: 0, duration: 0.8 }, "-=0.5");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="produtos"
      className="relative max-w-7xl mx-auto p-4 sm:p-8 mt-20 mb-20"
    >
      <h2 className="PRODUCTS-TITLE heading-2 impact text-[#ff5500]">
        NOSSOS <br /> PRODUTOS
      </h2>

      <div className="flex flex-col lg:flex-row lg:space-x-20">
        <div className="PRODUCTS-LIST lg:w-1/3">
          {roomDetails.map((room) => (
            <ProductsLink
              key={room.name}
              to={room.to}
              onMouseEnter={() => handleMouseEnter(room.src)}
              onMouseLeave={handleMouseLeave}
            >
              {room.name}
            </ProductsLink>
          ))}
        </div>

        <DynamicImg src={currentImageSrc} />
      </div>
    </section>
  );
};

export default Products;
