import { getEntradasBySlug } from "@/lib/data";
import type { EntradaRow } from "@/types/cms";
import EmpresasClient from "./empresas-client";

export const dynamic = "force-dynamic";

export default async function EmpresasPage() {
  const empresasRecords = await getEntradasBySlug("empresas");

  const empresasDb = empresasRecords.map((r: EntradaRow) => {
    const c = r.contenido as Record<string, unknown>;
    return {
      name: String(c.nombre || c.name || "Sin Nombre"),
      category: String(c.tipo || c.categoria || c.category || "Sin Categoría"),
      desc: String(c.descripcion || c.desc || "Sin Descripción"),
      encargado: String(c.encargado || "No especificado"),
      logo: (c.logo || c.imagen || c.image || undefined) as string | undefined,
      esAcelerada: Boolean(c.tipo === "acelerada" || c.esAcelerada),
      instagram: (c.instagram || undefined) as string | undefined,
      otro: (c.website || c.sitio_web || c.otro || undefined) as string | undefined,
    };
  });

  return <EmpresasClient empresas={empresasDb} />;
}
