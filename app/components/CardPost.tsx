'use client';

import { useRef, useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCw,
  SkipForward,
} from "lucide-react";

const reels = [
  { src: "https://res.cloudinary.com/kcqitv3l/video/upload/v1785433064/fenix_xuz2jb.mp4", name: "Cerca Fênix Insul" },
  { src: "https://res.cloudinary.com/kcqitv3l/video/upload/v1785433078/campeira_adheng.mp4", name: "Cerca Campeira Insul" },
  { src: "https://res.cloudinary.com/kcqitv3l/video/upload/v1785433212/campeira-maxx_rykqie.mp4", name: "Cerca Campeira Maxx Insul" },
  { src: "https://res.cloudinary.com/kcqitv3l/video/upload/v1785433065/campeira-boi_insdku.mp4", name: "Cerca Campeira Boi Insul" },
  { src: "https://res.cloudinary.com/kcqitv3l/video/upload/v1785850079/campeira-java_ynluat.mp4", name: "Cerca Campeira Java Insul" },
  { src: "https://res.cloudinary.com/kcqitv3l/video/upload/v1785496903/queda-da-arvore_tzvcoq.mp4", name: "A resistência das cercas" },
];

const setAt = <T,>(arr: T[], i: number, value: T): T[] =>
  arr.map((v, idx) => (idx === i ? value : v));

const CardPost = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [playing, setPlaying] = useState(() => reels.map(() => false));
  const [muted, setMuted] = useState(() => reels.map(() => true));

  const togglePlay = (i: number) => {
    const el = videoRefs.current[i];
    if (!el) return;
    if (el.paused) el.play();
    else el.pause();
  };

  const toggleMute = (i: number) => {
    const el = videoRefs.current[i];
    if (!el) return;
    el.muted = !el.muted;
    setMuted((m) => setAt(m, i, el.muted));
  };

  const replay = (i: number) => {
    const el = videoRefs.current[i];
    if (!el) return;
    el.currentTime = 0;
    el.play();
  };

  const skipToNext = (i: number) => {
    const current = videoRefs.current[i];
    if (current) current.pause();
    const nextIndex = (i + 1) % reels.length;
    const nextEl = videoRefs.current[nextIndex];
    if (nextEl) {
      nextEl.currentTime = 0;
      nextEl.play();
    }
  };

  return (
    <section className="relative overflow-hidden rounded-3xl bg-zinc-50 px-4 py-12 backdrop-blur-xl sm:px-8 dark:bg-white/5">
      <div className="relative mx-auto max-w-xl text-center">
        <span className="inline-block rounded-full border border-[#ff5500] px-3 py-1 text-xs text-[#002d4d] dark:text-white">
          Vídeos
        </span>
        <h3 className="mt-4 text-2xl font-bold poppins text-[#ff5500] sm:text-3xl">
          Veja sobre as cercas prontas
        </h3>
        <p className="mt-2 text-sm text-[#002d4d] dark:text-white poppins">
          <span className="font-bold">Especificações e detalhes: </span>acompanhe de perto como cada
          cerca pronta Insul se comporta no campo.
        </p>
      </div>

      <div className="relative mx-auto mt-8 grid max-w-6xl grid-cols-2 gap-3 sm:flex sm:justify-center sm:gap-4">
        {reels.map((reel, i) => (
          <div
            key={reel.src}
            className="group relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-black sm:w-44"
          >
            <video
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              src={reel.src}
              muted={muted[i]}
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
              onPlay={() => setPlaying((p) => setAt(p, i, true))}
              onPause={() => setPlaying((p) => setAt(p, i, false))}
            />

            <button
              type="button"
              onClick={() => togglePlay(i)}
              aria-label={playing[i] ? "Pausar vídeo" : "Reproduzir vídeo"}
              className="absolute left-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white text-black shadow"
            >
              {playing[i] ? (
                <Pause size={13} fill="black" />
              ) : (
                <Play size={13} fill="black" className="ml-0.5" />
              )}
            </button>

            <div className="absolute left-1/2 top-2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full bg-black/60 px-1.5 py-1 opacity-0 backdrop-blur transition-opacity duration-200 group-hover:opacity-100">
              <button
                type="button"
                onClick={() => replay(i)}
                aria-label="Reiniciar vídeo"
                className="flex h-5 w-5 items-center justify-center text-white"
              >
                <RotateCw size={13} />
              </button>
              <button
                type="button"
                onClick={() => skipToNext(i)}
                aria-label="Próximo vídeo"
                className="flex h-5 w-5 items-center justify-center text-white"
              >
                <SkipForward size={13} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => toggleMute(i)}
              aria-label={muted[i] ? "Ativar som" : "Silenciar vídeo"}
              className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white text-black shadow"
            >
              {muted[i] ? <VolumeX size={13} /> : <Volume2 size={13} />}
            </button>

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2.5 pt-8">
              <p className="text-xs font-medium text-white">{reel.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardPost;
