"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { GripHorizontal } from "lucide-react";
import { useTranslation } from "./LanguageProvider";

gsap.registerPlugin(Draggable);

// Positioned against "tubo.png" (the bare post, no accessories baked in —
// so nothing can duplicate/ghost behind the animated pieces). Percentages
// are relative to the tube's OWN box (not the outer container), measured
// off the reference exploded-view photo (INSUL_POSTE-02_A.-v2.png) so the
// spread matches that composition.
const ASSEMBLY_PIECES = [
  {
    // All positions below were measured with pixel-level detection
    // (color/alpha masking) directly against conjunto.webp, converted to
    // percentages relative to the tube's own bounding box — not eyeballed.
    // "style" is the exploded (reference-photo) resting spot; dragging all
    // the way to 100% goes further still, past that, in by "toOffset" so
    // the pieces end up looking actually installed on the post.
    src: "/images/poste/fixador.png",
    style: { left: "73%", top: "29%", width: "58%", zIndex: 2 },
    from: { x: 90, y: -10, rotate: 14 },
    toOffset: { x: -16, y: 0 },
    toRotate: 0,
  },
  {
    src: "/images/poste/parafuso.png",
    style: { left: "130%", top: "42%", width: "32%", zIndex: 3 },
    from: { x: 150, y: 25, rotate: 24 },
    toOffset: { x: -58, y: -6 },
    toRotate: -8,
  },
  {
    src: "/images/poste/tampinha-fixador.png",
    style: { left: "173%", top: "47%", width: "28%", zIndex: 1 },
    from: { x: 170, y: 15, rotate: -20 },
    toOffset: { x: -78, y: -10 },
    toRotate: 0,
  },
  {
    src: "/images/poste/tampa.png",
    style: { left: "-1%", top: "-21%", width: "106%", zIndex: 1 },
    from: { x: -30, y: -160, rotate: -10 },
    toOffset: { x: 0, y: 34 },
    toRotate: 0,
  },
];

const CARD_MEDIA = [
  { src: "/images/poste/tampa.png", imgClass: "h-24 lg:h-28" },
  { src: "/images/poste/fixador.png", imgClass: "h-28 lg:h-32" },
  { src: "/images/poste/parafuso.png", imgClass: "h-24 lg:h-28" },
  { src: "/images/poste/tampinha-fixador.png", imgClass: "h-28 lg:h-32" },
];

const HANDLE_SIZE = 40;

const Pipes = () => {
  const { dict } = useTranslation();
  const p = dict.gradil.pipes;
  const pieceRefs = useRef<(HTMLImageElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const pieces = pieceRefs.current;
    pieces.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { ...ASSEMBLY_PIECES[i].from, opacity: 0 });
    });

    const tl = gsap.timeline({ paused: true }).to(pieces, {
      x: (i: number) => ASSEMBLY_PIECES[i].toOffset.x,
      y: (i: number) => ASSEMBLY_PIECES[i].toOffset.y,
      rotate: (i: number) => ASSEMBLY_PIECES[i].toRotate,
      opacity: 1,
      duration: 1,
      ease: "power1.out",
      stagger: 0.15,
    });

    if (!trackRef.current || !handleRef.current) return;
    const maxX = trackRef.current.clientWidth - HANDLE_SIZE;
    const SNAP_THRESHOLD = 0.85;

    const [draggable] = Draggable.create(handleRef.current, {
      type: "x",
      bounds: { minX: 0, maxX },
      onDrag: function () {
        tl.progress(this.x / maxX);
      },
      onDragEnd: function () {
        if (this.x / maxX < SNAP_THRESHOLD) return;
        gsap.to(this.target, {
          x: maxX,
          duration: 0.35,
          ease: "power2.out",
          onUpdate: () => {
            tl.progress(gsap.getProperty(this.target, "x") as number / maxX);
            draggable.update();
          },
        });
      },
    });
  }, []);

  return (
    <section className="overflow-hidden bg-white px-6 pb-24 pt-12 dark:bg-zinc-950">
      <div className="mx-auto grid w-full max-w-6xl gap-10 rounded-3xl bg-[#002d4d]/[0.06] p-8 backdrop-blur-sm dark:bg-white/5 sm:p-12 lg:grid-cols-2 lg:items-center">
        <div className="text-center sm:text-left">
          <h3 className="INDUSTRY-LABEL text-center sm:text-left text-[#002d4d] dark:text-white font-light text-2xl poppins">
            {p.label}
          </h3>
          <div className="relative flex justify-center sm:justify-between items-end mb-12">
            <h2 className="INDUSTRY-TITLE text-center sm:text-left text-[#ff5500] text-[clamp(2.5rem,11vw,4.75rem)] lg:text-8xl impact uppercase text-nowrap leading-tight">
              {p.title1} <br /> {p.title2}
            </h2>
          </div>
          <p className="poppins mx-auto mt-4 max-w-2xl text-[#002d4d] dark:text-zinc-400 sm:mx-0 lg:text-[18px]">
            {p.text}
          </p>

          <div className="mx-auto mt-8 flex w-56 flex-col items-center gap-2 sm:mx-0 sm:items-start">
            <span className="poppins text-xs font-medium uppercase tracking-widest text-[#002d4d]/60 dark:text-white/50">
              {p.dragHint}
            </span>
            <div
              ref={trackRef}
              className="relative h-10 w-56 rounded-full bg-[#002d4d]/10 dark:bg-white/10"
            >
              <div
                ref={handleRef}
                className="absolute left-0 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-grab touch-none items-center justify-center rounded-full bg-[#ff5500] text-white shadow-lg active:cursor-grabbing"
              >
                <GripHorizontal size={16} />
              </div>
            </div>
          </div>
        </div>

        <div className="-mb-8 -mt-16 flex items-end justify-center self-end sm:-mb-12 lg:-mt-24 lg:justify-end">
          <div
            className="relative h-[440px] w-[340px] lg:h-[540px] lg:w-[420px]"
            role="img"
            aria-label={p.imgAlt}
          >
            <div
              className="relative mt-16 h-[360px] lg:mt-24 lg:h-[440px]"
              style={{ aspectRatio: "385 / 934" }}
            >
              <img
                src="/images/poste/tubo.png"
                alt=""
                aria-hidden="true"
                draggable={false}
                className="absolute inset-0 h-full w-full object-contain"
                style={{ zIndex: 0 }}
              />
              {ASSEMBLY_PIECES.map((piece, i) => (
                <img
                  key={piece.src}
                  ref={(el) => {
                    pieceRefs.current[i] = el;
                  }}
                  src={piece.src}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="absolute w-auto object-contain"
                  style={piece.style}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 grid w-full max-w-6xl grid-cols-2 gap-6 sm:mt-16 lg:grid-cols-4 lg:gap-8">
        {p.cards.map((card, i) => (
          <div
            key={card.title}
            className="group relative flex flex-col items-center rounded-3xl bg-[#002d4d]/[0.06] px-6 pb-14 pt-40 text-center shadow-xl shadow-[#002d4d]/15 transition duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl dark:bg-white/5 dark:shadow-black/40"
          >
            <img
              src={CARD_MEDIA[i].src}
              alt={card.title}
              draggable={false}
              className={`absolute -top-10 left-1/2 w-auto -translate-x-1/2 object-contain transition duration-500 ease-out group-hover:-translate-y-2 ${CARD_MEDIA[i].imgClass}`}
            />
            <h3 className="poppins text-lg font-bold uppercase tracking-[0.22em] text-[#ff5500]">
              {card.title}
            </h3>
            <p className="poppins mt-2 max-w-[22ch] text-sm leading-relaxed text-[#002d4d]/60 dark:text-zinc-400">
              {card.desc}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Pipes;
