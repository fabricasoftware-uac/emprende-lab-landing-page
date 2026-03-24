"use client";

import { RecordsManager } from "@/components/fabrica/records-manager";

export default function RegistrosPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Registros
        </h2>
        <p className="text-purple-300/60 font-medium">
          Gestión de datos por colección.
        </p>
      </div>
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        <RecordsManager />
      </div>
    </div>
  );
}
