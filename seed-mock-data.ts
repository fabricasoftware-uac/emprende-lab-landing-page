import { db } from "./db";
import { entradas } from "./db/schema";
import crypto from "crypto";

const PROYECTO_ID = "4392ff8b-327d-417e-a2fb-db485af6e4cd"; // emprendelab web

async function seed() {
  console.log("🌱 Iniciando siembra de datos de prueba...");

  // 1. Tripulación (15 entries)
  const tripulacionData = Array.from({ length: 15 }).map((_, i) => ({
    id: crypto.randomUUID(),
    proyectoId: PROYECTO_ID,
    coleccionSlug: "tripulacion-estelar",
    contenido: {
      nombre: `Miembro de Equipo ${i + 1}`,
      rol: i % 3 === 0 ? "Director" : i % 3 === 1 ? "Mentor" : "Especialista",
      descripcion: `Esta es una descripción de prueba para el miembro del equipo número ${i + 1}. Experto en desarrollo de ecosistemas emprendedores.`,
      imagen: null,
    },
  }));

  // 2. Becados (15 entries)
  const becadosData = Array.from({ length: 15 }).map((_, i) => ({
    id: crypto.randomUUID(),
    proyectoId: PROYECTO_ID,
    coleccionSlug: "becados",
    contenido: {
      nombre: `Becado Estelar ${i + 1}`,
      rol: i % 2 === 0 ? "Desarrollo Web" : "Marketing Digital",
      descripcion: `Becado número ${i + 1} destacando en el programa de formación técnica de EmprendeLab.`,
      imagen: null,
    },
  }));

  // 3. Empresas (15 entries)
  const empresasData = Array.from({ length: 15 }).map((_, i) => ({
    id: crypto.randomUUID(),
    proyectoId: PROYECTO_ID,
    coleccionSlug: "empresas",
    contenido: {
      nombre: `Startup Innovadora ${i + 1}`,
      descripcion: `Empresa número ${i + 1} enfocada en soluciones tecnológicas disruptivas para el mercado latinoamericano.`,
      logo: null,
      tipo: i % 2 === 0 ? "acelerada" : "tripulada",
      area: i % 3 === 0 ? "Fintech" : i % 3 === 1 ? "EdTech" : "AgroTech",
    },
  }));

  // 4. Proyectos
  const proyectosData = [
    {
      id: crypto.randomUUID(),
      proyectoId: PROYECTO_ID,
      coleccionSlug: "proyectos",
      contenido: {
        nombre: "Fundación Mundo Mujer",
        categoria: "Transformación Digital",
        descripcion: "Emprendelab, en alianza con la Fundación Mundo Mujer, desarrolló un programa de incubación y aceleración para 20 ganadoras del Premio Leonor Melo de Velasco, brindando formación en áreas clave y estrategias de posicionamiento.",
        imagen: "/mundo_mujer.webp",
        url: "https://www.fmm.org.co/",
        span: "lg:col-span-12 xl:col-span-7",
        color: "from-purple-500/20 to-pink-500/20",
        glow: "bg-purple-500/30",
        borderColor: "border-purple-500/20",
        hoverBorder: "hover:border-purple-500/50",
      },
    },
    {
      id: crypto.randomUUID(),
      proyectoId: PROYECTO_ID,
      coleccionSlug: "proyectos",
      contenido: {
        nombre: "Bantotal",
        categoria: "Banca",
        descripcion: "Bantotal es la plataforma bancaria líder en América Latina, que resuelve la operativa bancaria de misión crítica de Bancos, Financieras, Bancos Digitales y Fintech.",
        imagen: "/bantotal.webp",
        url: "https://www.bantotal.com/",
        span: "lg:col-span-12 xl:col-span-5",
        color: "from-blue-500/20 to-cyan-500/20",
        glow: "bg-blue-500/30",
        borderColor: "border-blue-500/20",
        hoverBorder: "hover:border-blue-500/50",
      },
    },
    {
      id: crypto.randomUUID(),
      proyectoId: PROYECTO_ID,
      coleccionSlug: "proyectos",
      contenido: {
        nombre: "PopayánInn",
        categoria: "Emprendimiento",
        descripcion: "Programa de entrenamiento junto a la Universidad Autónoma del Cauca y la Alcaldía de Popayán que fortaleció a más de 100 emprendedores en habilidades clave.",
        imagen: "/popayaninn.webp",
        url: "https://popayaninn.com/",
        span: "lg:col-span-12 xl:col-span-7",
        color: "from-orange-500/20 to-yellow-500/20",
        glow: "bg-orange-500/30",
        borderColor: "border-orange-500/20",
        hoverBorder: "hover:border-orange-500/50",
      },
    },
    {
      id: crypto.randomUUID(),
      proyectoId: PROYECTO_ID,
      coleccionSlug: "proyectos",
      contenido: {
        nombre: "Popayán UP",
        categoria: "Emprendimiento",
        descripcion: "Primer hub de innovación de la ciudad, uniendo academia y gobierno para impulsar el crecimiento y consolidación de negocios locales.",
        imagen: "/popayanup.webp",
        url: "https://archivo.uniautonoma.edu.co/actualidad/noticias/popayanup-primer-hub-innovacion-fue-exito-rotundo",
        span: "lg:col-span-12 xl:col-span-5",
        color: "from-orange-500/20 to-yellow-500/20",
        glow: "bg-orange-500/30",
        borderColor: "border-orange-500/20",
        hoverBorder: "hover:border-orange-500/50",
      },
    }
  ];

  try {
    console.log("Inserting Tripulación...");
    await db.insert(entradas).values(tripulacionData);
    
    console.log("Inserting Becados...");
    await db.insert(entradas).values(becadosData);
    
    console.log("Inserting Empresas...");
    await db.insert(entradas).values(empresasData);

    console.log("Inserting Proyectos...");
    await db.insert(entradas).values(proyectosData);

    console.log("✅ Datos de prueba insertados con éxito!");
  } catch (error) {
    console.error("❌ Error al insertar datos:", error);
  }
}

seed();
