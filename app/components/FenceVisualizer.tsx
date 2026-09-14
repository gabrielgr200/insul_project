"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { ImageUp, MoveHorizontal, RefreshCw } from "lucide-react";
import FillButton from "./FillButton";
import { soldadasHexagonais } from "../assets/data";

export interface FenceVisualizerItem {
  slug: string;
  name: string;
  src: string;
  paragraph: string;
  color: string;
  category?: string;
}

interface MeshSpec {
  type: "rect" | "hex";
  cellPxW: number;
  cellPxH: number;
}

const parseMeshSpec = (tela: FenceVisualizerItem): MeshSpec => {
  const rectMatch = tela.paragraph.match(
    /Malha\s+([\d.,]+)\s*cm\s*x\s*([\d.,]+)\s*cm/i,
  );
  if (rectMatch) {
    const w = parseFloat(rectMatch[1].replace(",", "."));
    const h = parseFloat(rectMatch[2].replace(",", "."));
    return {
      type: "rect",
      cellPxW: Math.min(60, Math.max(12, w * 4)),
      cellPxH: Math.min(90, Math.max(12, h * 4)),
    };
  }
  const hexMatch = tela.paragraph.match(/-\s*([\d.,]+)\s*cm/i);
  const v = hexMatch ? parseFloat(hexMatch[1].replace(",", ".")) : 7.6;
  const cellPx = Math.min(70, Math.max(12, v * 5));
  return { type: "hex", cellPxW: cellPx, cellPxH: cellPx };
};

const MESH_IMAGES: Record<string, string> = {
  "tela-morada": "/images/imgs-malhas-telas/malha-morada.png",
};

const FenceMeshOverlay = ({ tela }: { tela: FenceVisualizerItem }) => {
  const spec = parseMeshSpec(tela);
  const lineColor = "rgba(228,232,235,0.92)";
  const strokePx = 1.6;
  const meshImage = MESH_IMAGES[tela.slug];

  const meshStyle: CSSProperties = meshImage
    ? {
        backgroundImage: `url(${meshImage})`,
        backgroundRepeat: "repeat-x",
        backgroundSize: "auto 100%",
        backgroundPosition: "left center",
      }
    : spec.type === "rect"
      ? {
          backgroundImage: `repeating-linear-gradient(to right, ${lineColor} 0px, ${lineColor} ${strokePx}px, transparent ${strokePx}px, transparent ${spec.cellPxW}px), repeating-linear-gradient(to bottom, ${lineColor} 0px, ${lineColor} ${strokePx}px, transparent ${strokePx}px, transparent ${spec.cellPxH}px)`,
        }
      : {
          backgroundImage: `repeating-linear-gradient(60deg, ${lineColor} 0px, ${lineColor} ${strokePx}px, transparent ${strokePx}px, transparent ${spec.cellPxW}px), repeating-linear-gradient(-60deg, ${lineColor} 0px, ${lineColor} ${strokePx}px, transparent ${strokePx}px, transparent ${spec.cellPxW}px)`,
        };

  return (
    <div className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          ...meshStyle,
          filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.35))",
        }}
      />
    </div>
  );
};

interface FenceVisualizerProps {
  items?: FenceVisualizerItem[];
  categories?: string[];
  eyebrow?: ReactNode;
  heading?: ReactNode;
  description?: ReactNode;
  stepTwoLabel?: ReactNode;
  simulationLabel?: (name: string) => ReactNode;
  emptyStateLabel?: ReactNode;
}

const FenceVisualizer = ({
  items = soldadasHexagonais,
  categories = ["Todas", "Soldada", "Hexagonal"],
  eyebrow = "Simule na sua propriedade",
  heading = "Veja a cerca no seu terreno",
  description = "Envie uma foto do seu terreno, escolha o tipo de tela e visualize como fica antes e depois da instalação.",
  stepTwoLabel = "2. Tipo de tela",
  simulationLabel = (name) => (
    <>Simulação ilustrativa com a {name} — arraste o círculo para comparar.</>
  ),
  emptyStateLabel = "Envie uma foto e escolha uma tela ao lado para ver a simulação aqui.",
}: FenceVisualizerProps) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [selectedTela, setSelectedTela] = useState<FenceVisualizerItem | null>(
    null,
  );
  const [categoryFilter, setCategoryFilter] = useState<string>("Todas");
  const [sliderPos, setSliderPos] = useState(50);

  const bandTop = 8;
  const bandHeight = 92;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const compareRef = useRef<HTMLDivElement>(null);
  const isDraggingSlider = useRef(false);

  const filteredTelas = useMemo(
    () =>
      categoryFilter === "Todas"
        ? items
        : items.filter((t) => t.category === categoryFilter),
    [items, categoryFilter],
  );

  useEffect(() => {
    return () => {
      if (photoUrl) URL.revokeObjectURL(photoUrl);
    };
  }, [photoUrl]);

  const handleFile = (file: File | null) => {
    if (!file) return;
    setPhotoUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
    setSliderPos(50);
  };

  const updateSliderFromClientX = (clientX: number) => {
    const rect = compareRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(100, Math.max(0, pct)));
  };

  const handleHandlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    isDraggingSlider.current = true;
  };

  const handleContainerPointerDown = (
    e: React.PointerEvent<HTMLDivElement>,
  ) => {
    isDraggingSlider.current = true;
    updateSliderFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingSlider.current) return;
    updateSliderFromClientX(e.clientX);
  };

  const endDrag = () => {
    isDraggingSlider.current = false;
  };

  return (
    <div className="pt-40 pb-16">
      <div className="text-center pb-16">
        <span className="poppins mb-4 inline-flex items-center gap-2 rounded-full border bg-transparent px-4 py-1.5 text-xs font-normal uppercase tracking-widest text-[#002d4d] dark:text-white border-[#ff5500]/15">
          {eyebrow}
        </span>
        <h3 className="text-[#ff5500] dark:text-[#ff5500] font-bold text-3xl poppins">
          {heading}
        </h3>
        <p className="text-[#002d4d] dark:text-white font-light text-[20px] poppins max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[320px_1fr]">
        {/* Painel de configuração */}
        <div className="flex flex-col gap-8">
          <div>
            <h4 className="poppins font-bold text-[#002d4d] dark:text-white mb-3">
              1. Foto do terreno
            </h4>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            />
            {photoUrl ? (
              <div className="flex items-center gap-3">
                <img
                  src={photoUrl}
                  alt="Foto do terreno enviada"
                  className="h-16 w-16 rounded-xl object-cover ring-1 ring-[#002d4d]/10"
                  draggable={false}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="poppins inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#002d4d]/15 px-4 py-2 text-xs font-bold text-[#002d4d] hover:border-[#ff5500] hover:text-[#ff5500] dark:text-white dark:border-white/15 transition-colors"
                >
                  <RefreshCw size={14} />
                  Trocar foto
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="poppins flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#002d4d]/20 py-10 text-center text-[#002d4d]/70 hover:border-[#ff5500] hover:text-[#ff5500] dark:border-white/20 dark:text-white/70 transition-colors"
              >
                <ImageUp size={28} />
                <span className="text-sm font-semibold">
                  Enviar foto do terreno
                </span>
                <span className="text-xs opacity-70">JPG ou PNG</span>
              </button>
            )}
          </div>

          <div>
            <h4 className="poppins font-bold text-[#002d4d] dark:text-white mb-3">
              {stepTwoLabel}
            </h4>
            {categories.length > 1 && (
              <div className="flex gap-2 mb-4">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategoryFilter(cat)}
                    className={`poppins cursor-pointer rounded-full px-3 py-1 text-xs font-bold transition-colors ${
                      categoryFilter === cat
                        ? "bg-[#ff5500] text-white"
                        : "bg-[#002d4d]/5 text-[#002d4d]/70 dark:bg-white/10 dark:text-white/70"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
            <div className="grid grid-cols-4 gap-2 lg:grid-cols-3">
              {filteredTelas.map((tela) => (
                <button
                  key={tela.slug}
                  type="button"
                  onClick={() => setSelectedTela(tela)}
                  title={tela.name}
                  className={`group flex cursor-pointer flex-col items-center gap-1.5 rounded-xl p-1.5 transition-colors ${
                    selectedTela?.slug === tela.slug
                      ? "bg-[#ff5500]/10 ring-2 ring-[#ff5500]"
                      : "ring-1 ring-[#002d4d]/10 dark:ring-white/10 hover:ring-[#ff5500]/50"
                  }`}
                >
                  <img
                    src={tela.src}
                    alt={tela.name}
                    className="aspect-square w-full rounded-lg object-contain bg-white/60 dark:bg-white/5"
                    draggable={false}
                  />
                  <span className="poppins line-clamp-1 text-center text-[10px] font-semibold text-[#002d4d] dark:text-white">
                    {tela.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Área de visualização */}
        <div>
          {photoUrl && selectedTela ? (
            <>
              <div
                ref={compareRef}
                className="relative h-[320px] w-full touch-none select-none overflow-hidden rounded-2xl shadow-xl shadow-black/10 sm:h-[440px]"
                onPointerDown={handleContainerPointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={endDrag}
                onPointerLeave={endDrag}
                onPointerCancel={endDrag}
              >
                {/* DEPOIS: foto + tela sobreposta */}
                <div className="absolute inset-0">
                  <img
                    src={photoUrl}
                    alt="Terreno com a tela instalada"
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                  <div
                    className="absolute left-0 right-0"
                    style={{
                      top: `${bandTop}%`,
                      height: `${bandHeight}%`,
                    }}
                  >
                    <FenceMeshOverlay tela={selectedTela} />
                  </div>
                </div>

                {/* ANTES: foto original, recortada pelo slider */}
                <div
                  className="absolute inset-0"
                  style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                >
                  <img
                    src={photoUrl}
                    alt="Terreno original, sem cerca"
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                </div>

                <span className="poppins pointer-events-none absolute left-3 top-3 rounded-full bg-black/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  Antes
                </span>
                <span className="poppins pointer-events-none absolute right-3 top-3 rounded-full bg-black/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  Depois
                </span>

                <div
                  className="absolute bottom-0 top-0 w-[2px] bg-white"
                  style={{ left: `${sliderPos}%` }}
                >
                  <button
                    type="button"
                    onPointerDown={handleHandlePointerDown}
                    aria-label="Arraste para comparar antes e depois"
                    className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-white text-[#002d4d] shadow-lg"
                  >
                    <MoveHorizontal size={20} />
                  </button>
                </div>
              </div>
              <p className="poppins mt-3 text-center text-xs text-[#002d4d]/50 dark:text-white/50">
                {simulationLabel(selectedTela.name)}
              </p>
            </>
          ) : (
            <div className="flex h-[320px] w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#002d4d]/15 text-center text-[#002d4d]/50 dark:border-white/15 dark:text-white/50 sm:h-[440px]">
              <ImageUp size={32} />
              <p className="poppins max-w-xs text-sm">{emptyStateLabel}</p>
            </div>
          )}

          <div className="mt-8 text-center">
            <FillButton
              href="https://wa.me/5551995098453"
              target="_blank"
              rel="noopener noreferrer"
              className="poppins inline-block cursor-pointer rounded-full border border-[#FF6A1A] bg-[#ff5500] px-6 py-3 text-sm font-bold text-white"
              overlayClassName="bg-white dark:bg-background text-[#ff5500]"
            >
              Enviar essa simulação e pedir orçamento
            </FillButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FenceVisualizer;
