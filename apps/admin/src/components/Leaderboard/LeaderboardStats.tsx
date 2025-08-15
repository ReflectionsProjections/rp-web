import { Divider, Stack, StackDivider, Text } from "@chakra-ui/react";
import { LeaderboardUser } from "@rp/shared";

export const ExtendedLeaderboardStats: React.FC<{
  leaderboardUsers: LeaderboardUser[];
  previewNumberAwards: number;
  effectiveNumberAwards: number;
  updatedLeaderboardPreview: LeaderboardUser[];
  showExtendedStats?: boolean;
}> = ({
  leaderboardUsers,
  previewNumberAwards,
  effectiveNumberAwards,
  updatedLeaderboardPreview
}) => {
  return (
    <Stack
      w="100%"
      h="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text>
        <b>{leaderboardUsers[effectiveNumberAwards - 1]?.points ?? 0}</b> points
        required,&nbsp;
        {parseFloat(
          (
            (leaderboardUsers[effectiveNumberAwards - 1]?.points ?? 0) /
            (leaderboardUsers[0]?.points ?? 1)
          ).toFixed(2)
        ) * 100}
        % of first place ({leaderboardUsers[0]?.points ?? 0})
      </Text>
      <Stack spacing={0} textAlign="left" w="80%">
        <Text>Prizes earned</Text>
        <Stack direction="row" py={1} display="flex">
          <Divider
            orientation="vertical"
            h="100%"
            minHeight="70px"
            borderLeftWidth="1px"
            px={0.5}
          />
          <Stack
            textAlign="left"
            h="100%"
            alignContent="space-between"
            spacing={0}
          >
            <Text>
              Button:{" "}
              {
                leaderboardUsers.filter((user) => user.isEligibleMerch.first)
                  .length
              }{" "}
              &rarr;{" "}
              {
                updatedLeaderboardPreview.filter(
                  (user) => user.isEligibleMerch.first
                ).length
              }
            </Text>
            <Text>
              Tote:{" "}
              {
                leaderboardUsers.filter((user) => user.isEligibleMerch.second)
                  .length
              }{" "}
              &rarr;{" "}
              {
                updatedLeaderboardPreview.filter(
                  (user) => user.isEligibleMerch.second
                ).length
              }
            </Text>
            <Text>
              Cap:{" "}
              {
                leaderboardUsers.filter((user) => user.isEligibleMerch.third)
                  .length
              }{" "}
              &rarr;{" "}
              {
                updatedLeaderboardPreview.filter(
                  (user) => user.isEligibleMerch.third
                ).length
              }
            </Text>
          </Stack>
        </Stack>
        <br />
        <Text fontStyle="oblique">
          This will award merch to <b>{effectiveNumberAwards} attendees</b>
          <br />(
          {parseFloat(
            ((effectiveNumberAwards / leaderboardUsers.length) * 100).toFixed(0)
          )}
          % of total attendees and&nbsp;
          {parseFloat(
            (
              (effectiveNumberAwards /
                leaderboardUsers.filter((user) => user.points > 0).length) *
              100
            ).toFixed(0)
          )}
          % of attendees with nonzero points) based on a target of{" "}
          <b>{previewNumberAwards}</b>
        </Text>
        <Text fontSize="2xs">
          (fix this to use leaderboardData once implemented)
        </Text>
      </Stack>
    </Stack>
  );
};

export const LeaderboardStats: React.FC<{
  leaderboardUsers: LeaderboardUser[];
  effectiveNumberAwards: number;
  updatedLeaderboardPreview: LeaderboardUser[];
  showExtendedStats?: boolean;
}> = ({
  leaderboardUsers,
  effectiveNumberAwards,
  updatedLeaderboardPreview
}) => {
  return (
    <Stack
      w="100%"
      h="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text>
        <b>{leaderboardUsers[effectiveNumberAwards - 1]?.points ?? 0}</b> points
        required,&nbsp;
        {parseFloat(
          (
            (leaderboardUsers[effectiveNumberAwards - 1]?.points ?? 0) /
            (leaderboardUsers[0]?.points ?? 1)
          ).toFixed(2)
        ) * 100}
        % of first place ({leaderboardUsers[0]?.points ?? 0})
      </Text>
      <Stack
        spacing={0}
        textAlign="left"
        w="100%"
        alignItems="center"
        overflow="hidden"
      >
        <Stack
          textAlign="center"
          h="100%"
          w="100%"
          justifyContent="center"
          spacing={3}
          direction="row"
          divider={<StackDivider />}
          py={1}
          display={{ base: "none", lg: "flex" }}
        >
          <Text>
            Given buttons:{" "}
            {
              leaderboardUsers.filter((user) => user.isEligibleMerch.first)
                .length
            }{" "}
            &rarr;{" "}
            {
              updatedLeaderboardPreview.filter(
                (user) => user.isEligibleMerch.first
              ).length
            }
          </Text>
          <Text>
            totes:{" "}
            {
              leaderboardUsers.filter((user) => user.isEligibleMerch.second)
                .length
            }{" "}
            &rarr;{" "}
            {
              updatedLeaderboardPreview.filter(
                (user) => user.isEligibleMerch.second
              ).length
            }
          </Text>
          <Text>
            caps:{" "}
            {
              leaderboardUsers.filter((user) => user.isEligibleMerch.third)
                .length
            }{" "}
            &rarr;{" "}
            {
              updatedLeaderboardPreview.filter(
                (user) => user.isEligibleMerch.third
              ).length
            }
          </Text>
        </Stack>
        <Stack direction="row" py={1} display={{ base: "flex", lg: "none" }}>
          <Stack
            textAlign="center"
            h="100%"
            w="100%"
            alignContent="space-between"
            spacing={0}
            direction="column"
          >
            <Text>
              {`${
                updatedLeaderboardPreview.filter(
                  (user) => user.isEligibleMerch.first
                ).length
              } buttons`}
            </Text>
            <Text>
              {`${
                updatedLeaderboardPreview.filter(
                  (user) => user.isEligibleMerch.second
                ).length
              } totes`}
            </Text>
            <Text>
              {`${
                updatedLeaderboardPreview.filter(
                  (user) => user.isEligibleMerch.third
                ).length
              } caps`}
            </Text>
          </Stack>
        </Stack>
        <Text fontSize="2xs">
          (fix this to use leaderboardData once implemented)
        </Text>
      </Stack>
    </Stack>
  );
};

export default LeaderboardStats;
