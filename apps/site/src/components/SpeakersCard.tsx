import { SpeakerRow } from "@/types/speaker-types";
import { Avatar, Box, HStack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

export default function SpeakerCard({ row }: { row: SpeakerRow }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleHover = (index: number) => {
    setHoveredIndex(index);
  };

  const handleLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <VStack w="80%" mb={10} position="relative">
      <HStack
        gap={0}
        w="100%"
        maxW="1000px"
        ml={28}
        transition={"all 0.3s"}
        mb={3}
      >
        {row.speakers.map((speaker, index) => (
          <Text
            display={"flex"}
            flex={{
              base: 1,
              md: hoveredIndex !== null ? (hoveredIndex === index ? 1 : 0) : 1
            }}
            color={row.color}
            fontFamily="Magistral"
            fontSize="2xl"
            letterSpacing={"1px"}
            fontWeight={"bold"}
            transition={"all 0.3s"}
            whiteSpace={"nowrap"}
            w={
              hoveredIndex !== null
                ? hoveredIndex === index
                  ? "100%"
                  : "0"
                : "100%"
            }
            opacity={
              hoveredIndex !== null ? (hoveredIndex === index ? 1 : 0) : 1
            }
            overflow={
              hoveredIndex !== null
                ? hoveredIndex === index
                  ? "visible"
                  : "hidden"
                : "visible"
            }
          >
            {speaker.name}
          </Text>
        ))}
      </HStack>
      <HStack
        position="relative"
        h="150px"
        w="100%"
        maxW="1000px"
        gap={hoveredIndex !== null ? 0 : 5}
        transition={"all 0.3s"}
        ml={10}
      >
        {row.speakers.map((_, index) => (
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flex={1}
            h="150px"
            mx="-1px"
            bg={row.color}
            transform="skewX(-20deg)"
            borderLeftRadius={
              index === 0 || hoveredIndex === null ? "md" : "none"
            }
            borderRightRadius={
              index === row.speakers.length - 1 || hoveredIndex === null
                ? "md"
                : "none"
            }
            opacity={hoveredIndex !== null ? 1 : 0.5}
            zIndex={hoveredIndex === index ? 1 : 0}
            whiteSpace={"nowrap"}
            transition={"all 0.3s"}
            onMouseEnter={() => {
              handleHover(index);
            }}
            onMouseLeave={handleLeave}
          >
            <Avatar
              boxSize="130px"
              ml={-3}
              transform="skewX(20deg)"
              opacity={hoveredIndex !== null ? 0 : 1}
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
          h="150px"
          textAlign="left"
          color="white"
          fontFamily="Magistral"
          fontSize="xl"
          opacity={hoveredIndex !== null ? 1 : 0.5}
          transition="all 0.3s"
          zIndex={3}
          pointerEvents="none"
          fontWeight={"semibold"}
        >
          {hoveredIndex !== null
            ? row.speakers[hoveredIndex].description
            : null}
        </Box>
      </HStack>
      <HStack gap={0} w="100%" maxW="1000px" transition={"all 0.3s"} mt={2}>
        {row.speakers.map((speaker, index) => (
          <Text
            display={"block"}
            flex={hoveredIndex !== null ? (hoveredIndex === index ? 1 : 0) : 1}
            color={row.color}
            fontFamily="Magistral"
            letterSpacing={"1px"}
            fontSize="xl"
            transition={"all 0.3s"}
            w={
              hoveredIndex !== null
                ? hoveredIndex === index
                  ? "100%"
                  : "0"
                : "100%"
            }
            whiteSpace={"nowrap"}
            // opacity={hoveredIndex !== null ? (hoveredIndex === index ? 1 : 0) : 1}
            overflow={
              hoveredIndex !== null
                ? hoveredIndex === index
                  ? "visible"
                  : "hidden"
                : "visible"
            }
          >
            {speaker.company}
          </Text>
        ))}
      </HStack>
    </VStack>
  );
}
