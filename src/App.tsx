import React from "react";
import { RouterProvider } from "react-router";
import MainContainer from "./components/Main/MainContainer";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import { createBrowserRouter } from "react-router-dom";
import "./styles/style.scss";
import VuzContainer from "./components/Vuz/VuzContainer";
import OlimpContainer from "./components/Olimp/OlimpContainer";
import UniversityContainer from "./components/University/UniversityContainer";
import OlimpVuzContainer from "./components/OlimpVuz/OlimpVuzContainer";
import Auth from "./components/Auth/Auth";
import MotivationLetterContainer from "./components/MotivationLetter/MotivationLetterContainer";
import Survey from "./components/Survey/Survey";
import TourContainer from "./components/Tour/TourContainer";
import Profile from "./components/Profile/Profile";

export default function App() {
  const router = createBrowserRouter([
    {
      path: `/accompaniment`,
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
      path: `/vuz/:code`,
      element: <UniversityContainer />, // отдельные страницы для каждого вуза
      errorElement: <ErrorPage />,
    },
    {
      path: `/olimp`,
      element: <OlimpContainer />, // подготовка к олимпиадам
      errorElement: <ErrorPage />,
    },
    {
      path: `/olimp/:code`,
      element: <OlimpVuzContainer />, // подготовка к олимпиадам
      errorElement: <ErrorPage />,
    },
    {
      path: `/motivation_letter`,
      element: <MotivationLetterContainer />, // авторизация
      errorElement: <ErrorPage />,
    },
    {
      path: `/auth`,
      element: <Auth />, // авторизация
      errorElement: <ErrorPage />,
    },
    {
      path: `/survey`,
      element: <Survey />, // опросник страница
      errorElement: <ErrorPage />,
    },
    {
      path: `/profile`,
      element: <Profile />, // страница пользователя
      errorElement: <ErrorPage />,
    },
    {
      path: ``,
      element: <TourContainer />, // страница с прайсами
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}
