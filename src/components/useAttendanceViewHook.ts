import moment from "moment";
import React from "react";

export interface StaffAttendance {
    meetingType: string, // Full-Team, Dev Team, etc.
    meetingDate: Date,
    attendanceStatus: 'Absent' | 'Excused' | 'Present',
}

export const ATTENDANCE_STATUS_COLORS = {
  Absent: 'red.400',
  Excused: 'blue.500',
  Present: 'green.400',
  'No Meeting': 'gray.500'
};

export const ATTENDANCE_STATUS_COLORS_DARK = {
  Absent: 'red.400',
  Excused: 'blue.400',
  Present: 'green.300',
  'No Meeting': 'gray.300'
};

export const BOX_SIZE = 60;

export interface AttendanceItem {
    meetingDate?: Date,
    attendanceStatus: 'Absent' | 'Excused' | 'Present',
}

export interface WeekData {
    attendanceItems: AttendanceItem[],
    hadMeeting: boolean,
    isHeaderItem?: boolean,
    weekInfo: {
      month: string,
      year: number,
      weekNumber: number,
      startOfWeekDate: string,
    },
}

export const useAttendanceViewHook = (
  attendanceData: StaffAttendance[]
) => {
  const [weeksData, setWeeksData] = React.useState<{
        [meetingType: string]: WeekData[]
    }>({});

  const handleLoadData = () => {
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
    const newWeekData: {
            [meetingType: string]: WeekData[]
        } = {};

    // Initialize each meeting type with an empty array
    meetingTypes.forEach(type => {
      newWeekData[type] = [];
    });

    // Loop through each week between start and end dates
    const currentDate = startDate.clone().startOf('week');
    const endRangeDate = endDate.clone().endOf('week');
    while (currentDate.isSameOrBefore(endRangeDate)) {
      const month = currentDate.format('MMM');
      const weekNumber = currentDate.week();

      for (const meetingType of meetingTypes) {
        const meetingsInWeek = attendanceData.filter(item =>
          item.meetingType === meetingType &&
                    moment(item.meetingDate).week() === weekNumber
        );

        const weekData: WeekData = {
          attendanceItems: meetingsInWeek.map(item => ({
            meetingDate: item.meetingDate,
            attendanceStatus: item.attendanceStatus,
          })),
          weekInfo: {
            startOfWeekDate: currentDate.format('YYYY-MM-DD'),
            month,
            year: currentDate.year(),
            weekNumber,
          },
          hadMeeting: meetingsInWeek.length > 0,
        };

        newWeekData[meetingType].push(weekData);
      }

      // Move to next week
      currentDate.add(1, 'week');
    }

    // Update the isHeaderItem flags
    const meetingTypeNames = Object.keys(newWeekData);

    if (newWeekData[meetingTypeNames[0]].length === 0) {
      setWeeksData(newWeekData);
      return;
    }

    for (let i = 1; i < newWeekData[meetingTypeNames[0]].length; i++) {
      const item = newWeekData[meetingTypeNames[0]][i];
      const previousItem = newWeekData[meetingTypeNames[0]][i - 1];
      if ((item.weekInfo.month != previousItem.weekInfo.month) && (!previousItem.isHeaderItem )) {
        newWeekData[meetingTypeNames[0]][i].isHeaderItem = true;
      }
    }

    const weeksWithHeaderItems = newWeekData[meetingTypeNames[0]].filter(item => item.isHeaderItem);
    if (weeksWithHeaderItems.length > 0) {
      const firstWeekWithHeaderItem = weeksWithHeaderItems[0];
      const firstWeekWithHeaderItemWeekNumber = firstWeekWithHeaderItem.weekInfo.weekNumber;
      const firstHeaderItemWeekNumber = newWeekData[meetingTypeNames[0]][0].weekInfo.weekNumber;
      // 2 or more weeks apart
      if (firstWeekWithHeaderItemWeekNumber - firstHeaderItemWeekNumber >= 2) { 
        newWeekData[meetingTypeNames[0]][0].isHeaderItem = true;
      } else {
        newWeekData[meetingTypeNames[0]][0].isHeaderItem = false;
      }
    } else {
      newWeekData[meetingTypeNames[0]][0].isHeaderItem = true;
    }

    setWeeksData(newWeekData);
  };

  React.useEffect(() => {
    handleLoadData();
  }, []);

  return{
    weeksData
  };
};