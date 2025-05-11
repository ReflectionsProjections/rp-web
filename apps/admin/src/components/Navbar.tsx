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
  VStack
} from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import rpLogo from "../assets/rp_logo.svg";
import { ReactNode } from "react";
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
      <MenuList>
        <MenuItem onClick={toggleColorMode}>Toggle Light/Dark Mode</MenuItem>
        <MenuDivider />
        <MenuItem onClick={signOut}>Sign Out</MenuItem>
      </MenuList>
    </Menu>
  );
};

type NavbarProps = {
  roles: string[];
  loading: boolean;
};

const Navbar: React.FC<NavbarProps> = ({ roles, loading }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const mirrorStyle = useMirrorStyles();

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
      w={{ base: "calc(100vw - 8px)", md: "calc(16vw - 8px)" }}
      h={{
        base: `calc(${isOpen ? "100vh" : "16vh"} - 8px)`,
        md: "calc(100vh - 8px)"
      }}
      transition="height 0.5s ease"
      zIndex={10}
    >
      <Flex
        h="100%"
        gap={16}
        maxH={{ base: "calc(16vh - 42px)", md: "100%" }}
        p={{ base: 0, md: 4 }}
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
        <Link as={NavLink} to="/dashboard">
          <img
            src={rpLogo}
            className="logo"
            alt="R|P Logo"
            style={{ width: "100%", maxWidth: "calc(16vh - 42px)" }}
          />
        </Link>
        <VStack
          as="nav"
          display={{ base: "none", md: "flex" }}
          height="100%"
          justifyContent="space-around"
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
