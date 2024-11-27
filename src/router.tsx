import { createBrowserRouter } from "react-router-dom";
import { AdminProtected } from "./features/authentication";
import { Dashboard, RootLayout, UnAuthenticatedLayout } from "./layouts";
import { HomePage, LoginPage, Restaurants, Users } from "./pages";
import Products from "./components/products/Products";
import { useAuth } from "@src/state/store";
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "users",
            element: (
              <AdminProtected>
                <Users />
              </AdminProtected>
            ),
          },
          {
            path: "restaurants",
            element: <Restaurants />,
          },
          {
            path: "products",
            element: <Products />,
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
