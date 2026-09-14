import Image from "next/image";
import {
  BadgeDollarSign,
  Clock3,
  CloudSun,
  Fence,
  ShieldCheck,
} from "lucide-react";

const cards = [
  {
    title: "Mais durabilidade",
    icon: Clock3,
    description: "A galvanização protege o arame e prolonga sua vida útil.",
    image: "img-arame-1.jpg",
  },
  {
    title: "Proteção de zinco",
    icon: ShieldCheck,
    description:
      "Uma camada de zinco ajuda a proteger contra ferrugem e corrosão.",
    image: "img-arame-2.jpg",
  },
  {
    title: "Para áreas externas",
    icon: CloudSun,
    description:
      "Resistência à corrosão atmosférica para aplicações ao ar livre.",
    image: "img-arame-3.jpg",
  },
  {
    title: "Ótimo custo-benefício",
    icon: BadgeDollarSign,
    description: "Resistência e versatilidade para diferentes aplicações.",
    image: "img-arame-4.jpg",
  },
  {
    title: "Aliado no campo",
    icon: Fence,
    description:
      "Ideal para cercamentos, currais e delimitação de áreas rurais.",
    image: "img-arame-5-v2.jpg",
  },
];

export default function ArameCards() {
  return (
    <section
      aria-label="Arames em destaque"
      className="relative z-10 grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-6"
    >
      {cards.map((card, index) => (
        <article
          key={card.title}
          tabIndex={0}
          aria-labelledby={`arame-card-${index}`}
          className={`group relative isolate min-h-[340px] overflow-hidden rounded-[24px] border border-black/[0.06] bg-neutral-100 dark:border-white/10 dark:bg-[#090b0c] outline-none focus-visible:ring-2 focus-visible:ring-[#ff5500] focus-visible:ring-offset-4 lg:min-h-[360px] ${index < 3 ? "lg:col-span-2" : "lg:col-span-3"}`}
        >
          <Image
            src={`/images/img-arame-cards/${card.image}`}
            alt={`Aplicação de arames Insul — imagem ${index + 1}`}
            fill
            sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
            className={`object-cover transition-transform duration-700 ease-out motion-reduce:transition-none ${index === 4 ? "-scale-x-100 group-hover:scale-x-[-1.05] group-hover:scale-y-105 group-focus:scale-x-[-1.05] group-focus:scale-y-105" : "group-hover:scale-105 group-focus:scale-105"}`}
          />
          <div
            aria-hidden="true"
            className={`absolute inset-0 bg-white/95 opacity-0 backdrop-blur-md transition-opacity duration-500 group-hover:opacity-100 group-focus:opacity-100 dark:bg-[#090b0c]/95 motion-reduce:transition-none [@media(hover:none)]:opacity-100 ${index < 3 ? "[mask-image:linear-gradient(to_bottom,black_0%,black_55%,#0009_75%,#0001_100%)]" : "[mask-image:linear-gradient(to_bottom,black_0%,black_72%,#0002_100%)] lg:[mask-image:linear-gradient(to_right,black_0%,black_48%,#0009_70%,#0001_100%)]"}`}
          />
          <div
            className={`absolute inset-x-0 z-10 px-8 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus:opacity-100 motion-reduce:transition-none [@media(hover:none)]:opacity-100 ${index < 3 ? "top-8" : "top-1/2 -translate-y-1/2"}`}
          >
            <card.icon
              aria-hidden="true"
              size={32}
              strokeWidth={1.5}
              className="mb-4 text-[#ff5500]"
            />
            <h2
              id={`arame-card-${index}`}
              className="max-w-[300px] text-[25px] leading-tight font-bold tracking-[-.04em] text-[#ff5500] dark:text-white"
            >
              {card.title}
            </h2>
            <p
              className={`mt-3 text-base font-font-normal leading-[1.45] text-[#5c6068] dark:text-white/75 ${index < 3 ? "max-w-[250px]" : "max-w-[210px]"}`}
            >
              {card.description}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
}
