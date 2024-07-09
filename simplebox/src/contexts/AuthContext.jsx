import { createContext, useState, useEffect } from "react";
import { api, endpoints } from "../services/api";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false)
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const storedToken = localStorage.getItem("@Auth:token");
      if (storedToken) {
        setIsLogged(true);
        api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      }
    };

    loadUser();
    setIsVerified(true);
  }, []);

  const login = async ({username, password}) => {
    try {
      const response = await api.post(endpoints.login, { username, password });
      localStorage.setItem("@Auth:token", response.data.access);
      localStorage.setItem("@Auth:refreshToken", response.data.refresh);
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access}`;
      setIsLogged(true);
    } catch (error) {
      return
    }
  };

  const logout = async () => {
    // const refresh = localStorage.getItem("@Auth:refreshToken")
    // await api.post(endpoints.logout, { refresh })
    localStorage.removeItem("@Auth:token");
    localStorage.removeItem("@Auth:refreshToken");
    delete api.defaults.headers.common["Authorization"];
    setIsLogged(false);
    console.log("logged out - pedro safado")
  };
  return (
    <AuthContext.Provider value={{isLogged, login, logout }}>
      {isVerified && children}
    </AuthContext.Provider>
  );
};
