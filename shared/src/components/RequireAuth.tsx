import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Role, RoleObject } from "../api/types";
import { useState } from "react";
import api from "../api/api";
import { authRefresh } from "../api/auth";

type RequireAuthProps = {
  requiredRoles?: Role[];
};

const RequireAuth: React.FC<RequireAuthProps> = ({ requiredRoles = [] }) => {
  const [authInfo, setAuthInfo] = useState<RoleObject | null>(null);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (!jwt) {
      authRefresh();
      return;
    }

    if (!authInfo) {
      api
        .get("/auth/info")
        .then((response) => {
          const roles = response.data.roles;

          const missingRole = requiredRoles.find(
            (role) => !roles.includes(role)
          );
          if (missingRole) {
            window.location.href = "/unauthorized";
          } else {
            setAuthInfo(response.data);
          }
        })
        .catch(() => {
          // This only happens if jwt is expired
          // middleware will handle the error
        });
    }
  }, [authInfo, jwt, requiredRoles]);

  if (!jwt) {
    return <p>Redirecting to login...</p>;
  }

  if (!authInfo) {
    return <p>Loading...</p>;
  }

  return <Outlet context={authInfo} />;
};

export default RequireAuth;
