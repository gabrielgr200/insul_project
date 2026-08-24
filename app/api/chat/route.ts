import { cercasProntas, soldadasHexagonais, gradilModels } from "../../assets/data";

const MODEL = process.env.GEMINI_MODEL || "gemini-3.6-flash";
const MAX_HISTORY = 12;
const MAX_MESSAGE_LENGTH = 1000;
const STORE_ORIGIN = "https://www.casadascercas.com.br";
const STORE_PHONE = "(51) 3723-1519";

type ChatRole = "user" | "bot";
interface ChatMessage {
  role: ChatRole;
  text: string;
}

const buildCatalogSummary = () => {
  const cercas = cercasProntas.map((c) => c.name).join(", ");
  const soldadas = soldadasHexagonais
    .filter((t) => t.category === "Soldada")
    .map((t) => t.name)
    .join(", ");
  const hexagonais = soldadasHexagonais
    .filter((t) => t.category === "Hexagonal")
    .map((t) => t.name)
    .join(", ");
  const gradis = gradilModels.map((g) => g.name).join(", ");

  return [
    `- Cercas prontas (rurais): ${cercas}`,
    `- Telas soldadas: ${soldadas}`,
    `- Telas hexagonais: ${hexagonais}`,
    `- Gradil (painel de aço soldado modular): ${gradis}`,
    "- Acessórios: catracas, postes, tubos, fixadores, tampas e arames galvanizados.",
  ].join("\n");
};

const SYSTEM_INSTRUCTION_BASE = `Você é o Guilherme, consultor virtual da Insul — fabricante de cercas rurais, telas soldadas/hexagonais e gradis metálicos, com centros de distribuição em Cachoeira do Sul (RS) e Divinópolis (MG), entregando para todo o Brasil.

Catálogo atual:
${buildCatalogSummary()}

Regras de resposta:
- Fale como um consultor de vendas simpático e direto, em frases curtas (no máximo 3-4 frases por resposta).
- Frete: entregamos para todo o Brasil a partir dos dois centros de distribuição; o prazo varia por região.
- Preço e orçamento: se a lista "Preços ao vivo" abaixo trouxer o produto perguntado, informe esse valor, deixando claro que é da loja virtual Casa das Cercas (casadascercas.com.br) e que pode variar por tamanho, cor ou quantidade. Se o produto não aparecer nessa lista, não invente valores — diga que os preços estão na loja.
- Para fechar a compra, sempre direcione para ${STORE_ORIGIN} ou para o telefone ${STORE_PHONE}.
- Gradil: painéis modulares de aço soldado fixados com catracas em postes; G4 é o mais leve (residencial), G5 é intermediário (condomínios/empresas), G12 é o mais robusto (industrial).
- Não invente especificações técnicas (bitola, malha, garantia) das quais não tenha certeza; se não souber, seja honesto e sugira falar com o time comercial.
- Nunca use markdown, listas numeradas ou muitos emojis — texto corrido, no máximo 1 emoji ocasional.
- Responda sempre no mesmo idioma em que o usuário escreveu a mensagem.`;

const geminiUrl = (key: string) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`;

// ============================================================================
// Preços ao vivo — casadascercas.com.br
// Cada página de produto expõe um bloco JSON-LD (schema.org/Product) com o
// preço atual, então buscamos direto na loja em vez de guardar valores fixos
// aqui (eles mudam com frequência).
// ============================================================================

interface PriceCatalogEntry {
  keywords: string[];
  slug: string;
  label: string;
}

const PRICE_CATALOG: PriceCatalogEntry[] = [
  { keywords: ["fenix", "fênix"], slug: "alambrado-de-aco-fenix-50m-fios-de-aco-250mm-malha-10x10cm-50m", label: "Cerca Fênix" },
  { keywords: ["campeira maxx"], slug: "cerca-de-aco-campeira-maxx-700kgf-50m-fio-250mm", label: "Cerca Campeira Maxx" },
  { keywords: ["campeira boi"], slug: "cerca-campeira-boi-fios-de-aco-250mm-malha-20x30cm-50m", label: "Cerca Campeira Boi" },
  { keywords: ["campeira"], slug: "tela-campeira-insul", label: "Cerca Campeira" },
  { keywords: ["tela titan", "titan"], slug: "tela-de-protecao-residencial-titan-fio-2.50mm", label: "Tela Titan" },
  { keywords: ["morada open"], slug: "tela-alambrado-soldada-morada-open-fio-230mm-malha-65x15cm-rolo-25m", label: "Tela Morada Open" },
  { keywords: ["morada leve"], slug: "tela-galvanizada-morada-leve-fio-1.90", label: "Tela Morada Leve" },
  { keywords: ["tela brava", "brava"], slug: "tela-soldada-revestida-com-pvc-verde-brava-fio-250mm-malha-5x10cm-rolo-25m", label: "Tela Brava" },
  { keywords: ["mangueirão 16", "mangueirao 16"], slug: "tela-hexagonal-mangueirao-fio-16", label: "Tela Mangueirão 16" },
  { keywords: ["mangueirão 18", "mangueirao 18"], slug: "tela-hexagonal-mangueirao-3-x-fio-18-124mm-rolo-50m", label: "Tela Mangueirão 18" },
  { keywords: ["galinheiro"], slug: "tela-para-galinheiro", label: "Tela Galinheiro" },
  { keywords: ["pinteiro"], slug: "tela-pinteiro", label: "Tela Pinteiro" },
  { keywords: ["viveiro"], slug: "tela-viveiro", label: "Tela Viveiro" },
  { keywords: ["gradil g4", "g4"], slug: "gradil-insul-g4", label: "Gradil G4" },
  { keywords: ["gradil g5", "g5"], slug: "gradil-insul-g5-galvanizado-452mm-malha-5x20cm", label: "Gradil G5" },
  { keywords: ["gradil g12", "g12"], slug: "gradil-insul-g12-pintado-380mm-malha-25x20cm", label: "Gradil G12" },
];

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const matchesPhrase = (input: string, phrase: string) => {
  const pattern = new RegExp(
    `(?<![\\p{L}\\p{N}])${escapeRegExp(phrase)}(?![\\p{L}\\p{N}])`,
    "iu",
  );
  return pattern.test(input);
};

const findPriceMatches = (message: string) => {
  const matches = PRICE_CATALOG.filter((entry) =>
    entry.keywords.some((k) => matchesPhrase(message, k)),
  );
  matches.sort(
    (a, b) =>
      Math.max(...b.keywords.map((k) => k.length)) -
      Math.max(...a.keywords.map((k) => k.length)),
  );
  return matches.slice(0, 2);
};

const PRICE_CACHE_TTL_MS = 10 * 60 * 1000;
const priceCache = new Map<string, { price: number; fetchedAt: number }>();

const fetchLivePrice = async (slug: string): Promise<number | null> => {
  const cached = priceCache.get(slug);
  const now = Date.now();
  if (cached && now - cached.fetchedAt < PRICE_CACHE_TTL_MS) {
    return cached.price;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(`${STORE_ORIGIN}/${slug}`, {
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; InsulChatBot/1.0)" },
    });
    clearTimeout(timeout);
    if (!res.ok) return null;

    const html = await res.text();
    const priceMatch = html.match(/"price":\s*([0-9.]+)/);
    if (!priceMatch) return null;

    const price = parseFloat(priceMatch[1]);
    priceCache.set(slug, { price, fetchedAt: now });
    return price;
  } catch (err) {
    console.error(`Falha ao buscar preço ao vivo (${slug}):`, err);
    return null;
  }
};

const formatBRL = (value: number) =>
  `R$ ${value.toFixed(2).replace(".", ",")}`;

const buildPriceContext = async (message: string): Promise<string> => {
  const matches = findPriceMatches(message);
  if (matches.length === 0) return "";

  const prices = await Promise.all(matches.map((m) => fetchLivePrice(m.slug)));
  const lines = matches
    .map((m, i) => {
      const price = prices[i];
      if (price === null) return null;
      return `- ${m.label}: ${formatBRL(price)} (${STORE_ORIGIN}/${m.slug})`;
    })
    .filter((line): line is string => Boolean(line));

  if (lines.length === 0) return "";
  return `\n\nPreços ao vivo (casadascercas.com.br) para esta pergunta:\n${lines.join("\n")}`;
};

export async function POST(request: Request) {
  let body: { message?: string; history?: ChatMessage[]; locale?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }

  const message = (body.message ?? "").trim().slice(0, MAX_MESSAGE_LENGTH);
  if (!message) {
    return Response.json({ error: "Mensagem vazia." }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY não configurada — chat com IA indisponível.");
    return Response.json({ error: "Chat com IA ainda não configurado." }, { status: 503 });
  }

  const history = Array.isArray(body.history) ? body.history.slice(-MAX_HISTORY) : [];
  const contents = [
    ...history
      .filter((m) => m && typeof m.text === "string" && m.text.trim())
      .map((m) => ({
        role: m.role === "bot" ? "model" : "user",
        parts: [{ text: m.text.slice(0, MAX_MESSAGE_LENGTH) }],
      })),
    { role: "user", parts: [{ text: message }] },
  ];

  const priceContext = await buildPriceContext(message);
  const systemInstructionText = SYSTEM_INSTRUCTION_BASE + priceContext;

  try {
    const res = await fetch(geminiUrl(apiKey), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        systemInstruction: { parts: [{ text: systemInstructionText }] },
        generationConfig: {
          maxOutputTokens: 1024,
          temperature: 0.7,
          thinkingConfig: { thinkingLevel: "low" },
        },
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("Gemini API error:", res.status, errText);
      return Response.json({ error: "Não foi possível falar com a IA agora." }, { status: 502 });
    }

    const data = await res.json();
    const reply: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return Response.json({ error: "A IA não retornou uma resposta." }, { status: 502 });
    }

    return Response.json({ reply: reply.trim() });
  } catch (err) {
    console.error("Falha ao chamar Gemini:", err);
    return Response.json({ error: "Falha de conexão com a IA." }, { status: 502 });
  }
}
