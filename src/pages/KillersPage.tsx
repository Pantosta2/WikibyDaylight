import { GeneralNav } from "../layouts/GeneralNav";
import { DefinedImages } from "../assets/DefinedImages";
import DisplayCharacterData from "../components/CharactersStaticData/DisplayCharacterData";
import { getKillers } from "../services/GeneralGetService";

export default function KillersPage() {
  return (
    <div className="absolute h-screen w-full overflow-x-hidden">
      <figure
        className="absolute inset-0 bg-cover bg-center z-10"
        style={{
          backgroundImage: `url(${DefinedImages.GardenOfJoy})`,
        }}
      >
        <img
          src={DefinedImages.Fog}
          className="absolute -bottom-40 w-full scale-160 z-10"
        />
        <img
          src={DefinedImages.Fog}
          className="absolute -bottom-40 w-full scale-160 z-10"
        />
        <GeneralNav />
        <DisplayCharacterData
          fetchFunction={getKillers}
          characterRole="killer"
        />
      </figure>
    </div>
  );
}
