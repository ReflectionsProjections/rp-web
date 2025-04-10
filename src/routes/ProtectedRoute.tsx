import { Navigate, Outlet } from 'react-router-dom';
import api from '../util/api';
import { useEffect, useState } from 'react';

async function verifyAuth() {
  const response = await api.get("/auth/info");

  const roles = response.data.roles;

  if (roles.includes("ADMIN") || roles.includes("STAFF")) {
    return <Outlet />;
  }

  localStorage.removeItem("jwt");
  return <Navigate to='/unauthorized' />;
}

const ProtectedRoute = () => {
  const [redirect, setRedirect] = useState<JSX.Element | null>(null);

  useEffect(() => {
    verifyAuth().then((element) => setRedirect(element));
  }, []);

  return redirect;
};

export default ProtectedRoute;