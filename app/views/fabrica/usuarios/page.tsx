"use client";

import { UsersManager } from "@/components/fabrica/users-manager";

export default function UsuariosPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Usuarios
        </h2>
        <p className="text-purple-300/60 font-medium">
          Control de acceso y roles del panel.
        </p>
      </div>
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        <UsersManager />
      </div>
    </div>
  );
}
