'use client';

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";

interface Message {
  id: number;
  from: "bot" | "user";
  text: string;
}

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

const GuilhermeChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const nextId = useRef(1);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping, isOpen]);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    const userMessage: Message = { id: nextId.current++, from: "user", text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    const delay = 500 + Math.random() * 700;
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
              src="https://res.cloudinary.com/kcqitv3l/video/upload/v1785178703/video_guilherme_jhd3c3.mp4"
              autoPlay
              loop
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
            className="relative w-[300px] rounded-[2.5rem] bg-[#111] p-2.5 shadow-2xl"
          >
            <div className="absolute left-1/2 top-2.5 z-20 h-4 w-24 -translate-x-1/2 rounded-full bg-[#111]" />

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Fechar conversa"
              className="absolute -right-2.5 -top-2.5 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#002d4d] shadow-lg"
            >
              <X size={15} />
            </button>

            <div className="flex h-[540px] flex-col overflow-hidden rounded-[2rem] bg-white dark:bg-background">
              <div className="flex items-center gap-2.5 bg-[#002d4d] px-4 pb-3 pt-6">
                <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-white/30">
                  <video
                    src="https://res.cloudinary.com/kcqitv3l/video/upload/v1785178703/video_guilherme_jhd3c3.mp4"
                    autoPlay
                    loop
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
                  className="flex-1 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-[#002d4d] outline-none focus:border-[#ff5500] dark:border-white/10 dark:bg-white/5 dark:text-white"
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
