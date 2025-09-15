import { Box, Image, Text } from "@chakra-ui/react";
import Marquee from "react-fast-marquee";

const SPONSORS: {
  name: string;
  logo: string;
  height?: string;
}[] = [
  { name: "Aechelon", logo: "/sponsors/aechelon.png", height: "60px" },
  { name: "Capital One", logo: "/sponsors/capitalone.png", height: "40px" },
  { name: "Caterpillar", logo: "/sponsors/caterpillar.svg", height: "25px" },
  { name: "Cloudflare", logo: "/sponsors/cloudflare.png", height: "40px" },
  { name: "Everfox", logo: "/sponsors/everfox.svg", height: "45px" },
  { name: "Hudson River Trading", logo: "/sponsors/hrt.svg", height: "40px" },
  { name: "Jane Street", logo: "/sponsors/janestreet.png", height: "40px" },
  { name: "Qualcomm", logo: "/sponsors/qualcomm.png", height: "30px" },
  { name: "State Farm", logo: "/sponsors/statefarm.png", height: "25px" }
];

export const Sponsors = () => (
  <Box position="relative" display={"flex"} flexDir={"column"} gap={3}>
    <Text
      fontSize="3xl"
      fontWeight="bold"
      textAlign="center"
      fontFamily="ProRacingSlant"
    >
      Sponsors
    </Text>
    <Box
      borderRadius="2xl"
      boxShadow="0 4px 32px rgba(0,0,0,0.10)"
      bgColor={"rgba(0,0,0,0.2)"}
      px={1}
      py={5}
      sx={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)"
      }}
    >
      <Marquee
        gradient={false}
        speed={60}
        style={{
          background: "transparent",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)"
        }}
      >
        {SPONSORS.map((s, i) => (
          <Box key={i} mx={6} display="flex" alignItems="center">
            <Image
              src={s.logo}
              alt={s.name}
              h={s.height ?? "30px"}
              objectFit="contain"
              mr={2}
              filter="brightness(0.92)"
              style={{
                filter:
                  "brightness(0.92) drop-shadow(0 0 6px rgba(255,255,255,0.08))"
              }}
            />
          </Box>
        ))}
      </Marquee>
    </Box>
  </Box>
);
