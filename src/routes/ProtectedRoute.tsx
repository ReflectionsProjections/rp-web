import { Navigate, Outlet } from 'react-router-dom';
const ProtectedRoute = () => {
  const auth = localStorage.getItem('jwt') !== null;

  return (
    auth ? <Outlet/> : <Navigate to='/auth'/>
  );
};

export default ProtectedRoute;