"use server";

import { db } from "@/db";
import { entradas } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

export async function saveEntrada(
  proyectoId: string,
  coleccionSlug: string,
  campos: any[],
  formData: any,
  recordId?: string
) {
  // 1. Build dynamic Zod Schema based on our campos definition
  const shape: any = {};
  for (const field of campos) {
    let validator;
    switch (field.type) {
      case "text":
      case "textarea":
        validator = z.string();
        break;
      case "number":
        validator = z.coerce.number();
        break;
      case "boolean":
        validator = z.boolean();
        break;
      case "image":
        validator = z.string();
        break;
      default:
        validator = z.any();
    }
    
    if (!field.required && field.type !== 'boolean') {
      validator = validator.optional().or(z.literal(""));
    }
    
    shape[field.id] = validator;
  }
  
  const schema = z.object(shape);

  // 2. Validate data
  const parsed = schema.safeParse(formData);
  
  if (!parsed.success) {
    return { error: parsed.error.format() };
  }

  try {
    if (recordId) {
      // Update existing
      await db.update(entradas)
        .set({ contenido: parsed.data, actualizadoEn: new Date() })
        .where(eq(entradas.id, recordId));
    } else {
      // Create new
      await db.insert(entradas).values({
        id: crypto.randomUUID(),
        proyectoId,
        coleccionSlug,
        contenido: parsed.data,
      });
    }
    return { success: true };
  } catch (error) {
    console.error("Error saving entrada", error);
    return { error: "Database error" };
  }
}
