// src/components/Navbar.tsx
import { Box, chakra, HStack, Link } from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatedLogoConstant, AnimatedLogoHover } from "./AnimatedLogo";
import { motion, useScroll, useTransform } from "framer-motion";

export const Navbar = () => {
  const location = useLocation();

  //const MotionBox = motion(Box);

  // const { scrollY } = useScroll();
  // const width = useTransform(scrollY, [0, 500], ['100%', '50%']);
  // const height = useTransform(scrollY, [0, 500], ['85px', '75px']);
  // const top = useTransform(scrollY, [0, 500], [0, 10]);
  // const fontSize = useTransform(scrollY, [0, 500], ['1.75rem', '1.15rem']);
  // const borderRadius = useTransform(scrollY, [0, 500], ['0px', '16px']);

  return (
    // <MotionBox
    //   data-label="navbar" minH="75px" minW="600px" transformOrigin="bottom center"
    //   margin="0px auto 0px" px="5px" position="sticky" zIndex={500}
    //   display="flex" justifyContent="center" alignItems="center"
    //   bg="gray.400" boxShadow="lg" style={{
    //     width,
    //     height,
    //     top,
    //     fontSize,
    //     borderRadius
    //   }}>
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
      pos="sticky"
      top="10px"
    >
      {/* todo(): add a small-web version */}

      <HStack justify="space-around" align="center" w="100%">
        <Box h="50px" w="50px" pos="relative">
          <AnimatedLogoHover />
        </Box>
        <Link
          as={NavLink}
          to="/"
          textStyle="menu"
          fontSize="inherit"
          textDecoration={location.pathname == "/" ? "underline" : ""}
        >
          ABOUT
        </Link>
        <Link
          as={NavLink}
          to="/archive"
          textStyle="menu"
          fontSize="inherit"
          textDecoration={location.pathname == "/archive" ? "underline" : ""}
        >
          ARCHIVE
        </Link>
        <Link
          as={NavLink}
          to="/"
          textStyle="menu"
          fontSize="inherit"
          textDecoration={location.pathname == "/x" ? "underline" : ""}
        >
          TEAM
        </Link>
        <Link
          as={NavLink}
          to="/faq"
          textStyle="menu"
          fontSize="inherit"
          textDecoration={location.pathname == "/faq" ? "underline" : ""}
        >
          FAQ
        </Link>
        <Link
          as={NavLink}
          to="/"
          textStyle="menu"
          fontSize="inherit"
          textDecoration={location.pathname == "/x" ? "underline" : ""}
        >
          SPONSORS
        </Link>
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
        >
          join us!
        </Link>
      </HStack>
    </Box>
    // </MotionBox>
  );
};
