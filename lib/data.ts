import { db } from "@/db";
import { entradas } from "@/db/schema";
import { eq, and, isNull, or } from "drizzle-orm";
import type { EntradaRow } from "@/types/cms";

export async function getEntradasBySlug(
  slug: string,
  limit?: number,
): Promise<EntradaRow[]> {
  const query = db
    .select({ contenido: entradas.contenido })
    .from(entradas)
    .where(
      and(
        eq(entradas.coleccionSlug, slug),
        or(isNull(entradas.activo), eq(entradas.activo, true)),
      ),
    );

  if (limit) {
    return query.limit(limit);
  }

  return query;
}
