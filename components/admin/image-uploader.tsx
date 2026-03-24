"use client";

import { useState, useCallback, useRef } from "react";
import { UploadCloud, Image as ImageIcon, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  required?: boolean;
}

export function ImageUploader({
  value,
  onChange,
  label,
  required,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (file?: File) => {
    if (!file) return;

    // Optional validation
    if (!file.type.startsWith("image/")) {
      toast.error("Por favor, selecciona una imagen válida.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Error subiendo el archivo");

      const data = await res.json();
      if (data.url) {
        onChange(data.url);
        toast.success("Imagen subida correctamente");
      } else {
        throw new Error(data.error || "La subida falló");
      }
    } catch (error: any) {
      toast.error(error.message || "Error de red");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileChange(files[0]);
    }
  }, []);

  const handleRemove = () => {
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full flex justify-center">
      <input type="hidden" required={required} value={value || ""} />
      {!value ? (
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative w-full overflow-hidden border-2 border-dashed ${
            isDragging
              ? "border-purple-500 bg-purple-500/10"
              : "border-purple-500/30 bg-black/20"
          } rounded-2xl p-6 transition-all hover:border-purple-500 hover:bg-purple-500/10 cursor-pointer flex flex-col items-center justify-center gap-3 text-center min-h-35`}
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={(e) => handleFileChange(e.target.files?.[0])}
          />

          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
              <p className="text-sm font-medium text-purple-200">Subiendo...</p>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center border border-purple-500/30">
                <UploadCloud className="w-6 h-6 text-purple-300" />
              </div>
              <div>
                <p className="text-sm font-medium text-purple-200">
                  <span className="text-purple-400">Haz clic para subir</span> o
                  arrastra y suelta
                </p>
                <p className="text-xs text-purple-300/50 mt-1">
                  SVG, PNG, JPG, WEBP (max. 10MB)
                </p>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="relative w-full rounded-2xl overflow-hidden glass border border-purple-500/30 group bg-black/20">
          <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={handleRemove}
              className="w-8 h-8 rounded-full bg-red-500/80 hover:bg-red-500 text-white flex items-center justify-center backdrop-blur-md shadow-lg transition-transform hover:scale-105"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-center min-h-35 p-2">
            <img
              src={value}
              alt="Upload preview"
              className="max-h-48 object-contain rounded-xl"
            />
          </div>

          {/* Small info footer */}
          <div className="absolute bottom-0 inset-x-0 bg-black/50 backdrop-blur-md p-2 flex items-center gap-2 border-t border-purple-500/20 text-xs font-mono text-purple-300/80 truncate px-3">
            <ImageIcon className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{value.split("/").pop()}</span>
          </div>
        </div>
      )}
    </div>
  );
}
