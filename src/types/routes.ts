import { ReactNode } from "react";

export interface RouteConfig {
  path: string;
  element: ReactNode;
  errorElement?: ReactNode;
  name: string;
  isProtected: boolean;
  hideFromNav?: boolean;
  children?: RouteConfig[];
}

export enum RoutePaths {
  ACCOMPANIMENT = "/accompaniment",
  VUZ = "/vuz",
  VUZ_DETAIL = "/vuz/:code",
  OLIMP = "/olimp",
  OLIMP_DETAIL = "/olimp/:code",
  MOTIVATION_LETTER = "/motivation_letter",
  AUTH = "/auth",
  SURVEY = "/survey",
  PROFILE = "/profile",
  VIDEOS = "/videos",
  HOME = "/",
  WILDCARD = "*",
}

// Типы для параметров маршрутов
export type RouteParams = {
  [RoutePaths.ACCOMPANIMENT]: never;
  [RoutePaths.VUZ]: never;
  [RoutePaths.VUZ_DETAIL]: { code: string };
  [RoutePaths.OLIMP]: never;
  [RoutePaths.OLIMP_DETAIL]: { code: string };
  [RoutePaths.MOTIVATION_LETTER]: never;
  [RoutePaths.AUTH]: never;
  [RoutePaths.SURVEY]: never;
  [RoutePaths.PROFILE]: never;
  [RoutePaths.VIDEOS]: never;
  [RoutePaths.HOME]: never;
  [RoutePaths.WILDCARD]: never;
};

// Вспомогательный тип для генерации путей
export type AppRoute = keyof typeof RoutePaths;
