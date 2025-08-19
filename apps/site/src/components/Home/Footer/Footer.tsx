import { Box, Flex, Grid, Image, Link, Text } from "@chakra-ui/react";

const footerLinkIcons: { src: string; to: string }[] = [
    {
        src: "linkedin_red.svg",
        to: "https://linkedin.com/company/reflections-projections-uiuc"
    },
    { src: "instagram_red.svg", to: "https://instagram.com/uiuc_rp/" },
    { src: "tiktok_red.svg", to: "https://reflectionsprojections.org" },
    { src: "facebook_red.svg", to: "https:/https://facebook.com/acmrp/" },
    { src: "github_red.svg", to: "https://github.com/ReflectionsProjections" },
    { src: "email_red.svg", to: "https://reflectionsprojections.org" }
]; // there should be <= 6 of these

export const Footer = () => {
    return (
        <>
            <Flex
                w="100%"
                h="450px"
                bg="linear-gradient(90deg,rgba(100, 100, 100, 1) 0%, rgba(35, 35, 35, 1) 100%)"
                alignItems="start"
                flexDirection="row"
            >
                <Flex
                    flexDirection="column"
                    h="80%"
                    pos="absolute"
                    zIndex={2}
                    right={{ base: "0", sm: "8%" }}
                    w={{ base: "100%", sm: "auto" }}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid
                        templateColumns="1fr 1fr 1fr"
                        gridTemplateRows="1fr 1fr"
                        columnGap={{ base: 8, lg: 16 }}
                        rowGap={{ base: 6, lg: 10 }}
                        justifyContent="space-around"
                    >
                        {footerLinkIcons.map((item) => (
                            <Link
                                href={item.to}
                                w="60px"
                                h="60px"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Image
                                    w="100%"
                                    h="100%"
                                    src={`/main/footer/socials/${item.src}`}
                                />
                            </Link>
                        ))}
                    </Grid>
                    <Text
                        color="white"
                        mt={{ base: 6, lg: 12 }}
                        w="100%"
                        textAlign={{ base: "center", sm: "right" }}
                    >
                        © 2025 by Reflections | Projections
                    </Text>
                </Flex>
                {/* wide view */}
                <Box
                    display={{ base: "none", sm: "block" }}
                    w="100%"
                    h="100px"
                    pos="absolute"
                    zIndex={3}
                    bg="black"
                    alignSelf="flex-end"
                >
                    <Image
                        src="main/footer/footer_car.svg"
                        pos="absolute"
                        zIndex={2}
                        w="70%"
                        minW="450px"
                        bottom="50px"
                    />
                    {/* ask design for text in svg and/or final svg of car */}
                    <Box pos="absolute" zIndex={1} w="100%" height="54px">
                        <Image
                            src="main/footer/footer_bar_left.svg"
                            pos="absolute"
                            zIndex={3}
                            w="55%"
                            h="100%"
                            left="0"
                            fit="none"
                        />
                        <Image
                            src="main/footer/footer_bar_right.svg"
                            pos="absolute"
                            zIndex={2}
                            w="55%"
                            h="100%"
                            right="0"
                            fit="fill"
                        />
                    </Box>
                </Box>
                {/* mobile view */}
                <Image
                    display={{ base: "block", sm: "none" }}
                    alignSelf="flex-end"
                    src="main/footer/footer_bar_left.svg"
                    pos="absolute"
                    zIndex={1}
                    w="100%"
                    h="25vh"
                    left="0"
                    fit="cover"
                    sx={{
                        maskImage:
                            "linear-gradient(transparent 0%, rgba(0, 0, 0, 0.1) 15%, black 100%)"
                    }}
                />
            </Flex>
        </>
    );
};

export default Footer;