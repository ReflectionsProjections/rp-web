import api from "@/util/api";

import {
  Box,
  Flex,
  Grid,
  Icon,
  Text,
  Tooltip,
  useToast
} from "@chakra-ui/react";
import { Event, path } from "@rp/shared";
import moment from "moment";
import { useEffect, useState } from "react";

import { EVENT_ICONS } from "@/constants/event-icons";
import EventModal from "./EventModal";
import { RaceTrack } from "./RaceTrack";
import ScheduleDaySelector from "./ScheduleDaySelector";

export const circleColors = [
  "green.400",
  "purple.600",
  "pink.500",
  "red.500",
  "orange.500",
  "teal.400",
  "cyan.400",
  "blue.500",
  "yellow.400",
  "pink.600"
];

export const circleColorsLighter = [
  "green.600",
  "purple.800",
  "pink.700",
  "red.700",
  "orange.700",
  "teal.600",
  "cyan.600",
  "blue.700",
  "yellow.600",
  "pink.800"
];

export default function Schedule() {
  const toast = useToast();
  const [eventsByDay, setEventsByDay] = useState<{ [key: string]: Event[] }>(
    {}
  );
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [hoveredEventIndex, setHoveredEventIndex] = useState<number | null>(
    null
  );

  const selectedDayIndex = Math.max(
    Object.keys(eventsByDay).indexOf(selectedDay || "") + 1,
    1
  );

  const dayEvents = selectedDay ? eventsByDay[selectedDay] : [];

  const handleLoadEvents = () => {
    api
      .get(path("/events", {}))
      .then((events) => {
        const eventsByDay: { [key: string]: Event[] } = {};
        events.data.forEach((event) => {
          const date = moment(event.startTime).format("ddd M/D");
          if (!eventsByDay[date]) {
            eventsByDay[date] = [];
          }
          eventsByDay[date].push(event);
        });
        setSelectedDay(Object.keys(eventsByDay)[0]);
        setEventsByDay(eventsByDay);
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error fetching events",
          status: "error",
          duration: 9000,
          isClosable: true
        });
      });
  };

  useEffect(() => {
    handleLoadEvents();
  }, []);

  const handleHover = (index: number) => {
    setHoveredEventIndex(index);
  };

  const handleSelectDay = (date: string) => {
    setHoveredEventIndex(null);
    setSelectedDay(date);
  };

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
  };

  return (
    <>
      <Box w="100%" justifyContent={"center"} bgColor="#3C3C3C" py={10}>
        <ScheduleDaySelector
          selectedDay={selectedDay}
          eventsByDay={eventsByDay}
          onSelectDay={handleSelectDay}
        />
        <Flex
          w="100%"
          maxWidth="1500px"
          justifyContent={"center"}
          flexDirection={{
            base: "column-reverse",
            lg: "row"
          }}
          mt={{
            base: 20,
            md: 5
          }}
          mx="auto"
          gap={0}
          px={{
            base: 3,
            md: 10
          }}
        >
          <DayEventsSection
            selectedDayIndex={selectedDayIndex}
            hoveredIndex={hoveredEventIndex}
            dayEvents={dayEvents}
            onHover={handleHover}
            onClick={handleSelectEvent}
          />
          <RaceTrackSection
            dayEvents={dayEvents}
            hoveredEventIndex={hoveredEventIndex}
            handleHover={handleHover}
            handleSelectEvent={handleSelectEvent}
          />
        </Flex>
      </Box>
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </>
  );
}

function DayEventsSection({
  hoveredIndex,
  dayEvents,
  onHover,
  onClick
}: {
  selectedDayIndex: number;
  hoveredIndex: number | null;
  dayEvents: Event[];
  onHover: (index: number) => void;
  onClick: (event: Event) => void;
}) {
  return (
    <Box flex={1} h="100%" py={0}>
      <Box
        bgColor="#242424"
        py={2}
        pb={5}
        borderRadius="xl"
        borderLeftRadius={{ lg: "30px" }}
        overflowY={{ md: "auto" }}
      >
        <Text
          w="100%"
          textAlign="center"
          fontSize="5xl"
          fontWeight="bold"
          color="#8A8A8A"
          fontFamily="Archivo Black"
          my={3}
          mb={4}
        >
          Calendar
        </Text>
        <Box minH={{ md: "70vh" }} maxH={{ md: "70vh" }} overflowY="auto">
          {dayEvents.length === 0 && (
            <Text
              fontSize="xl"
              color="gray.500"
              fontFamily="Racing Sans One"
              textAlign="center"
            >
              No events scheduled yet.
            </Text>
          )}
          {dayEvents.map((event, index) => (
            <DayEvent
              key={index}
              number={index + 1}
              hoveredIndex={hoveredIndex}
              event={event}
              onHover={onHover}
              onClick={onClick}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

function RaceTrackSection({
  dayEvents,
  hoveredEventIndex,
  handleHover,
  handleSelectEvent
}: {
  dayEvents: Event[];
  hoveredEventIndex: number | null;
  handleHover: (index: number) => void;
  handleSelectEvent: (event: Event) => void;
}) {
  return (
    <Flex
      flex={{
        md: 1
      }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        flex={{
          md: 1
        }}
        borderRadius="lg"
      >
        <Box
          w="100%"
          transform={{
            base: "scale(0.9)",
            md: "scale(0.7)",
            lg: "scale(0.8)"
          }}
          flexDirection={"column"}
          justifyContent={"center"}
          mt={{
            base: -16,
            lg: 0
          }}
          mb={{
            base: 16,
            md: 0
          }}
        >
          <RaceTrack
            dayEvents={dayEvents}
            colors={circleColors}
            hoveredIndex={hoveredEventIndex}
            onHover={handleHover}
            onClick={handleSelectEvent}
          />
        </Box>
      </Box>
    </Flex>
  );
}

function DayEvent({
  number,
  hoveredIndex,
  event,
  onHover,
  onClick
}: {
  number: number;
  hoveredIndex: number | null;
  event: Event;
  onHover: (index: number) => void;
  onClick: (event: Event) => void;
}) {
  return (
    <Grid
      px={{
        base: 3,
        md: 5
      }}
      py={3}
      templateColumns={{
        base: "40px 1fr 30px",
        md: "40px 10px 1fr 40px"
      }}
      alignItems="center"
      bgColor={
        hoveredIndex === number
          ? "gray.300"
          : number % 2 === 0
            ? "#2E2E2E"
            : "#242424"
      }
      gap={{
        base: 3,
        md: 3
      }}
      _hover={{
        bgColor: circleColorsLighter[(number - 1) % circleColorsLighter.length],
        cursor: "pointer"
      }}
      transition={"all 0.2s"}
      onMouseEnter={() => {
        onHover(number);
      }}
      onMouseLeave={() => {
        onHover(-1);
      }}
      onClick={() => {
        onClick(event);
      }}
    >
      <Box
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
        w="40px"
        h="40px"
        bgColor="gray.200"
        borderRadius="sm"
      >
        <Text
          fontSize="2xl"
          color="gray.800"
          fontWeight="thin"
          textAlign="center"
          fontFamily="Archivo Black"
          mb={"2px"}
          hideBelow={"md"}
          mt={"4px"}
        >
          {number}
        </Text>
      </Box>

      <Box
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
        w="10px"
        h="40px"
        bg={circleColors[(number - 1) % circleColors.length]}
        boxShadow="md"
        borderRadius="sm"
      >
        <Text
          fontSize="lg"
          color="gray.100"
          fontWeight="thin"
          textAlign="center"
          fontFamily="Racing Sans One"
          mb={"2px"}
          hideFrom="md"
        >
          {number}
        </Text>
      </Box>

      <Flex flexDirection={"column"} gap={0}>
        <Text fontSize={"lg"} color="white" fontFamily={"Racing Sans One"}>
          {event.name}
        </Text>

        <Text
          fontSize={"md"}
          color="gray.400"
          fontWeight="medium"
          fontFamily="Racing Sans One"
        >
          {moment(event.startTime).format("h:mma")} –{" "}
          {moment(event.endTime).format("h:mma")}
        </Text>
      </Flex>

      <Tooltip
        label={event.eventType
          .toLowerCase()
          .replace(/^\w/, (c) => c.toUpperCase())}
        placement="top"
        hasArrow
      >
        <Flex w="30px" h="30px" justifyContent={"center"} alignItems={"center"}>
          <Icon
            as={EVENT_ICONS[event.eventType]}
            color="yellow.500"
            boxSize={6}
          />
        </Flex>
      </Tooltip>
    </Grid>
  );
}
