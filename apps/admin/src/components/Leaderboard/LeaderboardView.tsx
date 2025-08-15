import { Box, Flex, Stack, StackDivider, Text } from "@chakra-ui/react";
import { LeaderboardUser } from "@rp/shared";

const LeaderboardCard: React.FC<{
  user: LeaderboardUser;
}> = ({ user }) => (
  <Flex
    id={`leaderboard-card-${user.userId}`}
    justifyContent="space-between"
    alignItems="center"
    gap={4}
    // todo? make a stack -> add dividers at low width
  >
    <Box
      flex="4"
      textAlign="left"
      whiteSpace={{ base: "nowrap", sm: "normal" }}
      overflow="hidden"
      textOverflow="ellipsis"
    >
      {user.name}
    </Box>
    {/* add proper small web display -- probably remove email and stack merch (or remove merch labels?) */}
    <Box
      flex="5"
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
      flex="2"
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
    <Box flex="2" textAlign="center">
      <Text as="b">{user.points}</Text>
    </Box>
  </Flex>
);

const LeaderboardCardSkeleton: React.FC = () => (
  <Flex justifyContent="space-between" alignItems="center" py={0} opacity={0.7}>
    <Box flex={1} mr={7}>
      <Box height="24px" bg="gray.200" borderRadius="md" width="70%" />
    </Box>
    <Box flex={1} mr={2}>
      <Box height="24px" bg="gray.200" borderRadius="md" width="80%" />
    </Box>
    <Box flex={1} mr={2}>
      {/* todo update this one to match the actual boxes when they're implemented */}
      <Box height="24px" bg="gray.200" borderRadius="md" />
    </Box>
    <Box flex={1} mr={2}>
      <Box
        height="24px"
        bg="gray.200"
        borderRadius="md"
        width="50px"
        ml="auto"
        mr={4}
      />
    </Box>
  </Flex>
);

const LeaderboardView: React.FC<{
  leaderboardUsers: LeaderboardUser[];
  numberAwards: number;
  isLoading: boolean;
}> = ({ leaderboardUsers, numberAwards, isLoading }) => {
  const breakpoint = leaderboardUsers[numberAwards - 1]?.points ?? 0;

  return (
    <Box>
      <Stack
        divider={<StackDivider borderColor="yellow.500" />}
        spacing="4"
        mt={8}
      >
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <LeaderboardCardSkeleton key={index} />
            ))
          : leaderboardUsers
              ?.slice(0, numberAwards)
              .map((user) => <LeaderboardCard user={user} key={user.userId} />)}
        {breakpoint > 0 && (
          <Text as="b" color="yellow.500">
            Minimum point threshold: {breakpoint}
          </Text>
        )}
      </Stack>

      <Stack divider={<StackDivider />} spacing="4" mt={8}>
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <LeaderboardCardSkeleton key={index} />
            ))
          : leaderboardUsers
              ?.slice(numberAwards)
              .map((user) => <LeaderboardCard user={user} key={user.userId} />)}
      </Stack>
    </Box>
  );
};

export default LeaderboardView;
