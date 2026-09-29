"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../components/Header";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

const Accessories = () => {
  const assemblySectionRef = useRef<HTMLElement>(null);
  const postRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = assemblySectionRef.current;
    const post = postRef.current;
    if (!section || !post) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        post,
        { yPercent: -105 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        },
      );
    }, section);

    return () => context.revert();
  }, []);

  return (
    <div className="min-h-screen overflow-clip bg-white text-[#082d49] dark:bg-[#191b1d] dark:text-white">
      <Header />

      <main className="pt-24 sm:pt-28">
        <section
          ref={assemblySectionRef}
          aria-labelledby="accessories-title"
          className="relative h-[205svh] bg-white dark:bg-[#191b1d]"
        >
          <div className="sticky top-0 flex h-svh items-center overflow-hidden">
            <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 items-center gap-8 px-5 py-12 sm:px-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12 lg:px-16">
              <div className="relative z-10 mx-auto w-full max-w-xl lg:mx-0">
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#ff5500]">
                  Montagem do gradil
                </p>
                <h1
                  id="accessories-title"
                  className="font-[var(--font-poppins)] text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
                >
                  Encaixe preciso,
                  <br />
                  estrutura firme.
                </h1>
                <p className="mt-6 max-w-lg text-base leading-7 text-[#082d49]/75 dark:text-white/70 sm:text-lg sm:leading-8">
                  O tubo desce até encontrar o painel. Os fixadores acompanham
                  o movimento e se alinham à malha para completar a montagem.
                </p>
                <div className="mt-10 flex items-center gap-3 text-sm font-medium text-[#082d49]/65 dark:text-white/60">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-current">
                    ↓
                  </span>
                  Role para acompanhar o encaixe
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-[1000px]">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-white shadow-[0_28px_80px_rgba(0,35,58,0.16)] ring-1 ring-black/5 dark:shadow-black/30 dark:ring-white/10">
                  <Image
                    src="/images/accessories/gradil-amarelo-2x20.webp"
                    alt="Painel de gradil amarelo com poste e fixadores"
                    fill
                    priority
                    sizes="(max-width: 1023px) 94vw, 62vw"
                    className="object-cover"
                  />

                  {/* Cover the installed post in the photo; the matching crop is revealed by the scroll animation. */}
                  <div
                    aria-hidden="true"
                    className="absolute bg-white dark:bg-white"
                    style={{
                      left: "19.7276%",
                      top: "12.1936%",
                      width: "4.4308%",
                      height: "87.8064%",
                    }}
                  >
                    <div
                      ref={postRef}
                      className="absolute inset-0 will-change-transform"
                    >
                      <Image
                        src="/images/accessories/poste-animado.webp"
                        alt=""
                        aria-hidden="true"
                        fill
                        sizes="(max-width: 1023px) 5vw, 3vw"
                        className="object-fill"
                      />
                    </div>
                  </div>

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/65 to-transparent px-5 pb-5 pt-14 text-white sm:px-7 sm:pb-7">
                    <span className="text-xs font-medium uppercase tracking-[0.18em] sm:text-sm">
                      Gradil 2 × 20 cm
                    </span>
                    <span className="rounded-full border border-white/40 bg-black/20 px-3 py-1.5 text-xs backdrop-blur-sm sm:text-sm">
                      Tubo + fixadores
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-center text-xs text-[#082d49]/50 dark:text-white/45 sm:text-sm">
                  Demonstração visual da montagem acompanhando o scroll.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-10 sm:py-28">
          <div className="mx-auto max-w-5xl border-t border-[#082d49]/15 pt-8 dark:border-white/15">
            <p className="text-sm text-[#082d49]/55 dark:text-white/50">
              Teste de animação — Acessórios
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Accessories;
