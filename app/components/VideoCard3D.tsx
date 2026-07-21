"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Maximize2, Pause, Play, SkipForward, Volume2, VolumeX } from "lucide-react";

const MAX_TILT = 10;
const TICK_COUNT = 46;

const formatTime = (seconds: number) => {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const CornerBracket = ({
  className,
  x,
  y,
}: {
  className: string;
  x: ReturnType<typeof useTransform<number, number>>;
  y: ReturnType<typeof useTransform<number, number>>;
}) => (
  <motion.span
    style={{ x, y }}
    className={`pointer-events-none absolute h-5 w-5 border-cyan-300/80 drop-shadow-[0_0_6px_rgba(103,232,249,0.7)] ${className}`}
  />
);

const VideoCard3D = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const bracketX = useTransform(springRotateY, [-MAX_TILT, MAX_TILT], [-12, 12]);
  const bracketYFromTiltX = useTransform(springRotateX, [-MAX_TILT, MAX_TILT], [12, -12]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * MAX_TILT);
    rotateX.set(-py * MAX_TILT);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const skipForward = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.min(video.currentTime + 10, video.duration || 0);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen();
    }
  };

  const seekFromClientX = (clientX: number) => {
    const video = videoRef.current;
    const track = timelineRef.current;
    if (!video || !track || !video.duration) return;
    const rect = track.getBoundingClientRect();
    const fraction = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    video.currentTime = fraction * video.duration;
  };

  const handleTimelinePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    seekFromClientX(e.clientX);
    const onMove = (ev: PointerEvent) => seekFromClientX(ev.clientX);
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const setVolumeFromClientX = (clientX: number) => {
    const video = videoRef.current;
    const track = volumeRef.current;
    if (!video || !track) return;
    const rect = track.getBoundingClientRect();
    const fraction = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    video.volume = fraction;
    setVolume(fraction);
    if (fraction === 0) {
      video.muted = true;
      setIsMuted(true);
    } else if (video.muted) {
      video.muted = false;
      setIsMuted(false);
    }
  };

  const handleVolumePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setVolumeFromClientX(e.clientX);
    const onMove = (ev: PointerEvent) => setVolumeFromClientX(ev.clientX);
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const progress = duration > 0 ? currentTime / duration : 0;
  const filledTicks = Math.round(progress * TICK_COUNT);

  return (
    <section className="px-4 py-16 sm:px-8">
      <div
        className="relative mx-auto max-w-2xl p-5"
        style={{ perspective: 1200 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <CornerBracket
          className="top-0 left-0 rounded-tl-md border-t-2 border-l-2"
          x={bracketX}
          y={bracketYFromTiltX}
        />
        <CornerBracket
          className="top-0 right-0 rounded-tr-md border-t-2 border-r-2"
          x={bracketX}
          y={bracketYFromTiltX}
        />
        <CornerBracket
          className="bottom-0 left-0 rounded-bl-md border-b-2 border-l-2"
          x={bracketX}
          y={bracketYFromTiltX}
        />
        <CornerBracket
          className="right-0 bottom-0 rounded-br-md border-r-2 border-b-2"
          x={bracketX}
          y={bracketYFromTiltX}
        />

        <motion.div
          ref={containerRef}
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl"
        >
          <video
            ref={videoRef}
            src="/videos/video-card-3d.mp4"
            playsInline
            muted={isMuted}
            className="h-full w-full object-cover"
            onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

          <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-md bg-black/60 px-2 py-1 backdrop-blur-sm">
            {isPlaying ? (
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            ) : (
              <span className="h-1.5 w-1.5 rounded-[2px] bg-white" />
            )}
            <span className="text-[10px] font-medium tracking-widest text-white/80 uppercase">
              {isPlaying ? "Active" : "Paused"}
            </span>
          </div>

          <div className="absolute top-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label="Tela cheia"
              className="flex h-7 w-7 items-center justify-center rounded-md bg-black/60 text-white/90 backdrop-blur-sm transition-colors hover:bg-black/80"
            >
              <Maximize2 size={12} />
            </button>
            <button
              type="button"
              onClick={skipForward}
              aria-label="Avançar 10 segundos"
              className="flex h-7 w-7 items-center justify-center rounded-md bg-black/60 text-white/90 backdrop-blur-sm transition-colors hover:bg-black/80"
            >
              <SkipForward size={12} />
            </button>
          </div>

          <div className="absolute right-3 bottom-14 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] text-white/80 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-[2px] bg-white/70" />
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>

          <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 border-t border-white/10 bg-black/70 px-3 py-2.5 backdrop-blur-sm">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pausar" : "Reproduzir"}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-dashed border-white/30 text-white transition-colors hover:border-white/60"
            >
              {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            </button>
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Ativar som" : "Silenciar"}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-dashed border-white/30 text-white transition-colors hover:border-white/60"
            >
              {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
            </button>

            <div
              ref={volumeRef}
              onPointerDown={handleVolumePointerDown}
              className="relative h-4 w-14 shrink-0 cursor-pointer touch-none"
            >
              <span className="absolute top-1/2 h-px w-full -translate-y-1/2 bg-white/30" />
              <span
                className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-cyan-100 shadow-[0_0_6px_rgba(165,243,252,0.8)]"
                style={{ left: `calc(${(isMuted ? 0 : volume) * 100}% - 5px)` }}
              />
            </div>

            <div
              ref={timelineRef}
              onPointerDown={handleTimelinePointerDown}
              className="flex h-4 flex-1 cursor-pointer touch-none items-center gap-[3px]"
            >
              {Array.from({ length: TICK_COUNT }).map((_, i) => (
                <span
                  key={i}
                  className={`h-2.5 w-[2.5px] shrink-0 rounded-full transition-colors ${
                    i < filledTicks
                      ? "bg-cyan-200 shadow-[0_0_4px_rgba(165,243,252,0.7)]"
                      : "bg-white/15"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoCard3D;
