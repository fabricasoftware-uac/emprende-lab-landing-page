"use client";

import { Crosshair } from "lucide-react";

interface PositionPickerProps {
  value: string;
  onChange: (value: string) => void;
  imageUrl?: string;
}

const POSITIONS = [
  { value: "center 15%", label: "Arriba" },
  { value: "center 25%", label: "Centro-alto" },
  { value: "center center", label: "Centro" },
  { value: "center 75%", label: "Centro-bajo" },
  { value: "left 25%", label: "Izquierda" },
  { value: "right 25%", label: "Derecha" },
] as const;

const GRID_POSITIONS: Record<string, string> = {
  "0:0": "left 15%",
  "1:0": "center 15%",
  "2:0": "right 15%",
  "0:1": "left center",
  "1:1": "center center",
  "2:1": "right center",
  "0:2": "left 85%",
  "1:2": "center 85%",
  "2:2": "right 85%",
};

export function PositionPicker({
  value,
  onChange,
  imageUrl,
}: PositionPickerProps) {
  const current = value || "center center";

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Crosshair className="w-4 h-4 text-purple-400" />
        <span className="text-sm font-medium text-purple-200">
          Ajustar encuadre
        </span>
      </div>

      {/* Grid picker with image preview */}
      <div className="relative w-full max-w-64 aspect-square rounded-xl overflow-hidden border border-purple-500/20 bg-black/40">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Preview"
            className="w-full h-full object-cover"
            style={{ objectPosition: current }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-purple-300/20 text-xs">
            Sin imagen
          </div>
        )}

        {/* 3x3 clickable grid overlay */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
          {Array.from({ length: 9 }).map((_, i) => {
            const row = Math.floor(i / 3);
            const col = i % 3;
            const pos = GRID_POSITIONS[`${col}:${row}`];
            const isActive = current === pos;

            return (
              <button
                key={i}
                type="button"
                onClick={() => onChange(pos)}
                className={`relative border border-white/10 hover:bg-white/10 transition-colors ${
                  isActive ? "bg-purple-500/30 border-purple-400/50" : ""
                }`}
                title={pos}
              >
                {isActive && (
                  <Crosshair className="absolute inset-0 m-auto w-3 h-3 text-purple-300" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick select buttons */}
      <div className="flex flex-wrap gap-1.5">
        {POSITIONS.map((p) => (
          <button
            key={p.value}
            type="button"
            onClick={() => onChange(p.value)}
            className={`px-2.5 py-1 rounded-full text-[10px] font-medium border transition-colors ${
              current === p.value
                ? "bg-purple-500/20 text-purple-200 border-purple-500/40"
                : "text-purple-300/60 border-purple-500/20 hover:border-purple-500/40 hover:text-purple-200"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <p className="text-[10px] text-purple-300/40">
        Selecciona dónde centrar la imagen. Ideal para encuadrar rostros.
      </p>
    </div>
  );
}
