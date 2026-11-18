type OpenAIResult = { reply: string } | { error: string; status: number; attempts: number };

type Dependencies = {
  fetch: typeof fetch;
  sleep: (ms: number) => Promise<void>;
  random: () => number;
  now: () => number;
};

/** Retry transient failures within a fixed budget; never retry invalid credentials or payloads. */
export async function requestOpenAI(
  apiKey: string,
  model: string,
  body: string,
  dependencies: Partial<Dependencies> = {},
): Promise<OpenAIResult> {
  const deps: Dependencies = {
    fetch: globalThis.fetch,
    sleep: ms => new Promise(resolve => setTimeout(resolve, ms)),
    random: Math.random,
    now: Date.now,
    ...dependencies,
  };
  const deadline = deps.now() + 26000;
  let status = 503;
  let error = "Serviço de IA temporariamente indisponível.";

  for (let attempt = 0; attempt < 3; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), Math.min(8000, Math.max(1, deadline - deps.now())));
    let retryAfter = 0;
    let retryable = true;
    try {
      const response = await deps.fetch(
        "https://api.openai.com/v1/responses",
        { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` }, body: JSON.stringify({ ...JSON.parse(body), model, store: false }), signal: controller.signal, cache: "no-store" },
      );
      status = response.status;
      if (response.ok) {
        const data = await response.json();
        const parts = Array.isArray(data?.output) ? data.output.filter((item: { type?: string }) => item.type === "message").flatMap((item: { content?: unknown[] }) => item.content ?? []) : [];
        const reply = Array.isArray(parts)
          ? parts.filter(part => part.type === "output_text" && typeof part.text === "string").map(part => part.text).join("").trim()
          : "";
        if (reply) return { reply };
        // Safety blocks and empty model responses are not availability errors.
        return { error: "A IA não retornou uma resposta de texto.", status: 502, attempts: attempt + 1 };
      }
      const retryHeader = response.headers.get("retry-after");
      if (retryHeader) {
        const seconds = Number(retryHeader);
        retryAfter = Math.max(0, Number.isFinite(seconds) ? seconds * 1000 : Date.parse(retryHeader) - deps.now());
        if (!Number.isFinite(retryAfter)) retryAfter = 0;
      }
      await response.body?.cancel();
      retryable = [408, 429, 500, 502, 503, 504].includes(status);
      error = `OpenAI HTTP ${status}`;
    } catch (cause) {
      status = 503;
      error = cause instanceof Error && cause.name === "AbortError" ? "Tempo limite ao consultar a IA." : "Falha de conexão com a IA.";
    } finally {
      clearTimeout(timeout);
    }
    const delay = Math.max(retryAfter, 1000 * 2 ** attempt + Math.floor(deps.random() * 400));
    if (!retryable || attempt === 2 || delay > 5000 || deps.now() + delay >= deadline) {
      return { error, status, attempts: attempt + 1 };
    }
    await deps.sleep(delay);
  }
  return { error, status, attempts: 3 };
}
