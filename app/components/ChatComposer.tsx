"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Headphones, ImagePlus, Mic, Paperclip, Send, X } from "lucide-react";
import RecordingBar from "./RecordingBar";
import VoiceMessageBubble from "./VoiceMessageBubble";

export type ChatAttachment = { kind: "image" | "audio"; file: File };

export default function ChatComposer({ busy, onSend, placeholder, locale }: {
  busy: boolean;
  onSend: (text: string, attachment?: ChatAttachment) => void;
  placeholder: string;
  locale: string;
}) {
  const [text, setText] = useState("");
  const [attachment, setAttachment] = useState<ChatAttachment & { preview: string }>();
  const preview = attachment?.preview ?? "";
  const previewUrl = useRef("");
  const [error, setError] = useState("");
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [discarding, setDiscarding] = useState(false);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [starting, setStarting] = useState(false);
  const imageInput = useRef<HTMLInputElement>(null);
  const audioInput = useRef<HTMLInputElement>(null);
  const [attachmentMenu, setAttachmentMenu] = useState(false);
  const reducedMotion = useReducedMotion();
  const changeMenu = (open: boolean) => setAttachmentMenu(open);
  const menuContainer = useRef<HTMLDivElement>(null);
  const menuTrigger = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const recorder = useRef<MediaRecorder | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const cancelled = useRef(false);
  const alive = useRef(true);
  const mediaEnabled = process.env.NEXT_PUBLIC_CHAT_PROVIDER === "puter";
  const en = locale === "en";
  const es = locale === "es";
  const label = (pt: string, english: string, spanish: string) => en ? english : es ? spanish : pt;

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      cancelled.current = true;
      if (recorder.current && recorder.current.state !== "inactive") recorder.current.stop();
      stream.current?.getTracks().forEach(track => track.stop());
      if (previewUrl.current) URL.revokeObjectURL(previewUrl.current);
    };
  }, []);
  useEffect(() => {
    if (!recording || paused || discarding) return;
    const timer = setInterval(() => setSeconds(value => value + 1), 1000);
    return () => clearInterval(timer);
  }, [recording, paused, discarding]);
  useEffect(() => {
    if (recording && seconds >= 60 && recorder.current?.state !== "inactive") recorder.current?.stop();
  }, [recording, seconds]);
  useEffect(() => {
    if (!attachmentMenu) return;
    menuContainer.current?.querySelector<HTMLButtonElement>("[role='menuitem']")?.focus();
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !menuContainer.current?.contains(event.target)) setAttachmentMenu(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setAttachmentMenu(false); menuTrigger.current?.focus(); }
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", dismiss); document.removeEventListener("keydown", escape); };
  }, [attachmentMenu]);

  const selectFile = (file?: File) => {
    if (!file) return;
    const kind = file.type.startsWith("image/") ? "image" : file.type.startsWith("audio/") ? "audio" : undefined;
    if (!kind || (kind === "image" && !["image/jpeg", "image/png", "image/webp"].includes(file.type))) {
      setError(label("Envie uma imagem JPG, PNG, WebP ou um áudio.", "Choose a JPG, PNG, WebP image or an audio file.", "Envía una imagen JPG, PNG, WebP o un audio.")); return;
    }
    if (file.size > (kind === "image" ? 5 : 10) * 1024 * 1024) {
      setError(label("Limite: 5 MB para imagem e 10 MB para áudio.", "Limit: 5 MB per image and 10 MB per audio.", "Límite: 5 MB por imagen y 10 MB por audio.")); return;
    }
    if (previewUrl.current) URL.revokeObjectURL(previewUrl.current);
    previewUrl.current = URL.createObjectURL(file);
    setAttachment({ kind, file, preview: previewUrl.current });
    setError("");
  };

  const removeAttachment = () => {
    if (previewUrl.current) URL.revokeObjectURL(previewUrl.current);
    previewUrl.current = "";
    setAttachment(undefined);
  };

  const startRecording = async () => {
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setError(label("Seu navegador não permite gravar. Anexe um arquivo de áudio pelo clipe.", "Recording is unavailable. Attach an audio file using the paperclip.", "No se puede grabar. Adjunta un archivo de audio con el clip.")); return;
    }
    setStarting(true); setError(""); cancelled.current = false;
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!alive.current) { audioStream.getTracks().forEach(track => track.stop()); return; }
      stream.current = audioStream;
      setAudioStream(audioStream);
      const mimeType = ["audio/webm;codecs=opus", "audio/mp4", "audio/webm"].find(type => MediaRecorder.isTypeSupported(type));
      const active = new MediaRecorder(audioStream, mimeType ? { mimeType } : undefined);
      recorder.current = active;
      const chunks: Blob[] = [];
      active.ondataavailable = event => { if (event.data.size) chunks.push(event.data); };
      active.onstop = () => {
        audioStream.getTracks().forEach(track => track.stop());
        if (!alive.current) return;
        setRecording(false);
        setPaused(false);
        setAudioStream(null);
        if (!cancelled.current && chunks.length) {
          const type = active.mimeType || "audio/webm";
          selectFile(new File(chunks, `audio-${Date.now()}.${type.includes("mp4") ? "m4a" : "webm"}`, { type }));
        }
      };
      active.onerror = () => {
        cancelled.current = true;
        audioStream.getTracks().forEach(track => track.stop());
        setRecording(false);
        setError(label("Não foi possível gravar o áudio.", "Could not record audio.", "No se pudo grabar el audio."));
      };
      active.start(); setSeconds(0); setPaused(false); setRecording(true);
    } catch {
      stream.current?.getTracks().forEach(track => track.stop());
      setError(label("Permita o acesso ao microfone para gravar áudio.", "Allow microphone access to record audio.", "Permite el acceso al micrófono para grabar audio."));
    } finally { if (alive.current) setStarting(false); }
  };

  return <div className="relative shrink-0 border-t border-black/5 bg-[#f0f2f5] p-2 dark:border-white/10 dark:bg-[#17252d]">
    {error && <p role="alert" className="mb-2 text-xs text-red-600 dark:text-red-300">{error}</p>}
    {attachment && !recording && <div className="relative mb-2 rounded-xl bg-white p-2 dark:bg-white/10">
      <button type="button" onClick={removeAttachment} aria-label={label("Remover anexo", "Remove attachment", "Quitar adjunto")} className="absolute right-1 top-1 z-10 rounded-full bg-black/60 p-1 text-white"><X size={14} /></button>
      {attachment.kind === "image" && preview ? <Image src={preview} alt={label("Prévia da imagem", "Image preview", "Vista previa")} unoptimized width={240} height={140} className="max-h-28 w-full rounded-lg object-contain" /> : preview ? <VoiceMessageBubble audioSrc={preview} locale={locale} /> : null}
      <p className="mt-1 truncate text-[10px] text-slate-500 dark:text-slate-300">{attachment.file.name}</p>
    </div>}
    {recording || discarding ? <RecordingBar stream={audioStream} seconds={seconds} paused={paused} discarding={discarding} locale={locale}
      onDiscard={() => {
        cancelled.current = true;
        if (!reducedMotion) setDiscarding(true);
        if (recorder.current && recorder.current.state !== "inactive") recorder.current.stop();
        stream.current?.getTracks().forEach(track => track.stop());
      }}
      onDiscardComplete={() => { setDiscarding(false); setSeconds(0); }}
      onTogglePause={() => {
        const active = recorder.current;
        if (active?.state === "recording") { active.pause(); setPaused(true); }
        else if (active?.state === "paused") { active.resume(); setPaused(false); }
      }}
      onFinish={() => { if (recorder.current && recorder.current.state !== "inactive") recorder.current.stop(); }}
    /> : <form onSubmit={event => {
      event.preventDefault();
      if (busy || starting || (!text.trim() && !attachment)) return;
      onSend(text.trim(), attachment);
      setText(""); removeAttachment(); setError("");
    }} className="flex items-center gap-1.5">
      <input ref={imageInput} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={event => { selectFile(event.target.files?.[0]); event.target.value = ""; }} />
      <input ref={audioInput} type="file" accept="audio/*" className="hidden" onChange={event => { selectFile(event.target.files?.[0]); event.target.value = ""; }} />
      <div ref={menuContainer} className="shrink-0">
        <button ref={menuTrigger} type="button" disabled={busy || starting || !mediaEnabled} onClick={() => changeMenu(!attachmentMenu)} aria-label={label("Anexar imagem ou áudio", "Attach image or audio", "Adjuntar imagen o audio")} aria-haspopup="menu" aria-expanded={attachmentMenu} aria-controls={attachmentMenu ? menuId : undefined} className={`flex h-9 w-7 shrink-0 items-center justify-center rounded-full text-[#002d4d] transition-colors disabled:opacity-40 dark:text-white ${attachmentMenu ? "bg-black/10 dark:bg-white/10" : "hover:bg-black/5 dark:hover:bg-white/5"}`}><Paperclip size={20} /></button>
        <AnimatePresence>
        {attachmentMenu && !busy && <motion.div initial={{ opacity: 0, y: 10, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.97 }} transition={{ duration: reducedMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }} id={menuId} role="menu" aria-label={label("Anexos", "Attachments", "Adjuntos")} className="absolute bottom-[calc(100%+8px)] left-2 z-30 flex max-w-[calc(100%-16px)] gap-1 rounded-2xl border border-black/5 bg-white p-2 shadow-xl dark:border-white/10 dark:bg-[#202c33]" onKeyDown={event => {
          if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
          event.preventDefault();
          const items = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>("[role='menuitem']"));
          const current = items.indexOf(document.activeElement as HTMLButtonElement);
          items[(current + (event.key === "ArrowRight" ? 1 : -1) + items.length) % items.length]?.focus();
        }}>
          <button type="button" role="menuitem" onClick={() => { changeMenu(false); imageInput.current?.click(); menuTrigger.current?.focus(); }} className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-[#002d4d] hover:bg-black/5 focus-visible:bg-black/5 dark:text-white dark:hover:bg-white/10 dark:focus-visible:bg-white/10"><ImagePlus size={19} className="text-blue-500" />{label("Imagem", "Image", "Imagen")}</button>
          <button type="button" role="menuitem" onClick={() => { changeMenu(false); audioInput.current?.click(); menuTrigger.current?.focus(); }} className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-[#002d4d] hover:bg-black/5 focus-visible:bg-black/5 dark:text-white dark:hover:bg-white/10 dark:focus-visible:bg-white/10"><Headphones size={19} className="text-[#ff5500]" />{label("Áudio", "Audio", "Audio")}</button>
        </motion.div>}
        </AnimatePresence>
      </div>
      <textarea rows={1} maxLength={1000} value={text} onChange={event => setText(event.target.value)} onKeyDown={event => {
        if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); }
      }} placeholder={placeholder} aria-label={placeholder} disabled={busy || starting} className="h-9 max-h-24 min-h-9 min-w-0 flex-1 resize-none rounded-2xl bg-white px-3 py-2 text-left text-xs leading-5 text-[#002d4d] outline-none focus:ring-1 focus:ring-[#ff5500] dark:bg-[#243740] dark:text-white" />
      {text.trim() || attachment ? <button type="submit" disabled={busy || starting} aria-label={label("Enviar mensagem", "Send message", "Enviar mensaje")} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ff5500] text-white disabled:opacity-40"><Send size={16} /></button>
        : <button type="button" disabled={busy || starting || !mediaEnabled} onClick={startRecording} aria-label={label("Gravar áudio", "Record audio", "Grabar audio")} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ff5500] text-white disabled:opacity-40"><Mic size={18} /></button>}
    </form>}
  </div>;
}
