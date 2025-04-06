import { Box, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import AttendanceView, { StaffAttendance } from "./AttendanceView";

type StaffType = {
  name: string;
  team: string;
}

type AttendanceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  staff?: StaffType
}

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

const TEAM_DISPLAY_NAME = {
  'dev': '💻 Development Team',
  'design': '🎨 Design Team',
  'content': '📝 Content Team',
  'marketing': '📢 Marketing Team',
  'corporate': '💼 Corporate Team'
};

const AttendanceModal: React.FC<AttendanceModalProps> = ({
  isOpen, onClose, staff
}) => {

  const staffTeamDisplayName = TEAM_DISPLAY_NAME[staff?.team as keyof typeof TEAM_DISPLAY_NAME] || '';

  if (!staff) {
    return <></>;
  }
  return (
    <Modal size={"5xl"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent px={2}>
        <ModalHeader>{staff.name} - Attendance</ModalHeader>
        <Box w={"fit-content"}  mx={6} bgColor="gray.200" _dark={{
          bgColor: 'gray.600'
        }} p={3} borderRadius={8} mb={5}>
          <Text fontWeight={"medium"}>{staffTeamDisplayName}</Text>
        </Box>
        <AttendanceView 
          attendanceData={DUMMY_ATTENDANCE_DATA}
        />
        <ModalCloseButton />
        <ModalBody pb={6}>
        </ModalBody>
      </ModalContent>
    </Modal>    
  );
};

export default AttendanceModal;