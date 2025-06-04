import React from "react";
import type { Perk } from "../../Types/GeneralTypes"; 

interface PerkSlotProps {
  perk?: Perk;
  onRemove?: (e: React.MouseEvent, perkId: number) => void;
  style: React.CSSProperties;
  iconContainerClass: string;
}

const PerkSlot: React.FC<PerkSlotProps> = ({
  perk,
  onRemove,
  style,
  iconContainerClass,
}) => {
  const handleRemoveClick = (e: React.MouseEvent) => {
    if (perk && onRemove) {
      e.stopPropagation();
      onRemove(e, perk.id);
    }
  };

  const title = perk ? `Quitar ${perk.name}` : `Espacio para Perk`;

  return (
    <div
      onClick={handleRemoveClick}
      style={style}
      className={`
        flex items-center justify-center shadow-xl group transition-all duration-200
        bg-slate-600 hover:bg-slate-500  
        border-2 border-black          
        ${perk && onRemove ? "cursor-pointer" : "cursor-default"}
      `}
      title={title}
    >
      <div
        className={`transform -rotate-45 text-center flex flex-col items-center justify-center w-full h-full`}
      >
        {perk ? (
          <img
            src={perk.icon}
            alt={perk.name}
            className={`${iconContainerClass} object-contain`}
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              target.onerror = null;
              target.src = "https://via.placeholder.com/96?text=Icon";
            }}
          />
        ) : (
          <div className="w-full h-full" />
        )}
      </div>
    </div>
  );
};

export default PerkSlot;
