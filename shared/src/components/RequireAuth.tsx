import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { googleAuth } from "../api/auth";
import { Role, RoleObject } from "../api/types";
import { useState } from "react";
import api from "../api/api";

type RequireAuthWrapperProps = {
  requiredRoles: Role[];
};

const RequireAuthWrapper: React.FC<RequireAuthWrapperProps> = ({
  requiredRoles
}) => {
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
        localStorage.removeItem("jwt");
        window.location.href = "/unauthorized";
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

export default RequireAuthWrapper;
