import { Box, Text, Tooltip } from "@chakra-ui/react";
import { Event } from "@rp/shared";
import { useMemo } from "react";

type Pos = {
  x: number;
  y: number;
};

function samplePositionsPreserveOrder(positions: Pos[], n: number): Pos[] {
  // 1. Tag each with its original index
  const indexed = positions.map((pos, idx) => ({ pos, idx }));

  // 2. Shuffle the tagged array (Fisher–Yates)
  for (let i = indexed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
  }

  // 3. Take first n, then sort by original index
  const selected = indexed
    .slice(0, n)
    .sort((a, b) => a.idx - b.idx)
    .map(({ pos }) => pos);

  return selected;
}
export function RaceTrack({
  dayEvents,
  colors,
  hoveredIndex
}: {
  dayEvents: Event[];
  colors: string[];
  hoveredIndex: number | null;
}) {
  const positions: Pos[] = [
    { x: 165, y: 0 },
    { x: 400, y: -10 },
    { x: 600, y: 20 },
    { x: 800, y: 50 },
    { x: 900, y: 90 },
    { x: 930, y: 380 },
    { x: 800, y: 420 },
    { x: 700, y: 340 },
    { x: 480, y: 300 },
    { x: 50, y: 180 },
    { x: 10, y: 370 },
    { x: 320, y: 450 }
  ];

  const randomlySelectedPositions = useMemo(() => {
    return samplePositionsPreserveOrder(positions, dayEvents.length);
  }, [dayEvents]);

  return (
    <Box position="relative" width="100%" height="500px" overflow="visible">
      <Box
        position="relative"
        as="svg"
        width="100%"
        height="500px"
        viewBox="0 0 985 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={`
            M175.467 37.1794C82.4521 156.247 47.501 235.129 32.4667 409.179
            M174.861 36.5197C215.521 18.3097 239.031 11.965 281.861 5.51969
            M282.062 5.50388C519.5 20.5988 643 57.5 879.062 80.5039
            M886.5 470.01C1034 425.5 990.5 106 878.5 81.0103
            M886.753 470.435C815 484.5 712 309.5 585.753 299.435
            M227.678 599.617C254.092 614.377 470.198 282.657 585.678 298.617
            M227.651 600.358C145.112 596.714 104.264 506.872 31.6509 409.358
          `}
          stroke="black"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          opacity={0.5}
        />
        {randomlySelectedPositions.map((pos, index) => (
          <foreignObject
            key={`${pos.x}-${pos.y}-circle`}
            x={pos.x}
            y={pos.y}
            width={80}
            height={80}
          >
            <Tooltip
              label={dayEvents[index].name}
              placement="top"
              hasArrow
              openDelay={200} // optional: delay before showing
              closeDelay={100} // optional: delay before hiding
              isOpen={hoveredIndex ? hoveredIndex - 1 === index : false}
            >
              <Box
                width="50px"
                height="50px"
                borderRadius="full"
                bg={
                  hoveredIndex !== null && hoveredIndex - 1 === index
                    ? "white"
                    : colors[index % colors.length]
                }
                boxShadow="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer" // makes it clear it’s interactive
              >
                <Text
                  fontSize="3xl"
                  fontWeight="bold"
                  color={
                    hoveredIndex !== null && hoveredIndex - 1 === index
                      ? "black"
                      : "white"
                  }
                >
                  {index + 1}
                </Text>
              </Box>
            </Tooltip>
          </foreignObject>
        ))}
      </Box>
    </Box>
  );
}
