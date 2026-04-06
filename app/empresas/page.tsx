import { db } from "@/db";
import { entradas } from "@/db/schema";
import { eq } from "drizzle-orm";
import EmpresasClient from "./empresas-client";

export default async function EmpresasPage() {
  const empresasRecords = await db
    .select({ contenido: entradas.contenido })
    .from(entradas)
    .where(eq(entradas.coleccionSlug, "empresas"));

  const empresasDb = empresasRecords.map((r: any) => ({
    name: r.contenido.nombre || r.contenido.name || "Sin Nombre",
    category: r.contenido.categoria || r.contenido.category || "Sin Categoría",
    desc: r.contenido.descripcion || r.contenido.desc || "Sin Descripción",
    encargado: r.contenido.encargado || "No especificado",
    logo: r.contenido.logo || r.contenido.imagen || r.contenido.image || null,
    esAcelerada: r.contenido.esAcelerada || false,
    social: {
      instagram: r.contenido.instagram || null,
      website: r.contenido.website || r.contenido.sitio_web || r.contenido.otro || null,
    }
  }));

  return <EmpresasClient empresas={empresasDb} />;
}
