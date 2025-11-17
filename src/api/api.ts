import axios from "axios";
import { url } from "../constants/constants";
import cookie from "js-cookie";

const instance = axios.create({
  baseURL: url,
});

instance.interceptors.request.use(
  (config) => {
    let token = cookie.get("token");
    if (token && token !== "undefined") {
      config.headers["Authorization"] = "Bearer " + token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.status === 401) {
      const win: Window = window;
      win.location = `${window.location.origin}/auth`;
    }
  }
);

export const api = {
  login(login: string, password: string) {
    return instance
      .post(`login`, {
        username: login,
        password: password,
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  get(str: string) {
    return instance
      .get(`${str}`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  },

  getResponse(str: string) {
    return instance
      .get(`${str}`)
      .then((res) => res)
      .catch((err) => console.log(err));
  },

  post(str: string, obj: any) {
    return instance
      .post(`${str}`, obj)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  },
};
