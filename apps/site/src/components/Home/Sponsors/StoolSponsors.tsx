import React, { useState } from "react";
import { Box, Image, Link, SimpleGrid } from "@chakra-ui/react";

interface Character {
  id: number;
  src: string;
  position: number;
}

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
  glowColor?: string;
};

const StoolsSponsors: React.FC = () => {
  const [hoveredPerson, setHoveredPerson] = useState<number | null>(null);

  const characters: Character[] = [
    {
      id: 1,
      src: "/sponsors/stools/left.png",
      position: 0
    },
    {
      id: 3,
      src: "/sponsors/stools/middle.png",
      position: 2
    },
    {
      id: 5,
      src: "/sponsors/stools/right.png",
      position: 4
    }
  ];

  const STOOL_SPONSOR_IMAGES: Sponsor[] = [
    {
      filename: "janestreet.png",
      url: "https://www.janestreet.com/",
      heights: { base: "60px", md: "95px", lg: "95px" },
      glowColor: "#00ccff" // Blue glow for Jane Street
    }, // row 1
    {
      filename: "cloudflare.png",
      url: "https://www.cloudflare.com/",
      heights: { base: "70px", md: "100px", lg: "110px" },
      glowColor: "#ff6600" // Orange glow for Cloudflare
    }, // row 2
    {
      filename: "everfox.svg",
      url: "https://www.everfox.com/",
      heights: { base: "60px", md: "80px", lg: "90px" },
      glowColor: "#00ff88" // Green glow for Everfox
    }, // row 2
    {
      filename: "statefarm.png",
      url: "https://www.statefarm.com/",
      heights: { base: "30px", md: "40px", lg: "45px" },
      glowColor: "#ffffff" // White glow for State Farm (red logo)
    }, // row 3
    {
      filename: "capitalone.png",
      url: "https://www.capitalone.com/",
      heights: { base: "80px", md: "120px", lg: "95px" },
      glowColor: "#0088ff" // Blue glow for Capital One
    } // row 3, last
  ];

  const getGlowFilter = (glowColor: string) => {
    const color1 = glowColor;
    const color2 = glowColor + "88"; // Add transparency
    const color3 = glowColor + "44"; // More transparency

    return `drop-shadow(0 0 15px ${color1}) drop-shadow(0 0 25px ${color2}) drop-shadow(0 0 35px ${color3})`;
  };

  return (
    <Box as="section" w="100%" bgColor="#191919ff" pos="relative" mx="auto">
      {/* Sponsor overlay grid */}
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
          mb={{ base: 10, lg: 16 }}
        >
          <Link
            href={STOOL_SPONSOR_IMAGES[0].url}
            isExternal
            opacity={0.9}
            _hover={{
              transform: "scale(1.05)",
              opacity: 1,
              transition: "all 0.2s ease-in-out",
              filter: getGlowFilter(STOOL_SPONSOR_IMAGES[0].glowColor!)
            }}
            transition="all 0.2s ease-in-out"
          >
            <Image
              src={`/sponsors/stools/${STOOL_SPONSOR_IMAGES[0].filename}`}
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
          spacing={{ base: 16, lg: 8 }}
          justifyItems="center"
          alignItems="center"
          mb={{ base: 12, lg: 16 }}
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
                transition: "all 0.2s ease-in-out",
                filter: getGlowFilter(img.glowColor!)
              }}
              transition="all 0.2s ease-in-out"
            >
              <Image
                src={`/sponsors/stools/${img.filename}`}
                alt={img.filename.replace(".png", "").replace(".svg", "")}
                h={img.heights}
                maxW="500px"
                objectFit="contain"
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
                transition: "all 0.2s ease-in-out",
                filter: getGlowFilter(img.glowColor!)
              }}
              transition="all 0.2s ease-in-out"
            >
              <Image
                src={`/sponsors/stools/${img.filename}`}
                alt={img.filename.replace(".png", "").replace(".svg", "")}
                h={img.heights}
                maxW="500px"
                objectFit="contain"
              />
            </Link>
          ))}
        </SimpleGrid>
      </Box>

      {/* Background scene with characters */}
      <Box
        position="absolute"
        top={0}
        left={0}
        zIndex={2}
        overflow={"hidden"}
        w="100%"
        h="100%"
      >
        <Box
          position="relative"
          width="100%"
          height={{ base: "70vh", md: "80vh", lg: "90vh" }}
          overflow="hidden"
          display="flex"
          alignItems="flex-end"
          justifyContent="center"
          padding={0}
        >
          {/* Blurred background image with opacity */}
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            backgroundImage="url('/sponsors/stools/stool_bg.svg')"
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            filter="blur(6px)"
            opacity={0.15}
            zIndex={1}
          />

          {/* Characters container */}
          <Box
            display="flex"
            alignItems="flex-end"
            justifyContent="center"
            position="absolute"
            bottom="0"
            left="50%"
            transform="translateX(-50%)"
            padding={{ base: "0 0.25rem", md: "0 1rem" }}
            height="fit-content"
            zIndex={10}
            gap={{ base: "0.5rem", md: "1rem" }}
          >
            {characters.map((character) => (
              <Image
                key={character.id}
                src={character.src}
                alt={`Character ${character.id}`}
                height={{
                  base: "30vh",
                  sm: "35vh",
                  md: "40vh",
                  lg: "50vh"
                }}
                minH={{ base: "300px", md: "400px", lg: "500px" }}
                cursor="pointer"
                transition="all 0.3s ease-out"
                transform={
                  hoveredPerson === character.id
                    ? "translateY(-10px) scale(1.02)"
                    : "translateY(30px) scale(1)"
                }
                onMouseEnter={() => setHoveredPerson(character.id)}
                onMouseLeave={() => setHoveredPerson(null)}
                _active={{
                  transform: "translateY(-10px) scale(1.02)"
                }}
                zIndex={hoveredPerson === character.id ? 15 : 11}
                opacity={hoveredPerson === character.id ? 0.4 : 0.25}
                filter={
                  hoveredPerson === character.id
                    ? "brightness(1.2) contrast(1.1)"
                    : "brightness(0.8) contrast(0.9)"
                }
                flexShrink={0}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StoolsSponsors;
