import { createContext, useState, useEffect } from "react";
import { api, endpoints } from "../services/api";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = localStorage.getItem("@Auth:user");
      const storedToken = localStorage.getItem("@Auth:token");
      if (storedUser && storedToken) {
        setUser(storedUser);
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
      localStorage.setItem("@Auth:user", response.data.user);
      setUser(response.user);
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access}`;
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("@Auth:token");
    localStorage.removeItem("@Auth:user");
    setUser(null);
    delete api.defaults.headers.common["Authorization"];
  };
  return (
    <AuthContext.Provider value={{ user, isLogged: !!user, login, logout }}>
      {isVerified && children}
    </AuthContext.Provider>
  );
};
