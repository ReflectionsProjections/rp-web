import { Box, Text, Tooltip, VStack } from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useState } from "react";

export interface StaffAttendance {
    meetingType: string, // Full-Team, Dev Team, etc.
    meetingDate: Date,
    attendanceStatus: 'Absent' | 'Excused' | 'Present',
}

const ATTENDANCE_STATUS_COLORS = {
  Absent: 'red.400',
  Excused: 'blue.500',
  Present: 'green.400',
  'No Meeting': 'gray.500'
};

const ATTENDANCE_STATUS_COLORS_DARK = {
  Absent: 'red.400',
  Excused: 'blue.400',
  Present: 'green.300',
  'No Meeting': 'gray.300'
};

interface AttendanceItem {
    weekInfo: {
      month: string,
      year: number,
      weekNumber: number,
      startOfWeekDate: string,
    },
    meetingDate?: Date,
    hadMeeting: boolean,
    attendanceStatus: 'Absent' | 'Excused' | 'Present',
    isHeaderItem?: boolean,
    isCurrentWeek?: boolean 
}

function AttendanceView({attendanceData}: {attendanceData: StaffAttendance[]}) {
  const [attendanceItems, setAttendanceItems] = useState<{
        [meetingType: string]: AttendanceItem[]
    }>({});

  useEffect(() => {
    // Get the range of dates in the attendance data
    const dates = attendanceData.map(item => moment(item.meetingDate));
    const startDate = moment.min(dates);
    const endDate = moment.max(dates);
    
    // If there are less than 8 weeks of data, make endDate 8 weeks after startDate
    const weeksDifference = endDate.diff(startDate, 'weeks');
    if (weeksDifference < 8) {
      endDate.add(8 - weeksDifference, 'weeks');
    }

    // Get unique meeting types
    const meetingTypes = Array.from(new Set(attendanceData.map(item => item.meetingType)));
        
    // Initialize the attendance items object
    const newAttendanceItems: {
            [meetingType: string]: AttendanceItem[]
        } = {};

    // Initialize each meeting type with an empty array
    meetingTypes.forEach(type => {
      newAttendanceItems[type] = [];
    });

    // Loop through each week between start and end dates
    const currentDate = startDate.clone().startOf('week');
    while (currentDate.isSameOrBefore(endDate)) {
      const month = currentDate.format('MMMM');
      const weekNumber = currentDate.week();
            
      // For each meeting type, check if there was a meeting this week
      meetingTypes.forEach(meetingType => {
        // Find attendance record for this meeting type in this week
        const meetingInWeek = attendanceData.find(item => 
          item.meetingType === meetingType &&
                    moment(item.meetingDate).week() === weekNumber
        );

        // Add entry for this week, whether there was a meeting or not
        newAttendanceItems[meetingType].push({
          weekInfo: {
            startOfWeekDate: currentDate.format('YYYY-MM-DD'),
            month,
            year: currentDate.year(),
            weekNumber,
          },
          meetingDate: meetingInWeek?.meetingDate, 
          hadMeeting: !!meetingInWeek,
          attendanceStatus: meetingInWeek ? meetingInWeek.attendanceStatus : 'Absent',
          isCurrentWeek: currentDate.isSame(moment(), 'week'),
        });
      });
            
      // Move to next week
      currentDate.add(1, 'week');
    }

    const meetingTypeNames = Object.keys(newAttendanceItems);

    if (newAttendanceItems[meetingTypeNames[0]].length === 0) {
      setAttendanceItems(newAttendanceItems);
      return;
    }

    for (let i = 0; i < newAttendanceItems[meetingTypeNames[0]].length; i++) {
      const item = newAttendanceItems[meetingTypeNames[0]][i];
      if (i == 0) {
        if (item.weekInfo.weekNumber < 2) {
          newAttendanceItems[meetingTypeNames[0]][i].isHeaderItem = true;
        }
        continue;
      }
      const previousItem = newAttendanceItems[meetingTypeNames[0]][i - 1];
      if ((item.weekInfo.month != previousItem.weekInfo.month) && (!previousItem.isHeaderItem )) {
        newAttendanceItems[meetingTypeNames[0]][i].isHeaderItem = true;
      }
    }

    setAttendanceItems(newAttendanceItems);
  }, [attendanceData]);

  const meetingTypes = Object.keys(attendanceItems);

  const TooltipContent = ({ meetingType, item }: { meetingType: string, item: AttendanceItem }) => {
    const formattedDate = item.meetingDate ? moment(item.meetingDate).format('MMMM D, YYYY') : '';
    const status = item.hadMeeting ? item.attendanceStatus : "No Meeting";
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

  return (
    <Box mx={6} px={4} py={4} pb={6} bgColor='gray.50' _dark={{
      bg: 'gray.800',
      borderColor: 'gray.500'
    }} borderColor="gray.200" borderWidth={1} borderRadius={"10px"} display="flex">
      <Box width={"170px"} minWidth={"170px"} pt={"28px"}> 
        {meetingTypes.map(meetingType => (
          <Box fontWeight="bold" h={"40px"} verticalAlign={"center"} alignItems={"center"} display="flex">
            <Text>{meetingType}</Text>
          </Box>
        ))}
      </Box>
      <Box overflowX={"auto"} flex={1}>
        <Box h={"28px"} display="flex" gap={0}>
          {attendanceItems[meetingTypes[0]]?.map((item, index) => (
            <Box w={"40px"} minW={"40px"} key={index} mr={0.5}>
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
        }} width={"100%"}>
          {meetingTypes.map(meetingType => (
            <Box key={meetingType} mb={0} display="flex" gap={0}>
              {attendanceItems[meetingType].map((item, index) => (
                <Tooltip 
                  key={index}
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
                    w={"40px"}
                    h={"40px"}
                    minWidth={"40px"}
                    minHeight={"40px"}
                    bgColor={item.hadMeeting ? ATTENDANCE_STATUS_COLORS[item.attendanceStatus] : 'gray.300'} 
                    _dark={{
                      bg: item.hadMeeting ? ATTENDANCE_STATUS_COLORS_DARK[item.attendanceStatus] : 'gray.600'
                    }}
                    p={2} 
                    borderRadius="sm" 
                    mb={0.5}
                    mr={0.5}
                    display="flex"
                    justifyContent="space-between"
                    cursor={
                      item.hadMeeting ? 'pointer' : 'not-allowed'
                    }>
                  </Box>
                </Tooltip>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default AttendanceView;