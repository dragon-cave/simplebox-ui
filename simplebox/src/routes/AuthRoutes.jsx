import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Outlet, Navigate } from 'react-router-dom';

const AuthRoutes = () => {
    const {isLogged} = useContext(AuthContext);
    console.log(`auth: ${isLogged}`)
    return isLogged ? <Navigate to="/" /> : <Outlet />;
}
 
export default AuthRoutes;