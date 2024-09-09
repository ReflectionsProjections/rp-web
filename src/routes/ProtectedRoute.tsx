import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  roles: string[];
}

const ProtectedRoute = () => {
  const jwt = localStorage.getItem('jwt');
  const auth = jwt !== null;
  
  if (!auth) {
    return <Navigate to='/auth'/>;
  }

  const decodedToken = jwtDecode(jwt) as JwtPayload;
  if (decodedToken.roles.includes("ADMIN") || decodedToken.roles.includes("STAFF")) {
    return <Outlet />;
  }
  

  return <Navigate to='/unauthorized'/>;
};

export default ProtectedRoute;