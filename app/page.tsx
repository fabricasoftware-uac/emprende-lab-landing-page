import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Academia from "@/components/academia";
import Transferencia from "@/components/transferencia";
import SpaceLabProgram from "@/components/spacelab-program";
import Proyectos from "@/components/proyectos";
import InnovationUnits from "@/components/innovation-units";
import Empresas from "@/components/empresas";
import Becados from "@/components/becados";
import Tienda from "@/components/tienda";
import Equipo from "@/components/equipo";
import Footer from "@/components/footer";
import FloatingElements from "@/components/floating-elements";
import { db } from "@/db";
import { entradas } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function Home() {
  const tripulacionRecords = await db
    .select({ contenido: entradas.contenido })
    .from(entradas)
    .where(eq(entradas.coleccionSlug, "tripulacion-estelar"));

  const team = tripulacionRecords.map((r: any) => ({
    name: r.contenido.nombre || r.contenido.name || "Sin Nombre",
    role: r.contenido.rol || r.contenido.role || "Sin Rol",
    desc: r.contenido.descripcion || r.contenido.desc || "Sin Descripción",
    image: r.contenido.imagen || r.contenido.image || null,
    imageColor: r.contenido.color || "from-blue-600 to-indigo-600",
  }));

  return (
    <div className="relative min-h-screen bg-linear-to-b from-[#2e1a47] to-background text-foreground overflow-hidden">
      {/* Cosmic background elements */}
      <FloatingElements />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Innovation Units Section (Servicios) */}
      <InnovationUnits />

      {/* Academia */}
      <Academia />

      {/* Transferencia de Conocimiento */}
      <Transferencia />

      {/* SpaceLab Program Section (Aceleración) */}
      <SpaceLabProgram />

      {/* Proyectos Destacados */}
      <Proyectos />

      {/* Tienda */}
      <Tienda />

      {/* Empresas */}
      <Empresas />

      {/* Becados */}
      <Becados />

      {/* Tripulación Estelar */}
      <Equipo team={team} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
