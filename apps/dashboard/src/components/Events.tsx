import { Box, Flex, Text, useToast } from "@chakra-ui/react";
import { api, Event, DayEvent } from "@rp/shared";
import moment from "moment";
import { useEffect, useState } from "react";

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
        fontSize={"2.5vh"}
        fontWeight="bold"
        color="white"
        fontFamily="ProRacingSlant"
        textAlign="center"
        mb={"1.5vh"}
      >
        Events
      </Text>
      <Flex
        marginTop={"0.5vh"}
        justifyContent="center"
        flexDirection="row"
        mx="auto"
        position="relative" /* ensure content sits above accent */
        zIndex={1}
      >
        <Box flex={1} h="100%" py={0}>
          <Box
            shadow={"md"}
            boxShadow="md"
            bgColor={"rgba(0,0,0,0.2)"}
            borderRadius={"1vh"}
            py={"1vh"}
          >
            <Box
              overflowY="auto"
              height={"100%"}
              gap={"1vh"}
              display="flex"
              flexDirection={"column"}
              px={"1vh"}
            >
              {events.length === 0 && (
                <Text
                  fontSize="xl"
                  color="gray.500"
                  fontFamily="Magistral"
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
                    variant="dashboard"
                  />
                ))}
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

{
  /* DayEvent component moved to shared library */
}
