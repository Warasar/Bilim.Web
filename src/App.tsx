// src/App.tsx
import React, { useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { routesConfig } from "./config/routes";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import "./styles/style.scss";

const App: React.FC = () => {
  const router = useMemo(() => {
    const routesWithProtection = routesConfig.map((route) => ({
      ...route,
      element: route.isProtected ? (
        <ProtectedRoute isProtected={route.isProtected}>{route.element}</ProtectedRoute>
      ) : (
        route.element
      ),
    }));

    return createBrowserRouter(routesWithProtection);
  }, []);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
