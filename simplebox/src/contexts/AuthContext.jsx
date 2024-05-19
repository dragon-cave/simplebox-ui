import { createContext, useContext, useState, useEffect } from "react";
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
      localStorage.setItem("@Auth:token", response.data.token);
      localStorage.setItem("@Auth:user", response.data.user);
      setUser(response.data.user);
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
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
