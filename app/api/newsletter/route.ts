import { Resend } from "resend";
import { apiError, hasControlCharacters, readApiJson } from "../_lib/security";

const TO_EMAIL = "gomesrdg34@gmail.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const parsed = await readApiJson(request, { scope: "newsletter", maxBytes: 4096, limit: 5, windowMs: 10 * 60 * 1000 });
  if ("response" in parsed) return parsed.response;
  const { body } = parsed;
  if ([body.name, body.email, body.phone].some(value => typeof value !== "string")) return apiError("Preencha nome, e-mail e celular válidos.", 400);
  const name = (body.name as string).trim();
  const email = (body.email as string).trim();
  const phone = (body.phone as string).trim();
  if (name.length > 100 || email.length > 254 || phone.length > 32 || [name, email, phone].some(hasControlCharacters)) return apiError("Os dados informados são inválidos ou muito longos.", 400);
  if (!/^[+\d\s().-]+$/.test(phone) || phone.replace(/\D/g, "").length < 8 || phone.replace(/\D/g, "").length > 15) return apiError("Celular inválido.", 400);

  if (!name || !email || !phone) {
    return Response.json(
      { error: "Preencha nome, e-mail e celular." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: "E-mail inválido." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "RESEND_API_KEY não configurada — cadastro de newsletter não foi enviado.",
    );
    return Response.json(
      { error: "Envio de e-mail ainda não configurado. Tente novamente mais tarde." },
      { status: 503 },
    );
  }

  try {
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "Insul <onboarding@resend.dev>",
    to: TO_EMAIL,
    replyTo: email,
    subject: `Novo cadastro de newsletter: ${name}`,
    text: `Nome: ${name}\nEmail: ${email}\nCelular: ${phone}`,
  });

  if (error) {
    console.error("Falha ao enviar e-mail de newsletter.");
    return Response.json(
      { error: "Não foi possível enviar seu cadastro agora. Tente novamente." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    console.error("Serviço de newsletter temporariamente indisponível.");
    return apiError("Não foi possível enviar seu cadastro agora. Tente novamente.", 502);
  }
}
