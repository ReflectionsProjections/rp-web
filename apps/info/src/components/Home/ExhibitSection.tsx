import { Box, Image, Link, Text, useBreakpointValue } from "@chakra-ui/react";

export const ExhibitSection = () => {
  //const titleFontSize = useBreakpointValue({ base: "2xl", md: "3xl", lg: "4xl" });
  const subtitleFontSize = useBreakpointValue({ base: "xl", md: "2xl" });

  return (
    <section data-label="exhibit section">
      <Image
        src="exhibit_background.png"
        w="100vw"
        h="900px"
        fit="fill"
        pos="absolute"
        mt="-200px"
        zIndex={-10}
        style={{
          maskImage:
            "linear-gradient(transparent 10%, black 50%, black 70%, transparent 100%)"
        }}
      />
      <Box
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ base: "center", md: "center" }}
        maxWidth="6xl"
        mx="auto"
        minH="600px"
        mt={{ base: 10, md: -4 }}
        mb={{ base: 10, md: 10 }}
        px={{ base: 5, md: 10 }}
        gap={{ base: 8, md: 0 }}
      >
        <Box textAlign={{ base: "center", md: "left" }}>
          <Text
            //fontSize={titleFontSize}
            textStyle={"textBlock"}
          >
            {/* EXHIBIT&ensp;A */}
            RP 2025
          </Text>
          <Text
            fontSize={subtitleFontSize}
            fontFamily={"body"}
            fontWeight="500"
          >
            Check out our website!
          </Text>
        </Box>

        <Box width={{ base: "100%", md: "auto" }}>
          <Box
            bgColor="black"
            px={{ base: 5 }}
            py={{ base: 5 }}
            borderRadius={20}
            mx="auto"
            maxWidth={{ base: "400px", md: "400px" }}
          >
            {/* <Text
              fontFamily="mono"
              fontSize={subtitleFontSize}
              textAlign="center"
            >
              RP 2025
            </Text> */}
            {/* <Image src="/site.png" fit="cover" /> */}
            <Link href="https://www.reflectionsprojections.org/" isExternal>
              <Box
                as="video"
                src="/site.mov"
                autoPlay
                loop
                muted
                playsInline
                objectFit="cover"
                width="100%"
                height="100%"
              />
            </Link>
          </Box>

          <Box
            bgColor="black"
            px={{ base: 20, md: 40 }}
            h={{ base: 5, md: 8 }}
            borderRadius={5}
            mt={5}
            mx="auto"
            maxWidth={{ base: "400px", md: "none" }}
          />
          {/* on click:
            - set scroll
            - expand section height to 100vh ?
            - rapidly drop perspective
            - zoom into video -- we probably want a state boolean for this
          */}

          <Box
            px={{ base: 5, md: 10 }}
            display="flex"
            justifyContent="space-between"
            maxWidth={{ base: "400px", md: "none" }}
            mx="auto"
          >
            <Box bgColor="black" w={{ base: 5, md: 8 }} h={6} />
            <Box bgColor="black" w={{ base: 5, md: 8 }} h={6} />
          </Box>
        </Box>
      </Box>
    </section>
  );
};
