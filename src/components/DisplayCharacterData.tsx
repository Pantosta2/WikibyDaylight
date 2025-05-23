import { useState } from "react";
import PortraitList from "./PortraitCharacterList";
import { getKillers } from "../services/GeneralGetService";

export default function DisplayCharacterData() {
  const [displayCharacterData, setDisplayCharacterData] = useState(false);
  const handleButtonVisibility = () => {
    setDisplayCharacterData(!displayCharacterData);
  };

  return (
    <>
      <PortraitList
        onButtonClick={handleButtonVisibility}
        fetchFunction={getKillers}
      />

      {displayCharacterData && (
        <div className="absolute inset-0 bg-gray-600/50 z-40 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
            <h2 className="text-2xl font-bold mb-4">Detalles del Personaje</h2>
            <p>Información detallada se desplegará aquí.</p>
            <button
              onClick={handleButtonVisibility}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
