import React from "react";
import { useTranslation } from "react-i18next";
type RoleForSelection = "survivor" | "killer";

interface RoleSelectionProps {
  currentRole: RoleForSelection;
  onRoleChange: (role: RoleForSelection) => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({
  currentRole,
  onRoleChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center items-center mb-6 space-x-3 sm:space-x-4">
      <button
        onClick={() => onRoleChange("survivor")}
        className={`py-2 px-4 sm:py-3 sm:px-6 rounded-lg font-semibold transition-all duration-200 text-sm sm:text-base
        ${
          currentRole === "survivor"
            ? "bg-blue-500 text-white shadow-lg ring-2 ring-blue-300"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
      >
        {t("makeYourBuild.roles.survivorPerks", "Survivor Perks")}
      </button>
      <button
        onClick={() => onRoleChange("killer")}
        className={`py-2 px-4 sm:py-3 sm:px-6 rounded-lg font-semibold transition-all duration-200 text-sm sm:text-base
        ${
          currentRole === "killer"
            ? "bg-red-600 text-white shadow-lg ring-2 ring-red-400"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
      >
        {t("makeYourBuild.roles.killerPerks", "Killer Perks")}
      </button>
    </div>
  );
};

export default RoleSelection;
