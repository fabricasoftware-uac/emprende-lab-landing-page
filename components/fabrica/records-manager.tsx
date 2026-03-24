"use client";

import { useState, useEffect } from "react";
import PocketBase from "pocketbase";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Database } from "lucide-react";
import { Modal } from "@/components/admin/modal";

export function RecordsManager() {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");

  const [configs, setConfigs] = useState<any[]>([]);
  const [selectedConfigSlug, setSelectedConfigSlug] = useState<string>("");

  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    data: '{\n  "title": "Example"\n}',
  });

  // Fetch projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await pb
          .collection("projects")
          .getFullList({ sort: "-created" });
        setProjects(res);
        if (res.length > 0) setSelectedProjectId(res[0].id);
      } catch (error) {
        console.error(error);
        toast.error("Error al cargar proyectos");
      }
    };
    fetchProjects();
  }, []);

  // Fetch configs when project changes
  useEffect(() => {
    const fetchConfigs = async () => {
      if (!selectedProjectId) {
        setConfigs([]);
        setSelectedConfigSlug("");
        return;
      }
      try {
        const res = await pb.collection("collections_config").getFullList({
          filter: `project_id = "${selectedProjectId}"`,
          sort: "-created",
        });
        setConfigs(res);
        if (res.length > 0) setSelectedConfigSlug(res[0].slug);
        else setSelectedConfigSlug("");
      } catch (error) {
        console.error(error);
        toast.error("Error al cargar configuraciones");
      }
    };
    fetchConfigs();
  }, [selectedProjectId]);

  // Fetch records when project or config changes
  const fetchRecords = async () => {
    if (!selectedProjectId || !selectedConfigSlug) {
      setRecords([]);
      return;
    }
    setLoading(true);
    try {
      const res = await pb.collection("records").getFullList({
        filter: `project_id = "${selectedProjectId}" && collection_slug = "${selectedConfigSlug}"`,
        sort: "-created",
      });
      setRecords(res);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar registros");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [selectedProjectId, selectedConfigSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProjectId || !selectedConfigSlug) return;

    // Validate JSON string
    let parsedData;
    try {
      parsedData = JSON.parse(formData.data);
    } catch (error) {
      toast.error("El formato JSON de los datos es inválido");
      return;
    }

    setSubmitting(true);
    try {
      await pb.collection("records").create({
        project_id: selectedProjectId,
        collection_slug: selectedConfigSlug,
        data: parsedData,
      });
      toast.success("Registro creado correctamente");
      setIsModalOpen(false);
      setFormData({ data: "{\n\n}" });
      fetchRecords();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Error al crear el registro");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este registro?"))
      return;
    try {
      await pb.collection("records").delete(id);
      toast.success("Registro eliminado");
      setRecords(records.filter((r) => r.id !== id));
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar el registro");
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
            Crea registros (data) manualmente para cualquier colección.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="w-full sm:w-40 px-4 py-2 bg-white/5 border border-purple-500/20 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 appearance-none [&>option]:bg-[#1a0f2e] text-sm"
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

          <select
            value={selectedConfigSlug}
            onChange={(e) => setSelectedConfigSlug(e.target.value)}
            disabled={configs.length === 0}
            className="w-full sm:w-40 px-4 py-2 bg-white/5 border border-purple-500/20 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 appearance-none [&>option]:bg-[#1a0f2e] text-sm disabled:opacity-50"
          >
            {configs.length === 0 ? (
              <option value="">Sin colecciones</option>
            ) : null}
            {configs.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => setIsModalOpen(true)}
            disabled={!selectedProjectId || !selectedConfigSlug}
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
        <div className="glass rounded-2xl border border-purple-500/20 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.2)]">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-purple-900/20 border-b border-purple-500/20 text-xs font-semibold text-purple-200 uppercase tracking-wider">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Data (JSON Snapshot)</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-500/10">
              {records.map((rec) => (
                <tr key={rec.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-xs text-purple-300/80 font-mono w-40">
                    {rec.id}
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-green-400">
                    <div
                      className="max-w-xl truncate"
                      title={JSON.stringify(rec.data)}
                    >
                      {JSON.stringify(rec.data)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right w-24">
                    <button
                      onClick={() => handleDelete(rec.id)}
                      className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors border border-red-500/20"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {records.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-8 text-center text-purple-200/50"
                  >
                    No hay registros almacenados para esta colección y proyecto
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
        title="Nuevo Registro Base"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-purple-200 mb-1.5 flex justify-between">
              Data (JSON)
              <span className="text-xs text-purple-300/50">
                Debe ser un objeto válido
              </span>
            </label>
            <textarea
              required
              rows={12}
              value={formData.data}
              onChange={(e) =>
                setFormData({ ...formData, data: e.target.value })
              }
              className="w-full px-4 py-3 bg-[#0a0514]/80 border border-purple-500/20 rounded-xl text-green-400 font-mono focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm resize-y custom-scrollbar"
              placeholder='{ "title": "Mi Nuevo Post", "content": "..." }'
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
              Guardar Registro
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
