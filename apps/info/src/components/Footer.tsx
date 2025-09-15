import { Box, Flex, Image, Text, Link, Icon } from "@chakra-ui/react";
import {
  FaLinkedin,
  FaInstagram,
  FaGithub,
  FaFacebook,
  FaEnvelope,
  FaTiktok
} from "react-icons/fa";

const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://linkedin.com/company/reflections-projections-uiuc",
    icon: FaLinkedin
  },
  {
    name: "Instagram",
    url: "https://instagram.com/uiuc_rp/",
    icon: FaInstagram
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@uiuc_rp",
    icon: FaTiktok
  },
  {
    name: "Facebook",
    url: "https://facebook.com/acmrp/",
    icon: FaFacebook
  },
  {
    name: "GitHub",
    url: "https://github.com/ReflectionsProjections",
    icon: FaGithub
  },
  {
    name: "Email",
    url: "mailto:contact@reflectionsprojections.org",
    icon: FaEnvelope
  }
];

export const Footer = () => {
  return (
    <Box id="contact" data-label="footer" minH="40vh">
      <Box position="relative" width="100%">
        <Image
          src="/footer/CONTACT.svg"
          width="100%"
          height={{ base: "400px", sm: "500px", md: "600px", lg: "700px" }}
          objectFit="cover"
        />

        <Box
          position="absolute"
          top="38%"
          left="50%"
          transform="translate(-50%, -50%)"
          textAlign="center"
          w="100%"
          px={4}
        >
          <Flex
            display={{ base: "flex", sm: "none" }}
            direction="column"
            align="center"
            gap={6}
          >
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.url}
                isExternal={!social.url.includes("mailto")}
                _hover={{ transform: "scale(1.15)" }}
                transition="all 0.3s ease"
              >
                <Box
                  bg="rgba(255, 255, 255, 0.95)"
                  borderRadius="full"
                  p={4}
                  boxShadow="xl"
                  border="2px solid transparent"
                  _hover={{
                    borderColor: "white",
                    boxShadow: "2xl"
                  }}
                  transition="all 0.3s ease"
                >
                  <Icon
                    as={social.icon}
                    boxSize={8}
                    color="white"
                    _groupHover={{ color: "white" }}
                  />
                </Box>
              </Link>
            ))}
          </Flex>

          <Box display={{ base: "none", sm: "block", md: "none" }}>
            <Flex wrap="wrap" justify="center" gap={8} maxW="400px" mx="auto">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  isExternal={!social.url.includes("mailto")}
                  _hover={{ transform: "scale(1.15)" }}
                  transition="all 0.3s ease"
                >
                  <Box
                    bg="black"
                    borderRadius="full"
                    p={4}
                    boxShadow="xl"
                    border="2px solid transparent"
                    _hover={{
                      borderColor: "white",
                      boxShadow: "2xl"
                    }}
                    transition="all 0.3s ease"
                  >
                    <Icon as={social.icon} boxSize={8} color="white" />
                  </Box>
                </Link>
              ))}
            </Flex>
          </Box>

          <Box display={{ base: "none", md: "block" }}>
            <Flex direction="column" align="center" gap={8}>
              <Flex justify="center" gap={10}>
                {socialLinks.slice(0, 3).map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    isExternal={!social.url.includes("mailto")}
                    _hover={{ transform: "scale(1.15)" }}
                    transition="all 0.3s ease"
                  >
                    <Box
                      bg="black"
                      borderRadius="full"
                      p={5}
                      boxShadow="xl"
                      border="2px solid transparent"
                      _hover={{
                        borderColor: "white",
                        boxShadow: "2xl"
                      }}
                      transition="all 0.3s ease"
                    >
                      <Icon as={social.icon} boxSize={10} color="white" />
                    </Box>
                  </Link>
                ))}
              </Flex>
              <Flex justify="center" gap={10}>
                {socialLinks.slice(3, 6).map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    isExternal={!social.url.includes("mailto")}
                    _hover={{ transform: "scale(1.15)" }}
                    transition="all 0.3s ease"
                  >
                    <Box
                      bg="black"
                      borderRadius="full"
                      p={5}
                      boxShadow="xl"
                      border="2px solid transparent"
                      _hover={{
                        borderColor: "white",
                        boxShadow: "2xl"
                      }}
                      transition="all 0.3s ease"
                    >
                      <Icon as={social.icon} boxSize={10} color="white" />
                    </Box>
                  </Link>
                ))}
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Box>

      <Box position="relative" width="100%">
        <Image
          src="/footer/2.svg"
          width="100%"
          height={{ base: "300px", sm: "350px", md: "400px", lg: "450px" }}
          objectFit="cover"
        />

        <Box
          position="absolute"
          bottom={{ base: "15px", md: "20px" }}
          right={{ base: "2%", md: "1%" }}
        >
          <Link href="https://www.reflectionsprojections.org" isExternal>
            <Box
              color="black"
              px={{ base: 4, md: 6 }}
              py={{ base: 2, md: 3 }}
              borderRadius="md"
              bg="rgba(255, 255, 255, 0.1)"
              backdropFilter="blur(10px)"
              border="1px solid rgba(255, 255, 255, 0.2)"
              _hover={{
                transform: "scale(1.05)",
                bg: "rgba(255, 255, 255, 0.2)"
              }}
              transition="all 0.3s ease"
              cursor="pointer"
              textAlign="center"
            >
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                fontWeight="bold"
                textShadow="1px 1px 2px rgba(255, 255, 255, 0.5)"
              >
                visit reflectionsprojections.org
              </Text>
            </Box>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
