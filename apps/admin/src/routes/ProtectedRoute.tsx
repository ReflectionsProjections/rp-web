import { Outlet } from "react-router-dom";
import api from "../util/api";
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import { Role } from "@rp/shared";

export type ProtectedRouteContext = {
  displayName: string;
  roles: Role[];
};

const ProtectedRoute = () => {
  const [displayName, setDisplayName] = useState<string>("");
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    const currentPath = window.location.pathname + window.location.search;
    if (!jwt) {
      localStorage.setItem("originalDestination", currentPath);
      window.location.href = "/auth";
    }

    api
      .get("/auth/info")
      .then((response) => {
        const roles = response.data.roles;

        if (!roles.includes("STAFF")) {
          window.location.href = "/unauthorized";
        }

        setDisplayName(response.data.displayName);
        setRoles(response.data.roles);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
        window.location.href = "/auth";
      });
  }, []);

  const context = {
    displayName,
    roles
  } satisfies ProtectedRouteContext;

  return (
    <Box
      minH="100vh"
      display="flex"
      flexDir={{ base: "column", md: "row" }}
      bgGradient={"linear-gradient(to-r, #805AD550, #38BDF850)"}
    >
      <Navbar roles={roles} loading={loading} />
      <Box
        mt={{ base: "100px", md: "0" }}
        ml={{ base: "0", md: "max(12vw, 300px)" }}
        px={{ base: 2, md: 8 }}
        py={{ base: 4, md: 8 }}
        w="100%"
      >
        <Outlet context={context} />
      </Box>
    </Box>
  );
};

export default ProtectedRoute;
