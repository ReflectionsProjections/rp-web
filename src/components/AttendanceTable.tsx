import { Select, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { useState } from "react";

type StaffType = {
  name: string;
  team: string;
}

type AttendanceTableProps = {
  staff: StaffType[]; // TODO: change to an API type
  meetingDates: string[];
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ staff, meetingDates }) => {
  const [meetingDate, setMeetingDate] = useState(meetingDates[0]);

  const handleMeetingDateChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setMeetingDate(event.target.value);
  }

  return (
    <TableContainer>
      <Table variant='striped' size="lg">
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
              <Tr key={index}>
                <Td>{staffMember.name}</Td>
                <Td>
                  <Select variant="filled" bg="#ddd">
                    <option>Absent</option>
                    <option>Present</option>
                    <option>Excused</option>
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

export default AttendanceTable;
