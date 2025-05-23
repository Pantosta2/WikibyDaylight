import { GeneralNav } from "../layouts/GeneralNav";
import { DefinedImages } from "../assets/DefinedImages";

export default function MainPage() {
  return (
    <div
      className="bg-cover bg-center h-screen w-full z-0"
      style={{ backgroundImage: `url(${DefinedImages.Haddonfiled})` }}
    >
      <GeneralNav />
    </div>
  );
}
