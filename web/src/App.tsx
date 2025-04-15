import { createBrowserRouter, RouterProvider } from "react-router";
import { RootLayout } from "./layout/RootLayout";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Redirect } from "./pages/Redirect";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ":url",
        element: <Redirect />,
        errorElement: <NotFound />,
      },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
