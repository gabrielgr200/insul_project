"use client";

import { useRef, useState } from "react";
import { Pause, Play, SkipForward, Volume2, VolumeX } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContentTranslation } from "./LanguageProvider";

const videos = [
  {
    title: "Poste T de aço",
    label: "01 / Estrutura",
    description: "A base resistente que sustenta a instalação da cerca.",
    src: "/videos/videos-reels-posteT/video_poste_T.mov",
  },
  {
    title: "Batedor manual",
    label: "02 / Instalação",
    description: "Ferramenta de apoio para posicionar o poste com praticidade.",
    src: "/videos/videos-reels-posteT/reel-posteT-2.mp4",
  },
];

const formatTime = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;

export default function AccessoryInstallationVideos() {
  const translateText = useContentTranslation();
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [times, setTimes] = useState(videos.map(() => ({ current: 0, duration: 0 })));

  const selectVideo = (index: number) => {
    refs.current.forEach((video) => video?.pause());
    setPlaying(false);
    setActive(index);
  };

  const updateTime = (index: number, video: HTMLVideoElement) => {
    setTimes((previous) => previous.map((time, i) => i === index
      ? { current: video.currentTime, duration: Number.isFinite(video.duration) ? video.duration : 0 }
      : time));
  };

  const togglePlay = () => {
    const video = refs.current[active];
    if (!video) return;
    if (video.paused) {
      void video.play().catch(() => setPlaying(false));
    } else {
      video.pause();
    }
  };

  return (
    <>
      <div data-accessory-install-copy className="relative z-10 flex flex-col gap-7 px-3 pb-5 sm:px-6 lg:gap-10 lg:pb-0 lg:pr-9">
        <h3 className="poppins text-2xl font-semibold text-[#0b4f83] tracking-tight">{translateText("Instalação em cada etapa.")}</h3>
        {videos.map((video, index) => (
          <button
            key={video.src}
            type="button"
            onClick={() => selectVideo(index)}
            aria-pressed={active === index}
            className="relative cursor-pointer pl-5 text-left transition-opacity duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff5500]"
            style={{ opacity: active === index ? 1 : 0.48 }}
          >
            <span aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-[2px] bg-[#082d49]/20">
              <span
                className="block h-full w-full origin-top bg-[#ff5500] transition-transform duration-200 ease-linear"
                style={{ transform: `scaleY(${times[index].duration ? times[index].current / times[index].duration : 0})` }}
              />
            </span>
            <span className="poppins text-xs font-medium uppercase tracking-widest text-[#ff5500]">{translateText(video.label)}</span>
            <span className="poppins mt-2 block text-xl font-semibold">{translateText(video.title)}</span>
            <span className="poppins mt-2 block text-sm leading-6 text-[#082d49]/65">{translateText(video.description)}</span>
          </button>
        ))}
      </div>
      <div data-accessory-install-frame className="relative z-20 h-[42svh] min-h-[260px] overflow-hidden rounded-[2rem] p-5 sm:p-8 lg:h-[66svh] lg:p-10">
        <div data-accessory-install-background aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[#f0f2f4]" />
        {videos.map((video, index) => (
          <div key={video.src} aria-hidden={active !== index} className={`absolute inset-0 p-8 pb-20 transition-opacity duration-300 ${active === index ? "visible opacity-100" : "invisible pointer-events-none opacity-0"}`}>
            <video
              ref={(element) => { refs.current[index] = element; }}
              src={video.src}
              aria-label={translateText(`Vídeo: ${video.title}`)}
              muted={muted}
              playsInline
              preload="metadata"
              onTimeUpdate={(event) => updateTime(index, event.currentTarget)}
              onLoadedMetadata={(event) => {
                updateTime(index, event.currentTarget);
                ScrollTrigger.refresh();
              }}
              onDurationChange={(event) => updateTime(index, event.currentTarget)}
              onPlay={() => { if (index === active) setPlaying(true); }}
              onPause={() => { if (index === active) setPlaying(false); }}
              onEnded={() => { if (index === active) setPlaying(false); }}
              className="mx-auto block h-full w-auto max-w-full rounded-[1.5rem] object-contain ring-8 ring-white"
            />
          </div>
        ))}
        <div className="absolute inset-x-6 bottom-5 z-30 flex items-center justify-center gap-3">
          <button type="button" onClick={togglePlay} aria-label={translateText(playing ? "Pausar vídeo" : "Reproduzir vídeo")} className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-black shadow focus-visible:outline-2 focus-visible:outline-[#ff5500]">
            {translateText(playing ? <Pause size={15} fill="black" /> : <Play size={15} fill="black" className="ml-0.5" />)}
          </button>
          <span className="min-w-[80px] text-center text-xs tabular-nums text-[#082d49]" aria-live="off">{formatTime(times[active].current)} / {formatTime(times[active].duration)}</span>
          <button type="button" onClick={() => selectVideo((active + 1) % videos.length)} aria-label={translateText(`Mudar para ${videos[(active + 1) % videos.length].title}`)} className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-black shadow focus-visible:outline-2 focus-visible:outline-[#ff5500]">
            <SkipForward size={15} />
          </button>
          <button type="button" onClick={() => setMuted((previous) => !previous)} aria-label={translateText(muted ? "Ativar som" : "Silenciar vídeo")} aria-pressed={!muted} className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-black shadow focus-visible:outline-2 focus-visible:outline-[#ff5500]">
            {translateText(muted ? <VolumeX size={15} /> : <Volume2 size={15} />)}
          </button>
        </div>
      </div>
    </>
  );
}
