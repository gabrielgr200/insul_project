import Image from "next/image";
import type { CercaShowcaseOption } from "../assets/data";

export default function CercaShowcaseLength({ option }: { option: CercaShowcaseOption }) {
  return (
    <div className="relative size-full overflow-hidden">
      <div style={{ aspectRatio: option.lengthImageRatio || "4 / 3", transform: `translateY(${option.lengthImageOffset ?? 17}%)` }} className="absolute bottom-0 left-0 w-full">
        {/* O verso fica atrás da madeira; as curvas frontais envolvem cada mourão. */}
        <div aria-hidden="true" className="absolute top-[43.3%] left-[1.2%] z-0 h-[11.4%] w-[4.8%] rounded-[50%] bg-[#090909]" />
        <div aria-hidden="true" className="absolute top-[43.3%] right-[1.2%] z-0 h-[11.4%] w-[4.8%] rounded-[50%] bg-[#090909]" />
        <div aria-hidden="true" className="absolute top-[44%] left-[1.6%] z-30 h-[10%] w-[4.4%] rounded-l-[50%_18%] border-y border-white/50 bg-gradient-to-r from-[#080808] via-[#454545] to-black shadow-[-3px_3px_6px_#0005]">
          <svg viewBox="0 0 50 100" preserveAspectRatio="none" className="size-full">
            <path d="M8 58 Q24 45 43 50 M36 43 L43 50 L36 57" fill="none" stroke="white" strokeWidth="2" />
          </svg>
        </div>
        <div aria-hidden="true" className="absolute top-[44%] right-[1.6%] z-30 h-[10%] w-[4.4%] rounded-r-[50%_18%] border-y border-white/50 bg-gradient-to-l from-[#080808] via-[#454545] to-black shadow-[3px_3px_6px_#0005]">
          <svg viewBox="0 0 50 100" preserveAspectRatio="none" className="size-full -scale-x-100">
            <path d="M8 58 Q24 45 43 50 M36 43 L43 50 L36 57" fill="none" stroke="white" strokeWidth="2" />
          </svg>
        </div>
        <div className="absolute top-[44%] right-[5.8%] left-[5.8%] z-20 flex h-[10%] min-h-9 items-center justify-center border-y border-white/70 bg-black text-center text-xs font-medium text-white shadow-[0_6px_8px_#0005] sm:text-base">
          <div className="flex size-full items-center justify-center rounded-[inherit] bg-gradient-to-r from-transparent via-black to-transparent px-6">
            {option.bandText}
          </div>
        </div>
        <Image src={option.image} alt={option.title} fill quality={90} sizes="(min-width: 1024px) 65vw, 100vw" className="z-10 object-contain" />
      </div>
    </div>
  );
}
