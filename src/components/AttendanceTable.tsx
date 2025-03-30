import { Flex, Select, Tab, Table, TableContainer, TabList, TabPanel, TabPanels, Tabs, Tbody, Td, Th, Thead, Tr, useDisclosure, useMediaQuery, VStack } from "@chakra-ui/react"
import { useState } from "react";
import AttendanceModal from "./AttendanceModal";

type StaffType = {
  name: string;
  team: string;
}

const AttendanceBox = () => {
  const [isSmall] = useMediaQuery('(max-width: 768px)');

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

  const dates = ["3/29", "3/24"];

  return isSmall
    ? (<></>)
    : (
      <Flex justify="center">
        <VStack>
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
              <TabPanel>
                <AttendanceTable staff={staff} meetingDates={dates} />
              </TabPanel>
              <TabPanel>
                <AttendanceTable staff={staff.filter((member) => member.team === "design")} meetingDates={dates} />
              </TabPanel>
              <TabPanel>
                <AttendanceTable staff={staff.filter((member) => member.team === "dev")} meetingDates={dates} />
              </TabPanel>
              <TabPanel>
                <AttendanceTable staff={staff.filter((member) => member.team === "content")} meetingDates={dates} />
              </TabPanel>
              <TabPanel>
                <AttendanceTable staff={staff.filter((member) => member.team === "marketing")} meetingDates={dates} />
              </TabPanel>
              <TabPanel>
                <AttendanceTable staff={staff.filter((member) => member.team === "corporate")} meetingDates={dates} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Flex>
    );
}

type AttendanceTableProps = {
  staff: StaffType[]; // TODO: change to an API type
  meetingDates: string[];
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ staff, meetingDates }) => {
  const [meetingDate, setMeetingDate] = useState(meetingDates[0]);
  const [selectedStaff, setSelectedStaff] = useState(staff[0]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleMeetingDateChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setMeetingDate(event.target.value);
  }

  const handleStaffSelect = (staff: StaffType) => {
    setSelectedStaff(staff);
    onOpen();
  }

  return (
    <>
      <AttendanceModal isOpen={isOpen} onClose={onClose} staff={selectedStaff} />

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
    </>
  )
}

export default AttendanceBox;
