import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  Link,
  Box,
  IconButton,
  Image,
  HStack,
  Flex,
  useBreakpointValue
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import rpLogo from "/rp_logo.svg";

const MotionBox = motion(Box);

type NavbarProps = {
  isFlush: boolean;
};

const Navbar: React.FC<NavbarProps> = ({ isFlush }) => {
  const mobile = useBreakpointValue({ base: true, xl: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();

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

  useEffect(() => {
    if (!mobile) {
      onClose();
    }
  }, [mobile, onClose]);

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
        p={2}
        textAlign="center"
        rounded="xl"
        onClick={() => {
          if (isOpen) {
            onClose();
          }
        }}
        _hover={{
          base: {},
          xl: isActive
            ? {}
            : {
                textDecoration: "underline"
              }
        }}
        color="gray.300"
        fontSize="2xl"
        fontWeight={isActive ? "bold" : "normal"}
        cursor={isActive ? "default" : "pointer"}
      >
        {children}
      </Link>
    );
  };

  return (
    <Flex
      position={isFlush ? "sticky" : "fixed"}
      top={0}
      w="100%"
      justifyContent="center"
      zIndex={15}
    >
      <MotionBox
        sx={
          isFlush
            ? undefined
            : {
                borderRadius: { base: "2xl", xl: "full" },
                p: { base: "8px", xl: 3 },
                border: "1px solid",
                borderColor: "whiteAlpha.200",
                boxShadow: "xl",
                backdropFilter: "blur(24px)"
              }
        }
        borderRadius={isFlush ? undefined : { base: "2xl", xl: "full" }}
        p={{ base: "8px", xl: 3 }}
        border={isFlush ? undefined : "1px solid"}
        borderColor={isFlush ? undefined : "whiteAlpha.200"}
        boxShadow={isFlush ? undefined : "xl"}
        backdropFilter={isFlush ? undefined : "blur(24px)"}
        backgroundColor={isFlush ? "#1a1c25ff" : undefined}
        overflowY="hidden"
        my={isFlush ? 0 : { base: "4px", xl: "8px" }}
        mx={isFlush ? 0 : { base: "4px", xl: 0 }}
        w={isFlush ? "100%" : { base: "calc(100% - 8px)", xl: "fit-content" }}
        h={
          isFlush
            ? `calc(${isOpen ? "100vh" : "10vh"})`
            : `calc(${isOpen ? "100vh" : "12vh"} - 8px)`
        }
        style={{ transition: "height 0.5s ease-out" }}
        initial={isFlush ? undefined : { transform: "translateY(-100%)" }}
        animate={{ transform: "translateY(0)" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Flex
          h={{ base: "100vh", xl: "100%" }}
          gap={{ base: 8, xl: 32 }}
          px={{ base: 1, xl: 2 }}
          flexDir={{ base: "column", xl: "row" }}
          justifyContent={{ base: "start", xl: "space-between" }}
          alignItems="center"
        >
          <HStack
            px={{ base: "3%", xl: 0 }}
            w={{ base: "100%", xl: "fit-content" }}
            justifyContent="space-between"
          >
            <Link
              as={NavLink}
              to="/"
              h={
                isFlush
                  ? { base: "calc(10vh - 26px)", xl: "calc(10vh - 34px)" }
                  : { base: "calc(12vh - 26px)", xl: "calc(12vh - 34px)" }
              }
              aspectRatio={1}
            >
              <Image src={rpLogo} alt="R|P Logo" h="100%" />
            </Link>
            <IconButton
              bg="transparent"
              icon={
                isOpen ? (
                  <CloseIcon fontSize="3xl" />
                ) : (
                  <HamburgerIcon fontSize="3xl" />
                )
              }
              aria-label={"Open Menu"}
              display={{ xl: "none" }}
              onClick={isOpen ? onClose : onOpen}
              color="gray.300"
              height="fit-content"
              aspectRatio={1}
            />
          </HStack>

          <Flex
            as="nav"
            mb={{ base: 16, xl: 0 }}
            gap={{ base: 2, xl: 12 }}
            mr={8}
            height="100%"
            flexDir={{ base: "column", xl: "row" }}
            alignItems="center"
            justifyContent="space-between"
          >
            {[
              "Mechmania",
              "Puzzlebang",
              "Schedule",
              "Speakers",
              "FAQ",
              "Sponsors"
            ].map((link) => (
              <NavbarLink key={link} href="">
                {link}
              </NavbarLink>
            ))}
          </Flex>
        </Flex>
      </MotionBox>
    </Flex>
  );
};

export default Navbar;
