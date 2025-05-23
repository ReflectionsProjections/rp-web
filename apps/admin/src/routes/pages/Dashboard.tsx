import {
  Flex,
  Box,
  StatGroup,
  CardHeader,
  Heading,
  CardBody
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import api from "../../util/api";
import StatCard from "@/components/StatCard";
import { motion } from "framer-motion";
import { usePolling } from "@rp/shared";
import EventCard from "@/components/EventCard";
import Section from "@/components/Section";
import { useMirrorStyles } from "@/styles/Mirror";

const MotionHeader = motion(Heading);

function Dashboard() {
  const { data: currentEvent } = usePolling(api, "/events/currentOrNext");
  const [name, setName] = useState("");
  const mirrorStyle = useMirrorStyles(true);

  useEffect(() => {
    api
      .get("/auth/info")
      .then((response) => {
        setName(response.data.displayName);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Box p={4}>
      <MotionHeader
        size="2xl"
        fontWeight="bold"
        mb={4}
        textAlign="left"
        initial={{ opacity: 0 }}
        animate={
          name === ""
            ? {}
            : {
                opacity: 1,
                transition: {
                  opacity: { duration: 0.8, ease: "easeOut" }
                }
              }
        }
        backgroundSize="400%"
      >
        {name == "" ? "Welcome!" : `Welcome, ${name}!`}
      </MotionHeader>

      <Flex direction={{ base: "column", md: "row" }} justify="space-between">
        <Box flex="3" mr={{ base: 0, md: 2 }}>
          <Section>
            <CardHeader>
              <Heading size="lg">Overall Stats</Heading>
            </CardHeader>
            <CardBody display="flex" flexDir="column" gap={4}>
              <StatGroup gap={4}>
                <StatCard
                  label={"Checked-In"}
                  endpoint={"/stats/check-in"}
                  transformer={(data) => data.count}
                />
                <StatCard
                  label={"Priority Status"}
                  endpoint={"/stats/priority-attendee"}
                  transformer={(data) => data.count}
                />
              </StatGroup>
              <Box sx={mirrorStyle} height="50vh">
                <Heading>Imagine stuff here</Heading>
              </Box>
            </CardBody>
          </Section>
        </Box>

        <Box flex="1" ml={{ base: 0, md: 2 }} mt={{ base: 4, md: 0 }}>
          <Section alignItems="center" height="100%">
            <CardHeader>
              <Heading size="lg">Next Event</Heading>
            </CardHeader>
            <CardBody>
              <EventCard event={currentEvent} />
            </CardBody>
          </Section>
        </Box>
      </Flex>
    </Box>
  );
}

export default Dashboard;
