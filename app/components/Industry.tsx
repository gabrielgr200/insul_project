'use client';

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTimeline from "./Timeline";

const steps = [
  {
    title: "Ano 2011",
    description:
      "Início de fabricação das primeiras telas de simples torção em pavilhão alugado de 200 m²",
  },
  {
    title: "Ano 2012",
    description:
      "Mudança para pavilhão de 420 m² alugado e chegada da primeira máquina importada (Tela Hexagonal de 3”)",
  },
  {
    title: "Ano 2013",
    description:
      "Aquisição de máquinas automáticas para alambrado da Maxtelas e expansão da equipe produtiva e comercial.",
  },
  {
    title: "Ano 2015",
    description:
      "Mudança para fábrica (alugada), maior, com 900 m² de área produtiva e início da fabricação de telas soldadas.",
  },
  {
    title: "Ano 2018",
    description:
      "Construção e mudança para primeira unidade própria, com 1600 m², da Insul e expansão da linha de telas soldadas e início da fabricação de cercas prontas (Cerca pronta Campeira).",
  },
  {
    title: "Ano 2020",
    description:
      "Aumento da área produtiva para instalação de novas máquinas hexagonais e estoque de produtos acabados.",
  },
  {
    title: "Ano 2021",
    description:
      "Expansão da indústria com a instalação de máquinas europeias de tela soldada e início da fabricação de gradis.",
  },
  {
    title: "Ano 2024",
    description:
      "Instalação de linha de produção e pintura automática para gradis, além da chegada de mais uma máquina europeia para fabricação de telas soldadas.",
  },
];

export const IndustryHeader = () => {
  const sectionRef = useRef(null);

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

      tl.from(".INDUSTRY-LABEL", { y: 20, opacity: 0, duration: 0.5 })
        .from(
          ".INDUSTRY-TITLE",
          { x: -80, opacity: 0, duration: 0.8, ease: "power2.out" },
          "-=0.2",
        )
        .from(".INDUSTRY-TEXT", { y: 20, opacity: 0, duration: 0.5 }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="industria"
      className="relative max-w-7xl mx-auto p-4 sm:p-8 mt-20 mb-20"
    >
      <h3 className="INDUSTRY-LABEL text-[#002d4d] font-semibold text-2xl poppins py-3">
        Conheça nossa história
      </h3>
      <div className="relative flex justify-between items-end mb-12">
        <h2 className="INDUSTRY-TITLE text-[#ff5500] text-6xl lg:text-9xl impact uppercase text-nowrap leading-tight">
          A INDÚSTRIA
        </h2>
        {/* <button
          className="text-sm lg:text-lg absolute right-0 font-medium
          border border-zinc-900 text-zinc-900 px-5 lg:px-8 py-3 rounded-full
          cursor-pointer hover:bg-zinc-900 hover:text-zinc-50 transition-all duration-200 ease-in"
        >
          See All
        </button>*/}
      </div>

      <p className="INDUSTRY-TEXT text-base lg:text-lg text-[#002d4d] lg:w-full">
        Somos especializados na fabricação de uma ampla linha de produtos
        derivados do arame, como: telas hexagonais, telas soldadas, telas
        alambrado, cercas prontas, gradis e acessórios para cercamentos em geral
        - atendendo às necessidades dos setores rural, residencial, industrial e
        de construção civil.{" "}
      </p>
    </section>
  );
};

export const IndustryTimeline = () => {
  return (
    <section className="relative isolate z-0 min-h-[200vh] bg-white">
      <ScrollTimeline items={steps} />
    </section>
  );
};
