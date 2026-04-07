"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import FloatingElements from "@/components/floating-elements";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await authClient.requestPasswordReset({
        email,
        redirectTo: "/auth/reset-password",
      });

      if (error) {
        if (error.status === 404) {
          toast.error("No existe una cuenta con ese correo electrónico");
        } else {
          toast.error(error.message || "Ocurrió un error al procesar tu solicitud");
        }
      } else {
        setSubmitted(true);
        toast.success("Correo de recuperación enviado");
      }
    } catch (err) {
      toast.error("Error de conexión. Por favor intenta de nuevo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-linear-to-b from-[#2e1a47] to-background text-foreground overflow-hidden flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <FloatingElements />

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <Link href="/auth/login" className="flex items-center text-purple-300 hover:text-white transition-colors gap-2 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver al inicio de sesión
          </Link>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-2 text-center text-3xl font-extrabold text-white tracking-tight"
        >
          Recuperar contraseña
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-2 text-center text-sm text-purple-200/70"
        >
          {submitted 
            ? "Hemos enviado un enlace a tu correo para restablecer tu contraseña." 
            : "Ingresa tu correo electrónico y te enviaremos un enlace para recuperar tu acceso."}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <div className="glass py-8 px-4 sm:rounded-2xl sm:px-10 border border-purple-500/20 shadow-[0_0_40px_rgba(168,85,247,0.15)] relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-transparent pointer-events-none"></div>

          {!submitted ? (
            <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-purple-100"
                >
                  Correo Electrónico
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg shadow-sm placeholder-purple-300/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-sm transition-all focus:bg-white/10"
                    placeholder="ejemplo@correo.com"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-full shadow-lg text-sm font-semibold text-white bg-linear-to-r from-purple-500 to-blue-500 hover:shadow-purple-500/40 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#2e1a47] focus:ring-purple-500 transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Enviar enlace de recuperación
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-4 relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 border border-green-500/50 mb-4">
                <Mail className="w-8 h-8 text-green-400" />
              </div>
              <p className="text-white font-medium mb-6">¡Revisa tu bandeja de entrada!</p>
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center px-6 py-2 border border-purple-500/30 rounded-full text-sm font-medium text-purple-200 hover:bg-purple-500/10 transition-all"
              >
                Volver al login
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
