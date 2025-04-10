import { Box, Heading } from "@chakra-ui/react";
import AttendanceBox from "../../components/AttendanceTable";

const Attendance = () => {
  return (
    <Box flex="1" minW="90vw" p={4}>
      <Heading size="lg">Attendance</Heading>
      <br />
      <AttendanceBox />
    </Box>
  );
};

export default Attendance;
