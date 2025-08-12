import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { googleAuth } from "../api/auth";
import { Role, RoleObject } from "../api/types";
import { useState } from "react";
import api from "../api/api";

type RequireAuthProps = {
  requiredRoles?: Role[];
};

const RequireAuth: React.FC<RequireAuthProps> = ({ requiredRoles = [] }) => {
  const [authInfo, setAuthInfo] = useState<RoleObject | null>(null);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (!jwt) {
      googleAuth(true);
      return;
    }

    api
      .get("/auth/info")
      .then((response) => {
        const roles = response.data.roles;

        const missingRole = requiredRoles.find((role) => !roles.includes(role));
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
  }, [jwt, requiredRoles]);

  if (!jwt) {
    return <p>Redirecting to login...</p>;
  }

  if (!authInfo) {
    return <p>Loading...</p>;
  }

  return <Outlet context={authInfo} />;
};

export default RequireAuth;
