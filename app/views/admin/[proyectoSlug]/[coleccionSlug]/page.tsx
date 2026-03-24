import { db } from "@/db";
import { proyectos, esquemas, entradas } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { notFound } from "next/navigation";
import { DynamicCollectionClient } from "./client-page";

interface Props {
  params: Promise<{ proyectoSlug: string; coleccionSlug: string }>;
}

export default async function ColeccionPage({ params }: Props) {
  const { proyectoSlug, coleccionSlug } = await params;

  // 1. Fetch Proyecto
  const [proyecto] = await db
    .select()
    .from(proyectos)
    .where(eq(proyectos.slug, proyectoSlug));
  if (!proyecto) return notFound();

  // 2. Fetch Esquema
  const [esquema] = await db
    .select()
    .from(esquemas)
    .where(
      and(
        eq(esquemas.proyectoId, proyecto.id),
        eq(esquemas.slug, coleccionSlug),
      ),
    );

  if (!esquema) return notFound();

  // 3. Fetch Data (Entradas)
  const records = await db
    .select()
    .from(entradas)
    .where(
      and(
        eq(entradas.proyectoId, proyecto.id),
        eq(entradas.coleccionSlug, coleccionSlug),
      ),
    )
    .orderBy(entradas.creadoEn);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          {esquema.nombre}
        </h2>
        <p className="text-purple-300/60 font-medium">
          {esquema.esRegistroUnico
            ? "Configuración Única (Singleton)"
            : "Gestión de Colección"}
        </p>
      </div>
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        <DynamicCollectionClient
          proyecto={proyecto}
          esquema={esquema}
          initialRecords={records} // passed as props
        />
      </div>
    </div>
  );
}
