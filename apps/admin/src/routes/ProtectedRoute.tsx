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
      flexDir={{ base: "column", md: "row" }}
      bgGradient={"linear-gradient(to-r, #805AD550, #38BDF850)"}
    >
      <Navbar roles={roles} loading={loading} />
      <Box
        mt={{ base: "100px", md: "0" }}
        ml={{ base: "0", md: "max(12vw, 300px)" }}
        px={{ base: 0, md: 4 }}
        w="100%"
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default ProtectedRoute;
