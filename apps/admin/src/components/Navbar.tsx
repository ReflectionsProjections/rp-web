import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  useColorModeValue,
  Flex,
  IconButton,
  HStack,
  Menu,
  MenuButton,
  Button,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  useDisclosure,
  useColorMode,
  Link
} from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import rpLogo from "../assets/rp_logo.svg";
import { ReactNode } from "react";
import "../App.css";

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

type NavbarProps = {
  roles: string[];
  loading: boolean;
};

const Navbar: React.FC<NavbarProps> = ({ roles, loading }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleColorMode } = useColorMode();
  const location = useLocation();

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
        px={2}
        py={1}
        rounded={"md"}
        _hover={{
          textDecoration: "none",
          bg: useColorModeValue("gray.200", "gray.700")
        }}
        padding={"6px 12px"}
        border={isActive ? "1px solid" : "none"}
        borderColor={useColorModeValue("gray.700", "gray.200")}
      >
        {children}
      </Link>
    );
  };

  const signOut = () => {
    localStorage.removeItem("jwt");
    window.location.href = "/";
  };

  return (
    <Box
      bg={useColorModeValue("whiteAlpha.600", "blackAlpha.500")}
      blur={12}
      px={4}
      position="fixed"
      top={0}
      left={0}
      width="100%"
      zIndex={1}
    >
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        bg="transparent"
      >
        <IconButton
          size={"lg"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <Flex align="center" mr={5} maxWidth={50}>
            <NavLink to="/dashboard">
              <img
                src={rpLogo}
                className="logo"
                alt="R|P Logo"
                style={{ width: "50px" }}
              />
            </NavLink>
          </Flex>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {getLinks(roles, loading).map((link) => (
              <NavbarLink
                key={link}
                href={linkMap[link as keyof typeof linkMap]}
              >
                {link}
              </NavbarLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <Avatar
                size={"sm"}
                src={"https://cdn-icons-png.freepik.com/512/8742/8742495.png"}
              />
            </MenuButton>
            <MenuList>
              {/* <MenuItem onClick={printToken}>Print {userName} JWT</MenuItem> */}
              <MenuItem onClick={toggleColorMode}>
                Toggle Light/Dark Mode
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={signOut}>Sign Out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {getLinks(roles, loading).map((link) => (
              <NavbarLink
                key={link}
                href={linkMap[link as keyof typeof linkMap]}
              >
                {link}
              </NavbarLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
