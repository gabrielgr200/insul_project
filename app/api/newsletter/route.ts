import { Resend } from "resend";

const TO_EMAIL = "gomesrdg34@gmail.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: { name?: string; email?: string; phone?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";

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

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "Insul <onboarding@resend.dev>",
    to: TO_EMAIL,
    replyTo: email,
    subject: `Novo cadastro de newsletter: ${name}`,
    text: `Nome: ${name}\nEmail: ${email}\nCelular: ${phone}`,
  });

  if (error) {
    console.error("Falha ao enviar e-mail de newsletter:", error);
    return Response.json(
      { error: "Não foi possível enviar seu cadastro agora. Tente novamente." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
