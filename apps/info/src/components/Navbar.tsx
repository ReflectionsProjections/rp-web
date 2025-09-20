import { Box, HStack, Link } from "@chakra-ui/react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatedLogoHover } from "./AnimatedLogo";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      void navigate("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: "smooth"
        });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth"
      });
    }
  };

  return (
    <Box
      data-label="navbar"
      h="60px"
      w="50%"
      minW="650px"
      margin="0px auto 0px"
      px="5px"
      fontSize="18px"
      zIndex={500}
      bg="rgba(250, 250, 250, 0.95)"
      boxShadow="xl"
      borderRadius="2xl"
      display="flex"
      justifyContent="center"
      alignItems="center"
      pos="fixed" // Changed from sticky to fixed
      top="10px" // Keep this for the floating effect, or change to "0px" for no gap
      left="50%" // Center horizontally
      transform="translateX(-50%)" // Center horizontally
    >
      <HStack justify="space-around" align="center" w="100%">
        <Box h="50px" w="50px" pos="relative">
          <AnimatedLogoHover />
        </Box>
        <Link
          as={NavLink}
          to="/"
          textStyle="menu"
          fontSize="inherit"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("stats");
          }}
        >
          ABOUT
        </Link>
        <Link
          as={NavLink}
          to="/"
          textStyle="menu"
          fontSize="inherit"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("team");
          }}
        >
          TEAM
        </Link>
        {/* <Link
          as={NavLink}
          to="/"
          textStyle="menu"
          fontSize="inherit"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("sponsors");
          }}
        >
          SPONSORING
        </Link> */}
        {/* <Link
          as={NavLink}
          to="/archive"
          textStyle="menu"
          fontSize="inherit"
          textDecoration={location.pathname === "/archive" ? "underline" : ""}
        >
          ARCHIVE */}
        {/* </Link> */}
        {/* <Link
          as={NavLink}
          to="/faq"
          textStyle="menu"
          fontSize="inherit"
          textDecoration={location.pathname === "/faq" ? "underline" : ""}
        >
          FAQ
        </Link> */}
        <Link
          as={NavLink}
          to="/"
          textStyle="menu"
          fontSize="inherit"
          _hover={{}}
          bg="black"
          color="white"
          p="2px 25px"
          borderRadius="lg"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("contact");
          }}
        >
          join us!
        </Link>
      </HStack>
    </Box>
  );
};
