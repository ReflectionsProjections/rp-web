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

const LINKS = [
  { name: "Schedule", href: "/#schedule", hash: "schedule" },
  { name: "FAQ", href: "/#faq", hash: "faq" },
  { name: "Sponsors", href: "/#sponsors", hash: "sponsors" },
  //   { name: "Speakers", href: "" },
  { name: "Mechmania", href: "https://mechmania.org/", newTab: true },
  { name: "PuzzleBang", href: "https://puzzlebang.com/", newTab: true }
];

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
    href,
    hash,
    newTab
  }: {
    children: ReactNode;
    href: string;
    hash?: string;
    newTab?: boolean;
  }) => {
    const isActive = hash
      ? location.hash.slice(1) === hash &&
        location.pathname === href.split("#")[0]
      : location.pathname === href;

    return (
      <Link
        as={NavLink}
        to={href}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
        w="100%"
        py="9px"
        px="33px"
        textAlign="center"
        rounded="xl"
        onClick={() => {
          if (isOpen) {
            onClose();
          }
        }}
        sx={
          isActive
            ? {
                borderRadius: { base: "2xl", xl: "full" },
                border: "2px solid",
                borderColor: "whiteAlpha.200",
                backdropFilter: "blur(24px)",
                py: "7px",
                px: "31px"
              }
            : undefined
        }
        _hover={{
          base: {},
          xl: isActive
            ? {}
            : {
                borderRadius: { base: "2xl", xl: "full" },
                border: "1px solid",
                borderColor: "whiteAlpha.200",
                boxShadow: "xl",
                py: "8px",
                px: "32px"
              }
        }}
        color="#b6b6b6ff"
        fontFamily="magistral"
        fontSize="md"
        fontWeight="bold"
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
      h={
        isOpen
          ? "calc(100vh - 16px)"
          : isFlush
            ? "max(10vh, 60px)"
            : "max(12vh, 60px)"
      }
      w="100%"
      justifyContent="center"
      zIndex={15}
    >
      <MotionBox
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
        h="100%"
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
            h={{
              base: isFlush ? "max(10vh, 60px)" : "max(12vh, 60px)",
              xl: "100%"
            }}
            w={{ base: "100%", xl: "fit-content" }}
            justifyContent="space-between"
          >
            <Link
              as={NavLink}
              to="/"
              h="100%"
              aspectRatio={1}
              transition="transform 0.30s ease-in-out"
              onClick={() => {
                const section = document.getElementById("hero");
                if (section) {
                  section.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                  });
                }
              }}
            >
              <Image src={rpLogo} alt="R|P Logo" h="100%" />
            </Link>
            <IconButton
              bg="transparent"
              icon={
                isOpen ? (
                  <CloseIcon fontSize="xl" />
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
              _hover={{}}
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
            {LINKS.map(({ name, href, hash, newTab }) => (
              <NavbarLink key={name} href={href} hash={hash} newTab={newTab}>
                {name}
              </NavbarLink>
            ))}
          </Flex>
        </Flex>
      </MotionBox>
    </Flex>
  );
};

export default Navbar;
