import { Route, Routes, BrowserRouter } from "react-router-dom";
import DashboardPage from "../pages/home/dashboard/page";
import LoginPage from "../pages/auth/login/page";
import RegisterPage from "../pages/auth/register/page";
import PrivateRoutes from "./privateRoutes";
import UserPage from "../pages/home/profile/page";
import AuthRoutes from "./authRotes";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthRoutes />}>
          <Route path="/entrar" element={<LoginPage />} />
          <Route path="/cadastrar" element={<RegisterPage />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/meu-perfil" element={<UserPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
