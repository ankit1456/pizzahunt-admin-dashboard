import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import Login from "./pages/login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
]);
