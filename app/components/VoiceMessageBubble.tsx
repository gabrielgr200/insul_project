"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatVoiceTime } from "../utils/voiceMessage";
import styles from "./VoiceMessageBubble.module.css";

interface VoiceMessageBubbleProps {
  audioSrc: string;
  duration?: number;
  bubbleColor?: string;
  waveColor?: string;
  className?: string;
  locale?: string;
}

const INITIAL_BARS = Array.from({ length: 30 }, (_, index) => 4 + (index * 7 + 3) % 13);

function VoiceMessagePlayer({ audioSrc, duration = 0, bubbleColor = "#fff", waveColor = "#000", className, locale = "pt" }: VoiceMessageBubbleProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const id = useId();
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [length, setLength] = useState(Number.isFinite(duration) ? Math.max(0, duration) : 0);
  const [bars, setBars] = useState<number[]>(INITIAL_BARS);
  const [error, setError] = useState(false);
  const label = (pt: string, en: string, es: string) => locale === "en" ? en : locale === "es" ? es : pt;
  const progress = length > 0 ? Math.min(100, Math.max(0, time / length * 100)) : 0;

  useEffect(() => {
    const audio = audioRef.current;
    const controller = new AbortController();
    const decode = async () => {
      try {
        if (typeof OfflineAudioContext === "undefined") return;
        const response = await fetch(audioSrc, { signal: controller.signal });
        if (!response.ok) return;
        const buffer = await response.arrayBuffer();
        const decoder = new OfflineAudioContext(1, 1, 44100);
        const decoded = await decoder.decodeAudioData(buffer);
        if (controller.signal.aborted) return;
        // Recorded WebM files may report Infinity in HTMLAudioElement metadata.
        if (Number.isFinite(decoded.duration) && decoded.duration > 0) setLength(decoded.duration);
      } catch {
        // Playback still works if this browser cannot decode the waveform.
      }
    };
    void decode();
    const otherStarted = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== id) audio?.pause();
    };
    window.addEventListener("insul:voice-play", otherStarted);
    return () => {
      controller.abort();
      audio?.pause();
      window.removeEventListener("insul:voice-play", otherStarted);
    };
  }, [audioSrc, id]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setError(false);
    if (!audio.paused) audio.pause();
    else {
      if (audio.ended) audio.currentTime = 0;
      void audio.play().catch(() => setError(true));
    }
  };
  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio || length <= 0 || audio.readyState === 0) return;
    const next = Math.min(length, Math.max(0, value));
    try { audio.currentTime = next; setTime(next); } catch { /* Wait for playable metadata. */ }
  };

  return <div className={cn(styles.player, error && "flex-wrap", className)} style={{ backgroundColor: bubbleColor, color: waveColor } as CSSProperties}>
    <audio ref={audioRef} src={audioSrc} preload="metadata" className="hidden"
      onLoadedMetadata={event => { const value = event.currentTarget.duration; if (Number.isFinite(value) && value > 0) setLength(value); }}
      onDurationChange={event => { const value = event.currentTarget.duration; if (Number.isFinite(value) && value > 0) setLength(value); }}
      onTimeUpdate={event => {
        setTime(event.currentTarget.currentTime);
        if (!event.currentTarget.paused) setBars(Array.from({ length: 30 }, () => 4 + Math.random() * 12));
      }}
      onPlay={() => { setPlaying(true); window.dispatchEvent(new CustomEvent("insul:voice-play", { detail: id })); }}
      onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onError={() => { setPlaying(false); setError(true); }} />
      <Button variant="outline" type="button" onClick={togglePlay} aria-label={playing ? label("Pausar áudio", "Pause audio", "Pausar audio") : label("Reproduzir áudio", "Play audio", "Reproducir audio")}
        className={styles.playButton}>
        {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>
      <div role="slider" tabIndex={0} aria-label={label("Posição do áudio", "Audio position", "Posición del audio")} aria-valuemin={0} aria-valuemax={Math.ceil(length)} aria-valuenow={Math.min(Math.floor(time), Math.ceil(length))} aria-valuetext={`${formatVoiceTime(time)} / ${formatVoiceTime(length)}`}
        className={`${styles.waveform} focus-visible:outline focus-visible:outline-2 focus-visible:outline-current`}
        onClick={event => { const rect = event.currentTarget.getBoundingClientRect(); if (rect.width > 0) seek((event.clientX - rect.left) / rect.width * length); }}
        onKeyDown={event => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); seek(time + (event.key === "ArrowRight" ? 5 : -5)); }
          else if (event.key === "Home" || event.key === "End") { event.preventDefault(); seek(event.key === "Home" ? 0 : length); }
          else if (event.key === " " || event.key === "Enter") { event.preventDefault(); togglePlay(); }
        }}>
        <div className={styles.bars} aria-hidden="true">
          {bars.map((height, index) => <div key={index} className={styles.bar} style={{ height, backgroundColor: waveColor, opacity: progress === 0 || index / bars.length * 100 < progress ? 1 : 0.45 }} />)}
        </div>
      </div>
      <span className={styles.duration} style={{ color: waveColor === "#fff" ? "#fff" : "#000" }}>{Math.round(length)}s</span>
    {error && <p role="alert" className="mt-1 basis-full text-[10px] text-red-600 dark:text-red-300">{label("Não foi possível reproduzir este áudio.", "Could not play this audio.", "No se pudo reproducir este audio.")}</p>}
  </div>;
}

export default function VoiceMessageBubble(props: VoiceMessageBubbleProps) {
  return <VoiceMessagePlayer key={props.audioSrc} {...props} />;
}
