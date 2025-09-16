import { Box, Image, Link, SimpleGrid } from "@chakra-ui/react";
import StoolsSponsors from "./StoolSponsors";

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
  glowColor: string;
};

const StoolsSceneWrapper: React.FC = () => {
  // const getSubtleGlowFilter = (color: string) => {
  //   return `drop-shadow(0 0 8px ${color}AA) drop-shadow(0 0 25px ${color}88) drop-shadow(0 0 35px ${color}66)`;
  // };

  const STOOL_SPONSOR_IMAGES: Sponsor[] = [
    {
      filename: "janestreet.png",
      url: "https://www.janestreet.com/",
      heights: { base: "60px", md: "95px", lg: "95px" },
      glowColor: "#ffffff"
    }, // row 1
    {
      filename: "openai.svg",
      url: "https://www.openai.com/",
      heights: { base: "40px", md: "50px", lg: "65px" },
      glowColor: "#ffffff"
    }, // row 4
    {
      filename: "cloudflare.png",
      url: "https://www.cloudflare.com/",
      heights: { base: "70px", md: "100px", lg: "110px" },
      glowColor: "#F78D2A"
    }, // row 2
    {
      filename: "everfox.svg",
      url: "https://www.everfox.com/",
      heights: { base: "60px", md: "80px", lg: "90px" },
      glowColor: "#0066cc"
    }, // row 2
    {
      filename: "statefarm.png",
      url: "https://www.statefarm.com/",
      heights: { base: "30px", md: "40px", lg: "45px" },
      glowColor: "#EC0C21"
    }, // row 3
    {
      filename: "capitalone.png",
      url: "https://www.capitalone.com/",
      heights: { base: "80px", md: "120px", lg: "95px" },
      glowColor: "#3B8927"
    }, // row 3, last
    {
      filename: "magna.svg",
      url: "https://www.magna.com/",
      heights: { base: "40px", md: "50px", lg: "65px" },
      glowColor: "#E4D00A"
    } // row 4, last
  ];

  return (
    <Box as="section" w="100%" bgColor="#191919ff" pos="relative" mx="auto">
      {/* overlay grid */}
      <Box
        position="relative"
        inset={0}
        py={{ base: 24, md: 16, lg: 32 }}
        zIndex={3}
        maxW="1200px"
        mx="auto"
      >
        {/* Row 1 - Jane Street */}
        <SimpleGrid
          columns={1}
          justifyItems="center"
          alignItems="center"
          mb={{ base: 12, lg: 16 }}
        >
          <Link
            href={STOOL_SPONSOR_IMAGES[0].url}
            isExternal
            opacity={0.9}
            _hover={{
              transform: "scale(1.05)",
              opacity: 1,
              transition: "all 0.2s ease-in-out"
            }}
          >
            <Image
              src={`/main/sponsors/${STOOL_SPONSOR_IMAGES[0].filename}`}
              alt="Jane Street"
              h={STOOL_SPONSOR_IMAGES[0].heights}
              maxW="500px"
              objectFit="contain"
            />
          </Link>
        </SimpleGrid>

        {/* Row 2 - Cloudflare + Everfox */}
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 10, lg: 8 }}
          justifyItems="center"
          alignItems="center"
          mb={{ base: 12, lg: 12 }}
        >
          {STOOL_SPONSOR_IMAGES.slice(1, 3).map((img, idx) => (
            <Link
              key={idx}
              href={img.url}
              isExternal
              opacity={0.9}
              _hover={{
                transform: "scale(1.05)",
                opacity: 1,
                transition: "all 0.2s ease-in-out"
              }}
            >
              <Image
                src={`/main/sponsors/${img.filename}`}
                alt={img.filename.replace(/\.(png|svg)$/, "")}
                h={img.heights}
                maxW="500px"
                objectFit="contain"
                // filter={getSubtleGlowFilter(img.glowColor)}
              />
            </Link>
          ))}
        </SimpleGrid>

        {/* Row 3 - State Farm + Capital One */}
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 12, lg: 8 }}
          justifyItems="center"
          alignItems="center"
        >
          {STOOL_SPONSOR_IMAGES.slice(3).map((img, idx) => (
            <Link
              key={idx}
              href={img.url}
              isExternal
              opacity={0.9}
              _hover={{
                transform: "scale(1.05)",
                opacity: 1,
                transition: "all 0.2s ease-in-out"
              }}
            >
              <Image
                src={`/main/sponsors/${img.filename}`}
                alt={img.filename.replace(/\.(png|svg)$/, "")}
                h={img.heights}
                maxW="500px"
                objectFit="contain"
              />
            </Link>
          ))}
        </SimpleGrid>
      </Box>

      {/* scene underneath the overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        zIndex={2}
        overflow={"hidden"}
        w="100%"
        h="100%"
      >
        <StoolsSponsors />
      </Box>
    </Box>
  );
};

export default StoolsSceneWrapper;
