import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Link,
  useBreakpointValue,
  useDisclosure
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ReactNode, useEffect } from "react";
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
        sx={{
          xl: isActive
            ? {
                borderRadius: { base: "2xl", xl: "full" },
                border: "2px solid",
                borderColor: "whiteAlpha.400",
                backdropFilter: "blur(24px)",
                py: "7px",
                px: "31px"
              }
            : {}
        }}
        _hover={{
          base: {
            borderWidth: "1px",
            borderColor: "whiteAlpha.300"
          },
          xl: isActive
            ? {}
            : {
                borderWidth: "1px",
                boxShadow: "xl",
                py: "8px",
                px: "32px"
              }
        }}
        color={{ base: "white", xl: "#b6b6b6ff" }}
        fontFamily="magistral"
        border="0px solid"
        borderColor="whiteAlpha.300"
        borderRadius={{
          base: "2xl",
          xl: "full"
        }}
        fontSize={{
          base: "3xl",
          xl: "2xl"
        }}
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
      h={isOpen ? "calc(100vh - 16px)" : isFlush ? "max(8vh, 60px)" : undefined}
      w="100%"
      justifyContent="center"
      zIndex={15}
    >
      <MotionBox
        borderRadius={isFlush ? undefined : { base: "2xl", xl: "full" }}
        borderTopRadius={{
          base: 0,
          xl: isFlush ? 0 : "full"
        }}
        p={{ base: "8px", xl: 3 }}
        border={isFlush ? undefined : "1px solid"}
        borderColor={isFlush ? undefined : "whiteAlpha.200"}
        boxShadow={isFlush ? undefined : "xl"}
        backdropFilter={isFlush ? undefined : "blur(24px)"}
        backgroundColor={isFlush ? "#1a1c25ff" : undefined}
        my={isFlush ? 0 : { xl: "8px" }}
        mx={isFlush ? 0 : { base: 0, xl: 0 }}
        w={isFlush ? "100%" : { base: "calc(100% - 8px)", xl: "fit-content" }}
        h="100%"
        style={{ transition: "height 0.5s ease-out" }}
        initial={isFlush ? undefined : { transform: "translateY(-100%)" }}
        animate={{ transform: "translateY(0)" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        maxH="100%"
        overflowY="auto"
      >
        <Flex
          h={{ base: undefined, xl: "100%" }}
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
              h="100%"
              aspectRatio={1}
              // you don’t need the transition here if you put it on the Image
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
              <Image
                src={rpLogo}
                alt="R|P Logo"
                h="100%"
                minH="50px"
                transition="transform 0.3s ease-in-out"
                _hover={{
                  transform: "rotate(360deg)"
                }}
                // make sure it spins around its center
                transformOrigin="center"
              />
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
          {!isOpen && mobile ? null : (
            <Flex
              as="nav"
              mb={{ base: 16, xl: 0 }}
              gap={{ base: 5, xl: 6 }}
              mr={{ xl: 8 }}
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
          )}
        </Flex>
      </MotionBox>
    </Flex>
  );
};

export default Navbar;
