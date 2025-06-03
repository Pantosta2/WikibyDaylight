// src/components/PerkSlot.tsx
import React from "react";
import type { Perk } from "../Types/GeneralTypes"; // Ajusta la ruta

interface PerkSlotProps {
  perk?: Perk;
  onRemove?: (e: React.MouseEvent, perkId: number) => void;
  // Estilos para posición absoluta, tamaño y transformación
  style: React.CSSProperties;
  // Clase para el tamaño del contenedor del ícono (responsivo)
  iconContainerClass: string;
  // No mostramos el número del slot si está vacío, para el nuevo estilo
}

const PerkSlot: React.FC<PerkSlotProps> = ({
  perk,
  onRemove,
  style,
  iconContainerClass,
}) => {
  const handleRemoveClick = (e: React.MouseEvent) => {
    if (perk && onRemove) {
      e.stopPropagation(); // Evita que el evento de click se propague si es necesario
      onRemove(e, perk.id);
    }
  };

  const title = perk ? `Quitar ${perk.name}` : `Espacio para Perk`;

  return (
    <div
      onClick={handleRemoveClick} // Click en el slot entero para quitar la perk
      style={style} // Aplica: position, top, left, width, height, transform
      className={`
        flex items-center justify-center shadow-xl group transition-all duration-200
        bg-slate-600 hover:bg-slate-500  // Estilo gris/plata
        border-2 border-black            // Borde negro
        ${perk && onRemove ? "cursor-pointer" : "cursor-default"}
      `}
      title={title}
    >
      {/* Div interior para "des-rotar" el contenido */}
      <div
        className={`transform -rotate-45 text-center flex flex-col items-center justify-center w-full h-full`}
      >
        {perk ? (
          <img
            src={perk.icon}
            alt={perk.name}
            className={`${iconContainerClass} object-contain`} // Tamaño del ícono dinámico
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              target.onerror = null;
              target.src = "https://via.placeholder.com/96?text=Icon"; // Placeholder
            }}
          />
        ) : (
          <div className="w-full h-full" /> // Slot vacío, solo muestra el fondo y borde
        )}
      </div>
    </div>
  );
};

export default PerkSlot;
