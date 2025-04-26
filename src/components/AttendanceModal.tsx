import { Box, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import api from "../util/api";
import AttendanceView from "./AttendanceView";
import { Meeting, StaffAttendance } from "./useAttendanceViewHook";
import moment from "moment";
import { Staff, TEAM_DISPLAY_NAME } from "./AttendanceTable";

type AttendanceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  staff?: Staff
}

const AttendanceModal: React.FC<AttendanceModalProps> = ({
  isOpen, onClose, staff
}) => {
  const [loading, setLoading] = useState(false);
  const [staffAttendances, setStaffAttendances] = useState<StaffAttendance[]>([]);

  const staffTeamDisplayName = staff?.team ? TEAM_DISPLAY_NAME[staff.team] : '';

  const handleLoadStaffAttendances = async () => {
    setLoading(true);
    const meetings = await api.get('/meetings/');
    const meetingsData = meetings.data as Meeting[];
    const newStaffAttendances: StaffAttendance[] = [];
    for (const meeting of meetingsData) {
      const committeeType = meeting.committeeType;
      if (committeeType == staff?.team || committeeType == 'FULL TEAM') {
        const meetingId = meeting.meetingId;

        const startTime = meeting.startTime;
        const attendanceStatus = staff?.attendances?.[meetingId];
        newStaffAttendances.push({
          meetingId,
          committeeType,
          meetingDate: moment(startTime).toDate(),
          attendanceStatus
        });
      }
    }

    setStaffAttendances(newStaffAttendances);
    setLoading(false);
  };

  useEffect(() => {
    handleLoadStaffAttendances();
  }, [staff]);

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