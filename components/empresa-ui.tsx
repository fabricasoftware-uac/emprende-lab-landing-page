"use client";

import { motion, AnimatePresence } from "framer-motion";
import { User, Instagram, Globe, Sparkles, ChevronRight, LayoutGrid, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface Empresa {
  name: string;
  category: string;
  desc: string;
  encargado: string;
  esAcelerada: boolean;
  logo?: string;
  instagram?: string;
  otro?: string;
}

interface EmpresaCardProps {
  empresa: Empresa;
  onClick: () => void;
  variant?: "cyan" | "blue";
}

export function EmpresaCard({ empresa, onClick, variant = "cyan" }: EmpresaCardProps) {
  const isBlue = variant === "blue" || empresa.esAcelerada;
  const colorClass = isBlue ? "cyan" : "cyan"; // Standardized to cyan as per latest user edits, but kept logic for flexibility
  const accentColor = isBlue ? "blue" : "cyan";
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className={`group cursor-pointer relative bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-8 hover:bg-slate-900/60 hover:border-${accentColor}-500/30 transition-all duration-700 backdrop-blur-xl flex flex-col h-100 hover:shadow-[0_20px_80px_-20px_rgba(${isBlue ? '59,130,246' : '34,211,238'},0.15)] max-w-sm`}
    >
      <div className="absolute top-0 right-0 p-8">
         <div className={`w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:bg-${accentColor}-500 group-hover:text-white transition-all duration-500`}>
            <LayoutGrid size={18} />
         </div>
      </div>

      <div className="flex flex-col gap-6 mb-4">
        <div className="relative w-40 h-16 transform group-hover:scale-105 transition-transform duration-700">
          <Image 
            src={empresa.logo || "/placeholder_elab.svg"} 
            alt={empresa.name} 
            fill
            className={`object-contain object-left relative z-10 drop-shadow-[0_0_15px_rgba(${isBlue ? '59,130,246' : '34,211,238'},0.2)] group-hover:drop-shadow-[0_0_20px_rgba(${isBlue ? '59,130,246' : '34,211,238'},0.4)] transition-all`} 
          />
        </div>
        
        <div>
          <h4 className={`text-2xl font-black text-white group-hover:text-${accentColor}-400 transition-colors tracking-tight line-clamp-1`}>
            {empresa.name}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-[10px] text-${accentColor}-400/60 uppercase font-black tracking-widest bg-${accentColor}-400/10 px-2 py-0.5 rounded-full border border-${accentColor}-400/20`}>
              {empresa.category}
            </span>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-slate-400 leading-relaxed font-medium group-hover:text-slate-300 transition-colors grow overflow-hidden">
        {empresa.desc}
      </p>

      <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full bg-${accentColor}-500/10 flex items-center justify-center border border-${accentColor}-500/20`}>
             <User size={14} className={`text-${accentColor}-400`} />
          </div>
          <div className="flex flex-col">
             <span className="text-[9px] uppercase font-black text-slate-500 tracking-wider">CEO / Lider</span>
             <span className="text-xs text-slate-200 font-bold">{empresa.encargado}</span>
          </div>
        </div>
        <ChevronRight size={16} className={`text-slate-600 group-hover:text-${accentColor}-400 group-hover:translate-x-1 transition-all`} />
      </div>
    </motion.div>
  );
}

interface EmpresaModalProps {
  empresa: Empresa | null;
  onClose: () => void;
}

export function EmpresaModal({ empresa, onClose }: EmpresaModalProps) {
  if (!empresa) return null;

  const accentColor = empresa.esAcelerada ? "blue" : "cyan";

  return (
    <Dialog open={!!empresa} onOpenChange={onClose}>
      <DialogContent className="md:min-w-200 lg:min-w-250 bg-slate-950/98 border-white/10 backdrop-blur-3xl text-white rounded-[2.5rem] p-0 overflow-hidden outline-hidden focus:ring-0">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col md:flex-row h-full max-h-[90vh] md:max-h-150"
          >
            {/* Modal Side: Identity */}
            <div className="hidden md:flex md:w-1/3 relative bg-slate-900 items-center justify-center p-12 shrink-0">
              <div className={`absolute inset-0 bg-linear-to-br from-${accentColor}-600/20 to-transparent`}></div>
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10"></div>
              
              <div className="relative w-full aspect-square max-w-60 flex items-center justify-center p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl">
                <Image 
                  src={empresa.logo || "/placeholder_elab.svg"} 
                  alt={empresa.name} 
                  fill
                  className={`object-contain p-10 drop-shadow-[0_0_30px_rgba(${empresa.esAcelerada ? '59,130,246' : '34,211,238'},0.3)]`} 
                />
              </div>

              <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col items-center text-center">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Estatus del Ecosistema</p>
                <div className={`flex items-center gap-2 text-${accentColor}-400`}>
                   <CheckCircle2 size={16} />
                   <span className="text-sm font-black uppercase tracking-tight">Active Member</span>
                </div>
              </div>
            </div>

            {/* Modal Side: Details */}
            <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col items-start relative bg-slate-950/50 overflow-y-auto custom-scrollbar ">
              <div className="mb-8">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-${accentColor}-400/10 border border-${accentColor}-400/20 text-[10px] font-bold tracking-widest uppercase text-${accentColor}-400`}>
                  Empresa del Ecosistema
                </div>
              </div>

              <DialogHeader className="mb-8 text-left p-0">
                <DialogTitle className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-2 leading-none p-0">
                  {empresa.name}
                </DialogTitle>
                <div className="flex items-center gap-4">
                   <p className={`text-${accentColor}-400 font-bold uppercase tracking-[0.2em] text-xs`}>
                    {empresa.category}
                   </p>
                   <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                   <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs">
                    {empresa.esAcelerada ? "Programa Aceleración" : "Miembro Activo"}
                   </p>
                </div>
                <div className={`h-1 w-20 bg-linear-to-r from-${accentColor}-500 to-transparent rounded-full mt-6`}></div>
              </DialogHeader>

              <div className="space-y-10 flex-1 pr-2 w-full ">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold tracking-[0.2em] text-slate-500 uppercase flex items-center gap-2">
                    <Sparkles size={14} className={`text-${accentColor}-400`} />
                    Visión y Propósito
                  </h4>
                  <p className="text-slate-300 text-lg leading-relaxed font-medium">
                    {empresa.desc || "Esta empresa forma parte del ecosistema estratégico de EmprendeLab, trabajando continuamente en soluciones innovadoras para su industria."}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-white/10">
                  <div className="space-y-2">
                     <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Liderazgo</h4>
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                           <User size={18} className={`text-${accentColor}-400`} />
                        </div>
                        <p className="text-sm font-bold text-white/90">{empresa.encargado}</p>
                     </div>
                  </div>
                  <div className="space-y-2">
                     <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Industria</h4>
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                           <Globe size={18} className={`text-${accentColor}-400`} />
                        </div>
                        <p className="text-sm font-bold text-white/90">{empresa.category}</p>
                     </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 w-full flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
                <div className="flex gap-4">
                  {empresa.instagram && (
                    <Link 
                      href={empresa.instagram} 
                      target="_blank"
                      className={`px-6 py-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 font-bold hover:bg-${accentColor}-500 hover:text-white transition-all group/link`}
                    >
                      <Instagram size={18} className="group-hover/link:scale-110 transition-transform" />
                      <span className="md:block hidden">Instagram</span>
                    </Link>
                  )}
                  {empresa.otro && empresa.otro.includes('http') && (
                    <Link 
                      href={empresa.otro} 
                      target="_blank"
                      className={`px-6 py-3 rounded-xl bg-${accentColor}-500 flex items-center gap-2 text-sm font-black text-black hover:bg-${accentColor}-400 transition-all group/link`}
                    >
                      <Globe size={18} className="group-hover/link:scale-110 transition-transform" />
                      <span className="md:block hidden">Sitio Web</span>
                    </Link>
                  )}
                </div>
                <button 
                  onClick={onClose}
                  className="px-10 py-4 rounded-2xl bg-white/5 border border-white/10 font-black text-slate-400 hover:text-white hover:bg-white/10 transition-all active:scale-95"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
