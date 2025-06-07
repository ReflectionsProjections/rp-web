import { Heading } from "@chakra-ui/react";
import AttendanceBox from "../../components/AttendanceTable";

const Attendance = () => {
  return (
    <>
      <Heading size="lg">Attendance</Heading>
      <br />
      <AttendanceBox />
    </>
  );
};

export default Attendance;
