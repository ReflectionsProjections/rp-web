import { ReactNode } from "react";
import { Role } from "../api/types";
import AuthCallback from "../components/AuthCallback";
import { Route } from "react-router-dom";
import RequireAuthWrapper from "../components/RequireAuth";
import Unauthorized from "../components/Unauthorized";

type RequireAuthProps = {
  requiredRoles?: Role[];
  children?: ReactNode;
};

const getRequireAuth = ({ requiredRoles = [], children }: RequireAuthProps) => {
  return [
    <Route path="/auth/callback" element={<AuthCallback />} />,
    <Route path="/unauthorized" element={<Unauthorized />} />,
    <Route element={<RequireAuthWrapper requiredRoles={requiredRoles} />}>
      {children}
    </Route>
  ];
};

export default getRequireAuth;
