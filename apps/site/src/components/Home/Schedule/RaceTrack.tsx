import { TRACK_PATHS, TrackLocation } from "@/constants/track-paths";
import { Box, Text, Tooltip } from "@chakra-ui/react";
import { Event } from "@rp/shared";
import { useEffect, useMemo, useRef, useState } from "react";

export function RaceTrack({
  selectedDayIndex,
  dayEvents,
  colors,
  hoveredIndex,
  onHover,
  onClick
}: {
  selectedDayIndex: number;
  dayEvents: Event[];
  colors: string[];
  hoveredIndex: number | null;
  onHover?: (index: number) => void;
  onClick: (event: Event) => void;
}) {
  const pathRef = useRef<SVGPathElement>(null);

  const trackPath = useMemo(() => {
    return TRACK_PATHS[(selectedDayIndex - 1) % TRACK_PATHS.length];
  }, [selectedDayIndex]);

  const [selectedLocations, setSelectedLocations] = useState<TrackLocation[]>(
    []
  );

  const [finishLineLocation, setFinishLineLocation] =
    useState<TrackLocation | null>(null);

  useEffect(() => {
    if (!pathRef?.current) return;

    const pathEl = pathRef.current;
    const totalLen = pathEl.getTotalLength();
    const numLocations = dayEvents.length; // Ensure at least one location
    if (numLocations === 0) return;

    const locations: TrackLocation[] = [];
    for (let i = 0; i < numLocations; i++) {
      const t = i / numLocations;
      const { x, y } = pathEl.getPointAtLength(t * totalLen);
      if (i === numLocations - 1) {
        const t_final = (i + 0.5) / numLocations;
        const { x: finalX, y: finalY } = pathEl.getPointAtLength(
          t_final * totalLen
        );
        setFinishLineLocation({ x: finalX, y: finalY, order: i });
      }
      locations.push({ x, y, order: i });
    }

    setSelectedLocations(locations);
  }, [trackPath.path, dayEvents.length]);

  return (
    <Box
      position="relative"
      width="100%"
      height={{
        base: "200px",
        md: "300px"
      }}
      overflow="visible"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        as="svg"
        width="100%"
        height={{
          base: "200px",
          md: "300px"
        }}
        overflow="visible"
        viewBox={`0 0 ${trackPath.width} ${trackPath.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <RaceTrackPath pathRef={pathRef} path={trackPath.path} />
        {selectedLocations &&
          selectedLocations.map((location, index) => {
            const hovered = hoveredIndex ? hoveredIndex - 1 === index : false;

            return (
              <RaceTrackLocation
                key={`${location.x}-${location.y}-${index}`}
                index={index}
                color={colors[index % colors.length]}
                location={location}
                hovered={hovered}
                dayEvent={dayEvents[index % dayEvents.length]}
                onClick={onClick}
                onHover={onHover}
              />
            );
          })}
        {finishLineLocation && <FinishLocation location={finishLineLocation} />}
      </Box>
    </Box>
  );
}

function FinishLocation({ location }: { location: TrackLocation }) {
  return (
    <foreignObject
      key={`${location.x}-${location.y}-circle`}
      x={location.x - 50}
      y={location.y - 50}
      width={100}
      height={100}
      transform={`${location.x}, ${location.y})`}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        w="100%"
        h="100%"
        pointerEvents={"none"}
      >
        <img
          src="/finish-line.svg"
          alt="Finish Line"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain"
          }}
        />
      </Box>
    </foreignObject>
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
  location: TrackLocation;
  hovered: boolean;
  dayEvent: Event;
  onClick: (event: Event) => void;
  onHover?: (index: number) => void;
}) {
  return (
    <foreignObject
      key={`${location.x}-${location.y}-circle`}
      x={location.x - 50}
      y={location.y - 50}
      width={100}
      height={100}
      onClick={() => onClick(dayEvent)}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        w="100%"
        h="100%"
      >
        <Tooltip
          label={dayEvent.location || "Siebel Center for CS"}
          placement="bottom"
          hasArrow
          openDelay={200}
          closeDelay={100}
          isOpen={hovered}
          fontFamily="Magistral"
          fontSize="lg"
          fontWeight={600}
          hideBelow={"md"} // Hide on mobile to prevent the tooltip from being visible in the modal
        >
          <Box
            width={hovered ? "60px" : "40px"}
            height={hovered ? "60px" : "40px"}
            borderRadius="full"
            bg={color}
            borderWidth={hovered ? "3px" : "3px"}
            borderColor={"white"}
            boxShadow="lg"
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer" // makes it clear it’s interactive
            onMouseEnter={() => onHover && onHover(index + 1)}
            onMouseLeave={() => onHover && onHover(-1)}
          >
            <Text
              fontSize={hovered ? "4xl" : "xl"}
              fontFamily="Magistral"
              color="white"
              fontWeight={"bold"}
            >
              {index + 1}
            </Text>
          </Box>
        </Tooltip>
      </Box>
    </foreignObject>
  );
}

function RaceTrackPath({
  path,
  pathRef
}: {
  path: string;
  pathRef?: React.Ref<SVGPathElement>;
}) {
  return (
    <path
      ref={pathRef}
      d={path}
      stroke="white"
      strokeWidth="8"
      strokeLinecap="round"
      fill="none"
    />
  );
}
