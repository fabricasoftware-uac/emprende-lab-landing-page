"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2, Plus, Edit, Trash2, FolderGit2 } from "lucide-react";
import { Modal } from "@/components/admin/modal";
import { authClient } from "@/lib/auth-client";

export function ProjectsManager() {
  const [projects, setProjects] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    slug: "",
    template: "default",
    userId: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch projects
      const res = await fetch("/api/proyectos");
      const list = await res.json();
      if (!res.ok) throw list;
      setProjects(list.data || []);

      // Fetch users for assignment (non-deleted)
      const { data: usersData, error: usersError } =
        await authClient.admin.listUsers({
          query: { limit: 100 },
        });
      if (usersError) throw usersError;
      setUsers((usersData?.users || []).filter((u: any) => !u.deletedAt));
    } catch (error: any) {
      console.error(error);
      toast.error("Error al cargar datos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setFormData({
      nombre: project.nombre,
      descripcion: project.descripcion,
      slug: project.slug,
      template: project.template || "default",
      userId: project.userId || "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.userId) {
      toast.error("Debes asignar un propietario");
      return;
    }

    setSubmitting(true);
    try {
      const url = "/api/proyectos";
      const method = editingProject ? "PATCH" : "POST";
      const body = editingProject
        ? { ...formData, id: editingProject.id }
        : formData;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw data;

      toast.success(
        editingProject ? "Proyecto actualizado" : "Proyecto creado",
      );
      setIsModalOpen(false);
      setEditingProject(null);
      setFormData({
        nombre: "",
        descripcion: "",
        slug: "",
        template: "default",
        userId: "",
      });
      fetchData();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.error || "Error al procesar el proyecto");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Estás seguro de eliminar este proyecto?")) return;
    try {
      const res = await fetch(`/api/proyectos?id=${id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json();
        throw err;
      }
      toast.success("Proyecto eliminado");
      fetchData();
    } catch (error: any) {
      console.error(error);
      toast.error("Error al eliminar el proyecto");
    }
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
                  <td className="px-6 py-4 text-sm">
                    <div className="flex flex-col">
                      <span className="font-semibold text-purple-100">
                        {project.nombre}
                      </span>
                      <span className="text-xs text-purple-300/50 truncate max-w-50">
                        {project.descripcion}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-purple-300/80 font-mono text-xs">
                    {project.slug}
                  </td>
                  <td className="px-6 py-4 text-sm text-purple-300">
                    <div className="flex flex-col">
                      <span className="text-white text-xs font-medium">
                        {project.userName || "N/A"}
                      </span>
                      <span className="text-[10px] text-purple-300/40">
                        {project.userEmail || "Sin asignar"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-purple-300">
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-purple-500/10 text-[10px]">
                      {project.template || "default"}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors border border-blue-500/20"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
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
        onClose={() => {
          setIsModalOpen(false);
          setEditingProject(null);
          setFormData({
            nombre: "",
            descripcion: "",
            slug: "",
            template: "default",
            userId: "",
          });
        }}
        title={editingProject ? "Editar Proyecto" : "Nuevo Proyecto"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-1.5">
              Nombre del Proyecto
            </label>
            <input
              type="text"
              required
              value={formData.nombre}
              onChange={(e) =>
                setFormData({ ...formData, nombre: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-white/5 border border-purple-500/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm"
              placeholder="Ej. Mi Proyecto Increíble"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-1.5">
              Descripción
            </label>
            <textarea
              required
              value={formData.descripcion}
              onChange={(e) =>
                setFormData({ ...formData, descripcion: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-white/5 border border-purple-500/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm min-h-[100px]"
              placeholder="Breve descripción del proyecto..."
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
              Propietario (Asignar a Usuario)
            </label>
            <select
              required
              value={formData.userId}
              onChange={(e) =>
                setFormData({ ...formData, userId: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-[#1a0f2e] border border-purple-500/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm appearance-none"
            >
              <option value="">Selecciona un usuario</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.email})
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
              {editingProject ? "Guardar Cambios" : "Crear Proyecto"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
