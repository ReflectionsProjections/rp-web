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
import { Event, EventType, path } from "@rp/shared";
import moment from "moment";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";

import {
  FaBriefcase,
  FaCheck,
  FaHandshake,
  FaMicrophone,
  FaStar,
  FaUtensils
} from "react-icons/fa";
import { AudioVisualizer } from "./AudioVisualizer";
import { RaceTrack } from "./RaceTrack";

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

  const [hoveredEventIndex, setHoveredEventIndex] = useState<number | null>(
    null
  );

  const handleHover = (index: number) => {
    setHoveredEventIndex(index);
  };

  const handleSelectDay = (date: string) => {
    setHoveredEventIndex(null);
    setSelectedDay(date);
  };

  return (
    <>
      <Box w="100%" justifyContent={"center"} bgColor="white" pb={10}>
        <Flex gap={10} maxWidth="1000px" mx="auto">
          {Object.keys(eventsByDay).map((date) => (
            <ScheduleDayButton
              key={date}
              date={date}
              selected={selectedDay === date}
              onSelect={handleSelectDay}
            />
          ))}
        </Flex>
        <Flex
          w="100%"
          maxWidth="1500px"
          justifyContent={"center"}
          bgColor="white"
          mt={5}
          mx="auto"
          gap={10}
          px={10}
        >
          <DayEvents
            selectedDayIndex={selectedDayIndex}
            dayEvents={dayEvents}
            onHover={handleHover}
          />
          <Flex flex={1} flexDirection={"column"} gap={5}>
            <Box flex={2} bgColor="gray.100" borderRadius="lg" p={5}>
              <Box w="100%" transform="scale(0.8)">
                <RaceTrack
                  dayEvents={dayEvents}
                  colors={circleColors}
                  hoveredIndex={hoveredEventIndex}
                />
              </Box>
            </Box>
            <Box
              flex={1}
              maxH="150px"
              bgColor="gray.200"
              borderRadius="lg"
              p={5}
            >
              <Flex alignItems={"center"} borderBottom="1px solid gray" pb={2}>
                <Text
                  flex={1}
                  fontSize="2xl"
                  fontWeight="bold"
                  fontStyle={"italic"}
                  color="gray.800"
                >
                  R|P RADIO
                </Text>
                <AudioVisualizer />
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

function ScheduleDayButton({
  date,
  selected,
  onSelect
}: {
  date: string;
  selected?: boolean;
  onSelect: (date: string) => void;
}) {
  return (
    <Box
      role="group"
      bgColor={selected ? "gray.400" : "gray.200"}
      borderRadius="lg"
      p={2}
      onClick={() => onSelect(date)}
      transition="all 0.2s"
      _hover={{
        bgColor: selected ? "gray.400" : "gray.200",
        cursor: "pointer",
        transform: "scale(1.05)"
      }}
      _active={{ bgColor: selected ? "gray.400" : "gray.300" }}
      _focus={{ boxShadow: "outline" }}
      transform={selected ? "scale(1.05)" : "scale(1)"}
    >
      <Box
        flex={1}
        bgColor={selected ? "gray.400" : "gray.200"}
        borderRadius="lg"
        border="2px solid white"
        textAlign="center"
        textColor="black"
        px={10}
        py={3}
        /* add transform + transition */
        transition="all 0.2s, transform 0.2s"
        /* sync hover/active with outer box */
        _groupHover={{ bgColor: selected ? "gray.400" : "gray.200" }}
        _groupActive={{ bgColor: selected ? "gray.400" : "gray.300" }}
        _focus={{ boxShadow: "outline" }}
      >
        <Text
          fontFamily="Racing Sans One"
          textColor={selected ? "black" : "gray.400"}
          _groupHover={{ textColor: selected ? "black" : "gray.500" }}
          transition="all 0.2s, transform 0.2s"
        >
          {date}
        </Text>
      </Box>
    </Box>
  );
}

function DayEvents({
  selectedDayIndex,
  dayEvents,
  onHover
}: {
  selectedDayIndex: number;
  dayEvents: Event[];
  onHover: (index: number) => void;
}) {
  return (
    <Box flex={1}>
      <Box w="100%" bgColor="gray.200" py={2} borderRadius="md">
        <Flex justifyContent={"center"}>
          <Text
            color="gray.800"
            fontSize="3xl"
            fontStyle="italic"
            fontWeight={"thin"}
            mr={2}
          >
            LAP
          </Text>
          <Text
            color="gray.800"
            fontSize="3xl"
            fontWeight="bold"
            fontStyle={"italic"}
          >
            {selectedDayIndex}
          </Text>
          <Text
            color="gray.800"
            fontSize="3xl"
            fontStyle="italic"
            fontWeight={"thin"}
          >
            /5
          </Text>
        </Flex>
      </Box>
      <Box
        w="100%"
        bgColor="gray.200"
        py={2}
        mt={3}
        borderRadius="md"
        h="70vh"
        overflowY={"auto"}
      >
        {dayEvents.map((event, index) => (
          <DayEvent
            key={index}
            number={index + 1}
            event={event}
            onHover={onHover}
          />
        ))}
      </Box>
    </Box>
  );
}

export const EVENT_ICONS: Record<EventType, IconType> = {
  SPECIAL: FaStar, // star for special events
  SPEAKER: FaMicrophone, // microphone for speaker sessions
  CORPORATE: FaBriefcase, // briefcase for corporate events
  PARTNERS: FaHandshake, // handshake for partners
  MEALS: FaUtensils, // utensils for meal breaks
  CHECKIN: FaCheck // checkmark for check-in
};

function DayEvent({
  number,
  event,
  onHover
}: {
  number: number;
  event: Event;
  onHover: (index: number) => void;
}) {
  return (
    <Grid
      px={5}
      py={3}
      templateColumns="20px 30px 1fr 150px 40px"
      alignItems="center"
      gap={5}
      _hover={{
        bgColor: "gray.300",
        cursor: "pointer"
      }}
      transition={"all 0.2s"}
      onMouseEnter={() => {
        onHover(number);
      }}
    >
      <Text
        fontSize="2xl"
        color="gray.800"
        fontWeight="thin"
        textAlign="center"
      >
        {number}
      </Text>

      <Box
        w="30px"
        h="30px"
        borderRadius="full"
        bg={circleColors[(number - 1) % circleColors.length]}
      />

      <Box>
        <Text fontSize="lg" color="gray.800">
          {event.name}
        </Text>
        <Text fontSize="md" color="gray.600">
          {event.location}
        </Text>
      </Box>

      <Text fontSize="md" color="gray.600" fontWeight="medium">
        {moment(event.startTime).format("h:mm A")} –{" "}
        {moment(event.endTime).format("h:mm A")}
      </Text>

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
            color="gray.600"
            boxSize={6}
          />
        </Flex>
      </Tooltip>
    </Grid>
  );
}
