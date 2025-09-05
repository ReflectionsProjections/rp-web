import { ICON_COLOR_TO_COLOR } from "@/constants/colors";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { LeaderboardEntry } from "@rp/shared";
// import { usePolling } from "@rp/shared";

export default function Leaderboard() {
  // const { data, isLoading } = usePolling("/leaderboard/daily");

  // Testing data until leaderboard is done
  const leaderboard: LeaderboardEntry[] = [
    {
      displayName: "Bob",
      currentTier: "TIER2",
      icon: "BLACK",
      points: 32,
      rank: 1,
      userId: "1234"
    },
    {
      displayName: "Alice",
      currentTier: "TIER1",
      icon: "RED",
      points: 28,
      rank: 2,
      userId: "12345"
    },
    {
      displayName: "Alex",
      currentTier: "TIER1",
      icon: "BLUE",
      points: 25,
      rank: 3,
      userId: "123456"
    },
    {
      displayName: "Tree",
      currentTier: "TIER1",
      icon: "GREEN",
      points: 18,
      rank: 4,
      userId: "1234567"
    },
    {
      displayName: "LongestNameInTheFreakingWorld",
      currentTier: "TIER1",
      icon: "PURPLE",
      points: 16,
      rank: 5,
      userId: "1234568"
    },
    {
      displayName: "OnlyOne",
      currentTier: "TIER1",
      icon: "YELLOW",
      points: 13,
      rank: 6,
      userId: "1234569"
    },
    {
      displayName: "TesterTheGuy",
      currentTier: "TIER1",
      icon: "RED",
      points: 11,
      rank: 7,
      userId: "12532"
    },
    {
      displayName: "Bazinga",
      currentTier: "TIER1",
      icon: "ORANGE",
      points: 5,
      rank: 8,
      userId: "13454315"
    },
    {
      displayName: "Sheldon",
      currentTier: "TIER1",
      icon: "PINK",
      points: 3,
      rank: 9,
      userId: "12352353"
    },
    {
      displayName: "Duck",
      currentTier: "TIER1",
      icon: "BLACK",
      points: 2,
      rank: 10,
      userId: "123523987"
    }
  ];
  const { data, isLoading } = {
    data: {
      leaderboard
    },
    isLoading: false
  };

  return (
    <Box>
      <Heading textAlign={"center"}>Leaderboard</Heading>

      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <Box>
          {data?.leaderboard.map(
            ({ rank, displayName, userId, icon, points }) => (
              <LeaderboardRow
                rank={rank}
                displayName={displayName}
                userId={userId}
                iconColor={ICON_COLOR_TO_COLOR[icon]}
                points={points}
              />
            )
          )}
        </Box>
      )}
    </Box>
  );
}

function LeaderboardRow({
  iconColor,
  rank,
  displayName,
  userId,
  points
}: {
  iconColor: string;
  rank: number;
  displayName: string;
  userId: string;
  points: number;
}) {
  return (
    <Flex flexDirection={"row"} key={userId} backgroundColor={iconColor}>
      <Text>{iconColor}</Text>
      <Text>{rank}</Text>
      <Text>{displayName}</Text>
      <Text>{points}</Text>
    </Flex>
  );
}
