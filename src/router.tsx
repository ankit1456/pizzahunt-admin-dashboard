import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import Login from "./pages/login/Login";
import Dashboard from "./layouts/Dashboard";
import UnAuthenticated from "./layouts/UnAuthenticated";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <UnAuthenticated />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);
