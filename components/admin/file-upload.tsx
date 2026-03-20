"use client";

import { useState, useCallback } from "react";
import { UploadCloud, X, File as FileIcon } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  onChange: (file: File | null) => void;
  value?: string | File | null;
  label?: string;
}

export function FileUpload({
  onChange,
  value,
  label = "Sube un archivo",
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  // Initialize preview if value is a string (URL)
  useState(() => {
    if (typeof value === "string") {
      setPreview(value);
    }
  });

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Generate preview for images
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }

    onChange(file);
  };

  const clearFile = () => {
    setPreview(null);
    onChange(null);
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-all 
          ${
            isDragging
              ? "border-purple-400 bg-purple-500/10"
              : "border-purple-500/30 bg-white/5 hover:bg-white/10 hover:border-purple-500/50"
          }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden group">
            <Image src={preview} alt="Preview" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                type="button"
                onClick={clearFile}
                className="px-4 py-2 bg-red-500/80 text-white rounded-full flex items-center gap-2 hover:bg-red-500 transition-colors backdrop-blur-sm shadow-lg"
              >
                <X className="w-4 h-4" /> Eliminar
              </button>
            </div>
          </div>
        ) : value instanceof File && !fileIsImage(value) ? (
          <div className="flex flex-col items-center justify-center py-6 text-center w-full relative group">
            <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
              <FileIcon className="w-8 h-8 text-purple-400" />
            </div>
            <p className="text-white font-medium">{value.name}</p>
            <p className="text-sm text-purple-200/60 mt-1">
              {(value.size / 1024 / 1024).toFixed(2)} MB
            </p>

            <button
              type="button"
              onClick={clearFile}
              className="absolute top-0 right-0 p-2 bg-white/10 rounded-full hover:bg-red-500/20 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500/20 transition-colors">
              <UploadCloud className="w-8 h-8 text-purple-400" />
            </div>
            <p className="text-sm font-medium text-white mb-1">{label}</p>
            <p className="text-xs text-purple-200/60 mb-4">
              Arrastra y suelta tu archivo aquí, o haz clic para explorar
            </p>
            <label className="px-6 py-2 rounded-full cursor-pointer bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-sm font-medium transition-colors border border-purple-500/30">
              Seleccionar Archivo
              <input
                type="file"
                className="hidden"
                onChange={handleFileInput}
                accept="image/*,application/pdf"
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper
function fileIsImage(file: File) {
  return file.type.startsWith("image/");
}
