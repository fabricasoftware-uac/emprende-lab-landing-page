"use client";

import Link from "next/link";
import PocketBase from "pocketbase";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FloatingElements from "@/components/floating-elements";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await pb.collection("users").authWithPassword(email, password);
      // Redirigir al dashboard
      router.push("/views/admin");
    } catch (err: any) {
      switch (err.code) {
        case 404:
          setError("Usuario no encontrado");
          break;
        case 401:
          setError("Contraseña incorrecta");
          break;
        default:
          setError("Credenciales incorrectas");
          break;
      }
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
          <Image
            src="/placeholder_elab.svg"
            alt="EmprendeLab"
            width={200}
            height={60}
            className="object-contain"
          />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-2 text-center text-3xl font-extrabold text-white tracking-tight"
        >
          ¡Bienvenido de nuevo!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-2 text-center text-sm text-purple-200/70"
        >
          Inicia sesión para acceder a tu panel de control.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <div className="glass py-8 px-4 sm:rounded-2xl sm:px-10 border border-purple-500/20 shadow-[0_0_40px_rgba(168,85,247,0.15)] relative overflow-hidden">
          {/* Subtle gradient glow inside the card */}
          <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-transparent pointer-events-none"></div>

          <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm text-center"
              >
                {error}
              </motion.div>
            )}
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
              <label
                htmlFor="password"
                className="block text-sm font-medium text-purple-100"
              >
                Contraseña
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg shadow-sm placeholder-purple-300/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-sm transition-all focus:bg-white/10"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <a
                  href="/auth/forgot-password"
                  className="font-medium text-purple-400 hover:text-purple-300 transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-full shadow-lg text-sm font-semibold text-white bg-linear-to-r from-purple-500 to-blue-500 hover:shadow-purple-500/40 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#2e1a47] focus:ring-purple-500 transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Iniciar Sesión
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
