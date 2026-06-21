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
import { eq, and, isNull, or } from "drizzle-orm";
import type { EntradaRow } from "@/types/cms";

// OPTIMIZACIÓN CRÍTICA: En lugar de forzar renderizado dinámico en cada clic, 
// cacheamos la página en el servidor y la actualizamos cada 1 hora (3600 segundos).
export const revalidate = 3600;

export default async function Home() {
  // 1. Petición de Tripulación
  const tripulacionRecords = await db
    .select({ contenido: entradas.contenido })
    .from(entradas)
    .where(
      and(
        eq(entradas.coleccionSlug, "tripulacion-estelar"),
        or(isNull(entradas.activo), eq(entradas.activo, true))
      )
    );

  const team = tripulacionRecords.map((r: EntradaRow) => {
    const c = r.contenido as Record<string, unknown>;
    return {
      name: String(c.nombre || c.name || "Sin Nombre"),
      role: String(c.rol || c.role || "Sin Rol"),
      desc: String(c.descripcion || c.desc || "Sin Descripción"),
      image: (c.imagen || c.image || undefined) as string | undefined,
      imageColor: String(c.color || "from-blue-600 to-indigo-600"),
    };
  });

  // 2. Petición de Empresas
  const empresasRecords = await db
    .select({ contenido: entradas.contenido })
    .from(entradas)
    .where(
      and(
        eq(entradas.coleccionSlug, "empresas"),
        or(isNull(entradas.activo), eq(entradas.activo, true))
      )
    ).limit(6);

  const empresasDb = empresasRecords.map((r: EntradaRow) => {
    const c = r.contenido as Record<string, unknown>;
    return {
      name: String(c.nombre || c.name || "Sin Nombre"),
      category: String(c.categoria || c.category || "Sin Categoría"),
      desc: String(c.descripcion || c.desc || "Sin Descripción"),
      encargado: String(c.encargado || "No especificado"),
      logo: (c.logo || c.imagen || c.image || undefined) as string | undefined,
      esAcelerada: Boolean(c.esAcelerada),
      instagram: (c.instagram || undefined) as string | undefined,
      otro: (c.otro || undefined) as string | undefined,
    };
  });

  // 3. Petición de Becados
  const becadosRecords = await db
    .select({ contenido: entradas.contenido })
    .from(entradas)
    .where(
      and(
        eq(entradas.coleccionSlug, "becados"),
        or(isNull(entradas.activo), eq(entradas.activo, true))
      )
    );

  const becadosDb = becadosRecords.map((r: EntradaRow) => {
    const c = r.contenido as Record<string, unknown>;
    return {
      nombre: String(c.nombre || c.name || "Sin Nombre"),
      desc: String(c.descripcion || c.desc || "Sin Descripción"),
      rol: String(c.rol || c.role || "Sin Rol"),
      imagen: (c.imagen || c.image || undefined) as string | undefined,
      proyecto: String(c.proyecto || c.project || "EmprendeLab"),
      color: "from-purple-400 to-pink-400",
      programa: String(c.programa || "EmprendeLab"),
    };
  });

  // 4. Petición de Proyectos
  const proyectosRecords = await db
    .select({ contenido: entradas.contenido })
    .from(entradas)
    .where(
      and(
        eq(entradas.coleccionSlug, "proyectos"),
        or(isNull(entradas.activo), eq(entradas.activo, true))
      )
    );

  const proyectosDb = proyectosRecords.map((r: EntradaRow) => {
    const c = r.contenido as Record<string, unknown>;
    return {
      name: String(c.nombre || "Proyecto sin nombre"),
      category: String(c.etiqueta || "Innovación"),
      description: String(c.descripcion || ""),
      img: String(c.imagen || "/placeholder_elab.svg"),
      color: String(c.color || "from-purple-500/20 to-blue-500/20"),
      glow: String(c.glow || "bg-purple-500/30"),
      borderColor: String(c.borderColor || "border-purple-500/20"),
      hoverBorder: String(c.hoverBorder || "hover:border-purple-500/50"),
      site_url: (c.link || undefined) as string | undefined,
      span: String(c.span || "lg:col-span-6"),
    };
  });

  // OPTIMIZACIÓN SEO: JSON-LD Schema de Organización para que Google identifique la marca
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "EmprendeLab",
    "alternateName": "EmprendeLab Web",
    "url": "https://www.emprendelab-web.com",
    "logo": "https://www.emprendelab-web.com/dark_elab_favicon.png",
    "description": "Lanzamos tus ideas al espacio. Te acompañamos en cada etapa de tu viaje hacia el éxito a través de aceleración, consultoría y formación especializada.",
    "sameAs": [
      "https://www.instagram.com/emprende_lab"
    ]
  };

  return (
    <div className="relative min-h-screen bg-linear-to-b from-[#2e1a47] to-background text-foreground overflow-hidden">
      {/* Inyección de Datos Estructurados */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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