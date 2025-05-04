import {
  Flex,
  Box,
  Stack,
  StatGroup,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Badge,
  Text,
  Image,
  Center,
  CardFooter
} from "@chakra-ui/react";

import rpLogo from "../../assets/rp_logo.svg";
import StatusMonitor from "../../components/StatusMonitor";
import { useEffect, useState } from "react";
import moment from "moment-timezone";
import api from "../../util/api";
import StatCard from "@/components/StatCard";

const readable = "MMMM Do YYYY, h:mm a";

function convertToCST(date: string) {
  const m = moment.utc(date);
  m.tz("America/Chicago");
  return m;
}

function EventCard({
  event
}: {
  event: {
    eventId: string;
    name: string;
    startTime: string;
    endTime: string;
    points: number;
    description: string;
    isVirtual: boolean;
    imageUrl: string;
    location: string;
    eventType: string;
    isVisible: boolean;
  };
}) {
  return (
    <Card maxW="sm" key={event.eventId}>
      <CardBody>
        <Center>
          <Image src={rpLogo} alt={event.name} borderRadius="lg" maxW="15vw" />
        </Center>
        <Stack mt="6" spacing="3">
          <Heading size="md"> {event.name}</Heading>
          <Badge
            borderRadius="full"
            px="2"
            colorScheme={event.isVirtual ? "green" : "blue"}
          >
            {event.isVirtual ? "Virtual" : "In-person"}
          </Badge>
          <Text>
            {convertToCST(event.startTime).format(readable)} -{" "}
            {convertToCST(event.endTime).format(readable)}
          </Text>
          <Text>
            (
            {moment
              .duration(
                convertToCST(event.endTime).diff(convertToCST(event.startTime))
              )
              .humanize()}
            )
          </Text>
          <Text>Points: {event.points}</Text>
          <Text>{event.description}</Text>
        </Stack>
      </CardBody>

      <CardFooter>
        <Flex justifyContent="space-between" width="100%"></Flex>
      </CardFooter>
    </Card>
  );
}

function Dashboard() {
  const [currentEvent, setCurrentEvent] = useState<{
    eventId: string;
    name: string;
    startTime: string;
    endTime: string;
    points: number;
    description: string;
    isVirtual: boolean;
    imageUrl: string;
    location: string;
    eventType: string;
    isVisible: boolean;
  } | null>(null);
  const [name, setName] = useState("");

  useEffect(() => {
    api
      .get("/auth/info")
      .then((response) => {
        setName(response.data.displayName);
      })
      .catch((error) => {
        console.log(error);
      });
    // Promise.allSettled([
    //   api.get("/events/currentOrNext")
    //   // api.get("/stats/check-in"),
    //   // api.get("/stats/priority-attendee")
    // ])
    //   .then(([event /*, checkIn, priority*/]) => {
    //     if (event.status === "fulfilled") {
    //       setCurrentEvent(event.value.data);
    //     } else {
    //       console.log(event.reason);
    //       showToast("Error fetching event", true);
    //     }

    //     // if (checkIn.status === "fulfilled") {
    //     //   setStats(checkIn.value.data.count);
    //     // } else {
    //     //   console.log(checkIn.reason);
    //     //   showToast("Error fetching check-in stats", true);
    //     // }

    //     // if (priority.status === "fulfilled") {
    //     //   setStatus(priority.value.data.count);
    //     // } else {
    //     //   console.log(priority.reason);
    //     //   showToast("Error fetching priority stats", true);
    //     // }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     showToast("Error fetching stats", true);
    //   });
  }, []);

  return (
    <Box p={4}>
      <Heading size="2xl" fontWeight="bold" mb={4} textAlign="left">
        {name == "" ? "Welcome!" : `Welcome, ${name}!`}
      </Heading>

      <Flex direction={{ base: "column", md: "row" }} justify="space-between">
        <Box flex="1" mr={{ base: 0, md: 2 }}>
          <Card>
            <CardHeader>
              <Heading size="lg">Overall Stats</Heading>
            </CardHeader>
            <CardBody>
              <StatGroup gap={4}>
                <StatCard
                  label={"Checked-In"}
                  endpoint={"/stats/check-in"}
                  transformer={(data) => {
                    return data.count;
                  }}
                />
                <StatCard
                  label={"Priority Status"}
                  endpoint={"/stats/priority-attendee"}
                  transformer={(data) => {
                    return data.count;
                  }}
                />
              </StatGroup>
              <StatusMonitor />
            </CardBody>
          </Card>
        </Box>

        <Box flex="1" ml={{ base: 0, md: 2 }} mt={{ base: 4, md: 0 }}>
          <Card alignItems={"center"}>
            <CardHeader>
              <Heading size="lg">Upcoming Events</Heading>
            </CardHeader>
            <CardBody>
              {/* Add content for Events here */}
              <EventCard
                event={{
                  eventId: currentEvent?.eventId || "1",
                  name: currentEvent?.name || "Sample Event",
                  startTime: currentEvent?.startTime || "2025-03-01T10:00:00Z",
                  endTime: currentEvent?.endTime || "2025-03-01T12:00:00Z",
                  points: currentEvent?.points || 0,
                  description:
                    currentEvent?.description ||
                    "This is a sample event description.",
                  isVirtual: currentEvent?.isVirtual || true,
                  imageUrl: currentEvent?.imageUrl || "",
                  location: currentEvent?.location || "Online",
                  eventType: currentEvent?.eventType || "Webinar",
                  isVisible: currentEvent?.isVisible || true
                }}
              />
              <br />
              Details about upcoming events will go here.
            </CardBody>
          </Card>
        </Box>
      </Flex>
    </Box>
  );
}

export default Dashboard;
