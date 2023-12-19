import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.scss";
import DetailsPage from "./pages/DetailsPage";
import SettingsPage from "./pages/SettingsPage";
import SubstitutionsPage from "./pages/SubstitutionsPage";
import WelcomePage from "./pages/WelcomePage";
import useUser, { UserProvider } from "./providers/UserProvider";

//TODO meta description
//TODO add link for playStore/reminder for pwa?
//TODO layout for big devices?
//TODO when opening substitutions on mobile, focus state is saved in other page
//TODO auto reload if data is stale?
//TODO Head title

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
    <UserProvider>
      <QueryClientProvider client={new QueryClient()}>
        <Router />
      </QueryClientProvider>
    </UserProvider>
  </React.StrictMode>,
);
