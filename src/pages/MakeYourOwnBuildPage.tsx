// src/pages/MakeYourOwnBuildPage.tsx
import { useState } from "react";
import { GeneralNav } from "../layouts/GeneralNav";
import { DefinedImages } from "../assets/DefinedImages";
import { useCombinedRolePerks } from "../hooks/useCombinedRolePerks";
import type { Perk } from "../Types/GeneralTypes";

import SelectedPerksRhombus from "../components/SelectedPerksRhombus";
import PerkListDisplay from "../components/PerkListDisplay"; // Usaremos este para las listas

type RoleForSelection = "survivor" | "killer";

export default function MakeYourOwnBuildPage() {
  const [selectedPerks, setSelectedPerks] = useState<Perk[]>([]);
  const [currentRoleToList, setCurrentRoleToList] =
    useState<RoleForSelection>("survivor");
  const MAX_PERKS = 4;

  const {
    allPerks: survivorPerks,
    isLoadingAllPerks: isLoadingSurvivors,
    errorAllPerks: errorSurvivors,
  } = useCombinedRolePerks({ role: "survivor", enabled: true });

  const {
    allPerks: killerPerks,
    isLoadingAllPerks: isLoadingKillers,
    errorAllPerks: errorKillers,
  } = useCombinedRolePerks({ role: "killer", enabled: true });

  const handlePerkSelect = (perkToAdd: Perk) => {
    setSelectedPerks((prevSelectedPerks) => {
      if (prevSelectedPerks.find((p) => p.id === perkToAdd.id)) {
        return prevSelectedPerks;
      }
      if (prevSelectedPerks.length >= MAX_PERKS) {
        alert("Ya has alcanzado el límite de 4 perks."); // O una notificación más sutil
        return prevSelectedPerks;
      }
      return [...prevSelectedPerks, perkToAdd];
    });
  };

  const handlePerkRemove = (perkIdToRemove: number) => {
    setSelectedPerks((prevSelectedPerks) =>
      prevSelectedPerks.filter((p) => p.id !== perkIdToRemove)
    );
  };

  const perksToShowInList =
    currentRoleToList === "survivor" ? survivorPerks : killerPerks;
  const isLoadingCurrentList =
    currentRoleToList === "survivor" ? isLoadingSurvivors : isLoadingKillers;
  const errorCurrentList =
    currentRoleToList === "survivor" ? errorSurvivors : errorKillers;

  return (
    <>
      <div className="relative min-h-screen w-full overflow-x-hidden bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: `url(${DefinedImages.RedForest})`,
            opacity: 0.25,
          }}
        />
        <img
          src={DefinedImages.Fog}
          alt="Niebla de Fondo"
          className="absolute -bottom-20 md:-bottom-40 w-full object-cover z-0 opacity-40"
        />
        <div className="relative z-10 flex flex-col min-h-screen">
          <GeneralNav />
        </div>
        <main className="flex-grow container mx-auto px-4 py-10 sm:px-6 md:px-8 flex flex-col absolute z-40">
          <header className="text-center mb-8 mt-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter">
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-yellow-400 via-red-500 to-pink-600">
                Crea tu Build
              </span>
            </h1>
            <p className="text-md sm:text-lg text-gray-300 mt-3 max-w-2xl mx-auto">
              Selecciona hasta {MAX_PERKS} perks ({selectedPerks.length}/
              {MAX_PERKS}). Haz clic en una perk de la lista para añadirla.
            </p>
          </header>

          <SelectedPerksRhombus
            perks={selectedPerks}
            onRemovePerk={handlePerkRemove}
          />
          <div className="mt-10 pt-8 border-t border-gray-700">
            <div className="flex justify-center items-center mb-6 space-x-3 sm:space-x-4">
              <button
                onClick={() => setCurrentRoleToList("survivor")}
                className={`py-2 px-4 sm:py-3 sm:px-6 rounded-lg font-semibold transition-all duration-200 text-sm sm:text-base
                  ${
                    currentRoleToList === "survivor"
                      ? "bg-blue-500 text-white shadow-lg ring-2 ring-blue-300"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
              >
                Perks de Sobreviviente
              </button>
              <button
                onClick={() => setCurrentRoleToList("killer")}
                className={`py-2 px-4 sm:py-3 sm:px-6 rounded-lg font-semibold transition-all duration-200 text-sm sm:text-base
                  ${
                    currentRoleToList === "killer"
                      ? "bg-red-600 text-white shadow-lg ring-2 ring-red-400"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
              >
                Perks de Asesino
              </button>
            </div>

            <PerkListDisplay
              title=""
              perks={perksToShowInList}
              isLoading={isLoadingCurrentList}
              error={errorCurrentList}
              onPerkSelect={handlePerkSelect}
              selectedPerkIds={selectedPerks.map((p) => p.id)}
              maxPerksReached={selectedPerks.length >= MAX_PERKS}
            />
          </div>
        </main>
      </div>
    </>
  );
}
