import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Outlet, Navigate } from 'react-router-dom';

const AuthRoutes = () => {
    const {isLogged} = useContext(AuthContext);
    return isLogged ? <Navigate to="/" /> : <Outlet />;
}
 
export default AuthRoutes;