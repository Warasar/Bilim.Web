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
    if (error.response.status === 401) {
      return instance
        .get(`${url}apiusers/main/refresh-token`)
        .then((res) => {
          const config = error.config;
          cookie.set("token", res.data.token);
          cookie.set("user", res.data.name);

          config.headers["Authorization"] = "Bearer " + res.data.token;

          return new Promise((resolve, reject) => {
            axios
              .request(config)
              .then((response) => {
                resolve(response);
              })
              .catch((error) => {
                reject(error);
              });
          });
        })
        .catch((err) => {
          const win: Window = window;
          debugger;
          win.location = `${url}auth`;
        });
    }
  }
);

export const api = {
  login(login: string, password: string) {
    return instance
      .post(`users/auth`, {
        login: login,
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
};
