import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Skeleton,
  SkeletonText,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
  useMediaQuery,
  useToast
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import AttendanceModal from "./AttendanceModal";
import { ChevronDownIcon } from "@chakra-ui/icons";
import api from "../util/api";
import {
  AttendanceType,
  Meeting,
  path,
  Staff,
  CommitteeType,
  usePolling
} from "@rp/shared";
import { useMirrorStyles } from "@/styles/Mirror";

type StaffStatistics = Record<
  "ABSENT" | "PRESENT" | "EXCUSED" | "TOTAL",
  number
>;

type ParsedStaff = Staff & {
  statistics: StaffStatistics;
};

type ParsedMeeting = Omit<Meeting, "startTime"> & {
  startTime: Date;
};

const meetingSortFunction = (
  { startTime: a }: { startTime: Date },
  { startTime: b }: { startTime: Date }
) => {
  return b.getTime() - a.getTime();
};

const teamTypeToDisplayText = (team: CommitteeType) => {
  switch (team) {
    case "FULL TEAM":
      return "Full Team";
    case "DESIGN":
      return "Design";
    case "DEV":
      return "Dev";
    case "CONTENT":
      return "Content";
    case "MARKETING":
      return "Marketing";
    case "CORPORATE":
      return "Corporate";
    case "OPERATIONS":
      return "Operations";
  }
};

const AttendanceBox = () => {
  const [isSmall] = useMediaQuery("(max-width: 768px)");
  const [selectedStaff, setSelectedStaff] = useState<Staff | undefined>(
    undefined
  );
  const [selectedTeam, setSelectedTeam] = useState<CommitteeType>("FULL TEAM");
  const [updating, setUpdating] = useState(false);
  const {
    data: staff,
    isLoading: staffLoading,
    mutate: mutateStaff
  } = usePolling(api, "/staff");
  const { data: meetings, isLoading: meetingsLoading } = usePolling(
    api,
    "/meetings"
  );
  const toast = useToast();

  const mirrorStyle = useMirrorStyles();
  const mirrorStyleAnimated = useMirrorStyles(true);

  const loading = staffLoading || meetingsLoading;

  const showToast = (message: string, error: boolean) => {
    toast({
      title: message,
      status: error ? "error" : "success",
      duration: 9000,
      isClosable: true
    });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleStaffSelect = (staff: Staff) => {
    setSelectedStaff(staff);
    onOpen();
  };

  const handleStaffAttendance = (
    staffId: string,
    meetingId: string,
    attendanceType: AttendanceType
  ) => {
    setUpdating(true);
    api
      .post(path("/staff/:staffId/attendance", { staffId }), {
        meetingId,
        attendanceType
      })
      .then((response) => {
        mutateStaff(
          (previous) =>
            previous?.map((member) =>
              member.userId === response.data.userId ? response.data : member
            ) ?? [response.data]
        );
        setUpdating(false);
      })
      .catch((err) => {
        console.log(err);
        showToast("Error updating attendance", true);
      });
  };

  const teamMeetings: Record<CommitteeType, ParsedMeeting[]> = useMemo(() => {
    const parsedMeetings =
      meetings?.map((meeting) => {
        return {
          meetingId: meeting.meetingId,
          committeeType: meeting.committeeType,
          startTime: new Date(meeting.startTime)
        };
      }) ?? [];
    return {
      "FULL TEAM": parsedMeetings
        .filter((meeting) => meeting.committeeType === "FULL TEAM")
        .sort(meetingSortFunction),
      CONTENT: parsedMeetings
        .filter(
          (meeting) =>
            meeting.committeeType === "CONTENT" ||
            meeting.committeeType === "FULL TEAM"
        )
        .sort(meetingSortFunction),
      CORPORATE: parsedMeetings
        .filter(
          (meeting) =>
            meeting.committeeType === "CORPORATE" ||
            meeting.committeeType === "FULL TEAM"
        )
        .sort(meetingSortFunction),
      DESIGN: parsedMeetings
        .filter(
          (meeting) =>
            meeting.committeeType === "DESIGN" ||
            meeting.committeeType === "FULL TEAM"
        )
        .sort(meetingSortFunction),
      DEV: parsedMeetings
        .filter(
          (meeting) =>
            meeting.committeeType === "DEV" ||
            meeting.committeeType === "FULL TEAM"
        )
        .sort(meetingSortFunction),
      MARKETING: parsedMeetings
        .filter(
          (meeting) =>
            meeting.committeeType === "MARKETING" ||
            meeting.committeeType === "FULL TEAM"
        )
        .sort(meetingSortFunction),
      OPERATIONS: parsedMeetings
        .filter(
          (meeting) =>
            meeting.committeeType === "OPERATIONS" ||
            meeting.committeeType === "FULL TEAM"
        )
        .sort(meetingSortFunction)
    };
  }, [meetings]);

  const staffTeams: Record<CommitteeType, ParsedStaff[]> = useMemo(() => {
    const parsedStaff =
      staff?.map((member) => {
        const statistics = Object.values(member.attendances).reduce(
          (acc, type) => {
            acc[type ?? "ABSENT"]++;
            acc.TOTAL++;
            return acc;
          },
          { ABSENT: 0, PRESENT: 0, EXCUSED: 0, TOTAL: 0 }
        );

        if (statistics.TOTAL < teamMeetings[member.team].length) {
          const difference =
            teamMeetings[member.team].length - statistics.TOTAL;
          statistics.ABSENT += difference;
          statistics.TOTAL += difference;
        }

        return {
          ...member,
          statistics
        };
      }) ?? [];

    return {
      "FULL TEAM": parsedStaff,
      CONTENT: parsedStaff.filter((member) => member.team === "CONTENT"),
      CORPORATE: parsedStaff.filter((member) => member.team === "CORPORATE"),
      DESIGN: parsedStaff.filter((member) => member.team === "DESIGN"),
      DEV: parsedStaff.filter((member) => member.team === "DEV"),
      MARKETING: parsedStaff.filter((member) => member.team === "MARKETING"),
      OPERATIONS: parsedStaff.filter((member) => member.team === "OPERATIONS")
    };
  }, [staff, teamMeetings]);

  return (
    <>
      {selectedStaff && (
        <AttendanceModal
          isOpen={isOpen}
          onClose={onClose}
          staff={selectedStaff}
          meetings={meetings ?? []}
        />
      )}

      {isSmall ? (
        <Flex justify="center" direction="column" align="center">
          <Menu>
            <MenuButton
              as={Button}
              sx={mirrorStyleAnimated}
              rightIcon={<ChevronDownIcon />}
              mb={4}
            >
              {teamTypeToDisplayText(selectedTeam)}
            </MenuButton>
            <MenuList sx={mirrorStyle} maxH="40vh" overflowY="scroll">
              {(Object.keys(staffTeams) as CommitteeType[]).map(
                (team, index) => (
                  <>
                    {index !== 0 && <MenuDivider />}
                    <MenuItem
                      key={team}
                      onClick={() => setSelectedTeam(team)}
                      bg="transparent"
                    >
                      {teamTypeToDisplayText(team)}
                    </MenuItem>
                  </>
                )
              )}
            </MenuList>
          </Menu>
          {!loading &&
          (teamMeetings[selectedTeam].length === 0 ||
            staffTeams[selectedTeam].length === 0) ? (
            <p>no meetings yet :(</p>
          ) : (
            <AttendanceTable
              staff={staffTeams[selectedTeam]}
              meetings={teamMeetings[selectedTeam]}
              handleStaffSelect={handleStaffSelect}
              handleStaffAttendance={handleStaffAttendance}
              isSmall={isSmall}
              updating={updating}
            />
          )}
        </Flex>
      ) : (
        <Flex justify="center">
          <Tabs size="lg" minW="60vw">
            <TabList justifyContent="center">
              {(Object.keys(staffTeams) as CommitteeType[]).map((team) => {
                return <Tab key={team}>{teamTypeToDisplayText(team)}</Tab>;
              })}
            </TabList>
            <TabPanels>
              {(
                Object.entries(staffTeams) as [CommitteeType, ParsedStaff[]][]
              ).map(([teamName, team], index) => (
                <TabPanel key={index}>
                  {!loading &&
                  (teamMeetings[teamName].length === 0 || team.length === 0) ? (
                    <p>no meetings yet :(</p>
                  ) : (
                    <AttendanceTable
                      staff={team}
                      meetings={teamMeetings[teamName]}
                      handleStaffSelect={handleStaffSelect}
                      handleStaffAttendance={handleStaffAttendance}
                      isSmall={isSmall}
                      updating={updating}
                    />
                  )}
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Flex>
      )}
    </>
  );
};

type AttendanceTableProps = {
  staff: ParsedStaff[];
  meetings: ParsedMeeting[];
  handleStaffSelect: (staff: Staff) => void;
  handleStaffAttendance: (
    staffId: string,
    meetingId: string,
    attendanceType: AttendanceType
  ) => void;
  isSmall: boolean;
  updating: boolean;
};

const attendanceTypeToDisplayText = (
  attendanceType: AttendanceType | undefined,
  isSmall: boolean
) => {
  switch (attendanceType) {
    case "PRESENT":
      return isSmall ? "🟢" : "🟢 Present";
    case "EXCUSED":
      return isSmall ? "🔵" : "🔵 Excused";
    default:
      return isSmall ? "🔴" : "🔴 Absent";
  }
};

const AttendanceTable: React.FC<AttendanceTableProps> = ({
  staff,
  meetings,
  handleStaffSelect,
  handleStaffAttendance,
  isSmall,
  updating
}) => {
  const [selectedMeeting, setSelectedMeeting] = useState<ParsedMeeting>(
    () => meetings[0]
  );
  const mirrorStyle = useMirrorStyles();
  const mirrorStyleAnimated = useMirrorStyles(true);

  const SelectAttendance = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    staffId: string,
    attendanceType: AttendanceType
  ) => {
    event.stopPropagation();
    handleStaffAttendance(staffId, selectedMeeting.meetingId, attendanceType);
  };

  useEffect(() => {
    if (meetings.length > 0) {
      setSelectedMeeting((prev) => {
        const stillExists =
          prev && meetings.find((m) => m.meetingId === prev.meetingId);
        return stillExists ? prev : meetings[0];
      });
    }
  }, [meetings]);

  return (
    <TableContainer minW={isSmall ? "auto" : "lg"} maxW="100vw">
      <Table variant="simple" size={isSmall ? "md" : "lg"}>
        <Thead>
          <Tr>
            <Th minW={isSmall ? "auto" : "15vw"}>Name</Th>
            <Th>
              {!selectedMeeting ? (
                "Meeting"
              ) : (
                <Menu>
                  <MenuButton
                    as={Button}
                    sx={mirrorStyleAnimated}
                    rightIcon={<ChevronDownIcon />}
                    size={isSmall ? "sm" : "md"}
                  >
                    {selectedMeeting.startTime.toLocaleDateString("en-US", {
                      timeZone: "America/Chicago",
                      month: "2-digit",
                      day: "2-digit"
                    })}
                  </MenuButton>
                  <MenuList sx={mirrorStyle} maxH="40vh" overflowY="scroll">
                    {meetings.map((meeting, index) => (
                      <>
                        {index !== 0 && <MenuDivider key={index} />}
                        <MenuItem
                          key={index}
                          onClick={() => setSelectedMeeting(meeting)}
                          bg="transparent"
                        >
                          {meeting.startTime.toLocaleDateString("en-US", {
                            timeZone: "America/Chicago",
                            month: "2-digit",
                            day: "2-digit"
                          })}
                        </MenuItem>
                      </>
                    ))}
                  </MenuList>
                </Menu>
              )}
            </Th>
            {!isSmall && <Th>Attendance</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {!selectedMeeting
            ? Array.from({ length: 5 }).map((_, i) => (
                <Tr key={i}>
                  <Td>
                    <SkeletonText noOfLines={1} />
                  </Td>
                  <Td>
                    <Skeleton height="20px" />
                  </Td>
                  {!isSmall && (
                    <Td>
                      <Skeleton height="20px" />
                    </Td>
                  )}
                </Tr>
              ))
            : staff.map((staffMember, index) => (
                <Tr
                  key={index}
                  onClick={() => {
                    if (selectedMeeting) handleStaffSelect(staffMember);
                  }}
                  cursor="pointer"
                  _hover={{ bgColor: "#8888882d" }}
                >
                  <Td>{staffMember.name}</Td>
                  <Td>
                    <Menu size={isSmall ? "sm" : "md"}>
                      <MenuButton
                        as={Button}
                        sx={mirrorStyleAnimated}
                        rightIcon={<ChevronDownIcon />}
                        isDisabled={updating}
                        onClick={(event) => event.stopPropagation()}
                      >
                        {attendanceTypeToDisplayText(
                          selectedMeeting
                            ? staffMember.attendances[selectedMeeting.meetingId]
                            : undefined,
                          isSmall
                        )}
                      </MenuButton>
                      <MenuList sx={mirrorStyle}>
                        <MenuItem
                          bg="transparent"
                          onClick={(event) =>
                            SelectAttendance(
                              event,
                              staffMember.userId,
                              "ABSENT"
                            )
                          }
                        >
                          🔴 Absent
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem
                          bg="transparent"
                          onClick={(event) =>
                            SelectAttendance(
                              event,
                              staffMember.userId,
                              "PRESENT"
                            )
                          }
                        >
                          🟢 Present
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem
                          bg="transparent"
                          onClick={(event) =>
                            SelectAttendance(
                              event,
                              staffMember.userId,
                              "EXCUSED"
                            )
                          }
                        >
                          🔵 Excused
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                  {!isSmall && (
                    <Td>
                      <AttendanceBar statistics={staffMember.statistics} />
                    </Td>
                  )}
                </Tr>
              ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

type AttendanceBarProps = {
  statistics: StaffStatistics;
};

const AttendanceBar: React.FC<AttendanceBarProps> = ({ statistics }) => {
  const {
    ABSENT: absent,
    PRESENT: present,
    EXCUSED: excused,
    TOTAL: total
  } = statistics;
  const minPercent = 10;

  const presentPercent =
    present === 0 ? 0 : Math.max((present / total) * 100 || 0, minPercent);
  const absentPercent =
    absent === 0 ? 0 : Math.max((absent / total) * 100 || 0, minPercent);
  const excusedPercent =
    excused === 0 ? 0 : Math.max((excused / total) * 100 || 0, minPercent);

  return (
    <Flex
      w="25vw"
      h="20px"
      borderRadius="md"
      overflow="hidden"
      border="1px solid #ccc"
    >
      <Tooltip label={`${present} Present`} hasArrow>
        <Box w={`${presentPercent}%`} bg="green.400" h="full" />
      </Tooltip>
      <Tooltip label={`${absent} Absent`} hasArrow>
        <Box w={`${absentPercent}%`} bg="red.400" h="full" />
      </Tooltip>
      <Tooltip label={`${excused} Excused`} hasArrow>
        <Box w={`${excusedPercent}%`} bg="blue.400" h="full" />
      </Tooltip>
    </Flex>
  );
};

export default AttendanceBox;
