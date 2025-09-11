import { ICON_COLOR_TO_COLOR } from "@/constants/colors";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { LeaderboardEntry } from "@rp/shared";
import ProfileIcon from "@/assets/icon.svg?react";
// import { usePolling } from "@rp/shared";

export default function Leaderboard() {
  // const { data, isLoading } = usePolling("/leaderboard/daily");

  // Testing data until leaderboard is done
  const leaderboard: LeaderboardEntry[] = [
    {
      displayName: "Bob",
      currentTier: "TIER2",
      icon: "ORANGE",
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
      displayName:
        "LongestNameInTheFreakingWorldLikeOhMyGodWhyIsThisNameSoFreakingLongSurelyGoogleWontAllowThis",
      currentTier: "TIER1",
      icon: "PURPLE",
      points: 16,
      rank: 5,
      userId: "1234568"
    },
    {
      displayName: "OnlyOne",
      currentTier: "TIER1",
      icon: "GREEN",
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
      icon: "PURPLE",
      points: 2,
      rank: 10,
      userId: "1235235239845"
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
        <Box marginTop={"0.5rem"}>
          {data?.leaderboard.map(
            ({ rank, displayName, userId, icon, points }, i) => (
              <LeaderboardRow
                backgroundColor={i % 2 === 0 ? "#464646ff" : "#6b6b6bff"}
                rank={rank}
                displayName={displayName}
                userId={userId}
                iconColor={ICON_COLOR_TO_COLOR[icon]}
                points={points}
                key={userId}
              />
            )
          )}
        </Box>
      )}
    </Box>
  );
}

function LeaderboardRow({
  backgroundColor,
  iconColor,
  rank,
  displayName,
  userId,
  points
}: {
  backgroundColor: string;
  iconColor: string;
  rank: number;
  displayName: string;
  userId: string;
  points: number;
}) {
  return (
    <Flex
      flexDirection={"row"}
      alignItems={"center"}
      key={userId}
      backgroundColor={backgroundColor}
      paddingX={"1rem"}
      fontSize={"2rem"}
      _first={{
        paddingTop: "0.5rem",
        borderTopRadius: "0.5rem"
      }}
      _last={{
        paddingBottom: "0.5rem",
        borderBottomRadius: "0.5rem"
      }}
    >
      <Text
        width={"2ch"}
        marginRight={"0.25rem"}
        textAlign={"right"}
        fontSize={"1.5rem"}
      >
        {rank}
      </Text>
      <Box width={"3rem"} height={"3rem"} marginRight={"0.25rem"}>
        <ProfileIcon width={"100%"} height={"100%"} color={iconColor} />
      </Box>
      <Text marginRight={"0.25rem"} wordBreak={"break-all"} maxWidth={"75%"}>
        {displayName}
      </Text>
      <Text marginLeft={"auto"}>{points} PTS</Text>
    </Flex>
  );
}
