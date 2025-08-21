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
      filename: "caterpillar.png",
      url: "https://www.caterpillar.com",
      heights: { base: "50px", md: "70px", lg: "80px" }
    },
    {
      filename: "hrt.png",
      url: "https://www.hudsonrivertrading.com/",
      heights: { base: "90px", md: "125px", lg: "150px" }
    },
    {
      filename: "qualcomm.png",
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
      bgColor="#191919ff"
      pos="relative"
      mx="auto"
    >
      {/* overlay grid */}
      <Box
        position="absolute"
        top={0}
        left={0}
        h="100%"
        w="100%"
        pt={32}
        zIndex={3}
      >
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={8}
          columnGap={0}
          rowGap={20}
          justifyItems="center"
          alignItems="start"
          pt={20}
          px={20}
          maxW="1500px"
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

      <Box bgColor="#100E0E" zIndex={2} maxH={{ lg: "1200px" }}>
        <AnimatedHeader>Sponsors</AnimatedHeader>
        <PitStopScene />
      </Box>
    </Box>
  );
};

export default PitStopSceneWrapper;
