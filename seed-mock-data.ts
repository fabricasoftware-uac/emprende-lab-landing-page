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

  try {
    console.log("Inserting Tripulación...");
    await db.insert(entradas).values(tripulacionData);
    
    console.log("Inserting Becados...");
    await db.insert(entradas).values(becadosData);
    
    console.log("Inserting Empresas...");
    await db.insert(entradas).values(empresasData);

    console.log("✅ Datos de prueba insertados con éxito!");
  } catch (error) {
    console.error("❌ Error al insertar datos:", error);
  }
}

seed();
