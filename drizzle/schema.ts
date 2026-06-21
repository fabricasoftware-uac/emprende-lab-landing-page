import { pgTable, foreignKey, text, jsonb, boolean, timestamp, unique } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const esquemas = pgTable("esquemas", {
	id: text().primaryKey().notNull(),
	proyectoId: text("proyecto_id").notNull(),
	nombre: text().notNull(),
	slug: text().notNull(),
	campos: jsonb().notNull(),
	esRegistroUnico: boolean("es_registro_unico").default(false),
	creadoEn: timestamp("creado_en", { mode: 'string' }).defaultNow(),
	activo: boolean().default(true),
}, (table) => [
	foreignKey({
			columns: [table.proyectoId],
			foreignColumns: [proyectos.id],
			name: "esquemas_proyecto_id_proyectos_id_fk"
		}),
]);

export const verification = pgTable("verification", {
	id: text().primaryKey().notNull(),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: timestamp({ mode: 'string' }).notNull(),
	createdAt: timestamp({ mode: 'string' }).notNull(),
	updatedAt: timestamp({ mode: 'string' }).notNull(),
});

export const user = pgTable("user", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	emailVerified: boolean("email_verified").default(false).notNull(),
	image: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	role: text(),
	banned: boolean().default(false),
	banReason: text("ban_reason"),
	banExpires: timestamp("ban_expires", { mode: 'string' }),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
}, (table) => [
	unique("user_email_unique").on(table.email),
]);

export const account = pgTable("account", {
	id: text().primaryKey().notNull(),
	accountId: text().notNull(),
	providerId: text().notNull(),
	userId: text().notNull(),
	accessToken: text(),
	refreshToken: text(),
	idToken: text(),
	accessTokenExpiresAt: timestamp({ mode: 'string' }),
	refreshTokenExpiresAt: timestamp({ mode: 'string' }),
	scope: text(),
	password: text(),
	createdAt: timestamp({ mode: 'string' }).notNull(),
	updatedAt: timestamp({ mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "account_userId_user_id_fk"
		}),
]);

export const session = pgTable("session", {
	id: text().primaryKey().notNull(),
	expiresAt: timestamp({ mode: 'string' }).notNull(),
	token: text().notNull(),
	createdAt: timestamp({ mode: 'string' }).notNull(),
	updatedAt: timestamp({ mode: 'string' }).notNull(),
	ipAddress: text(),
	userAgent: text(),
	userId: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "session_userId_user_id_fk"
		}),
	unique("session_token_unique").on(table.token),
]);

export const proyectos = pgTable("proyectos", {
	id: text().primaryKey().notNull(),
	nombre: text().notNull(),
	descripcion: text().notNull(),
	estado: text().default('active').notNull(),
	slug: text().notNull(),
	userId: text("user_id"),
	template: text().notNull(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "proyectos_user_id_user_id_fk"
		}),
]);

export const entradas = pgTable("entradas", {
	id: text().primaryKey().notNull(),
	proyectoId: text("proyecto_id").notNull(),
	coleccionSlug: text("coleccion_slug").notNull(),
	contenido: jsonb().notNull(),
	creadoEn: timestamp("creado_en", { mode: 'string' }).defaultNow(),
	actualizadoEn: timestamp("actualizado_en", { mode: 'string' }).defaultNow(),
	activo: boolean().default(true),
}, (table) => [
	foreignKey({
			columns: [table.proyectoId],
			foreignColumns: [proyectos.id],
			name: "entradas_proyecto_id_proyectos_id_fk"
		}),
]);
