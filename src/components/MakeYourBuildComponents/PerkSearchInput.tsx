import React from "react";
import { useTranslation } from "react-i18next";

interface PerkSearchInputProps {
  searchQuery: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PerkSearchInput: React.FC<PerkSearchInputProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className="mb-6 max-w-lg mx-auto">
      <input
        type="text"
        placeholder={t(
          "makeYourBuild.search.placeholder",
          "Search perk by name, description..."
        )}
        value={searchQuery}
        onChange={onSearchChange}
        className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-shadow"
      />
    </div>
  );
};

export default PerkSearchInput;
