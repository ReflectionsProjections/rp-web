import { CalendarIcon } from "@chakra-ui/icons";
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import AttendanceView, { StaffAttendance } from "../../components/Attendanceview";

const DUMMY_ATTENDANCE_DATA: StaffAttendance[] = [
  // October 2023
  {
    meetingType: "Full-Team",
    meetingDate: new Date("2023-10-01"),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Development Team",
    meetingDate: new Date("2023-10-03"),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Product Team",
    meetingDate: new Date("2023-10-05"),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Development Team",
    meetingDate: new Date("2023-10-08"),
    attendanceStatus: "Absent"
  },
  {
    meetingType: "Full-Team",
    meetingDate: new Date("2023-10-09"),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Product Team",
    meetingDate: new Date("2023-10-12"),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Full-Team",
    meetingDate: new Date("2023-10-15"),
    attendanceStatus: "Excused"
  },
  {
    meetingType: "Development Team",
    meetingDate: new Date("2023-10-17"),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Product Team",
    meetingDate: new Date("2023-10-19"),
    attendanceStatus: "Absent"
  },
  {
    meetingType: "Full-Team",
    meetingDate: new Date("2023-10-22"),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Development Team",
    meetingDate: new Date("2023-10-24"),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Full-Team",
    meetingDate: new Date("2023-10-29"),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Development Team",
    meetingDate: new Date("2023-10-31"),
    attendanceStatus: "Excused"
  },
    
  // November 2023
  {
    meetingType: "Full-Team",
    meetingDate: new Date("2023-11-05"),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Product Team",
    meetingDate: new Date("2023-11-07"),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Development Team",
    meetingDate: new Date("2023-11-09"),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Full-Team",
    meetingDate: new Date("2023-11-12"),
    attendanceStatus: "Absent"
  },
    
  // GAP - No meetings from November 13 to December 17
    
  // December 2023
  {
    meetingType: "Full-Team",
    meetingDate: new Date("2023-12-18"),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Development Team",
    meetingDate: new Date("2023-12-19"),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Product Team",
    meetingDate: new Date("2023-12-21"),
    attendanceStatus: "Excused"
  },
  {
    meetingType: "Full-Team",
    meetingDate: new Date("2023-12-26"),
    attendanceStatus: "Absent"
  },
  {
    meetingType: "Development Team",
    meetingDate: new Date("2023-12-28"),
    attendanceStatus: "Present"
  },
    
  // January 2024
  {
    meetingType: "Full-Team",
    meetingDate: new Date("2024-01-02"),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Product Team",
    meetingDate: new Date("2024-01-04"),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Development Team",
    meetingDate: new Date("2024-01-07"),
    attendanceStatus: "Excused"
  },
  {
    meetingType: "Full-Team",
    meetingDate: new Date("2024-01-09"),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Product Team",
    meetingDate: new Date("2024-01-11"),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Development Team",
    meetingDate: new Date("2024-01-14"),
    attendanceStatus: "Present"
  }
];
function StaffAttendanceDetails() {
  const {isOpen, onOpen, onClose} = useDisclosure();

  return (
    <>
      <Button leftIcon={<CalendarIcon />} colorScheme="teal" variant="solid" onClick={onOpen}>
                View Attendance
      </Button>
      <Modal size={"5xl"} closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent px={2}>
          <ModalHeader>Ronit Anandani - Attendance</ModalHeader>
          {/* Make a rectangular box with gray background and text inside of it */}
          <Box w={"fit-content"}  mx={6} bgColor="gray.200" p={3} borderRadius={8} mb={5}>
            <Text fontWeight={"medium"}>{"🖥️  Development Team"}</Text>
          </Box>

          <AttendanceView 
            attendanceData={DUMMY_ATTENDANCE_DATA}
          />
          <ModalCloseButton />
          <ModalBody pb={6}>
          </ModalBody>
        </ModalContent>
      </Modal>    
    </>
  );

}

export default StaffAttendanceDetails;