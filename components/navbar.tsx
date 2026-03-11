'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center glow-pulse">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent hidden sm:block">
              EmprendeLab
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#about" className="text-sm text-foreground/80 hover:text-primary transition-colors">
              Nosotros
            </Link>
            <Link href="#program" className="text-sm text-foreground/80 hover:text-primary transition-colors">
              SpaceLab
            </Link>
            <Link href="#startups" className="text-sm text-foreground/80 hover:text-primary transition-colors">
              Emprendimientos
            </Link>
            <Link href="#innovation" className="text-sm text-foreground/80 hover:text-primary transition-colors">
              Unidades
            </Link>
            <button className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:scale-105">
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
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link href="#about" className="block text-sm text-foreground/80 hover:text-primary transition-colors py-2">
              Nosotros
            </Link>
            <Link href="#program" className="block text-sm text-foreground/80 hover:text-primary transition-colors py-2">
              SpaceLab
            </Link>
            <Link href="#startups" className="block text-sm text-foreground/80 hover:text-primary transition-colors py-2">
              Emprendimientos
            </Link>
            <Link href="#innovation" className="block text-sm text-foreground/80 hover:text-primary transition-colors py-2">
              Unidades
            </Link>
            <button className="w-full px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all">
              Contacto
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
