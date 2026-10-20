import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactSchema } from "@/lib/schemas";
import { verifyRecaptchaToken } from "@/lib/recaptcha";
import { SITE } from "@/lib/site";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const payload = body as {
    name?: string;
    email?: string;
    phone?: string;
    subject?: string;
    message?: string;
    recaptchaToken?: string;
  };

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Check your details" },
      { status: 400 },
    );
  }

  const verification = await verifyRecaptchaToken(payload.recaptchaToken, "contact");
  if (verification.mode === "verified" && !verification.success) {
    return NextResponse.json(
      { error: "The security check did not pass.", fallback: "v2" },
      { status: 400 },
    );
  }

  const { name, email, phone, subject, message } = parsed.data;
  const smtpConfigured = Boolean(
    process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS,
  );

  if (!smtpConfigured) {
    console.info("Contact form message (SMTP not configured)", { name, email, subject });
    return NextResponse.json({
      ok: true,
      delivered: false,
      message: "Thank you. Your message is with our team.",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: Number(process.env.SMTP_PORT ?? 587) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
      to: SITE.email,
      replyTo: email,
      subject: `Website enquiry: ${subject}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error("Contact email failed", error);
    return NextResponse.json(
      { error: "The message could not be sent. Please try WhatsApp instead." },
      { status: 502 },
    );
  }
}
