import { SpeakerRow } from "@/types/speaker-types";
import { CloseIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  HStack,
  IconButton,
  Text,
  VStack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function SpeakerCard({ row }: { row: SpeakerRow }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleHover = (index: number) => {
    if (hoveredIndex) {
      return;
    }
    setHoveredIndex(index);
  };

  const handleLeave = () => {
    if (hoveredIndex !== null) {
      setHoveredIndex(null);
    }
  };

  useEffect(() => {
    // Reset hovered index when the number of speakers changes
    setHoveredIndex(null);
  }, [row.speakers.length]);

  const speakerSelected = hoveredIndex !== null;

  /** For the split-second between changing the number of speakers in a row on a screen width change */
  const displayedHoveredIndex =
    hoveredIndex !== null
      ? Math.min(hoveredIndex, row.speakers.length - 1)
      : null;

  return (
    <VStack
      w={{
        base: "80%",
        lg: "80%"
      }}
      mb={10}
      position="relative"
    >
      <HStack
        gap={0}
        w="100%"
        maxW="1000px"
        ml={{
          base: 7,
          md: 28
        }}
        transition={"all 0.3s"}
        mb={{
          base: 1,
          md: 3
        }}
      >
        {row.speakers.map((speaker, index) => (
          <Text
            display={"flex"}
            flex={
              displayedHoveredIndex !== null
                ? displayedHoveredIndex === index
                  ? 1
                  : 0
                : 1
            }
            color={row.color}
            fontFamily="Magistral"
            fontSize={{ base: "lg", md: "2xl" }}
            letterSpacing={"1px"}
            fontWeight={"bold"}
            transition={"all 0.3s"}
            w={
              displayedHoveredIndex !== null
                ? displayedHoveredIndex === index
                  ? "100%"
                  : "0"
                : "100%"
            }
            opacity={
              displayedHoveredIndex !== null
                ? displayedHoveredIndex === index
                  ? 1
                  : 0
                : 1
            }
            isTruncated
            minWidth="0"
            overflow={"hidden"}
          >
            {speaker.name}
          </Text>
        ))}
      </HStack>
      <HStack
        position="relative"
        h={{
          base: speakerSelected ? "300px" : "150px",
          sm: speakerSelected ? "200px" : "150px",
          md: "150px"
        }}
        w="100%"
        maxW="1000px"
        gap={displayedHoveredIndex !== null ? 0 : 5}
        transition={"all 0.3s"}
        ml={{
          base: 0,
          md: 10
        }}
      >
        {row.speakers.map((_, index) => (
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flex={1}
            h={{
              base: speakerSelected ? "300px" : "150px",
              sm: speakerSelected ? "200px" : "150px",
              md: "150px"
            }}
            mx="-1px"
            bg={row.color}
            transform={{
              base: "skewX(-10deg)",
              md: "skewX(-20deg)"
            }}
            borderLeftRadius={
              index === 0 || displayedHoveredIndex === null ? "md" : "none"
            }
            borderRightRadius={
              index === row.speakers.length - 1 ||
              displayedHoveredIndex === null
                ? "md"
                : "none"
            }
            opacity={displayedHoveredIndex !== null ? 1 : 0.5}
            zIndex={displayedHoveredIndex === index ? 1 : 0}
            transition={"all 0.3s"}
            onClick={!speakerSelected ? () => handleHover(index) : undefined}
            cursor={speakerSelected ? "default" : "pointer"}
          >
            <Avatar
              boxSize={{
                base: "100px",
                md: "130px"
              }}
              ml={-3}
              transform={{
                base: "skewX(10deg)",
                md: "skewX(20deg)"
              }}
              opacity={displayedHoveredIndex !== null ? 0 : 1}
              transition={"all 0.1s"}
            />
          </Box>
        ))}
        <Box
          display={"flex"}
          alignItems={"center"}
          position="absolute"
          top={0}
          left={0}
          right={0}
          px={10}
          h={{
            base: speakerSelected ? "300px" : "150px",
            sm: speakerSelected ? "200px" : "150px",
            md: "150px"
          }}
          textAlign="left"
          color="white"
          fontFamily="Magistral"
          fontSize="xl"
          opacity={displayedHoveredIndex !== null ? 1 : 0.5}
          transition="all 0.3s"
          zIndex={3}
          pointerEvents={displayedHoveredIndex !== null ? undefined : "none"}
          fontWeight={"semibold"}
        >
          {displayedHoveredIndex !== null
            ? row.speakers[displayedHoveredIndex].bio
            : null}
        </Box>
        <Box
          position="absolute"
          top={2}
          right={1}
          zIndex={99}
          opacity={displayedHoveredIndex !== null ? "1" : "0"}
          display={displayedHoveredIndex !== null ? "flex" : "none"}
        >
          {/* Exit button, x icon */}
          <IconButton
            size="sm"
            aria-label="Exit"
            icon={<CloseIcon />}
            onClick={handleLeave}
          />
        </Box>
      </HStack>
      <HStack
        gap={{
          base: 2,
          md: 0
        }}
        w="100%"
        maxW="1000px"
        transition={"all 0.3s"}
        mt={{
          base: 0,
          md: 2
        }}
        ml={{
          base: -4,
          md: 0
        }}
      >
        {row.speakers.map((speaker, index) => (
          <Text
            display={"block"}
            flex={
              displayedHoveredIndex !== null
                ? displayedHoveredIndex === index
                  ? 1
                  : 0
                : 1
            }
            color={row.color}
            fontFamily="Magistral"
            letterSpacing={"1px"}
            fontSize={{
              base: "md",
              md: "xl"
            }}
            isTruncated
            minWidth="0"
            transition={"all 0.3s"}
            w={
              displayedHoveredIndex !== null
                ? displayedHoveredIndex === index
                  ? "100%"
                  : "0"
                : "100%"
            }
            // whiteSpace={"nowrap"}
            // opacity={displayedHoveredIndex !== null ? (displayedHoveredIndex === index ? 1 : 0) : 1}
            overflow={"hidden"}
          >
            {speaker.title}
          </Text>
        ))}
      </HStack>
    </VStack>
  );
}
