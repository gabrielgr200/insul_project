type ChatMessage = { role: "system" | "user" | "assistant"; content: string | ({ type: "text"; text: string } | { type: "file"; puter_path: string })[] };
type PuterResponse = { message?: { content?: string | { type?: string; text?: string }[] } };
interface PuterClient {
  auth: { isSignedIn: () => boolean; signIn: () => Promise<unknown> };
  ai: {
    chat: (messages: ChatMessage[], options: { model: string; max_tokens: number }) => Promise<PuterResponse>;
    speech2txt: (file: File, options: { language: string }) => Promise<string | { text?: string }>;
  };
  fs: {
    upload: (files: File[]) => Promise<{ path: string } | { path: string }[]>;
    delete: (path: string, options: { recursive: boolean }) => Promise<unknown>;
  };
}
declare global { interface Window { puter?: PuterClient } }

let pending: Promise<void> | undefined;
export function loadPuter(): Promise<void> {
  if (window.puter) return Promise.resolve();
  if (pending) return pending;
  pending = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://js.puter.com/v2/";
    script.async = true;
    const timer = setTimeout(() => fail(), 15000);
    const fail = () => {
      clearTimeout(timer);
      script.remove();
      reject(new Error("Não foi possível carregar o Puter."));
    };
    script.onload = () => {
      clearTimeout(timer);
      if (window.puter) resolve();
      else fail();
    };
    script.onerror = fail;
    document.head.appendChild(script);
  }).catch(error => { pending = undefined; throw error; });
  return pending;
}

// Call before any await in the send handler, so the popup retains the click gesture.
export function authenticatePuter(): Promise<unknown> {
  const client = window.puter;
  if (!client) {
    void loadPuter().catch(() => {});
    return Promise.reject(new Error("Puter ainda está carregando. Tente enviar novamente em instantes."));
  }
  return client.auth.isSignedIn() ? Promise.resolve() : client.auth.signIn();
}

export function puterResponseText(response: PuterResponse): string {
  const content = response.message?.content;
  const text = typeof content === "string" ? content : Array.isArray(content)
    ? content.filter(part => part.type === "text").map(part => part.text ?? "").join("") : "";
  if (!text.trim()) throw new Error("Puter não retornou texto.");
  return text.trim();
}

export async function transcribePuter(file: File, language: string): Promise<string> {
  if (!window.puter) throw new Error("Puter indisponível.");
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const result = await Promise.race([
      window.puter.ai.speech2txt(file, { language: language.split("-")[0] }),
      new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new Error("Não foi possível transcrever o áudio agora.")), 45000); }),
    ]);
    const text = typeof result === "string" ? result : result.text;
    if (!text?.trim()) throw new Error("Não consegui entender o áudio. Tente gravar novamente.");
    return text.trim();
  } finally {
    clearTimeout(timer);
  }
}

export async function askPuter(messages: ChatMessage[], model: string, image?: File): Promise<string> {
  if (!window.puter) throw new Error("Puter indisponível.");
  let timer: ReturnType<typeof setTimeout> | undefined;
  let uploadedPath: string | undefined;
  try {
    let input = messages;
    if (image) {
      const uniqueFile = new File([image], `${crypto.randomUUID()}-${image.name}`, { type: image.type });
      const uploaded = await window.puter.fs.upload([uniqueFile]);
      uploadedPath = Array.isArray(uploaded) ? uploaded[0]?.path : uploaded.path;
      if (!uploadedPath) throw new Error("Não foi possível enviar a imagem.");
      input = messages.map((message, index) => index === messages.length - 1 ? {
        ...message,
        content: [
          { type: "file" as const, puter_path: uploadedPath! },
          { type: "text" as const, text: typeof message.content === "string" ? message.content : "Analise a imagem enviada." },
        ],
      } : message);
    }
    const response = await Promise.race([
      window.puter.ai.chat(input, { model, max_tokens: 1024 }),
      new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new Error("Puter demorou a responder.")), 45000); }),
    ]);
    return puterResponseText(response);
  } finally {
    clearTimeout(timer);
    if (uploadedPath) await window.puter.fs.delete(uploadedPath, { recursive: false }).catch(() => {});
  }
}
