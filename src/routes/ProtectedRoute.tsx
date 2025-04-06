import { Navigate, Outlet } from 'react-router-dom';
import { verifyJwt } from '../util/jwt';

const ProtectedRoute = () => {
  const jwt = localStorage.getItem('jwt');
  const auth = jwt !== null;
  
  if (!auth) {
    return <Navigate to='/auth'/>;
  }

  const decodedToken = verifyJwt(jwt);
  
  if (decodedToken === null) {
    localStorage.removeItem("jwt");
    return <Navigate to='/auth' />;
  }

  if (decodedToken.roles.includes("ADMIN") || decodedToken.roles.includes("STAFF")) {
    return <Outlet />;
  }
  

  return <Navigate to='/unauthorized'/>;
};

export default ProtectedRoute;