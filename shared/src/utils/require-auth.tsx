import { ReactNode } from "react";
import { Role } from "../api/types";
import AuthCallback from "../components/AuthCallback";
import { Route } from "react-router-dom";
import RequireAuthWrapper from "../components/RequireAuth";

type RequireAuthProps = {
  requiredRoles?: Role[];
  children?: ReactNode;
};

const RequireAuth = ({ requiredRoles = [], children }: RequireAuthProps) => {
  return (
    <>
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route element={<RequireAuthWrapper requiredRoles={requiredRoles} />}>
        {children}
      </Route>
    </>
  );
};

export default RequireAuth;
