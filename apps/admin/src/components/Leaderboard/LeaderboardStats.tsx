import { Stack, StackDivider, Text, useColorModeValue } from "@chakra-ui/react";
import { LeaderboardUser } from "@rp/shared";
import { useMirrorStyles } from "@/styles/Mirror";

export const ExtendedLeaderboardStats: React.FC<{
  leaderboardUsers: LeaderboardUser[];
  effectiveNumberAwards: number;
  minimumPointsThreshold: number;
  showExtendedStats?: boolean;
}> = ({ leaderboardUsers, effectiveNumberAwards, minimumPointsThreshold }) => {
  const mirrorStyles = useMirrorStyles(true);
  const textColor = useColorModeValue("gray.700", "gray.300");
  const accentColor = useColorModeValue("blue.600", "blue.400");
  const subtextColor = useColorModeValue("gray.500", "gray.400");
  // Calculate current tier distribution (cumulative - each tier includes all higher tiers)
  const currentTier1Count = leaderboardUsers.filter((user) =>
    ["TIER1", "TIER2", "TIER3", "TIER4"].includes(user.currentTier)
  ).length;
  const currentTier2Count = leaderboardUsers.filter((user) =>
    ["TIER2", "TIER3", "TIER4"].includes(user.currentTier)
  ).length;
  const currentTier3Count = leaderboardUsers.filter((user) =>
    ["TIER3", "TIER4"].includes(user.currentTier)
  ).length;
  const currentTier4Count = leaderboardUsers.filter(
    (user) => user.currentTier === "TIER4"
  ).length;

  // Calculate qualified users (those who meet the threshold)
  const qualifiedUsers = leaderboardUsers.filter(
    (user) => user.points >= minimumPointsThreshold
  );

  // Calculate how many will be promoted to each tier after prizes
  const willPromoteToTier2 = qualifiedUsers.filter(
    (user) => user.currentTier === "TIER1"
  ).length;
  const willPromoteToTier3 = qualifiedUsers.filter(
    (user) => user.currentTier === "TIER2"
  ).length;
  const willPromoteToTier4 = qualifiedUsers.filter(
    (user) => user.currentTier === "TIER3"
  ).length;

  // Calculate new tier distribution after promotions (cumulative)
  const newTier1Count = currentTier1Count; // Total stays the same
  const newTier2Count = currentTier2Count + willPromoteToTier2; // Add promotions from TIER1
  const newTier3Count = currentTier3Count + willPromoteToTier3; // Add promotions from TIER2
  const newTier4Count = currentTier4Count + willPromoteToTier4; // Add promotions from TIER3

  // Calculate percentages
  const totalAttendees = leaderboardUsers.length;
  const attendeesWithPoints = leaderboardUsers.filter(
    (user) => user.points > 0
  ).length;
  const percentageOfTotal =
    totalAttendees > 0
      ? Math.round((effectiveNumberAwards / totalAttendees) * 100)
      : 0;
  const percentageWithPoints =
    attendeesWithPoints > 0
      ? Math.round((effectiveNumberAwards / attendeesWithPoints) * 100)
      : 0;

  return (
    <Stack
      w="100%"
      h="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={4}
      sx={mirrorStyles}
    >
      <Text fontSize="lg" color={textColor} textAlign="center">
        <Text as="b" color={accentColor} fontSize="xl">
          {minimumPointsThreshold}
        </Text>{" "}
        points required
      </Text>
      <Text fontSize="sm" color={subtextColor} mt={2}>
        {parseFloat(
          (minimumPointsThreshold / (leaderboardUsers[0]?.points ?? 1)).toFixed(
            2
          )
        ) * 100}
        % of first place ({leaderboardUsers[0]?.points ?? 0} pts)
      </Text>

      <Stack spacing={4} textAlign="left" w="100%" mt={4}>
        <Text fontSize="md" color={textColor} fontWeight="semibold">
          Tier Promotions
        </Text>
        <Stack spacing={3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text color={textColor} fontSize="sm">
              <Text as="b" color="green.600">
                TIER1 → TIER2:
              </Text>
            </Text>
            <Text color={textColor} fontSize="sm">
              <Text as="b" color={accentColor}>
                +{willPromoteToTier2}
              </Text>
            </Text>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text color={textColor} fontSize="sm">
              <Text as="b" color="blue.600">
                TIER2 → TIER3:
              </Text>
            </Text>
            <Text color={textColor} fontSize="sm">
              <Text as="b" color={accentColor}>
                +{willPromoteToTier3}
              </Text>
            </Text>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text color={textColor} fontSize="sm">
              <Text as="b" color="purple.600">
                TIER3 → TIER4:
              </Text>
            </Text>
            <Text color={textColor} fontSize="sm">
              <Text as="b" color={accentColor}>
                +{willPromoteToTier4}
              </Text>
            </Text>
          </Stack>
        </Stack>

        <Stack spacing={2} mt={3}>
          <Text fontSize="sm" color={textColor} fontWeight="semibold">
            New Tier Distribution:
          </Text>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text color={textColor} fontSize="xs">
              TIER1+: {currentTier1Count} → <Text as="b">{newTier1Count}</Text>
            </Text>
            <Text color={textColor} fontSize="xs">
              TIER2+: {currentTier2Count} → <Text as="b">{newTier2Count}</Text>
            </Text>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text color={textColor} fontSize="xs">
              TIER3+: {currentTier3Count} → <Text as="b">{newTier3Count}</Text>
            </Text>
            <Text color={textColor} fontSize="xs">
              TIER4: {currentTier4Count} → <Text as="b">{newTier4Count}</Text>
            </Text>
          </Stack>
        </Stack>

        <Text
          fontSize="sm"
          color={subtextColor}
          fontStyle="italic"
          textAlign="center"
          mt={2}
        >
          Awarding prizes to{" "}
          <Text as="b" color={accentColor}>
            {effectiveNumberAwards} attendees
          </Text>
          <br />({percentageOfTotal}% of total attendees, {percentageWithPoints}
          % of attendees with points)
        </Text>
      </Stack>
    </Stack>
  );
};

export const LeaderboardStats: React.FC<{
  leaderboardUsers: LeaderboardUser[];
  effectiveNumberAwards: number;
  minimumPointsThreshold: number;
  showExtendedStats?: boolean;
}> = ({ leaderboardUsers, minimumPointsThreshold }) => {
  const mirrorStyles = useMirrorStyles(true);
  const textColor = useColorModeValue("gray.700", "gray.300");
  const accentColor = useColorModeValue("blue.600", "blue.400");
  return (
    <Stack
      w="100%"
      h="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={4}
      sx={mirrorStyles}
    >
      <Text fontSize="lg" color={textColor} textAlign="center">
        <Text as="b" color={accentColor} fontSize="xl">
          {minimumPointsThreshold}
        </Text>{" "}
        points required
      </Text>
      <Text fontSize="sm" color={textColor} opacity={0.8} mt={2}>
        {parseFloat(
          (minimumPointsThreshold / (leaderboardUsers[0]?.points ?? 1)).toFixed(
            2
          )
        ) * 100}
        % of first place ({leaderboardUsers[0]?.points ?? 0} pts)
      </Text>
      <Stack spacing={2} textAlign="center" w="100%" alignItems="center" mt={4}>
        <Text fontSize="sm" color={textColor} opacity={0.8}>
          Current tier distribution (cumulative)
        </Text>
        <Stack direction="row" spacing={4} divider={<StackDivider />} py={2}>
          <Text fontSize="sm" color={textColor}>
            <Text as="b" color="green.600">
              {
                leaderboardUsers.filter((user) =>
                  ["TIER1", "TIER2", "TIER3", "TIER4"].includes(
                    user.currentTier
                  )
                ).length
              }
            </Text>{" "}
            TIER1+
          </Text>
          <Text fontSize="sm" color={textColor}>
            <Text as="b" color="blue.600">
              {
                leaderboardUsers.filter((user) =>
                  ["TIER2", "TIER3", "TIER4"].includes(user.currentTier)
                ).length
              }
            </Text>{" "}
            TIER2+
          </Text>
          <Text fontSize="sm" color={textColor}>
            <Text as="b" color="purple.600">
              {
                leaderboardUsers.filter((user) =>
                  ["TIER3", "TIER4"].includes(user.currentTier)
                ).length
              }
            </Text>{" "}
            TIER3+
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LeaderboardStats;
