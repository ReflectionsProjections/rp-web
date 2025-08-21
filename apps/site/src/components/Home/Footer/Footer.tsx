import { Box, Flex, Grid, Image, Link, Text } from "@chakra-ui/react";

const footerLinkIcons: { src: string; to: string }[] = [
  {
    src: "linkedin_red.svg",
    to: "https://linkedin.com/company/reflections-projections-uiuc"
  },
  { src: "instagram_red.svg", to: "https://instagram.com/uiuc_rp/" },
  { src: "tiktok_red.svg", to: "https://www.tiktok.com/@uiuc_rp" },
  { src: "facebook_red.svg", to: "https://facebook.com/acmrp/" },
  { src: "github_red.svg", to: "https://github.com/ReflectionsProjections" },
  { src: "email_red.svg", to: "mailto:contact@reflectionsprojections.org" }
]; // there should be <= 6 of these

export const Footer = () => {
  return (
    <Flex
      w="100%"
      flexDir="column"
      bgGradient="linear(to-b, #222020ff 0%, #100E0E 100%)"
      alignItems="center"
    >
      <Flex
        w="100%"
        maxW="1500px"
        alignItems="center"
        justifyContent={{ base: "center", md: "space-between" }}
        flexDir="row"
        px={6}
        py={10}
      >
        <Image
          display={{
            base: "none",
            md: "block"
          }}
          src="main/footer/footer_car.svg"
          zIndex={2}
          maxH={{ md: "150px", lg: "200px" }}
        />
        <Flex
          flexDirection="column"
          h="inherit"
          pb={{ base: 0, md: "20px" }}
          pr={{ base: 0, md: 10 }}
          alignItems="flex-end"
          justifyContent="center"
          zIndex={2}
        >
          <Grid
            maxW="600px"
            templateColumns="1fr 1fr 1fr"
            gridTemplateRows="1fr 1fr"
            columnGap={6}
            rowGap={4}
          >
            {footerLinkIcons.map((item) => (
              <Link
                key={item.src}
                href={item.to}
                w="50px"
                h="50px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                target="_blank"
              >
                <Image
                  src={`/main/footer/socials/${item.src}`}
                  w="100%"
                  h="100%"
                  transition="transform 0.2s ease, filter 0.2s ease"
                  _hover={{
                    transform: "scale(1.1)",
                    filter: "brightness(0.7)"
                  }}
                />
              </Link>
            ))}
          </Grid>
          <Text
            color="white"
            mt={{ base: 6, lg: 12 }}
            w="100%"
            fontFamily="Magistral"
            fontSize={{ base: "sm", md: "lg" }}
            textAlign={{ base: "center", md: "right" }}
          >
            © 2025 by Reflections | Projections
          </Text>
        </Flex>
      </Flex>

      {/* Bottom bar */}
      <Box
        w="100%"
        h="54px"
        bgGradient={`
          repeating-conic-gradient(
            #000 0% 25%, 
            #2d2d2d 0% 50%
          )
        `}
        bgSize="70px 40px" // size of each checker square
      />
    </Flex>
  );
};

export default Footer;
