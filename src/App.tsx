import "./App.css";
import { RouterProvider } from "react-router-dom";
import { GeneralRoutes } from "./routes/GeneralRoutes";

function App() {
  return <RouterProvider router={GeneralRoutes} />;
}

export default App;
