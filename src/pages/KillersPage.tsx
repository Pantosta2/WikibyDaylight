import { GeneralNav } from "../layouts/GeneralNav";
import { DefinedImages } from "../assets/DefinedImages";
import PortraitCharacterList from "../components/PortraitCharacterList";
import { getKillers } from "../services/GeneralGetService";

export default function KillersPage() {
  return (
    <>
      <div
        className="bg-cover bg-center h-screen w-full"
        style={{
          backgroundImage: `url(${DefinedImages.GardenOfJoy})`,
        }}
      >
        <GeneralNav />
        <img
          src={DefinedImages.Fog}
          alt=""
          className="absolute pt-[46rem] w-screen scale-x-200"
        />
        <img
          src={DefinedImages.Fog}
          alt=""
          className="absolute pt-[46rem] w-screen scale-x-200"
        />
        <main className="flex">
          <PortraitCharacterList fetchFunction={getKillers} />
        </main>
      </div>
    </>
  );
}
