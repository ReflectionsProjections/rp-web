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
  FormLabel
} from "@chakra-ui/react";
import api from "@/util/api";
import { LeaderboardUser, usePolling } from "@rp/shared";
import { useMirrorStyles } from "@/styles/Mirror";
import { useOutletContext } from "react-router-dom";
import { MainContext } from "../Main";
import { useEffect, useMemo, useState } from "react";

import { fakeLeaderboardData as testData } from "@/components/Leaderboard/TestData";
import LeaderboardView from "@/components/Leaderboard/LeaderboardView";
import ConfirmButton from "@/components/Leaderboard/ConfirmModal";
import LeaderboardStats from "@/components/Leaderboard/LeaderboardStats";
import Section from "@/components/Section";

const defaultNumberAwards = 50;

const unlockNextMerch = (user: LeaderboardUser): LeaderboardUser => {
  const updatedUser = {
    ...user,
    isEligibleMerch: { ...user.isEligibleMerch }
  };
  if (user.isEligibleMerch.third) {
    return updatedUser;
  }
  if (user.isEligibleMerch.second) {
    updatedUser.isEligibleMerch.third = true;
    return updatedUser;
  }
  if (user.isEligibleMerch.first) {
    updatedUser.isEligibleMerch.second = true;
    return updatedUser;
  }
  updatedUser.isEligibleMerch.first = true;
  return updatedUser;
};

const Leaderboard: React.FC = () => {
  const { roles, authorized } = useOutletContext<MainContext>();
  const {
    data: leaderboardData,
    update: updateLeaderboard,
    isLoading
  } = usePolling(api, "/attendee/emails", authorized);
  const mirrorStyle = useMirrorStyles();

  const [previewNumberAwards, setPreviewNumberAwards] = useState(
    `${defaultNumberAwards}`
  );
  const [effectiveNumberAwards, setEffectiveNumberAwards] = useState(0);

  useEffect(() => {
    // automatically set the initial effective preview number
    handleSetEffectiveNumberAwards(defaultNumberAwards);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const leaderboardUsers: LeaderboardUser[] = useMemo(
    () => {
      if (!testData) {
        return [];
      }
      return testData
        .sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        )
        .sort((a, b) => b.points - a.points)
        .filter((user) => !user.isEligibleMerch.third);
    }, // don't show users who already have all prizes
    [leaderboardData]
  );

  const updatedLeaderboardPreview: LeaderboardUser[] = useMemo(() => {
    if (!leaderboardUsers) {
      return [];
    }
    const breakpoint =
      leaderboardUsers[effectiveNumberAwards - 1]?.points ?? null;
    if (!breakpoint) {
      return leaderboardUsers;
    }
    return leaderboardUsers.map((user) =>
      user.points >= breakpoint ? unlockNextMerch(user) : user
    );
  }, [effectiveNumberAwards, leaderboardUsers]);

  const handleChangePreviewNumber = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value;
    setPreviewNumberAwards(newValue);
    const newValueInt = parseInt(newValue);
    handleSetEffectiveNumberAwards(newValueInt);
  };

  const handleSetEffectiveNumberAwards = (inputPreviewValue: number) => {
    if (!inputPreviewValue || !leaderboardUsers) {
      setEffectiveNumberAwards(0);
      return;
    }
    if (inputPreviewValue >= leaderboardUsers.length) {
      setEffectiveNumberAwards(inputPreviewValue);
      const lastUserId = leaderboardUsers[leaderboardUsers.length - 1].userId;
      const lastUser = document.getElementById(
        `leaderboard-card-${lastUserId}`
      );
      if (lastUser) {
        lastUser.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }
      return;
    }

    const breakpoint = leaderboardUsers[inputPreviewValue - 1].points;
    const usersGeqBreakpoint = leaderboardUsers.filter(
      (user) => user.points >= breakpoint
    );
    setEffectiveNumberAwards(usersGeqBreakpoint.length);
    const breakpointUserId =
      leaderboardUsers[usersGeqBreakpoint.length - 1].userId;
    const breakpointUser = document.getElementById(
      `leaderboard-card-${breakpointUserId}`
    );
    if (breakpointUser) {
      breakpointUser.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
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
            <Flex mb={4}>
              {/* input */}
              <Flex direction="column" w={{ base: "50%" }}>
                <FormLabel>Target number of prizes to award</FormLabel>
                <Stack w={{ base: "100%" }} direction="row" mr={4}>
                  <FormControl
                    mr={2}
                    isRequired
                    isInvalid={
                      !previewNumberAwards || !parseInt(previewNumberAwards)
                    }
                  >
                    <Input
                      name="name"
                      type="number"
                      min={0}
                      value={previewNumberAwards}
                      onChange={handleChangePreviewNumber}
                    />
                    <Text pos="absolute" left={4} top={2} pointerEvents="none">
                      <Text as="span" color="transparent">
                        {previewNumberAwards}
                      </Text>
                      &nbsp;&nbsp;
                      {!!effectiveNumberAwards && (
                        <Text as="span" fontStyle="oblique" opacity="0.7">
                          ({effectiveNumberAwards})
                        </Text>
                      )}
                    </Text>
                    {/* <FormHelperText>Max awards to give today</FormHelperText> */}
                    <FormErrorMessage>Field must be a number</FormErrorMessage>
                  </FormControl>
                  <ConfirmButton
                    disabled={!roles.includes("ADMIN")}
                    leaderboardUsers={leaderboardUsers}
                    previewNumberAwards={parseInt(previewNumberAwards) ?? 0}
                    effectiveNumberAwards={effectiveNumberAwards}
                    updatedLeaderboardPreview={updatedLeaderboardPreview}
                    updateLeaderboard={updateLeaderboard}
                  />
                </Stack>
              </Flex>
              {/* stats */}
              <Stack w={{ base: "50%" }} direction="row" ml={4}>
                <Section w="100%" h="100%" p={4}>
                  <LeaderboardStats
                    leaderboardUsers={leaderboardUsers}
                    effectiveNumberAwards={effectiveNumberAwards}
                    updatedLeaderboardPreview={updatedLeaderboardPreview}
                  />
                </Section>
              </Stack>
            </Flex>
          </CardHeader>
          <Divider
            borderBottomWidth="2px"
            borderColor="var(--chakra-colors-chakra-border-color)"
          />
          <CardBody overflowY="scroll">
            <LeaderboardView
              leaderboardUsers={leaderboardUsers}
              numberAwards={effectiveNumberAwards}
              isLoading={isLoading}
            />
          </CardBody>
        </Card>
      </Flex>
    </>
  );
};

export default Leaderboard;
