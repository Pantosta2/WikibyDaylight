// src/pages/MakeYourOwnBuildPage.tsx
import { GeneralNav } from "../layouts/GeneralNav";
import { DefinedImages } from "../assets/DefinedImages";
import { useCombinedRolePerks } from "../hooks/useCombinedRolePerks";
import { usePerkBuildManager } from "../hooks/usePerkBuildManager";
import { useTranslation } from "react-i18next";

import SelectedPerksRhombus from "../components/MakeYourBuildComponents/SelectedPerksRhombus";
import RoleSelection from "../components/MakeYourBuildComponents/RoleSelection";
import PerkSearchInput from "../components/MakeYourBuildComponents/PerkSearchInput";
import PerkListDisplay from "../components/MakeYourBuildComponents/PerkListDisplay";

export default function MakeYourOwnBuildPage() {
  const { t } = useTranslation();

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

  const {
    selectedPerks,
    currentRoleToList,
    searchQuery,
    handlePerkSelect,
    handlePerkRemove,
    handleSearchChange,
    handleRoleChange,
    filteredPerksToDisplay,
    isLoadingCurrentList,
    errorCurrentList,
    selectedPerksCount,
    maxPerks,
  } = usePerkBuildManager({
    initialSurvivorPerks: survivorPerks,
    initialKillerPerks: killerPerks,
    isLoadingSurvivors,
    isLoadingKillers,
    errorSurvivors,
    errorKillers,
  });

  return (
    <>
      <div className="relative min-h-screen w-full overflow-x-hidden bg-gray-900">
        <figure
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: `url(${DefinedImages.RedForest})`,
            opacity: 0.25,
          }}
        />
        <img
          src={DefinedImages.Fog}
          alt={t("backgroundImages.fogAlt", "Background Fog")}
          className="absolute -bottom-20 md:-bottom-40 w-full object-cover z-0 opacity-40"
        />
        <div className="relative z-10 flex flex-col min-h-screen">
          <GeneralNav />
          <main className="flex-grow px-4 py-10 sm:px-6 md:px-8 flex flex-col">
            <header className="text-center mb-8 mt-6">
              <p className="text-md sm:text-lg text-gray-300 mt-3 max-w-2xl mx-auto">
                {t(
                  "makeYourBuild.header.selectInstruction",
                  `Select up to ${maxPerks} perks (${selectedPerksCount}/${maxPerks}). Click on a perk in the list to add it.`,
                  { maxPerks: maxPerks, selectedCount: selectedPerksCount }
                )}
              </p>
            </header>

            <SelectedPerksRhombus
              perks={selectedPerks}
              onRemovePerk={handlePerkRemove}
            />

            <div className="mt-10 pt-8 border-t border-gray-700">
              <RoleSelection
                currentRole={currentRoleToList}
                onRoleChange={handleRoleChange}
              />
              <PerkSearchInput
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
              />
              <PerkListDisplay
                title=""
                perks={filteredPerksToDisplay}
                isLoading={isLoadingCurrentList}
                error={errorCurrentList}
                onPerkSelect={handlePerkSelect}
                selectedPerkIds={selectedPerks.map((p) => p.id)}
                maxPerksReached={selectedPerksCount >= maxPerks}
              />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
