import SpeakerCardRow from "@/components/Speakers/SpeakerCardRow";
import { SpeakerRow } from "@/types/speaker-types";
import { Text, useMediaQuery, VStack } from "@chakra-ui/react";
import { api, Speaker } from "@rp/shared";
import { useEffect, useMemo, useState } from "react";

const COLORS = [
  "#007bff", // blue
  "#e74c3c", // red
  "#f39c12", // orange
  "#1abc9c", // teal
  "#e84393", // pink
  "#2ecc71" // green
];

// Now we have six rows (as in your design), each with up to three speakers
// Colors go in the order: blue, red, orange, teal, pink, green
export default function Speakers() {
  const [isMediumScreen] = useMediaQuery("(min-width: 960px)");
  const [isSmallScreen] = useMediaQuery("(min-width: 768px)");

  const [speakers, setSpeakers] = useState<Speaker[]>([]);

  const handleLoadSpeakers = async () => {
    try {
      const response = await api.get("/speakers");
      setSpeakers(response.data);
    } catch {
      console.error("Failed to load speakers");
    }
  };

  useEffect(() => {
    void handleLoadSpeakers();
  }, []);

  const speakerRows = useMemo<SpeakerRow[]>(() => {
    const maxPerRow = isMediumScreen ? 3 : isSmallScreen ? 2 : 2;

    return speakers.reduce<SpeakerRow[]>((rows, speaker: Speaker, idx) => {
      const rowIndex = Math.floor(idx / maxPerRow);
      if (!rows[rowIndex]) {
        rows[rowIndex] = {
          speakers: [],
          color: COLORS[rowIndex % COLORS.length]
        };
      }
      rows[rowIndex].speakers.push(speaker);
      return rows;
    }, []);
  }, [isMediumScreen, isSmallScreen, speakers]);

  return (
    <VStack gap={0} bgColor="#1F1F1F" py={12} bgImage="/backdrop.svg">
      <Text fontSize={"6xl"} fontFamily="ProRacing" color="white">
        Speakers
      </Text>
      <Text
        fontSize={"8xl"}
        fontFamily="ProRacing"
        color="white"
        my={0}
        mt={-10}
      >
        2025
      </Text>
      <br />
      {speakerRows.map((row, index) => (
        <SpeakerCardRow key={`speaker-${index}`} row={row} />
      ))}
    </VStack>
  );
}
