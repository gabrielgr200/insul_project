'use client';

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import FillButton from "./FillButton";

interface ArcImage {
  src: string;
  alt: string;
}

const DEFAULT_ARC_IMAGES: ArcImage[] = [
  { src: "https://d2c3kthzw0ta10.cloudfront.net/telas-arc/Fachane.png", alt: "Tela FachaNet" },
  { src: "https://d2c3kthzw0ta10.cloudfront.net/telas-arc/galinheiro.jpg", alt: "Tela Galinheiro" },
  { src: "https://d2c3kthzw0ta10.cloudfront.net/telas-arc/titan.jpg", alt: "Tela Titan" },
  { src: "https://d2c3kthzw0ta10.cloudfront.net/telas-arc/mangueirao-18.jpg", alt: "Tela Mangueirão 18" },
  { src: "https://d2c3kthzw0ta10.cloudfront.net/telas-arc/morada.jpg", alt: "Tela Morada" },
  { src: "https://d2c3kthzw0ta10.cloudfront.net/telas-arc/multyuso.jpg", alt: "Tela MultyUso" },
  { src: "https://d2c3kthzw0ta10.cloudfront.net/telas-arc/open.jpg", alt: "Tela Morada Open" },
  { src: "https://d2c3kthzw0ta10.cloudfront.net/telas-arc/mangueirao.jpg", alt: "Tela Mangueirão 16" },
  { src: "https://d2c3kthzw0ta10.cloudfront.net/telas-arc/soldada-PVC.png", alt: "Tela Brava" },
  { src: "https://d2c3kthzw0ta10.cloudfront.net/telas-arc/pinteiro.jpg", alt: "Tela Pinteiro" },
  { src: "https://d2c3kthzw0ta10.cloudfront.net/telas-arc/titan-1.jpg", alt: "Tela Titan" },
  { src: "https://d2c3kthzw0ta10.cloudfront.net/telas-arc/viveiro.jpg", alt: "Tela Viveiro" },
];

const SIZES = [94, 107, 119, 109, 121, 113, 113, 121, 109, 119, 107, 94];
const ARC_SPAN_DEG = 100;
const ARC_APEX_TOP_PCT = 18;
const ARC_RADIUS_Y_PCT = 190;
const EDGE_MARGIN_PCT = -18;
const ROTATE_FACTOR = 0;

const wrapAngle = (deg: number) => {
  const half = ARC_SPAN_DEG / 2;
  return (((deg + half) % ARC_SPAN_DEG) + ARC_SPAN_DEG) % ARC_SPAN_DEG - half;
};

const buildArcLayout = (images: ArcImage[], offsetDeg: number) => {
  const indexSpacingDeg = ARC_SPAN_DEG / images.length;
  return images.map((img, i) => {
    const base = -ARC_SPAN_DEG / 2 + i * indexSpacingDeg;
    const angleDeg = wrapAngle(base + offsetDeg);
    const angleRad = (angleDeg * Math.PI) / 180;
    const left = 50 + Math.sin(angleRad) * (50 - EDGE_MARGIN_PCT);
    const top = ARC_APEX_TOP_PCT + (1 - Math.cos(angleRad)) * ARC_RADIUS_Y_PCT;
    const rotate = angleDeg * ROTATE_FACTOR;
    return { ...img, left, top, size: SIZES[i % SIZES.length], rotate };
  });
};

const DRAG_SENSITIVITY = 0.15;
const LERP_FACTOR = 0.22;
const FRICTION = 0.94;
const MIN_VELOCITY = 0.01;

interface TelasShowcaseArcProps {
  images?: ArcImage[];
  eyebrow?: ReactNode;
  heading?: ReactNode;
  headingClassName?: string;
  description?: ReactNode;
  ctaLabel?: ReactNode;
}

const DEFAULT_HEADING_CLASSNAME =
  "poppins font-bold pt-6 pb-8 text-8xl uppercase text-[#ff5500] sm:text-6xl dark:text-white";

const TelasShowcaseArc = ({
  images = DEFAULT_ARC_IMAGES,
  eyebrow = "Telas Insul",
  heading = (
    <>
      Um modelo <br /> para cada necessidade
    </>
  ),
  headingClassName = DEFAULT_HEADING_CLASSNAME,
  description = (
    <>
      Da tela leve pro jardim até a mais resistente pro campo, <br /> a Insul
      tem o modelo certo pra sua propriedade.
    </>
  ),
  ctaLabel = "Falar com um especialista",
}: TelasShowcaseArcProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [displayOffset, setDisplayOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const isDraggingRef = useRef(false);
  const targetOffset = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const rafId = useRef<number | null>(null);

  const arcLayout = useMemo(
    () => buildArcLayout(images, displayOffset),
    [images, displayOffset],
  );

  const tick = () => {
    if (!isDraggingRef.current) {
      targetOffset.current += velocity.current;
      velocity.current *= FRICTION;
    }
    setDisplayOffset((prev) => {
      const next = prev + (targetOffset.current - prev) * LERP_FACTOR;
      const settled =
        !isDraggingRef.current &&
        Math.abs(velocity.current) < MIN_VELOCITY &&
        Math.abs(targetOffset.current - next) < 0.02;
      if (settled) {
        rafId.current = null;
        return targetOffset.current;
      }
      rafId.current = requestAnimationFrame(tick);
      return next;
    });
  };

  const ensureLoop = () => {
    if (rafId.current == null) rafId.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    return () => {
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    isDraggingRef.current = true;
    setIsDragging(true);
    velocity.current = 0;
    lastX.current = e.clientX;
    lastTime.current = performance.now();
    ensureLoop();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const now = performance.now();
    const dt = Math.max(now - lastTime.current, 1);
    const deltaDeg = (e.clientX - lastX.current) * DRAG_SENSITIVITY;
    targetOffset.current += deltaDeg;
    velocity.current = (deltaDeg / dt) * 16.7;
    lastX.current = e.clientX;
    lastTime.current = now;
  };

  const endDrag = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  useGSAP(
    () => {
      gsap.from(".ARC-CARD", {
        opacity: 0,
        scale: 0.5,
        y: 30,
        duration: 0.6,
        stagger: 0.06,
        ease: "back.out(1.6)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play reverse play reverse",
        },
      });
      gsap.from(".ARC-TEXT > *", {
        opacity: 0,
        y: 16,
        duration: 0.6,
        stagger: 0.08,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play reverse play reverse",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <div
      ref={sectionRef}
      className="pt-64 relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden bg-white py-20 dark:bg-zinc-950"
    >
      <div
        className={`relative h-[380px] w-full touch-pan-y select-none overflow-hidden sm:h-[420px] ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
      >
        {arcLayout.map((card, i) => (
          <div
            key={card.src}
            className="ARC-CARD absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${card.left}%`,
              top: `${card.top}%`,
              width: card.size,
              height: card.size,
              zIndex: i,
            }}
          >
            <div
              className="h-full w-full overflow-hidden rounded-2xl shadow-2xl shadow-black/20 ring-1 ring-[#002d4d]/10 dark:shadow-black/50 dark:ring-white/10"
              style={{ transform: `rotate(${card.rotate}deg)` }}
            >
              <img
                src={card.src}
                alt={card.alt}
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="ARC-TEXT relative z-20 mx-auto -mt-40 w-[88%] max-w-md text-center">
        <span className="poppins mb-0 inline-flex items-center gap-2 rounded-full border bg-transparent px-4 py-1.5 text-xs font-normal uppercase tracking-widest text-[#002d4d] dark:text-white border-[#ff5500]/15">
          {eyebrow}
        </span>
        <h2 className={headingClassName}>{heading}</h2>
        <p className="poppins pb-8 mx-auto max-w-xl mt-0 text-sm text-[#002d4d]/60 dark:text-white/60">
          {description}
        </p>
        <FillButton
          href="https://wa.me/5551995098453"
          target="_blank"
          rel="noopener noreferrer"
          className="poppins mt-0 inline-block cursor-pointer rounded-full border border-[#FF6A1A] bg-[#ff5500] px-6 py-3 text-sm font-bold text-white"
          overlayClassName="bg-white dark:bg-background text-[#ff5500]"
        >
          {ctaLabel}
        </FillButton>
      </div>
    </div>
  );
};

export default TelasShowcaseArc;
