import { Box, Image } from "@chakra-ui/react";
import { Speaker } from "@rp/shared";
import { useMemo } from "react";

type SpeakerImageCardProps = {
  row: { color: string; speakers: { imgUrl: string }[] };
  index: number;
  displayedSelectedIndex: number | null;
  speakerSelected: boolean;
  speaker: Speaker;
  customHeight?: string;
  handleSetSelectedIndex: (index: number) => void;
};

export default function SpeakerImageCard({
  row,
  index,
  displayedSelectedIndex,
  speakerSelected,
  speaker,
  customHeight,
  handleSetSelectedIndex
}: SpeakerImageCardProps) {
  const isAnySelected = displayedSelectedIndex !== null;
  const isClickable = !speakerSelected;
  const isKeynote = speaker.name.split(" ")[0] === "Sue";

  const imgUrl = useMemo(() => {
    if (
      speaker.imgUrl &&
      speaker.imgUrl !== "http://reflectionsprojections.org"
    ) {
      return speaker.imgUrl;
    }
    return `/speakers/${speaker.name
      .split(" ")
      .join("_")
      .split(".")
      .join("")
      .toLowerCase()}.png`;
  }, [speaker.imgUrl, speaker.name]);

  return (
    <Box
      role="group" // enable group hover
      display="flex"
      justifyContent="flex-end"
      pr={{ base: 1, md: 8 }}
      alignItems={{ base: "flex-end", md: "center" }}
      flex={1}
      h={speakerSelected ? customHeight : "150px"}
      mx="-1px"
      bg={`${row.color}${isAnySelected ? "ff" : "90"}`}
      overflowX="visible"
      transform={{
        base: isAnySelected ? "" : "skewX(-10deg)",
        md: "skewX(-10deg)"
      }}
      borderLeftRadius={index === 0 || !isAnySelected ? "md" : "none"}
      borderRightRadius={
        index === row.speakers.length - 1 || !isAnySelected ? "md" : "none"
      }
      zIndex={isAnySelected ? 1 : 0}
      transition="all 0.3s"
      // Keynote speaker emphasis - only show when not selected
      border={isKeynote && !isAnySelected ? "3px solid gold" : "none"}
      boxShadow={
        isKeynote && !isAnySelected ? "0 0 20px rgba(255, 215, 0, 0.5)" : "none"
      }
      _hover={
        isClickable
          ? {
              bg: `${row.color}ff`, // fully solid on hover
              boxShadow:
                isKeynote && !isAnySelected
                  ? "0 0 30px rgba(255, 215, 0, 0.8)"
                  : undefined
            }
          : {}
      }
      onClick={isClickable ? () => handleSetSelectedIndex(index) : undefined}
      cursor={isClickable ? "pointer" : "default"}
    >
      <Image
        h={{ base: "130px", sm: "140px", md: "170px" }}
        w={{ base: "130px !important", sm: "140px", md: "170px !important" }}
        minW={{ base: "130px !important", sm: "140px", md: "170px !important" }}
        ml={-3}
        mt={-5}
        cursor={isClickable ? "pointer" : "default"}
        transform={{
          base: isAnySelected ? "" : "skewX(10deg)",
          md: "skewX(10deg)"
        }}
        transformOrigin="bottom" // keep bottom fixed
        objectFit="cover"
        objectPosition={"bottom"}
        overflow="visible"
        opacity={isAnySelected ? 0 : 1}
        transition="transform 0.5s ease, opacity 0.1s"
        src={imgUrl}
        fallbackSrc="/speakers/fallback.svg"
        _groupHover={
          isClickable
            ? {
                transform: {
                  base: isAnySelected ? "" : "skewX(10deg) scale(1.03)",
                  md: "skewX(10deg) scale(1.03)"
                }
              }
            : {}
        }
      />
    </Box>
  );
}
