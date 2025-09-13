import { ICON_COLOR_TO_COLOR } from "@/constants/colors";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { IconColor, IconColors, LeaderboardEntry } from "@rp/shared";
import CarSvg from "@/assets/car.svg?raw";
import Icon from "@/assets/icon.svg?react";
import { useEffect, useRef, useState } from "react";
import useUpdateAnimationLoop, { CarPosition } from "../hooks/LeaderboardDraw";
// import { usePolling } from "@rp/shared";

function useMockData() {
  const [data, setData] = useState<
    { leaderboard: LeaderboardEntry[] } | undefined
  >(undefined);
  useEffect(() => {
    setData({
      leaderboard: [
        {
          displayName: "Bob",
          currentTier: "TIER2",
          icon: "ORANGE",
          points: 32,
          rank: 1,
          userId: "1234"
        },
        {
          displayName: "Alice",
          currentTier: "TIER1",
          icon: "RED",
          points: 28,
          rank: 2,
          userId: "12345"
        },
        {
          displayName: "Alex",
          currentTier: "TIER1",
          icon: "BLUE",
          points: 25,
          rank: 3,
          userId: "123456"
        },
        {
          displayName: "Tree",
          currentTier: "TIER1",
          icon: "GREEN",
          points: 18,
          rank: 4,
          userId: "1234567"
        },
        {
          displayName: "OnlyTwentyCharacters", // Crazy this is exactly 20
          currentTier: "TIER1",
          icon: "PURPLE",
          points: 16,
          rank: 5,
          userId: "1234568"
        },
        {
          displayName: "OnlyOne",
          currentTier: "TIER1",
          icon: "GREEN",
          points: 13,
          rank: 6,
          userId: "1234569"
        },
        {
          displayName: "TesterTheGuy",
          currentTier: "TIER1",
          icon: "RED",
          points: 11,
          rank: 7,
          userId: "12532"
        },
        {
          displayName: "Bazinga",
          currentTier: "TIER1",
          icon: "ORANGE",
          points: 5,
          rank: 8,
          userId: "13454315"
        },
        {
          displayName: "Sheldon",
          currentTier: "TIER1",
          icon: "PINK",
          points: 3,
          rank: 9,
          userId: "12352353"
        },
        {
          displayName: "Duck",
          currentTier: "TIER1",
          icon: "PURPLE",
          points: 2,
          rank: 10,
          userId: "1235235239845"
        }
      ]
    });
  }, []);

  return { data, isLoading: false };
}

export default function Leaderboard() {
  // const { data, isLoading } = usePolling("/leaderboard/daily");

  // Testing data until leaderboard is done
  const { data } = useMockData();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [carImages, setCarImages] = useState<
    Record<IconColor, HTMLImageElement> | undefined
  >(undefined);
  const { positions } = useUpdateAnimationLoop({
    canvasRef,
    carImages,
    leaderboard: data?.leaderboard
  });

  // Preload images for each color
  async function loadImages() {
    const loadedEntries = await Promise.all(
      Object.values(IconColors).map(async (color: IconColor) => {
        return new Promise<[IconColor, HTMLImageElement]>((resolve, reject) => {
          const img = new Image();
          const coloredSvg = CarSvg.replace(
            /currentColor/g,
            ICON_COLOR_TO_COLOR[color]
          );
          img.src = "data:image/svg+xml;utf8," + encodeURIComponent(coloredSvg);

          img.onload = () => resolve([color, img]);
          img.onerror = reject;
        });
      })
    );
    // Convert array of [color, image] tuples into an object
    const images = Object.fromEntries(loadedEntries) as Record<
      IconColor,
      HTMLImageElement
    >;

    setCarImages(images);
  }

  useEffect(() => {
    loadImages().catch(console.error);
  }, []);

  return (
    <Flex flexDirection={"column"} height={"100%"} maxHeight={"100%"}>
      <Heading textAlign={"center"}>Leaderboard</Heading>
      <Flex
        position={"relative"}
        minHeight={"0"}
        flexGrow={"1"}
        overflow={"hidden"}
      >
        <canvas style={{ width: "100%", height: "100%" }} ref={canvasRef} />
        <Box position="absolute" top={0} left={0} right={0} bottom={0}>
          {data?.leaderboard &&
            positions.map((pos, i) => {
              const entry = data?.leaderboard[i];
              return (
                pos && (
                  <LeaderboardEntryDisplay
                    key={i}
                    i={i}
                    pos={pos}
                    entry={entry}
                  />
                )
              );
            })}
        </Box>
      </Flex>
    </Flex>
  );
}

function LeaderboardEntryDisplay({
  i,
  pos,
  entry: { rank, displayName, points, icon }
}: {
  i: number;
  pos: CarPosition;
  entry: LeaderboardEntry;
}) {
  let placePostfix = "th";
  if (rank % 10 == 1 && (rank < 10 || rank > 20)) {
    placePostfix = "st";
  }
  if (rank % 10 == 2 && (rank < 10 || rank > 20)) {
    placePostfix = "nd";
  }
  if (rank % 10 == 3 && (rank < 10 || rank > 20)) {
    placePostfix = "rd";
  }

  return (
    <Box
      position={"absolute"}
      transform={"translate(0,-50%)"}
      backgroundColor={"#0000008c"}
      width={"max-content"}
      padding={"0.25rem"}
      borderRadius={"0.5rem"}
      // Style inlined here to prevent chakra generating a new class every frame
      style={{
        top: pos.y,
        left: `calc(${pos.x}px + ${i % 2 == 0 ? "15%" : "7.5%"}`
      }}
    >
      <Flex
        border={`2px solid ${ICON_COLOR_TO_COLOR[icon]}`}
        borderRadius={"0.5rem"}
        padding={"0.75rem"}
        alignItems={"center"}
      >
        <Text marginRight={"0.5rem"}>
          {rank}
          <small>{placePostfix}</small>
        </Text>
        <Box marginRight={"0.5rem"}>
          <Icon
            width={"3rem"}
            height={"3rem"}
            color={ICON_COLOR_TO_COLOR[icon]}
          />
        </Box>
        <Flex flexDirection={"column"}>
          <Text fontWeight={"bold"}>{displayName}</Text>
          <Text>{points} PTS</Text>
        </Flex>
      </Flex>
    </Box>
  );
}
