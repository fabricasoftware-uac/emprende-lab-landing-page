import { db } from "@/db";
import { entradas, proyectos, user } from "@/db/schema";
import { eq, sql, count, and } from "drizzle-orm";

export async function getAdminStats() {
  try {
    // 1. Total startups (empresas)
    const totalEmpresas = await db.select({ count: count() })
      .from(entradas)
      .where(eq(entradas.coleccionSlug, 'empresas'));

    // 2. Startups Aceleradas
    // Since contenido is jsonb, we use sql to filter
    const aceleradas = await db.select({ count: count() })
      .from(entradas)
      .where(
        and(
          eq(entradas.coleccionSlug, 'empresas'),
          sql`${entradas.contenido}->>'tipo' = 'acelerada'`
        )
      );

    // 3. Tripulación Activa
    const tripulacion = await db.select({ count: count() })
      .from(entradas)
      .where(eq(entradas.coleccionSlug, 'tripulacion'));

    // 4. Becados Actuales
    const becados = await db.select({ count: count() })
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
          value: aceleradas[0].count.toString(),
          trend: "+0%", // We don't have historical data yet
          color: "from-purple-500 to-indigo-500",
        },
        {
          label: "Tripulación Activa",
          value: tripulacion[0].count.toString(),
          trend: "+0%",
          color: "from-blue-500 to-cyan-500",
        },
        {
          label: "Becados Actuales",
          value: becados[0].count.toString(),
          trend: "+0%",
          color: "from-fuchsia-500 to-pink-500",
        },
        {
          label: "Empresas Aliadas",
          value: totalEmpresas[0].count.toString(),
          trend: "+0%",
          color: "from-orange-500 to-red-500",
        },
      ],
      alerts: recentEntries.map(entry => ({
          id: entry.id,
          message: `Nuevo registro en ${entry.coleccionSlug}`,
          time: entry.creadoEn ? new Date(entry.creadoEn).toLocaleString() : "Recientemente",
      }))
    };
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return null;
  }
}
