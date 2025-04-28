import { Box, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AttendanceView from "./AttendanceView";
import { Meeting, StaffAttendance } from "./useAttendanceViewHook";
import moment from "moment";
import { Staff, TeamType } from "./AttendanceTable";

const TEAM_DISPLAY_NAME: Record<TeamType, string>  = {
  'DEV': '💻 Development Team',
  'DESIGN': '🎨 Design Team',
  'CONTENT': '📝 Content Team',
  'MARKETING': '📢 Marketing Team',
  'CORPORATE': '💼 Corporate Team',
  'OPERATIONS': '⚙️ Operations Team',
  'FULL TEAM': '👥 Full Team',
};

type AttendanceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  staff?: Staff;
  meetings: Meeting[];
};

const AttendanceModal: React.FC<AttendanceModalProps> = ({
  isOpen, onClose, staff, meetings
}) => {
  const [staffAttendances, setStaffAttendances] = useState<StaffAttendance[]>([]);

  const staffTeamDisplayName = staff?.team ? TEAM_DISPLAY_NAME[staff.team] : '';

  useEffect(() => {
    if (!staff) return;

    const newStaffAttendances: StaffAttendance[] = meetings
      .filter(meeting => meeting.committeeType === staff.team || meeting.committeeType === 'FULL TEAM')
      .map(meeting => ({
        meetingId: meeting.meetingId,
        committeeType: meeting.committeeType,
        meetingDate: moment(meeting.startTime).toDate(),
        attendanceStatus: staff.attendances?.[meeting.meetingId]
      }));

    setStaffAttendances(newStaffAttendances);
  }, [staff, meetings]);

  if (!staff) {
    return null;
  }

  return (
    <Modal size={"5xl"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent px={2}>
        <ModalHeader>{staff.name} - Attendance</ModalHeader>
        {staffTeamDisplayName && (
          <Box w={"fit-content"} mx={6} bgColor="gray.200" _dark={{ bgColor: 'gray.600' }} p={3} borderRadius={8} mb={5}>
            <Text fontWeight={"medium"}>{staffTeamDisplayName}</Text>
          </Box>
        )}
        <AttendanceView 
          attendanceData={staffAttendances}
          loading={false}
        />
        <ModalCloseButton />
        <ModalBody pb={6} />
      </ModalContent>
    </Modal>    
  );
};

export default AttendanceModal;