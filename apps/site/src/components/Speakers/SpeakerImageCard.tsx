import { Box, Image } from "@chakra-ui/react";

type SpeakerImageCardProps = {
  row: { color: string; speakers: { imgUrl: string }[] };
  index: number;
  displayedSelectedIndex: number | null;
  speakerSelected: boolean;
  speaker: { imgUrl: string };
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
        md: "skewX(-20deg)"
      }}
      borderLeftRadius={index === 0 || !isAnySelected ? "md" : "none"}
      borderRightRadius={
        index === row.speakers.length - 1 || !isAnySelected ? "md" : "none"
      }
      zIndex={isAnySelected ? 1 : 0}
      transition="all 0.3s"
      onClick={isClickable ? () => handleSetSelectedIndex(index) : undefined}
      cursor={isClickable ? "pointer" : "default"}
      _hover={
        isClickable
          ? {
              bg: `${row.color}ff` // fully solid on hover
            }
          : {}
      }
    >
      <Image
        h={{ base: "150px", sm: "150px", md: "170px" }}
        w={{ base: "130px !important", sm: "140px", md: "170px !important" }}
        minW={{ base: "130px !important", sm: "140px", md: "170px !important" }}
        ml={-3}
        mt={-5}
        cursor={isClickable ? "pointer" : "default"}
        transform={{
          base: isAnySelected ? "" : "skewX(10deg)",
          md: "skewX(20deg)"
        }}
        transformOrigin="bottom" // keep bottom fixed
        objectFit="cover"
        objectPosition={"bottom"}
        overflow="visible"
        opacity={isAnySelected ? 0 : 1}
        transition="transform 0.5s ease, opacity 0.1s"
        src={speaker.imgUrl}
        _groupHover={
          isClickable
            ? {
                transform: {
                  base: isAnySelected ? "" : "skewX(10deg) scale(1.03)",
                  md: "skewX(20deg) scale(1.03)"
                }
              }
            : {}
        }
      />
    </Box>
  );
}
