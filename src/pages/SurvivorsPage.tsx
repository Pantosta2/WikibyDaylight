import { GeneralNav } from "../layouts/GeneralNav";
import { DefinedImages } from "../assets/DefinedImages";
import { getSurvivors } from "../services/GeneralGetService";
import PortraitCharacterList from "../components/PortraitCharacterList";

export default function SurvivorsPage() {
  return (
    <div
      className="bg-cover bg-center h-screen w-full"
      style={{ backgroundImage: `url(${DefinedImages.Kitchen})` }}
    >
      <GeneralNav />
      <main className="flex">
        <PortraitCharacterList fetchFunction={getSurvivors} />
      </main>
    </div>
  );
}
