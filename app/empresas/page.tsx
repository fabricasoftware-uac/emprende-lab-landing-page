import { db } from "@/db";
import { entradas } from "@/db/schema";
import { eq, and, or, isNull, sql } from "drizzle-orm";
import EmpresasClient from "./empresas-client";

export const dynamic = "force-dynamic";

export default async function EmpresasPage() {
  // Fetch All Active Records
  const empresasRecords = await db
    .select({ contenido: entradas.contenido })
    .from(entradas)
    .where(
      and(
        eq(entradas.coleccionSlug, "empresas"),
        or(isNull(entradas.activo), eq(entradas.activo, true))
      )
    )
    .orderBy(sql`${entradas.creadoEn} DESC`);

  const empresasDb = empresasRecords.map((r: any) => ({
    name: r.contenido.nombre || r.contenido.name || "Sin Nombre",
    category: r.contenido.tipo || r.contenido.categoria || r.contenido.category || "Sin Categoría",
    desc: r.contenido.descripcion || r.contenido.desc || "Sin Descripción",
    encargado: r.contenido.encargado || "No especificado",
    logo: r.contenido.logo || r.contenido.imagen || r.contenido.image || null,
    esAcelerada: r.contenido.tipo === "acelerada" || r.contenido.esAcelerada || false,
    instagram: r.contenido.instagram || null,
    otro: r.contenido.website || r.contenido.sitio_web || r.contenido.otro || null,
  }));

  return <EmpresasClient empresas={empresasDb} />;
}
