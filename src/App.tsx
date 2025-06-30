import React from "react";
import { RouterProvider } from "react-router";
import MainContainer from "./components/Main/MainContainer";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import { createBrowserRouter } from "react-router-dom";
import "./styles/style.scss";

export default function App() {
  const router = createBrowserRouter([
    {
      path: ``,
      element: <MainContainer />,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}
