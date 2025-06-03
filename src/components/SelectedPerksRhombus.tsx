import React, { useState, useEffect } from "react";
import type { Perk } from "../Types/GeneralTypes";
import PerkSlot from "./PerkSlot";

const slotSizeDefinitions = {
  base: { dimension: "8rem", iconClass: "w-70 h-70" },
  sm: { dimension: "9rem", iconClass: "w-74 h-74" },
  md: { dimension: "10rem", iconClass: "w-78 h-78" },
};

const getCurrentSizeConfig = () => {
  if (typeof window === "undefined") return slotSizeDefinitions.md;
  if (window.innerWidth >= 768) return slotSizeDefinitions.md;
  if (window.innerWidth >= 640) return slotSizeDefinitions.sm;
  return slotSizeDefinitions.base;
};

interface SelectedPerksRhombusProps {
  perks: Perk[];
  onRemovePerk: (perkId: number) => void;
}

const SelectedPerksRhombus: React.FC<SelectedPerksRhombusProps> = ({
  perks,
  onRemovePerk,
}) => {
  const [currentSize, setCurrentSize] = useState(getCurrentSizeConfig());

  useEffect(() => {
    const handleResize = () => {
      setCurrentSize(getCurrentSizeConfig());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slotDimensionValue = currentSize.dimension;
  const iconContainerClassValue = currentSize.iconClass;

  const rhombusContainerDimension = `calc(${slotDimensionValue} * 2)`;

  const slotConfigurations = [
    { top: "20%", left: "50%", perk: perks[3] },
    { top: "58%", left: "13%", perk: perks[2] },
    { top: "58%", left: "87%", perk: perks[1] },
    { top: "96%", left: "50%", perk: perks[0] },
  ];

  return (
    <div className="flex justify-center items-center py-10 my-6">
      <div
        className="relative"
        style={{
          width: rhombusContainerDimension,
          height: rhombusContainerDimension,
        }}
      >
        {slotConfigurations.map(({ top, left, perk }, index) => (
          <PerkSlot
            key={perk ? perk.id : `empty-slot-${index}`}
            perk={perk}
            onRemove={perk ? (e, perkId) => onRemovePerk(perkId) : undefined}
            style={{
              position: "absolute",
              top: top,
              left: left,
              width: slotDimensionValue,
              height: slotDimensionValue,
              transform: "translate(-50%, -50%) rotate(45deg)",
            }}
            iconContainerClass={iconContainerClassValue}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectedPerksRhombus;
