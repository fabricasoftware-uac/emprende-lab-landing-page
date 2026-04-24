import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import FloatingElements from "@/components/floating-elements";
import nextDynamic from "next/dynamic";

const InnovationUnits = nextDynamic(() => import("@/components/servicios"));
const Academia = nextDynamic(() => import("@/components/academia"));
const Transferencia = nextDynamic(() => import("@/components/transferencia"));
const SpaceLabProgram = nextDynamic(() => import("@/components/spacelab-program"));
const Proyectos = nextDynamic(() => import("@/components/proyectos"));
const Empresas = nextDynamic(() => import("@/components/empresas"));
const Becados = nextDynamic(() => import("@/components/becados"));
const Tienda = nextDynamic(() => import("@/components/sostenibilidad"));
const Equipo = nextDynamic(() => import("@/components/equipo"));
const Footer = nextDynamic(() => import("@/components/footer"));
import { db } from "@/db";
import { entradas } from "@/db/schema";
import { eq, and, ne, isNull, or } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function Home() {
  const tripulacionRecords = await db
    .select({ contenido: entradas.contenido })
    .from(entradas)
    .where(
      and(
        eq(entradas.coleccionSlug, "tripulacion-estelar"),
        or(isNull(entradas.activo), eq(entradas.activo, true))
      )
    );

  const team = tripulacionRecords.map((r: any) => ({
    name: r.contenido.nombre || r.contenido.name || "Sin Nombre",
    role: r.contenido.rol || r.contenido.role || "Sin Rol",
    desc: r.contenido.descripcion || r.contenido.desc || "Sin Descripción",
    image: r.contenido.imagen || r.contenido.image || null,
    imageColor: r.contenido.color || "from-blue-600 to-indigo-600",
  }));

  const empresasRecords = await db
    .select({ contenido: entradas.contenido })
    .from(entradas)
    .where(
      and(
        eq(entradas.coleccionSlug, "empresas"),
        or(isNull(entradas.activo), eq(entradas.activo, true))
      )
    ).limit(6);

  const empresasDb = empresasRecords.map((r: any) => ({
    name: r.contenido.nombre || r.contenido.name || "Sin Nombre",
    category: r.contenido.categoria || r.contenido.category || "Sin Categoría",
    desc: r.contenido.descripcion || r.contenido.desc || "Sin Descripción",
    encargado: r.contenido.encargado || "No especificado",
    logo: r.contenido.logo || r.contenido.imagen || r.contenido.image || null,
    esAcelerada: r.contenido.esAcelerada || false,
    instagram: r.contenido.instagram || null,
    otro: r.contenido.otro || null,
  }));

  const becadosRecords = await db
    .select({ contenido: entradas.contenido })
    .from(entradas)
    .where(
      and(
        eq(entradas.coleccionSlug, "becados"),
        or(isNull(entradas.activo), eq(entradas.activo, true))
      )
    );

  const becadosDb = becadosRecords.map((r: any) => ({
    nombre: r.contenido.nombre || r.contenido.name || "Sin Nombre",
    desc: r.contenido.descripcion || r.contenido.desc || "Sin Descripción",
    rol: r.contenido.rol || r.contenido.role || "Sin Rol",
    imagen: r.contenido.imagen || r.contenido.image || null,
    proyecto: r.contenido.proyecto || r.contenido.project || "EmprendeLab",
    color: "from-purple-400 to-pink-400",
    programa: r.contenido.programa || "EmprendeLab",
  }));

  const proyectosRecords = await db
    .select({ contenido: entradas.contenido })
    .from(entradas)
    .where(
      and(
        eq(entradas.coleccionSlug, "proyectos"),
        or(isNull(entradas.activo), eq(entradas.activo, true))
      )
    );

  const proyectosDb = proyectosRecords.map((r: any) => ({
    name: r.contenido.nombre || "Proyecto sin nombre",
    category: r.contenido.etiqueta || "Innovación",
    description: r.contenido.descripcion || "",
    img: r.contenido.imagen || "/placeholder_elab.svg",
    color: r.contenido.color || "from-purple-500/20 to-blue-500/20",
    glow: r.contenido.glow || "bg-purple-500/30",
    borderColor: r.contenido.borderColor || "border-purple-500/20",
    hoverBorder: r.contenido.hoverBorder || "hover:border-purple-500/50",
    site_url: r.contenido.link || null,
    span: r.contenido.span || "lg:col-span-6",
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
      <Proyectos projects={proyectosDb} />

      {/* Tienda */}
      <Tienda />

      {/* Empresas */}
      <Empresas empresas={empresasDb} />

      {/* Becados */}
      <Becados becados={becadosDb} />

      {/* Tripulación Estelar */}
      <Equipo team={team} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
