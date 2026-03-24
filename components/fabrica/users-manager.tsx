"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2, Plus, Edit, Trash2, Shield, User } from "lucide-react";
import { Modal } from "@/components/admin/modal";

import { authClient } from "@/lib/auth-client";

export function UsersManager() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: "user",
  });
  const [submitting, setSubmitting] = useState(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      role: "user",
    });
    setEditingUser(null);
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await authClient.admin.listUsers({
        query: {
          limit: 100,
        },
      });
      if (error) throw error;
      // Filter out soft-deleted users
      const activeUsers = (data?.users || []).filter((u: any) => !u.deletedAt);
      setUsers(activeUsers);
    } catch (error: any) {
      console.error(error);
      toast.error("Error al cargar los usuarios. Asegúrate de tener permisos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Only validate password for brand new users
    if (!editingUser && formData.password !== formData.passwordConfirm) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    setSubmitting(true);
    try {
      if (editingUser) {
        // Edit existing user
        const { error } = await authClient.admin.updateUser({
          userId: editingUser.id,
          data: {
            name: formData.name,
            email: formData.email,
            role: formData.role as "admin" | "user",
          },
        });
        if (error) throw error;
        toast.success("Usuario actualizado correctamente");
      } else {
        // Create new user
        const { error } = await authClient.admin.createUser({
          email: formData.email,
          password: formData.password,
          name: formData.name || formData.email.split("@")[0],
          role: formData.role as "admin" | "user",
        });
        if (error) throw error;
        toast.success("Usuario creado correctamente");
      }

      setIsModalOpen(false);
      resetForm();
      fetchUsers();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Error al procesar la solicitud");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (user: any) => {
    setEditingUser(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      password: "", // We don't change password via this edit for now
      passwordConfirm: "",
      role: user.role || "user",
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este usuario?"))
      return;
    try {
      const { error } = await authClient.admin.updateUser({
        userId: id,
        data: {
          deletedAt: new Date(),
        } as any,
      });
      if (error) throw error;

      toast.success("Usuario eliminado");
      setUsers(users.filter((u) => u.id !== id));
    } catch (error: any) {
      console.error(error);
      toast.error("Error al eliminar el usuario");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Shield className="w-6 h-6 text-purple-400" />
            Gestión de Usuarios
          </h2>
          <p className="text-purple-200/60 mt-1">
            Administra los accesos de administradores y cuentas de fábrica.
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="px-4 py-2 rounded-full bg-linear-to-r from-purple-500 to-indigo-500 text-white font-medium text-sm flex items-center gap-2 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all"
        >
          <Plus className="w-4 h-4" />
          Nuevo Usuario
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
                <th className="px-6 py-4">Usuario</th>
                <th className="px-6 py-4">Rol</th>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-500/10">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-purple-100 font-medium">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30 shrink-0">
                        <User className="w-5 h-5 text-purple-300" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-white">
                          {user.name || "Sin nombre"}
                        </span>
                        <span className="text-xs text-purple-300/50">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium border ${user.role === "admin" ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-blue-500/10 text-blue-400 border-blue-500/20"}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-purple-300/50 font-mono">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors border border-blue-500/20"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors border border-red-500/20"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-purple-200/50"
                  >
                    No hay usuarios registrados
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
        title={editingUser ? "Editar Usuario" : "Nuevo Usuario"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-1.5">
              Nombre Completo
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-white/5 border border-purple-500/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm"
              placeholder="Juan Pérez"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-1.5">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-white/5 border border-purple-500/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm"
              placeholder="ejemplo@correo.com"
            />
          </div>

          {/* Password fields only for new users */}
          {!editingUser && (
            <>
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-1.5">
                  Contraseña
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-white/5 border border-purple-500/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm"
                  placeholder="Mínimo 8 caracteres"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-1.5">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={formData.passwordConfirm}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      passwordConfirm: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 bg-white/5 border border-purple-500/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm"
                  placeholder="Mínimo 8 caracteres"
                />
              </div>
            </>
          )}

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
              {editingUser ? "Guardar Cambios" : "Crear Usuario"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
