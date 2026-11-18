"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Pause, Play, Send } from "lucide-react";

function MicrophoneWaveform({ stream, paused }: { stream: MediaStream | null; paused: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  useEffect(() => { pausedRef.current = paused; }, [paused]);
  useEffect(() => {
    const element = canvas.current;
    const context = element?.getContext("2d");
    if (!element || !context || !stream || typeof AudioContext === "undefined") return;
    const audio = new AudioContext();
    const analyser = audio.createAnalyser();
    analyser.fftSize = 256;
    const source = audio.createMediaStreamSource(stream);
    source.connect(analyser); // No connection to the speakers.
    void audio.resume().catch(() => {});
    const samples = new Uint8Array(analyser.fftSize);
    const bars = Array.from({ length: 30 }, () => 4);
    let frame = 0;
    let previous = 0;
    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);
      if (now - previous < 80) return;
      previous = now;
      if (!pausedRef.current) {
        analyser.getByteTimeDomainData(samples);
        const energy = Math.sqrt(samples.reduce((sum, sample) => sum + ((sample - 128) / 128) ** 2, 0) / samples.length);
        bars.shift();
        bars.push(Math.min(16, Math.max(4, energy * 85)));
      }
      const width = element.clientWidth || 128;
      const ratio = window.devicePixelRatio || 1;
      if (element.width !== Math.round(width * ratio)) element.width = Math.round(width * ratio);
      if (element.height !== Math.round(24 * ratio)) element.height = Math.round(24 * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, 24);
      context.fillStyle = "#000";
      bars.forEach((height, index) => {
        context.beginPath();
        context.roundRect(index * (width - 2) / (bars.length - 1), 12 - height / 2, 2, height, 1);
        context.fill();
      });
    };
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      source.disconnect();
      analyser.disconnect();
      void audio.close().catch(() => {});
    };
  }, [stream]);
  return <canvas ref={canvas} width={256} height={48} aria-hidden="true" className="h-6 min-w-0 flex-1" />;
}

export default function RecordingBar({ stream, seconds, paused, discarding, locale, onDiscard, onDiscardComplete, onTogglePause, onFinish }: {
  stream: MediaStream | null;
  seconds: number;
  paused: boolean;
  discarding: boolean;
  locale: string;
  onDiscard: () => void;
  onDiscardComplete: () => void;
  onTogglePause: () => void;
  onFinish: () => void;
}) {
  const reducedMotion = useReducedMotion();
  const en = locale === "en";
  const es = locale === "es";
  const duration = reducedMotion ? 0 : 1.05;
  const times = [0, 0.18, 0.36, 0.72, 1];
  return <div className="flex min-h-12 min-w-0 items-center gap-3 rounded-xl bg-white p-3 text-black shadow-sm" role="group" aria-label={en ? "Voice recording" : es ? "Grabación de audio" : "Gravação de áudio"}>
    <button type="button" disabled={discarding} onClick={onDiscard} aria-label={en ? "Discard recording" : es ? "Descartar grabación" : "Descartar gravação"} className="order-last flex h-8 w-6 shrink-0 items-center justify-center rounded-full text-zinc-500 hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-current disabled:cursor-default">
      <motion.svg className="overflow-visible" viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
        animate={{ rotate: discarding && !reducedMotion ? [0, -4, 0, 0, 0] : 0 }} transition={{ duration, times }}
        onAnimationComplete={() => { if (discarding) onDiscardComplete(); }}>
        <path d="M5 8v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8M10 11v6M14 11v6" />
        <motion.path d="M9 7V2h4l3 3v2M13 2v3h3" animate={{ y: discarding && !reducedMotion ? [-10, -10, -2, 9, 9] : -10, opacity: discarding && !reducedMotion ? [0, 0, 1, 0, 0] : 0 }} transition={{ duration, times, ease: "easeInOut" }} />
        <motion.g animate={{ y: discarding && !reducedMotion ? [0, -1, -11, -11, 0] : 0 }} transition={{ duration, times, ease: "easeInOut" }}>
          <path d="M3 5h18M9 5V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
        </motion.g>
      </motion.svg>
    </button>
    <span className="order-2 shrink-0 font-mono text-sm tabular-nums" aria-label={en ? "Recording time" : es ? "Tiempo de grabación" : "Tempo de gravação"}>{seconds}s</span>
    <MicrophoneWaveform stream={stream} paused={paused || discarding} />
    <button type="button" disabled={discarding} onClick={onTogglePause} aria-label={paused ? (en ? "Resume recording" : es ? "Continuar grabación" : "Retomar gravação") : (en ? "Pause recording" : es ? "Pausar grabación" : "Pausar gravação")} className="order-first flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white p-2 text-black hover:bg-zinc-100 disabled:opacity-40">
      {paused ? <Play size={16} /> : <Pause size={16} />}
    </button>
    {paused && !discarding && <button type="button" onClick={onFinish} aria-label={en ? "Finish recording" : es ? "Finalizar grabación" : "Concluir gravação"} className="order-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ff5500] text-white"><Send size={15} /></button>}
  </div>;
}
