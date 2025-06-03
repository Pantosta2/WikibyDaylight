// src/hooks/useCombinedRolePerks.ts
// ... (código completo del hook useCombinedRolePerks de la respuesta anterior)
// Es el que hace:
// 1. Fetch general perks (getCharacterPerks(role, "all"))
// 2. Fetch characters (getKillers/getSurvivors)
// 3. Fetch perks for each character (getCharacterPerks(role, character.code))
// 4. Combina y deduplica (usando perk.id)
import { useState, useEffect } from "react";
import {
  getCharacterPerks,
  getKillers,
  getSurvivors,
} from "../services/GeneralGetService";
import type { Perk, CharacterProfileData } from "../Types/GeneralTypes";
import axios from 'axios';

type UseCombinedRolePerksProps = {
  role: "killer" | "survivor";
  enabled: boolean;
};

export function useCombinedRolePerks({ role, enabled }: UseCombinedRolePerksProps) {
  const [perks, setPerks] = useState<Perk[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setPerks([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    const fetchAllPerksForRole = async () => {
      setIsLoading(true);
      setError(null);
      let combinedPerksList: Perk[] = [];

      try {
        const generalPerksResponse = await getCharacterPerks(role, "all");
        let generalPerksData: Perk[] = [];
        if (Array.isArray(generalPerksResponse.data)) {
          generalPerksData = generalPerksResponse.data;
        } else if (generalPerksResponse.data && Array.isArray((generalPerksResponse.data as any).data)) {
          generalPerksData = (generalPerksResponse.data as any).data;
        }
        if (generalPerksData && generalPerksData.length > 0) {
          combinedPerksList.push(...generalPerksData.filter(p => p && typeof p.id === 'number'));
        }

        let characters: CharacterProfileData[] = [];
        if (role === "killer") {
          const killersResponse = await getKillers();
          characters = killersResponse.data.data || [];
        } else {
          const survivorsResponse = await getSurvivors();
          characters = survivorsResponse.data.data || [];
        }

        const characterPerkPromises = characters.map(character =>
          getCharacterPerks(role, character.code)
            .then(response => {
              let charPerksData: Perk[] = [];
              if (Array.isArray(response.data)) {
                charPerksData = response.data;
              } else if (response.data && Array.isArray((response.data as any).data)) {
                charPerksData = (response.data as any).data;
              }
              return charPerksData.filter(p => p && typeof p.id === 'number');
            })
            .catch(charPerkError => {
              console.warn(`Error obteniendo perks para ${character.name} (${character.code}):`, charPerkError);
              return [];
            })
        );

        const perksByCharacterArrays = await Promise.all(characterPerkPromises);
        perksByCharacterArrays.forEach(charPerks => {
          if (charPerks && charPerks.length > 0) {
            combinedPerksList.push(...charPerks);
          }
        });

        const uniquePerksMap = new Map<number, Perk>();
        combinedPerksList.forEach(perk => {
          if (perk && typeof perk.id === 'number') {
            uniquePerksMap.set(perk.id, perk);
          }
        });
        setPerks(Array.from(uniquePerksMap.values()));

      } catch (err) {
        let errorMessage = `No se pudieron cargar todas las perks para ${role}.`;
        if (axios.isAxiosError(err)) {
            errorMessage += ` Error: ${err.message}.`;
            if (err.response) errorMessage += ` Estado: ${err.response.status}.`;
        } else if (err instanceof Error) {
            errorMessage += ` Error: ${err.message}.`;
        }
        setError(errorMessage);
        setPerks([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllPerksForRole();
  }, [role, enabled]);

  return {
    allPerks: perks,
    isLoadingAllPerks: isLoading,
    errorAllPerks: error,
  };
}