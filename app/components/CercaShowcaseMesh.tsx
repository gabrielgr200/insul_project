import Image from "next/image";
import type { CercaShowcaseOption } from "../assets/data";

export default function CercaShowcaseMesh({ option }: { option: CercaShowcaseOption }) {
  const lower = option.kind === "lowerMesh";
  const outline = option.meshOutline || (lower
    ? { x: 13.9, y: 39.8, width: 27.2, height: 14 }
    : { x: 19, y: 36.6, width: 30.7, height: 32.5 });
  return (
    <div className="absolute inset-0 overflow-hidden [container-type:size]">
      <div className="absolute top-1/2 left-1/2 h-[max(75cqw,100cqh)] w-[max(100cqw,133.333333cqh)] -translate-x-1/2 -translate-y-1/2">
        <Image src={option.image} alt={option.title} fill sizes="(min-width: 1024px) max(65vw, 120svh), 100vw" className="object-cover" />
        {(option.meshOutline || (option.widthLabel && option.heightLabel)) && <div style={{ left: `${outline.x}%`, top: `${outline.y}%`, width: `${outline.width}%`, height: `${outline.height}%` }} className="absolute border-2 border-[#ff5500] text-[#002d4d] dark:text-white">
          {option.widthLabel && <span className="absolute bottom-full left-1/2 mb-3 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/95 px-3 py-1 text-sm font-semibold shadow-sm dark:bg-[#292c31] sm:text-base">{option.widthLabel}</span>}
          {option.heightLabel && <span className="absolute top-1/2 right-full mr-3 -translate-y-1/2 whitespace-nowrap rounded-full bg-white/95 px-3 py-1 text-sm font-semibold shadow-sm dark:bg-[#292c31] sm:text-base">{option.heightLabel}</span>}
        </div>}
      </div>
    </div>
  );
}
