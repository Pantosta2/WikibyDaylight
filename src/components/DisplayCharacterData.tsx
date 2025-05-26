import { useState, useEffect } from "react";
import type { AxiosResponse } from "axios";
import PortraitCharacterList from "./PortraitCharacterList";
import {
  getCharacterPerks,
  type CharacterProfileData,
  type CharacterListEnvelope,
  type Perk,
} from "../services/GeneralGetService";
import type { KillerApiData, SurvivorApiData } from "../Types/GeneralTypes";

type DisplayCharacterDataProps = {
  fetchFunction: () => Promise<AxiosResponse<CharacterListEnvelope>>;
  characterRole: "killer" | "survivor";
};
export default function DisplayCharacterData({
  fetchFunction,
  characterRole,
}: DisplayCharacterDataProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] =
    useState<CharacterProfileData | null>(null);
  const [specificPerks, setSpecificPerks] = useState<Perk[]>([]);
  const [isLoadingPerks, setIsLoadingPerks] = useState<boolean>(false);
  const [errorPerks, setErrorPerks] = useState<string | null>(null);

  useEffect(() => {
    if (selectedCharacter && selectedCharacter.code && isModalOpen) {
      const fetchPerksForCharacter = async () => {
        setIsLoadingPerks(true);
        setErrorPerks(null);
        setSpecificPerks([]);

        try {
          const response = await getCharacterPerks(
            characterRole,
            selectedCharacter.code
          );

          if (Array.isArray(response.data)) {
            setSpecificPerks(response.data);
          } else if (
            response.data &&
            Array.isArray((response.data as any).data)
          ) {
            setSpecificPerks((response.data as any).data);
          } else {
            setErrorPerks("Formato de perks inesperado.");
            setSpecificPerks([]);
          }
        } catch (err) {
          console.error(
            `EFFECT: Error fetching perks for ${selectedCharacter.name}:`,
            err
          );
          setErrorPerks(
            `No se pudieron cargar los perks para ${selectedCharacter.name}.`
          );
          setSpecificPerks([]);
        } finally {
          setIsLoadingPerks(false);
        }
      };
      fetchPerksForCharacter();
    }
  }, [selectedCharacter, isModalOpen, characterRole]);

  const handlePortraitClick = (character: CharacterProfileData) => {
    setIsModalOpen(true);
    setSelectedCharacter(character);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCharacter(null);
    setSpecificPerks([]);
  };

  const renderPerks = (perks: Perk[]) => {
    if (isLoadingPerks)
      return <p className="text-sm text-gray-600 my-4">Loading perks...</p>;
    if (errorPerks)
      return <p className="text-sm text-red-500 my-4">{errorPerks}</p>;
    if (!perks || perks.length === 0) {
      return <p className="text-sm text-gray-600">No perks listed</p>;
    }
    return (
      <>
        <h4 className="text-lg font-semibold mt-3 mb-1 text-gray-800">
          Perks:
        </h4>
        <ul className="space-y-3">
          {perks.map((perk, index) => (
            <li
              key={perk.name || `perk-${index}`}
              className="p-2 border rounded-md shadow-sm"
            >
              <div className="flex items-center mb-1">
                {perk.icon && (
                  <img
                    src={perk.icon}
                    alt={perk.name}
                    className="w-10 h-10 mr-3 border object-contain"
                  />
                )}
                <strong className="text-md text-gray-700">{perk.name}</strong>
              </div>
              <p className="text-xs text-gray-600">{perk.description}</p>
            </li>
          ))}
        </ul>
      </>
    );
  };
  return (
    <>
      <PortraitCharacterList
        onButtonClick={handlePortraitClick}
        fetchFunction={fetchFunction}
      />

      {isModalOpen && selectedCharacter && (
        <div className="absolute inset-0 bg-gray-600/50 z-40 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
            <h2 className="text-2xl font-bold mb-4">
              {selectedCharacter.name}
            </h2>
          </div>

          <div className="space-y-2 mb-4">
            <p>
              <span className="font-semibold text-gray-700">Overview:</span>
              <span>{selectedCharacter.overview}</span>
            </p>

            <p>
              <span className="font-semibold text-gray-700">Backstory:</span>
              <span>{selectedCharacter.backstory}</span>
            </p>
          </div>

          {characterRole === "killer" &&
            (selectedCharacter as KillerApiData).role === "killer" && (
              <div>
                <h3>killer details</h3>

                {(selectedCharacter as KillerApiData).fullname && (
                  <p>
                    Full name: {(selectedCharacter as KillerApiData).fullname}
                  </p>
                )}

                <p>
                  Difficulty: {(selectedCharacter as KillerApiData).difficulty}
                </p>

                <p>
                  Move speed: {(selectedCharacter as KillerApiData).moveSpeed}
                </p>

                <p>
                  Terror radius:
                  {(selectedCharacter as KillerApiData).terrorRadius}
                </p>

                {(selectedCharacter as KillerApiData).power.name && (
                  <p>
                    Power: {(selectedCharacter as KillerApiData).power.name}
                  </p>
                )}

                {(selectedCharacter as KillerApiData).power.description && (
                  <p>
                    Description:
                    {(selectedCharacter as KillerApiData).power.description}
                  </p>
                )}
              </div>
            )}

          {characterRole === "survivor" &&
            (selectedCharacter as SurvivorApiData).role === "survivor" && (
              <div>
                <h3>Survivor details</h3>
                <p>Gender: {(selectedCharacter as SurvivorApiData).gender}</p>
                <p>Dlc: {(selectedCharacter as SurvivorApiData).dlc}</p>
              </div>
            )}

          {renderPerks(specificPerks)}

          <button
            onClick={handleCloseModal}
            className="mt-6 w-full px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition-colors"
          >
            Cerrar
          </button>
        </div>
      )}
    </>
  );
}
