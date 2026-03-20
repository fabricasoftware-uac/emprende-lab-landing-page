"use client";

import { useState, useEffect } from "react";
import { FieldConfig } from "@/lib/admin-config";
import { FileUpload } from "./file-upload";
import { Loader2 } from "lucide-react";

interface DynamicFormProps {
  fields: FieldConfig[];
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

export function DynamicForm({
  fields,
  initialData,
  onSubmit,
  onCancel,
}: DynamicFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Initialize empty state
      const emptyState: Record<string, any> = {};
      fields.forEach((field) => {
        emptyState[field.name] =
          field.type === "select" && field.options
            ? field.options[0].value
            : "";
      });
      setFormData(emptyState);
    }
  }, [initialData, fields]);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full appearance-none block px-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg shadow-sm placeholder-purple-300/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-sm transition-all focus:bg-white/10";
  const labelClasses = "block text-sm font-medium text-purple-100 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-5">
        {fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className={labelClasses}>
              {field.label}{" "}
              {field.required && <span className="text-red-400">*</span>}
            </label>

            {field.type === "text" && (
              <input
                id={field.name}
                type="text"
                required={field.required}
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className={inputClasses}
                placeholder={`Ingresa ${field.label.toLowerCase()}`}
              />
            )}

            {field.type === "number" && (
              <input
                id={field.name}
                type="number"
                required={field.required}
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className={inputClasses}
              />
            )}

            {field.type === "textarea" && (
              <textarea
                id={field.name}
                required={field.required}
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className={`${inputClasses} min-h-30 resize-y`}
                placeholder={`Escribe la ${field.label.toLowerCase()}`}
              />
            )}

            {field.type === "select" && field.options && (
              <div className="relative">
                <select
                  id={field.name}
                  required={field.required}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className={`${inputClasses} appearance-none cursor-pointer`}
                >
                  {field.options.map((opt) => (
                    <option
                      key={opt.value}
                      value={opt.value}
                      className="bg-[#1a0f2e] text-white"
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {field.type === "file" && (
              <FileUpload
                label={`Sube una ${field.label.toLowerCase()}`}
                value={formData[field.name]}
                onChange={(file) => handleChange(field.name, file)}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-3 pt-6 border-t border-purple-500/20 mt-8">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-6 py-2.5 rounded-full text-sm font-medium text-purple-200 bg-white/5 hover:bg-white/10 border border-purple-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-linear-to-r from-purple-500 to-blue-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {initialData ? "Guardar Cambios" : "Crear Registro"}
        </button>
      </div>
    </form>
  );
}
