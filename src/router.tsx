import { createBrowserRouter } from "react-router-dom";
import { AdminProtected } from "./features/authentication";
import { Dashboard, RootLayout, UnAuthenticatedLayout } from "./layouts";
import { HomePage, LoginPage, PageNotFound, Restaurants, Users } from "./pages";

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
            path: "products",
            element: <div>Products</div>,
          },
          {
            path: "restaurants",
            element: <Restaurants />,
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
