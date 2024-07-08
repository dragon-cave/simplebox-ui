import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
    const {isLogged} = useContext(AuthContext);
    return isLogged ? <Outlet /> : <Navigate to="/entrar" />;
}
 
export default PrivateRoutes;