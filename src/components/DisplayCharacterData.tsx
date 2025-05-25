import { useState } from "react";
import type { AxiosResponse } from "axios";
import PortraitCharacterList from "./PortraitCharacterList";
import type {
  CharacterApiData,
  CharacterListResponse,
} from "../services/GeneralGetService";
import type {
  KillerApiData,
  SurvivorApiData,
  Perk,
} from "../Types/GeneralTypes";

type DisplayCharacterDataProps = {
  fetchFunction: () => Promise<AxiosResponse<CharacterListResponse>>;
  characterRole: "killer" | "survivor";
};
export default function DisplayCharacterData({
  fetchFunction,
  characterRole,
}: DisplayCharacterDataProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] =
    useState<CharacterApiData | null>(null);

  const handlePortraitClick = (character: CharacterApiData) => {
    setIsModalOpen(true);
    setSelectedCharacter(character);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCharacter(null);
  };

  const renderPerks = (perks: Perk[]) => {
    if (!perks || perks.length === 0) {
      return <p className="text-sm text-gray-600">No perks listed</p>;
    }
    return (
      <div>
        <h4 className="text-lg font-semibold mt-3 mb-1 text-gray-800">
          Perks:
        </h4>
        <ul className="list-none pl-0 space-y-1">
          {perks.map((perk) => (
            <li
              key={perk.perk_id || perk.perk_name}
              className="text-sm text-gray-700"
            >
              <strong>{perk.perk_name}</strong>
            </li>
          ))}
        </ul>
      </div>
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

          {renderPerks(selectedCharacter.perks)}

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
