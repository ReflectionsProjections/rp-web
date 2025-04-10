import { Box, Text, Tooltip, VStack } from "@chakra-ui/react";
import moment from "moment";
import { ATTENDANCE_STATUS_COLORS, ATTENDANCE_STATUS_COLORS_DARK, AttendanceItem, BOX_SIZE, StaffAttendance, useAttendanceViewHook, WeekData } from "./useAttendanceViewHook";

const BOX_SIZE_PX = `${BOX_SIZE}px`;

const TooltipContent = ({ meetingType, item }: { meetingType: string, item: AttendanceItem }) => {
  const formattedDate = item.meetingDate ? moment(item.meetingDate).format('MMMM D, YYYY') : '';
  const status = item.attendanceStatus;
  const statusColor = ATTENDANCE_STATUS_COLORS[status as keyof typeof ATTENDANCE_STATUS_COLORS];
  const darkStatusColor = ATTENDANCE_STATUS_COLORS_DARK[status as keyof typeof ATTENDANCE_STATUS_COLORS_DARK];

  return (
    <VStack spacing={1} align="left" p={1}>
      <Text fontWeight="bold">{formattedDate}</Text>
      <Text>{meetingType}</Text>
      <Text color={statusColor} _dark={{
        color: darkStatusColor
      }} fontWeight="medium">{status}</Text>
    </VStack>
  );
};

const AttendanceSubBox = ({ item, meetingType }: { item: AttendanceItem, meetingType: string }) => {
  return (
    <Tooltip 
      label={<TooltipContent meetingType={meetingType} item={item} />}
      placement="top"
      bg="white"
      color="black"
      borderColor="gray.200"
      _dark={{
        bg: 'gray.700',
        color: 'white',
        borderColor: 'gray.600'
      }}
      borderWidth="1px"
    >
      <Box
        height="100%"
        width="100%"
        bgColor={ATTENDANCE_STATUS_COLORS[item.attendanceStatus]} 
        _dark={{
          bgColor: ATTENDANCE_STATUS_COLORS_DARK[item.attendanceStatus]
        }} 
        _hover={{ bgColor: "gray.500" }}
        display="flex"
        justifyContent="space-between"
        borderRadius="sm"
      />
    </Tooltip>
  );
};

const AttendanceBox = ({ id, weekData, meetingType }: { id: string, weekData: WeekData, meetingType: string }) => {
  const { attendanceItems } = weekData;
  const itemsCount = attendanceItems.length;
  
  return (
    <Box 
      key={id}
      w={BOX_SIZE_PX}
      h={BOX_SIZE_PX}
      minWidth={BOX_SIZE_PX}
      minHeight={BOX_SIZE_PX}
      p={0.5}
      display="flex"
      flexWrap="wrap"
    >
      {itemsCount === 0 && (
        // Empty box when no items
        <Box width="100%" height="100%" />
      )}

      {itemsCount === 1 && (
        // Single item takes up full box
        <Box width="100%" height="100%">
          <AttendanceSubBox key={`${id}-1`} item={attendanceItems[0]} meetingType={meetingType} />
        </Box>
      )}

      {itemsCount === 2 && (
        // Two vertical bars
        <>
          <Box width="50%" height="100%" pr={0.5}>
            <AttendanceSubBox key={`${id}-1`} item={attendanceItems[0]} meetingType={meetingType} />
          </Box>
          <Box width="50%" height="100%" pl={0.5}>
            <AttendanceSubBox key={`${id}-2`} item={attendanceItems[1]} meetingType={meetingType} />
          </Box>
        </>
      )}

      {itemsCount === 3 && (
        // Three vertical bars
        <>
          <Box width="33%" height="100%" pr={0.5}>
            <AttendanceSubBox key={`${id}-1`} item={attendanceItems[0]} meetingType={meetingType} />
          </Box>
          <Box width="33%" height="100%" px={0.5}>
            <AttendanceSubBox key={`${id}-2`} item={attendanceItems[1]} meetingType={meetingType} />
          </Box>
          <Box width="33%" height="100%" pl={0.5}>
            <AttendanceSubBox key={`${id}-3`} item={attendanceItems[2]} meetingType={meetingType} />
          </Box>
        </>
      )}

      {itemsCount >= 4 && (
        // Four corner boxes in a grid layout
        <>
          <Box width="50%" height="50%" pr={0.5} pb={0.5}>
            <AttendanceSubBox key={`${id}-1`} item={attendanceItems[0]} meetingType={meetingType} />
          </Box>
          <Box width="50%" height="50%" pb={0.5} pl={0.5}>
            <AttendanceSubBox key={`${id}-2`} item={attendanceItems[1]} meetingType={meetingType} />
          </Box>
          <Box width="50%" height="50%" pr={0.5} pt={0.5}>
            <AttendanceSubBox key={`${id}-3`} item={attendanceItems[2]} meetingType={meetingType} />
          </Box>
          <Box width="50%" height="50%" pl={0.5} pt={0.5}>
            <AttendanceSubBox key={`${id}-4`} item={attendanceItems[3]} meetingType={meetingType} />
          </Box>
        </>
      )}
    </Box>
  );
};

function AttendanceView({attendanceData}: {attendanceData: StaffAttendance[]}) {
  const attendanceViewHook = useAttendanceViewHook(attendanceData);
  const meetingTypes = Object.keys(attendanceViewHook.weeksData);


  return (
    <Box mx={6} px={4} py={4} pb={6} bgColor='gray.50' _dark={{
      bg: 'gray.800',
      borderColor: 'gray.500'
    }} borderColor="gray.200" borderWidth={1} borderRadius={"10px"} display="flex">
      <Box width={"170px"} minWidth={"170px"} pt={"28px"}> 
        {meetingTypes.map((meetingType, index) => (
          <Box key={`meeting-type-${index}`} fontWeight="bold" h={BOX_SIZE_PX} verticalAlign={"center"} alignItems={"center"} display="flex">
            <Text>{meetingType}</Text>
          </Box>
        ))}
      </Box>
      <Box overflowX={"auto"} flex={1}>
        <Box h={"28px"} display="flex" gap={0}>
          {attendanceViewHook.weeksData[meetingTypes[0]]?.map((item: WeekData, index: number) => (
            <Box key={`month-header-${index}`} w={BOX_SIZE_PX} minW={BOX_SIZE_PX} mr={0.5}>
              {((item.isHeaderItem)) ? (
                <Text fontSize={"14px"} whiteSpace="nowrap">{`${item.weekInfo.month} ${item.weekInfo.year}`}</Text>
              ) : (
                <></>
              )}
            </Box>
          ))}
        </Box>
        <Box  bgColor="gray.200" _dark={{
          bg: 'gray.600'  
        }} width={"fit-content"}>
          {meetingTypes.map(meetingType => (
            <Box key={meetingType} mb={0} display="flex" gap={0}>
              {attendanceViewHook.weeksData[meetingType].map((weekData: WeekData, index: number) => (
                <AttendanceBox 
                  key ={`${meetingType}-${index}`}
                  id={`attendance-box-${meetingType}-${index}`}
                  weekData={weekData}
                  meetingType={meetingType}
                />
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default AttendanceView;