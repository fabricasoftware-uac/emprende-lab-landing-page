"use client";

import { Code, Lightbulb, ArrowRight, Globe, Instagram, Linkedin, Mail, Phone, InstagramIcon } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function InnovationUnits() {
  return (
    <section id="innovation" className="relative overflow-hidden py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] text-pink-400 uppercase bg-pink-400/10 border border-pink-400/20 rounded-full">
            UNIDADES DE INNOVACIÓN
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
            Nuestros <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-pink-400">Servicios</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Unidades especializadas que diseñan, desarrollan e impulsan soluciones tecnológicas y creativas de alto impacto.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          {/* Bento Card 1: Fábrica de Software */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 group relative rounded-[2.5rem] overflow-hidden bg-[#0a0a0c] border border-white/5 hover:border-blue-500/30 transition-colors duration-500 min-h-125 flex flex-col"
          >
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
                alt="Fábrica de Software"
                fill
                className="object-cover opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0c] via-[#0a0a0c]/80 to-transparent"></div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>
            </div>

            <div className="relative z-10 p-8 sm:p-12 mt-auto flex flex-col h-full justify-end">
              <div className="mb-6 flex items-center justify-between">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                  <Code size={32} />
                </div>
                
                {/* Social Links */}
                <div className="flex items-center gap-3">
                  <Link href="https://www.instagram.com/fabsoft._/" target="_blank" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:bg-white/10 hover:border-blue-500/30 transition-all">
                    <Instagram size={18} />
                  </Link>
                  <Link href="" target="_blank" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:bg-white/10 hover:border-blue-500/30 transition-all">
                    <Globe size={18} />
                  </Link>
                </div>
              </div>

              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
                Fábrica de <span className="text-blue-400">Software</span>
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-xl">
                Centro especializado en desarrollo de software personalizado. Transformamos ideas en soluciones digitales escalables utilizando tecnología de punta y metodologías ágiles.
              </p>

              <div className="flex flex-wrap gap-3">
                {["Desarrollo Personalizado", "Aplicaciones web", "E-commerce"].map((tag, i) => (
                  <span key={i} className="px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium backdrop-blur-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bento Card 2: Agencia InnHouse */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 group relative rounded-[2.5rem] overflow-hidden bg-[#0a0a0c] border border-white/5 hover:border-pink-500/30 transition-colors duration-500 min-h-125 flex flex-col"
          >
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/innhouse.webp"
                alt="Agencia InnHouse"
                fill
                className="object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0c] via-[#0a0a0c]/90 to-[#0a0a0c]/40"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/10 blur-[80px] rounded-full mix-blend-screen pointer-events-none"></div>
            </div>

            <div className="relative z-10 p-8 sm:p-12 flex flex-col h-full">
              <div className="mb-auto flex items-center justify-between">
                <div className="w-16 h-16 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shadow-[0_0_30px_rgba(236,72,153,0.2)]">
                  <Lightbulb size={32} />
                </div>
                
                {/* Social Links */}
                <div className="flex items-center gap-3">
                  <Link href="https://www.instagram.com/agenciainhouse/" target="_blank" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-pink-400 hover:bg-white/10 hover:border-pink-500/30 transition-all">
                    <Instagram size={18} />
                  </Link>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
                  Agencia <br/><span className="text-pink-400">InnHouse</span>
                </h3>
                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                  Unidad creativa dedicada a la innovación y posicionamiento de marcas. Diseñamos estrategias digitales que comunican, diferencian y cautivan.
                </p>

                <div className="flex flex-wrap gap-3">
                  {["UI/UX Design", "Estrategia de Marca", "Marketing Digital"].map((tag, i) => (
                    <span key={i} className="px-4 py-2 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-300 text-sm font-medium backdrop-blur-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bento Card 3: Contact/CTA */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-12 group relative rounded-[2.5rem] overflow-hidden bg-linear-to-r from-blue-900/40 via-purple-900/40 to-pink-900/40 border border-white/10 hover:border-white/20 transition-all duration-500 p-8 sm:p-12 mb-8"
          >
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl text-center md:text-left">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  ¿Buscas transformar tu negocio con nosotros?
                </h3>
                <p className="text-slate-300 text-lg">
                  Nuestras unidades están listas para escuchar tu idea y llevarla al siguiente nivel con tecnología y diseño de vanguardia.
                </p>
              </div>
              
              <Link 
                href="https://ig.me/m/emprende_lab" 
                target="_blank"
                className="shrink-0 flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-slate-200 hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)]"
              >
                <Phone size={20} />
                <span>Contáctanos!</span>
                <ArrowRight size={18} className="ml-1" />
              </Link>
            </div>
          </motion.div>
          
        </motion.div>
      </div>
    </section>
  );
}
