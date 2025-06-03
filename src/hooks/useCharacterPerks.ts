import { useState, useEffect } from "react";
import type { Perk } from "../services/GeneralGetService"; 
import { getCharacterPerks } from "../services/GeneralGetService";

type UseCharacterPerksProps = {
  characterRole: "killer" | "survivor";
  characterCode?: string;
  enabled: boolean; 
};

export function useCharacterPerks({
  characterRole,
  characterCode,
  enabled,
}: UseCharacterPerksProps) {
  const [perks, setPerks] = useState<Perk[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (enabled && characterCode) {
      const fetchPerks = async () => {
        setIsLoading(true);
        setError(null);
        setPerks([]); 

        try {
          const response = await getCharacterPerks(characterRole, characterCode);
          let perksData: Perk[] = [];
          if (Array.isArray(response.data)) {
            perksData = response.data;
          } else if (response.data && Array.isArray((response.data as any).data)) {
            perksData = (response.data as any).data;
          } else {
            setError("Formato de perks inesperado.");
          }
          setPerks(perksData);
        } catch (err) {
          setError(`Couldn't load perks.`);
          setPerks([]);
        } finally {
          setIsLoading(false);
        }
      };
      fetchPerks();
    } else {
      setPerks([]);
      setIsLoading(false);
      setError(null);
    }
  }, [characterRole, characterCode, enabled]); 

  return {
    perks,
    isLoadingPerks: isLoading, 
    errorPerks: error,       
  };
}