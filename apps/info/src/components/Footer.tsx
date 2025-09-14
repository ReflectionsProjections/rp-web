import { Box, Flex, Text, Image, Link } from "@chakra-ui/react";
import { HoverIconLink } from "@/components/HoverIconLink";

const footerLinkIcons: { src: string; to: string }[] = [
  {
    src: "linkedin_red.svg",
    to: "https://linkedin.com/company/reflections-projections-uiuc"
  },
  { src: "instagram_red.svg", to: "https://instagram.com/uiuc_rp/" },
  { src: "tiktok_red.svg", to: "https://www.tiktok.com/@uiuc_rp" }
];

const footerLinkIcons2: { src: string; to: string }[] = [
  { src: "facebook_red.svg", to: "https://facebook.com/acmrp/" },
  { src: "github_red.svg", to: "https://github.com/ReflectionsProjections" },
  { src: "email_red.svg", to: "mailto:contact@reflectionsprojections.org" }
];

export const Footer = () => {
  return (
    <Box data-label="footer" minH="40vh">
      {/* Full width image with social icons overlay */}
      <Box position="relative" width="100%">
        <Image
          src="/footer/CONTACT.svg"
          width="100%"
          height="700px"
          objectFit="cover"
        />

        {/* Social media icons overlay */}
        <Flex
          position="absolute"
          top="30%"
          left="50%"
          transform="translate(-50%, -50%)"
          direction={{ base: "column", md: "row" }}
          gap={{ base: "10", md: "10" }}
        >
          {footerLinkIcons.map((item) => (
            <HoverIconLink
              key={item.src}
              link={item.to}
              src={`/socials/${item.src}`}
            />
          ))}
        </Flex>

        <Flex
          position="absolute"
          top="40%"
          left="50%"
          transform="translateX(-50%)"
          direction={{ base: "column", md: "row" }}
          gap={{ base: "10", md: "10" }}
        >
          {footerLinkIcons2.map((item) => (
            <HoverIconLink
              key={item.src}
              link={item.to}
              src={`/socials/${item.src}`}
            />
          ))}
        </Flex>
      </Box>

      {/* Second full width image */}
      {/* Second full width image with clickable text box */}
      <Box position="relative" width="100%">
        <Image src="/footer/2.svg" bgSize="cover" width="100%" />

        <Box position="absolute" bottom="20px" right="1%">
          <Link href="YOUR_LINK_HERE" isExternal>
            <Box
              color="black"
              px={6}
              py={3}
              borderRadius="md"
              _hover={{ bg: "gray.800", transform: "scale(1.05)" }}
              transition="all 0.2s"
              cursor="pointer"
              textAlign="center"
            >
              <Text fontSize="xl" fontWeight="bold">
                visit reflectionsprojections.org
              </Text>
            </Box>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
