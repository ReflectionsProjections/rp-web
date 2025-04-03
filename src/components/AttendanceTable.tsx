import { Box, Button, Flex, HStack, Menu, MenuButton, MenuItem, MenuList, Select, Tab, Table, TableContainer, TabList, TabPanel, TabPanels, Tabs, Tbody, Td, Th, Thead, Tooltip, Tr, useDisclosure, useMediaQuery, VStack } from "@chakra-ui/react"
import React, { useMemo, useState } from "react";
import AttendanceModal from "./AttendanceModal";
import { ChevronDownIcon } from "@chakra-ui/icons";

type StaffType = {
  name: string;
  team: string;
}

const teamNames = {
  full: "Full Team",
  design: "Design",
  dev: "Dev",
  content: "Content",
  marketing: "Marketing",
  corporate: "Corporate"
}

const staff = [
  {
    name: "Dev Team 1",
    team: "dev"
  },
  {
    name: "Design Team 1",
    team: "design"
  },
  {
    name: "Content Team 1",
    team: "content"
  },
  {
    name: "Marketing Team 1",
    team: "marketing"
  },
  {
    name: "Corporate Team 1",
    team: "corporate"
  }
];

const AttendanceBox = () => {
  const [isSmall] = useMediaQuery('(max-width: 768px)');
  const [selectedTeam, setSelectedTeam] = useState<keyof typeof teamNames>("full");
  const [selectedStaff, setSelectedStaff] = useState(staff[0]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleStaffSelect = (staff: StaffType) => {
    setSelectedStaff(staff);
    onOpen();
  }

  const staffTeams = useMemo(() => {
    return {
      full: staff,
      design: staff.filter((member) => member.team === "design"),
      dev: staff.filter((member) => member.team === "dev"),
      content: staff.filter((member) => member.team === "content"),
      marketing: staff.filter((member) => member.team === "marketing"),
      corporate: staff.filter((member) => member.team === "corporate"),
    }
  }, [staff])

  const dates = ["3/29", "3/24"];

  const [date, setDate] = useState(dates[0]);

  return (
    <>
      <AttendanceModal isOpen={isOpen} onClose={onClose} staff={selectedStaff} />

      {isSmall
        ? (<VStack gap="2rem">
          <HStack w="100%" justifyContent="center">
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                {teamNames[selectedTeam]}
              </MenuButton>
              <MenuList>
                {Object.entries(teamNames).map(([teamId, teamName]) => {
                  return (<MenuItem onClick={() => setSelectedTeam(teamId as keyof typeof teamNames)}>{teamName}</MenuItem>)
                })}
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                {date}
              </MenuButton>
              <MenuList>
                {dates.map((date, index) => {
                  return (
                    <MenuItem key={index} onClick={() => setDate(date)}>{date}</MenuItem>
                  )
                })}
              </MenuList>
            </Menu>
          </HStack>
          <VStack align="stretch">
            {staffTeams[selectedTeam].map((staffMember, index) => {
              return (<HStack key={index} onClick={() => handleStaffSelect(staffMember)}>
                <Box minW="200px">
                  <h3>{staffMember.name}</h3>
                </Box>
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />} onClick={(event) => event.stopPropagation()}>
                    🔴
                  </MenuButton>
                  <MenuList onClick={(event) => event.stopPropagation()}>
                    <MenuItem>🔴 Absent</MenuItem>
                    <MenuItem>🟢 Present</MenuItem>
                    <MenuItem>🔵 Excused</MenuItem>
                  </MenuList>
                </Menu>
              </HStack>)
            })}
          </VStack>
        </VStack>)
        : (
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
                {Object.values(staffTeams).map((team) => {
                  return (<TabPanel>
                    <AttendanceTable staff={team} meetingDates={dates} handleStaffSelect={handleStaffSelect} />
                  </TabPanel>)
                })}
              </TabPanels>
            </Tabs>
          </Flex>
        )}
    </>
  )
}

type AttendanceTableProps = {
  staff: StaffType[]; // TODO: change to an API type
  meetingDates: string[];
  handleStaffSelect: (staff: StaffType) => void;
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ staff, meetingDates, handleStaffSelect }) => {
  const [meetingDate, setMeetingDate] = useState(meetingDates[0]);

  const handleMeetingDateChange = (date: string) => {
    setMeetingDate(date);
  }

  // TODO: switch from selects to menus
  return (
    <TableContainer minW="lg">
      <Table variant='simple' size="lg">
        <Thead>
          <Tr>
            <Th minW="15vw">Name</Th>
            <Th>
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} >
                  {meetingDate}
                </MenuButton>
                <MenuList>
                  {meetingDates.map((date, index) => {
                    return (
                      <MenuItem key={index} onClick={() => handleMeetingDateChange(date)}>{date}</MenuItem>
                    )
                  })}
                </MenuList>
              </Menu>
            </Th>
            <Th>Attendance</Th>
          </Tr>
        </Thead>
        <Tbody>
          {staff.map((staffMember, index) => {
            return (
              <Tr key={index} onClick={() => handleStaffSelect(staffMember)} cursor="pointer" _hover={{ bgColor: "#ddd" }}>
                <Td>{staffMember.name}</Td>
                <Td>
                  <Select variant="filled" bg="#eee" onClick={(event) => event.stopPropagation()}>
                    <option>🔴 Absent</option>
                    <option>🟢 Present</option>
                    <option>🔵 Excused</option>
                  </Select>
                </Td>
                <Td><AttendanceBar present={500} absent={1} excused={1000} /></Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

type AttendanceBarProps = {
  present: number;
  absent: number;
  excused: number
};

const AttendanceBar: React.FC<AttendanceBarProps> = ({ present, absent, excused }) => {
  const total = present + absent + excused;
  const minPercent = 10;

  const presentPercent = present == 0 ? 0 : Math.max((present / total) * 100 || 0, minPercent);
  const absentPercent = absent == 0 ? 0 : Math.max((absent / total) * 100 || 0, minPercent);
  const excusedPercent = excused == 0 ? 0 : Math.max((excused / total) * 100 || 0, minPercent);

  return (
    <Flex w="25vw" h="20px" borderRadius="md" overflow="hidden" border="1px solid #ccc">
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
