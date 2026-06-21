import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingElements from "@/components/floating-elements";
import EquipoGrid from "./equipo-client";
import { getEntradasBySlug } from "@/lib/data";
import type { EntradaRow } from "@/types/cms";

export default async function EquipoPage() {
  const records = await getEntradasBySlug("tripulacion-estelar");

  const team = records.map((r: EntradaRow) => {
    const c = r.contenido as Record<string, unknown>;
    return {
      name: String(c.nombre || c.name || "Sin Nombre"),
      role: String(c.rol || c.role || "Sin Rol"),
      desc: String(c.descripcion || c.desc || "Sin Descripción"),
      image: (c.imagen || c.image || undefined) as string | undefined,
      imageColor: String(c.color || "from-blue-600 to-indigo-600"),
    };
  });

  return (
    <div className="relative min-h-screen bg-linear-to-b from-[#2e1a47] to-background text-foreground overflow-hidden">
      <FloatingElements />
      <Navbar />
      <EquipoGrid team={team} />
      <Footer />
    </div>
  );
}
