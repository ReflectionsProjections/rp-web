import {
  Box,
  Flex,
  Stack,
  StackDivider,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { LeaderboardUser } from "@rp/shared";
import { useMemo } from "react";
import { useMirrorStyles } from "@/styles/Mirror";

const LeaderboardCard: React.FC<{
  user: LeaderboardUser;
  ranking: number;
  isQualified?: boolean;
}> = ({ user, ranking, isQualified = false }) => {
  const mirrorStyles = useMirrorStyles(true);
  const normalBorder = useColorModeValue("gray.200", "gray.600");
  const normalText = useColorModeValue("gray.700", "gray.300");

  // Special styling for qualified users (selected for prizes)
  const qualifiedBg = useColorModeValue("green.50", "green.900");
  const qualifiedBorder = useColorModeValue("green.400", "green.600");
  const qualifiedText = useColorModeValue("green.800", "green.200");
  const qualifiedShadow = useColorModeValue(
    "0 0 20px rgba(34, 197, 94, 0.3)",
    "0 0 20px rgba(34, 197, 94, 0.5)"
  );

  return (
    <Flex
      id={`leaderboard-card-${user.userId}`}
      justifyContent="space-between"
      alignItems="center"
      gap={4}
      p={4}
      borderRadius="xl"
      bg={isQualified ? qualifiedBg : "transparent"}
      border={isQualified ? "3px solid" : "1px solid"}
      borderColor={isQualified ? qualifiedBorder : normalBorder}
      transition="all 0.3s ease"
      sx={isQualified ? { ...mirrorStyles, boxShadow: qualifiedShadow } : {}}
      _hover={{
        transform: isQualified ? "scale(1.05)" : "scale(1.01)",
        boxShadow: isQualified ? qualifiedShadow : "md"
      }}
      position="relative"
    >
      <Box pos="relative" zIndex={2} w={12} textAlign="center">
        <Text
          whiteSpace="nowrap"
          fontSize="lg"
          fontWeight="bold"
          color={isQualified ? qualifiedText : normalText}
        >
          #{ranking + 1}
        </Text>
      </Box>
      <Box
        flex={4}
        textAlign="left"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        <Text
          fontSize="md"
          fontWeight="semibold"
          color={isQualified ? qualifiedText : normalText}
        >
          {user.name}
        </Text>
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
        <Text display={{ base: "none", xl: "block" }}>Tier:&nbsp;&nbsp;</Text>
        <Text
          as="span"
          fontSize="lg"
          fontWeight="bold"
          color={isQualified ? qualifiedText : normalText}
          px={2}
          py={1}
          borderRadius="md"
          bg={isQualified ? "green.200" : "gray.100"}
        >
          {user.currentTier}
        </Text>
      </Flex>
      <Flex
        flex={2}
        textAlign="left"
        alignItems="center"
        gap={{ base: "0", sm: "3" }}
        display={{ base: "flex", lg: "none" }}
        direction={{ base: "column", sm: "row" }}
      >
        <Text>Tier:</Text>
        <Text
          as="span"
          fontSize="md"
          fontWeight="bold"
          color={isQualified ? qualifiedText : normalText}
          px={2}
          py={1}
          borderRadius="md"
          bg={isQualified ? "green.200" : "gray.100"}
        >
          {user.currentTier}
        </Text>
      </Flex>
      <Box flex={2} textAlign="center">
        <Text
          as="b"
          fontSize="lg"
          color={isQualified ? qualifiedText : normalText}
        >
          {user.points} pts
        </Text>
      </Box>
    </Flex>
  );
};

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
  minimumPointsThreshold: number;
  isLoading: boolean;
}> = ({ leaderboardUsers, minimumPointsThreshold, isLoading }) => {
  const breakpoint = useMemo(
    () => minimumPointsThreshold,
    [minimumPointsThreshold]
  );

  const mirrorStyles = useMirrorStyles(true);
  const bannerBg = useColorModeValue("blue.50", "blue.900");
  const bannerBorder = useColorModeValue("blue.200", "blue.600");
  const bannerText = useColorModeValue("blue.700", "blue.200");
  const bannerSubtext = useColorModeValue("blue.500", "blue.300");

  const allCards = useMemo(() => {
    // Debug: Check for duplicate userIds
    const userIds = leaderboardUsers.map((user) => user.userId);
    const uniqueUserIds = new Set(userIds);
    if (userIds.length !== uniqueUserIds.size) {
      console.warn("Duplicate userIds found in leaderboard data:", userIds);
      const duplicates = userIds.filter(
        (id, index) => userIds.indexOf(id) !== index
      );
      console.warn("Duplicate userIds:", [...new Set(duplicates)]);
    }

    return leaderboardUsers.map((user, index) => {
      const isQualified = user.points >= breakpoint;
      return (
        <LeaderboardCard
          user={user}
          key={`${user.userId}-${index}`}
          ranking={index}
          isQualified={isQualified}
        />
      );
    });
  }, [leaderboardUsers, breakpoint]);

  const loadingSkeletons = useMemo(
    () =>
      Array.from({ length: 10 }, (_, index) => (
        <LeaderboardCardSkeleton key={`skeleton-${index}`} />
      )),
    []
  );

  return (
    <Box>
      {breakpoint > 0 && (
        <Box
          p={4}
          bg={bannerBg}
          border="1px solid"
          borderColor={bannerBorder}
          borderRadius="2xl"
          mb={6}
          sx={mirrorStyles}
        >
          <Text as="b" color={bannerText} fontSize="lg">
            🎯 Minimum points to qualify: {breakpoint} points
          </Text>
          <Text fontSize="sm" color={bannerSubtext} mt={2}>
            Users with {breakpoint}+ points are highlighted below
          </Text>
        </Box>
      )}
      <Stack
        divider={
          <StackDivider
            borderColor={useColorModeValue("gray.200", "gray.600")}
          />
        }
        spacing={3}
        mt={6}
      >
        {isLoading ? loadingSkeletons : allCards}
      </Stack>
    </Box>
  );
};

export default LeaderboardView;
