import { useElementHeight } from "@/hooks/use-element-height-hook";
import { SpeakerRow } from "@/types/speaker-types";
import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  HStack,
  IconButton,
  Text,
  useMediaQuery,
  VStack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SpeakerImageCard from "./SpeakerImageCard";

export default function SpeakerCardRow({ row }: { row: SpeakerRow }) {
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { ref: bioTextRef, height: bioTextHeight } =
    useElementHeight<HTMLParagraphElement>();

  const bioTextDisplayedHeight = Math.max(bioTextHeight + 20, 150);

  const handleSetSelectedIndex = (index: number) => {
    if (selectedIndex) {
      return;
    }
    setSelectedIndex(index);
  };

  const handleLeave = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(null);
    }
  };

  useEffect(() => {
    // Reset selected index when the number of speakers changes
    setSelectedIndex(null);
  }, [row.speakers.length]);

  const speakerSelected = selectedIndex !== null;

  /** For the split-second between changing the number of speakers in a row on a screen width change */
  const displayedSelectedIndex =
    selectedIndex !== null
      ? Math.min(selectedIndex, row.speakers.length - 1)
      : null;

  const displayedContent =
    displayedSelectedIndex !== null
      ? row.speakers[displayedSelectedIndex].bio
      : null;

  useEffect(() => {
    console.log("displayedContent", displayedContent?.split("\n"));
  }, [displayedContent]);

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
        gap={{ base: speakerSelected ? 0 : 3, md: 3 }}
        w={row.speakers.length === 1 ? "50%" : "100%"}
        maxW="1000px"
        ml={{
          base: speakerSelected ? 0 : 7,
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
              displayedSelectedIndex !== null
                ? displayedSelectedIndex === index
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
              displayedSelectedIndex !== null
                ? displayedSelectedIndex === index
                  ? "100%"
                  : "0"
                : "100%"
            }
            opacity={
              displayedSelectedIndex !== null
                ? displayedSelectedIndex === index
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
        display="flex"
        position="relative"
        h={speakerSelected ? `${bioTextDisplayedHeight}px` : "150px"}
        w={row.speakers.length === 1 ? "50%" : "100%"}
        maxW="1000px"
        alignItems={"center"}
        gap={displayedSelectedIndex !== null ? 0 : 5}
        transition={"all 0.3s"}
        ml={{
          base: 0,
          md: 0
        }}
      >
        {row.speakers.map((speaker, index) => (
          <SpeakerImageCard
            key={`speaker-image-${index}`}
            row={row}
            index={index}
            displayedSelectedIndex={displayedSelectedIndex}
            speakerSelected={speakerSelected}
            speaker={speaker}
            customHeight={
              speakerSelected ? `${bioTextDisplayedHeight}px` : "150px"
            }
            handleSetSelectedIndex={handleSetSelectedIndex}
          />
        ))}
        <Box
          display={"flex"}
          alignItems={"center"}
          position="absolute"
          top={0}
          left={0}
          right={0}
          pl={{ base: "1rem", md: "5rem" }}
          pr={{ base: 14, md: 16 }}
          h={`${bioTextDisplayedHeight}px`}
          textAlign="left"
          color="white"
          fontFamily="Magistral"
          fontSize={{
            base: "md",
            lg: "xl"
          }}
          opacity={displayedSelectedIndex !== null ? 1 : 0.5}
          transition="all 0.3s"
          zIndex={3}
          pointerEvents={displayedSelectedIndex !== null ? undefined : "none"}
          fontWeight={"semibold"}
        >
          <Text ref={bioTextRef} whiteSpace={"pre-wrap"}>
            {displayedContent ? (
              displayedContent.split("\\n").map((line, i) => (
                <>
                  {line}
                  {i < displayedContent.split("\\n").length - 1 && (
                    <>
                      <br />
                    </>
                  )}
                </>
              ))
            ) : (
              <></>
            )}
          </Text>
        </Box>
        <Box
          position="absolute"
          top={2}
          right={1}
          zIndex={99}
          opacity={displayedSelectedIndex !== null ? "1" : "0"}
          display={displayedSelectedIndex !== null ? "flex" : "none"}
        >
          {/* Exit button, x icon */}
          <IconButton
            size="sm"
            aria-label="Exit"
            icon={<CloseIcon transform={{ md: "skewX(20deg)" }} />}
            onClick={handleLeave}
            transform={{ base: "", md: "skewX(-20deg)" }}
            px={4}
          />
        </Box>
      </HStack>
      <HStack
        gap={{
          base: 2,
          md: 0
        }}
        w={row.speakers.length === 1 ? "50%" : "100%"}
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
              displayedSelectedIndex !== null
                ? displayedSelectedIndex === index
                  ? 1
                  : 0
                : 1
            }
            color={row.color}
            fontFamily="Magistral"
            letterSpacing={"1px"}
            fontSize={{
              base: "sm,",
              md: "xl"
            }}
            h={displayedSelectedIndex ? "30px" : "100px"}
            isTruncated={
              isSmallScreen ? false : displayedSelectedIndex !== null
            }
            pl={speakerSelected ? (index === 0 ? 2 : 0) : 0}
            pr={
              displayedSelectedIndex !== null
                ? displayedSelectedIndex === index
                  ? 3
                  : 0
                : 3
            }
            minWidth="0"
            transition={"all 0.3s"}
            w={
              displayedSelectedIndex !== null
                ? displayedSelectedIndex === index
                  ? "100%"
                  : "0"
                : "100%"
            }
            overflow={"hidden"}
          >
            {speaker.title}
          </Text>
        ))}
      </HStack>
    </VStack>
  );
}
