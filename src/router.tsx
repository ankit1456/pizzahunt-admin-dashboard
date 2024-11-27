import { AdminProtected } from "@components/auth";
import {
  Dashboard,
  RootLayout,
  UnAuthenticatedLayout,
} from "@components/layouts";
import {
  HomePage,
  LoginPage,
  PageNotFound,
  ProductsPage,
  RestaurantsPage,
  UsersPage,
} from "@pages";
import { createBrowserRouter } from "react-router-dom";

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
                <UsersPage />
              </AdminProtected>
            ),
          },
          {
            path: "restaurants",
            element: <RestaurantsPage />,
          },
          {
            path: "products",
            element: <ProductsPage />,
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
