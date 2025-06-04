// src/hooks/usePerkBuildManager.ts
import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next'; // Para el mensaje de alerta
import type { Perk } from '../Types/GeneralTypes'; // Ajusta la ruta según tu estructura

type RoleForSelection = "survivor" | "killer";

interface UsePerkBuildManagerProps {
  initialSurvivorPerks?: Perk[];
  initialKillerPerks?: Perk[];
  isLoadingSurvivors: boolean;
  isLoadingKillers: boolean;
  errorSurvivors?: Error | null; // Asume que el error puede ser de tipo Error o null
  errorKillers?: Error | null;
  maxPerks?: number;
}

export function usePerkBuildManager({
  initialSurvivorPerks = [],
  initialKillerPerks = [],
  isLoadingSurvivors,
  isLoadingKillers,
  errorSurvivors,
  errorKillers,
  maxPerks = 4,
}: UsePerkBuildManagerProps) {
  const { t } = useTranslation(); // Hook de i18next para traducciones
  const [selectedPerks, setSelectedPerks] = useState<Perk[]>([]);
  const [currentRoleToList, setCurrentRoleToList] =
    useState<RoleForSelection>("survivor");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handlePerkSelect = (perkToAdd: Perk) => {
    setSelectedPerks((prevSelectedPerks) => {
      if (prevSelectedPerks.find((p) => p.id === perkToAdd.id)) {
        return prevSelectedPerks; // Ya está seleccionado
      }
      if (prevSelectedPerks.length >= maxPerks) {
        alert(t('makeYourBuild.alerts.perkLimitReached', `You have reached the ${maxPerks} perk limit.`));
        return prevSelectedPerks; // Límite alcanzado
      }
      return [...prevSelectedPerks, perkToAdd];
    });
  };

  const handlePerkRemove = (perkIdToRemove: number) => {
    setSelectedPerks((prevSelectedPerks) =>
      prevSelectedPerks.filter((p) => p.id !== perkIdToRemove)
    );
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleRoleChange = (role: RoleForSelection) => {
    setCurrentRoleToList(role);
    setSearchQuery(""); // Limpiar búsqueda al cambiar de rol
  };

  const perksForCurrentRole = useMemo(() => {
    return currentRoleToList === "survivor" ? initialSurvivorPerks : initialKillerPerks;
  }, [currentRoleToList, initialSurvivorPerks, initialKillerPerks]);

  const isLoadingCurrentList = useMemo(() => {
    return currentRoleToList === "survivor" ? isLoadingSurvivors : isLoadingKillers;
  }, [currentRoleToList, isLoadingSurvivors, isLoadingKillers]);

  const errorCurrentList = useMemo(() => {
    return currentRoleToList === "survivor" ? errorSurvivors : errorKillers;
  }, [currentRoleToList, errorSurvivors, errorKillers]);

  const filteredPerksToDisplay = useMemo(() => {
    if (!perksForCurrentRole) return [];
    return perksForCurrentRole.filter((perk) => {
      const query = searchQuery.toLowerCase();
      // Asegúrate de que perk.name y perk.description existan y sean strings
      const nameMatch = perk.name?.toLowerCase().includes(query) ?? false;
      const descriptionMatch = perk.description?.toLowerCase().includes(query) ?? false;
      return nameMatch || descriptionMatch;
    });
  }, [perksForCurrentRole, searchQuery]);

  return {
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
    selectedPerksCount: selectedPerks.length,
    maxPerks, // Devolvemos maxPerks por si se necesita en la UI directamente desde el hook
  };
}