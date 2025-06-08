import {
  Box,
  StatGroup,
  StatLabel,
  Stat,
  StatNumber,
  StatHelpText,
  Card,
  Heading,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  CardHeader,
  Flex,
  HStack
} from "@chakra-ui/react";

import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

// Register Chart.js components
Chart.register(...registerables);

import { useMemo, useState } from "react";
import api from "../../util/api";
import { path, usePolling } from "@rp/shared";
import StatCard from "@/components/StatCard";
import { useMirrorStyles } from "@/styles/Mirror";
import { useOutletContext } from "react-router-dom";
import { MainContext } from "../Main";

function Stats() {
  const { authorized } = useOutletContext<MainContext>();

  const [numEvents, setNumEvents] = useState(0);
  const [price, setPrice] = useState(0);

  const mirrorStyles = useMirrorStyles(true);
  const { data: pastAttendanceData, isLoading: pastAttendanceLoading } =
    usePolling(api, path("/stats/attendance/:n", { n: numEvents }), authorized);
  const { data: eligiblePrize, isLoading: eligiblePrizeLoading } = usePolling(
    api,
    path("/stats/merch-item/:price", { price }),
    authorized
  );
  const { data: dietaryRestrictions, isLoading: dietaryRestrictionsLoading } =
    usePolling(api, "/stats/dietary-restrictions", authorized);

  const pastAttendance = useMemo(() => {
    if (!pastAttendanceData) {
      return 0;
    }

    let sum = 0;
    for (
      let i = 0;
      i < Math.min(numEvents, pastAttendanceData.attendanceCounts.length);
      i++
    ) {
      if (typeof pastAttendanceData.attendanceCounts[i] === "number") {
        sum += pastAttendanceData.attendanceCounts[i];
      }
    }

    return sum;
  }, [numEvents, pastAttendanceData]);

  const sortedAllergyCounts = useMemo(() => {
    if (!dietaryRestrictions) return dietaryRestrictions;
    console.log(Object.entries(dietaryRestrictions?.allergyCounts).sort());
    return Object.entries(dietaryRestrictions?.allergyCounts).sort();
  }, [dietaryRestrictions]);

  const sortedDietaryRestrictionCounts = useMemo(() => {
    if (!dietaryRestrictions) return dietaryRestrictions;
    return Object.entries(dietaryRestrictions?.dietaryRestrictionCounts).sort();
  }, [dietaryRestrictions]);

  return (
    <>
      <Flex justifyContent="center" alignItems="center">
        <Heading size="lg">Stats</Heading>
      </Flex>
      <br />
      <StatGroup display="flex" flexDir="column" alignItems="center" gap={8}>
        <HStack w="100%" gap={4}>
          <StatCard
            label="Number Checked-In"
            endpoint="/stats/check-in"
            enabled={authorized}
            transformer={(data) => data.count}
          />
          <StatCard
            label="Priority Attendees"
            endpoint="/stats/priority-attendee"
            enabled={authorized}
            transformer={(data) => data.count}
          />
        </HStack>
        <HStack w="100%" gap={4}>
          <Stat sx={mirrorStyles}>
            <StatLabel display="flex" alignItems="center">
              Past Event Attendance:
              <NumberInput
                size="sm"
                maxW="100px"
                ml="4"
                value={numEvents}
                onChange={(_, value) => setNumEvents(value)}
                min={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </StatLabel>
            <StatNumber>
              {pastAttendanceLoading ? "—" : pastAttendance}
            </StatNumber>
            <StatHelpText>
              {/* Add any additional info or icons here */}
            </StatHelpText>
          </Stat>
          <Stat sx={mirrorStyles}>
            <StatLabel display="flex" alignItems="center">
              Eligible for Prizes $
              <NumberInput
                size="sm"
                maxW="100px"
                ml="4"
                value={price}
                onChange={(_, value) => setPrice(value)}
                min={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </StatLabel>
            <StatNumber>
              {eligiblePrizeLoading ? "—" : eligiblePrize?.count}
            </StatNumber>
            <StatHelpText>
              {/* Add any additional info or icons here */}
            </StatHelpText>
          </Stat>
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
