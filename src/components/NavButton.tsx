import { Link } from "react-router-dom";

type ButtonType = {
  ButtonName: string;
  PathUrl: string;
};

export default function NavButton({ ButtonName, PathUrl }: ButtonType) {
  return (
    <Link
      to={PathUrl}
      className="text-white text-lg text-shadow-lg text-shadow-zinc-950 bg-transparent px-4 py-2 rounded border border-white/0 hover:border-white hover:border- transition-colors duration-300 uppercase cursor-pointer"
    >
      {ButtonName}
    </Link>
  );
}
