import { ICON_COLOR_TO_COLOR } from "@/constants/colors";
import { Box, Flex, Text } from "@chakra-ui/react";
import { IconColor, IconColors, LeaderboardEntry } from "@rp/shared";
import CarSvg from "@/assets/car.svg?raw";
import Car from "@/assets/car.svg?react";
import Icon from "@/assets/icon.svg?react";
import { useEffect, useRef, useState } from "react";
import useUpdateAnimationLoop, {
  CarPosition,
  DRAW_CARS_IN_CANVAS
} from "../hooks/LeaderboardDraw";
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

export default function Leaderboard({
  trackPercent
}: {
  trackPercent: number;
}) {
  // const { data, isLoading } = usePolling("/leaderboard/daily");

  // Testing data until leaderboard is done
  const { data } = useMockData();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [carImages, setCarImages] = useState<
    Record<IconColor, HTMLImageElement> | undefined
  >(undefined);
  const { positions, zoomedOut } = useUpdateAnimationLoop({
    canvasRef,
    trackPercent,
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
    if (!DRAW_CARS_IN_CANVAS) return;
    loadImages().catch(console.error);
  }, []);

  return (
    <Flex flexDirection={"column"} height={"100%"} maxHeight={"100%"}>
      <Flex position={"relative"} minHeight={"0"} flexGrow={"1"}>
        <canvas style={{ width: "100%", height: "100%" }} ref={canvasRef} />
        <Box position="absolute" top={0} left={0} right={0} bottom={0}>
          {data?.leaderboard &&
            positions.map((pos, i) => {
              const entry = data.leaderboard[i];
              const scorecardVisible =
                !zoomedOut &&
                !!canvasRef.current &&
                pos.y > canvasRef.current.height * 0.05 &&
                pos.y < canvasRef.current.height * 0.95;

              return (
                pos && (
                  <LeaderboardEntryDisplay
                    key={i}
                    i={i}
                    pos={pos}
                    entry={entry}
                    scorecardVisible={scorecardVisible}
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
  entry,
  scorecardVisible
}: {
  i: number;
  pos: CarPosition;
  entry: LeaderboardEntry;
  scorecardVisible: boolean;
}) {
  return (
    <Box>
      {!DRAW_CARS_IN_CANVAS && (
        <Box
          position={"absolute"}
          style={{
            top: pos.drawY,
            left: pos.drawX,
            width: pos.width,
            height: pos.height,
            transform: `translate(-50%, -50%) rotate(${pos.drawAngle}rad)`
          }}
        >
          <Car
            width={"100%"}
            height={"100%"}
            color={ICON_COLOR_TO_COLOR[entry.icon]}
          />
        </Box>
      )}
      <LeaderboardScorecard
        i={i}
        pos={pos}
        entry={entry}
        visible={scorecardVisible}
      />
    </Box>
  );
}

function LeaderboardScorecard({
  i,
  pos,
  entry: { rank, displayName, points, icon },
  visible
}: {
  i: number;
  pos: CarPosition;
  entry: LeaderboardEntry;
  visible: boolean;
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

  const stagerOffset = i % 2 == 0 ? pos.width * 0.25 : -pos.width * 0.25;
  const carOffset = stagerOffset + 0.5 * pos.width;
  const left = pos.x + carOffset;
  const top = pos.y;

  return (
    <Box
      position={"absolute"}
      transform={"translate(0,-50%)"}
      backgroundColor={"#0000008c"}
      width={"max-content"}
      padding={"0.25rem"}
      borderRadius={"0.5rem"}
      transition={"opacity 0.5s"}
      // Style inlined here to prevent chakra generating a new class every frame
      style={{
        opacity: visible ? 1 : 0,
        top,
        left
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
