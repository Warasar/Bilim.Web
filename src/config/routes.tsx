import React from "react";
import { RouteConfig, RoutePaths } from "../types/routes";

// Импорты компонентов
import AccopointmentContainer from "../pages/Accopointment/AccopointmentContainer";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import VuzContainer from "../pages/Vuz/VuzContainer";
import OlimpContainer from "../pages/Olimp/OlimpContainer";
import UniversityContainer from "../pages/University/UniversityContainer";
import OlimpVuzContainer from "../pages/OlimpVuz/OlimpVuzContainer";
import Auth from "../pages/Auth/Auth";
import MotivationLetterContainer from "../pages/MotivationLetter/MotivationLetterContainer";
import Survey from "../pages/Survey/Survey";
import TourContainer from "../pages/Tour/TourContainer";
import ProfileContainer from "../pages/Profile/ProfileContainer";
import VideosContainer from "../pages/Videos/VideosContainer";

export const routesConfig: RouteConfig[] = [
  {
    path: RoutePaths.ACCOMPANIMENT,
    element: <AccopointmentContainer />,
    errorElement: <ErrorPage />,
    name: "Сопровождение 2025",
    isProtected: true,
  },
  {
    path: RoutePaths.VUZ,
    element: <VuzContainer />,
    errorElement: <ErrorPage />,
    name: "Онлайн профтур",
    isProtected: true,
  },
  {
    path: RoutePaths.VUZ_DETAIL,
    element: <UniversityContainer />,
    errorElement: <ErrorPage />,
    name: "Страница вуза",
    isProtected: true,
  },
  {
    path: RoutePaths.OLIMP,
    element: <OlimpContainer />,
    errorElement: <ErrorPage />,
    name: "Подготовка к олимпиадам",
    isProtected: true,
  },
  {
    path: RoutePaths.OLIMP_DETAIL,
    element: <OlimpVuzContainer />,
    errorElement: <ErrorPage />,
    name: "Олимпиада детально",
    isProtected: true,
  },
  {
    path: RoutePaths.MOTIVATION_LETTER,
    element: <MotivationLetterContainer />,
    errorElement: <ErrorPage />,
    name: "Мотивационное письмо",
    isProtected: true,
  },
  {
    path: RoutePaths.AUTH,
    element: <Auth />,
    errorElement: <ErrorPage />,
    name: "Авторизация",
    isProtected: false,
    hideFromNav: true,
  },
  {
    path: RoutePaths.SURVEY,
    element: <Survey />,
    errorElement: <ErrorPage />,
    name: "Опросник",
    isProtected: true,
  },
  {
    path: RoutePaths.PROFILE,
    element: <ProfileContainer />,
    errorElement: <ErrorPage />,
    name: "Профиль",
    isProtected: true,
  },
  {
    path: RoutePaths.VIDEOS,
    element: <VideosContainer />,
    errorElement: <ErrorPage />,
    name: "Видео",
    isProtected: true,
  },
  {
    path: RoutePaths.HOME,
    element: <TourContainer />,
    errorElement: <ErrorPage />,
    name: "Главная",
    isProtected: false,
  },
  {
    path: RoutePaths.WILDCARD,
    element: <ErrorPage />,
    name: "404 Страница",
    isProtected: false,
    hideFromNav: true,
  },
];

// Типизированная утилита для получения конфига маршрута
export const getRouteConfig = <T extends RoutePaths>(path: T): RouteConfig | undefined => {
  return routesConfig.find((route) => route.path === path);
};
