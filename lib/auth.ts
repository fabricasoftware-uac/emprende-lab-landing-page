import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; // your drizzle instance
import { admin } from "better-auth/plugins"
import { sendEmail } from "./email";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
    }),
    emailAndPassword: {
        enabled: true,
        async sendResetPassword({ user, url, token }, request) {
            await sendEmail({
              to: user.email,
              subject: "Restablecer tu contraseña - EmprendeLab",
              html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                  <h2>Recuperación de contraseña</h2>
                  <p>Hola,</p>
                  <p>Has solicitado restablecer tu contraseña para tu cuenta de EmprendeLab. Haz clic en el siguiente botón para continuar:</p>
                  <div style="margin: 30px 0;">
                    <a href="${url}" style="background: #a855f7; color: white; padding: 12px 24px; text-decoration: none; border-radius: 50px; font-weight: bold;">Restablecer contraseña</a>
                  </div>
                  <p>Si no has solicitado este cambio, puedes ignorar este correo.</p>
                  <p style="font-size: 0.8em; color: #666; margin-top: 40px;">Este enlace expirará pronto.</p>
                </div>
              `
            });
        },
    },
    plugins: [
        admin()
    ]
});
