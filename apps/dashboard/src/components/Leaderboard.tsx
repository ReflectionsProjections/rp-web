import { ICON_COLOR_TO_COLOR } from "@/constants/colors";
import { Box, Flex, Text } from "@chakra-ui/react";
import { api, IconColor, IconColors, LeaderboardEntry } from "@rp/shared";
import CarSvg from "@/assets/car.svg?raw";
import Car from "@/assets/car.svg?react";
import Icon from "@/assets/icon.svg?react";
import { useEffect, useRef, useState } from "react";
import useUpdateAnimationLoop, {
  CarPosition,
  DRAW_CARS_IN_CANVAS
} from "../hooks/LeaderboardDraw";

const TOP_CARS_NUMBER = 10;

export default function Leaderboard({
  trackPercent
}: {
  trackPercent: number;
}) {
  const [leaderboard, setLeaderboard] = useState<
    LeaderboardEntry[] | undefined
  >(undefined);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [carImages, setCarImages] = useState<
    Record<IconColor, HTMLImageElement> | undefined
  >(undefined);
  const { positions, zoomedOut } = useUpdateAnimationLoop({
    canvasRef,
    trackPercent,
    carImages,
    leaderboard
  });

  useEffect(() => {
    const date = new Date();

    // First try to get daily leaderboard
    api
      .get("/leaderboard/daily", {
        params: {
          // Cursed day format requirement - why is this not just unix time???
          day: `${date.getFullYear()}-${date.getMonth().toString().padStart(2, "0")}-${date.getDay().toString().padStart(2, "0")}`,
          n: TOP_CARS_NUMBER
        }
      })
      .then((response) => {
        // If there's results currently, then use that
        if (response.data.leaderboard.length > 0) {
          setLeaderboard(response.data.leaderboard.slice(0, TOP_CARS_NUMBER));
        } else {
          // Otherwise, show global leaderboard
          api
            .get("/leaderboard/global", {
              params: {
                n: TOP_CARS_NUMBER
              }
            })
            .then((response) => {
              setLeaderboard(
                response.data.leaderboard.slice(0, TOP_CARS_NUMBER)
              );
            })
            .catch(console.error);
        }
      })
      .catch(console.error);
  }, []);

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
          {leaderboard &&
            positions.map((pos, i) => {
              const entry = leaderboard[i];
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

  const stagerOffset = i % 2 == 0 ? pos.width * 0.3 : -pos.width * 0.3;
  const carOffset = stagerOffset + 0.6 * pos.width; // Increased offset for better spacing
  const left = pos.x + carOffset;
  const top = pos.y;

  return (
    <Box
      position={"absolute"}
      transform={"translate(0,-50%)"}
      backgroundColor={"#0000008c"}
      width={"max-content"}
      padding={"0.5vh"}
      borderRadius={"1vh"}
      transition={"opacity 0.5s"}
      // Style inlined here to prevent chakra generating a new class every frame
      style={{
        opacity: visible ? 1 : 0,
        top,
        left
      }}
    >
      <Flex
        border={`0.2vh solid ${ICON_COLOR_TO_COLOR[icon]}`}
        borderRadius={"0.8vh"}
        padding={"0.5vh"}
        paddingX="0.9vh"
        alignItems={"center"}
      >
        <Text
          marginRight={"0.5vh"}
          fontFamily={"Magistral"}
          fontWeight={"bold"}
          letterSpacing={"0.1vh"}
          fontSize={"2vh"}
        >
          {rank}
          <small>{placePostfix}</small>
        </Text>
        <Box marginRight={"0.5vh"}>
          <Icon
            width={"4vh"}
            height={"4vh"}
            color={ICON_COLOR_TO_COLOR[icon]}
          />
        </Box>
        <Flex flexDirection={"column"}>
          <Text fontWeight={"black"} fontFamily={"Magistral"} fontSize={"2vh"}>
            {displayName}
          </Text>
          <Text fontFamily={"Magistral"} fontSize={"1.5vh"} fontWeight="bold">
            {points} PTS
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}
