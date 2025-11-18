import { api } from "../api/api";

export const requestGet = (str: string) => {
  return api.get(str);
};

export const requestGetResponse = (str: string, obj?: any) => {
  return api.getResponse(str, obj);
};

export const requestPost = (str: string, obj: any) => {
  return api.post(str, obj);
};

export const requestLogin = (login: string, password: string) => {
  return api.login(login, password);
};

export const requestPatch = (str: string) => {
  return api.patch(str);
};
