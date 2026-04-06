"use server";

import { db } from "@/db";
import { entradas } from "@/db/schema";
import { eq, sql, count, and } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getAdminDashboardData() {
  const session = await auth.api.getSession({ headers: await headers() });
  
  if (!session || session.user.role !== "user") {
    throw new Error("Unauthorized");
  }

  try {
    // 1. Total startups (empresas)
    const [totalEmpresas] = await db.select({ count: count() })
      .from(entradas)
      .where(eq(entradas.coleccionSlug, 'empresas'));

    // 2. Startups Aceleradas
    const [aceleradas] = await db.select({ count: count() })
      .from(entradas)
      .where(
        and(
          eq(entradas.coleccionSlug, 'empresas'),
          sql`${entradas.contenido} ->> 'esacelerada' = 'true'`
        )
      );

    // 3. Tripulación Activa
    const [tripulacion] = await db.select({ count: count() })
      .from(entradas)
      .where(eq(entradas.coleccionSlug, 'tripulacion-estelar'));

    // 4. Becados Actuales
    const [becados] = await db.select({ count: count() })
      .from(entradas)
      .where(eq(entradas.coleccionSlug, 'becados'));

    // 5. Recent Alerts (last 5 entries)
    const recentEntries = await db.select()
        .from(entradas)
        .orderBy(sql`${entradas.creadoEn} DESC`)
        .limit(5);

    return {
      stats: [
        {
          label: "Startups Aceleradas",
          value: aceleradas.count.toString(),
          trend: "+0%",
          color: "from-purple-500 to-indigo-500",
        },
        {
          label: "Tripulación Activa",
          value: tripulacion.count.toString(),
          trend: "+0%",
          color: "from-blue-500 to-cyan-500",
        },
        {
          label: "Becados Actuales",
          value: becados.count.toString(),
          trend: "+0%",
          color: "from-fuchsia-500 to-pink-500",
        },
        {
          label: "Total emprendimientos",
          value: totalEmpresas.count.toString(),
          trend: "+0%",
          color: "from-orange-500 to-red-500",
        },
      ],
      alerts: recentEntries.map(entry => ({
          id: entry.id,
          message: `Nuevo registro en ${entry.coleccionSlug}`,
          time: entry.creadoEn ? new Date(entry.creadoEn).toLocaleDateString() : "Recientemente",
          coleccion: entry.coleccionSlug
      }))
    };
  } catch (error) {
    console.error("Error fetching stats:", error);
    return null;
  }
}
