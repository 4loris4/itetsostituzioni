import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.scss";
import DetailsPage from "./pages/DetailsPage";
import SettingsPage from "./pages/SettingsPage";
import SubstitutionsPage from "./pages/SubstitutionsPage";
import WelcomePage from "./pages/WelcomePage";

//TODO meta description
//TODO add link for playStore/reminder for pwa?
//TODO layout for big devices?
//TODO when opening substitutions on mobile, focus state is saved in other page

const router = createBrowserRouter([
  {
    path: "/",
    element: true ? <SubstitutionsPage /> : <WelcomePage />, //TODO condition
  },
  {
    path: "/details",
    element: <DetailsPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
  {
    path: "/*",
    element: <Navigate to={"/"} />
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
