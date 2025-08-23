import { Box, SimpleGrid, Image, Link } from "@chakra-ui/react";
import { AnimatedHeader } from "../shared/AnimatedHeader";
import PitStopScene from "./PitStop";

type Sponsor = {
  filename: string;
  url: string;
  heights?: {
    base?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
};

const PitStopSceneWrapper: React.FC = () => {
  const SPONSOR_IMAGES: Sponsor[] = [
    {
      filename: "caterpillar.svg",
      url: "https://www.caterpillar.com",
      heights: { base: "50px", md: "70px", lg: "80px" }
    },
    {
      filename: "hrt.svg",
      url: "https://www.hudsonrivertrading.com/",
      heights: { base: "90px", md: "125px", lg: "150px" }
    },
    {
      filename: "qualcomm.svg",
      url: "https://www.qualcomm.com/",
      heights: { base: "50px", md: "70px", lg: "200px" }
    },
    {
      filename: "aechelon.png",
      url: "https://www.aechelon.com",
      heights: { base: "150px", md: "150px", lg: "200px" }
    }
  ];

  return (
    <Box
      as="section"
      w="100%"
      maxW="1500px"
      // bgColor="#191919ff"
      pos="relative"
      mx="auto"
      minH="fit-content"
      overflow="hidden"
    >
      {/* overlay grid */}
      <Box pos="relative" w="100%" pt={20} zIndex={3} py={32}>
        <AnimatedHeader>Sponsors</AnimatedHeader>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={12}
          columnGap={0}
          rowGap={20}
          justifyItems="center"
          alignItems="start"
          pt={32}
          px={20}
          maxW="1500px"
          pb={20}
          bgColor={"rgba(0,0,0,0)"}
          zIndex={2}
        >
          {SPONSOR_IMAGES.map((img, idx) => (
            <Link
              key={idx}
              href={img.url}
              opacity={0.9}
              isExternal
              _hover={{
                transform: "scale(1.05)",
                opacity: 1,
                transition: "all 0.2s ease-in-out"
              }}
            >
              <Image
                src={`/main/sponsors/${img.filename}`}
                alt={img.filename.replace(".png", "")}
                h={img.heights}
                maxW="500px"
                objectFit="contain"
              />
            </Link>
          ))}
        </SimpleGrid>
      </Box>
      <Box pos="absolute" top={0} left={0} zIndex={1} h="100%" w="100%">
        <PitStopScene />
      </Box>
    </Box>
  );
};

export default PitStopSceneWrapper;
