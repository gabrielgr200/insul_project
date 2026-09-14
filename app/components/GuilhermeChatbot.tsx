'use client';

import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MessageCircle,
  Move,
  Send,
  Smartphone,
  Tablet,
  X,
} from "lucide-react";
import { useTranslation } from "./LanguageProvider";
import type { Dictionary } from "../i18n";

type NewsletterStatus = "idle" | "submitting" | "success" | "error";

const INTRO_END = 4;
const MESSAGE_SEGMENT_START = 10;

type PhoneShape = "celular" | "tablet";

const CM_TO_PX = 96 / 2.54;
const TABLET_SCALE = 0.9;
const SHAPE_SIZES: Record<PhoneShape, { width: number; height: number }> = {
  celular: { width: 300, height: 540 },
  tablet: {
    width: Math.round(28.5 * CM_TO_PX * TABLET_SCALE),
    height: Math.round(18.5 * CM_TO_PX * TABLET_SCALE),
  },
};

const SHAPE_ICONS: Record<PhoneShape, typeof Smartphone> = {
  celular: Smartphone,
  tablet: Tablet,
};

const SHAPE_LABELS: Record<PhoneShape, string> = {
  celular: "Celular",
  tablet: "Tablet",
};

const MODAL_VIDEO_SRC = "/videos/teste-modal.mov";

const MODAL_PARTS = [
  {
    start: 0,
    end: 5,
    text: "Texto de exemplo explicando o primeiro momento do vídeo (0 a 5 segundos). Substitua por sua descrição.",
  },
  {
    start: 5,
    end: 30,
    text: "Texto de exemplo explicando o segundo momento do vídeo (5 a 30 segundos). Substitua por sua descrição.",
  },
  {
    start: 30,
    end: 34,
    text: "Texto de exemplo explicando o momento final do vídeo (30 a 34 segundos). Substitua por sua descrição.",
  },
] as const;

interface Message {
  id: number;
  from: "bot" | "user";
  text: string;
}

const useIntroFreeze = (
  videoRef: RefObject<HTMLVideoElement | null>,
  mounted: boolean,
) => {
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !mounted) return;

    const handleTimeUpdate = () => {
      if (video.currentTime >= INTRO_END) {
        video.pause();
        video.currentTime = INTRO_END;
        video.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.currentTime = 0;
    video.play().catch(() => { });

    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [videoRef, mounted]);
};

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const WHATSAPP_DIGITS = "51995098453";
const WHATSAPP_LINK = "https://wa.me/5551995098453";
const URL_REGEX = /https?:\/\/[^\s)]+/g;
const PHONE_REGEX = new RegExp(WHATSAPP_DIGITS.split("").join("[\\s().-]*"), "g");

interface TextSegment {
  key: string;
  content: string;
  href?: string;
}

const linkifyMessage = (text: string): TextSegment[] => {
  type RawMatch = { start: number; end: number; href: string };
  const rawMatches: RawMatch[] = [];

  for (const m of text.matchAll(URL_REGEX)) {
    let value = m[0];
    let end = m.index + value.length;

    while (value.length > 0 && /[).,;:!?]$/.test(value)) {
      value = value.slice(0, -1);
      end -= 1;
    }
    rawMatches.push({ start: m.index, end, href: value });
  }

  for (const m of text.matchAll(PHONE_REGEX)) {

    const start = m.index > 0 && text[m.index - 1] === "(" ? m.index - 1 : m.index;
    rawMatches.push({ start, end: m.index + m[0].length, href: WHATSAPP_LINK });
  }

  rawMatches.sort((a, b) => a.start - b.start);

  const matches: RawMatch[] = [];
  let lastEnd = 0;
  for (const m of rawMatches) {
    if (m.start < lastEnd) continue;
    matches.push(m);
    lastEnd = m.end;
  }

  if (matches.length === 0) return [{ key: "t-0", content: text }];

  const segments: TextSegment[] = [];
  let cursor = 0;
  matches.forEach((m, i) => {
    if (m.start > cursor) {
      segments.push({ key: `t-${i}`, content: text.slice(cursor, m.start) });
    }
    segments.push({ key: `l-${i}`, content: text.slice(m.start, m.end), href: m.href });
    cursor = m.end;
  });
  if (cursor < text.length) {
    segments.push({ key: "t-end", content: text.slice(cursor) });
  }
  return segments;
};

const matchesKeyword = (input: string, keyword: string) => {
  const pattern = new RegExp(
    `(?<![\\p{L}\\p{N}])${escapeRegExp(keyword)}(?![\\p{L}\\p{N}])`,
    "iu",
  );
  return pattern.test(input);
};

const SOCIAL_RULE_COUNT = 2;
const SOCIAL_RULE_MAX_LENGTH = 30;

const findReply = (input: string, chatbot: Dictionary["chatbot"]) => {
  const trimmedLength = input.trim().length;
  const socialRulesStart = chatbot.rules.length - SOCIAL_RULE_COUNT;

  const match = chatbot.rules.find((rule, index) => {
    if (index >= socialRulesStart && trimmedLength > SOCIAL_RULE_MAX_LENGTH) {
      return false;
    }
    return rule.keywords.some((keyword) => matchesKeyword(input, keyword));
  });
  if (match) return match.reply;
  return chatbot.fallback[
    Math.floor(Math.random() * chatbot.fallback.length)
  ];
};

const MIN_TYPING_DELAY = 450;

const fetchGeminiReply = async (
  message: string,
  history: { role: "bot" | "user"; text: string }[],
  locale: string,
): Promise<string> => {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history, locale }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.reply) throw new Error(data.error || "chat_failed");
  return data.reply as string;
};

const GuilhermeChatbot = () => {
  const { t, dict, locale } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPart, setModalPart] = useState(0);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);
  const [phoneShape, setPhoneShape] = useState<PhoneShape>("celular");
  const [messages, setMessages] = useState<Message[]>(() => [
    { id: 0, from: "bot", text: dict.chatbot.inicial },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const nextId = useRef(1);
  const avatarVideoRef = useRef<HTMLVideoElement | null>(null);
  const headerVideoRef = useRef<HTMLVideoElement | null>(null);
  const hasSentMessageRef = useRef(false);
  const phoneDragControls = useDragControls();

  const pillsRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef({ startX: 0, scrollLeft: 0, dragging: false });

  const handlePillsPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = pillsRef.current;
    if (!el) return;
    dragRef.current = { startX: e.clientX, scrollLeft: el.scrollLeft, dragging: true };
  };

  const handlePillsPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.dragging) return;
    const el = pillsRef.current;
    if (!el) return;
    el.scrollLeft = dragRef.current.scrollLeft - (e.clientX - dragRef.current.startX);
  };

  const stopPillsDrag = () => {
    dragRef.current.dragging = false;
  };

  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const [newsletterName, setNewsletterName] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterPhone, setNewsletterPhone] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<NewsletterStatus>("idle");
  const [newsletterError, setNewsletterError] = useState("");

  useEffect(() => {
    if (newsletterStatus !== "success") return;
    const timeout = setTimeout(() => {
      setNewsletterOpen(false);
      setNewsletterStatus("idle");
    }, 2500);
    return () => clearTimeout(timeout);
  }, [newsletterStatus]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isModalOpen) setModalPart(0);
  }, [isModalOpen]);

  useEffect(() => {
    if (!isModalOpen) return;
    const video = modalVideoRef.current;
    if (!video) return;
    const { start, end } = MODAL_PARTS[modalPart];

    const handleTimeUpdate = () => {
      if (video.currentTime >= end) {
        video.pause();
        video.currentTime = end;
        video.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.currentTime = start;
    video.play().catch(() => { });

    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [isModalOpen, modalPart]);

  const handleModalNext = () => {
    if (modalPart < MODAL_PARTS.length - 1) {
      setModalPart((p) => p + 1);
    } else {
      closeModalAndOpenChat();
    }
  };

  useIntroFreeze(avatarVideoRef, !isOpen);
  useIntroFreeze(headerVideoRef, isOpen);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    if (!hasSentMessageRef.current) {
      setMessages([{ id: 0, from: "bot", text: dict.chatbot.inicial }]);
    }
  }, [locale, dict.chatbot.inicial]);

  const sendMessage = async (presetText?: string) => {
    const trimmed = (presetText ?? input).trim();
    if (!trimmed || isTyping) return;

    if (!hasSentMessageRef.current) {
      hasSentMessageRef.current = true;
      const video = headerVideoRef.current;
      if (video) {
        video.currentTime = MESSAGE_SEGMENT_START;
        video.play().catch(() => { });
      }
    }

    const history = messages.map((m) => ({ role: m.from, text: m.text }));
    const userMessage: Message = { id: nextId.current++, from: "user", text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    if (presetText === undefined) setInput("");
    setIsTyping(true);

    const minDelay = new Promise((resolve) => setTimeout(resolve, MIN_TYPING_DELAY));
    const [reply] = await Promise.all([
      fetchGeminiReply(trimmed, history, locale).catch(() =>
        findReply(trimmed, dict.chatbot),
      ),
      minDelay,
    ]);

    setMessages((prev) => [
      ...prev,
      { id: nextId.current++, from: "bot", text: reply },
    ]);
    setIsTyping(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const closeChat = () => {
    setIsOpen(false);
    setNewsletterOpen(false);
    setNewsletterStatus("idle");
    setNewsletterError("");
  };

  const closeModalAndOpenChat = () => {
    setIsModalOpen(false);
    setIsOpen(true);
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterStatus === "submitting") return;

    setNewsletterStatus("submitting");
    setNewsletterError("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newsletterName,
          email: newsletterEmail,
          phone: newsletterPhone,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setNewsletterError(data.error || t("chatbot.newsletter.erroGenerico"));
        setNewsletterStatus("error");
        return;
      }

      setNewsletterStatus("success");
      setNewsletterName("");
      setNewsletterEmail("");
      setNewsletterPhone("");
    } catch {
      setNewsletterError(t("chatbot.newsletter.erroConexao"));
      setNewsletterStatus("error");
    }
  };

  const view: "avatar" | "modal" | "chat" = isModalOpen
    ? "modal"
    : isOpen
      ? "chat"
      : "avatar";

  return (
    <div className="GUILHERME-CHAT mt-48 flex flex-col items-center lg:items-start">
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                key="modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 p-4 backdrop-blur-sm"
              >
                <motion.div
                  key="modal-rectangle"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="relative w-[26rem] max-w-[92vw] rounded-2xl bg-white shadow-2xl dark:bg-background"
                >
                  <button
                    type="button"
                    onClick={closeModalAndOpenChat}
                    aria-label={t("chatbot.fecharAria")}
                    className="absolute -right-2.5 -top-2.5 z-30 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-[#002d4d] shadow-lg dark:bg-background dark:text-white"
                  >
                    <X size={15} />
                  </button>

                  <div className="overflow-hidden rounded-2xl">
                    <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3 dark:border-white/10">
                      <span className="text-xs font-semibold text-zinc-400 dark:text-white/50">
                        Parte {modalPart + 1}/{MODAL_PARTS.length}
                      </span>
                      <button
                        type="button"
                        onClick={handleModalNext}
                        aria-label="Próxima parte"
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#ff5500] text-white transition-opacity hover:opacity-90"
                      >
                        <ArrowRight size={16} />
                      </button>
                    </div>

                    <video
                      ref={modalVideoRef}
                      src={MODAL_VIDEO_SRC}
                      muted
                      playsInline
                      className="h-72 w-full object-cover"
                    />

                    <div className="px-4 py-3">
                      <p className="text-xs leading-relaxed text-zinc-600 dark:text-white/70">
                        {MODAL_PARTS[modalPart].text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}

      <AnimatePresence mode="wait" initial={false}>
        {view === "avatar" && (
          <motion.button
            key="avatar"
            type="button"
            onClick={() => setIsModalOpen(true)}
            aria-label={t("chatbot.abrirAria")}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex cursor-pointer items-center gap-3 lg:relative lg:block"
          >
            <span className="relative block shrink-0">
              <video
                ref={avatarVideoRef}
                src="https://d2c3kthzw0ta10.cloudfront.net/guilherme-chatbot.mp4"
                muted
                playsInline
                className="h-20 w-20 rounded-full object-cover object-top shadow-xl ring-2 ring-white dark:ring-background sm:h-24 sm:w-24 lg:h-64 lg:w-48 lg:rounded-3xl lg:object-center lg:ring-0"
              />
              <span className="absolute -right-0.5 -top-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#ff5500] text-white shadow-lg ring-4 ring-white dark:ring-background lg:-right-2 lg:-top-2 lg:h-8 lg:w-8">
                <MessageCircle size={15} />
              </span>
            </span>
            <span className="whitespace-nowrap rounded-full bg-[#002d4d] px-3 py-1 text-xs font-medium text-white shadow dark:bg-white dark:text-[#002d4d] lg:absolute lg:-bottom-3 lg:left-1/2 lg:-translate-x-1/2">
              {t("chatbot.tooltip")}
            </span>
          </motion.button>
        )}

        {view === "chat" && (
          <motion.div
            key="phone"
            drag
            dragControls={phoneDragControls}
            dragListener={false}
            dragMomentum={false}
            dragElastic={0}
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="relative z-20 max-w-[95vw] rounded-[2.5rem] bg-[#111] p-2.5 shadow-2xl"
            style={{
              width: SHAPE_SIZES[phoneShape].width,
              aspectRatio: `${SHAPE_SIZES[phoneShape].width} / ${SHAPE_SIZES[phoneShape].height}`,
            }}
          >
            {phoneShape === "celular" && (
              <div className="absolute left-1/2 top-2.5 z-20 h-4 w-24 -translate-x-1/2 rounded-full bg-[#111]" />
            )}

            <button
              type="button"
              onClick={closeChat}
              aria-label={t("chatbot.fecharAria")}
              className="absolute -right-2.5 -top-2.5 z-30 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-[#002d4d] shadow-lg"
            >
              <X size={15} />
            </button>

            <div className="flex h-full flex-col overflow-hidden rounded-[2rem] bg-white dark:bg-background">
              <div
                onPointerDown={(e) => phoneDragControls.start(e)}
                className="flex touch-none items-center gap-2.5 bg-[#002d4d] px-4 pb-3 pt-6 cursor-grab active:cursor-grabbing"
              >
                <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-white/30">
                  <video
                    ref={headerVideoRef}
                    src="/videos/guilherme-chatbot.mp4"
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold leading-tight text-white">Guilherme</p>
                  <p className="flex items-center gap-1 text-[11px] leading-tight text-white/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    {t("chatbot.consultor")}
                  </p>
                </div>
                <div
                  onPointerDown={(e) => e.stopPropagation()}
                  className="ml-auto flex shrink-0 items-center gap-0.5 rounded-full bg-white/10 p-0.5"
                >
                  {(["celular", "tablet"] as const).map((shape) => {
                    const ShapeIcon = SHAPE_ICONS[shape];
                    const active = phoneShape === shape;
                    return (
                      <button
                        key={shape}
                        type="button"
                        onClick={() => setPhoneShape(shape)}
                        aria-label={`Formato do chat: ${SHAPE_LABELS[shape]}`}
                        aria-pressed={active}
                        title={SHAPE_LABELS[shape]}
                        className={`flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-colors ${active
                          ? "bg-[#ff5500] text-white"
                          : "text-white/60 hover:text-white"
                          }`}
                      >
                        <ShapeIcon size={12} />
                      </button>
                    );
                  })}
                </div>
                <Move size={13} className="shrink-0 text-white/40" />
              </div>

              <div
                ref={scrollRef}
                className="flex flex-1 flex-col gap-3 overflow-y-auto p-4"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {newsletterOpen ? (
                    newsletterStatus === "success" ? (
                      <motion.div
                        key="success-icon"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.25 }}
                        className="flex h-full flex-col items-center justify-center gap-2"
                      >
                        <CheckCircle2 size={72} className="text-emerald-500" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="newsletter-text"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="relative flex h-full flex-col justify-center gap-2"
                      >
                        <button
                          type="button"
                          onClick={() => setNewsletterOpen(false)}
                          aria-label={t("chatbot.newsletter.fecharAria")}
                          className="absolute cursor-pointer right-0 top-0 text-[#002d4d]/50 hover:text-[#002d4d] dark:text-white/50 dark:hover:text-white"
                        >
                          <X size={15} />
                        </button>
                        <span className="text-xs font-semibold uppercase tracking-widest text-[#ff5500]">
                          {t("chatbot.newsletter.eyebrow")}
                        </span>
                        <h4 className="poppins text-xl font-bold leading-tight text-[#002d4d] dark:text-white">
                          {t("chatbot.newsletter.titulo")}
                        </h4>
                        <p className="text-xs leading-relaxed text-[#002d4d]/70 dark:text-white/70">
                          {t("chatbot.newsletter.texto")}
                        </p>
                      </motion.div>
                    )
                  ) : (
                    <motion.div
                      key="messages"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col gap-3"
                    >
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`max-w-[85%] min-w-0 break-words rounded-2xl px-3.5 py-2 text-sm leading-snug ${message.from === "bot"
                            ? "self-start bg-[#002d4d]/5 text-[#002d4d] dark:bg-white/10 dark:text-white"
                            : "self-end bg-[#ff5500] text-white"
                            }`}
                        >
                          {linkifyMessage(message.text).map((seg) =>
                            seg.href ? (
                              <a
                                key={seg.key}
                                href={seg.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`break-all font-semibold underline underline-offset-2 hover:opacity-80 ${message.from === "bot"
                                  ? "text-[#ff5500]"
                                  : "text-white"
                                  }`}
                              >
                                {seg.content}
                              </a>
                            ) : (
                              <span key={seg.key}>{seg.content}</span>
                            ),
                          )}
                        </div>
                      ))}

                      {isTyping && (
                        <div className="flex self-start gap-1 rounded-2xl bg-[#002d4d]/5 px-3.5 py-2.5 dark:bg-white/10">
                          {[0, 1, 2].map((dot) => (
                            <span
                              key={dot}
                              className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#002d4d]/60 dark:bg-white/60"
                              style={{ animationDelay: `${dot * 0.15}s` }}
                            />
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className={`px-3 ${newsletterOpen ? "pb-2.5" : "py-2.5"}`}>
                <AnimatePresence mode="wait" initial={false}>
                  {newsletterStatus === "success" ? (
                    <motion.p
                      key="newsletter-success"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="rounded-xl bg-emerald-50 px-3 py-2 text-xs text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300"
                    >
                      {t("chatbot.newsletter.sucesso")}
                    </motion.p>
                  ) : !newsletterOpen ? (
                    <motion.div
                      key="newsletter-pills"
                      ref={pillsRef}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      onPointerDown={handlePillsPointerDown}
                      onPointerMove={handlePillsPointerMove}
                      onPointerUp={stopPillsDrag}
                      onPointerLeave={stopPillsDrag}
                      className="flex cursor-grab gap-2 overflow-x-auto active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                      <button
                        type="button"
                        onClick={() => setNewsletterOpen(true)}
                        className="flex shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full bg-[#002d4d]/5 px-3 py-1.5 text-left text-[10px] font-medium text-[#002d4d] transition-colors hover:bg-[#002d4d]/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
                      >
                        <Mail size={12} className="shrink-0 text-[#ff5500]" />
                        {t("chatbot.newsletter.cta")}
                      </button>
                      {dict.chatbot.pills.map((topic) => (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => sendMessage(topic)}
                          disabled={isTyping}
                          className="shrink-0 cursor-pointer whitespace-nowrap rounded-full bg-[#002d4d]/5 px-3 py-1.5 text-[10px] font-medium text-[#002d4d] transition-colors hover:bg-[#002d4d]/10 disabled:cursor-default disabled:opacity-50 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
                        >
                          {topic}
                        </button>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.form
                      key="newsletter-form"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      onSubmit={handleNewsletterSubmit}
                      className="flex flex-col gap-2"
                    >
                      <input
                        type="text"
                        required
                        value={newsletterName}
                        onChange={(e) => setNewsletterName(e.target.value)}
                        placeholder={t("chatbot.newsletter.nome")}
                        className="min-w-0 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs text-[#002d4d] outline-none focus:border-[#ff5500] dark:border-white/10 dark:bg-white/5 dark:text-white"
                      />
                      <input
                        type="email"
                        required
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder={t("chatbot.newsletter.email")}
                        className="min-w-0 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs text-[#002d4d] outline-none focus:border-[#ff5500] dark:border-white/10 dark:bg-white/5 dark:text-white"
                      />
                      <input
                        type="tel"
                        required
                        value={newsletterPhone}
                        onChange={(e) => setNewsletterPhone(e.target.value)}
                        placeholder={t("chatbot.newsletter.celular")}
                        className="min-w-0 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs text-[#002d4d] outline-none focus:border-[#ff5500] dark:border-white/10 dark:bg-white/5 dark:text-white"
                      />
                      {newsletterStatus === "error" && (
                        <p className="rounded-lg bg-red-50 px-2.5 py-1.5 text-[11px] text-red-700 dark:bg-red-500/10 dark:text-red-300">
                          {newsletterError}
                        </p>
                      )}
                      <button
                        type="submit"
                        disabled={newsletterStatus === "submitting"}
                        className="flex cursor-pointer items-center justify-center gap-1.5 rounded-full bg-[#ff5500] px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:bg-[#e64d00] disabled:cursor-default disabled:opacity-60"
                      >
                        {newsletterStatus === "submitting" ? (
                          t("chatbot.newsletter.enviando")
                        ) : (
                          <>
                            <Send size={13} />
                            {t("chatbot.newsletter.enviar")}
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 border-t border-zinc-200 p-3 dark:border-white/10"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t("chatbot.placeholder")}
                  autoFocus
                  className="min-w-0 flex-1 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-[#002d4d] outline-none focus:border-[#ff5500] dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  aria-label={t("chatbot.enviarAria")}
                  className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#ff5500] text-white transition-opacity disabled:cursor-default disabled:opacity-40"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GuilhermeChatbot;
