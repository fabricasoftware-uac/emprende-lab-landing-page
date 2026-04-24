"use client";

import { Rocket, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-20 flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-purple-600/10 via-blue-600/10 to-transparent"></div>

      {/* Abstract Glowing Planets */}
      <motion.div
        animate={{ y: [-15, 15, -15], rotate: 360 }}
        transition={{
          y: { duration: 12, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 150, repeat: Infinity, ease: "linear" },
        }}
        className="absolute -top-32 -right-32 w-120 h-120 rounded-full bg-linear-to-br from-indigo-600/20 via-purple-600/10 to-transparent blur-3xl pointer-events-none"
      ></motion.div>

      <motion.div
        animate={{ y: [20, -20, 20] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 -left-20 w-64 h-64 rounded-full bg-linear-to-tr from-blue-500/20 to-cyan-400/10 blur-3xl pointer-events-none"
      ></motion.div>

      {/* Primary Orbital paths */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-160 h-160 border border-white/5 rounded-full border-t-purple-500/40 border-r-blue-500/20 pointer-events-none"
      ></motion.div>

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-md h-112 border border-white/5 rounded-full border-b-cyan-500/40 pointer-events-none"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)]"></div>
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-8 group hover:border-purple-500/60 transition-colors cursor-pointer"
        >
          <Rocket size={16} className="text-purple-400" />
          <span className="text-sm text-purple-300">
            Laboratorio de Emprendimiento e Innovación
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight flex justify-center w-full"
        >
          <Image
            src="/placeholder_elab.svg"
            alt="EmprendeLab"
            width={490}
            height={390}
            className="object-contain"
            priority={true}
          />
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-lg sm:text-xl text-foreground/60 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Lanzamos tus ideas al espacio. Te acompañamos en cada etapa de tu
          viaje hacia el éxito a través de aceleración, consultoría y formación
          especializada.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#empresas"
            className="px-8 py-4 rounded-full bg-linear-to-r from-purple-500 to-blue-500 text-white font-semibold hover:shadow-2xl hover:shadow-purple-500/40 transition-all hover:scale-105 flex items-center gap-2 group cursor-pointer"
          >
            Explorar emprendimientos
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
          <a
            href="#academia"
            className="px-8 py-4 rounded-full glass hover:glass-hover font-semibold text-foreground flex items-center gap-2 group cursor-pointer"
          >
            Conoce <span className="text-purple-500">EmprendeLab</span>
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </motion.div>

        {/* Decorative rocket */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-10 text-6xl opacity-30 hidden lg:block"
        >
          🚀
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-center justify-center">
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 bg-white/50 rounded-full"
          ></motion.div>
        </div>
      </motion.div>
    </section>
  );
}
