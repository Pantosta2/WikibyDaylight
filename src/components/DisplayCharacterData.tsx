import type { AxiosResponse } from "axios";
import PortraitCharacterList from "./PortraitCharacterList";
import { useModal } from "../hooks/useModal";
import { useCharacterPerks } from "../hooks/useCharacterPerks";
import PerkDisplayList from "./PerkDisplayList";
import type {
  CharacterProfileData,
  CharacterListEnvelope,
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
  const {
    isModalOpen,
    selectedItem: selectedCharacter,
    openModal: openCharacterModal,
    closeModal: closeCharacterModal,
  } = useModal<CharacterProfileData>();

  const {
    perks: specificPerks,
    isLoadingPerks,
    errorPerks,
  } = useCharacterPerks({
    characterRole,
    characterCode: selectedCharacter?.code,
    enabled: isModalOpen && !!selectedCharacter,
  });

  const handlePortraitClick = (character: CharacterProfileData) => {
    openCharacterModal(character);
  };

  return (
    <>
      <PortraitCharacterList
        onButtonClick={handlePortraitClick}
        fetchFunction={fetchFunction}
      />

      {isModalOpen && selectedCharacter && (
        <div className="fixed -inset-1 bg-gradient-to-b from-black via-red-900 to-red bg-gray-900/75 z-30 flex flex-col items-center justify-center p-4">
          <div
            className="relative bg-gray-800 p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeCharacterModal}
              className="absolute top-3 right-3 text-white bg-red-700 hover:bg-red-800 rounded-full p-1.5 leading-none z-50 text-xs"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="mb-4">
              <h2 className="text-3xl text-center text-white font-extrabold">
                {selectedCharacter.name}
              </h2>
            </div>
            <div className="overflow-y-auto text-amber-50 pr-2">
              {" "}
              <h3 className="text-2xl font-bold">Overview</h3>
              <p className="mb-3">{selectedCharacter.overview}</p>
              <h3 className="border-t border-gray-700 pt-3 mt-3 font-bold text-2xl">
                Backstory
              </h3>
              <p className="mb-3">{selectedCharacter.backstory}</p>
              {characterRole === "killer" &&
                "fullName" in selectedCharacter && (
                  <div className="border-t border-gray-700 pt-3 mt-3">
                    <h3 className="text-2xl font-bold mb-2">Killer Details</h3>
                    <p>
                      <span className="font-bold">Full name: </span>
                      {(selectedCharacter as KillerApiData).fullName}
                    </p>
                    <p>
                      <span className="font-bold">Nationality: </span>
                      {(selectedCharacter as KillerApiData).nationality}
                    </p>
                    <p>
                      <span className="font-bold">Gender: </span>
                      {(selectedCharacter as KillerApiData).gender}
                    </p>
                    <p>
                      <span className="font-bold">Difficulty: </span>
                      {(selectedCharacter as KillerApiData).difficulty}
                    </p>
                    <p>
                      <span className="font-bold">Move speed: </span>
                      {(selectedCharacter as KillerApiData).moveSpeed}
                    </p>
                    <p>
                      <span className="font-bold">Terror radius: </span>
                      {(selectedCharacter as KillerApiData).terrorRadius}
                    </p>
                  </div>
                )}
              {characterRole === "survivor" && "dlc" in selectedCharacter && (
                <div className="border-t border-gray-700 pt-3 mt-3">
                  <h3 className="text-2xl font-bold mb-2">Survivor Details</h3>
                  <p>
                    <span className="font-bold">Nationality: </span>
                    {(selectedCharacter as SurvivorApiData).nationality}
                  </p>
                  <p>
                    <span className="font-bold">DLC: </span>
                    {(selectedCharacter as SurvivorApiData).dlc}
                  </p>
                </div>
              )}
              <div className="border-t border-gray-700 pt-3 mt-3">
                <PerkDisplayList
                  perks={specificPerks}
                  isLoading={isLoadingPerks}
                  error={errorPerks}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
