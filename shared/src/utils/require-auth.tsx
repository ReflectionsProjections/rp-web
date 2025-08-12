import { ReactNode } from "react";
import { Role } from "../api/types";
// import AuthCallback from "../components/AuthCallback";
import { Outlet, Route } from "react-router-dom";
// import RequireAuthWrapper from "../components/RequireAuth";

type RequireAuthProps = {
  requiredRoles?: Role[];
  children?: ReactNode;
};

// const getRequireAuth = ({ requiredRoles = [], children }: RequireAuthProps) => {
//   return [
//     <Route path="/auth/callback" element={<AuthCallback />} />,
//     <Route element={<RequireAuthWrapper requiredRoles={requiredRoles} />}>
//       {children}
//     </Route>
//   ];
// };

const getRequireAuth = ({ /*requiredRoles = [],*/ children }: RequireAuthProps) => {
  return [
    <Route path="/auth/callback" element={<p>hi</p>} />,
    <Route element={<Outlet />}>
      {children}
    </Route>
  ];
};

export default getRequireAuth;
