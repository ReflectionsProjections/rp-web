import {
  Box,
  Flex,
  Grid,
  HStack,
  Icon,
  Image,
  Spacer,
  Text,
  Tooltip,
  useToast
} from "@chakra-ui/react";
import { api, Event, path } from "@rp/shared";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";

import { CIRCLE_COLORS } from "@/constants/colors";
import { EVENT_ICONS } from "@/constants/event-icons";
import EventModal from "./EventModal";
import { RaceTrack } from "./RaceTrack";
import ScheduleDaySelector from "./ScheduleDaySelector";
import { AnimatedHeader } from "../shared/AnimatedHeader";
import { AudioVisualizer } from "./AudioVisualizer";

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

  const [currentEvents, setCurrentEvents] = useState<Event[]>([]);
  const [nextEvent, setNextEvent] = useState<Event | null>(null);

  const selectedDayIndex = Math.max(
    Object.keys(eventsByDay).indexOf(selectedDay || "") + 1,
    1
  );
  const dayEvents = selectedDay ? eventsByDay[selectedDay] : [];

  const handleLoadEvents = useCallback(() => {
    api
      .get(path("/events", {}))
      .then((events) => {
        const grouped: { [key: string]: Event[] } = {};
        events.data.forEach((evt) => {
          const date = moment(evt.startTime).format("ddd M/D");
          if (!grouped[date]) grouped[date] = [];
          grouped[date].push(evt);
        });

        setEventsByDay(grouped);

        const dates = Object.keys(grouped).map((key) => {
          const date = moment(
            key + " " + moment().year(),
            "ddd M/D YYYY"
          ).startOf("day");
          return { key, date };
        });

        dates.sort((a, b) => a.date.valueOf() - b.date.valueOf());

        const today = moment();
        let selectedKey: string;

        if (today.isBefore(dates[0].date)) {
          selectedKey = dates[0].key;
        } else {
          const past = dates.filter((d) => today.isSameOrAfter(d.date));
          selectedKey = past.length ? past[past.length - 1].key : dates[0].key;
        }

        setSelectedDay(selectedKey);
      })
      .catch((err) => {
        console.error(err);
        toast({
          title: "Error fetching events",
          status: "error",
          duration: 9000,
          isClosable: true
        });
      });
  }, [toast]);

  useEffect(() => {
    handleLoadEvents();
  }, [handleLoadEvents]);

  const handleHover = (index: number) => setHoveredEventIndex(index);
  const handleSelectDay = (date: string) => {
    setHoveredEventIndex(null);
    setSelectedDay(date);
  };
  const handleSelectEvent = (evt: Event) => setSelectedEvent(evt);

  const updateCurrentAndNext = useCallback(() => {
    const all = Object.values(eventsByDay).flat();
    const sorted = all.sort((a, b) =>
      moment(a.startTime).diff(moment(b.startTime))
    );

    const now = moment();
    const currentEvents: Event[] = [];
    let nxt: Event | null = null;

    for (const evt of sorted) {
      const start = moment(evt.startTime);
      const end = moment(evt.endTime);

      if (start.isSameOrBefore(now) && end.isAfter(now)) {
        currentEvents.push(evt);
        continue;
      }
      if (!nxt && start.isAfter(now)) {
        nxt = evt;
        break;
      }
    }

    setCurrentEvents(currentEvents);
    setNextEvent(nxt);
  }, [eventsByDay]);

  useEffect(() => {
    updateCurrentAndNext();
    const timer = setInterval(() => {
      updateCurrentAndNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [updateCurrentAndNext, eventsByDay]);

  return (
    <>
      <Box
        position="relative"
        w="100%"
        bgColor="#100E0E"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        py={{ base: 5, md: 10 }}
        id="schedule"
      >
        <Image
          src="/schedule/schedule-accent.svg"
          position="absolute"
          top={{ base: "-15%", lg: "-50%" }}
          left={{ base: "-25%", lg: "-10%" }}
          opacity={0.5}
          pointerEvents="none"
        />

        <Box position="relative" zIndex={1}>
          <AnimatedHeader zIndex={1}>Schedule</AnimatedHeader>
          <ScheduleDaySelector
            selectedDay={selectedDay}
            eventsByDay={eventsByDay}
            onSelectDay={handleSelectDay}
          />
        </Box>

        <Flex
          w="100%"
          maxWidth="1500px"
          justifyContent="center"
          flexDirection={{ md: "column-reverse", lg: "row" }}
          mt={{ base: 5, md: 5 }}
          mx="auto"
          gap={0}
          px={{ base: 3, md: 10 }}
          position="relative"
          zIndex={1}
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
            currentEvents={currentEvents}
            nextEvent={nextEvent}
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

function formatEventTime(iso: string): string {
  const m = moment(iso);
  const now = moment();

  if (m.isSame(now, "day")) {
    return m.format("h:mma");
  }
  if (Math.abs(m.diff(now, "days")) <= 7) {
    return m.calendar(null, {
      sameDay: "[Today] h:mma",
      nextDay: "[Tomorrow] h:mma",
      nextWeek: "dddd h:mma",
      lastDay: "[Yesterday] h:mma",
      lastWeek: "[Last] dddd h:mma",
      sameElse: "MMM D, h:mma"
    });
  }
  return m.format("MMM D, h:mma");
}

function formatEventRange(startIso: string, endIso: string): string {
  const start = moment(startIso);
  const end = moment(endIso);

  const startLabel = formatEventTime(startIso);

  const endLabel = start.isSame(end, "day")
    ? end.format("h:mma")
    : formatEventTime(endIso);

  return `${startLabel} – ${endLabel}`;
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
        display={{
          base: "none",
          lg: "flex"
        }}
        alignItems={"center"}
        justifyContent={"center"}
        gap={3}
        bgColor="#4D4C4C"
        borderTopRadius={"xl"}
        mb={3}
        py={2}
        boxShadow="md"
      >
        <Text
          fontSize={"3xl"}
          color="#8A8A8A"
          fontFamily="ProRacingSlant"
          my={0}
        >
          Lap
        </Text>
        <HStack gap={0}>
          <Text
            fontSize={"3xl"}
            fontWeight="bold"
            color="white"
            fontFamily="Magistral"
            my={0}
          >
            {selectedDayIndex}
          </Text>
          <Text fontSize={"3xl"} color="#8A8A8A" fontFamily="Magistral" my={0}>
            /{numDays}
          </Text>
        </HStack>
      </HStack>
      <Box
        bgColor={{ md: "#242424" }}
        pb={5}
        borderTopRadius={{
          base: "xl",
          lg: "none"
        }}
        borderBottomRadius="xl"
        overflowY={{ md: "auto" }}
        shadow={"md"}
        boxShadow="md"
      >
        <Box h={{ lg: "500px" }} maxH={{ lg: "500px" }} pt={3} overflowY="auto">
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
              lastIndex={dayEvents.length}
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
  handleSelectEvent,
  currentEvents,
  nextEvent
}: {
  selectedDayIndex: number;
  dayEvents: Event[];
  hoveredEventIndex: number | null;
  currentEvents: Event[];
  nextEvent: Event | null;
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
            colors={CIRCLE_COLORS}
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
              fontSize="2xl"
              color="white"
              fontFamily="ProRacingSlant"
              my={0}
            >
              R|P Radio
            </Text>
            <AudioVisualizer />
          </Flex>
          <Flex
            w="100%"
            gap={2}
            flexDir={{
              base: "column",
              md: "row"
            }}
          >
            {currentEvents.length === 0 && !nextEvent && (
              <Text color="white" fontFamily="Magistral">
                No ongoing events.
              </Text>
            )}
            {currentEvents.length > 0 && (
              <>
                {currentEvents.length > 0 &&
                  currentEvents.map((event, index) => (
                    <Box flex={1}>
                      <PreviewEvent
                        label="Current"
                        event={event}
                        showLabel={index === 0}
                        onClick={() => {
                          handleSelectEvent(event);
                        }}
                      />
                    </Box>
                  ))}
              </>
            )}
            {nextEvent && (
              <Box
                flex={1}
                gap={2}
                display="flex"
                flexDir={"column"}
                justifyContent={"space-between"}
              >
                <PreviewEvent
                  showLabel
                  label="Next Up"
                  event={nextEvent}
                  onClick={() => {
                    handleSelectEvent(nextEvent);
                  }}
                />
              </Box>
            )}
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

function DayEvent({
  number,
  hoveredIndex,
  lastIndex,
  event,
  onHover,
  onClick
}: {
  number: number;
  hoveredIndex: number | null;
  lastIndex: number;
  event: Event;
  onHover: (index: number) => void;
  onClick: (event: Event) => void;
}) {
  // Check if this is Sue's keynote event
  const isSueKeynote =
    event.name.toLowerCase().includes("sue") &&
    event.eventType.toLowerCase() === "speaker";
  return (
    <Grid
      w="100%"
      px={{
        base: 3,
        md: 5
      }}
      py={2}
      templateColumns={{
        base: "12px 8px 1fr 40px",
        md: "20px 10px 1fr 40px"
      }}
      alignItems="center"
      bgColor={hoveredIndex === number ? "#333131" : "#242424"}
      borderTopRadius={{
        base: number === 1 ? "xl" : "none",
        md: "none"
      }}
      borderBottomRadius={{
        base: lastIndex === number ? "xl" : "none",
        md: "none"
      }}
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
          md: "7px"
        }}
        h="50px"
        bg={CIRCLE_COLORS[(number - 1) % CIRCLE_COLORS.length]}
        boxShadow="md"
        borderRadius="sm"
      ></Box>

      <Flex flexDirection={"column"} gap={0}>
        <Text
          fontSize={{ base: "xl", md: "lg" }}
          color="white"
          fontFamily={"ProRacing"}
          transformOrigin={"top left"}
          w="100%"
          // Keynote speaker text glow
          textShadow={isSueKeynote ? "0 0 10px rgba(255, 215, 0, 0.8)" : "none"}
        >
          {isSueKeynote ? `★ ${event.name}` : event.name}
        </Text>

        <Flex
          flexDirection={{
            base: "column",
            md: "row"
          }}
          gap={0}
        >
          <Text
            fontSize={{ base: "md", md: "md" }}
            color="gray.100"
            fontWeight="bold"
            fontFamily="Magistral"
            letterSpacing="0.5px"
            transformOrigin={"top left"}
            wordBreak="break-all"
            whiteSpace="normal"
            mr={3}
          >
            {event.location || "Siebel CS"}
          </Text>

          <Text
            fontSize={{ base: "md", md: "md" }}
            color="gray.400"
            fontWeight="bold"
            fontFamily="Magistral"
            letterSpacing="0.5px"
            transformOrigin={"top left"}
            whiteSpace={{
              md: "nowrap"
            }}
          >
            {formatEventRange(event.startTime, event.endTime)}
          </Text>
        </Flex>
      </Flex>

      <Tooltip
        label={event.eventType
          .toLowerCase()
          .replace(/^\w/, (c) => c.toUpperCase())}
        fontFamily="Magistral"
        fontSize="lg"
        fontWeight={600}
        placement="top"
        hasArrow
      >
        <Flex w="30px" h="30px" justifyContent={"center"} alignItems={"center"}>
          <Icon
            as={EVENT_ICONS[event.eventType]}
            color={isSueKeynote ? "gold" : "yellow.500"}
            boxSize={6}
            filter={
              isSueKeynote
                ? "drop-shadow(0 0 8px rgba(255, 215, 0, 0.8))"
                : "none"
            }
          />
        </Flex>
      </Tooltip>
    </Grid>
  );
}

function PreviewEvent({
  label,
  event,
  showLabel,
  compact,
  onClick
}: {
  label: string;
  event: Event;
  showLabel?: boolean;
  compact?: boolean;
  onClick: (event: Event) => void;
}) {
  return (
    <Box w="100%" display="flex" flexDirection={"column"} gap={1}>
      <Box h={5} pb={2}>
        {showLabel && (
          <Text color="white" fontFamily="Magistral" fontSize={"md"}>
            {label}
          </Text>
        )}
      </Box>
      <Flex
        alignItems={"center"}
        bgColor={"#1e1e1eff"}
        borderRadius={"lg"}
        p={2}
        onClick={() => {
          onClick(event);
        }}
        transition="all 0.2s ease-in-out"
        _hover={{
          bgColor: "rgba(72, 72, 72, 1)",
          cursor: "pointer"
        }}
      >
        <Flex direction="column" flex={1} w="100%" gap={0}>
          <Flex alignItems={"center"} gap={2}>
            <Box
              w={compact ? "10px" : "10px"}
              h={compact ? "10px" : "10px"}
              minW="10px"
              minH="10px"
              bg={label === "Current" ? "green.500" : "red.500"}
              borderRadius="full"
            />
            <Text
              fontSize={compact ? "md" : "sm"}
              color="white"
              fontFamily="ProRacing"
            >
              {event.name}
            </Text>
          </Flex>
          {!compact ? (
            <Flex direction="column" gap={0}>
              <Text
                fontSize={{ base: "md", md: "sm" }}
                color="gray.100"
                fontWeight="bold"
                fontFamily="Magistral"
                letterSpacing="0.5px"
                transformOrigin={"top left"}
                wordBreak="break-all"
                whiteSpace="normal"
                mr={3}
              >
                {event.location || "Siebel CS"}
              </Text>

              <Text
                fontSize={{ base: "md", md: "sm" }}
                color="gray.400"
                fontWeight="bold"
                fontFamily="Magistral"
                letterSpacing="0.5px"
                transformOrigin={"top left"}
                whiteSpace={{
                  md: "nowrap"
                }}
              >
                {formatEventRange(event.startTime, event.endTime)}
              </Text>
            </Flex>
          ) : (
            <></>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
