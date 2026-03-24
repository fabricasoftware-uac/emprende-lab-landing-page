"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2, Plus, Edit, Trash2, FolderGit2 } from "lucide-react";
import { Modal } from "@/components/admin/modal";

export function ProjectsManager() {
  const [projects, setProjects] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    user_id: "",
    template: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    
  };


  const handleSubmit = async (e: React.FormEvent) => {
    
  };

  const handleDelete = async (id: string) => {
   
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <FolderGit2 className="w-6 h-6 text-purple-400" />
            Gestión de Proyectos
          </h2>
          <p className="text-purple-200/60 mt-1">
            Crea y administra los proyectos de tus clientes.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-full bg-linear-to-r from-purple-500 to-indigo-500 text-white font-medium text-sm flex items-center gap-2 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all"
        >
          <Plus className="w-4 h-4" />
          Nuevo Proyecto
        </button>
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
                <th className="px-6 py-4">Propietario</th>
                <th className="px-6 py-4">Template</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-500/10">
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-purple-100 font-medium">
                    {project.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-purple-300/80">
                    {project.slug}
                  </td>
                  <td className="px-6 py-4 text-sm text-purple-300">
                    {project.expand?.user_id?.email ||
                      project.user_id ||
                      "Sin asignar"}
                  </td>
                  <td className="px-6 py-4 text-sm text-purple-300">
                    {project.template || "-"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors border border-red-500/20"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-purple-200/50"
                  >
                    No hay proyectos registrados
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
        title="Nuevo Proyecto"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-1.5">
              Nombre del Proyecto
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-white/5 border border-purple-500/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm"
              placeholder="Ej. Mi Proyecto Increíble"
            />
          </div>
          <div>
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
              placeholder="mi-proyecto"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-1.5">
              Propietario (Usuario)
            </label>
            <select
              required
              value={formData.user_id}
              onChange={(e) =>
                setFormData({ ...formData, user_id: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-white/5 border border-purple-500/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm appearance-none [&>option]:bg-[#1a0f2e]"
            >
              <option value="">Selecciona un usuario</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.email}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-1.5">
              Plantilla (Template)
            </label>
            <input
              type="text"
              value={formData.template}
              onChange={(e) =>
                setFormData({ ...formData, template: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-white/5 border border-purple-500/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm"
              placeholder="default"
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
              Crear Proyecto
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
