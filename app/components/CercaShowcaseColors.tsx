"use client";

import Image from "next/image";
import type { CercaShowcaseOption } from "../assets/data";

export default function CercaShowcaseColors({
  option,
  selectedColor,
}: {
  option: CercaShowcaseOption;
  selectedColor: number;
}) {
  const colors = option.colorOptions ?? [];
  const active = colors[selectedColor] ?? colors[0];

  if (!active) return null;

  return (
    <div className="absolute inset-0">
      <Image
        key={active.image}
        src={active.image}
        alt={`Tela de torção simples ${active.title}`}
        fill
        sizes="(min-width: 1024px) 65vw, 100vw"
        className="object-contain"
      />
    </div>
  );
}
