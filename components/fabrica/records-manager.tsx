"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Database, Edit, Search } from "lucide-react";
import { Modal } from "@/components/admin/modal";

export function RecordsManager() {
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");

  const [esquemas, setEsquemas] = useState<any[]>([]);
  const [selectedEsquemaSlug, setSelectedEsquemaSlug] = useState<string>("");
  const [activeEsquema, setActiveEsquema] = useState<any>(null);

  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<any>({});

  // Initial Fetch
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

  const fetchEsquemas = async (projectId: string) => {
    try {
      const res = await fetch(`/api/esquemas?proyectoId=${projectId}`);
      const data = await res.json();
      setEsquemas(data.data || []);
      if (data.data?.length > 0) {
        setSelectedEsquemaSlug(data.data[0].slug);
        setActiveEsquema(data.data[0]);
      } else {
        setSelectedEsquemaSlug("");
        setActiveEsquema(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar esquemas");
    }
  };

  const fetchRecords = async (projectId: string, slug: string) => {
    if (!projectId || !slug) return;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/entradas?proyectoId=${projectId}&coleccionSlug=${slug}`,
      );
      const data = await res.json();
      setRecords(data.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar registros");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedProjectId) {
      fetchEsquemas(selectedProjectId);
    }
  }, [selectedProjectId]);

  useEffect(() => {
    if (selectedProjectId && selectedEsquemaSlug) {
      fetchRecords(selectedProjectId, selectedEsquemaSlug);
      // Update active esquema reference
      const found = esquemas.find((e) => e.slug === selectedEsquemaSlug);
      if (found) setActiveEsquema(found);
    }
  }, [selectedProjectId, selectedEsquemaSlug, esquemas]);

  const handleOpenModal = (record: any = null) => {
    if (record) {
      setEditingRecord(record);
      setFormData(record.contenido);
    } else {
      setEditingRecord(null);
      // Initialize with default empty values based on schema
      const initial: any = {};
      activeEsquema?.campos?.forEach((f: any) => {
        initial[f.id] = f.type === "boolean" ? false : "";
      });
      setFormData(initial);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/entradas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingRecord?.id,
          proyectoId: selectedProjectId,
          coleccionSlug: selectedEsquemaSlug,
          contenido: formData,
        }),
      });
      if (!res.ok) throw new Error();
      toast.success(editingRecord ? "Registro actualizado" : "Registro creado");
      setIsModalOpen(false);
      fetchRecords(selectedProjectId, selectedEsquemaSlug);
    } catch (error) {
      toast.error("Error al guardar");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Seguro de eliminar este registro?")) return;
    try {
      await fetch(`/api/entradas?id=${id}`, { method: "DELETE" });
      toast.success("Eliminado");
      fetchRecords(selectedProjectId, selectedEsquemaSlug);
    } catch (error) {
      toast.error("Error al eliminar");
    }
  };

  const renderFieldInput = (field: any) => {
    const commonClasses =
      "w-full px-4 py-2 bg-white/5 border border-purple-500/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-sm";

    switch (field.type) {
      case "textarea":
        return (
          <textarea
            required={field.required}
            value={formData[field.id] || ""}
            onChange={(e) =>
              setFormData({ ...formData, [field.id]: e.target.value })
            }
            className={commonClasses + " min-h-25"}
            placeholder={field.label}
          />
        );
      case "boolean":
        return (
          <label className="flex items-center gap-3 p-3 bg-white/5 border border-purple-500/10 rounded-xl cursor-pointer">
            <input
              type="checkbox"
              checked={formData[field.id] || false}
              onChange={(e) =>
                setFormData({ ...formData, [field.id]: e.target.checked })
              }
              className="w-4 h-4 text-purple-500 bg-black/20 border-purple-500/30 rounded"
            />
            <span className="text-sm text-purple-200">{field.label}</span>
          </label>
        );
      case "number":
        return (
          <input
            type="number"
            required={field.required}
            value={formData[field.id] || ""}
            onChange={(e) =>
              setFormData({ ...formData, [field.id]: e.target.value })
            }
            className={commonClasses}
            placeholder={field.label}
          />
        );
      default:
        return (
          <input
            type="text"
            required={field.required}
            value={formData[field.id] || ""}
            onChange={(e) =>
              setFormData({ ...formData, [field.id]: e.target.value })
            }
            className={commonClasses}
            placeholder={field.label}
          />
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Database className="w-6 h-6 text-purple-400" />
            Gestión de Registros
          </h2>
          <p className="text-purple-200/60 mt-1">
            Administra el contenido de tus esquemas personalizados.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="w-full sm:w-40 px-4 py-2 bg-white/5 border border-purple-500/20 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 appearance-none [&>option]:bg-[#1a0f2e] text-sm"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>

          <select
            value={selectedEsquemaSlug}
            onChange={(e) => setSelectedEsquemaSlug(e.target.value)}
            className="w-full sm:w-40 px-4 py-2 bg-white/5 border border-purple-500/20 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 appearance-none [&>option]:bg-[#1a0f2e] text-sm"
          >
            {esquemas.length === 0 && <option value="">Sin servicios</option>}
            {esquemas.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.nombre}
              </option>
            ))}
          </select>

          <button
            onClick={() => handleOpenModal()}
            disabled={!activeEsquema}
            className="shrink-0 w-full sm:w-auto px-4 py-2 rounded-full bg-linear-to-r from-purple-500 to-indigo-500 text-white font-medium text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
            Nuevo Registro
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
        </div>
      ) : (
        <div className="glass rounded-2xl border border-purple-500/20 overflow-x-auto shadow-[0_0_30px_rgba(0,0,0,0.2)]">
          <table className="w-full text-left min-w-150">
            <thead>
              <tr className="bg-purple-900/20 border-b border-purple-500/20 text-[10px] font-bold text-purple-200 uppercase tracking-widest">
                {activeEsquema?.campos?.map((f: any) => (
                  <th key={f.id} className="px-6 py-4">
                    {f.label}
                  </th>
                ))}
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-500/10">
              {records.map((rec) => (
                <tr
                  key={rec.id}
                  className="hover:bg-white/5 transition-colors group"
                >
                  {activeEsquema?.campos?.map((f: any) => (
                    <td
                      key={f.id}
                      className="px-6 py-4 text-sm text-purple-100/80"
                    >
                      {f.type === "boolean" ? (
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${rec.contenido[f.id] ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
                        >
                          {rec.contenido[f.id] ? "SI" : "NO"}
                        </span>
                      ) : (
                        <div
                          className="max-w-50 truncate"
                          title={String(rec.contenido[f.id] || "")}
                        >
                          {String(rec.contenido[f.id] || "-")}
                        </div>
                      )}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleOpenModal(rec)}
                        className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors border border-blue-500/20"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(rec.id)}
                        className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors border border-red-500/20"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {records.length === 0 && (
                <tr>
                  <td
                    colSpan={activeEsquema?.campos?.length + 1 || 1}
                    className="px-6 py-8 text-center text-purple-200/50"
                  >
                    No hay registros para esta colección
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
          editingRecord
            ? `Editar ${activeEsquema?.nombre}`
            : `Nuevo ${activeEsquema?.nombre}`
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4 max-h-100 overflow-y-auto pr-2 custom-scrollbar">
            {activeEsquema?.campos?.map((field: any) => (
              <div key={field.id}>
                <label className="block text-xs font-bold text-purple-300/50 uppercase tracking-tighter mb-1.5 ml-1">
                  {field.label}{" "}
                  {field.required && <span className="text-red-500">*</span>}
                </label>
                {renderFieldInput(field)}
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-purple-500/10">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-5 py-2.5 rounded-full text-xs font-medium text-purple-200 bg-white/5 hover:bg-white/10 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 rounded-full bg-linear-to-r from-purple-500 to-indigo-500 text-white font-medium text-xs flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all disabled:opacity-50"
            >
              {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {editingRecord ? "Actualizar" : "Guardar Registro"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
