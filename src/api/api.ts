import axios from "axios";
import { url, apiusers, apidashboardv8, urlWithPort } from "../constants/constants";
import cookie from "js-cookie";

let hash = "" + cookie.get("hash");

if (window.location.href.includes("localhost:300")) {
  hash = "B9B0EE9F312CEAA2C147EB943CA0C9BE";
}

const instance = axios.create({
  baseURL: url,
  headers: { hash: hash },
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
          win.location = `${url}auth?logout`;
        });
    }
  }
);

const instanceWithPort = axios.create({
  baseURL: urlWithPort,
  headers: { hash: hash },
});

export const api = {
  login(login: string, password: string) {
    return instance
      .post(`${apiusers}users/auth`, {
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
  getName() {
    return instance
      .get(`${apiusers}/main/currentuser`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  },
  getOutsideMenu() {
    return instance
      .get(`${apiusers}/menu/main/`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  },
  getMenu() {
    return instance
      .get(`${apidashboardv8}/lk/menu/`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  },
  getAccess() {
    return instance
      .get(`${apidashboardv8}/lk/access/`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  },
  //----------
  get(str: string) {
    return instance
      .get(`${str}`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  },
  getWithPort(str: string) {
    return instanceWithPort
      .get(`${str}`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  },
};
