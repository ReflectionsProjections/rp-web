import { Divider, Stack, Text } from "@chakra-ui/react";
import { LeaderboardUser } from "@rp/shared";


const LeaderboardStats: React.FC<{
    leaderboardUsers: LeaderboardUser[],
    effectiveNumberAwards: number,
    updatedLeaderboardPreview: LeaderboardUser[],
    showExtendedStats?: boolean
}> = ({ leaderboardUsers, effectiveNumberAwards, updatedLeaderboardPreview, showExtendedStats = false }) => {
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
                <b>
                    {leaderboardUsers[effectiveNumberAwards - 1]?.points ?? 0}
                </b>{" "}
                points required,&nbsp;
                {parseFloat(
                    (
                        (leaderboardUsers[effectiveNumberAwards - 1]?.points ??
                            0) / (leaderboardUsers[0]?.points ?? 1)
                    ).toFixed(2)
                ) * 100}
                % of first place ({leaderboardUsers[0]?.points ?? 0})
            </Text>
            <Stack spacing={0} textAlign="left" w="80%">
                <Text>Prizes earned</Text>
                <Stack direction="row" py={1} display="flex">
                    <Divider orientation="vertical" h="100%" minHeight="70px" borderLeftWidth="1px" px={0.5} />
                    <Stack textAlign="left" h="100%" alignContent="space-between" spacing={0}>
                        <Text>
                            Button: {leaderboardUsers.filter((user) => user.isEligibleMerch.first).length} &rarr; {updatedLeaderboardPreview.filter((user) => user.isEligibleMerch.first).length}
                        </Text>
                        <Text>
                            Tote: {leaderboardUsers.filter((user) => user.isEligibleMerch.second).length} &rarr; {updatedLeaderboardPreview.filter((user) => user.isEligibleMerch.second).length}
                        </Text>
                        <Text>
                            Cap: {leaderboardUsers.filter((user) => user.isEligibleMerch.third).length} &rarr; {updatedLeaderboardPreview.filter((user) => user.isEligibleMerch.third).length}
                        </Text>
                    </Stack>
                </Stack>
                <Text fontSize="2xs">
                    (fix this to use leaderboardData once implemented)
                </Text>
                {showExtendedStats && (
                    <Text>help</Text>
                )}
                {/* add can't undo + once per day warnings */}
            </Stack>
        </Stack>
    );
};

export default LeaderboardStats;
