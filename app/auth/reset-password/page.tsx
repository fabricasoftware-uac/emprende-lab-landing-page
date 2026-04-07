"use client";

import { authClient } from "@/lib/auth-client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FloatingElements from "@/components/floating-elements";
import { motion } from "framer-motion";
import { Loader2, Lock, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!token) {
    return (
      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="glass py-8 px-4 sm:rounded-2xl sm:px-10 border border-purple-500/20 shadow-[0_0_40px_rgba(168,85,247,0.15)] text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 border border-red-500/50 mb-4">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Enlace inválido</h2>
          <p className="text-purple-200/70 text-sm mb-6">El enlace de recuperación ha expirado o no es válido.</p>
          <Link
            href="/auth/forgot-password"
            className="inline-flex items-center justify-center px-6 py-2 border border-purple-500/30 rounded-full text-sm font-medium text-purple-200 hover:bg-purple-500/10 transition-all"
          >
            Solicitar uno nuevo
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 8) {
        toast.error("La contraseña debe tener al menos 8 caracteres");
        return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.resetPassword({
        newPassword: password,
        token: token,
      });

      if (error) {
        toast.error(error.message || "Ocurrió un error al restablecer la contraseña");
      } else {
        setSuccess(true);
        toast.success("Contraseña restablecida correctamente");
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      }
    } catch (err) {
      toast.error("Error al conectar con el servidor. Intenta de nuevo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-2 text-center text-3xl font-extrabold text-white tracking-tight"
        >
          Restablecer contraseña
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-2 text-center text-sm text-purple-200/70"
        >
          Ingresa tu nueva contraseña para recuperar el acceso a tu cuenta.
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

          {!success ? (
            <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-purple-100"
                >
                  Nueva contraseña
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg shadow-sm placeholder-purple-300/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-sm transition-all focus:bg-white/10"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-purple-100"
                >
                  Confirmar nueva contraseña
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="appearance-none block w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg shadow-sm placeholder-purple-300/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-sm transition-all focus:bg-white/10"
                    placeholder="••••••••"
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
                      Restablecer contraseña
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-4 relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 border border-green-500/50 mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-400" />
              </div>
              <p className="text-white font-medium mb-2">¡Todo listo!</p>
              <p className="text-purple-200/70 text-sm mb-6">Tu contraseña ha sido actualizada. Serás redirigido al inicio de sesión en unos segundos.</p>
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center px-6 py-2 border border-purple-500/30 rounded-full text-sm font-medium text-purple-200 hover:bg-purple-500/10 transition-all"
              >
                Ir al login ahora
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="relative min-h-screen bg-linear-to-b from-[#2e1a47] to-background text-foreground overflow-hidden flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <FloatingElements />
      <Suspense fallback={
        <div className="flex justify-center items-center">
          <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
        </div>
      }>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
