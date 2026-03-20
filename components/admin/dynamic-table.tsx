"use client";

import {
  Edit,
  Search,
  Plus,
  Image as ImageIcon,
  PauseOctagonIcon,
} from "lucide-react";
import { FieldConfig } from "@/lib/admin-config";
import { useState } from "react";
import Image from "next/image";

interface DynamicTableProps {
  fields: FieldConfig[];
  data: any[];
  onEdit: (record: any) => void;
  onDeactivate: (record: any) => void;
  onCreate: () => void;
  title: string;
}

export function DynamicTable({
  fields,
  data,
  onEdit,
  onDeactivate,
  onCreate,
  title,
}: DynamicTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((item) => {
    return Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase()),
    );
  });

  return (
    <div className="space-y-6">
      {/* Table Header actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-300/50" />
          <input
            type="text"
            placeholder="Buscar en registros..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-purple-500/20 rounded-full shadow-inner text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm"
          />
        </div>

        <button
          onClick={onCreate}
          className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-linear-to-r from-purple-500 to-indigo-500 text-white font-medium text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          Crear nuevo
        </button>
      </div>

      {/* Table container */}
      <div className="glass rounded-2xl border border-purple-500/20 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.2)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-purple-900/20 border-b border-purple-500/20">
                {fields.map((field) => (
                  <th
                    key={field.name}
                    className="px-6 py-4 text-xs font-semibold text-purple-200 uppercase tracking-wider"
                  >
                    {field.label}
                  </th>
                ))}
                <th className="px-6 py-4 text-xs font-semibold text-purple-200 uppercase tracking-wider text-right">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-500/10">
              {filteredData.length > 0 ? (
                filteredData.map((row, i) => (
                  <tr
                    key={row.id || i}
                    className={`transition-colors group ${row.activo !== false ? "hover:bg-white/5" : "bg-red-500/5 opacity-50 hover:bg-red-500/10"}`}
                  >
                    {fields.map((field) => (
                      <td
                        key={`${row.id}-${field.name}`}
                        className="px-6 py-4 whitespace-nowrap text-sm text-purple-100/90"
                      >
                        {field.type === "file" ? (
                          <div className="w-10 h-10 rounded-full bg-white/5 border border-purple-500/20 overflow-hidden flex items-center justify-center shrink-0">
                            {row[field.name] ? (
                              <img
                                src={
                                  typeof row[field.name] === "string" &&
                                  row[field.name].length > 0
                                    ? row[field.name]
                                    : row[field.name] instanceof File ||
                                        row[field.name] instanceof Blob
                                      ? URL.createObjectURL(row[field.name])
                                      : "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=200&auto=format&fit=crop" // Mock fallback for localStorage objects
                                }
                                alt="preview"
                                className="object-cover w-full h-full"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=200&auto=format&fit=crop";
                                }}
                              />
                            ) : (
                              <ImageIcon className="w-4 h-4 text-purple-300/40" />
                            )}
                          </div>
                        ) : field.type === "select" ? (
                          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-200 border border-purple-500/30">
                            {row[field.name]}
                          </span>
                        ) : field.type === "textarea" ? (
                          <div
                            className="max-w-xs truncate"
                            title={row[field.name]}
                          >
                            {row[field.name]}
                          </div>
                        ) : (
                          <div className="font-medium">{row[field.name]}</div>
                        )}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onEdit(row)}
                          className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors border border-blue-500/20"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeactivate(row)}
                          className={`p-2 rounded-lg transition-colors border ${
                            row.activo === false
                              ? "bg-green-500/10 text-green-400 hover:bg-green-500/20 border-green-500/20"
                              : "bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 border-orange-500/20"
                          }`}
                          title={
                            row.activo === false ? "Reactivar" : "Desactivar"
                          }
                        >
                          {row.activo === false ? (
                            <Plus className="w-4 h-4" />
                          ) : (
                            <PauseOctagonIcon className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={fields.length + 1}
                    className="px-6 py-12 text-center text-purple-200/50"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-3 border border-purple-500/10">
                        <Search className="w-6 h-6 text-purple-400/50" />
                      </div>
                      <p>
                        No se encontraron registros en {title.toLowerCase()}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
