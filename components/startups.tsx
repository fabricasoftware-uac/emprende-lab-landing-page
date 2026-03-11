'use client';

import { ArrowRight } from 'lucide-react';

const startups = [
  {
    name: 'TechFlow',
    description: 'Plataforma de automatización de procesos empresariales con IA.',
    category: 'SaaS',
    logo: '⚡',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'GreenTech',
    description: 'Soluciones sostenibles para empresas que buscan reducir su huella de carbono.',
    category: 'Sostenibilidad',
    logo: '🌱',
    color: 'from-green-500 to-emerald-500',
  },
  {
    name: 'FinMind',
    description: 'Plataforma de educación financiera con inteligencia artificial personalizada.',
    category: 'FinTech',
    logo: '💡',
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'MediCare',
    description: 'Telemedicina integrada con diagnóstico por IA para zonas rurales.',
    category: 'HealthTech',
    logo: '🏥',
    color: 'from-red-500 to-pink-500',
  },
  {
    name: 'EduConnect',
    description: 'Red global conectando estudiantes con mentores especializados en tiempo real.',
    category: 'EdTech',
    logo: '📚',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    name: 'SupplyAI',
    description: 'Optimización de cadenas de suministro usando machine learning avanzado.',
    category: 'Logística',
    logo: '📦',
    color: 'from-orange-500 to-red-500',
  },
];

export default function Startups() {
  return (
    <section id="startups" className="relative py-20 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              Tienda de Emprendedores
            </span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Descubre los emprendimientos activos del ecosistema EmprendeLab que están transformando el mundo.
          </p>
        </div>

        {/* Startups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {startups.map((startup, index) => (
            <div
              key={index}
              className="glass-hover group p-8 rounded-2xl transition-all duration-300 hover:scale-105 flex flex-col"
            >
              {/* Header with logo and category */}
              <div className="flex items-start justify-between mb-4">
                <div className={`text-4xl p-3 rounded-lg bg-gradient-to-br ${startup.color} text-white`}>
                  {startup.logo}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${startup.color} text-white`}>
                  {startup.category}
                </span>
              </div>

              {/* Startup info */}
              <h3 className="text-2xl font-bold mb-3 text-white">{startup.name}</h3>
              <p className="text-foreground/70 mb-6 flex-grow leading-relaxed">{startup.description}</p>

              {/* Button */}
              <button className="group/btn flex items-center justify-between w-full px-4 py-3 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all">
                <span className="text-sm font-medium">Ver emprendimiento</span>
                <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-foreground/60 mb-6">¿Quieres que tu startup esté aquí?</p>
          <button className="px-10 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-2xl hover:shadow-purple-500/40 transition-all hover:scale-105">
            Solicita tu Espacio
          </button>
        </div>
      </div>
    </section>
  );
}
