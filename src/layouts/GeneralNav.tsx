import { Link, Outlet } from "react-router";
import { useTranslation } from "react-i18next";
import NavButton from "../components/NavButton";
import DbdLogo from "../assets/images/DbdLogo.png";
import "./GeneralNav.css";

export const GeneralNav = () => {
  const { i18n, t } = useTranslation();

  const handleChange = (e: { target: { value: string | undefined } }) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <>
      <nav className="absolute w-screen general-scrollbar font-bold ">
        <ul className="flex flex-row items-center justify-center p-2 w-full">
          <li className="flex flex-4">
            <Link to="/">
              <img
                src={DbdLogo}
                alt={t("common.dbdlogo_alt")}
                className="w-45 h-15"
              />
            </Link>
          </li>
          <li
            className="flex items-center justify-center px-[2rem]"
            aria-label={t("nav.survivors.ariaLabel")}
          >
            <NavButton
              PathUrl="/SurvivorsInfo"
              ButtonName={t("nav.survivors.text")}
            />
          </li>
          <li
            className="flex items-center justify-center px-[2rem]"
            aria-label={t("nav.killers.ariaLabel")}
          >
            <NavButton
              PathUrl="/KillersInfo"
              ButtonName={t("nav.killers.text")}
            />
          </li>
          <li
            className="flex items-center justify-center px-[2rem]"
            aria-label={t("nav.makeYourOwnBuild.ariaLabel")}
          >
            <NavButton
              PathUrl="/Make-your-own-build"
              ButtonName={t("nav.makeYourOwnBuild.text")}
            />
          </li>
          <li>
            <select
              value={i18n.language}
              onChange={handleChange}
              className="bg-gray-100 border px-2 py-1 rounded"
            >
              <option value="en">🇺🇸 English</option>
              <option value="es">🇪🇸 Español</option>
              <option value="fr">🇫🇷 Français</option>
              <option value="ru">🇷🇺 Pyccкий</option>
            </select>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};
