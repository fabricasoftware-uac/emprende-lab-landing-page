import { pgTable, text, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  role: text("role"),
  banned: boolean("banned").default(false),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
  deletedAt: timestamp("deleted_at"),
});

// ... internal tables stay same correctly ...

export const session = pgTable("session", {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expiresAt").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("createdAt").notNull(),
    updatedAt: timestamp("updatedAt").notNull(),
    ipAddress: text("ipAddress"),
    userAgent: text("userAgent"),
    userId: text("userId")
        .notNull()
        .references(() => user.id),
});

export const account = pgTable("account", {
    id: text("id").primaryKey(),
    accountId: text("accountId").notNull(),
    providerId: text("providerId").notNull(),
    userId: text("userId")
        .notNull()
        .references(() => user.id),
    accessToken: text("accessToken"),
    refreshToken: text("refreshToken"),
    idToken: text("idToken"),
    accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
    refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("createdAt").notNull(),
    updatedAt: timestamp("updatedAt").notNull(),
});

export const verification = pgTable("verification", {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expiresAt").notNull(),
    createdAt: timestamp("createdAt").notNull(),
    updatedAt: timestamp("updatedAt").notNull(),
});

export const proyectos = pgTable("proyectos", {
    id: text("id").primaryKey(),
    nombre: text("nombre").notNull(),
    descripcion: text("descripcion").notNull(),
    estado: text("estado").notNull().default("active"), // 'active' | 'archived' | 'completed'
    slug: text("slug").notNull(),
    user_id: text("user_id").references(() => user.id),
    template: text("template").notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

// Molde o tipo de contenido
export const esquemas = pgTable("esquemas", {
    id: text("id").primaryKey(),
    proyectoId: text("proyecto_id").notNull().references(() => proyectos.id),
    nombre: text("nombre").notNull(), // Nombre legible: "Nuestro Equipo" 
    slug: text("slug").notNull(), // Nombre técnico: "nuestro-equipo" 
    campos: jsonb("campos").notNull(), // El JSON con los tipos 
    esRegistroUnico: boolean("es_registro_unico").default(false), // true para 'Configuración' 
    activo: boolean("activo").default(true), // Estado de la colección
    creadoEn: timestamp("creado_en").defaultNow(),
});

// Los datos reales que el cliente llena 
export const entradas = pgTable("entradas", {
    id: text("id").primaryKey(),
    proyectoId: text("proyecto_id").notNull().references(() => proyectos.id),
    coleccionSlug: text("coleccion_slug").notNull(), // Para saber si es 'equipo' o 'becado' 
    contenido: jsonb("contenido").notNull(), // El JSON con la data dinámica 
    creadoEn: timestamp("creado_en").defaultNow(),
    actualizadoEn: timestamp("actualizado_en").defaultNow().$onUpdate(() => new Date()),
});

