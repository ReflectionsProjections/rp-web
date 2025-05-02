import { Box, Flex, Text, useToast } from "@chakra-ui/react";
import { Event, path } from "@rp/shared";
import moment from "moment";
import { useEffect, useState } from "react";
import api from "@/util/api";

export default function Schedule() {
  const toast = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsByDay, setEventsByDay] = useState<{ [key: string]: Event[] }>(
    {}
  );
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const handleLoadEvents = () => {
    api
      .get(path("/events", {}))
      .then((events) => {
        setEvents(events.data);
        const eventsByDay: { [key: string]: Event[] } = {};
        events.data.forEach((event) => {
          const date = moment(event.startTime).format("ddd M/D");
          if (!eventsByDay[date]) {
            eventsByDay[date] = [];
          }
          eventsByDay[date].push(event);
        });
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

  const handleSelectDay = (date: string) => {
    setSelectedDay(date);
  };

  useEffect(() => {
    handleLoadEvents();
  }, []);

  return (
    <>
      <Box w="100%" justifyContent={"center"} bgColor="white">
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
        {events.length}
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
      _hover={{ bgColor: selected ? "gray.400" : "gray.300" }}
      _active={{ bgColor: selected ? "gray.500" : "gray.400" }}
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
        _groupHover={{ bgColor: selected ? "gray.400" : "gray.300" }}
        _groupActive={{ bgColor: selected ? "gray.500" : "gray.400" }}
        _focus={{ boxShadow: "outline" }}
      >
        <Text fontWeight="bold">{date}</Text>
      </Box>
    </Box>
  );
}
