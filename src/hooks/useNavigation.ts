import { useMemo } from "react";
import { routesConfig } from "../config/routes";
import { RouteConfig } from "../types/routes";

export interface NavigationItem {
  path: string;
  name: string;
  isProtected: boolean;
}

export const useNavigation = () => {
  const navigationItems = useMemo((): NavigationItem[] => {
    return routesConfig
      .filter((route: RouteConfig): route is RouteConfig & { name: string } => !route.hideFromNav && !!route.name)
      .map((route: RouteConfig) => ({
        path: route.path,
        name: route.name,
        isProtected: route.isProtected,
      }));
  }, []);

  return { navigationItems };
};
