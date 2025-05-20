import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  useColorModeValue,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  Button,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorMode,
  Link,
  VStack,
  Portal,
  Image
} from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import rpLogo from "../assets/rp_logo.svg";
import { ReactNode, useEffect, useState } from "react";
import "../App.css";
import { useMirrorStyles } from "@/styles/Mirror";

const linkMap = {
  Dashboard: "/dashboard",
  Stats: "/stats",
  Events: "/events",
  Meetings: "/meetings",
  Roles: "/roles",
  Sponsors: "/sponsors",
  "Event Checkin": "/event-checkin",
  Merch: "/merch",
  Attendance: "/attendance-view"
};

const getLinks = (roles: string[], loading: boolean): string[] => {
  if (loading) {
    return [];
  }

  if (roles.includes("ADMIN")) {
    return Object.keys(linkMap);
  }

  if (roles.includes("STAFF")) {
    return ["Dashboard"];
  }

  return [];
};

const Profile = () => {
  const { toggleColorMode } = useColorMode();

  const signOut = () => {
    localStorage.removeItem("jwt");
    window.location.href = "/";
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
        minW={0}
      >
        <Avatar
          size={"md"}
          src={"https://cdn-icons-png.freepik.com/512/8742/8742495.png"}
        />
      </MenuButton>
      <Portal>
        <MenuList>
          <MenuItem onClick={toggleColorMode}>Toggle Light/Dark Mode</MenuItem>
          <MenuDivider />
          <MenuItem onClick={signOut}>Sign Out</MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
};

type NavbarProps = {
  roles: string[];
  loading: boolean;
};

const Navbar: React.FC<NavbarProps> = ({ roles, loading }) => {
  const [inView, setInView] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const mirrorStyle = useMirrorStyles();

  useEffect(() => {
    setInView(true);
  }, []);

  /**
   * NavbarLink component.
   *
   * @param children - The content of the NavbarLink.
   * @param href - The path the NavbarLink links to.
   */
  const NavbarLink = ({
    children,
    href
  }: {
    children: ReactNode;
    href: string;
  }) => {
    const isActive = location.pathname.startsWith(href);

    return (
      <Link
        as={NavLink}
        to={href}
        w="100%"
        px={2}
        py={4}
        rounded={"md"}
        textAlign="left"
        onClick={() => {
          if (isOpen) {
            onClose();
          }
        }}
        _hover={{
          textDecoration: "none",
          bg: useColorModeValue("gray.200", "gray.700")
        }}
        border={isActive ? "1px solid" : "none"}
        borderColor={useColorModeValue("gray.700", "gray.200")}
        fontSize="lg"
        fontWeight="semibold"
      >
        {children}
      </Link>
    );
  };

  return (
    <Box
      sx={mirrorStyle}
      position="fixed"
      margin="4px"
      w={{ base: "calc(100vw - 8px)", md: "calc(12vw - 8px)" }}
      minW={{ md: "200px" }}
      h={{
        base: `calc(${isOpen ? "100vh" : "100px"} - 8px)`,
        md: "calc(100vh - 8px)"
      }}
      transform={
        inView
          ? { base: "translateY(0)", md: "translateX(0)" }
          : { base: "translateY(-100%)", md: "translateX(-100%)" }
      }
      transition="0.5s ease"
      zIndex={10}
    >
      <Flex
        h="100%"
        w="100%"
        gap={16}
        maxH={{ base: "calc(100px - 32px)", md: "100%" }}
        p={0}
        flexDir={{ base: "row", md: "column" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <IconButton
          size={"lg"}
          bg="transparent"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <Link as={NavLink} to="/dashboard" h="12vh" maxH="100%">
          <Image src={rpLogo} alt="R|P Logo" h="100%" />
        </Link>
        <VStack
          as="nav"
          display={{ base: "none", md: "flex" }}
          w="100%"
          height="100%"
        >
          {getLinks(roles, loading).map((link) => (
            <NavbarLink key={link} href={linkMap[link as keyof typeof linkMap]}>
              {link}
            </NavbarLink>
          ))}
        </VStack>
        <Profile />
      </Flex>
      {isOpen && (
        <VStack as="nav" pt={4} gap={0} display={{ base: "flex", md: "none" }}>
          {getLinks(roles, loading).map((link) => (
            <NavbarLink key={link} href={linkMap[link as keyof typeof linkMap]}>
              {link}
            </NavbarLink>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default Navbar;
