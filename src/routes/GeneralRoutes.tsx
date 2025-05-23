import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import KillersPage from "../pages/KillersPage";
import SurvivorsPage from "../pages/SurvivorsPage";
import OverviewPage from "../pages/OverviewPage";
import MakeYourOwnBuildPage from "../pages/MakeYourOwnBuildPage";
import { ErrorPage } from "../pages/ErrorPage";

export const GeneralRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/SurvivorsInfo",
    element: <SurvivorsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/KillersInfo",
    element: <KillersPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Overview",
    element: <OverviewPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Make-your-own-build",
    element: <MakeYourOwnBuildPage />,
    errorElement: <ErrorPage />,
  },
]);
