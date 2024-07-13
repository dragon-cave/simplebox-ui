import axios from "axios";

export const api = axios.create({
  baseURL: "https://18.228.12.242:8000/api",
});

export const endpoints = {
  login: "/auth/login/",
  logout: "/auth/logout/",
  refresh: "/auth/refresh/",
  register: "/auth/register/",
  userChangePassword: "/auth/password-change/",
  files: "/files/",
  user: "/user/",
};
