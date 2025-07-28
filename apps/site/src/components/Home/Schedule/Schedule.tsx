import api from "@/util/api";

import {
  Box,
  Flex,
  Grid,
  HStack,
  Icon,
  Spacer,
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
import { AudioVisualizer } from "./AudioVisualizer";

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
      <Box
        w="100%"
        minH={{
          base: "100dvh", // To keep the background consistent on mobile
          md: "70dvh"
        }}
        justifyContent="center"
        bgImage={{
          base: "url('/schedule-mobile.svg')",
          lg: "url('/schedule.svg')"
        }}
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        py={{
          base: 5,
          md: 10
        }}
      >
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
            md: "column-reverse",
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
            numDays={Object.keys(eventsByDay).length}
            hoveredIndex={hoveredEventIndex}
            dayEvents={dayEvents}
            onHover={handleHover}
            onClick={handleSelectEvent}
          />
          <RaceTrackSection
            dayEvents={dayEvents}
            hoveredEventIndex={hoveredEventIndex}
            selectedDayIndex={selectedDayIndex}
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
  selectedDayIndex,
  numDays,
  hoveredIndex,
  dayEvents,
  onHover,
  onClick
}: {
  selectedDayIndex: number;
  numDays: number;
  hoveredIndex: number | null;
  dayEvents: Event[];
  onHover: (index: number) => void;
  onClick: (event: Event) => void;
}) {
  return (
    <Box flex={1} h="100%" py={0}>
      <HStack
        display="flex"
        alignItems={"center"}
        justifyContent={"center"}
        gap={3}
        bgColor="#4D4C4C"
        borderTopRadius={"xl"}
        mb={3}
        py={2}
        boxShadow="md"
      >
        <Text fontSize="5xl" color="#8A8A8A" fontFamily="ProRacingSlant" my={0}>
          Lap
        </Text>
        <HStack gap={0}>
          <Text
            fontSize="5xl"
            fontWeight="bold"
            color="white"
            fontFamily="Magistral"
            my={0}
          >
            {selectedDayIndex}
          </Text>
          <Text fontSize="5xl" color="#8A8A8A" fontFamily="Magistral" my={0}>
            /{numDays}
          </Text>
        </HStack>
      </HStack>
      <Box
        bgColor="#242424"
        pb={5}
        borderBottomRadius="xl"
        overflowY={{ md: "auto" }}
        shadow={"md"}
        boxShadow="md"
      >
        <Box overflowY="auto" h={{ lg: "50dvh" }} maxH={{ lg: "50dvh" }}>
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
  selectedDayIndex,
  dayEvents,
  hoveredEventIndex,
  handleHover,
  handleSelectEvent
}: {
  selectedDayIndex: number;
  dayEvents: Event[];
  hoveredEventIndex: number | null;
  handleHover: (index: number) => void;
  handleSelectEvent: (event: Event) => void;
}) {
  return (
    <Flex
      display={{
        base: "none",
        md: "flex"
      }}
      flex={1}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        display="flex"
        flexDir={"column"}
        flex={1}
        borderRadius="lg"
        h="100%"
      >
        <Spacer flex={1} />
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
            selectedDayIndex={selectedDayIndex}
          />
        </Box>
        <Spacer flex={1} />
        <Box
          display={{ base: "none", lg: "flex" }}
          flexDir="column"
          bgGradient="linear(to-b, #454242 0%, #272727 100%)"
          px={4}
          py={2}
          pb={5}
          ml={4}
          borderRadius={"xl"}
          alignItems={"flex-start"}
          shadow={"md"}
        >
          <Flex
            alignItems={"center"}
            mb={2}
            w="100%"
            gap={7}
            borderBottom="2px solid"
            borderBottomColor="orange.300"
          >
            <Text
              fontSize="3xl"
              color="white"
              fontFamily="ProRacingSlant"
              my={0}
            >
              R|P Radio
            </Text>
            <AudioVisualizer />
          </Flex>
          <Text
            fontSize="lg"
            color="gray.400"
            textAlign="left"
            fontFamily="Magistral"
          >
            LOOKING FOR A JOB IN THE TECH INDUSTRY?
          </Text>
          <br />
          <br />
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
      w="100%"
      px={{
        base: 3,
        md: 5
      }}
      py={3}
      templateColumns={{
        base: "12px 8px 1fr 40px",
        md: "20px 10px 1fr 40px"
      }}
      alignItems="center"
      bgColor={hoveredIndex === number ? "#333131" : "#242424"}
      gap={{
        base: 2,
        md: 3
      }}
      _hover={{
        bgColor: "#4D4C4C",
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
        w={{
          base: "10px",
          md: "20px"
        }}
        borderRadius="sm"
      >
        <Text
          fontSize={{
            base: "lg",
            md: "2xl"
          }}
          color="gray.200"
          fontWeight="thin"
          textAlign="center"
          fontFamily="ProRacingSlant"
          mb={"2px"}
          mt={"4px"}
        >
          {number}
        </Text>
      </Box>

      <Box
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
        w={{
          base: "5px",
          md: "10px"
        }}
        h="40px"
        bg={circleColors[(number - 1) % circleColors.length]}
        boxShadow="md"
        borderRadius="sm"
      ></Box>

      <Flex flexDirection={"column"} gap={0}>
        <Text
          fontSize={"lg"}
          color="white"
          fontFamily={"ProRacing"}
          transformOrigin={"top left"}
          w="100%"
        >
          {event.name}
        </Text>

        <Flex
          flexDirection={{
            base: "column",
            md: "row"
          }}
          gap={0}
        >
          <Text
            fontSize={"md"}
            color="gray.100"
            fontWeight="bold"
            fontFamily="Magistral"
            letterSpacing="0.5px"
            transformOrigin={"top left"}
            wordBreak="break-all"
            whiteSpace="normal"
            mr={3}
          >
            {event.location}
          </Text>

          <Text
            fontSize={"md"}
            color="gray.400"
            fontWeight="bold"
            fontFamily="Magistral"
            letterSpacing="0.5px"
            transformOrigin={"top left"}
            whiteSpace={{
              md: "nowrap"
            }}
          >
            {moment(event.startTime).format("h:mma")} –{" "}
            {moment(event.endTime).format("h:mma")}
          </Text>
        </Flex>
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
