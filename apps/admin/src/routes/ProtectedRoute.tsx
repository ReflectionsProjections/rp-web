import { Navigate, Outlet } from "react-router-dom";
import api from "../util/api";
import { useEffect, useState } from "react";

async function verifyAuth() {
  const jwt = localStorage.getItem("jwt");

  const currentPath = window.location.pathname + window.location.search;
  if (!jwt && !localStorage.getItem("originalDestination")) {
    if (
      currentPath !== "/" &&
      currentPath !== "/auth" &&
      currentPath !== "/auth/"
    ) {
      localStorage.setItem("originalDestination", currentPath);
    } else {
      localStorage.setItem("originalDestination", "/home/");
    }
  }

  const response = await api.get("/auth/info");

  const roles = response.data.roles;

  if (roles.includes("ADMIN") || roles.includes("STAFF")) {
    return <Outlet />;
  }

  localStorage.removeItem("jwt");
  return <Navigate to="/unauthorized" />;
}

const ProtectedRoute = () => {
  const [redirect, setRedirect] = useState<JSX.Element | null>(null);

  useEffect(() => {
    verifyAuth()
      .then((element) => setRedirect(element))
      .catch((error) => {
        console.log(error);
        setRedirect(<Navigate to="/unauthorized/" replace={true} />);
      });
  }, []);

  return redirect;
};

export default ProtectedRoute;
