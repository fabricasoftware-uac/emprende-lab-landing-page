"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";
import { Modal } from "@/components/admin/modal";
import { ConfirmModal } from "@/components/admin/confirm-modal";
import { saveEntrada } from "./actions";
import { useRouter } from "next/navigation";

export function DynamicCollectionClient({
  proyecto,
  esquema,
  initialRecords,
}: {
  proyecto: any;
  esquema: any;
  initialRecords: any[];
}) {
  const router = useRouter();
  const isSingleton = esquema.esRegistroUnico;

  // Single record for singleton
  const singletonRecord = isSingleton ? initialRecords[0] : null;

  const [records, setRecords] = useState<any[]>(initialRecords);
  const [submitting, setSubmitting] = useState(false);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(
    isSingleton ? singletonRecord : null,
  );
  const [formData, setFormData] = useState<any>(
    isSingleton && singletonRecord ? singletonRecord.contenido : {},
  );

  const handleOpenModal = (record: any = null) => {
    if (record) {
      setEditingRecord(record);
      setFormData({ ...record.contenido });
    } else {
      setEditingRecord(null);
      const initial: any = {};
      esquema?.campos?.forEach((f: any) => {
        initial[f.id] = f.type === "boolean" ? false : "";
      });
      setFormData(initial);
    }
    setIsModalOpen(true);
  };

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await saveEntrada(
        proyecto.id,
        esquema.slug,
        esquema.campos,
        formData,
        editingRecord?.id,
      );

      if (res?.error) {
        toast.error("Error validando o guardando la información.");
        console.error(res.error);
        return;
      }

      toast.success("Información guardada correctamente");
      setIsModalOpen(false);
      router.refresh(); // Tells NextJS App Router to re-fetch Server Components Data
    } catch (error) {
      toast.error("Ocurrió un error inesperado al guardar.");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/entradas?id=${deleteId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      toast.success("Registro eliminado");
      router.refresh();
    } catch (error) {
      toast.error("Error al eliminar");
      console.error(error);
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const executeDelete = (id: string) => {
    setDeleteId(id);
  };

  const renderField = (field: any) => {
    const commonClasses =
      "w-full px-4 py-2 bg-white/5 border border-purple-500/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-sm";

    switch (field.type) {
      case "textarea":
        return (
          <textarea
            required={field.required}
            value={formData[field.id] || ""}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
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
              onChange={(e) => handleFieldChange(field.id, e.target.checked)}
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
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className={commonClasses}
            placeholder={field.label}
          />
        );
      case "image":
        return (
          <div className="flex flex-col gap-2">
            <input
              type="url"
              required={field.required}
              value={formData[field.id] || ""}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className={commonClasses}
              placeholder={`URL de ${field.label}`}
            />
            {formData[field.id] && (
              <img
                src={formData[field.id]}
                alt="Preview"
                className="h-20 w-auto rounded border border-purple-500/20 object-cover"
              />
            )}
          </div>
        );
      default:
        return (
          <input
            type="text"
            required={field.required}
            value={formData[field.id] || ""}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className={commonClasses}
            placeholder={field.label}
          />
        );
    }
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div
        className={`${!isSingleton ? "space-y-4 max-h-100 overflow-y-auto pr-2 custom-scrollbar" : "space-y-6"}`}
      >
        {esquema?.campos?.map((field: any) => (
          <div key={field.id}>
            <label className="block text-xs font-bold text-purple-300/50 uppercase tracking-tighter mb-1.5 ml-1">
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            {renderField(field)}
          </div>
        ))}
        {esquema?.campos?.length === 0 && (
          <p className="text-purple-300/60 text-sm">
            Este esquema no tiene campos definidos.
          </p>
        )}
      </div>

      <div
        className={`pt-4 flex justify-end gap-3 ${!isSingleton ? "border-t border-purple-500/10" : ""}`}
      >
        {!isSingleton && (
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="px-5 py-2.5 rounded-full text-xs font-medium text-purple-200 bg-white/5 hover:bg-white/10 transition-colors"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="px-5 py-2.5 rounded-full bg-linear-to-r from-purple-500 to-indigo-500 text-white font-medium text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all disabled:opacity-50"
        >
          {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
          {editingRecord || isSingleton ? "Guardar Cambios" : "Guardar Nuevo"}
        </button>
      </div>
    </form>
  );

  if (isSingleton) {
    return (
      <div className="glass rounded-2xl border border-purple-500/20 p-6 shadow-[0_0_30px_rgba(0,0,0,0.2)]">
        {renderForm()}
      </div>
    );
  }

  // Not Singleton => List Records
  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2 rounded-full bg-linear-to-r from-purple-500 to-indigo-500 text-white font-medium text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all"
        >
          <Plus className="w-4 h-4" />
          Añadir {esquema.nombre}
        </button>
      </div>

      <div className="glass rounded-2xl border border-purple-500/20 overflow-x-auto shadow-[0_0_30px_rgba(0,0,0,0.2)]">
        <table className="w-full text-left min-w-150">
          <thead>
            <tr className="bg-purple-900/20 border-b border-purple-500/20 text-[10px] font-bold text-purple-200 uppercase tracking-widest">
              {esquema?.campos?.slice(0, 4).map(
                (
                  f: any, // only show up to 4 columns to avoid clutter
                ) => (
                  <th key={f.id} className="px-6 py-4 truncate max-w-40">
                    {f.label}
                  </th>
                ),
              )}
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-500/10">
            {initialRecords.map((rec) => (
              <tr
                key={rec.id}
                className="hover:bg-white/5 transition-colors group"
              >
                {esquema?.campos?.slice(0, 4).map((f: any) => (
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
                    ) : f.type === "image" ? (
                      rec.contenido[f.id] ? (
                        <img
                          src={rec.contenido[f.id]}
                          className="h-8 w-8 rounded-full border border-purple-500/40 object-cover"
                        />
                      ) : (
                        "-"
                      )
                    ) : (
                      <div
                        className="max-w-40 truncate"
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
                      onClick={() => executeDelete(rec.id)}
                      className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors border border-red-500/20"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {initialRecords.length === 0 && (
              <tr>
                <td
                  colSpan={(esquema?.campos?.slice(0, 4).length || 0) + 1}
                  className="px-6 py-8 text-center text-purple-200/50"
                >
                  Todavía no hay ningun registro.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          editingRecord
            ? `Editar ${esquema?.nombre}`
            : `Crear ${esquema?.nombre}`
        }
      >
        {renderForm()}
      </Modal>

      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title={`Eliminar Registro de ${esquema?.nombre}`}
        message="¿Estás seguro de que deseas eliminar permanentemente este registro? Esta acción no se puede deshacer."
        isLoading={deleting}
      />
    </>
  );
}
