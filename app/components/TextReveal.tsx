'use client';

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const PARAGRAPHS = [
  "Desde 2010, a Insul Arames e Telas investe em tecnologia de ponta para oferecer produtos de alta qualidade e garantir a satisfação e confiança de nossos clientes.",
  "Para nós, qualidade não é um objetivo, é uma prática diária. Seguimos comprometidos em ser referência no setor e em contribuir para o crescimento sustentável de nossos clientes e parceiros.",
];

const TextReveal = () => {
  const containerRef = useRef<HTMLElement>(null);
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useLayoutEffect(() => {
    let splits: SplitText[] = [];

    const ctx = gsap.context(() => {
      const wrappers = wrapperRefs.current;
      splits = textRefs.current.map(
        (el) => new SplitText(el, { type: "words", wordsClass: "word" }),
      );

      wrappers.forEach((w, i) => {
        gsap.set(w, { opacity: i === 0 ? 1 : 0, filter: "blur(0px)" });
        gsap.set(splits[i].words, { opacity: 0, y: 16, filter: "blur(8px)" });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${wrappers.length * 100}%`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      wrappers.forEach((w, i) => {
        const { words } = splits[i];

        tl.to(
          words,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.05,
            duration: words.length * 0.15,
            ease: "none",
          },
          ">",
        );

        if (i < wrappers.length - 1) {
          tl.to(
            w,
            { opacity: 0, filter: "blur(10px)", duration: 0.5, ease: "none" },
            ">3",
          ).to(
            wrappers[i + 1],
            { opacity: 1, filter: "blur(0px)", duration: 0.5, ease: "none" },
            "<",
          );
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
      splits.forEach((s) => s.revert());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative z-10 h-screen overflow-hidden bg-white px-4 sm:px-8"
    >
      <div className="relative mx-auto h-full max-w-5xl">
        {PARAGRAPHS.map((text, i) => (
          <div
            key={text}
            ref={(el) => {
              wrapperRefs.current[i] = el;
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <p
              ref={(el) => {
                textRefs.current[i] = el;
              }}
              className="text-center text-[#002d4d] poppins font-normal text-3xl sm:text-4xl md:text-5xl lg:text-4xl leading-tight"
            >
              {text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TextReveal;
