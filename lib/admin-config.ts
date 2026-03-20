export type FieldType = "text" | "number" | "textarea" | "file" | "select";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  options?: { label: string; value: string }[]; // For select fields
  required?: boolean;
}

export interface CollectionConfig {
  id: string;
  name: string;
  description: string;
  fields: FieldConfig[];
}

export const adminConfig: Record<string, CollectionConfig> = {
  tripulacion: {
    id: "tripulacion",
    name: "Tripulación Estelar",
    description: "Gestiona los miembros del equipo principal de EmprendeLab",
    fields: [
      { name: "nombre", label: "Nombre", type: "text", required: true },
      { name: "rol", label: "Rol", type: "text", required: true },
      { name: "descripcion", label: "Descripción", type: "textarea", required: true },
      { name: "imagen", label: "Avatar / Imagen", type: "file", required: true },
    ],
  },
  becados: {
    id: "becados",
    name: "Becados",
    description: "Gestiona los estudiantes becados activos en el programa",
    fields: [
      { name: "nombre", label: "Nombre", type: "text", required: true },
      { name: "rol", label: "Rol / Área de estudio", type: "text", required: true },
      { name: "descripcion", label: "Descripción", type: "textarea", required: true },
      { name: "imagen", label: "Avatar / Imagen", type: "file", required: true },
    ],
  },
  empresas: {
    id: "empresas",
    name: "Empresas",
    description: "Administra las startups aliadas de EmprendeLab",
    fields: [
      { name: "nombre", label: "Nombre de la Empresa", type: "text", required: true },
      { name: "descripcion", label: "Descripción", type: "textarea", required: true },
      { name: "logo", label: "Logo de la Empresa", type: "file", required: true },
      {
        name: "tipo",
        label: "Tipo de Startup",
        type: "select",
        options: [
          { label: "Acelerada", value: "acelerada" },
          { label: "Tripulada", value: "tripulada" },
        ],
        required: true,
      },
      { name: "area", label: "Área de Enfoque", type: "text", required: true },
    ],
  },
};
