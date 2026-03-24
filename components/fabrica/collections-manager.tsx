"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Loader2,
  Plus,
  Trash2,
  Layers,
  X,
  Settings2,
  Database,
  Edit,
  Power,
  PowerOff,
} from "lucide-react";
import { Modal } from "@/components/admin/modal";
import { ConfirmModal } from "@/components/admin/confirm-modal";

interface Field {
  id: string; // técnico: slug
  label: string; // legible
  type: "text" | "number" | "image" | "boolean" | "textarea";
  required: boolean;
}

export function CollectionsManager() {
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    slug: "",
    esRegistroUnico: false,
    campos: [] as Field[],
  });

  const fetchData = async () => {
    try {
      const res = await fetch("/api/proyectos");
      const data = await res.json();
      setProjects(data.data || []);
      if (data.data?.length > 0 && !selectedProjectId) {
        setSelectedProjectId(data.data[0].id);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar proyectos");
    }
  };

  const fetchCollections = async (projectId: string) => {
    if (!projectId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/esquemas?proyectoId=${projectId}`);
      const data = await res.json();
      setCollections(data.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar esquemas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedProjectId) {
      fetchCollections(selectedProjectId);
    }
  }, [selectedProjectId]);

  const addField = () => {
    setFormData({
      ...formData,
      campos: [
        ...formData.campos,
        { id: "", label: "", type: "text", required: false },
      ],
    });
  };

  const removeField = (index: number) => {
    const newFields = [...formData.campos];
    newFields.splice(index, 1);
    setFormData({ ...formData, campos: newFields });
  };

  const updateField = (index: number, updates: Partial<Field>) => {
    const newFields = [...formData.campos];
    newFields[index] = { ...newFields[index], ...updates };
    setFormData({ ...formData, campos: newFields });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.campos.length === 0) {
      toast.error("Agrega al menos un campo");
      return;
    }
    setSubmitting(true);
    try {
      const url = "/api/esquemas";
      const method = editingCollection ? "PATCH" : "POST";
      const body = editingCollection
        ? { ...formData, id: editingCollection.id }
        : { ...formData, proyectoId: selectedProjectId };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Error al guardar");
      toast.success(
        editingCollection
          ? "Esquema actualizado correctamente"
          : "Esquema creado correctamente",
      );
      setIsModalOpen(false);
      setEditingCollection(null);
      setFormData({ nombre: "", slug: "", esRegistroUnico: false, campos: [] });
      fetchCollections(selectedProjectId);
    } catch (error) {
      console.error(error);
      toast.error("Error al guardar el esquema");
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/esquemas?id=${deleteId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      toast.success("Esquema eliminado");
      fetchCollections(selectedProjectId);
    } catch (error) {
      toast.error("Error al eliminar");
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const executeDelete = (id: string) => {
    setDeleteId(id);
  };

  const handleEdit = (col: any) => {
    setEditingCollection(col);
    setFormData({
      nombre: col.nombre,
      slug: col.slug,
      esRegistroUnico: col.esRegistroUnico,
      campos: col.campos,
    });
    setIsModalOpen(true);
  };

  const toggleActive = async (col: any) => {
    try {
      const res = await fetch("/api/esquemas", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: col.id, activo: !col.activo }),
      });
      if (!res.ok) throw new Error();
      toast.success(col.activo ? "Esquema desactivado" : "Esquema activado");
      fetchCollections(selectedProjectId);
    } catch (error) {
      toast.error("Error al cambiar estado");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Layers className="w-6 h-6 text-purple-400" />
            Configuración de Colecciones
          </h2>
          <p className="text-purple-200/60 mt-1">
            Define los moldes de datos para cada proyecto.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="w-full md:w-48 px-4 py-2 bg-white/5 border border-purple-500/20 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 appearance-none [&>option]:bg-[#1a0f2e] text-sm"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              setEditingCollection(null);
              setFormData({
                nombre: "",
                slug: "",
                esRegistroUnico: false,
                campos: [],
              });
              setIsModalOpen(true);
            }}
            disabled={!selectedProjectId}
            className="shrink-0 px-4 py-2 rounded-full bg-linear-to-r from-purple-500 to-indigo-500 text-white font-medium text-sm flex items-center gap-2 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
            Nuevo Esquema
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
        </div>
      ) : (
        <div className="glass rounded-2xl border border-purple-500/20 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.2)]">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-purple-900/20 border-b border-purple-500/20 text-xs font-semibold text-purple-200 uppercase tracking-wider">
                <th className="px-6 py-4">Nombre</th>
                <th className="px-6 py-4">Slug Técnico</th>
                <th className="px-6 py-4">Tipo</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-500/10">
              {collections.map((col) => (
                <tr key={col.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-sm text-purple-100 font-medium">
                    {col.nombre}
                  </td>
                  <td className="px-6 py-4 text-sm text-purple-300/80 font-mono italic">
                    {col.slug}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-widest ${
                        col.esRegistroUnico
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                      }`}
                    >
                      {col.esRegistroUnico ? "Registro Único" : "Colección"}
                    </span>
                    {!col.activo && (
                      <span className="ml-2 px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-widest bg-red-500/10 text-red-400 border-red-500/20">
                        INACTIVO
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(col)}
                        className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors border border-blue-500/20"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleActive(col)}
                        className={`p-2 rounded-lg transition-colors border ${
                          col.activo
                            ? "bg-red-500/10 text-red-400 hover:bg-red-500/20 border-red-500/20"
                            : "bg-green-500/10 text-green-400 hover:bg-green-500/20 border-green-500/20"
                        }`}
                        title={col.activo ? "Desactivar" : "Activar"}
                      >
                        {col.activo ? (
                          <PowerOff className="w-4 h-4" />
                        ) : (
                          <Power className="w-4 h-4" />
                        )}
                      </button>

                      <button
                        onClick={() => executeDelete(col.id)}
                        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors border border-red-500/20"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {collections.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-purple-200/50"
                  >
                    No hay esquemas definidos para este proyecto
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          editingCollection
            ? `Editar Esquema: ${editingCollection.nombre}`
            : "Diseñador de Esquema (Molde)"
        }
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-1.5">
                Nombre (Legible)
              </label>
              <input
                type="text"
                required
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                className="w-full px-4 py-2 bg-white/5 border border-purple-500/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-sm"
                placeholder="Ej. Mi Equipo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-1.5">
                Slug (Técnico)
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                  })
                }
                className="w-full px-4 py-2 bg-white/5 border border-purple-500/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-sm font-mono"
                placeholder="mi-equipo"
              />
            </div>
          </div>

          <label className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-purple-500/10 cursor-pointer hover:bg-white/10 transition-colors">
            <input
              type="checkbox"
              checked={formData.esRegistroUnico}
              onChange={(e) =>
                setFormData({ ...formData, esRegistroUnico: e.target.checked })
              }
              className="w-4 h-4 text-purple-500 bg-black/20 border-purple-500/30 rounded"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-purple-100">
                Registro Único / Singleton
              </span>
              <span className="text-[10px] text-purple-300/40">
                Activa esto para secciones únicas como "Configuración General" o
                "Página de Inicio".
              </span>
            </div>
          </label>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold text-purple-200 flex items-center gap-2">
                <Settings2 className="w-4 h-4" /> Definición de Campos
              </h3>
              <button
                type="button"
                onClick={addField}
                className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 font-medium transition-colors"
              >
                <Plus className="w-3 h-3" /> Añadir Campo
              </button>
            </div>

            <div className="space-y-3 max-h-75 overflow-y-auto pr-2 custom-scrollbar">
              {formData.campos.map((field, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-purple-900/10 border border-purple-500/10 space-y-3 relative group"
                >
                  <button
                    type="button"
                    onClick={() => removeField(idx)}
                    className="absolute top-2 right-2 p-1 text-purple-300/30 hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input
                        placeholder="Etiqueta (ej: Precio)"
                        value={field.label}
                        onChange={(e) =>
                          updateField(idx, { label: e.target.value })
                        }
                        className="w-full bg-white/5 border border-purple-500/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-purple-300/30"
                      />
                    </div>
                    <div>
                      <input
                        placeholder="ID (Técnico: precio_venta)"
                        value={field.id}
                        onChange={(e) =>
                          updateField(idx, {
                            id: e.target.value
                              .toLowerCase()
                              .replace(/\s+/g, "_"),
                          })
                        }
                        className="w-full bg-white/5 border border-purple-500/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-purple-300/30 font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <select
                      value={field.type}
                      onChange={(e) =>
                        updateField(idx, { type: e.target.value as any })
                      }
                      className="bg-[#1a0f2e] border border-purple-500/10 rounded-lg px-2 py-1 text-[10px] text-purple-200"
                    >
                      <option value="text">Texto</option>
                      <option value="number">Número</option>
                      <option value="image">Imagen</option>
                      <option value="boolean">Boolean</option>
                      <option value="textarea">Área de Texto</option>
                    </select>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) =>
                          updateField(idx, { required: e.target.checked })
                        }
                        className="w-3 h-3 text-purple-500 bg-black/20 border-purple-500/30 rounded"
                      />
                      <span className="text-[10px] text-purple-300/60 uppercase tracking-tighter font-bold">
                        Requerido
                      </span>
                    </label>
                  </div>
                </div>
              ))}
              {formData.campos.length === 0 && (
                <div className="text-center py-8 border-2 border-dashed border-purple-500/10 rounded-xl">
                  <p className="text-xs text-purple-300/30">
                    No has añadido campos a este esquema
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-purple-500/10">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-5 py-2 rounded-full text-xs font-medium text-purple-200 bg-white/5 hover:bg-white/10 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-full bg-linear-to-r from-purple-500 to-indigo-500 text-white font-medium text-xs flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all disabled:opacity-50"
            >
              {submitting && <Loader2 className="w-3 h-3 animate-spin" />}
              {editingCollection ? "Guardar Cambios" : "Guardar Molde (Schema)"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Eliminar Esquema"
        message="¿Estás seguro de eliminar este esquema? Toda la data asociada registrada por los clientes podría quedar inaccesible o huérfana."
        isLoading={deleting}
      />
    </div>
  );
}
