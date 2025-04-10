import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
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
import React, { useMemo, useState } from "react";
import AttendanceModal from "./AttendanceModal";
import { ChevronDownIcon } from "@chakra-ui/icons";

type StaffType = {
  name: string;
  team: string;
};

const teams = [
  "Full Team",
  "Design",
  "Dev",
  "Content",
  "Marketing",
  "Corporate",
];

const staff = [
  {
    name: "Dev Team 1",
    team: "dev",
  },
  {
    name: "Design Team 1",
    team: "design",
  },
  {
    name: "Content Team 1",
    team: "content",
  },
  {
    name: "Marketing Team 1",
    team: "marketing",
  },
  {
    name: "Corporate Team 1",
    team: "corporate",
  },
];

type MobileAttendanceBoxProps = {
  meetingDates: string[];
  handleStaffSelect: (staff: StaffType) => void;
};

const MobileAttendanceBox: React.FC<MobileAttendanceBoxProps> = ({
  meetingDates,
  handleStaffSelect,
}) => {
  const [team, setTeam] = useState(teams[0]);

  const handleTeamChange = (team: string) => {
    setTeam(team);
  };

  const staffTeams = useMemo(() => {
    return {
      full: staff,
      design: staff.filter((member) => member.team === "design"),
      dev: staff.filter((member) => member.team === "dev"),
      content: staff.filter((member) => member.team === "content"),
      marketing: staff.filter((member) => member.team === "marketing"),
      corporate: staff.filter((member) => member.team === "corporate"),
    };
  }, []);

  const filteredStaff = useMemo(() => {
    const teamKey = team.toLowerCase().replace(" ", "");
    if (teamKey === "fullteam") {
      return staffTeams.full;
    }

    return staffTeams[teamKey as keyof typeof staffTeams] || staffTeams.full;
  }, [team, staffTeams]);

  return (
    <Flex justify="center" direction="column" align="center">
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mb={4}>
          {team}
        </MenuButton>
        <MenuList>
          {teams.map((team, index) => (
            <MenuItem key={index} onClick={() => handleTeamChange(team)}>
              {team}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <AttendanceTable
        staff={filteredStaff}
        meetingDates={meetingDates}
        handleStaffSelect={handleStaffSelect}
        showProgressBar={false}
      />
    </Flex>
  );
};

const AttendanceBox = () => {
  const [isSmall] = useMediaQuery("(max-width: 768px)");
  const [selectedStaff, setSelectedStaff] = useState(staff[0]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleStaffSelect = (staff: StaffType) => {
    setSelectedStaff(staff);
    onOpen();
  };

  const staffTeams = useMemo(() => {
    return {
      full: staff,
      design: staff.filter((member) => member.team === "design"),
      dev: staff.filter((member) => member.team === "dev"),
      content: staff.filter((member) => member.team === "content"),
      marketing: staff.filter((member) => member.team === "marketing"),
      corporate: staff.filter((member) => member.team === "corporate"),
    };
  }, []);

  const dates = ["3/29", "3/24"];

  return (
    <>
      <AttendanceModal
        isOpen={isOpen}
        onClose={onClose}
        staff={selectedStaff}
      />

      {isSmall ? (
        <MobileAttendanceBox
          meetingDates={dates}
          handleStaffSelect={handleStaffSelect}
        />
      ) : (
        <Flex justify="center">
          <Tabs size="lg" minW="60vw">
            <TabList justifyContent="center">
              <Tab>Full Team</Tab>
              <Tab>Design</Tab>
              <Tab>Dev</Tab>
              <Tab>Content</Tab>
              <Tab>Marketing</Tab>
              <Tab>Corporate</Tab>
            </TabList>
            <TabPanels>
              {Object.values(staffTeams).map((team, index) => (
                <TabPanel key={index}>
                  <AttendanceTable
                    staff={team}
                    meetingDates={dates}
                    handleStaffSelect={handleStaffSelect}
                    showProgressBar={true}
                  />
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
  staff: StaffType[];
  meetingDates: string[];
  handleStaffSelect: (staff: StaffType) => void;
  showProgressBar: boolean;
};

const AttendanceTable: React.FC<AttendanceTableProps> = ({
  staff,
  meetingDates,
  handleStaffSelect,
  showProgressBar,
}) => {
  const [meetingDate, setMeetingDate] = useState(meetingDates[0]);

  const handleMeetingDateChange = (date: string) => {
    setMeetingDate(date);
  };

  return (
    <TableContainer minW={showProgressBar ? "lg" : "auto"} maxW="95vw">
      <Table variant="simple" size={showProgressBar ? "lg" : "md"}>
        <Thead>
          <Tr>
            <Th minW={showProgressBar ? "15vw" : "auto"}>Name</Th>
            <Th>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  size={showProgressBar ? "md" : "sm"}
                >
                  {meetingDate}
                </MenuButton>
                <MenuList>
                  {meetingDates.map((date, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => handleMeetingDateChange(date)}
                    >
                      {date}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Th>
            {showProgressBar && <Th>Attendance</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {staff.map((staffMember, index) => (
            <Tr
              key={index}
              onClick={() => handleStaffSelect(staffMember)}
              cursor="pointer"
              _hover={{ bgColor: "#ddd" }}
            >
              <Td>{staffMember.name}</Td>
              <Td>
                <Select
                  variant="filled"
                  onClick={(event) => event.stopPropagation()}
                  size={showProgressBar ? "md" : "sm"}
                >
                  <option>🔴 Absent</option>
                  <option>🟢 Present</option>
                  <option>🔵 Excused</option>
                </Select>
              </Td>
              {showProgressBar && (
                <Td>
                  <AttendanceBar present={500} absent={1} excused={1000} />
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
  present: number;
  absent: number;
  excused: number;
};

const AttendanceBar: React.FC<AttendanceBarProps> = ({
  present,
  absent,
  excused,
}) => {
  const total = present + absent + excused;
  const minPercent = 10;

  const presentPercent =
    present == 0 ? 0 : Math.max((present / total) * 100 || 0, minPercent);
  const absentPercent =
    absent == 0 ? 0 : Math.max((absent / total) * 100 || 0, minPercent);
  const excusedPercent =
    excused == 0 ? 0 : Math.max((excused / total) * 100 || 0, minPercent);

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
