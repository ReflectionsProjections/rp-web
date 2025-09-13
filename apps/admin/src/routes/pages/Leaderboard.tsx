// import { CloseIcon } from "@chakra-ui/icons";
import {
  Card,
  CardHeader,
  CardBody,
  Stack,
  Divider,
  Flex,
  Input,
  FormControl,
  FormErrorMessage,
  Heading,
  Text,
  FormLabel,
  Box,
  VStack
} from "@chakra-ui/react";
import { api } from "@rp/shared";
import { LeaderboardUser } from "@rp/shared";
import { useMirrorStyles } from "@/styles/Mirror";
import { useOutletContext } from "react-router-dom";
import { MainContext } from "../Main";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import LeaderboardView from "@/components/Leaderboard/LeaderboardView";
import ConfirmButton from "@/components/Leaderboard/ConfirmModal";
import LeaderboardStats from "@/components/Leaderboard/LeaderboardStats";
import Section from "@/components/Section";

const defaultNumberAwards = 1;

const Leaderboard: React.FC = () => {
  const { roles, authorized } = useOutletContext<MainContext>();
  const mirrorStyle = useMirrorStyles();
  const leaderboardViewRef = useRef<HTMLDivElement>(null);

  const [previewNumberAwards, setPreviewNumberAwards] = useState(
    `${defaultNumberAwards}`
  );
  const [effectiveNumberAwards, setEffectiveNumberAwards] = useState(0);
  const [minimumPointsThreshold, setMinimumPointsThreshold] = useState(0);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString("en-CA") // YYYY-MM-DD format in local timezone
  );
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{
    exists: boolean;
    submission?: {
      submissionId: string;
      submittedAt: string;
      submittedBy: string;
      count: number;
    };
  } | null>(null);

  // Check submission status for a specific day
  const checkSubmissionStatus = useCallback(
    async (day: string) => {
      if (!authorized) return;

      try {
        const response = await api.get("/leaderboard/submission-status", {
          params: { day }
        });

        setSubmissionStatus(response.data as { exists: boolean });
      } catch (error) {
        console.error("Error checking submission status:", error);
        setSubmissionStatus({ exists: false });
      }
    },
    [authorized]
  );

  // Fetch daily leaderboard data
  const fetchDailyLeaderboard = useCallback(
    async (day: string, n?: number) => {
      if (!authorized) return;

      setIsLoading(true);

      try {
        const params: Record<string, string> = { day };
        if (n) params.n = n.toString();

        const response = await api.get("/leaderboard/daily", {
          params
        });
        const data = response.data as {
          leaderboard: Array<{
            rank: number;
            userId: string;
            displayName: string;
            points: number;
            currentTier: string;
            icon: string;
          }>;
        };

        // Transform API response to match LeaderboardUser format
        const transformedData: LeaderboardUser[] = data.leaderboard.map(
          (entry) => ({
            userId: entry.userId, // Keep as string since it's a UUID
            name: entry.displayName,
            email: "", // Not provided by API
            points: entry.points,
            currentTier: entry.currentTier.toString(),
            isEligibleMerch: {
              base: true,
              first:
                entry.currentTier.toString() === "TIER1" ||
                entry.currentTier.toString() === "TIER2" ||
                entry.currentTier.toString() === "TIER3" ||
                entry.currentTier.toString() === "TIER4",
              second:
                entry.currentTier.toString() === "TIER2" ||
                entry.currentTier.toString() === "TIER3" ||
                entry.currentTier.toString() === "TIER4",
              third:
                entry.currentTier.toString() === "TIER3" ||
                entry.currentTier.toString() === "TIER4"
            }
          })
        );

        setLeaderboardData(transformedData);

        // Debug: Check tier distribution
        const tierCounts = transformedData.reduce(
          (acc, user) => {
            acc[user.currentTier] = (acc[user.currentTier] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>
        );
        console.log("Daily leaderboard data loaded:", {
          day,
          count: transformedData.length,
          tierDistribution: tierCounts,
          data: transformedData
        });
      } catch (err) {
        console.error("Failed to fetch leaderboard data:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [authorized]
  );

  // Submit leaderboard results
  const updateLeaderboard = async (day: string, n: number): Promise<void> => {
    if (!authorized) return;

    try {
      // Get the first effectiveNumberAwards eligible users (already filtered to exclude TIER4)
      // This accounts for tiebreaks and gives us the actual number that will be promoted
      const eligibleUsers = leaderboardUsers.slice(0, effectiveNumberAwards);

      const eligibleUserIds = eligibleUsers.map((user) => user.userId);

      console.log(`Submitting leaderboard for ${day}:`, {
        requestedPromotions: n,
        effectivePromotions: effectiveNumberAwards,
        eligibleUsersFound: eligibleUserIds.length,
        eligibleUserIds
      });

      await api.post("/leaderboard/submit", {
        day,
        n: effectiveNumberAwards, // Send the effective number, not the original query number
        userIdsToPromote: eligibleUserIds
      });
      // Refresh the leaderboard data after submission
      await fetchDailyLeaderboard(day, undefined);

      // Refresh submission status
      await checkSubmissionStatus(day);
    } catch (err: unknown) {
      console.error("Failed to submit leaderboard:", err);

      // Handle 409 Conflict (already submitted)
      if (err && typeof err === "object" && "response" in err) {
        const errorResponse = err as {
          response?: { status?: number; data?: { message?: string } };
        };
        if (errorResponse.response?.status === 409) {
          const errorMessage =
            errorResponse.response.data?.message ||
            "This date has already been submitted";
          throw new Error(errorMessage);
        }
      }

      // Handle other errors
      let errorMessage = "Failed to submit leaderboard";
      if (err && typeof err === "object" && "response" in err) {
        const errorResponse = err as {
          response?: { data?: { message?: string } };
        };
        if (errorResponse.response?.data?.message) {
          errorMessage = errorResponse.response.data.message;
        }
      } else if (err && typeof err === "object" && "message" in err) {
        const errorWithMessage = err as { message: unknown };
        if (typeof errorWithMessage.message === "string") {
          errorMessage = errorWithMessage.message;
        }
      }
      throw new Error(errorMessage);
    }
  };

  useEffect(() => {
    if (authorized) {
      void fetchDailyLeaderboard(selectedDate, undefined);
      void checkSubmissionStatus(selectedDate);
    }
  }, [authorized, selectedDate, fetchDailyLeaderboard, checkSubmissionStatus]);

  const leaderboardUsers: LeaderboardUser[] = useMemo(
    () => {
      if (!leaderboardData || leaderboardData.length === 0) {
        return [];
      }

      // Filter out TIER4 users (they already have all prizes)
      return leaderboardData.filter((user) => user.currentTier !== "TIER4");
    }, // don't show users who already have all prizes
    [leaderboardData]
  );

  useEffect(() => {
    // automatically set the initial effective preview number only when data is loaded
    if (!isLoading && leaderboardUsers.length > 0) {
      handleSetEffectiveNumberAwards(defaultNumberAwards);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, leaderboardUsers.length]);

  const previewNumberIsInvalid = useMemo(
    () =>
      !previewNumberAwards ||
      !parseInt(previewNumberAwards) ||
      parseInt(previewNumberAwards) < 1,
    [previewNumberAwards]
  );

  const handleChangePreviewNumber = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value;
    setPreviewNumberAwards(newValue);
    const newValueInt = parseInt(newValue);
    handleSetEffectiveNumberAwards(newValueInt);
  };

  const handleSetEffectiveNumberAwards = (inputPreviewValue: number) => {
    if (
      !inputPreviewValue ||
      !leaderboardUsers ||
      leaderboardUsers.length === 0
    ) {
      setEffectiveNumberAwards(0);
      setMinimumPointsThreshold(0);
      return;
    }

    // Find the breakpoint user (the user at the target position)
    const breakpointUser = leaderboardUsers[inputPreviewValue - 1];
    if (!breakpointUser) {
      setEffectiveNumberAwards(0);
      setMinimumPointsThreshold(0);
      return;
    }

    const breakpoint = breakpointUser.points;
    setMinimumPointsThreshold(breakpoint);

    // Find all users with points >= breakpoint (including ties)
    const usersGeqBreakpoint = leaderboardUsers.filter(
      (user) => user.points >= breakpoint
    );
    setEffectiveNumberAwards(usersGeqBreakpoint.length);

    // No scrolling needed - the visual highlighting will show which users qualify
  };

  return (
    <>
      <Flex justifyContent="center" alignItems="center">
        <Heading size="lg">Leaderboard Admin</Heading>
      </Flex>
      <br />
      <Flex
        w="100%"
        p={4}
        flexWrap="wrap"
        justifyContent="space-evenly"
        gap={6}
      >
        <Card
          sx={mirrorStyle}
          maxHeight="90vh"
          height="100%"
          overflow="hidden"
          flex={{ xl: 1 }}
        >
          <CardHeader>
            {/* Submission Status Display */}
            {submissionStatus?.exists && (
              <Box
                mb={4}
                p={3}
                bg="orange.100"
                border="1px solid"
                borderColor="orange.300"
                borderRadius="md"
              >
                <Text fontWeight="bold" color="orange.800">
                  ⚠️ Leaderboard Already Submitted
                </Text>
                <Text fontSize="sm" color="orange.700" mt={1}>
                  This day has already been submitted with{" "}
                  {submissionStatus.submission?.count} prizes on{" "}
                  {submissionStatus.submission?.submittedAt
                    ? new Date(
                        submissionStatus.submission.submittedAt
                      ).toLocaleString()
                    : "unknown date"}
                  .
                </Text>
              </Box>
            )}

            <Flex mb={4}>
              {/* date picker */}
              <VStack justifyContent="center">
                <Flex direction="row" w={{ base: "70%" }}>
                  <FormLabel>Select Date</FormLabel>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </Flex>
                {/* input */}
                <Flex direction="row" w={{ base: "70%" }}>
                  <FormLabel>Target number of Prizes</FormLabel>
                  <Stack
                    w={{ base: "100%" }}
                    direction={{ base: "column", lg: "row" }}
                    mr={4}
                  >
                    <FormControl
                      mr={2}
                      isRequired
                      isInvalid={previewNumberIsInvalid}
                    >
                      <Box>
                        <Input
                          name="name"
                          type="number"
                          min={0}
                          value={previewNumberAwards}
                          onChange={handleChangePreviewNumber}
                        />
                        <Box
                          pos="absolute"
                          left={4}
                          top={2}
                          pr={8}
                          pointerEvents="none"
                          maxW="100%"
                          overflow="hidden"
                          h="1.5rem"
                        >
                          <Text as="span" color="transparent">
                            {previewNumberAwards}
                          </Text>
                          &nbsp;&nbsp;
                          {!!effectiveNumberAwards && (
                            <Text as="span" fontStyle="oblique" opacity="0.7">
                              ({effectiveNumberAwards})
                            </Text>
                          )}
                        </Box>
                      </Box>
                      {/* <FormHelperText>Max awards to give today</FormHelperText> */}
                      <FormErrorMessage>
                        Field must be a positive number
                      </FormErrorMessage>
                    </FormControl>
                    <ConfirmButton
                      disabled={
                        !roles.includes("ADMIN") ||
                        previewNumberIsInvalid ||
                        (submissionStatus?.exists ?? false)
                      }
                      leaderboardUsers={leaderboardUsers}
                      effectiveNumberAwards={effectiveNumberAwards}
                      minimumPointsThreshold={minimumPointsThreshold}
                      selectedDate={selectedDate}
                      updateLeaderboard={async () => {
                        try {
                          await updateLeaderboard(
                            selectedDate,
                            parseInt(previewNumberAwards) ?? 0
                          );
                        } catch (err) {
                          // Error is already handled in updateLeaderboard function
                          console.error("Leaderboard submission failed:", err);
                          throw err;
                        }
                      }}
                    />
                  </Stack>
                </Flex>
              </VStack>
              {/* stats */}
              <Stack w={{ base: "70%" }} direction="row">
                <Section w="100%" h="100%" p={3}>
                  <LeaderboardStats
                    leaderboardUsers={leaderboardUsers}
                    effectiveNumberAwards={effectiveNumberAwards}
                    minimumPointsThreshold={minimumPointsThreshold}
                  />
                </Section>
              </Stack>
            </Flex>
          </CardHeader>
          <Divider
            borderBottomWidth="2px"
            borderColor="var(--chakra-colors-chakra-border-color)"
          />
          <CardBody overflowY="scroll" ref={leaderboardViewRef}>
            {isLoading ? (
              <Flex justifyContent="center" alignItems="center" h="200px">
                <Text>Loading leaderboard data...</Text>
              </Flex>
            ) : (
              <LeaderboardView
                leaderboardUsers={leaderboardUsers}
                minimumPointsThreshold={minimumPointsThreshold}
                isLoading={isLoading}
              />
            )}
          </CardBody>
        </Card>
      </Flex>
    </>
  );
};

export default Leaderboard;
