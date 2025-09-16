import {
  Text,
  Box,
  StatGroup,
  StatLabel,
  Stat,
  StatNumber,
  Card,
  Heading,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  CardHeader,
  Flex,
  HStack,
  Select,
  StackDivider,
  Stack,
  useBreakpointValue
} from "@chakra-ui/react";

import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

// Register Chart.js components
Chart.register(...registerables);

import { useMemo, useState } from "react";
import { path, usePolling } from "@rp/shared";
import StatCard from "@/components/StatCard";
import { useMirrorStyles } from "@/styles/Mirror";
import { useOutletContext } from "react-router-dom";
import { MainContext } from "../Main";

const eventTags = [
  "Career Readiness",
  "AI",
  "Research",
  "Interactive Events",
  "HCI",
  "Ethics",
  "Art/Media",
  "Autonomous Vehicles",
  "Networking",
  "Company Talk",
  "Cybersecurity"
];

function Stats() {
  const { authorized } = useOutletContext<MainContext>();

  const [minNumEvents, setMinNumEvents] = useState(0);
  const [eventId, setEventId] = useState("");
  const [tagName, setTagName] = useState<string>("");

  const mirrorStyles = useMirrorStyles(true);
  // const { data: pastAttendanceData, isLoading: pastAttendanceLoading } =
  //   usePolling(path("/stats/attendance/:n", { n: numEvents }), authorized);
  const { data: events, isLoading: eventsLoading } = usePolling(
    "/events",
    authorized
  );
  const { data: eventAttendanceData, isLoading: eventAttendanceLoading } =
    usePolling(
      path("/stats/event/:EVENT_ID/attendance", { EVENT_ID: eventId }),
      authorized
    );
  const { data: numAttendedEventsData, isLoading: numAttendedEventsLoading } =
    usePolling(
      path("/stats/attended-at-least/:N", { N: minNumEvents }),
      authorized
    );
  const { data: tagInterestData, isLoading: tagInterestLoading } = usePolling(
    "/stats/tag-counts",
    authorized
  );
  const { data: tierCountsData, isLoading: tierCountsLoading } = usePolling(
    "/stats/tier-counts",
    authorized
  );
  const { data: prizesGivenData, isLoading: prizesGivenLoading } = usePolling(
    "/stats/merch-redemption-counts",
    authorized
  );
  const { data: dietaryRestrictions, isLoading: dietaryRestrictionsLoading } =
    usePolling("/stats/dietary-restrictions", authorized);

  const sortedAllergyCounts = useMemo(() => {
    if (!dietaryRestrictions) return dietaryRestrictions;
    return Object.entries(dietaryRestrictions?.allergyCounts).sort();
  }, [dietaryRestrictions]);

  const sortedDietaryRestrictionCounts = useMemo(() => {
    if (!dietaryRestrictions) return dietaryRestrictions;
    return Object.entries(dietaryRestrictions?.dietaryRestrictionCounts).sort();
  }, [dietaryRestrictions]);

  const responsiveStackDivider = useBreakpointValue({
    base: undefined, // no divider on small screens
    sm: <StackDivider />,
    md: undefined,
    lg: <StackDivider />
  });

  return (
    <>
      <Flex justifyContent="center" alignItems="center">
        <Heading size="lg">Stats</Heading>
      </Flex>
      <br />
      <StatGroup display="flex" flexDir="column" alignItems="center" gap={4}>
        <HStack w="100%" gap={4}>
          <StatCard
            label="Number Checked-In"
            endpoint="/stats/check-in"
            enabled={authorized}
            transformer={(data) => data.count}
          />
          <StatCard
            label="Total Registrations"
            endpoint="/stats/registrations"
            enabled={authorized}
            transformer={(data) => data.count}
          />
        </HStack>
        <HStack w="100%" gap={4}>
          <Stat sx={mirrorStyles}>
            <StatLabel
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              People eligible for prizes
            </StatLabel>
            <StatLabel>
              {tierCountsLoading ? (
                "-"
              ) : (
                <Stack
                  textAlign="center"
                  justifyContent="center"
                  spacing={{ base: 0, sm: 1, md: 0, lg: 3 }}
                  direction={{
                    base: "column",
                    sm: "row",
                    md: "column",
                    lg: "row"
                  }}
                  divider={responsiveStackDivider}
                  lineHeight="1.5rem"
                  mt={{ base: 0, sm: 4, md: 0, lg: 4 }}
                >
                  <Text>
                    shirts:{" "}
                    {(tierCountsData?.TIER1 ?? 0) +
                      (tierCountsData?.TIER2 ?? 0) +
                      (tierCountsData?.TIER3 ?? 0) +
                      (tierCountsData?.TIER4 ?? 0)}
                  </Text>
                  <Text>
                    key chains:{" "}
                    {(tierCountsData?.TIER2 ?? 0) +
                      (tierCountsData?.TIER3 ?? 0) +
                      (tierCountsData?.TIER4 ?? 0)}
                  </Text>
                  <Text>
                    squishies:{" "}
                    {(tierCountsData?.TIER3 ?? 0) +
                      (tierCountsData?.TIER4 ?? 0)}
                  </Text>
                  <Text>beanies: {tierCountsData?.TIER4 ?? 0}</Text>
                </Stack>
              )}
            </StatLabel>
          </Stat>
          <Stat sx={mirrorStyles}>
            <StatLabel
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              Physical prizes given out
            </StatLabel>
            <StatLabel>
              {prizesGivenLoading ? (
                "-"
              ) : (
                <Stack
                  textAlign="center"
                  justifyContent="center"
                  spacing={{ base: 0, sm: 1, md: 0, lg: 3 }}
                  direction={{
                    base: "column",
                    sm: "row",
                    md: "column",
                    lg: "row"
                  }}
                  divider={responsiveStackDivider}
                  lineHeight="1.5rem"
                  mt={{ base: 0, sm: 4, md: 0, lg: 4 }}
                >
                  <Text>shirts: {prizesGivenData?.TIER1 ?? 0}</Text>
                  <Text>key chains: {prizesGivenData?.TIER2 ?? 0}</Text>
                  <Text>squishies: {prizesGivenData?.TIER3 ?? 0}</Text>
                  <Text>beanies: {prizesGivenData?.TIER4 ?? 0}</Text>
                </Stack>
              )}
            </StatLabel>
          </Stat>
        </HStack>
        <HStack w="100%" gap={4}>
          <Stat sx={mirrorStyles}>
            <StatLabel
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={2}
              flexDirection={{
                base: "column",
                sm: "row",
                md: "column",
                lg: "row"
              }}
            >
              Attendance for
              <Select
                flex={1}
                maxW="fit-content"
                placeholder="event..."
                value={eventId}
                onChange={(event) => setEventId(event.target.value)}
              >
                {eventsLoading ? (
                  <></>
                ) : (
                  events?.map((event) => (
                    <option key={event.eventId} value={event.eventId}>
                      {event.name}
                    </option>
                  ))
                )}
              </Select>
            </StatLabel>
            <StatNumber mt={1}>
              {eventAttendanceLoading ? (
                "—"
              ) : (
                <Text>{eventAttendanceData?.attendanceCount ?? 0}</Text>
              )}
            </StatNumber>
          </Stat>
          <Stat sx={mirrorStyles}>
            <StatLabel
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={2}
              flexDirection={{
                base: "column",
                sm: "row",
                md: "column",
                lg: "row"
              }}
            >
              <Text>Interest in</Text>
              <Select
                flex={1}
                maxW="fit-content"
                placeholder="tag..."
                onChange={(event) => setTagName(event.target.value)}
              >
                {eventTags?.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </Select>
              <Text
                display={{ base: "none", sm: "block", md: "none", lg: "block" }}
              >
                events:
              </Text>
            </StatLabel>
            <StatNumber mt={1}>
              {tagInterestLoading ? (
                "—"
              ) : (
                <Text>
                  {tagInterestData ? (tagInterestData[tagName] ?? 0) : "x"}
                </Text>
              )}
            </StatNumber>
          </Stat>
        </HStack>
        <HStack w="100%" gap={4}>
          <Stat sx={mirrorStyles}>
            <StatLabel
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={2}
              flexDirection={{
                base: "column",
                sm: "row",
                md: "column",
                lg: "row"
              }}
            >
              <Text>People who have attended</Text>
              <Flex gap={2}>
                <NumberInput
                  size="sm"
                  maxW="100px"
                  value={minNumEvents}
                  onChange={(_, value) => setMinNumEvents(value)}
                  min={0}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Text>events:</Text>
              </Flex>
            </StatLabel>

            <StatNumber>
              {numAttendedEventsLoading
                ? "—"
                : (numAttendedEventsData?.count ?? 0)}
            </StatNumber>
          </Stat>
          <StatCard
            label="Priority Attendees"
            endpoint="/stats/priority-attendee"
            enabled={authorized}
            transformer={(data) => data.count}
          />
        </HStack>
        <Card sx={mirrorStyles} w="90%">
          <CardHeader>
            <b>Dietary Restrictions</b>
          </CardHeader>
          <StatGroup>
            <Stat>
              <StatLabel>Allergies</StatLabel>
              <StatNumber>
                {dietaryRestrictionsLoading
                  ? "—"
                  : dietaryRestrictions?.allergies}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Dietary Restrictions</StatLabel>
              <StatNumber>
                {dietaryRestrictionsLoading
                  ? "—"
                  : dietaryRestrictions?.dietaryRestrictions}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Both</StatLabel>
              <StatNumber>
                {dietaryRestrictionsLoading ? "—" : dietaryRestrictions?.both}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>None</StatLabel>
              <StatNumber>
                {dietaryRestrictionsLoading ? "—" : dietaryRestrictions?.none}
              </StatNumber>
            </Stat>
          </StatGroup>
          <Box mb={4}>
            <Heading size="md" mb={2} minWidth="40%">
              Allergy Breakdown
            </Heading>
            <Bar
              data={
                dietaryRestrictionsLoading
                  ? { labels: [], datasets: [] }
                  : {
                      labels: sortedAllergyCounts?.map((entry) => entry[0]),
                      datasets: [
                        {
                          label: "Allergies",
                          data: sortedAllergyCounts?.map((entry) => entry[1]),
                          backgroundColor: "rgba(75, 192, 192, 0.6)"
                        }
                      ]
                    }
              }
            />
          </Box>
          <Box>
            <Heading size="md" mb={2} minWidth="40%">
              Dietary Restrictions Breakdown
            </Heading>
            <Bar
              data={
                dietaryRestrictionsLoading
                  ? { labels: [], datasets: [] }
                  : {
                      labels: sortedDietaryRestrictionCounts?.map(
                        (entry) => entry[0]
                      ),
                      datasets: [
                        {
                          label: "Dietary Restrictions",
                          data: sortedDietaryRestrictionCounts?.map(
                            (entry) => entry[1]
                          ),
                          backgroundColor: "rgba(153, 102, 255, 0.6)"
                        }
                      ]
                    }
              }
            />
          </Box>
        </Card>
      </StatGroup>
    </>
  );
}

export default Stats;
