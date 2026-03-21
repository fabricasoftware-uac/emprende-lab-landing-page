"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { adminConfig, CollectionConfig } from "@/lib/admin-config";
import { DynamicTable } from "@/components/admin/dynamic-table";
import { DynamicForm } from "@/components/admin/dynamic-form";
import { Modal } from "@/components/admin/modal";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function CollectionPage() {
  const params = useParams();
  const collectionKey = params.collection as string;
  const config: CollectionConfig | undefined = adminConfig[collectionKey];

  const [data, setData] = useState<[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any | null>(null);
  const [confirmRecord, setConfirmRecord] = useState<any | null>(null);

  useEffect(() => {
    // Simulate fetching data based on the collection
    const fetchData = async () => {
      setLoading(true);
      try {
        const stored = localStorage.getItem(`admin_mock_${collectionKey}`);
        if (stored) {
          setData(JSON.parse(stored));
        } else {
          setData([]);
        }
      } catch (err) {
        console.error("Failed to fetch data", err);
        toast.error("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    if (config) {
      fetchData();
    }
  }, [collectionKey, config]);

  if (!config) {
    return (
      <div className="flex flex-col items-center justify-center p-12 glass rounded-2xl border border-red-500/20 text-center">
        <h2 className="text-2xl font-bold text-red-400 mb-2">
          Colección no encontrada
        </h2>
        <p className="text-purple-200/60">
          La colección "{collectionKey}" no existe en la configuración.
        </p>
      </div>
    );
  }

  const handleCreate = () => {
    setEditingRecord(null);
    setIsModalOpen(true);
  };

  const handleEdit = (record: any) => {
    setEditingRecord(record);
    setIsModalOpen(true);
  };

  const handleDeactivate = (record: any) => {
    setConfirmRecord(record);
  };

  const executeDeactivation = async () => {
    if (!confirmRecord) return;
    const { id, activo } = confirmRecord;
    const action = activo === false ? "activar" : "desactivar";

    // Simulate delete/update delay
    const promise = new Promise((resolve) => setTimeout(resolve, 600));

    toast.promise(promise, {
      loading: `${action.charAt(0).toUpperCase() + action.slice(1)}ndo...`,
      success: () => {
        const newData = data.map((item) =>
          item.id === id
            ? { ...item, activo: item.activo === false ? true : false }
            : item,
        );
        setData(newData);
        localStorage.setItem(
          `admin_mock_${collectionKey}`,
          JSON.stringify(newData),
        );
        setConfirmRecord(null);
        return `Registro ${activo === false ? "activado" : "desactivado"} correctamente`;
      },
      error: `Error al ${action} el registro`,
    });
  };

  const handleSubmit = async (formData: any) => {
    // Simulate API save delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    let newData;
    if (editingRecord) {
      // Update
      newData = data.map((item) =>
        item.id === editingRecord.id ? { ...formData, id: item.id } : item,
      );
      toast.success("Registro actualizado correctamente");
    } else {
      // Create
      const newRecord = {
        ...formData,
        id: Math.random().toString(36).substring(7),
      };
      newData = [newRecord, ...data];
      toast.success("Registro creado correctamente");
    }

    setData(newData);
    localStorage.setItem(
      `admin_mock_${collectionKey}`,
      JSON.stringify(newData),
    );
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin mb-4" />
        <p className="text-purple-200/60 font-medium">
          Buscando registros en las estrellas...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col mb-6">
        <h2 className="text-3xl font-bold text-white tracking-tight">
          {config.name}
        </h2>
        <p className="text-purple-200/60 mt-2 max-w-2xl">
          {config.description}
        </p>
      </div>

      <DynamicTable
        fields={config.fields}
        data={data}
        onEdit={handleEdit}
        onDeactivate={handleDeactivate}
        onCreate={handleCreate}
        title={config.name}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          editingRecord
            ? `Editar Registro: ${config.name}`
            : `Nuevo Registro: ${config.name}`
        }
      >
        <DynamicForm
          fields={config.fields}
          initialData={editingRecord}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        isOpen={!!confirmRecord}
        onClose={() => setConfirmRecord(null)}
        title={
          confirmRecord?.activo === false
            ? "Confirmar Reactivación"
            : "Confirmar Desactivación"
        }
      >
        <div className="space-y-6">
          <p className="text-purple-200">
            ¿Estás seguro de que deseas{" "}
            {confirmRecord?.activo === false ? "activar" : "desactivar"} este
            registro?
            {confirmRecord?.activo !== false
              ? " Al desactivarlo, no será visible para los usuarios pero sus datos se conservarán."
              : " El registro volverá a estar visible para los usuarios."}
          </p>
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-purple-500/20">
            <button
              onClick={() => setConfirmRecord(null)}
              className="px-6 py-2.5 rounded-full text-sm font-medium text-purple-200 bg-white/5 hover:bg-white/10 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={executeDeactivation}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-lg ${
                confirmRecord?.activo === false
                  ? "bg-green-500 hover:bg-green-600 shadow-green-500/20"
                  : "bg-red-500 hover:bg-red-600 shadow-red-500/20"
              }`}
            >
              {confirmRecord?.activo === false
                ? "Sí, Reactivar"
                : "Sí, Desactivar"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
