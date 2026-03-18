"use client";

import {
  Mail,
  MapPin,
  Phone,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Logo from "./logo";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-gradient-to-b from-transparent to-purple-900/10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <Logo size={24} />
              <Image
                src="/placeholder_elab.svg"
                alt="EmprendeLab"
                width={140}
                height={28}
              />
            </Link>
            <p className="text-sm text-foreground/60 leading-relaxed">
              Un ecosistema universitario de innovación que impulsa el
              emprendimiento a través de aceleración, consultoría y formación.
            </p>
          </div>

          {/* About Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Nosotros</h4>
            <nav className="space-y-2">
              {[{ label: "Quiénes Somos", href: "#about" }, { label: "Equipo", href: "#equipo" }, { label: "Tienda", href: "#tienda" }, { label: "Administración", href: "/auth/login"}].map(
                (link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block text-sm text-foreground/60 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </nav>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Servicios</h4>
            <nav className="space-y-2">
              {[{ label: "Centro de Propulsión", href: "#about" }, { label: "Transferencia de Conocimiento", href: "#transferencia" }, { label: "Academia", href: "#academia" }, { label: "SpaceLab", href: "#program" }].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-foreground/60 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contacto</h4>
            <div className="space-y-3">
              <a
                href="mailto:hello@emprendelab.com"
                className="flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors group"
              >
                <Mail size={16} className="flex-shrink-0" />
                <span>hello@emprendelab.com</span>
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors group"
              >
                <Phone size={16} className="flex-shrink-0" />
                <span>+1 (234) 567-890</span>
              </a>
              <div className="flex items-center gap-2 text-sm text-foreground/60">
                <MapPin size={16} className="flex-shrink-0 flex-grow-0" />
                <span>Popayán, Cauca</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-foreground/50 flex flex-wrap items-center justify-center sm:justify-start gap-1">
            © {new Date().getFullYear()}{" "}
            <Image
              src="/placeholder_elab.svg"
              alt="EmprendeLab"
              width={100}
              height={20}
              className="inline align-middle -mt-0.5"
            />
            . Todos los derechos reservados.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[
              { icon: Linkedin, href: "#", label: "LinkedIn" },
              { icon: Twitter, href: "#", label: "Twitter" },
              { icon: Instagram, href: "#", label: "Instagram" },
            ].map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 rounded-lg hover:bg-white/10 text-foreground/60 hover:text-primary transition-all"
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-6">
            {["Privacidad", "Términos"].map((link) => (
              <Link
                key={link}
                href="#"
                className="text-sm text-foreground/50 hover:text-foreground/80 transition-colors"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
