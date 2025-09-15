import SpeakerCardRow from "@/components/Speakers/SpeakerCardRow";
import { SpeakerRow } from "@/types/speaker-types";
import { Text, useMediaQuery, VStack } from "@chakra-ui/react";
import { api, Speaker } from "@rp/shared";
import { useCallback, useEffect, useMemo, useState } from "react";

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
  const [isMicroScreen] = useMediaQuery("(min-width: 360px)");
  const [speakers, setSpeakers] = useState<Speaker[]>([]);

  // Define the desired speaker order by first name
  const speakerOrder = useMemo(
    () => [
      "Sue",
      "Abdu",
      "Eva",
      "Josh",
      "Michael",
      "Mehdi",
      "Ben",
      "Claire",
      "Eliot",
      "Lionel",
      "Shubha",
      "Karlyn",
      "Juan",
      "Joana"
    ],
    []
  );

  const handleLoadSpeakers = useCallback(async () => {
    try {
      const response = await api.get("/speakers");
      const speakersData = response.data.map((speakerData) => {
        return {
          ...speakerData
        };
      });

      // Sort speakers according to the specified order by first name
      const sortedSpeakers = speakerOrder
        .map((firstName) =>
          speakersData.find(
            (speaker) => speaker.name.split(" ")[0] === firstName
          )
        )
        .filter(Boolean) as Speaker[];

      // Add any speakers not in the order list at the end
      const remainingSpeakers = speakersData.filter(
        (speaker) => !speakerOrder.includes(speaker.name.split(" ")[0])
      );

      setSpeakers([...sortedSpeakers, ...remainingSpeakers]);
    } catch {
      console.error("Failed to load speakers");
    }
  }, [speakerOrder]);

  useEffect(() => {
    void handleLoadSpeakers();
  }, []);

  const speakerRows = useMemo<SpeakerRow[]>(() => {
    const maxPerRow = isMediumScreen
      ? 3
      : isSmallScreen
        ? 2
        : isMicroScreen
          ? 2
          : 1;

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
  }, [isMediumScreen, isSmallScreen, isMicroScreen, speakers]);

  return (
    <VStack
      gap={0}
      bgColor="#1F1F1F"
      pt={36}
      pb={48}
      bgImage="/backdrop.svg"
      minH="100dvh"
      bgSize="cover"
    >
      <Text
        fontSize={{ base: "5xl", sm: "5xl", md: "6xl" }}
        fontFamily="ProRacing"
        color="white"
      >
        Speakers
      </Text>
      <Text
        fontSize={{ base: "7xl", sm: "6xl", md: "8xl" }}
        fontFamily="ProRacing"
        color="white"
        my={0}
        mt={{ base: -5, md: -10 }}
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
