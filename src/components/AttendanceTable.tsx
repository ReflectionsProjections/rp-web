import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
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
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import AttendanceModal from "./AttendanceModal";
import { ChevronDownIcon } from "@chakra-ui/icons";
import api from "../util/api";

export type AttendanceStatus = 'ABSENT' | 'PRESENT' | 'EXCUSED';
export type AttendanceType = AttendanceStatus | undefined;
export type TeamType = 'FULL TEAM' | 'DESIGN' | 'DEV' | 'CONTENT' | 'MARKETING' | 'CORPORATE';

const Teams: TeamType[] = ['FULL TEAM', 'DESIGN', 'DEV', 'CONTENT', 'MARKETING', 'CORPORATE'];

export type Staff = {
  userId: string;
  name: string;
  team: TeamType;
  attendances: Record<string, AttendanceType>; // maps meetingId to attendanceType
};

type StaffStatistics = Record<'ABSENT' | 'PRESENT' | 'EXCUSED' | 'TOTAL', number>

type ParsedStaff = Staff & {
  statistics: StaffStatistics;
}

type Meeting = {
  meetingId: string;
  committeeType: TeamType;
  startTime: string;
}

type ParsedMeeting = {
  meetingId: string;
  committeeType: TeamType;
  startTime: Date;
}

const meetingSortFunction = ({ startTime: a }: { startTime: Date }, { startTime: b }: { startTime: Date }) => { return b.getTime() - a.getTime(); };

const teamTypeToDisplayText = (team: TeamType) => {
  switch (team) {
  case 'FULL TEAM':
    return "Full Team";
  case 'DESIGN':
    return "Design";
  case 'DEV':
    return "Dev";
  case 'CONTENT':
    return "Content";
  case 'MARKETING':
    return "Marketing";
  case "CORPORATE":
    return "Corporate";
  }
};

const AttendanceBox = () => {
  const [isSmall] = useMediaQuery("(max-width: 768px)");
  const [staff, setStaff] = useState<Staff[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<Staff | undefined>(undefined);
  const [selectedTeam, setSelectedTeam] = useState<TeamType>("FULL TEAM");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    Promise.all([api.get<Staff[]>("/staff"), api.get<Meeting[]>("/meetings")]).then(([staff, meetings]) => {
      setStaff(staff.data);
      setMeetings(meetings.data);
      setLoading(false);
    });
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleStaffSelect = (staff: Staff) => {
    setSelectedStaff(staff);
    onOpen();
  };

  const handleStaffAttendance = async (staffId: string, meetingId: string, attendanceType: AttendanceType) => {
    setUpdating(true);
    const response = await api.post(`/staff/${staffId}/attendance`, { meetingId, attendanceType });
    setStaff(previous => previous.map((member) => member.userId === response.data.userId ? response.data : member));
    setUpdating(false);
  };

  const teamMeetings: Record<TeamType, ParsedMeeting[]> = useMemo(() => {
    const parsedMeetings = meetings.map((meeting) => {
      return {
        meetingId: meeting.meetingId,
        committeeType: meeting.committeeType,
        startTime: new Date(meeting.startTime)
      };
    });
    return {
      "FULL TEAM": parsedMeetings.filter((meeting) => meeting.committeeType === "FULL TEAM").sort(meetingSortFunction),
      DESIGN: parsedMeetings.filter((meeting) => meeting.committeeType === "DESIGN" || meeting.committeeType === "FULL TEAM").sort(meetingSortFunction),
      DEV: parsedMeetings.filter((meeting) => meeting.committeeType === "DEV" || meeting.committeeType === "FULL TEAM").sort(meetingSortFunction),
      CONTENT: parsedMeetings.filter((meeting) => meeting.committeeType === "CONTENT" || meeting.committeeType === "FULL TEAM").sort(meetingSortFunction),
      MARKETING: parsedMeetings.filter((meeting) => meeting.committeeType === "MARKETING" || meeting.committeeType === "FULL TEAM").sort(meetingSortFunction),
      CORPORATE: parsedMeetings.filter((meeting) => meeting.committeeType === "CORPORATE" || meeting.committeeType === "FULL TEAM").sort(meetingSortFunction),
    };
  }, [meetings]);

  const staffTeams: Record<TeamType, ParsedStaff[]> = useMemo(() => {
    const parsedStaff = staff.map((member) => {
      const statistics = Object.values(member.attendances).reduce((acc, type) => {
        acc[type ?? "ABSENT"]++;
        acc.TOTAL++;
        return acc;
      }, { ABSENT: 0, PRESENT: 0, EXCUSED: 0, TOTAL: 0 });

      if (statistics.TOTAL < teamMeetings[member.team].length) {
        const difference = teamMeetings[member.team].length - statistics.TOTAL;
        statistics.ABSENT += difference;
        statistics.TOTAL += difference;
      }

      return {
        ...member,
        statistics
      };
    });

    return {
      "FULL TEAM": parsedStaff,
      DESIGN: parsedStaff.filter((member) => member.team === "DESIGN"),
      DEV: parsedStaff.filter((member) => member.team === "DEV"),
      CONTENT: parsedStaff.filter((member) => member.team === "CONTENT"),
      MARKETING: parsedStaff.filter((member) => member.team === "MARKETING"),
      CORPORATE: parsedStaff.filter((member) => member.team === "CORPORATE"),
    };
  }, [staff, teamMeetings]);

  return (
    <>
      <AttendanceModal
        isOpen={isOpen}
        onClose={onClose}
        staff={selectedStaff}
      />

      {isSmall ? <Flex justify="center" direction="column" align="center">
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mb={4}>
            {teamTypeToDisplayText(selectedTeam)}
          </MenuButton>
          <MenuList>
            {Teams.map((team, index) => (
              <MenuItem key={index} onClick={() => setSelectedTeam(team)}>
                {teamTypeToDisplayText(team)}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        {(!loading && (teamMeetings[selectedTeam].length === 0 || staffTeams[selectedTeam].length === 0)) ? <p>no meetings yet :(</p> : <AttendanceTable
          staff={staffTeams[selectedTeam]}
          meetings={teamMeetings[selectedTeam]}
          handleStaffSelect={handleStaffSelect}
          handleStaffAttendance={handleStaffAttendance}
          isSmall={isSmall}
          updating={updating}
        />}
      </Flex> : <Flex justify="center">
        <Tabs size="lg" minW="60vw">
          <TabList justifyContent="center">
            {Teams.map((team, index) => {
              return <Tab key={index}>{teamTypeToDisplayText(team)}</Tab>;
            })}
          </TabList>
          <TabPanels>
            {(Object.entries(staffTeams) as [TeamType, ParsedStaff[]][]).map(([teamName, team], index) => (
              <TabPanel key={index}>
                {(!loading && (teamMeetings[teamName].length === 0 || team.length === 0)) ? <p>no meetings yet :(</p> : <AttendanceTable
                  staff={team}
                  meetings={teamMeetings[teamName]}
                  handleStaffSelect={handleStaffSelect}
                  handleStaffAttendance={handleStaffAttendance}
                  isSmall={isSmall}
                  updating={updating}
                />}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Flex>}
    </>
  );
};

type AttendanceTableProps = {
  staff: ParsedStaff[];
  meetings: ParsedMeeting[];
  handleStaffSelect: (staff: Staff) => void;
  handleStaffAttendance: (staffId: string, meetingId: string, attendanceType: AttendanceType) => void;
  isSmall: boolean;
  updating: boolean;
};

const attendanceTypeToDisplayText = (attendanceType: AttendanceType) => {
  switch (attendanceType) {
  case 'PRESENT':
    return "🟢 Present";
  case 'EXCUSED':
    return "🔵 Excused";
  default:
    return "🔴 Absent";
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
  const [selectedMeeting, setSelectedMeeting] = useState<ParsedMeeting>(() => meetings[0]);

  const SelectAttendance = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, staffId: string, attendanceType: AttendanceType) => {
    event.stopPropagation();
    handleStaffAttendance(staffId, selectedMeeting.meetingId, attendanceType);
  };

  useEffect(() => {
    if (meetings.length > 0) {
      setSelectedMeeting(meetings[0]);
    }
  }, [meetings]);

  return (
    <TableContainer minW={isSmall ? "auto" : "lg"} maxW="95vw">
      <Table variant="simple" size={isSmall ? "md" : "lg"}>
        <Thead>
          <Tr>
            <Th minW={isSmall ? "auto" : "15vw"}>Name</Th>
            <Th>
              {!selectedMeeting ? "Meeting" : <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  size={isSmall ? "sm" : "md"}
                >
                  {selectedMeeting.startTime.toLocaleDateString("en-US", {
                    timeZone: "America/Chicago",
                    month: "2-digit",
                    day: "2-digit"
                  })}
                </MenuButton>
                <MenuList>
                  {meetings.map((meeting, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => setSelectedMeeting(meeting)}
                    >
                      {meeting.startTime.toLocaleDateString("en-US", {
                        timeZone: "America/Chicago",
                        month: "2-digit",
                        day: "2-digit"
                      })}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>}
            </Th>
            {!isSmall && <Th>Attendance</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {!selectedMeeting ? Array.from({ length: 5 }).map((_, i) => (
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
          )) : staff.map((staffMember, index) => (
            <Tr
              key={index}
              onClick={() => handleStaffSelect(staffMember)}
              cursor="pointer"
              _hover={{ bgColor: "#ddd" }}
            >
              <Td>{staffMember.name}</Td>
              <Td>
                <Menu size={isSmall ? "sm" : "md"}>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mb={4} isDisabled={updating} onClick={(event) => event.stopPropagation()}>
                    {attendanceTypeToDisplayText(staffMember.attendances[selectedMeeting.meetingId])}
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={(event) => SelectAttendance(event, staffMember.userId, "ABSENT")}>
                      🔴 Absent
                    </MenuItem>
                    <MenuItem onClick={(event) => SelectAttendance(event, staffMember.userId, "PRESENT")}>
                      🟢 Present
                    </MenuItem>
                    <MenuItem onClick={(event) => SelectAttendance(event, staffMember.userId, "EXCUSED")}>
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

const AttendanceBar: React.FC<AttendanceBarProps> = ({
  statistics
}) => {
  const { ABSENT: absent, PRESENT: present, EXCUSED: excused, TOTAL: total } = statistics;
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
