"use client";

import { CollectionsManager } from "@/components/fabrica/collections-manager";

export default function ColeccionesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Colecciones
        </h2>
        <p className="text-purple-300/60 font-medium">
          Configuración de esquemas y meta-datos.
        </p>
      </div>
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        <CollectionsManager />
      </div>
    </div>
  );
}
