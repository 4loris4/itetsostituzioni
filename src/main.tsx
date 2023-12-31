import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.scss";
import DetailsPage from "./pages/DetailsPage";
import SettingsPage from "./pages/SettingsPage";
import SubstitutionsPage from "./pages/SubstitutionsPage";
import WelcomePage from "./pages/WelcomePage";
import { ThemeProvider } from "./providers/ThemeProvider";
import useUser, { UserProvider } from "./providers/UserProvider";

function Router() {
  const { user } = useUser();

  const router = createBrowserRouter([
    ...(user.type == undefined ?
      [
        {
          path: "/",
          element: <WelcomePage />,
        }
      ] :
      [
        {
          path: "/",
          element: <SubstitutionsPage />,
        },
        {
          path: "/details",
          element: <DetailsPage />,
        },
        {
          path: "/settings",
          element: <SettingsPage />,
        },
      ]
    ),
    {
      path: "/*",
      element: <Navigate to={"/"} />
    }
  ]);

  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <UserProvider>
        <ThemeProvider>
          <QueryClientProvider client={new QueryClient()}>
            <Router />
          </QueryClientProvider>
        </ThemeProvider>
      </UserProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
