import { createHash } from "node:crypto";

type Bucket = { count: number; expires: number };
const state = globalThis as typeof globalThis & { __insulApiLimits?: Map<string, Bucket> };
const buckets = state.__insulApiLimits ??= new Map<string, Bucket>();
const MAX_BUCKETS = 10000;

export function apiError(message: string, status: number, extraHeaders: Record<string, string> = {}) {
  return Response.json({ error: message }, { status, headers: { "Cache-Control": "no-store", ...extraHeaders } });
}

/** Only use an IP header that the deployment proxy overwrites, never arbitrary forwarded headers. */
function clientIdentity(request: Request): string {
  const trustedHeader = process.env.TRUSTED_CLIENT_IP_HEADER || (process.env.VERCEL === "1" ? "x-vercel-forwarded-for" : "");
  const raw = trustedHeader ? request.headers.get(trustedHeader)?.split(",")[0]?.trim() : undefined;
  return createHash("sha256").update(raw?.slice(0, 128) || "shared-unidentified-client").digest("hex");
}

// Local fallback: shared by requests in one Node process, bounded in memory.
// Multiple production replicas also need a shared rate limit at the edge/WAF.
export function limitRequests(request: Request, scope: string, limit: number, windowMs: number): Response | undefined {
  const now = Date.now();
  const key = `${scope}:${clientIdentity(request)}`;
  let bucket = buckets.get(key);
  if (bucket && bucket.expires <= now) { buckets.delete(key); bucket = undefined; }
  if (!bucket) {
    if (buckets.size >= MAX_BUCKETS) {
      for (const [existing, value] of buckets) if (value.expires <= now) buckets.delete(existing);
      if (buckets.size >= MAX_BUCKETS) return apiError("Muitas solicitações. Tente novamente em instantes.", 429, { "Retry-After": "60" });
    }
    bucket = { count: 0, expires: now + windowMs };
    buckets.set(key, bucket);
  }
  if (bucket.count >= limit) return apiError("Muitas solicitações. Aguarde antes de tentar novamente.", 429, { "Retry-After": String(Math.max(1, Math.ceil((bucket.expires - now) / 1000))) });
  bucket.count++;
}

type JsonResult = { body: Record<string, unknown> } | { response: Response };

export async function readApiJson(request: Request, options: { scope: string; maxBytes: number; limit: number; windowMs: number }): Promise<JsonResult> {
  const site = request.headers.get("sec-fetch-site");
  const origin = request.headers.get("origin");
  const allowed = new Set([new URL(request.url).origin, ...(process.env.ALLOWED_APP_ORIGINS || "").split(",").map(item => item.trim()).filter(Boolean)]);
  if (site === "cross-site" || (origin && !allowed.has(origin))) return { response: apiError("Origem da solicitação não permitida.", 403) };
  const limited = limitRequests(request, options.scope, options.limit, options.windowMs);
  if (limited) return { response: limited };
  const contentType = request.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
  if (contentType !== "application/json") return { response: apiError("Envie os dados no formato JSON.", 415) };
  const contentLength = request.headers.get("content-length");
  if (contentLength && (!/^\d+$/.test(contentLength) || Number(contentLength) > options.maxBytes)) {
    return { response: apiError("Solicitação muito grande ou com tamanho inválido.", 413) };
  }
  const reader = request.body?.getReader();
  if (!reader) return { response: apiError("Corpo da requisição inválido.", 400) };
  try {
    const decoder = new TextDecoder("utf-8", { fatal: true });
    let size = 0;
    let text = "";
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > options.maxBytes) {
        await reader.cancel();
        return { response: apiError("Solicitação muito grande.", 413) };
      }
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
    const body: unknown = JSON.parse(text);
    if (!body || typeof body !== "object" || Array.isArray(body)) return { response: apiError("Envie um objeto JSON válido.", 400) };
    return { body: body as Record<string, unknown> };
  } catch {
    await reader.cancel().catch(() => {});
    return { response: apiError("Corpo da requisição inválido.", 400) };
  } finally {
    reader.releaseLock();
  }
}

export function hasControlCharacters(value: string): boolean {
  return Array.from(value).some(character => character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127);
}
