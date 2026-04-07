import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailOptions) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "EmprendeLab <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Error al enviar email con Resend:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Excepción al enviar email:", err);
    return { success: false, error: err };
  }
}
