'use client';

import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Mail, MessageCircle, Send, X } from "lucide-react";
import { useTranslation } from "./LanguageProvider";
import type { Dictionary } from "../i18n";

type NewsletterStatus = "idle" | "submitting" | "success" | "error";

const INTRO_END = 4;
const MESSAGE_SEGMENT_START = 10;

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
    video.play().catch(() => {});

    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [videoRef, mounted]);
};

const findReply = (input: string, chatbot: Dictionary["chatbot"]) => {
  const normalized = input.toLowerCase();
  const match = chatbot.rules.find((rule) =>
    rule.keywords.some((keyword) => normalized.includes(keyword)),
  );
  if (match) return match.reply;
  return chatbot.fallback[
    Math.floor(Math.random() * chatbot.fallback.length)
  ];
};

const randomTypingDelay = () => 500 + Math.random() * 700;

const GuilhermeChatbot = () => {
  const { t, dict, locale } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
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

  useIntroFreeze(avatarVideoRef, !isOpen);
  useIntroFreeze(headerVideoRef, isOpen);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping, isOpen]);

  // Atualiza a saudação inicial ao trocar de idioma, enquanto a conversa não começou.
  useEffect(() => {
    if (!hasSentMessageRef.current) {
      setMessages([{ id: 0, from: "bot", text: dict.chatbot.inicial }]);
    }
  }, [locale, dict.chatbot.inicial]);

  const sendMessage = (presetText?: string) => {
    const trimmed = (presetText ?? input).trim();
    if (!trimmed || isTyping) return;

    if (!hasSentMessageRef.current) {
      hasSentMessageRef.current = true;
      const video = headerVideoRef.current;
      if (video) {
        video.currentTime = MESSAGE_SEGMENT_START;
        video.play().catch(() => {});
      }
    }

    const userMessage: Message = { id: nextId.current++, from: "user", text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    if (presetText === undefined) setInput("");
    setIsTyping(true);

    const delay = randomTypingDelay();
    setTimeout(() => {
      const reply = findReply(trimmed, dict.chatbot);
      setMessages((prev) => [
        ...prev,
        { id: nextId.current++, from: "bot", text: reply },
      ]);
      setIsTyping(false);
    }, delay);
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

  return (
    <div className="GUILHERME-CHAT mt-48 flex flex-col items-center lg:items-start">
      <AnimatePresence mode="wait" initial={false}>
        {!isOpen ? (
          <motion.button
            key="avatar"
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label={t("chatbot.abrirAria")}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-3 lg:relative lg:block"
          >
            <span className="relative block shrink-0">
              <video
                ref={avatarVideoRef}
                src="https://res.cloudinary.com/kcqitv3l/video/upload/v1785178703/video_guilherme_jhd3c3.mp4"
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
        ) : (
          <motion.div
            key="phone"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="relative w-[300px] max-w-full rounded-[2.5rem] bg-[#111] p-2.5 shadow-2xl"
          >
            <div className="absolute left-1/2 top-2.5 z-20 h-4 w-24 -translate-x-1/2 rounded-full bg-[#111]" />

            <button
              type="button"
              onClick={closeChat}
              aria-label={t("chatbot.fecharAria")}
              className="absolute -right-2.5 -top-2.5 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#002d4d] shadow-lg"
            >
              <X size={15} />
            </button>

            <div className="flex h-[540px] flex-col overflow-hidden rounded-[2rem] bg-white dark:bg-background">
              <div className="flex items-center gap-2.5 bg-[#002d4d] px-4 pb-3 pt-6">
                <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-white/30">
                  <video
                    ref={headerVideoRef}
                    src="https://res.cloudinary.com/kcqitv3l/video/upload/v1785178703/video_guilherme_jhd3c3.mp4"
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
                          className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-snug ${
                            message.from === "bot"
                              ? "self-start bg-[#002d4d]/5 text-[#002d4d] dark:bg-white/10 dark:text-white"
                              : "self-end bg-[#ff5500] text-white"
                          }`}
                        >
                          {message.text}
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
                        className="flex items-center justify-center gap-1.5 rounded-full bg-[#ff5500] px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:bg-[#e64d00] disabled:opacity-60"
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
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ff5500] text-white transition-opacity disabled:opacity-40"
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
