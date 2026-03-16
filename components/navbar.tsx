"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Logo from "./logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 glass border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo_elab_bg.svg"
              alt="EmprendeLab"
              width={190}
              height={40}
              className="object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="#academia"
              className="text-sm font-bold hover:text-primary transition-colors"
            >
              Academia
            </Link>
            <Link
              href="#transferencia"
              className="text-sm font-bold hover:text-primary transition-colors"
            >
              Transferencia
            </Link>
            <Link
              href="#program"
              className="text-sm font-bold hover:text-primary transition-colors"
            >
              Aceleración
            </Link>
            <Link
              href="#innovation"
              className="text-sm font-bold hover:text-primary transition-colors"
            >
              Servicios
            </Link>
            <Link
              href="#empresas"
              className="text-sm font-bold hover:text-primary transition-colors"
            >
              Empresas
            </Link>
            <Link
              href="#tienda"
              className="text-sm font-bold hover:text-primary transition-colors"
            >
              Tienda
            </Link>
            <Link
              href="#equipo"
              className="text-sm font-bold hover:text-primary transition-colors"
            >
              Tripulación
            </Link>
            <button className="px-6 py-2 rounded-full bg-linear-to-r from-purple-500 to-blue-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:scale-105 cursor-pointer">
              Contacto
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pb-4 space-y-3 overflow-hidden"
            >
              <Link
                href="#academia"
                className="block text-sm text-foreground/80 hover:text-primary transition-colors py-1.5"
                onClick={() => setIsOpen(false)}
              >
                Academia
              </Link>
              <Link
                href="#transferencia"
                className="block text-sm text-foreground/80 hover:text-primary transition-colors py-1.5"
                onClick={() => setIsOpen(false)}
              >
                Transferencia
              </Link>
              <Link
                href="#program"
                className="block text-sm text-foreground/80 hover:text-primary transition-colors py-1.5"
                onClick={() => setIsOpen(false)}
              >
                Aceleración
              </Link>
              <Link
                href="#proyectos"
                className="block text-sm text-foreground/80 hover:text-primary transition-colors py-1.5"
                onClick={() => setIsOpen(false)}
              >
                Proyectos
              </Link>
              <Link
                href="#innovation"
                className="block text-sm text-foreground/80 hover:text-primary transition-colors py-1.5"
                onClick={() => setIsOpen(false)}
              >
                Servicios
              </Link>
              <Link
                href="#empresas"
                className="block text-sm text-foreground/80 hover:text-primary transition-colors py-1.5"
                onClick={() => setIsOpen(false)}
              >
                Empresas
              </Link>
              <Link
                href="#becados"
                className="block text-sm text-foreground/80 hover:text-primary transition-colors py-1.5"
                onClick={() => setIsOpen(false)}
              >
                Becados
              </Link>
              <Link
                href="#tienda"
                className="block text-sm text-foreground/80 hover:text-primary transition-colors py-1.5"
                onClick={() => setIsOpen(false)}
              >
                Tienda
              </Link>
              <Link
                href="#equipo"
                className="block text-sm text-foreground/80 hover:text-primary transition-colors py-1.5"
                onClick={() => setIsOpen(false)}
              >
                Tripulación
              </Link>
              <button className="w-full px-6 py-2 rounded-full bg-linear-to-r from-purple-500 to-blue-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all mt-2">
                Contacto
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
