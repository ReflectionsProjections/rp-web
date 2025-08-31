import { Box, Flex, Heading, Text, Container } from "@chakra-ui/react";
import { HoverIconLink } from "@/components/HoverIconLink";

export const Footer = () => {
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

  return (
    <Box data-label="footer" minH="40vh" py={10} mb="5vh">
      <Container maxW="container.xl">
        <Box textAlign="center" my={6}>
          <Heading as="h1" size="2xl" fontWeight="bold" lineHeight="1.2">
            Contact Us!
          </Heading>
        </Box>

        <Flex
          direction={{ base: "column", md: "row" }}
          gap={{ base: 8, md: 20 }}
          justifyContent="space-between"
          alignItems="center"
          textAlign="center"
          pt="80px"
        >
          <Box w="100%" px="20px">
            <Text>
              R|P is the largest student-run technology conference in the
              Midwest! Held at UIUC, we bring together students, professionals,
              and companies for talks, networking, competitions, and career
              opportunities!
            </Text>
          </Box>
          <Flex
            w="100%"
            direction={{ base: "row", md: "column" }}
            justifyContent="center"
            alignItems="center"
            gap={{ base: "10", md: "10" }}
          >
            <Flex
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
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
