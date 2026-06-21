import { relations } from "drizzle-orm/relations";
import { proyectos, esquemas, user, account, session, entradas } from "./schema";

export const esquemasRelations = relations(esquemas, ({one}) => ({
	proyecto: one(proyectos, {
		fields: [esquemas.proyectoId],
		references: [proyectos.id]
	}),
}));

export const proyectosRelations = relations(proyectos, ({one, many}) => ({
	esquemas: many(esquemas),
	user: one(user, {
		fields: [proyectos.userId],
		references: [user.id]
	}),
	entradas: many(entradas),
}));

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	accounts: many(account),
	sessions: many(session),
	proyectos: many(proyectos),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const entradasRelations = relations(entradas, ({one}) => ({
	proyecto: one(proyectos, {
		fields: [entradas.proyectoId],
		references: [proyectos.id]
	}),
}));