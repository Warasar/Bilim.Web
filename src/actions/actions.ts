import { api } from "../api/api";

export const requestGet = (str: string) => {
  return api.get(str);
};

export const requestLogin = (login: string, password: string) => {
  return api.login(login, password);
};
