import { Outlet } from "react-router-dom";
import api from "../util/api";
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";

const ProtectedRoute = () => {
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        localStorage.setItem("originalDestination", "/dashboard/");
      }
    }

    api
      .get("/auth/info")
      .then((response) => {
        const roles = response.data.roles;

        if (!roles.includes("STAFF")) {
          window.location.href = "/unauthorized";
        }

        setRoles(response.data.roles);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
        window.location.href = "/auth";
      });
  }, []);

  return (
    <Box
      minH="100vh"
      display="flex"
      bgGradient={"linear-gradient(to-r, #805AD550, #38BDF850)"}
    >
      <Navbar roles={roles} loading={loading} />
      <Box mt={16} px={4} w="100%">
        <Outlet />
      </Box>
    </Box>
  );
};

export default ProtectedRoute;
