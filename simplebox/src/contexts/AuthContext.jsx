import { createContext, useState, useEffect } from "react";
import { api, endpoints } from "../services/api";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false)
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = localStorage.getItem("@Auth:user");
      const storedToken = localStorage.getItem("@Auth:token");
      if (storedUser && storedToken) {
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
      console.log(response);
      localStorage.setItem("@Auth:token", response.data.access);
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access}`;
      setIsLogged(true);
      console.log(`login: ${isLogged}`)
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("@Auth:token");
    delete api.defaults.headers.common["Authorization"];
    setIsLogged(false);
  };
  return (
    <AuthContext.Provider value={{isLogged, login, logout }}>
      {isVerified && children}
    </AuthContext.Provider>
  );
};
