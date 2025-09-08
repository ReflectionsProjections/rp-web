import {
  Box,
  Flex,
  Grid,
  Heading,
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

export default function Events() {
  const toast = useToast();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    api
      .get("/events")
      .then((events) => {
        const grouped: { [key: string]: Event[] } = {};
        events.data.forEach((evt) => {
          const date = moment(evt.startTime).format("M/D");
          if (!grouped[date]) grouped[date] = [];
          grouped[date].push(evt);
        });
        const currentDate = moment(Date.now()).format("M/D");
        if (currentDate in grouped) {
          setEvents(grouped[currentDate]);
        } else {
          // Default to first date if we don't have any events right now
          setEvents(grouped[Object.keys(grouped)[0]]);
        }
      })
      .catch((err) => {
        console.error(err);
        toast({
          title: `Error fetching events: ${err}`,
          status: "error",
          duration: 9000,
          isClosable: true
        });
        console.error(err);
        setTimeout(() => location.reload(), 10 * 1000);
      });
  }, [toast]);

  return (
    <Box float={"right"} width={"fit-content"}>
      <Heading textAlign={"center"}>Events</Heading>
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
          <Box pb={5} overflowY={{ md: "auto" }} shadow={"md"} boxShadow="md">
            <Box overflowY="auto" height={"100%"}>
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
              {events.map((event, index) => (
                <DayEvent
                  key={index}
                  backgroundColor={index % 2 === 0 ? "#2c2c2cff" : "#3f3f3fff"}
                  number={index + 1}
                  event={event}
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
  backgroundColor,
  number,
  event
}: {
  backgroundColor: string;
  number: number;
  event: Event;
}) {
  return (
    <Grid
      px={{
        base: 3,
        md: 5
      }}
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
      backgroundColor={backgroundColor}
      _first={{
        paddingTop: "calc(3px + 0.5rem)",
        borderTopRadius: "0.5rem"
      }}
      _last={{
        paddingBottom: "calc(3px + 0.5rem)",
        borderBottomRadius: "0.5rem"
      }}
      _hover={{
        bgColor: "#4D4C4C",
        cursor: "pointer"
      }}
      transition={"all 0.2s"}
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
        h="100%"
        bg={CIRCLE_COLORS[(number - 1) % CIRCLE_COLORS.length]}
        boxShadow="md"
        borderRadius="sm"
      ></Box>

      <Flex flexDirection={"column"} gap={0} width={"fit-content"}>
        <Text
          fontSize={{ base: "xl", md: "2xl" }}
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
            fontSize={{ base: "md", md: "xl" }}
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
            fontSize={{ base: "md", md: "xl" }}
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
