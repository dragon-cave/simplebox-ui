import axios from "axios";

export const api = axios.create({
  baseURL: "http://10.243.127.144:8000/api",
});

export const endpoints = {
  login: "/auth/login/",
  logout: "/auth/logout/",
  register: "/auth/register/",
  files: "/files/",
  user: "/user/"
};
