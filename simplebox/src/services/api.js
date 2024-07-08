import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const endpoints = {
  login: "/auth/login/",
  logout: "/auth/logout/",
  register: "/auth/register/",
  files: "/files/",
  user: "/user/"
};
