// src/components/PerkSelectionModal.tsx
import React from 'react';
import type { Perk } from '../Types/GeneralTypes';
import PerkListDisplay from './PerkListDisplay';

interface PerkSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  survivorPerks: Perk[];
  isLoadingSurvivors: boolean;
  errorSurvivors: string | null;
  killerPerks: Perk[];
  isLoadingKillers: boolean;
  errorKillers: string | null;
  onPerkSelect: (perk: Perk) => void;
  selectedPerkIds: number[];
  maxPerksReached: boolean;
}

const PerkSelectionModal: React.FC<PerkSelectionModalProps> = ({
  isOpen,
  onClose,
  survivorPerks,
  isLoadingSurvivors,
  errorSurvivors,
  killerPerks,
  isLoadingKillers,
  errorKillers,
  onPerkSelect,
  selectedPerkIds,
  maxPerksReached,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
      <div className="bg-gray-800 p-5 sm:p-6 rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col border border-gray-700">
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-700">
          <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400">Selecciona una Perk</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-3xl leading-none p-1 hover:bg-gray-700 rounded-full"
            aria-label="Cerrar modal"
          >
            &times;
          </button>
        </div>

        <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 pr-2 -mr-2">
          {/* Pestañas o secciones para Survivor / Killer podrían ir aquí si quieres separarlos más */}
          <div className="space-y-6">
            <PerkListDisplay
              perks={survivorPerks}
              isLoading={isLoadingSurvivors}
              error={errorSurvivors}
              title="Sobreviviente"
              onPerkSelect={onPerkSelect}
              selectedPerkIds={selectedPerkIds}
              maxPerksReached={maxPerksReached}
            />
            <hr className="my-4 border-gray-700" />
            <PerkListDisplay
              perks={killerPerks}
              isLoading={isLoadingKillers}
              error={errorKillers}
              title="Asesino"
              onPerkSelect={onPerkSelect}
              selectedPerkIds={selectedPerkIds}
              maxPerksReached={maxPerksReached}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerkSelectionModal;