import { api } from "../api/api";

export const requestGetName = () => {
  return api.getName();
};
export const requestGetOutsideMenu = () => {
  return api.getOutsideMenu();
};
export const requestGetMenu = () => {
  return api.getMenu();
};
export const requestGetAccess = () => {
  return api.getAccess();
};
export const requestGet = (str: string) => {
  return api.get(str);
};
export const requestGetWithPort = (str: string) => {
  return api.getWithPort(str);
};
