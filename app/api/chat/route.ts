import { cercasProntas, soldadasHexagonais, gradilModels } from "../../assets/data";

const MODEL = process.env.GEMINI_MODEL || "gemini-3.6-flash";
const MAX_HISTORY = 12;
const MAX_MESSAGE_LENGTH = 1000;
const STORE_ORIGIN = "https://www.casadascercas.com.br";
// Mesmo número de WhatsApp usado no rodapé/redes sociais do site da Insul
// (não é a linha fixa da loja) — o front-end linka essa string pro wa.me.
const STORE_PHONE = "(51) 99509-8453";

type ChatRole = "user" | "bot";
interface ChatMessage {
  role: ChatRole;
  text: string;
}

// Especificações (fio, malha, alturas) vêm de app/assets/data.ts, que é a
// única fonte de verdade sobre os produtos — a IA nunca deve inventar um
// número que não esteja listado aqui embaixo.
const formatHeights = (heights?: string[]) =>
  heights && heights.length > 0
    ? `; alturas de rolo disponíveis: ${heights.join(", ")}`
    : "; alturas de rolo: não cadastradas ainda, não informe alturas para este produto";

const buildCatalogSummary = () => {
  const cercas = cercasProntas
    .map(
      (c) =>
        `  - ${c.name}: ${c.paragraph}; comprimentos de rolo disponíveis: ${c.lengths.join(", ")}; espaçamento entre mourões ${c.postSpacing}; animais indicados: ${c.animals.join(", ")}`,
    )
    .join("\n");
  const soldadas = soldadasHexagonais
    .filter((t) => t.category === "Soldada")
    .map((t) => `  - ${t.name}: ${t.paragraph}${formatHeights(t.heights)}`)
    .join("\n");
  const hexagonais = soldadasHexagonais
    .filter((t) => t.category === "Hexagonal")
    .map((t) => `  - ${t.name}: ${t.paragraph}`)
    .join("\n");
  const torcaoSimples = soldadasHexagonais
    .filter((t) => t.category === "Torção Simples")
    .map((t) => `  - ${t.name}: ${t.paragraph}`)
    .join("\n");
  const gradis = gradilModels
    .map(
      (g) =>
        `  - ${g.name}: ${g.paragraph}; espaçamento entre postes ${g.postSpacing}`,
    )
    .join("\n");

  return [
    `Cercas prontas (rurais) — o comprimento de rolo varia por modelo, veja a lista abaixo de cada um (NÃO são todas 50m):\n${cercas}`,
    `Telas soldadas — sempre vendidas em rolo de 25m (nunca em outro comprimento):\n${soldadas}`,
    `Telas hexagonais — sempre vendidas em rolo de 50m (nunca em outro comprimento):\n${hexagonais}`,
    `Telas de torção simples (conteúdo de exemplo, especificações reais ainda não cadastradas):\n${torcaoSimples}`,
    `Gradil (painel de aço soldado modular, vendido em placas — não em rolo):\n${gradis}`,
    "Acessórios: catracas, postes, tubos, fixadores, tampas e arames galvanizados.",
  ].join("\n\n");
};

const SYSTEM_INSTRUCTION_BASE = `Você é o Guilherme, consultor virtual da Insul — fabricante de cercas rurais, telas soldadas/hexagonais e gradis metálicos, com centros de distribuição em Cachoeira do Sul (RS) e Divinópolis (MG), entregando para todo o Brasil.

Catálogo atual:
${buildCatalogSummary()}

Regras de resposta:
- Fale como um consultor de vendas simpático e direto, em frases curtas (no máximo 3-4 frases por resposta).
- Frete: entregamos para todo o Brasil a partir dos dois centros de distribuição; o prazo varia por região.
- Preço e orçamento: se a lista "Preços ao vivo" abaixo trouxer o produto perguntado, informe esse valor, deixando claro que é da loja virtual Casa das Cercas (casadascercas.com.br). Quando a lista trouxer um valor "de X por Y", sempre informe os dois: o valor cheio (de) e o valor promocional à vista/Pix (por) — nunca informe só o valor "de" como se fosse o preço final. Se o produto não aparecer nessa lista, não invente valores — diga que os preços estão na loja.
- Preço por altura: muitas telas e cercas prontas têm preço diferente por altura de rolo. Quando a linha de preço tiver "(altura X)", esse valor é EXATAMENTE da altura X que o cliente pediu — use-o. Quando a linha tiver "(altura padrão Y — cada altura tem preço diferente, alturas disponíveis: ...)", significa que o cliente não disse (ou pediu uma altura que a loja não vende) e esse valor é só da altura padrão Y, NUNCA de outra altura — nesse caso pergunte qual altura o cliente quer, ou liste as alturas disponíveis, mas não afirme que aquele valor vale para uma altura diferente de Y. Quando a linha tiver "— valor de referência", não conseguimos confirmar a altura agora (falha temporária ao consultar a loja); informe o valor mas avise que pode variar por altura e recomende confirmar em ${STORE_ORIGIN} ou pelo telefone.
- Preço por comprimento de rolo (cercas prontas): diferente da altura, o preço ao vivo que você recebe é sempre do comprimento padrão do produto (a Fênix é o de 50m; as Campeiras são o de 50m) — não temos o preço live do outro comprimento (25m na Fênix; 100m nas Campeiras). Se o cliente pedir preço de um comprimento diferente do padrão, informe o valor que você tem como referência do comprimento padrão, deixe claro que é desse comprimento e recomende confirmar o valor do outro comprimento em ${STORE_ORIGIN} ou pelo WhatsApp.
- Para fechar a compra, sempre direcione para o WhatsApp ${STORE_PHONE} e para o link do produto. Se a lista "Preços ao vivo" trouxer o link do produto perguntado (o endereço entre parênteses no fim da linha), use exatamente esse link — ele já vai direto pra página do produto. Só use o link genérico ${STORE_ORIGIN} (sem caminho) quando não houver um produto específico em conversa. Escreva a URL e o número exatamente como aparecem (por extenso, sem markdown) — o app transforma os dois em links clicáveis automaticamente, então não invente outro formato, outro link nem outro número.
- Gradil: painéis modulares de aço soldado fixados com catracas em postes; G4 é o mais leve (residencial), G5 é intermediário (condomínios/empresas), G12 é o mais robusto (industrial).
- Comprimento de rolo: telas soldadas SEMPRE vêm em rolo de 25m e telas hexagonais SEMPRE vêm em rolo de 50m — isso é fixo para toda a categoria, não varia por modelo. Já as cercas prontas (Fênix, Campeira, Campeira Maxx, Campeira Boi) NÃO têm um comprimento fixo — cada modelo vende em comprimentos diferentes (a Fênix é 25m ou 50m; as Campeiras são 50m ou 100m), use exatamente os valores de "comprimentos de rolo disponíveis" listados por modelo no catálogo acima.
- Fio, malha e alturas de rolo: use exclusivamente os valores listados no catálogo acima, produto por produto. Nunca cite um número (altura, bitola, malha) que não esteja exatamente ali, mesmo que pareça razoável ou que outro produto parecido tenha um valor parecido — cada modelo tem medidas próprias. Se o catálogo não listar alturas para o produto perguntado, diga que não tem essa informação à mão e sugira confirmar no site ou com o time comercial; não invente.
- Recomendação por animal: quando o cliente perguntar qual cerca pronta contém um animal específico, olhe a lista "animais indicados" de cada cerca pronta no catálogo acima e recomende SOMENTE modelos que listam aquele animal — nunca recomende um modelo que não lista o animal perguntado, mesmo que o nome do produto pareça combinar (ex.: "Campeira Boi" NÃO é a indicada pra javali/javaporco, pois seus animais indicados são só Bovino; quem lista Javaporco é a Fênix e a Campeira Maxx). Trate "javali" como equivalente a "Javaporco" na lista. Se nenhum modelo listar o animal perguntado, diga isso com honestidade em vez de recomendar o mais parecido.
- Cercas prontas também são um tipo de tela (tela de simples torção/alambrado galvanizado pronta pra instalar): quando o cliente perguntar por "tela" de forma genérica (pra cercar terreno, conter animal, etc.) sem especificar categoria, considere as cercas prontas (Fênix, Campeira, Campeira Maxx, Campeira Boi) como candidatas junto com as telas soldadas/hexagonais — não trate "cerca pronta" e "tela" como coisas completamente separadas.
- Nunca use markdown, listas numeradas ou muitos emojis — texto corrido, no máximo 1 emoji ocasional.
- Responda sempre no mesmo idioma em que o usuário escreveu a mensagem.`;

const geminiUrl = (key: string) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`;

interface GeminiContentPart {
  role: string;
  parts: { text: string }[];
}

type GeminiCallResult = { reply: string } | { error: string };

// Sem timeout/retry, uma falha passageira do Gemini (rede, 5xx, resposta
// truncada) derruba a conversa pro fallback local — que é um matcher de
// palavra-chave burro (ex.: "bom dia" no início de uma pergunta longa ganha
// de qualquer assunto real). Reduzir a chance de cair nesse fallback é mais
// importante do que só deixar o fallback mais esperto.
const callGemini = async (
  apiKey: string,
  contents: GeminiContentPart[],
  systemInstructionText: string,
): Promise<GeminiCallResult> => {
  const body = JSON.stringify({
    contents,
    systemInstruction: { parts: [{ text: systemInstructionText }] },
    generationConfig: {
      maxOutputTokens: 1024,
      temperature: 0.7,
      thinkingConfig: { thinkingLevel: "low" },
    },
  });

  let lastError = "Falha desconhecida.";
  const attemptTimeoutMs = 15000;

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetchWithTimeout(
        geminiUrl(apiKey),
        { "Content-Type": "application/json" },
        attemptTimeoutMs,
        { method: "POST", body },
      );

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        lastError = `HTTP ${res.status}: ${errText}`;
        // Erro de cliente (chave inválida, payload ruim) não melhora numa
        // segunda tentativa imediata. 429 (cota excedida) também não — a
        // API pede um cooldown de vários segundos, então tentar de novo na
        // hora só gasta outra requisição da cota já estourada e falha de
        // novo; só vale re-tentar em erro transiente de infraestrutura (5xx).
        if (res.status < 500) break;
        continue;
      }

      const data = await res.json();
      const reply: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (reply) return { reply };
      lastError = "A IA não retornou texto na resposta.";
    } catch (err) {
      lastError = err instanceof Error ? err.message : String(err);
      // Se o Gemini simplesmente não respondeu dentro do timeout, ele não
      // "falhou rápido" — está travado. Tentar de novo com outro timeout
      // igual só dobra a espera do usuário sem motivo (foi assim que uma
      // resposta acabou demorando 41s: 2 tentativas de 20s cada). Erro de
      // rede genuíno (ex.: DNS, conexão recusada) falha na hora, então esse
      // sim vale re-tentar.
      const isTimeout = err instanceof Error && err.name === "AbortError";
      if (isTimeout) break;
    }
  }

  return { error: lastError };
};

// ============================================================================
// Preços ao vivo — casadascercas.com.br
// Buscamos direto na API interna da loja (a mesma que o front-end Vue usa)
// em vez de guardar valores fixos aqui, porque eles mudam com frequência E
// porque muitos produtos (telas, cercas prontas) têm preço por altura — o
// HTML/JSON-LD estático só mostra o preço da altura padrão selecionada.
// ============================================================================
const PRICE_API_BASE = `${STORE_ORIGIN}/api/v2/front`;

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
  { keywords: ["tela morada", "morada"], slug: "tela-alambrado-soldada-fio-230mm-malha-5x15cm", label: "Tela Morada" },
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

interface HeightVariant {
  /** Rótulo exatamente como a loja exibe, ex.: "1,50m". */
  label: string;
  price: number;
  cashPrice: number;
}

interface LivePrice {
  /** Preço "de" da variante padrão (a que a página carrega selecionada por default). */
  price: number;
  /** Preço "por" à vista/Pix da variante padrão. */
  cashPrice: number | null;
  /** Uma linha por altura vendida, cada uma com seu próprio preço. Vazio se o produto não varia por altura (ou se `source` é "html-fallback" e não deu pra saber). */
  heightVariants: HeightVariant[];
  /**
   * "api" = veio da API interna da loja, dado confiável sobre variação por altura.
   * "html-fallback" = a API falhou (ex.: bloqueio do WAF do site) e caímos pro
   * scraping da página; `heightVariants` fica vazio mesmo que o produto varie
   * por altura, então esse preço deve ser tratado como referência, não exato.
   */
  source: "api" | "html-fallback";
}

const PRICE_CACHE_TTL_MS = 10 * 60 * 1000;
const priceCache = new Map<string, LivePrice & { fetchedAt: number }>();

interface RawPrecos {
  de?: number;
  por?: number;
  vista?: number;
}

interface RawAtributoValor {
  label?: string;
  precos?: RawPrecos;
}

// O WAF (Sucuri) do site é mais desconfiado com tráfego de servidor (ex.:
// AWS) do que com navegadores reais. Mandamos headers de navegador de
// verdade e um Referer da própria loja pra reduzir a chance de bloqueio.
const BROWSER_LIKE_HEADERS: Record<string, string> = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Accept-Language": "pt-BR,pt;q=0.9",
  Referer: `${STORE_ORIGIN}/`,
};

const fetchWithTimeout = (
  url: string,
  headers: Record<string, string>,
  timeoutMs: number,
  init: Omit<RequestInit, "headers" | "signal"> = {},
) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...init, signal: controller.signal, headers }).finally(() =>
    clearTimeout(timeout),
  );
};

// Tenta a API interna (JSON) até 2 vezes — é a única fonte que dá o preço
// por altura. Se falhar (rede, timeout, ou o WAF devolver uma página de
// desafio em vez de JSON), retorna null pro fallback assumir.
const fetchProductApiData = async (slug: string): Promise<unknown | null> => {
  const url = `${PRICE_API_BASE}/url/product/detail?url=${encodeURIComponent(slug)}`;
  const headers = {
    ...BROWSER_LIKE_HEADERS,
    "app-token": "wapstore",
    Accept: "application/json",
  };

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetchWithTimeout(url, headers, 7000);
      if (!res.ok) continue;
      const contentType = res.headers.get("content-type") ?? "";
      if (!contentType.includes("application/json")) continue;
      return await res.json();
    } catch (err) {
      if (attempt === 1) {
        console.error(`Falha ao buscar API de preço (${slug}):`, err);
      }
    }
  }
  return null;
};

// Reserva: raspa a página do produto (preço padrão + desconto à vista), sem
// quebra por altura. Usada só quando a API acima falhou.
const fetchLivePriceFromHtml = async (slug: string): Promise<LivePrice | null> => {
  try {
    const res = await fetchWithTimeout(`${STORE_ORIGIN}/${slug}`, BROWSER_LIKE_HEADERS, 7000);
    if (!res.ok) return null;

    const html = await res.text();
    const priceMatch = html.match(/"price":\s*([0-9.]+)/);
    if (!priceMatch) return null;

    const price = parseFloat(priceMatch[1]);
    const cashMatch = html.match(/prices-display__cash-price">R\$\s*([0-9.,]+)/);
    const cashPrice = cashMatch
      ? parseFloat(cashMatch[1].replace(/\./g, "").replace(",", "."))
      : null;

    return { price, cashPrice, heightVariants: [], source: "html-fallback" };
  } catch (err) {
    console.error(`Falha no fallback HTML de preço (${slug}):`, err);
    return null;
  }
};

const parsePrecosFromApi = (data: unknown): LivePrice | null => {
  const conteudo = (data as { conteudo?: Record<string, unknown> } | null)?.conteudo;
  const precos = conteudo?.precos as RawPrecos | undefined;
  if (!precos || typeof precos.por !== "number") return null;

  const price = precos.por;
  const cashPrice = typeof precos.vista === "number" ? precos.vista : null;

  // A loja usa esse atributo pra variar preço por altura de rolo (a maioria
  // das telas/cercas prontas tem isso). Só tratamos como "altura" se o nome
  // do atributo confirmar — outros produtos podem variar por cor/tipo, o
  // que não queremos misturar aqui.
  const atributos = conteudo?.atributos as
    | { simples?: { nome?: string; valores?: RawAtributoValor[] } }
    | undefined;
  const atributoNome = atributos?.simples?.nome ?? "";
  const valores = atributos?.simples?.valores ?? [];
  const heightVariants: HeightVariant[] = /altura/i.test(atributoNome)
    ? valores
        .filter(
          (v): v is Required<RawAtributoValor> =>
            typeof v.label === "string" && typeof v.precos?.por === "number",
        )
        .map((v) => ({
          label: v.label,
          price: v.precos.por!,
          cashPrice: typeof v.precos!.vista === "number" ? v.precos!.vista! : v.precos.por!,
        }))
    : [];

  return { price, cashPrice, heightVariants, source: "api" };
};

const fetchLivePrice = async (slug: string): Promise<LivePrice | null> => {
  const cached = priceCache.get(slug);
  const now = Date.now();
  if (cached && now - cached.fetchedAt < PRICE_CACHE_TTL_MS) {
    return {
      price: cached.price,
      cashPrice: cached.cashPrice,
      heightVariants: cached.heightVariants,
      source: cached.source,
    };
  }

  const apiData = await fetchProductApiData(slug);
  const apiResult = apiData ? parsePrecosFromApi(apiData) : null;
  const result = apiResult ?? (await fetchLivePriceFromHtml(slug));
  if (!result) return null;

  priceCache.set(slug, { ...result, fetchedAt: now });
  return result;
};

const formatBRL = (value: number) =>
  `R$ ${value.toFixed(2).replace(".", ",")}`;

const priceLine = (label: string, price: number, cashPrice: number | null) =>
  cashPrice !== null && cashPrice < price
    ? `de ${formatBRL(price)} por ${formatBRL(cashPrice)} à vista no Pix/depósito`
    : formatBRL(price);

// Detecta uma altura mencionada na mensagem ("1,50m", "1.5 m", "150cm" etc).
// A faixa 0–10m evita confundir com comprimento de rolo (ex.: "rolo de 50m").
const parseHeightFromMessage = (message: string): number | null => {
  const meterMatch = message.match(/(\d+(?:[.,]\d+)?)\s*m(?:etro)?s?\b/i);
  if (meterMatch) {
    const n = parseFloat(meterMatch[1].replace(",", "."));
    if (Number.isFinite(n) && n > 0 && n < 10) return n;
  }
  const cmMatch = message.match(/(\d+(?:[.,]\d+)?)\s*cm\b/i);
  if (cmMatch) {
    const n = parseFloat(cmMatch[1].replace(",", ".")) / 100;
    if (Number.isFinite(n) && n > 0 && n < 10) return n;
  }
  return null;
};

const parseVariantHeight = (label: string): number | null => {
  const m = label.match(/(\d+(?:[.,]\d+)?)/);
  if (!m) return null;
  const n = parseFloat(m[1].replace(",", "."));
  return Number.isFinite(n) ? n : null;
};

const findHeightVariant = (variants: HeightVariant[], targetHeight: number) =>
  variants.find((v) => {
    const h = parseVariantHeight(v.label);
    return h !== null && Math.abs(h - targetHeight) < 0.001;
  }) ?? null;

const buildPriceContext = async (message: string): Promise<string> => {
  const matches = findPriceMatches(message);
  if (matches.length === 0) return "";

  const requestedHeight = parseHeightFromMessage(message);
  const results = await Promise.all(matches.map((m) => fetchLivePrice(m.slug)));

  const lines = matches
    .map((m, i) => {
      const result = results[i];
      if (result === null) return null;
      const { price, cashPrice, heightVariants, source } = result;

      if (heightVariants.length === 0) {
        // source "html-fallback" quer dizer que a API de preço por altura
        // falhou — não sabemos se este produto varia por altura ou não, então
        // avisamos que é um valor de referência em vez de afirmar como certo.
        const suffix =
          source === "html-fallback"
            ? " — valor de referência; este produto pode ter preço diferente por altura, confirme no site"
            : "";
        return `- ${m.label}: ${priceLine(m.label, price, cashPrice)}${suffix} (${STORE_ORIGIN}/${m.slug})`;
      }

      const requestedVariant =
        requestedHeight !== null ? findHeightVariant(heightVariants, requestedHeight) : null;

      if (requestedVariant) {
        return `- ${m.label} (altura ${requestedVariant.label}): ${priceLine(m.label, requestedVariant.price, requestedVariant.cashPrice)} (${STORE_ORIGIN}/${m.slug})`;
      }

      // Nenhuma altura pedida na mensagem (ou a altura pedida não existe):
      // mostramos a variante padrão bem rotulada, mais a lista de alturas
      // disponíveis, pra IA nunca apresentar esse valor como se fosse de
      // outra altura.
      const defaultVariant =
        heightVariants.find((v) => v.price === price) ?? heightVariants[0];
      const heightList = heightVariants.map((v) => v.label).join(", ");
      return `- ${m.label} (altura padrão ${defaultVariant.label} — cada altura tem preço diferente, alturas disponíveis: ${heightList}): ${priceLine(m.label, price, cashPrice)} (${STORE_ORIGIN}/${m.slug})`;
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

  const geminiResult = await callGemini(apiKey, contents, systemInstructionText);
  if ("error" in geminiResult) {
    console.error("Gemini API error:", geminiResult.error);
    return Response.json({ error: "Não foi possível falar com a IA agora." }, { status: 502 });
  }

  return Response.json({ reply: geminiResult.reply.trim() });
}
