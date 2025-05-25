import { useEffect, useState } from "react";
import type { AxiosResponse } from "axios";
import type {
  CharacterApiData,
  CharacterListResponse,
} from "../services/GeneralGetService";

type PortraitListProps = {
  fetchFunction: () => Promise<AxiosResponse<CharacterListResponse>>;
  onButtonClick: (caharacterData: CharacterApiData) => void;
};

export default function PortraitCharacterList({
  fetchFunction,
  onButtonClick,
}: PortraitListProps) {
  const [characters, setCharacters] = useState<CharacterApiData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setError(null);
        const response = await fetchFunction();
        setCharacters(response.data.data || []);
      } catch (err) {
        console.error("Error fetching character list", err);
        setError("Failed to load characters");
        setCharacters([]);
      }
    };
    loadData();
  }, [fetchFunction]);

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  return (
    <section className="flex flex-row flex-wrap mx-[3rem] mt-26 text-center justify-center relative z-20">
      {characters.map((character) => (
        <button
          key={character.number}
          className="flex flex-col mb-20 cursor-pointer hover:scale-105 transition-transform duration-300 relative"
          onClick={() => onButtonClick(character)}
        >
          <img
            src={character.imgs.portrait}
            alt={`Retrato de ${character.name}`}
            className="size-[20rem] block"
          />
          <p className=" bg-gray-600/70 text-white font-semibold text-2xl mx-[3rem] py-1 ">
            {character.name}
          </p>
        </button>
      ))}
    </section>
  );
}
