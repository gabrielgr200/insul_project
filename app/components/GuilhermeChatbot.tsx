'use client';

import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Mail, MessageCircle, Send, X } from "lucide-react";

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

const INITIAL_MESSAGE: Message = {
  id: 0,
  from: "bot",
  text:
    "Oi, eu sou o Guilherme! 👋 Faço parte do time Insul e posso te ajudar a tirar dúvidas sobre nossas cercas, entregas e distribuição. Pergunta aí!",
};

const RULES: { keywords: string[]; reply: string }[] = [
  {
    keywords: ["frete", "entrega", "prazo", "envio", "envia", "chega"],
    reply:
      "Enviamos para todo o Brasil a partir dos nossos centros de distribuição no Rio Grande do Sul (Cachoeira do Sul) e em Minas Gerais (Divinópolis). O prazo varia conforme o estado, mas a gente sempre busca a rota mais rápida até você.",
  },
  {
    keywords: ["cerca", "produto", "fenix", "fênix", "campeira", "modelo", "catalogo", "catálogo"],
    reply:
      "Temos várias linhas de cercas, como a Fênix e a Campeira, com opções para diferentes tipos de propriedade. Dá uma olhada na seção de produtos aqui na página ou me conta o que você precisa que eu te indico o modelo certo.",
  },
  {
    keywords: ["preço", "preco", "valor", "orçamento", "orcamento", "quanto custa"],
    reply:
      "Os valores variam conforme o modelo e a quantidade. Para um orçamento certinho, fala com nosso time comercial pelo WhatsApp ou pelo formulário de contato — assim conseguimos calcular direitinho pra sua região.",
  },
  {
    keywords: ["oi", "olá", "ola", "bom dia", "boa tarde", "boa noite"],
    reply: "Olá! Tudo bem? Me conta o que você gostaria de saber sobre a Insul.",
  },
  {
    keywords: ["obrigado", "obrigada", "valeu", "thanks"],
    reply: "Por nada! Qualquer outra dúvida, é só chamar. 😉",
  },
  {
    keywords: ["canil"],
    reply:
      "Pra canil, indicamos telas soldadas como a Tela Titan e a Tela Morada — resistentes e seguras pra manter cães de pequeno e médio porte. Dá uma olhada na seção de telas soldadas e hexagonais aqui no site!",
  },
  {
    keywords: ["indústria", "industria", "industrial"],
    reply:
      "Pra uso industrial, temos telas soldadas mais robustas, como a Tela Titan e a Tela Morada, ideais pra cercamento de indústrias, centros logísticos e estacionamentos — além do gradil e das cercas prontas pra áreas maiores.",
  },
  {
    keywords: ["gradil"],
    reply:
      "O Gradil é um painel de aço soldado modular (temos nos modelos G4, G5 e G12), fixado com catracas em postes — instalação rápida e ótima resistência. Ideal pra indústrias, condomínios e áreas comerciais.",
  },
];

const TOPIC_PILLS = [
  "Tela para canil",
  "Tela para indústrias",
  "Como funciona o gradil",
];

const FALLBACK_REPLIES = [
  "Boa pergunta! Posso te passar mais detalhes sobre nossas cercas, entregas ou centros de distribuição. O que você quer saber?",
  "Ainda estou aprendendo a responder tudo, mas nosso time comercial consegue te ajudar com isso direto pelo contato da Insul.",
];

const findReply = (input: string) => {
  const normalized = input.toLowerCase();
  const match = RULES.find((rule) =>
    rule.keywords.some((keyword) => normalized.includes(keyword)),
  );
  if (match) return match.reply;
  return FALLBACK_REPLIES[Math.floor(Math.random() * FALLBACK_REPLIES.length)];
};

const randomTypingDelay = () => 500 + Math.random() * 700;

const GuilhermeChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
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
      const reply = findReply(trimmed);
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
        setNewsletterError(data.error || "Não foi possível enviar. Tente novamente.");
        setNewsletterStatus("error");
        return;
      }

      setNewsletterStatus("success");
      setNewsletterName("");
      setNewsletterEmail("");
      setNewsletterPhone("");
    } catch {
      setNewsletterError("Falha de conexão. Tente novamente.");
      setNewsletterStatus("error");
    }
  };

  return (
    <div className="GUILHERME-CHAT mt-48 flex flex-col items-start">
      <AnimatePresence mode="wait" initial={false}>
        {!isOpen ? (
          <motion.button
            key="avatar"
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Conversar com o Guilherme"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="relative block"
          >
            <video
              ref={avatarVideoRef}
              src="https://res.cloudinary.com/kcqitv3l/video/upload/v1785178703/video_guilherme_jhd3c3.mp4"
              muted
              playsInline
              className="h-56 w-40 rounded-3xl object-cover shadow-xl sm:h-64 sm:w-48"
            />
            <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#ff5500] text-white shadow-lg ring-4 ring-white dark:ring-background">
              <MessageCircle size={15} />
            </span>
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#002d4d] px-3 py-1 text-xs font-medium text-white shadow dark:bg-white dark:text-[#002d4d]">
              Fale com o Guilherme
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
              aria-label="Fechar conversa"
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
                    Consultor Insul
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
                          aria-label="Fechar"
                          className="absolute cursor-pointer right-0 top-0 text-[#002d4d]/50 hover:text-[#002d4d] dark:text-white/50 dark:hover:text-white"
                        >
                          <X size={15} />
                        </button>
                        <span className="text-xs font-semibold uppercase tracking-widest text-[#ff5500]">
                          Newsletter
                        </span>
                        <h4 className="poppins text-xl font-bold leading-tight text-[#002d4d] dark:text-white">
                          Receber novidades e promoções
                        </h4>
                        <p className="text-xs leading-relaxed text-[#002d4d]/70 dark:text-white/70">
                          Cadastre abaixo para receber em primeira mão todas as
                          novidades e promoções
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
                      Cadastro enviado! Em breve você recebe nossas novidades.
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
                        Quer receber novidades e promoções?
                      </button>
                      {TOPIC_PILLS.map((topic) => (
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
                        placeholder="Nome"
                        className="min-w-0 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs text-[#002d4d] outline-none focus:border-[#ff5500] dark:border-white/10 dark:bg-white/5 dark:text-white"
                      />
                      <input
                        type="email"
                        required
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="E-mail"
                        className="min-w-0 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs text-[#002d4d] outline-none focus:border-[#ff5500] dark:border-white/10 dark:bg-white/5 dark:text-white"
                      />
                      <input
                        type="tel"
                        required
                        value={newsletterPhone}
                        onChange={(e) => setNewsletterPhone(e.target.value)}
                        placeholder="Celular com DDD"
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
                          "Enviando..."
                        ) : (
                          <>
                            <Send size={13} />
                            Receber novidades!
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
                  placeholder="Escreva sua pergunta..."
                  autoFocus
                  className="min-w-0 flex-1 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-[#002d4d] outline-none focus:border-[#ff5500] dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  aria-label="Enviar mensagem"
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
