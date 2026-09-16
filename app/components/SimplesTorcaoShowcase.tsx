"use client";

import { useState } from "react";
import Image from "next/image";
import { Anvil, Award, ShieldCheck } from "lucide-react";


const finishes = [
  { name: "Galvanizada", file: "torção-galvanizado.png", color: "bg-[#bac3ca]" },
  { name: "PVC Verde", file: "torção-PVC-verde.png", color: "bg-[#278348]" },
  { name: "PVC Azul", file: "torção-PVC-azul.png", color: "bg-[#267bcc]" },
];

export default function SimplesTorcaoShowcase() {
  const [selected, setSelected] = useState(0);

  return (
    <section className="poppins relative isolate mt-18 overflow-hidden rounded-3xl bg-white text-center text-[#002d4d] dark:bg-[#090b0c] dark:text-white sm:mt-28 sm:rounded-[32px]" aria-labelledby="torcao-title">
      <div className="relative z-3 px-5 pt-12 sm:px-6 sm:pt-18">
        <span className="text-[11px] font-medium tracking-[.22em] text-[#002d4d] dark:text-white">
          TELAS DE TORÇÃO SIMPLES
        </span>
        <h2 id="torcao-title" className="my-5 text-[clamp(32px,4.5vw,56px)] leading-[1.12] text-[#ff5500] font-semibold tracking-[-.045em]">
          Proteção que acompanha<br />
          <span className="text-[#074674] dark:text-white font-light">
            o seu espaço.
          </span>
        </h2>
        <p className="mx-auto max-w-[530px] text-[13px] leading-[1.8] text-[#002d4d] dark:text-white sm:text-[15px]">
          Conheça as telas de torção simples Insul. Diferentes acabamentos para o cercamento do seu projeto.
        </p>
      </div>

      <div className="relative mt-16 h-[260px] sm:mt-24 sm:h-[360px]">
        <div className="pointer-events-none absolute -top-10 left-1/2 size-[360px] -translate-x-1/2 bg-[radial-gradient(circle,#ff550040_0%,#ff550018_35%,transparent_65%)] dark:bg-[radial-gradient(circle,#ff550075_0%,#ff550026_35%,transparent_65%)] sm:-top-16 sm:size-[920px]" aria-hidden="true" />
        <span className="absolute top-[140px] left-[5%] z-3 grid size-[38px] animate-torcao-float place-items-center rounded-full border border-[#ffffff12] bg-[#ff5500] text-white motion-reduce:animate-none sm:top-[180px] sm:left-[13%] sm:size-[58px] [&_svg]:w-[18px] sm:[&_svg]:w-6" aria-hidden="true">
          <ShieldCheck />
        </span>
        <span className="absolute top-[18px] left-[22%] z-3 grid size-[38px] animate-torcao-float place-items-center rounded-full border border-black/8 bg-[#ffe4d1] text-[#c2410c] [animation-delay:-2s] motion-reduce:animate-none dark:border-[#ffffff12] dark:bg-[#27150c] dark:text-[#ffb185] sm:top-9 sm:left-[32%] sm:size-[45px] [&_svg]:w-[18px] sm:[&_svg]:w-6" aria-hidden="true">
          <Award />
        </span>
        <span className="absolute top-[55px] right-[6%] z-3 grid size-[38px] animate-torcao-float place-items-center rounded-full border border-black/8 bg-[#ffe4d1] text-[#c2410c] [animation-delay:-4s] motion-reduce:animate-none dark:border-[#ffffff12] dark:bg-[#27150c] dark:text-[#ffb185] sm:top-[90px] sm:right-[14%] sm:size-[70px] [&_svg]:w-[18px] sm:[&_svg]:w-6" aria-hidden="true">
          <Anvil />
        </span>
        <div className="absolute inset-0">
          {finishes.map((finish, index) => {
            const position = (index - selected + finishes.length) % finishes.length;
            return (
              <div key={finish.file} className="absolute -top-4 left-1/2 h-[260px] w-[250px] transition-[transform,opacity,filter] duration-800 ease-[cubic-bezier(.22,1,.36,1)] data-[position=0]:z-2 data-[position=0]:[transform:translateX(-50%)] data-[position=0]:opacity-100 data-[position=0]:drop-shadow-[0_20px_26px_#0008] data-[position=1]:z-1 data-[position=1]:[transform:translateX(2%)_translateY(48px)_rotate(12deg)_scale(.65)] data-[position=1]:opacity-55 data-[position=2]:z-1 data-[position=2]:[transform:translateX(-102%)_translateY(48px)_rotate(-12deg)_scale(.65)] data-[position=2]:opacity-55 motion-reduce:transition-none sm:top-2 sm:h-[360px] sm:w-[340px]" data-position={position} aria-hidden={index !== selected}>
                <Image src={`https://d2c3kthzw0ta10.cloudfront.net/tela-torcao-simples/${finish.file}`} alt={`Tela de torção simples ${finish.name}`} fill sizes="(max-width: 640px) 62vw, 380px" className="scale-[1.3] object-contain" />
              </div>
            );
          })}
        </div>
      </div>

      <div id="torcao-acabamentos" className="relative z-4 scroll-mt-[120px] bg-[linear-gradient(transparent,#fff_55px)] px-5 pt-12 pb-10 dark:bg-[linear-gradient(transparent,#090b0c_55px)] sm:bg-[linear-gradient(transparent,#fff_75px)] sm:dark:bg-[linear-gradient(transparent,#090b0c_75px)] sm:pt-16">
        <p className="mb-4 text-[10px] tracking-[.2em] text-[#6b7280] dark:text-[#93979a]">ESCOLHA O ACABAMENTO</p>
        <div className="flex flex-wrap justify-center gap-2.5" role="group" aria-label="Acabamento da tela de torção simples">
          {finishes.map((finish, index) => (
            <button key={finish.name} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)} className="flex cursor-pointer items-center gap-[9px] rounded-full border border-black/10 bg-black/[0.03] px-3 py-2.5 text-[11px] text-[#4a5568] transition-colors duration-200 hover:border-[#ff742e] focus-visible:outline-2 focus-visible:outline-offset-5 focus-visible:outline-[#002d4d] aria-pressed:border-[#ff742e] aria-pressed:bg-[#ff550015] aria-pressed:text-[#002d4d] motion-reduce:transition-none dark:border-[#ffffff24] dark:bg-[#111314] dark:text-[#b8bbbd] dark:focus-visible:outline-white dark:aria-pressed:text-white sm:px-[17px] sm:py-[11px] sm:text-xs">
              <span className={`size-3 rounded-full ${finish.color}`} />{finish.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
