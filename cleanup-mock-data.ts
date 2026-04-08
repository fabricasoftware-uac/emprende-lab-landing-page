import { db } from "./db";
import { entradas } from "./db/schema";
import { sql, or } from "drizzle-orm";

async function cleanup() {
  console.log("🧹 Iniciando limpieza de datos de prueba en producción...");

  try {
    const result = await db.delete(entradas)
      .where(
        or(
          sql`${entradas.contenido} ->> 'nombre' LIKE 'Miembro de Equipo %'`,
          sql`${entradas.contenido} ->> 'nombre' LIKE 'Becado Estelar %'`,
          sql`${entradas.contenido} ->> 'nombre' LIKE 'Startup Innovadora %'`
        )
      );

    console.log("✅ Limpieza completada con éxito.");
  } catch (error) {
    console.error("❌ Error durante la limpieza:", error);
  }
}

cleanup();
