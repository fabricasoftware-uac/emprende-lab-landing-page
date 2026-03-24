"use client";

import { useState, useEffect } from "react";
import PocketBase from "pocketbase";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Layers } from "lucide-react";
import { Modal } from "@/components/admin/modal";

export function CollectionsManager() {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    fields:
      '[\n  {\n    "name": "title",\n    "type": "text",\n    "label": "Título"\n  }\n]',
    is_singleton: false,
  });

  // Fetch projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const records = await pb
          .collection("projects")
          .getFullList({ sort: "-created" });
        setProjects(records);
        if (records.length > 0) {
          setSelectedProjectId(records[0].id);
        }
      } catch (error) {
        console.error(error);
        toast.error("Error al cargar proyectos");
      }
    };
    fetchProjects();
  }, []);

  // Fetch collections when selected project changes
  const fetchCollections = async (projectId: string) => {
    if (!projectId) return;
    setLoading(true);
    try {
      const records = await pb.collection("collections_config").getFullList({
        filter: `project_id = "${projectId}"`,
        sort: "-created",
      });
      setCollections(records);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar las configuraciones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections(selectedProjectId);
  }, [selectedProjectId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate JSON
    let parsedFields;
    try {
      parsedFields = JSON.parse(formData.fields);
    } catch (error) {
      toast.error("El formato JSON de los campos es inválido");
      return;
    }

    setSubmitting(true);
    try {
      await pb.collection("collections_config").create({
        project_id: selectedProjectId,
        name: formData.name,
        slug: formData.slug,
        fields: parsedFields,
        is_singleton: formData.is_singleton,
      });
      toast.success("Colección configurada correctamente");
      setIsModalOpen(false);
      setFormData({ ...formData, name: "", slug: "", is_singleton: false });
      fetchCollections(selectedProjectId);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Error al crear la colección");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar esta colección?"))
      return;
    try {
      await pb.collection("collections_config").delete(id);
      toast.success("Colección eliminada");
      setCollections(collections.filter((c) => c.id !== id));
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar la colección");
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
            Define las estructuras de datos dinámicas para los proyectos.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="w-full md:w-48 px-4 py-2 bg-white/5 border border-purple-500/20 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 appearance-none [&>option]:bg-[#1a0f2e] text-sm"
          >
            {projects.length === 0 ? (
              <option value="">Sin proyectos</option>
            ) : null}
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => setIsModalOpen(true)}
            disabled={!selectedProjectId}
            className="shrink-0 px-4 py-2 rounded-full bg-linear-to-r from-purple-500 to-indigo-500 text-white font-medium text-sm flex items-center gap-2 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
            Nueva Config
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
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4">Tipo</th>
                <th className="px-6 py-4">Campos</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-500/10">
              {collections.map((col) => (
                <tr key={col.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-sm text-purple-100 font-medium">
                    {col.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-purple-300/80">
                    {col.slug}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium border ${col.is_singleton ? "bg-orange-500/10 text-orange-400 border-orange-500/20" : "bg-blue-500/10 text-blue-400 border-blue-500/20"}`}
                    >
                      {col.is_singleton ? "Singleton" : "Múltiple"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-purple-300/50 font-mono">
                    {Array.isArray(col.fields)
                      ? `${col.fields.length} campos`
                      : "JSON Custom"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(col.id)}
                      className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors border border-red-500/20"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {collections.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-purple-200/50"
                  >
                    No hay configuraciones para este proyecto
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
        title="Nueva Configuración de Colección"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-purple-200 mb-1.5">
                Nombre (Plural)
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-white/5 border border-purple-500/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm"
                placeholder="Ej. Entradas de Blog"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-purple-200 mb-1.5">
                Slug
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
                className="w-full px-4 py-2.5 bg-white/5 border border-purple-500/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm"
                placeholder="blog-posts"
              />
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg bg-white/5 border border-purple-500/10 hover:bg-white/10 transition-colors">
            <input
              type="checkbox"
              checked={formData.is_singleton}
              onChange={(e) =>
                setFormData({ ...formData, is_singleton: e.target.checked })
              }
              className="w-4 h-4 text-purple-500 bg-black/20 border-purple-500/30 rounded focus:ring-purple-500 focus:ring-offset-0"
            />
            <span className="text-sm font-medium text-purple-200">
              Es Singleton (único registro, p. ej. "Configuración Global")
            </span>
          </label>

          <div>
            <label className="text-sm font-medium text-purple-200 mb-1.5 flex justify-between">
              Estructura JSON (Fields)
              <span className="text-xs text-purple-300/50">
                Debe ser un array válido
              </span>
            </label>
            <textarea
              required
              rows={8}
              value={formData.fields}
              onChange={(e) =>
                setFormData({ ...formData, fields: e.target.value })
              }
              className="w-full px-4 py-3 bg-[#0a0514]/80 border border-purple-500/20 rounded-xl text-green-400 font-mono focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm resize-y custom-scrollbar"
              placeholder='[ { "name": "title", "type": "text" } ]'
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-5 py-2.5 rounded-full text-sm font-medium text-purple-200 bg-white/5 hover:bg-white/10 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 rounded-full bg-linear-to-r from-purple-500 to-indigo-500 text-white font-medium text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all disabled:opacity-50"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              Guardar Configuración
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
