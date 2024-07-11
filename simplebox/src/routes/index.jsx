import { Route, Routes, BrowserRouter } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage/DashBoardPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import PrivateRoutes from "./PrivateRoutes";
import UserPage from "../pages/UserPage/page";
import AuthRoutes from "./AuthRoutes";

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
