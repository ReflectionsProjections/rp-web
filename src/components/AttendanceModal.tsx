import { Box, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import moment from "moment";
import AttendanceView from "./AttendanceView";
import { StaffAttendance } from "./useAttendanceViewHook";

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
    meetingDate: moment("2023-10-01").toDate(),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Development Team",
    meetingDate: moment("2023-10-03").toDate(),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Development Team",
    meetingDate: moment("2023-10-04").toDate(),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Development Team",
    meetingDate: moment("2023-10-04").toDate(),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Development Team",
    meetingDate: moment("2023-10-04").toDate(),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Product Team",
    meetingDate: moment("2023-10-05").toDate(),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Product Team",
    meetingDate: moment("2023-10-05").toDate(),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Development Team",
    meetingDate: moment("2023-10-08").toDate(),
    attendanceStatus: "Absent"
  },
  {
    meetingType: "Development Team",
    meetingDate: moment("2023-10-08").toDate(),
    attendanceStatus: "Absent"
  },
  {
    meetingType: "Development Team",
    meetingDate: moment("2023-10-08").toDate(),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Full-Team",
    meetingDate: moment("2023-10-09").toDate(),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Full-Team",
    meetingDate: moment("2023-10-09").toDate(),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Full-Team",
    meetingDate: moment("2023-10-09").toDate(),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Product Team",
    meetingDate: moment("2023-10-12").toDate(),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Full-Team",
    meetingDate: moment("2023-10-15").toDate(),
    attendanceStatus: "Excused"
  },
  {
    meetingType: "Development Team",
    meetingDate: moment("2023-10-17").toDate(),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Product Team",
    meetingDate: moment("2023-10-19").toDate(),
    attendanceStatus: "Absent"
  },
  {
    meetingType: "Full-Team",
    meetingDate: moment("2023-10-22").toDate(),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Development Team",
    meetingDate: moment("2023-10-24").toDate(),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Full-Team",
    meetingDate: moment("2023-10-29").toDate(),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Development Team",
    meetingDate: moment("2023-10-31").toDate(),
    attendanceStatus: "Excused"
  },

  // November 2023
  {
    meetingType: "Full-Team",
    meetingDate: moment("2023-11-05").toDate(),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Product Team",
    meetingDate: moment("2023-11-07").toDate(),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Development Team",
    meetingDate: moment("2023-11-09").toDate(),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Full-Team",
    meetingDate: moment("2023-11-12").toDate(),
    attendanceStatus: "Absent"
  },

  // GAP - No meetings from November 13 to December 17

  // December 2023
  {
    meetingType: "Full-Team",
    meetingDate: moment("2023-12-18").toDate(),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Development Team",
    meetingDate: moment("2023-12-19").toDate(),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Product Team",
    meetingDate: moment("2023-12-21").toDate(),
    attendanceStatus: "Excused"
  },
  {
    meetingType: "Full-Team",
    meetingDate: moment("2023-12-26").toDate(),
    attendanceStatus: "Absent"
  },
  {
    meetingType: "Development Team",
    meetingDate: moment("2023-12-28").toDate(),
    attendanceStatus: "Present"
  },

  // January 2024
  {
    meetingType: "Full-Team",
    meetingDate: moment("2024-01-02").toDate(),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Product Team",
    meetingDate: moment("2024-01-04").toDate(),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Development Team",
    meetingDate: moment("2024-01-07").toDate(),
    attendanceStatus: "Excused"
  },
  {
    meetingType: "Full-Team",
    meetingDate: moment("2024-01-09").toDate(),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Product Team",
    meetingDate: moment("2024-01-11").toDate(),
    attendanceStatus: "Present"
  },
  {
    meetingType: "Development Team",
    meetingDate: moment("2024-01-14").toDate(),
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