import { NextResponse } from "next/server";
import { Resend } from "resend";

const siteName = "Waleed Ilyas | Portfolio";
const adminEmail = "waleedilyas99@gmail.com";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, type, message } = body ?? {};

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email sending is not configured yet. Please email waleedilyas99@gmail.com directly." },
        { status: 503 },
      );
    }

    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: `${siteName} <onboarding@resend.dev>`,
      to: adminEmail,
      replyTo: email,
      subject: `Portfolio enquiry from ${String(name)}`,
      text: [
        `Name: ${String(name)}`,
        `Email: ${String(email)}`,
        company ? `Company: ${String(company)}` : "Company: Not provided",
        type ? `Role type: ${String(type)}` : "Role type: Not provided",
        "",
        String(message),
      ].join("\n"),
    });

    return NextResponse.json({ success: true, message: "Thanks, your message has been sent." });
  } catch (error) {
    console.error("Portfolio contact error:", error);
    return NextResponse.json({ error: "Unable to send your message right now." }, { status: 500 });
  }
}
