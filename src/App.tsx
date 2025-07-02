import React from "react";
import { RouterProvider } from "react-router";
import MainContainer from "./components/Main/MainContainer";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import { createBrowserRouter } from "react-router-dom";
import "./styles/style.scss";
import VuzContainer from "./components/Vuz/VuzContainer";
import OlimpContainer from "./components/Olimp/OlimpContainer";

export default function App() {
  const router = createBrowserRouter([
    {
      path: ``,
      element: <MainContainer />, // основная страница(сопровождение 2025)
      errorElement: <ErrorPage />,
    },
    {
      path: "*", // Этот путь ловит все несуществующие маршруты
      element: <ErrorPage />,
    },
    {
      path: `/vuz`,
      element: <VuzContainer />, // онлайн профтур
      errorElement: <ErrorPage />,
    },
    {
      path: `/olimp`,
      element: <OlimpContainer />, // подготовка к олимпиадам
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}
