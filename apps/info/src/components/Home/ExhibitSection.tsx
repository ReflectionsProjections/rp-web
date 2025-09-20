import { Box, Image, Text, useBreakpointValue } from "@chakra-ui/react";

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
        mt="-50px"
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
        minH="750px"
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
            EXHIBIT&ensp;A
          </Text>
          <Text
            fontSize={subtitleFontSize}
            fontFamily={"body"}
            fontWeight="500"
          >
            RP 2025 Site
          </Text>
        </Box>

        <Box width={{ base: "100%", md: "auto" }}>
          <Box
            bgColor="gray.300"
            px={{ base: 20, md: 40 }}
            py={{ base: 16, md: 20 }}
            borderRadius={20}
            mx="auto"
            maxWidth={{ base: "400px", md: "none" }}
          >
            <Text
              fontFamily="mono"
              fontSize={subtitleFontSize}
              textAlign="center"
            >
              RP 2025
            </Text>
          </Box>

          <Box
            bgColor="gray.300"
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
            <Box bgColor="gray.300" w={{ base: 5, md: 8 }} h={6} />
            <Box bgColor="gray.300" w={{ base: 5, md: 8 }} h={6} />
          </Box>
        </Box>
      </Box>
    </section>
  );
};
