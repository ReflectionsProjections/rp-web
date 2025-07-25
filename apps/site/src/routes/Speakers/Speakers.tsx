import { Box, HStack, Text, VStack } from "@chakra-ui/react";

type Speaker = {
  name: string;
  company: string;
};

type SpeakerRow = {
  speakers: Speaker[];
  color: string;
};

function SpeakerCard({ row }: { row: SpeakerRow }) {
  return (
    <VStack w="80%" mb={10}>
      <HStack gap={0} w="100%" maxW="1000px" ml={24}>
        {row.speakers.map((speaker) => (
          <Text
            flex={1}
            color={row.color}
            fontFamily="Magistral"
            letterSpacing={"1px"}
          >
            {speaker.name}
          </Text>
        ))}
      </HStack>
      <HStack gap={0} w="100%" maxW="1000px">
        <Box
          flex={1}
          h="150px"
          bg={row.color}
          transform="skewX(-30deg)"
          mx="auto"
          borderLeftRadius={"md"}
          boxShadow={"md"}
        />
        <Box
          flex={1}
          h="150px"
          bg={row.color}
          opacity={0.5}
          transform="skewX(-30deg)"
          mx="auto"
        />
        <Box
          flex={1}
          h="150px"
          bg={row.color}
          opacity={0.5}
          transform="skewX(-30deg)"
          mx="auto"
          borderRightRadius={"md"}
        />
      </HStack>
      <HStack gap={0} w="100%" maxW="1000px" ml={-24}>
        {row.speakers.map((speaker) => (
          <Text
            flex={1}
            color={row.color}
            fontFamily="Magistral"
            fontWeight={"bold"}
            letterSpacing={"1px"}
          >
            {speaker.company}
          </Text>
        ))}
      </HStack>
    </VStack>
  );
}

// Now we have six rows (as in your design), each with up to three speakers
// Colors go in the order: blue, red, orange, teal, pink, green
const SPEAKER_DATA: SpeakerRow[] = [
  {
    speakers: [
      { name: "Alice Johnson", company: "TechNova" },
      { name: "Bob Smith", company: "InnoPeople" },
      { name: "Carol Matthews", company: "FutureWorks" }
    ],
    color: "#007bff" // blue
  },
  {
    speakers: [
      { name: "Frank Ramirez", company: "GreenLogic" },
      { name: "Grace Patel", company: "CyberForge" },
      { name: "Henry O’Connor", company: "NextGen AI" }
    ],
    color: "#e74c3c" // red
  },
  {
    speakers: [
      { name: "David Lee", company: "AlphaWave" },
      { name: "Evelyn Chen", company: "DataSense" },
      { name: "Isaac Wright", company: "PointLogic" }
    ],
    color: "#f39c12" // orange
  },
  {
    speakers: [
      { name: "Julia Martinez", company: "FlowWorks" },
      { name: "Kevin Brown", company: "AeroSoft" },
      { name: "Laura Wilson", company: "BrightEdge" }
    ],
    color: "#1abc9c" // teal
  },
  {
    speakers: [
      { name: "Michael Chen", company: "Zenith Labs" },
      { name: "Natalie Gomez", company: "OmniTech" },
      { name: "Olivia Davis", company: "Skyline AI" }
    ],
    color: "#e84393" // pink
  },
  {
    speakers: [
      { name: "Patrick Nguyen", company: "VertexGrid" },
      { name: "Quincy Zhang", company: "NovaWorks" },
      { name: "Rachel Kim", company: "CoreSynch" }
    ],
    color: "#2ecc71" // green
  }
];
export default function Speakers() {
  return (
    <VStack gap={0} bgColor="#1F1F1F" py={12} bgImage="">
      <Text fontSize={"5xl"} fontFamily="ProRacing" color="white">
        Speakers
      </Text>
      <Text fontSize={"7xl"} fontFamily="ProRacing" color="white">
        2025
      </Text>
      <br />
      {SPEAKER_DATA.map((row) => (
        <SpeakerCard row={row} />
      ))}
    </VStack>
  );
}
