import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.scss";
import Settings from "./pages/Settings";
import Substitutions from "./pages/Substitutions";
import Welcome from "./pages/Welcome";

const router = createBrowserRouter([ //TODO remove router?
  {
    path: "/",
    element: true ? <Substitutions /> : <Welcome />, //TODO
  },
  {
    path: "/settings",
    element: <Settings />,
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
