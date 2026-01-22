import { RoutePaths, RouteParams } from "../types/routes";

// Типизированная функция генерации путей
export const generatePath = <T extends RoutePaths>(
  path: T,
  params: T extends keyof RouteParams ? RouteParams[T] : Record<string, never>,
): string => {
  let generatedPath = path as string;

  if (params && typeof params === "object") {
    Object.entries(params).forEach(([key, value]) => {
      generatedPath = generatedPath.replace(`:${key}`, String(value));
    });
  }

  return generatedPath;
};

// Типизированная проверка активного пути
export const isActivePath = (currentPath: string, targetPath: string): boolean => {
  if (targetPath.includes(":")) {
    const pattern = new RegExp(`^${targetPath.replace(/:\w+/g, "\\w+")}$`);
    return pattern.test(currentPath);
  }
  return currentPath === targetPath;
};

// Извлечение параметров из пути
export const extractParams = <T extends RoutePaths>(
  path: T,
  currentPath: string,
): T extends keyof RouteParams ? RouteParams[T] : Record<string, never> => {
  if (!path.includes(":")) {
    return {} as any;
  }

  const pathSegments = path.split("/");
  const currentSegments = currentPath.split("/");

  const params: Record<string, string> = {};

  pathSegments.forEach((segment, index) => {
    if (segment.startsWith(":")) {
      const paramName = segment.slice(1);
      params[paramName] = currentSegments[index];
    }
  });

  return params as any;
};

// Пример использования:
// const path = generatePath(RoutePaths.VUZ_DETAIL, { code: 'mgimo' });
// const params = extractParams(RoutePaths.VUZ_DETAIL, '/vuz/mgimo');
