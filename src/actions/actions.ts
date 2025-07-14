import { api } from "../api/api";

export const requestGet = (str: string) => {
  return api.get(str);
};
