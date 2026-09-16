"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  y?: number;
  start?: string;
}

const ScrollReveal = ({
  children,
  className,
  y = 32,
  start = "top 85%",
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(ref.current, {
        y,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start,
          toggleActions: "play reverse play reverse",
        },
      });
    },
    { scope: ref, dependencies: [y, start] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;
