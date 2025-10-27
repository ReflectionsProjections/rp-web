import {
  Box,
  HStack,
  Link,
  VStack,
  useDisclosure,
  useBreakpointValue
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { AnimatedLogoHover } from "./AnimatedLogo";
import { motion } from "framer-motion";
import { useEffect } from "react";

const MotionBox = motion(Box);

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

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
    if (!isMobile) {
      onClose();
    }
  }, [isMobile, onClose]);

  const handleLinkClick = () => {
    // Restore body overflow and close menu when clicking a link
    document.body.style.overflow = "";
    onClose();
  };

  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <Box
      position="fixed"
      top={0}
      left="50%"
      transform="translateX(-50%)"
      w={{ base: "calc(100% - 16px)", md: "50%" }}
      minW={{ md: "max(450px, 75%)" }}
      zIndex={500}
      mt="10px"
    >
      <MotionBox
        data-label="navbar"
        borderRadius="2xl"
        px="5px"
        fontSize="18px"
        bg="rgba(250, 250, 250, 0.95)"
        boxShadow="xl"
        backdropFilter="blur(24px)"
        initial={false}
        animate={{
          height: isOpen && isMobile ? "calc(100vh - 20px)" : "60px"
        }}
        transition={{ height: { duration: 0.4, ease: "easeOut" } }}
        style={{ overflow: "hidden" }}
      >
        <Box py="5px" h="100%">
          <HStack
            justify="space-between"
            align="center"
            w="100%"
            h="50px"
            px="10px"
          >
            <Link
              as={NavLink}
              to="/"
              h="50px"
              w="50px"
              pos="relative"
              cursor="pointer"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <AnimatedLogoHover />
            </Link>

            {/* Desktop Navigation */}
            {!isMobile && (
              <>
                <HStack flex={1} justify="space-evenly">
                  <Link
                    as={NavLink}
                    to="/#about"
                    textStyle="menu"
                    fontSize="inherit"
                  >
                    ABOUT
                  </Link>
                  <Link
                    as={NavLink}
                    to="/#team"
                    textStyle="menu"
                    fontSize="inherit"
                  >
                    TEAM
                  </Link>
                </HStack>
                <Link
                  as={NavLink}
                  to="/#contact"
                  textStyle="menu"
                  fontSize="inherit"
                  _hover={{}}
                  bg="black"
                  color="white"
                  p="2px 25px"
                  borderRadius="lg"
                >
                  JOIN US!
                </Link>
              </>
            )}

            {/* Animated Hamburger Menu */}
            {isMobile && (
              <Box
                as="button"
                onClick={handleToggle}
                position="relative"
                width="30px"
                height="20px"
                transform="rotate(0deg)"
                transition=".5s ease-in-out"
                cursor="pointer"
              >
                {[1, 2, 3].map((i) => (
                  <Box
                    key={i}
                    position="absolute"
                    height="3px"
                    width="100%"
                    background="black"
                    borderRadius="9px"
                    opacity="1"
                    left="0"
                    transform="rotate(0deg)"
                    transition=".25s ease-in-out"
                    top={i === 1 ? "0" : i === 2 ? "9px" : "18px"}
                    transformOrigin="left center"
                    {...(isOpen && {
                      top: i === 2 ? "9px" : "18px",
                      width: i === 2 ? "0%" : "100%",
                      left: i === 2 ? "50%" : "0",
                      transform: `translateX(${i === 1 ? "5px" : i === 3 ? "5px" : "0"}) translateY(${i === 1 ? "-21px" : i === 3 ? "0px" : "0"}) rotate(${i === 1 ? "45deg" : i === 3 ? "-45deg" : "0"})`
                    })}
                  />
                ))}
              </Box>
            )}
          </HStack>

          {/* Mobile Menu Content */}
          {isMobile && isOpen && (
            <VStack spacing="20px" align="stretch" mt={8} px="20px" pb="20px">
              <Link
                as={NavLink}
                to="/#stats"
                textStyle="menu"
                fontSize="24px"
                textAlign="center"
                onClick={handleLinkClick}
              >
                ABOUT
              </Link>
              <Link
                as={NavLink}
                to="/#team"
                textStyle="menu"
                fontSize="24px"
                textAlign="center"
                onClick={handleLinkClick}
              >
                TEAM
              </Link>
              <Link
                as={NavLink}
                to="/#contact"
                textStyle="menu"
                fontSize="24px"
                textAlign="center"
                _hover={{}}
                bg="black"
                color="white"
                p="12px 25px"
                borderRadius="lg"
                onClick={handleLinkClick}
              >
                JOIN US!
              </Link>
            </VStack>
          )}
        </Box>
      </MotionBox>
    </Box>
  );
};
