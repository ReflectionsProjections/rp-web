import { Box, Button, Flex, HStack, Menu, MenuButton, MenuItem, MenuList, Select, Tab, Table, TableContainer, TabList, TabPanel, TabPanels, Tabs, Tbody, Td, Th, Thead, Tr, useDisclosure, useMediaQuery, VStack } from "@chakra-ui/react"
import { useMemo, useState } from "react";
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
            <Tabs size="lg">
              <TabList>
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

  const handleMeetingDateChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setMeetingDate(event.target.value);
  }

  // TODO: switch from selects to menus
  return (
    <TableContainer minW="lg">
      <Table variant='simple' size="lg">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>
              <Select variant="flushed" value={meetingDate} onChange={handleMeetingDateChange}>
                {meetingDates.map((date, index) => {
                  return (
                    <option key={index} value={date}>{date}</option>
                  )
                })}
              </Select>
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
                <Td>attendance data</Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default AttendanceBox;
