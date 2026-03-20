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

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any | null>(null);

  useEffect(() => {
    // Simulate fetching data based on the collection
    const fetchData = async () => {
      setLoading(true);
      try {
        // Mock delay to simulate network request
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mock data loading strategy: read from localStorage or return empty array
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

  const handleDeactivate = async (id: string) => {
    if (!window.confirm("¿Estás seguro de que deseas desactivar este registro?"))
      return;

    // Simulate delete delay
    const promise = new Promise((resolve) => setTimeout(resolve, 600));

    toast.promise(promise, {
      loading: "Desactivando...",
      success: () => {
        const newData = data.filter((item) => item.id !== id);
        setData(newData);
        localStorage.setItem(
          `admin_mock_${collectionKey}`,
          JSON.stringify(newData),
        );
        return "Registro desactivado correctamente";
      },
      error: "Error al desactivar el registro",
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
    </div>
  );
}
