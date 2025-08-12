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
  const isThisSelected = displayedSelectedIndex === index;
  const isClickable = !speakerSelected;

  return (
    <Box
      role="group" // enable group hover
      display="flex"
      justifyContent="flex-end"
      pr={8}
      alignItems="center"
      flex={1}
      h={speakerSelected ? customHeight : "150px"}
      mx="-1px"
      bg={`${row.color}${isAnySelected ? "ff" : "90"}`}
      transform={{
        base: "skewX(-10deg)",
        md: "skewX(-20deg)"
      }}
      borderLeftRadius={index === 0 || !isAnySelected ? "md" : "none"}
      borderRightRadius={
        index === row.speakers.length - 1 || !isAnySelected ? "md" : "none"
      }
      zIndex={isThisSelected ? 1 : 0}
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
        boxSize={{ md: "170px" }}
        ml={-3}
        mt={-5}
        cursor={isClickable ? "pointer" : "default"}
        transform={{
          base: "skewX(10deg)",
          md: "skewX(20deg)"
        }}
        transformOrigin="bottom" // keep bottom fixed
        objectFit="cover"
        opacity={isAnySelected ? 0 : 1}
        transition="transform 0.5s ease, opacity 0.1s"
        src={speaker.imgUrl}
        _groupHover={
          isClickable
            ? {
                transform: {
                  base: "skewX(10deg) scale(1.03)",
                  md: "skewX(20deg) scale(1.03)"
                }
              }
            : {}
        }
      />
    </Box>
  );
}
