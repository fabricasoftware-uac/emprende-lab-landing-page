"use client";

import { motion } from "framer-motion";
import {
  Rocket,
  Users,
  GraduationCap,
  Building2,
  TrendingUp,
  Activity,
} from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    {
      label: "Startups Aceleradas",
      value: "42",
      icon: Rocket,
      color: "from-purple-500 to-indigo-500",
      trend: "+12%",
    },
    {
      label: "Tripulación Activa",
      value: "156",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      trend: "+5%",
    },
    {
      label: "Becados Actuales",
      value: "89",
      icon: GraduationCap,
      color: "from-fuchsia-500 to-pink-500",
      trend: "+24%",
    },
    {
      label: "Empresas Aliadas",
      value: "28",
      icon: Building2,
      color: "from-orange-500 to-red-500",
      trend: "+2%",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Centro de Control Estelar
          </h2>
          <p className="text-purple-200/60 mt-1">
            Resumen general de las métricas del laboratorio.
          </p>
        </div>
        <div className="px-4 py-2 rounded-full glass border border-purple-500/30 flex items-center gap-2 shrink-0">
          <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80] animate-pulse"></div>
          <span className="text-sm font-medium text-purple-100">
            Sistemas Operativos
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="glass rounded-2xl p-6 border border-white/5 relative overflow-hidden group hover:border-purple-500/30 transition-all"
          >
            <div
              className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${stat.color} opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:opacity-20 transition-opacity`}
            ></div>

            <div className="flex items-start justify-between relative z-10 w-full min-w-0">
              <div className="space-y-2 min-w-0">
                <p className="text-sm font-medium text-purple-200/60 truncate">
                  {stat.label}
                </p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-4xl font-bold text-white">
                    {stat.value}
                  </h3>
                  <span className="text-sm font-medium text-green-400 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.trend}
                  </span>
                </div>
              </div>
              <div
                className={`w-12 h-12 rounded-xl bg-linear-to-br ${stat.color} p-px shadow-lg shrink-0`}
              >
                <div className="w-full h-full bg-[#1a0f2e] rounded-xl flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex items-center text-xs text-purple-300/40">
              <Activity className="w-3 h-3 mr-1" />
              Actualizado hace 5 min
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="col-span-1 lg:col-span-2 glass rounded-2xl p-6 border border-white/5 min-h-100"
        >
          <h3 className="text-lg font-semibold text-white mb-4">
            Actividad Orbital (Actividad Reciente)
          </h3>
          <div className="flex h-75 items-center justify-center text-purple-300/40 border border-dashed border-white/10 rounded-xl">
            [Gráfico de Actividad de PocketBase aquí]
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="glass rounded-2xl p-6 border border-white/5 min-h-100"
        >
          <h3 className="text-lg font-semibold text-white mb-4">
            Alertas del Sistema
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex gap-4 p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa] shrink-0"></div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-purple-100 truncate">
                    Nuevo registro de empresa
                  </p>
                  <p className="text-xs text-purple-300/60 mt-1">
                    Hace 2 horas
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
