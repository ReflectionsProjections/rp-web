import { Outlet } from "react-router-dom";
import api from "../util/api";
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import { Role } from "@rp/shared";
import Unauthorized from "@/components/Unauthorized";

export type MainContext = {
  displayName: string;
  roles: Role[];
};

const Main = () => {
  const [displayName, setDisplayName] = useState<string>("");
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("jwt")) {
      setLoading(false);
      return;
    }

    api
      .get("/auth/info")
      .then((response) => {
        setDisplayName(response.data.displayName);
        setRoles(response.data.roles);
        setLoading(false);
      })
      .catch(() => {});
  }, []);

  const context = {
    displayName,
    roles
  } satisfies MainContext;

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
        px={{ base: 0, md: 8 }}
        py={8}
        w="100%"
      >
        {localStorage.getItem("jwt") &&
          (roles.includes("STAFF") ? (
            <Outlet context={context} />
          ) : (
            <Unauthorized />
          ))}
      </Box>
    </Box>
  );
};

export default Main;
