"use client";

import { motion } from "framer-motion";
import {
  Rocket,
  Users,
  GraduationCap,
  Building2,
  TrendingUp,
  Activity,
  AlertCircle,
  Clock,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getAdminDashboardData } from "@/app/actions/stats";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getAdminDashboardData();
        setData(result);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const statIcons = {
    "Startups Aceleradas": Rocket,
    "Tripulación Activa": Users,
    "Becados Actuales": GraduationCap,
    "Empresas Aliadas": Building2,
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-20 w-1/3 bg-white/5 animate-pulse rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 glass rounded-2xl animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-64 glass rounded-2xl animate-pulse" />
          <div className="h-64 glass rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

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
        {data?.stats.map((stat: any, i: number) => {
          const Icon = statIcons[stat.label as keyof typeof statIcons] || Activity;
          return (
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
                    {stat.trend !== "+0%" && (
                      <span className="text-sm font-medium text-green-400 flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {stat.trend}
                      </span>
                    )}
                  </div>
                </div>
                <div
                  className={`w-12 h-12 rounded-xl bg-linear-to-br ${stat.color} p-px shadow-lg shrink-0`}
                >
                  <div className="w-full h-full bg-[#1a0f2e] rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/5 flex items-center text-xs text-purple-300/40">
                <Clock className="w-3 h-3 mr-1" />
                Actualizado en tiempo real
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="col-span-1 lg:col-span-2 glass rounded-2xl p-6 border border-white/5"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">
              Actividad Reciente en el Gantry
            </h3>
            <span className="text-xs text-purple-300/40 px-2 py-1 rounded-md border border-white/5 bg-white/5">
              Últimos registros
            </span>
          </div>
          
          <div className="space-y-1">
            {data?.alerts && data.alerts.length > 0 ? (
              data.alerts.map((alert: any, i: number) => (
                <div 
                  key={alert.id}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 group"
                >
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors">
                    <Activity className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {alert.message}
                    </p>
                    <p className="text-xs text-purple-300/40">
                      Colección: <span className="text-purple-300/60 uppercase tracking-wider text-[10px]">{alert.coleccion}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-purple-300/60">{alert.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-purple-300/20">
                <AlertCircle className="w-12 h-12 mb-2 opacity-20" />
                <p>No hay actividad registrada aún</p>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="glass rounded-2xl p-6 border border-white/5"
        >
          <h3 className="text-lg font-semibold text-white mb-4">
            Alertas del Sistema
          </h3>
          <div className="space-y-4">
            <div className="flex gap-4 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 hover:bg-blue-500/10 transition-colors">
              <div className="w-2 h-2 mt-2 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa] shrink-0"></div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-blue-100 truncate">
                  Configuración del CMS activa
                </p>
                <p className="text-xs text-blue-300/60 mt-1">
                  El sistema está listo para recibir nuevos tripulantes.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4 p-4 rounded-xl bg-purple-500/5 border border-purple-500/10 hover:bg-purple-500/10 transition-colors">
              <div className="w-2 h-2 mt-2 rounded-full bg-purple-400 shadow-[0_0_8px_#a855f7] shrink-0"></div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-purple-100 truncate">
                  Sincronización completa
                </p>
                <p className="text-xs text-purple-300/60 mt-1">
                  Base de datos sincronizada con el motor Drizzle.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
