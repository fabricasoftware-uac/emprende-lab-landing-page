"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Logo from "./logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  // Helper to dynamically route hashes to home if not on home
  const getHref = (hash: string) => (pathname === "/" ? hash : `/${hash}`);

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
              href={getHref("#academia")}
              className="text-sm font-bold hover:text-primary transition-colors"
            >
              Academia
            </Link>
            <Link
              href={getHref("#transferencia")}
              className="text-sm font-bold hover:text-primary transition-colors"
            >
              Transferencia
            </Link>
            <Link
              href={getHref("#program")}
              className="text-sm font-bold hover:text-primary transition-colors"
            >
              Aceleración
            </Link>
            <Link
              href={getHref("#innovation")}
              className="text-sm font-bold hover:text-primary transition-colors"
            >
              Servicios
            </Link>
            <Link
              href={getHref("#empresas")}
              className="text-sm font-bold hover:text-primary transition-colors"
            >
              Empresas
            </Link>
            <Link
              href={getHref("#becados")}
              className="text-sm font-bold hover:text-primary transition-colors"
            >
              Becados
            </Link>
            <Link
              href={getHref("#equipo")}
              className="text-sm font-bold hover:text-primary transition-colors"
            >
              Tripulación
            </Link>
            <Link href="https://ig.me/m/emprende_lab" className="px-6 py-2 rounded-full bg-linear-to-r from-purple-500 to-blue-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:scale-105 cursor-pointer">
              Contacto
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle mobile menu"
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
              className="lg:hidden pb-4 space-y-3 overflow-hidden"
            >
              <Link
                href={getHref("#academia")}
                className="block text-sm text-foreground/80 hover:text-primary transition-colors py-1.5"
                onClick={() => setIsOpen(false)}
              >
                Academia
              </Link>
              <Link
                href={getHref("#transferencia")}
                className="block text-sm text-foreground/80 hover:text-primary transition-colors py-1.5"
                onClick={() => setIsOpen(false)}
              >
                Transferencia
              </Link>
              <Link
                href={getHref("#program")}
                className="block text-sm text-foreground/80 hover:text-primary transition-colors py-1.5"
                onClick={() => setIsOpen(false)}
              >
                Aceleración
              </Link>
              <Link
                href={getHref("#proyectos")}
                className="block text-sm text-foreground/80 hover:text-primary transition-colors py-1.5"
                onClick={() => setIsOpen(false)}
              >
                Proyectos
              </Link>
              <Link
                href={getHref("#innovation")}
                className="block text-sm text-foreground/80 hover:text-primary transition-colors py-1.5"
                onClick={() => setIsOpen(false)}
              >
                Servicios
              </Link>
              <Link
                href={getHref("#empresas")}
                className="block text-sm text-foreground/80 hover:text-primary transition-colors py-1.5"
                onClick={() => setIsOpen(false)}
              >
                Empresas
              </Link>
              <Link
                href={getHref("#becados")}
                className="block text-sm text-foreground/80 hover:text-primary transition-colors py-1.5"
                onClick={() => setIsOpen(false)}
              >
                Becados
              </Link>
              <Link
                href={getHref("#tienda")}
                className="block text-sm text-foreground/80 hover:text-primary transition-colors py-1.5"
                onClick={() => setIsOpen(false)}
              >
                Tienda
              </Link>
              <Link
                href={getHref("#equipo")}
                className="block text-sm text-foreground/80 hover:text-primary transition-colors py-1.5"
                onClick={() => setIsOpen(false)}
              >
                Tripulación
              </Link>
              <Link href="https://ig.me/m/emprende_lab" className="px-6 py-2 rounded-full bg-linear-to-r from-purple-500 to-blue-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:scale-105 cursor-pointer">
              Contacto
            </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
