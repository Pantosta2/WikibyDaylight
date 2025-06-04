import { GeneralNav } from "../layouts/GeneralNav";
import { DefinedImages } from "../assets/DefinedImages";
import { getSurvivors } from "../services/GeneralGetService";
import DisplayCharacterData from "../components/CharactersStaticData/DisplayCharacterData";

export default function SurvivorsPage() {
  return (
    <div className="absolute h-screen w-full overflow-x-hidden">
      <figure
        className="absolute inset-0 bg-cover bg-center z-10"
        style={{ backgroundImage: `url(${DefinedImages.Kitchen})` }}
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
          fetchFunction={getSurvivors}
          characterRole="survivor"
        />
      </figure>
    </div>
  );
}
