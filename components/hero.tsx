'use client';

import { Rocket, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-20 flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-blue-900/10 to-transparent"></div>
      
      {/* Orbital paths */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-purple-500/10 rounded-full"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-blue-500/10 rounded-full"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-8 group hover:border-purple-500/60 transition-colors cursor-pointer">
          <Rocket size={16} className="text-purple-400" />
          <span className="text-sm text-purple-300">Lanzando innovación al espacio</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="block bg-gradient-to-r from-purple-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
            EmprendeLab
          </span>
          <span className="block text-2xl sm:text-3xl lg:text-4xl text-foreground/70 font-normal mt-2">
            Tu ecosistema de innovación
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-foreground/60 mb-10 max-w-2xl mx-auto leading-relaxed">
          Los emprendedores son como astronautas lanzando ideas al espacio. Te acompañamos en cada etapa de tu viaje
          hacia el éxito a través de aceleración, consultoría y formación especializada.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:shadow-2xl hover:shadow-purple-500/40 transition-all hover:scale-105 flex items-center gap-2 group">
            Explorar emprendimientos
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 rounded-full glass hover:glass-hover font-semibold text-foreground flex items-center gap-2 group">
            Conoce EmprendeLab
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Decorative rocket */}
        <div className="absolute top-20 right-10 text-6xl float opacity-30 hidden lg:block">
          🚀
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-center justify-center">
          <div className="w-1 h-2 bg-white/50 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
