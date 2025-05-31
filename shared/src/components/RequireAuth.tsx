import { ReactNode, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { googleAuth } from "../api/auth";
import { TypedAxiosInstance } from "../api/type-wrapper";
import { Role } from "../api/types";

type RequireAuthProps = {
  api: TypedAxiosInstance;
  clientId: string;
  requiredRoles: Role[];
  children?: ReactNode;
};

const RequireAuth: React.FC<RequireAuthProps> = ({
  api,
  clientId,
  requiredRoles,
  children
}) => {
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (!jwt) {
      googleAuth(clientId, true);
      return;
    }

    api
      .get("/auth/info")
      .then((response) => {
        const roles = response.data.roles;

        const missingRole = requiredRoles.find((role) => !roles.includes(role));
        if (missingRole) {
          window.location.href = "/unauthorized";
        }
      })
      .catch(() => {
        localStorage.removeItem("jwt");
        window.location.href = "/unauthorized";
      });
  }, [jwt, api, clientId, requiredRoles]);

  if (!jwt) {
    return <p>Redirecting to login...</p>;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default RequireAuth;
