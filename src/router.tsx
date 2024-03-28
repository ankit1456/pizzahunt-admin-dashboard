import { createBrowserRouter } from "react-router-dom";
import { Dashboard, RootLayout, UnAuthenticatedLayout } from "./layouts";
import { HomePage, LoginPage, PageNotFound } from "./pages";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        children: [
          {
            path: "",
            element: <HomePage />,
          },
          {
            path: "users",
            element: <div>Users</div>,
          },
          {
            path: "products",
            element: <div>Products</div>,
          },
          {
            path: "restaurants",
            element: <div>Restaurants</div>,
          },
          {
            path: "promos",
            element: <div>Promos</div>,
          },
        ],
      },
      {
        path: "/auth",
        element: <UnAuthenticatedLayout />,
        children: [
          {
            path: "signin",
            element: <LoginPage />,
          },
          {
            path: "forgot-password",
            element: <div>Forgot password page</div>,
          },
        ],
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);
