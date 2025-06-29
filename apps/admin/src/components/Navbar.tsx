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
  useDisclosure,
  useColorMode,
  Link,
  VStack,
  Portal,
  Image,
  HStack,
  Divider,
  Text,
  useToast,
  Badge
} from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import rpLogo from "../assets/rp_logo.svg";
import { ReactNode, useEffect, useState } from "react";
import "../App.css";
import { useMirrorStyles } from "@/styles/Mirror";
import StatusMonitor from "./StatusMonitor";
import { MdDarkMode, MdLightMode, MdPalette } from "react-icons/md";
import ColorProfileSelector from "./ColorProfileSelector";
import { useColorTheme } from "@/contexts/ColorThemeContext";

const linkMap = {
  Dashboard: "/",
  Stats: "/stats",
  Events: "/events",
  Meetings: "/meetings",
  Roles: "/roles",
  Sponsors: "/sponsors",
  "Event Check-in": "/event-checkin",
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

const Settings = ({ displayName }: { displayName?: string }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { currentProfile, isForcedMode } = useColorTheme();
  const jwt = localStorage.getItem("jwt");
  const {
    isOpen: isColorMenuOpen,
    onOpen: onColorMenuOpen,
    onClose: onColorMenuClose
  } = useDisclosure();
  const borderColor = useColorModeValue("white", "gray.800");
  const toast = useToast();

  const signOut = () => {
    localStorage.removeItem("jwt");
    window.location.reload();
  };

  const copyJWTToClipboard = () => {
    if (jwt) {
      navigator.clipboard
        .writeText(jwt)
        .then(() => {
          toast({
            title: "JWT Copied!",
            description: "JWT has been copied to your clipboard.",
            status: "success",
            duration: 3000,
            isClosable: true
          });
        })
        .catch(() => {
          toast({
            title: "Copy Failed",
            description: "Failed to copy JWT to clipboard.",
            status: "error",
            duration: 3000,
            isClosable: true
          });
        });
    }
  };

  return (
    <HStack gap={4}>
      {jwt && (
        <Menu>
          <MenuButton
            as={Button}
            rounded={"full"}
            variant={"link"}
            cursor={"pointer"}
            w="fit-content"
            h="fit-content"
            position="relative"
          >
            <Avatar
              size={"md"}
              name={typeof displayName === "string" ? displayName : "User"}
            />
            {/* Color theme indicator */}
            <Box
              position="absolute"
              bottom="0"
              right="0"
              w="12px"
              h="12px"
              borderRadius="full"
              bg={currentProfile.secondary}
              bgGradient={currentProfile.gradient}
              border="2px solid"
              borderColor={borderColor}
              boxShadow="sm"
              transition="all 0.2s ease"
              _hover={{
                transform: "scale(1.2)",
                boxShadow: "md"
              }}
            />
          </MenuButton>
          <Portal>
            <MenuList>
              <MenuItem onClick={onColorMenuOpen}>
                <HStack spacing={2}>
                  <MdPalette />
                  <Text>Color Theme</Text>
                  {isForcedMode && (
                    <Badge size="sm" colorScheme="orange">
                      Fixed
                    </Badge>
                  )}
                </HStack>
              </MenuItem>
              <Divider />
              <MenuItem onClick={signOut}>Sign Out</MenuItem>
              <MenuItem onClick={copyJWTToClipboard}>Copy JWT</MenuItem>
            </MenuList>
          </Portal>
        </Menu>
      )}
      <IconButton
        icon={colorMode === "light" ? <MdDarkMode /> : <MdLightMode />}
        aria-label="Toggle dark mode"
        p={4}
        size="xl"
        rounded={"full"}
        onClick={toggleColorMode}
        isDisabled={isForcedMode}
        opacity={isForcedMode ? 0.5 : 1}
        title={
          isForcedMode
            ? "Color mode is fixed by current theme"
            : "Toggle dark mode"
        }
      />

      {/* Color Profile Menu */}
      <Menu isOpen={isColorMenuOpen} onClose={onColorMenuClose}>
        <MenuButton
          as={Button}
          position="absolute"
          opacity={0}
          pointerEvents="none"
        />
        <Portal>
          <MenuList>
            <ColorProfileSelector onClose={onColorMenuClose} />
          </MenuList>
        </Portal>
      </Menu>
    </HStack>
  );
};

type NavbarProps = {
  roles: string[];
  loading: boolean;
  displayName?: string;
};

const Navbar: React.FC<NavbarProps> = ({ roles, loading, displayName }) => {
  const [inView, setInView] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const mirrorStyle = useMirrorStyles();

  useEffect(() => {
    setInView(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
    const isActive = location.pathname === href;

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
      minW={{ md: "300px" }}
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
      zIndex={11}
    >
      <Flex
        h="100%"
        w="100%"
        gap={{ md: 12 }}
        maxH={{ base: "calc(100px - 42px)", md: "100%" }}
        p={0}
        flexDir={{ base: "row", md: "column" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Link
          as={NavLink}
          to="/"
          h={{ base: "100%", md: "12vh" }}
          minH={{ md: "100px" }}
          mx={{ md: "auto" }}
        >
          <Image src={rpLogo} alt="R|P Logo" h="100%" />
        </Link>

        <VStack
          as="nav"
          display={{ base: "none", md: "flex" }}
          w="100%"
          height="100%"
          overflowY="auto"
        >
          {getLinks(roles, loading).map((link) => (
            <NavbarLink key={link} href={linkMap[link as keyof typeof linkMap]}>
              {link}
            </NavbarLink>
          ))}
        </VStack>
        <IconButton
          size={"lg"}
          bg="transparent"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <VStack
          gap={4}
          w="100%"
          alignItems="center"
          justifyContent="space-evenly"
          display={{ base: "none", md: "flex" }}
        >
          <Settings displayName={displayName} />
          <StatusMonitor />
        </VStack>
      </Flex>
      {isOpen && (
        <VStack
          as="nav"
          pt={4}
          gap={0}
          overflowY="scroll"
          display={{ base: "flex", md: "none" }}
          h="100%"
          maxH="calc(100% - calc(100px - 42px))"
        >
          {getLinks(roles, loading).map((link) => (
            <NavbarLink key={link} href={linkMap[link as keyof typeof linkMap]}>
              {link}
            </NavbarLink>
          ))}
          <HStack
            alignItems="center"
            mt={4}
            w="100%"
            justifyContent="space-evenly"
            style={{ marginTop: "auto" }}
          >
            <StatusMonitor />
            <Settings displayName={displayName} />
          </HStack>
        </VStack>
      )}
    </Box>
  );
};

export default Navbar;
