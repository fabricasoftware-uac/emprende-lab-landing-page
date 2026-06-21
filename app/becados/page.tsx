import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingElements from "@/components/floating-elements";
import BecadosGrid from "./becados-client";
import { getEntradasBySlug } from "@/lib/data";
import type { EntradaRow } from "@/types/cms";

export default async function BecadosPage() {
  const records = await getEntradasBySlug("becados");

  const becados = records.map((r: EntradaRow) => {
    const c = r.contenido as Record<string, unknown>;
    return {
      nombre: String(c.nombre || c.name || "Sin Nombre"),
      desc: String(c.descripcion || c.desc || "Sin Descripción"),
      rol: String(c.rol || c.role || "Sin Rol"),
      imagen: (c.imagen || c.image || undefined) as string | undefined,
      proyecto: String(c.proyecto || c.project || "EmprendeLab"),
      color: "from-purple-400 to-pink-400",
      programa: String(c.programa || "EmprendeLab"),
      posicionImagen: (c.posicionImagen as string) || "center center",
    };
  });

  return (
    <div className="relative min-h-screen min-h-dvh bg-linear-to-b from-[#2e1a47] to-background text-foreground overflow-hidden">
      <FloatingElements />
      <Navbar />
      <BecadosGrid becados={becados} />
      <Footer />
    </div>
  );
}
