import { createContext, useState, useEffect, ReactNode } from "react";
import { api, endpoints } from "../services/api";

interface AuthContextType {
  isLogged: boolean;
  login: (data: { username: string; password: string }) => Promise<void>;
  register: (data: {
    username: string;
    password1: string;
    password2: string;
    email: string;
    full_name: string;
  }) => Promise<void>;
  logout: () => void;
  userChangePassword: (data: {
    old_password: string;
    new_password1: string;
    new_password2: string;
  }) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  // const [isExpired, setIsExpired] = useState<boolean>(false);

  function isJwtExpired(token: string): boolean {
    try {
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

      if (!payload.exp) {
        throw new Error("Token does not have an 'exp' claim.");
      }

      const currentTime = Math.floor(Date.now() / 1000);
      const exp = payload.exp;

      return currentTime >= exp;
    } catch (error: any) {
      // console.error("Invalid JWT:", error.message);
      // setIsExpired(true);
      return true;
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
        setIsLogged(false);
        loadUser();
        return api.request(error.config);
      }
      return Promise.reject(error);
    }
  );

  const loadUser = async () => {
    let storedToken = localStorage.getItem("@Auth:token");
    // console.log(`Is token expired ${storedToken ? isJwtExpired(storedToken) : false}`);
    if (storedToken && isJwtExpired(storedToken)) {
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
  }, [isVerified]);

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      const response = await api.post(endpoints.login, { username, password });
      localStorage.setItem("@Auth:token", response.data.access);
      localStorage.setItem("@Auth:refreshToken", response.data.refresh);
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access}`;
      setIsLogged(true);
    } catch (error: any) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            let errorMessage;
            if (error.response.data.non_field_errors) {
              errorMessage = error.response.data.non_field_errors;
            } else {
              errorMessage =
                "Solicitação inválida. Verifique os dados e tente novamente.";
            }
            throw new Error(errorMessage);
          case 401:
            throw new Error(
              "Credenciais inválidas. Por favor, tente novamente."
            );
          case 404:
            throw new Error(
              "Endpoint não encontrado. Verifique a URL e tente novamente."
            );
          case 500:
            throw new Error(
              "Erro no servidor. Por favor, tente novamente mais tarde."
            );
          default:
            throw new Error("Ocorreu um erro. Por favor, tente novamente.");
        }
      } else {
        throw new Error(
          "Falha na conexão. Por favor, verifique sua conexão com a internet e tente novamente."
        );
      }
    }
  };

  const register = async ({
    username,
    password1,
    password2,
    email,
    full_name,
  }: {
    username: string;
    password1: string;
    password2: string;
    email: string;
    full_name: string;
  }) => {
    try {
      const response = await api.post(endpoints.register, {
        username,
        password1,
        password2,
        email,
        full_name,
      });
      localStorage.setItem("@Auth:token", response.data.access);
      localStorage.setItem("@Auth:refreshToken", response.data.refresh);
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access}`;
      setIsLogged(true);
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
        switch (error.response.status) {
          case 400:
            let errorMessage;
            if (error.response.data.password1) {
              errorMessage = error.response.data.password1;
            } else if (error.response.data.password2) {
              errorMessage = error.response.data.password2;
            } else if (error.response.data.email) {
              errorMessage = error.response.data.email;
            } else if (error.response.data.username) {
              errorMessage = error.response.data.username;
            } else {
              errorMessage =
                "Solicitação inválida. Verifique os dados e tente novamente.";
            }
            throw new Error(errorMessage);
          case 401:
            throw new Error(
              "Credenciais inválidas. Por favor, tente novamente."
            );
          case 404:
            throw new Error(
              "Endpoint não encontrado. Verifique a URL e tente novamente."
            );
          case 500:
            throw new Error(
              "Erro no servidor. Por favor, tente novamente mais tarde."
            );
          default:
            throw new Error("Ocorreu um erro. Por favor, tente novamente.");
        }
      } else {
        throw new Error(
          "Falha na conexão. Por favor, verifique sua conexão com a internet e tente novamente."
        );
      }
    }
  };

  const logout = async () => {
    localStorage.removeItem("@Auth:token");
    localStorage.removeItem("@Auth:refreshToken");
    delete api.defaults.headers.common["Authorization"];
    setIsLogged(false);
  };

  const userChangePassword = async ({
    old_password,
    new_password1,
    new_password2,
  }: {
    old_password: string;
    new_password1: string;
    new_password2: string;
  }) => {
    try {
      const response = await api.post(endpoints.userChangePassword, {
        old_password,
        new_password1,
        new_password2,
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            let errorMessage;
            if (error.response.data.detail) {
              errorMessage = error.response.data.detail;
            } else {
              errorMessage =
                "Solicitação inválida. Verifique os dados e tente novamente.";
            }
            throw new Error(errorMessage);
          case 401:
            throw new Error(
              "Credenciais inválidas. Por favor, tente novamente."
            );
          case 404:
            throw new Error(
              "Endpoint não encontrado. Verifique a URL e tente novamente."
            );
          case 500:
            throw new Error(
              "Erro no servidor. Por favor, tente novamente mais tarde."
            );
          default:
            throw new Error("Ocorreu um erro. Por favor, tente novamente.");
        }
      } else {
        throw new Error(
          "Falha na conexão. Por favor, verifique sua conexão com a internet e tente novamente."
        );
      }
    }
  };

  return (
    <AuthContext.Provider value={{ isLogged, login, register, logout, userChangePassword }}>
      {isVerified && children}
    </AuthContext.Provider>
  );
};
