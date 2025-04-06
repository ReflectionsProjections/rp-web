import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  roles: string[];
  exp: number; // in seconds
}

const ProtectedRoute = () => {
  const jwt = localStorage.getItem('jwt');
  const auth = jwt !== null;
  
  if (!auth) {
    return <Navigate to='/auth'/>;
  }

  const decodedToken = jwtDecode(jwt) as JwtPayload;
  
  if (decodedToken.exp < Date.now() / 1000) {
    localStorage.removeItem("jwt");
    return <Navigate to='/auth' />;
  }

  if (decodedToken.roles.includes("ADMIN") || decodedToken.roles.includes("STAFF")) {
    return <Outlet />;
  }
  

  return <Navigate to='/unauthorized'/>;
};

export default ProtectedRoute;