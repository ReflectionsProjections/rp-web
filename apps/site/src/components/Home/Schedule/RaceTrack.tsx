import { Box, Text, Tooltip } from "@chakra-ui/react";
import { Event } from "@rp/shared";
import { useMemo } from "react";

type RaceTrackLocation = {
  x: number;
  y: number;
  order: number;
};

const locations: RaceTrackLocation[] = [
  { x: 165, y: 0, order: 1 },
  { x: 945, y: 190, order: 5 },
  { x: 100, y: 510, order: 10 },
  { x: 550, y: 275, order: 8 },
  { x: 560, y: 15, order: 3 },

  { x: 320, y: 450, order: 9 },
  { x: 50, y: 180, order: 12 },
  { x: 805, y: 425, order: 7 },
  { x: 15, y: 340, order: 11 },
  { x: 780, y: 45, order: 4 },

  { x: 390, y: -10, order: 2 },
  { x: 940, y: 370, order: 6 }
];

export function RaceTrack({
  dayEvents,
  colors,
  hoveredIndex,
  onHover,
  onClick
}: {
  dayEvents: Event[];
  colors: string[];
  hoveredIndex: number | null;
  onHover?: (index: number) => void;
  onClick: (event: Event) => void;
}) {
  const selectedLocations = useMemo(() => {
    return locations.slice(0, dayEvents.length).sort((a, b) => {
      return a.order - b.order;
    });
  }, [dayEvents.length]);

  return (
    <Box
      position="relative"
      width="100%"
      height={{
        base: "200px",
        md: "500px"
      }}
      overflow="visible"
    >
      <Box
        position="relative"
        as="svg"
        width="100%"
        height={{
          base: "200px",
          md: "500px"
        }}
        overflow="visible"
        viewBox="0 0 985 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <RaceTrackPath />
        {selectedLocations.map((location, index) => {
          const hovered = hoveredIndex ? hoveredIndex - 1 === index : false;

          return (
            <RaceTrackLocation
              key={`${location.x}-${location.y}`}
              index={index}
              color={colors[index % colors.length]}
              location={location}
              hovered={hovered}
              dayEvent={dayEvents[index]}
              onClick={onClick}
              onHover={onHover}
            />
          );
        })}
      </Box>
    </Box>
  );
}

function RaceTrackLocation({
  index,
  color,
  location,
  hovered,
  dayEvent,
  onClick,
  onHover
}: {
  index: number;
  color: string;
  location: RaceTrackLocation;
  hovered: boolean;
  dayEvent: Event;
  onClick: (event: Event) => void;
  onHover?: (index: number) => void;
}) {
  return (
    <foreignObject
      key={`${location.x}-${location.y}-circle`}
      x={location.x - (hovered ? 20 : 0)}
      y={location.y - (hovered ? 20 : 0)}
      width={120}
      height={120}
      onClick={() => onClick(dayEvent)}
    >
      <Tooltip
        label={dayEvent.location}
        placement="bottom"
        hasArrow
        openDelay={200}
        closeDelay={100}
        isOpen={hovered}
        fontFamily="Racing Sans One"
        hideBelow={"md"} // Hide on mobile to prevent the tooltip from being visible in the modal
      >
        <Box
          width={
            hovered
              ? "100px"
              : {
                  base: "60px",
                  md: "50px"
                }
          }
          height={
            hovered
              ? "100px"
              : {
                  base: "60px",
                  md: "50px"
                }
          }
          borderRadius="full"
          bg={hovered ? "white" : color}
          borderWidth={hovered ? "25px" : "0px"}
          borderColor={color}
          boxShadow="lg"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer" // makes it clear it’s interactive
          onMouseEnter={() => onHover && onHover(index + 1)}
          onMouseLeave={() => onHover && onHover(-1)}
        >
          <Text
            fontSize="4xl"
            fontWeight="bold"
            fontFamily="Racing Sans One"
            color={hovered ? "black" : "white"}
          >
            {index + 1}
          </Text>
        </Box>
      </Tooltip>
    </foreignObject>
  );
}

function RaceTrackPath() {
  return (
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
  );
}
