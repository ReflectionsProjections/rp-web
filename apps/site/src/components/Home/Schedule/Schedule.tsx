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
      <Box w="100%" justifyContent={"center"} bgColor="white" pb={10}>
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
          bgColor="white"
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
          <DayEvents
            selectedDayIndex={selectedDayIndex}
            hoveredIndex={hoveredEventIndex}
            dayEvents={dayEvents}
            onHover={handleHover}
            onClick={handleSelectEvent}
          />
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
        </Flex>
      </Box>
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </>
  );
}

function DayEvents({
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
        bgColor="gray.800"
        py={2}
        pb={5}
        borderRadius="xl"
        borderLeftRadius={{ lg: "40px" }}
        overflowY={{ md: "auto" }}
      >
        <Text
          w="100%"
          textAlign="center"
          fontSize="2xl"
          fontWeight="bold"
          color="gray.300"
          fontFamily="Racing Sans One"
          my={3}
          mb={4}
        >
          Calendar
        </Text>
        <Box minH={{ md: "70vh" }} maxH={{ md: "70vh" }} overflowY="auto">
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
      m={{
        base: 3,
        md: 5
      }}
      my={{
        base: 3,
        md: 4
      }}
      mt={number === 1 ? 0 : undefined}
      borderRadius="xl"
      templateColumns={{
        base: "30px 1fr 30px",
        md: "20px 30px 1fr 40px"
      }}
      alignItems="center"
      bgColor={hoveredIndex === number ? "gray.300" : "gray.400"}
      gap={{
        base: 3,
        md: 5
      }}
      _hover={{
        bgColor: "gray.300",
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
      <Text
        fontSize="2xl"
        color="gray.800"
        fontWeight="thin"
        textAlign="center"
        fontFamily="Racing Sans One"
        mb={"2px"}
        hideBelow={"md"}
      >
        {number}
      </Text>

      <Box
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
        w="30px"
        h="30px"
        borderRadius="full"
        bg={circleColors[(number - 1) % circleColors.length]}
        boxShadow="md"
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

      <Flex flexDirection={"column"}>
        <Text fontSize={"lg"} color="black" fontFamily={"Racing Sans One"}>
          {event.name}
        </Text>

        <Text
          fontSize={"md"}
          color="gray.600"
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
            color="yellow.600"
            boxSize={6}
          />
        </Flex>
      </Tooltip>
    </Grid>
  );
}
