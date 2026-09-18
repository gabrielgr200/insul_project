import Image from "next/image";
import { useId } from "react";
import type { CercaShowcaseOption } from "../assets/data";


export default function CercaShowcaseKnot({ option }: { option: CercaShowcaseOption }) {
  const lineMaskId = useId();
  const target = option.knotTarget || { x: 55.7, y: 59.2 };
  return (
    <div className="pointer-events-none absolute inset-0 z-10 [container-type:size]">
      <div aria-hidden="true" className="absolute bottom-0 left-1/2 h-[max(56.22cqw,100cqh)] w-[max(100cqw,177.875cqh)] -translate-x-1/2">
        <svg className="absolute inset-0 size-full">
          <defs>
            <mask id={lineMaskId} maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
              <rect width="100%" height="100%" fill="white" />
              <circle cx={`${target.x}%`} cy={`${target.y}%`} r="13" fill="black" />
            </mask>
          </defs>
          <line x1={`${target.x}%`} y1={`${target.y}%`} x2="66%" y2="38%" stroke="white" strokeWidth="2" mask={`url(#${lineMaskId})`} />
        </svg>
        <span style={{ left: `${target.x}%`, top: `${target.y}%` }} className="absolute size-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_2px_#0003]" />
      </div>
      <div className="absolute right-4 bottom-4 size-40 overflow-hidden rounded-full border-2 border-white bg-[#f5f5f5] shadow-xl dark:bg-[#191b1e] sm:size-52 lg:top-[18%] lg:right-auto lg:bottom-auto lg:left-[61%] lg:size-60">
        {option.detailImage ? <Image src={option.detailImage} alt={`Detalhe ampliado: ${option.title}`} fill quality={90} sizes="240px" className="object-contain" /> : (
          <Image src={option.image} alt={`Detalhe ampliado: ${option.title}`} width={4269} height={2400} quality={90} sizes="2400px" className="absolute max-w-none" style={{ width: "1000%", height: "auto", left: `${50 - target.x * 10}%`, top: `${50 - target.y * 10 * 2400 / 4269}%` }} />
        )}
      </div>
    </div>
  );
}
