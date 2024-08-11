import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const endpoints = {
  login: "/auth/login/",
  logout: "/auth/logout/",
  refresh: "/auth/refresh/",
  register: "/auth/register/",
  userChangePassword: "/auth/password-change/",
  files: "/files/",
  user: "/user/",
  profilePicture: "/user/profile_picture/",
};
