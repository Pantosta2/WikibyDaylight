import { GeneralNav } from "../layouts/GeneralNav";
import { DefinedImages } from "../assets/DefinedImages";

export default function OverviewPage() {
  return (
    <div
      className="bg-cover bg-center h-screen w-full"
      style={{ backgroundImage: `url(${DefinedImages.Arcade})` }}
    >
      <GeneralNav />
    </div>
  );
}
