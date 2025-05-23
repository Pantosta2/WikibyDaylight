import { Link, Outlet } from "react-router";
import NavButton from "../components/NavButton";
import DbdLogo from "../assets/images/DbdLogo.png";
import "./GeneralNav.css";

export const GeneralNav = () => {
  return (
    <>
      <nav className="z-1 w-screen general-scrollbar font-bold">
        <ul className="absolute flex flex-row items-center justify-center p-2 w-full">
          <li className="flex flex-4">
            <Link to="/">
              <img
                src={DbdLogo}
                alt="Dead by daylight logotype"
                className="w-45 h-15"
              />
            </Link>
          </li>
          <li
            className="flex items-center justify-center px-[2rem]"
            aria-label="Overview - General information of the game"
          >
            <NavButton PathUrl="/Overview" ButtonName="Overview" />
          </li>
          <li
            className="flex items-center justify-center px-[2rem]"
            aria-label="Survivors - Information of the survivors"
          >
            <NavButton PathUrl="/SurvivorsInfo" ButtonName="Survivors" />
          </li>
          <li
            className="flex items-center justify-center px-[2rem]"
            aria-label="Killers - Information of the killers"
          >
            <NavButton PathUrl="/KillersInfo" ButtonName="Killers" />
          </li>
          <li
            className="flex items-center justify-center px-[2rem]"
            aria-label="Make your own build - Section to try different perk builds"
          >
            <NavButton
              PathUrl="/Make-your-own-build"
              ButtonName="Make your own build"
            />
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};
