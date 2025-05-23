import { GeneralNav } from "../layouts/GeneralNav";
import { DefinedImages } from "../assets/DefinedImages";
import DisplayCharacterData from "../components/DisplayCharacterData";

export default function KillersPage() {
  return (
    <div className="absolute h-screen w-full overflow-x-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center z-10"
        style={{
          backgroundImage: `url(${DefinedImages.GardenOfJoy})`,
          zIndex: 0,
          backgroundAttachment: "absolute",
        }}
      >
        <img
          src={DefinedImages.Fog}
          alt="Niebla"
          className="absolute -bottom-40 w-full scale-180 z-10"
        />
        <img
          src={DefinedImages.Fog}
          alt="Niebla"
          className="absolute -bottom-40 w-full scale-180 z-10"
        />
        <GeneralNav />
        <DisplayCharacterData />
      </div>
    </div>
  );
}
