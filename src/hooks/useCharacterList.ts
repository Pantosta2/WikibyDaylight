import { useEffect, useState } from "react";
import type { AxiosResponse } from "axios";
import type {
  CharacterProfileData,
  CharacterListEnvelope,
} from "../services/GeneralGetService";

export function useCharacterList(
  fetchFunctionFactory: () => Promise<AxiosResponse<CharacterListEnvelope>>
) {
  const [characters, setCharacters] = useState<CharacterProfileData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchFunctionFactory();
        if (response.data && Array.isArray(response.data.data)) {
          setCharacters(response.data.data);
        } else {
          console.error(
            "API list response did not contain data array:",
            response.data
          );
          setCharacters([]);
          setError("Unexpected character list format.");
        }
      } catch (err) {
        console.error("Failed to load characters:", err);
        setError("Failed to load characters");
        setCharacters([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [fetchFunctionFactory]);

  return { characters, errorList: error, isLoadingList: isLoading }; 
}