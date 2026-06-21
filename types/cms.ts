/** A single field definition within an Esquema (collection schema) */
export interface Campo {
  id: string
  label: string
  type: "text" | "number" | "image" | "boolean" | "textarea"
  required: boolean
}

/** A project row from the proyectos table + joined user info */
export interface Proyecto {
  id: string
  nombre: string
  descripcion: string
  slug: string
  template: string
  estado: string
  createdAt: Date | string
  userId: string | null
  userName: string | null
  userEmail: string | null
}

/** An esquema (collection definition) row */
export interface Esquema {
  id: string
  proyectoId: string
  nombre: string
  slug: string
  campos: Campo[]
  esRegistroUnico: boolean
  activo: boolean
  creadoEn: Date | string
}

/** An entrada (content record) row */
export interface Entrada {
  id: string
  proyectoId: string
  coleccionSlug: string
  contenido: Record<string, unknown>
  activo: boolean | null
  creadoEn: Date | string | null
  actualizadoEn: Date | string | null
}

/** Result shape from db.select({ contenido: entradas.contenido }) queries */
export interface EntradaRow {
  contenido: unknown
}

/** A Better Auth user (subset used by admin panels) */
export interface BetterAuthUser {
  id: string
  name: string | null
  email: string | null
  role: string
  deletedAt?: string | null
  banned?: boolean
  emailVerified?: boolean
  image?: string | null
  createdAt?: Date | string
  updatedAt?: Date | string
}

/** Dashboard stat card item */
export interface StatItem {
  label: string
  value: string
  trend: string
  color: string
}

/** Dashboard alert / recent activity item */
export interface AlertItem {
  id: string
  message: string
  time: string
  coleccion: string
}

/** Full dashboard data shape */
export interface DashboardData {
  stats: StatItem[]
  alerts: AlertItem[]
}

/** Sidebar navigation item */
export interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}
