"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ImageIcon, X } from "lucide-react";
import type { Specification } from "../assets/data";

interface SpecItem {
  id: number;
  title: string;
  summary: string;
  description: string;
}

const ImagePlaceholder = ({ iconSize = 22 }: { iconSize?: number }) => (
  <div className="flex flex-col items-center gap-1 text-zinc-400">
    <ImageIcon size={iconSize} />
  </div>
);

interface SpecificationsProps {
  specifications: Specification[];
  color: string;
}

export default function Specifications({ specifications, color }: SpecificationsProps) {
  const items: SpecItem[] = specifications.map((spec, i) => ({
    id: i,
    title: spec.title,
    summary: spec.summary,
    description: spec.description,
  }));
  const [active, setActive] = useState<SpecItem | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    document.body.style.overflow = active ? "hidden" : "auto";

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setActive(null);
      }
    }

    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <section
      className="mx-auto max-w-full px-4 py-16 sm:px-8"
      style={{ backgroundColor: color }}
    >
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 h-full w-full bg-black/40 z-[10000]"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 top-16 grid place-items-center z-[10001] p-4">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="absolute top-4 right-4 flex items-center justify-center bg-white rounded-full h-8 w-8 lg:hidden"
              onClick={() => setActive(null)}
            >
              <X className="h-4 w-4 text-black" />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-lg h-full md:h-fit md:max-h-[90%] flex flex-col bg-white sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <div className="w-full h-40 md:h-56 bg-zinc-100 flex items-center justify-center">
                  <ImagePlaceholder iconSize={36} />
                </div>
              </motion.div>

              <div className="p-6">
                <motion.h3
                  layoutId={`title-${active.title}-${id}`}
                  className="poppins text-lg font-bold text-[#002d4d]"
                >
                  {active.title}
                </motion.h3>

                <motion.p
                  layoutId={`description-${active.title}-${id}`}
                  className="mt-4 text-sm poppins leading-relaxed text-zinc-600"
                >
                  {active.description}
                </motion.p>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <motion.div
            layoutId={`card-${item.title}-${id}`}
            key={item.id}
            onClick={() => setActive(item)}
            className="flex cursor-pointer gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 shadow-lg backdrop-blur-xl transition-colors hover:bg-white/20"
          >
            <motion.div layoutId={`image-${item.title}-${id}`}>
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/10">
                <ImagePlaceholder />
              </div>
            </motion.div>

            <div className="flex flex-col justify-center">
              <motion.h3
                layoutId={`title-${item.title}-${id}`}
                className="poppins text-sm font-bold text-white"
              >
                {item.title}
              </motion.h3>
              <motion.p
                layoutId={`description-${item.title}-${id}`}
                className="mt-3 text-xs poppins font-normal leading-relaxed text-white/70"
              >
                {item.summary}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
