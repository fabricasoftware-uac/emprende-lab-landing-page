"use client";

import { motion } from "framer-motion";
import {
  ShoppingBag,
  ArrowUpRight,
  Leaf,
  Coffee,
  Users,
  Monitor,
  Rocket,
} from "lucide-react";
import Image from "next/image";

const items = [
  {
    name: "Tienda",
    category: "Comercio",
    logoIcon: <ShoppingBag />,
    desc: "Marketplace de productos y servicios creados por nuestros emprendedores de la comunidad.",
    color: "from-green-500 to-emerald-500",
    img: "/tienda.webp",
  },
  {
    name: "Coworking",
    category: "Espacios",
    logoIcon: <Users />,
    desc: "Zonas de trabajo colaborativo para fomentar el networking y la cocreación de ideas.",
    color: "from-blue-500 to-indigo-500",
    img: "/coworking.webp",
  },
  {
    name: "Sala de Juntas",
    category: "Espacios",
    logoIcon: <Monitor />,
    desc: "Espacios equipados con tecnología para reuniones ejecutivas, pitchs y negociaciones.",
    color: "from-purple-500 to-pink-500",
    img: "/sala_de_juntas.webp",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Tienda() {
  return (
    <section id="tienda" className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-green-900/10 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-green-500/10 rounded-full border border-green-500/20 text-green-400 glow-pulse">
              <ShoppingBag size={32} />
            </div>
          </div>
          <span className="text-sm font-bold tracking-widest text-green-400 uppercase mb-4 block">
            Estrategias de Sostenibilidad
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-linear-to-r from-green-300 via-emerald-300 to-teal-300 bg-clip-text text-transparent">
              Sostenibilidad
            </span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Explora y adquiere los productos y servicios innovadores creados en
            nuestro ecosistema.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center"
        >
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="glass rounded-3xl overflow-hidden group flex flex-col"
            >
              {/* Image / Header placeholder */}
              <div
                className={`h-40 bg-linear-to-br ${item.color} relative overflow-hidden flex items-center justify-center`}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>

                {/* Image Placeholder */}
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
                />

                <div className="relative z-10 p-4 bg-black/30 rounded-2xl backdrop-blur-sm border border-white/20 text-white scale-125 group-hover:scale-150 transition-transform duration-500 shadow-xl">
                  {item.logoIcon}
                </div>
              </div>

              {/* Body */}
              <div className="p-8 flex flex-col flex-grow relative">
                <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-foreground/70 mb-4 w-fit">
                  {item.category}
                </span>

                <h3 className="text-2xl font-bold text-white mb-4">
                  {item.name}
                </h3>

                <p className="text-foreground/70 leading-relaxed mb-8 flex-grow">
                  {item.desc}
                </p>

                <button className="w-full py-3 px-4 rounded-xl font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-2 transition-all">
                  Conocer más
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
