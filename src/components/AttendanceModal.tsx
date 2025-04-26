import { Box, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import api from "../util/api";
import AttendanceView from "./AttendanceView";
import { Meeting, StaffAttendance } from "./useAttendanceViewHook";
import moment from "moment";
import { Staff } from "./AttendanceTable";

type AttendanceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  staff?: Staff
}

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
  const [loading, setLoading] = useState(false);
  const [staffAttendances, setStaffAttendances] = useState<StaffAttendance[]>([]);

  const staffTeamDisplayName = TEAM_DISPLAY_NAME[staff?.team as keyof typeof TEAM_DISPLAY_NAME] || '';

  const handleLoadStaffAttendances = async () => {
    setLoading(true);
    const meetings = await api.get('/meetings/');
    const meetingsData = meetings.data as Meeting[];
    console.log('meetingsData', meetingsData);
    const newStaffAttendances: StaffAttendance[] = [];
    for (const meeting of meetingsData) {
      const meetingId = meeting.meetingId;
      const committeeType = meeting.committeeType;
      const startTime = meeting.startTime;
      const attendanceStatus = staff?.attendances?.[meetingId] || 'ABSENT';
      newStaffAttendances.push({
        meetingId,
        committeeType,
        meetingDate: moment(startTime).toDate(),
        attendanceStatus
      });
    }

    console.log('newStaffAttendances', newStaffAttendances);

    setStaffAttendances(newStaffAttendances);
    setLoading(false);
  };

  useEffect(() => {
    handleLoadStaffAttendances();
  }, []);

  if (!staff) {
    return <></>;
  }

  return (
    <Modal size={"5xl"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent px={2}>
        <ModalHeader>{staff.name} - Attendance</ModalHeader>
        {staffTeamDisplayName && (
          <Box w={"fit-content"}  mx={6} bgColor="gray.200" _dark={{
            bgColor: 'gray.600'
          }} p={3} borderRadius={8} mb={5}>
            <Text fontWeight={"medium"}>{staffTeamDisplayName}</Text>
          </Box>
        )}
        <AttendanceView 
          attendanceData={staffAttendances}
          loading={loading}
        />
        <ModalCloseButton />
        <ModalBody pb={6}>
        </ModalBody>
      </ModalContent>
    </Modal>    
  );
};

export default AttendanceModal;