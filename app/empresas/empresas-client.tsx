"use client";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Rocket, 
  ArrowLeft, 
  User, 
  Linkedin, 
  Instagram, 
  Globe, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle2,
  LayoutGrid
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EmpresaCard, EmpresaModal, type Empresa } from "@/components/empresa-ui";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function EmpresasClient({ 
  empresas
}: { 
  empresas: Empresa[]
}) {
  const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null);
  const tripuladas = empresas.filter((e) => !e.esAcelerada);
  const aceleradas = empresas.filter((e) => e.esAcelerada);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-32 relative overflow-hidden">
      <Navbar />
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-50 h-50 bg-blue-500/10 blur-[150px] -z-10 rounded-full mix-blend-screen"></div>
      <div className="absolute bottom-0 right-1/4 w-37.5 h-37.5 bg-cyan-500/10 blur-[120px] -z-10 rounded-full mix-blend-screen"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Link 
          href="/#empresas" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-12 transition-colors border max-w-fit px-4 py-2 border-white/5 bg-white/5 rounded-full"
        >
          <ArrowLeft size={16} />
          <span>Volver al inicio</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h1 className="text-5xl sm:text-7xl font-black mb-6 tracking-tight leading-none">
            Directorio <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-cyan-400 to-teal-400 animate-gradient">EmprendeLab</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl leading-relaxed font-medium">
            Conoce en detalle a todas las startups y emprendedores que forman parte de nuestro ecosistema de innovación.
          </p>
        </motion.div>

        {/* --- ACELERADAS SECTION --- */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-16 border-b border-white/5 pb-8">
            <div className="w-16 h-16 flex shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Rocket size={32} />
            </div>
            <div>
              <h2 className="text-4xl font-black text-white tracking-tight">Empresas Aceleradas</h2>
              <p className="text-cyan-400/60 font-black uppercase tracking-widest text-xs mt-1">Nuestras startups y empresas que han sido aceleradas por EmprendeLab</p>
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {tripuladas.map((empresa, idx) => (
              <EmpresaCard 
                key={idx} 
                empresa={empresa} 
                onClick={() => setSelectedEmpresa(empresa)} 
                variant="cyan"
              />
            ))}
            {tripuladas.length === 0 && (
              <p className="text-slate-400 col-span-3">No hay empresas aceleradas actualmente.</p>
            )}
          </motion.div>
        </div>

        {/* --- TRIPULADAS SECTION --- */}
        <div>
          <div className="flex items-center gap-4 mb-16 border-b border-white/5 pb-8">
            <div className="w-16 h-16 flex shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Sparkles size={32} />
            </div>
            <div>
              <h2 className="text-4xl font-black text-white tracking-tight">Ecosistema Tripulado</h2>
              <p className="text-blue-400/60 font-black uppercase tracking-widest text-xs mt-1">El portafolio de empresas tripuladas por EmprendeLab</p>
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {aceleradas.map((empresa, idx) => (
              <EmpresaCard 
                key={idx} 
                empresa={empresa} 
                onClick={() => setSelectedEmpresa(empresa)} 
                variant="blue"
              />
            ))}
            {aceleradas.length === 0 && (
              <p className="text-slate-400 col-span-3">No hay empresas tripuladas actualmente.</p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Empresa Modal */}
      <EmpresaModal 
        empresa={selectedEmpresa} 
        onClose={() => setSelectedEmpresa(null)} 
      />
    </div>
  );
}
