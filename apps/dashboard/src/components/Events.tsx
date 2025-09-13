import {
  Box,
  Flex,
  Grid,
  Icon,
  Text,
  Tooltip,
  useToast
} from "@chakra-ui/react";
import { api, Event } from "@rp/shared";
import moment from "moment";
import { useEffect, useState } from "react";

import { CIRCLE_COLORS } from "@/constants/colors";
import { EVENT_ICONS } from "@/constants/event-icons";

type EventSelected = Event & {
  selected?: boolean;
};

type EventsProps = {
  date?: Date;
};

export default function Events({ date }: EventsProps) {
  const toast = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [displayedEvents, setDisplayedEvents] = useState<EventSelected[]>([]);

  const fetchData = async () => {
    try {
      const events = await api.get("/events");
      setEvents(events.data);
    } catch (err: unknown) {
      console.error(err);
      toast({
        title: `Error fetching events`,
        status: "error",
        duration: 9000,
        isClosable: true
      });
    }
  };

  const handleUpdateData = () => {
    if (!date) return;
    const grouped: { [key: string]: Event[] } = {};
    events.forEach((evt) => {
      const eventDate = moment(evt.startTime).format("M/D");
      if (!grouped[eventDate]) grouped[eventDate] = [];
      grouped[eventDate].push(evt);
    });

    const groupKeys = Object.keys(grouped).sort((a, b) => {
      // Sort by month and day, e.g. "9/11" -> 9, 11
      const [aM, aD] = a.split("/").map(Number);
      const [bM, bD] = b.split("/").map(Number);
      if (aM !== bM) return aM - bM;
      return aD - bD;
    });

    const currentDate = moment(date).format("M/D");

    let newDisplayedEvents: EventSelected[] = [];

    if (grouped[currentDate]) {
      newDisplayedEvents = grouped[currentDate];
    } else {
      // Compare currentDate to the last groupKey
      const lastKey = groupKeys[groupKeys.length - 1];
      const isAfterLast = moment(currentDate, "M/D").isAfter(
        moment(lastKey, "M/D")
      );
      if (isAfterLast) {
        newDisplayedEvents = grouped[lastKey];
      } else {
        // Default to the first group (the earliest date)
        newDisplayedEvents = grouped[groupKeys[0]];
      }
    }

    newDisplayedEvents = (newDisplayedEvents || []).map((evt) => {
      return {
        ...evt,
        selected:
          moment(evt.startTime).isSameOrBefore(moment(date)) &&
          moment(evt.endTime).isAfter(moment(date))
      };
    });


    setDisplayedEvents(newDisplayedEvents);
  };

  useEffect(() => {
    void fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast]);

  useEffect(() => {
    void handleUpdateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events, date]);

  return (
    <Box float={"right"} width={"100%"}>
      <Text
        w="100%"
        fontSize={"3xl"}
        fontWeight="bold"
        color="white"
        fontFamily="ProRacingSlant"
        textAlign="center"
        mb={3}
      >
        Events
      </Text>
      <Flex
        marginTop={"0.5rem"}
        justifyContent="center"
        flexDirection={{ md: "column-reverse", lg: "row" }}
        mx="auto"
        gap={0}
        position="relative" /* ensure content sits above accent */
        zIndex={1}
      >
        <Box flex={1} h="100%" py={0}>
          <Box
            overflowY={{ md: "auto" }}
            shadow={"md"}
            boxShadow="md"
            bgColor={"rgba(0,0,0,0.2)"}
            borderRadius={"1rem"}
            py={3}
          >
            <Box
              overflowY="auto"
              height={"100%"}
              gap={3}
              display="flex"
              flexDirection={"column"}
              px={2}
            >
              {events.length === 0 && (
                <Text
                  fontSize="xl"
                  color="gray.500"
                  fontFamily="Racing Sans One"
                  textAlign="center"
                >
                  No events scheduled yet.
                </Text>
              )}
              {displayedEvents &&
                displayedEvents.map((event, index) => (
                  <DayEvent
                    key={index}
                    number={index + 1}
                    event={event}
                    selected={event.selected}
                  />
                ))}
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

function DayEvent({
  number,
  event,
  selected
}: {
  number: number;
  event: Event;
  selected?: boolean;
}) {
  return (
    <Grid
      px={{
        base: 3,
        md: 5
      }}
      pt={number === 0 ? 6 : 0}
      py={3}
      templateColumns={{
        base: "12px 8px 1fr 40px",
        md: "20px 10px 1fr 40px"
      }}
      alignItems="right"
      gap={{
        base: 2,
        md: 3
      }}
      backgroundColor={selected ? "rgba(255,255,255,0.2)" : undefined}
      borderRadius={selected ? "0.5rem" : undefined}
      _first={{
        paddingTop: "calc(3px + 0.5rem)",
        borderTopRadius: "0.5rem"
      }}
      _last={{
        paddingBottom: "calc(3px + 0.5rem)",
        borderBottomRadius: "0.5rem"
      }}
      transition={"all 0.2s"}
      sx={{
        backdropFilter: "blur(3px)",
        WebkitBackdropFilter: "blur(3px)" // for Safari
        // optional: add a slight border and drop shadow
      }}
    >
      <Box
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
        w={"10px"}
        borderRadius="sm"
      >
        <Text
          fontSize={"xl"}
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
        h="100%"
        bg={CIRCLE_COLORS[(number - 1) % CIRCLE_COLORS.length]}
        boxShadow="md"
        borderRadius="sm"
      ></Box>

      <Flex flexDirection={"column"} gap={0} width={"fit-content"}>
        <Text
          fontSize={"xl"}
          color="white"
          fontFamily={"ProRacing"}
          transformOrigin={"top left"}
        >
          {event.name}
        </Text>

        <Flex
          flexDirection={{
            base: "column",
            md: "row"
          }}
          gap={0}
          width={"fit-content"}
        >
          <Text
            fontSize={"lg"}
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
            fontSize={"lg"}
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
        fontFamily="Magistral"
        fontSize="lg"
        fontWeight={600}
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
