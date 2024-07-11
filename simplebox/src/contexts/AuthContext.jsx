import { createContext, useState, useEffect } from "react";
import { api, endpoints } from "../services/api";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  function isJwtExpired(token) {
    try {
      // Decode the JWT payload
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      const payload = JSON.parse(jsonPayload);

      // Check if the 'exp' claim exists
      if (!payload.exp) {
        throw new Error("Token does not have an 'exp' claim.");
      }

      // Get the current time and the expiration time
      const currentTime = Math.floor(Date.now() / 1000);
      const exp = payload.exp;

      // Check if the token is expired
      return currentTime >= exp;
    } catch (error) {
      console.error("Invalid JWT:", error.message);
      setIsExpired(true);
      return true; // If there's an error decoding the token, consider it expired
    }
  }

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response.status === 401) {
        const refresh = localStorage.getItem("@Auth:refreshToken");
        const response = await api.post(endpoints.refresh, { refresh });
        localStorage.setItem("@Auth:token", response.data.access);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.access}`;
        loadUser();
        return api.request(error.config);
      }
      return Promise.reject(error);
    }
  );

  const loadUser = async () => {
    let storedToken = localStorage.getItem("@Auth:token");
    // console.log(`Is token expired ${isJwtExpired(storedToken)}`);
    if (isJwtExpired(storedToken)) {
      const response = await api.post(endpoints.refresh, {
        refresh: localStorage.getItem("@Auth:refreshToken"),
      });
      localStorage.setItem("@Auth:token", response.data.access);
    }
    storedToken = localStorage.getItem("@Auth:token");
    if (storedToken) {
      setIsLogged(true);
      api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
  };

  useEffect(() => {
    loadUser();
    setIsVerified(true);
  }, []);

  const login = async ({ username, password }) => {
    try {
      const response = await api.post(endpoints.login, { username, password });
      localStorage.setItem("@Auth:token", response.data.access);
      localStorage.setItem("@Auth:refreshToken", response.data.refresh);
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access}`;
      setIsLogged(true);
    } catch (error) {
      return;
    }
  };

  const logout = async () => {
    // const refresh = localStorage.getItem("@Auth:refreshToken")
    // await api.post(endpoints.logout, { refresh })
    localStorage.removeItem("@Auth:token");
    localStorage.removeItem("@Auth:refreshToken");
    delete api.defaults.headers.common["Authorization"];
    setIsLogged(false);
  };
  return (
    <AuthContext.Provider value={{ isLogged, login, logout }}>
      {isVerified && children}
    </AuthContext.Provider>
  );
};
