import { Box, Flex, Stack, StackDivider, Text } from "@chakra-ui/react";
import { LeaderboardUser } from "@rp/shared";
import { useMemo } from "react";

const LeaderboardCard: React.FC<{
  user: LeaderboardUser;
  ranking: number;
}> = ({ user, ranking }) => (
  <Flex
    id={`leaderboard-card-${user.userId}`}
    justifyContent="space-between"
    alignItems="center"
    gap={4}
  >
    <Box
      pos="relative"
      zIndex={2}
      w={10}
      right={5}
      overflow="shown"
      textAlign="right"
    >
      <Text whiteSpace="nowrap" fontSize="0.8rem">
        {ranking + 1}.
      </Text>
    </Box>
    <Box
      flex={4}
      textAlign="left"
      whiteSpace="nowrap"
      overflow="hidden"
      textOverflow="ellipsis"
      ml={-8}
    >
      {user.name}
    </Box>
    <Box
      flex={5}
      textAlign="left"
      fontStyle="oblique"
      opacity="0.7"
      display={{ base: "none", lg: "block" }}
    >
      {user.email}
    </Box>
    <Flex
      flex={{ base: "4", xl: "6" }}
      textAlign="left"
      alignItems="center"
      gap={1.5}
      display={{ base: "none", lg: "flex" }}
    >
      <Text display={{ base: "none", xl: "block" }}>Earned:&nbsp;&nbsp;</Text>
      <Text as="span" fontSize="xl" lineHeight={1}>
        {user.isEligibleMerch.first ? "☑" : "□"}
      </Text>
      <Text>button&nbsp;&nbsp;</Text>
      <Text as="span" fontSize="xl" lineHeight={1}>
        {user.isEligibleMerch.second ? "☑" : "□"}
      </Text>
      <Text>tote&nbsp;&nbsp;</Text>
      <Text as="span" fontSize="xl" lineHeight={1}>
        {user.isEligibleMerch.third ? "☑" : "□"}
      </Text>
      <Text>cap&nbsp;&nbsp;</Text>
    </Flex>
    <Flex
      flex={2}
      textAlign="left"
      alignItems="center"
      gap={{ base: "0", sm: "3" }}
      display={{ base: "flex", lg: "none" }}
      direction={{ base: "column", sm: "row" }}
    >
      <Text>Prizes:</Text>
      <Flex gap={{ base: "0", sm: "1" }}>
        <Text as="span" fontSize="xl" lineHeight={1}>
          {user.isEligibleMerch.first ? "☑" : "□"}
        </Text>
        <Text as="span" fontSize="xl" lineHeight={1}>
          {user.isEligibleMerch.second ? "☑" : "□"}
        </Text>
        <Text as="span" fontSize="xl" lineHeight={1}>
          {user.isEligibleMerch.third ? "☑" : "□"}
        </Text>
      </Flex>
    </Flex>
    <Box flex={2} textAlign="center">
      <Text as="b">{user.points}</Text>
    </Box>
  </Flex>
);

const LeaderboardCardSkeleton: React.FC = () => (
  <Flex
    justifyContent="space-between"
    alignItems="center"
    gap={4}
    py={0}
    opacity={0.7}
  >
    <Box flex={4}>
      <Box height="24px" bg="gray.200" borderRadius="md" width="70%" />
    </Box>
    <Box flex={5} display={{ base: "none", lg: "block" }}>
      <Box height="24px" bg="gray.200" borderRadius="md" width="80%" />
    </Box>
    <Box flex={{ base: 2, lg: 4, xl: 6 }}>
      <Box
        height="24px"
        bg="gray.200"
        borderRadius="md"
        width="90%"
        minW="60px"
      />
    </Box>
    <Box flex={2}>
      <Box
        height="24px"
        bg="gray.200"
        borderRadius="md"
        width="40px"
        mx="auto"
      />
    </Box>
  </Flex>
);

const LeaderboardView: React.FC<{
  leaderboardUsers: LeaderboardUser[];
  numberAwards: number;
  isLoading: boolean;
}> = ({ leaderboardUsers, numberAwards, isLoading }) => {
  const breakpoint = useMemo(
    () => leaderboardUsers[numberAwards - 1]?.points ?? 0,
    [leaderboardUsers, numberAwards]
  );

  const allCards = useMemo(
    () =>
      leaderboardUsers.map((user, index) => (
        <LeaderboardCard user={user} key={user.userId} ranking={index} />
      )),
    [leaderboardUsers]
  );

  const awardWinners = useMemo(
    () => allCards?.slice(0, numberAwards),
    [allCards, numberAwards]
  );

  const otherUsers = useMemo(
    () => allCards?.slice(numberAwards),
    [allCards, numberAwards]
  );

  const loadingSkeletons = useMemo(
    () =>
      Array.from({ length: 10 }, (_, index) => (
        <LeaderboardCardSkeleton key={`skeleton-${index}`} />
      )),
    []
  );

  return (
    <Box>
      <Stack
        divider={<StackDivider borderColor="yellow.500" />}
        spacing={3}
        mt={8}
      >
        {isLoading ? loadingSkeletons : awardWinners}
        {breakpoint > 0 && (
          <Text as="b" color="yellow.500">
            Minimum point threshold: {breakpoint}
          </Text>
        )}
      </Stack>

      <Stack divider={<StackDivider />} spacing={3} mt={8}>
        {isLoading ? loadingSkeletons : otherUsers}
      </Stack>
    </Box>
  );
};

export default LeaderboardView;
