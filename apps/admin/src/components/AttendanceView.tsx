import { Box, Skeleton, Text, Tooltip, VStack } from "@chakra-ui/react";
import moment from "moment";
import {
  ATTENDANCE_STATUS_COLORS,
  ATTENDANCE_STATUS_COLORS_DARK,
  AttendanceItem,
  BOX_SIZE,
  StaffAttendance,
  useAttendanceViewHook,
  WeekData
} from "./useAttendanceViewHook";

const BOX_SIZE_PX = `${BOX_SIZE}px`;

const TooltipContent = ({
  committeeType,
  item
}: {
  committeeType: string;
  item: AttendanceItem;
}) => {
  const formattedDate = item.meetingDate
    ? moment(item.meetingDate).format("MMMM D, YYYY")
    : "";
  const status = item.attendanceStatus ?? "Attendance not recorded";
  const statusColor = ATTENDANCE_STATUS_COLORS[status];
  const darkStatusColor = ATTENDANCE_STATUS_COLORS_DARK[status];

  // Statuses are capitalized, so we need to format them
  const capitalCasedStatus =
    status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

  return (
    <VStack spacing={1} align="left" p={1}>
      <Text fontWeight="bold">{formattedDate}</Text>
      <Text>{committeeType}</Text>
      <Text
        color={statusColor}
        _dark={{
          color: darkStatusColor
        }}
        fontWeight="medium"
      >
        {capitalCasedStatus}
      </Text>
    </VStack>
  );
};

const AttendanceSubBox = ({
  item,
  committeeType
}: {
  item: AttendanceItem;
  committeeType: string;
}) => {
  return (
    <Tooltip
      label={<TooltipContent committeeType={committeeType} item={item} />}
      placement="top"
      bg="white"
      color="black"
      borderColor="gray.200"
      _dark={{
        bg: "gray.700",
        color: "white",
        borderColor: "gray.600"
      }}
      borderWidth="1px"
    >
      <Box
        height="100%"
        width="100%"
        bgColor={
          item.attendanceStatus
            ? ATTENDANCE_STATUS_COLORS[item.attendanceStatus]
            : "gray.500"
        }
        _dark={{
          bgColor: item.attendanceStatus
            ? ATTENDANCE_STATUS_COLORS_DARK[item.attendanceStatus]
            : "gray.300"
        }}
        display="flex"
        justifyContent="space-between"
        borderRadius="sm"
      />
    </Tooltip>
  );
};

const AttendanceBox = ({
  id,
  weekData,
  committeeType
}: {
  id: string;
  weekData: WeekData;
  committeeType: string;
}) => {
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
          <AttendanceSubBox
            key={`${id}-1`}
            item={attendanceItems[0]}
            committeeType={committeeType}
          />
        </Box>
      )}

      {itemsCount === 2 && (
        // Two vertical bars
        <>
          <Box width="50%" height="100%" pr={0.5}>
            <AttendanceSubBox
              key={`${id}-1`}
              item={attendanceItems[0]}
              committeeType={committeeType}
            />
          </Box>
          <Box width="50%" height="100%" pl={0.5}>
            <AttendanceSubBox
              key={`${id}-2`}
              item={attendanceItems[1]}
              committeeType={committeeType}
            />
          </Box>
        </>
      )}

      {itemsCount === 3 && (
        // Three vertical bars
        <>
          <Box width="33%" height="100%" pr={0.5}>
            <AttendanceSubBox
              key={`${id}-1`}
              item={attendanceItems[0]}
              committeeType={committeeType}
            />
          </Box>
          <Box width="33%" height="100%" px={0.5}>
            <AttendanceSubBox
              key={`${id}-2`}
              item={attendanceItems[1]}
              committeeType={committeeType}
            />
          </Box>
          <Box width="33%" height="100%" pl={0.5}>
            <AttendanceSubBox
              key={`${id}-3`}
              item={attendanceItems[2]}
              committeeType={committeeType}
            />
          </Box>
        </>
      )}

      {itemsCount >= 4 && (
        // Four corner boxes in a grid layout
        <>
          <Box width="50%" height="50%" pr={0.5} pb={0.5}>
            <AttendanceSubBox
              key={`${id}-1`}
              item={attendanceItems[0]}
              committeeType={committeeType}
            />
          </Box>
          <Box width="50%" height="50%" pb={0.5} pl={0.5}>
            <AttendanceSubBox
              key={`${id}-2`}
              item={attendanceItems[1]}
              committeeType={committeeType}
            />
          </Box>
          <Box width="50%" height="50%" pr={0.5} pt={0.5}>
            <AttendanceSubBox
              key={`${id}-3`}
              item={attendanceItems[2]}
              committeeType={committeeType}
            />
          </Box>
          <Box width="50%" height="50%" pl={0.5} pt={0.5}>
            <AttendanceSubBox
              key={`${id}-4`}
              item={attendanceItems[3]}
              committeeType={committeeType}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

function AttendanceView({
  attendanceData,
  loading
}: {
  attendanceData: StaffAttendance[];
  loading: boolean;
}) {
  const attendanceViewHook = useAttendanceViewHook(attendanceData);
  const committeeTypes = Object.keys(attendanceViewHook.weeksData);

  return (
    <Skeleton isLoaded={!loading}>
      <Box
        mx={6}
        px={4}
        py={4}
        pb={6}
        bgColor="gray.50"
        _dark={{
          bg: "gray.800",
          borderColor: "gray.500"
        }}
        borderColor="gray.200"
        borderWidth={1}
        borderRadius={"10px"}
        display="flex"
      >
        {attendanceData.length === 0 && (
          <Text mt={2}>No attendance data available</Text>
        )}
        <Box width={"170px"} minWidth={"170px"} pt={"28px"}>
          {committeeTypes.map((committeeType, index) => (
            <Box
              key={`meeting-type-${index}`}
              fontWeight="bold"
              h={BOX_SIZE_PX}
              verticalAlign={"center"}
              alignItems={"center"}
              display="flex"
            >
              <Text>{committeeType}</Text>
            </Box>
          ))}
        </Box>
        <Box overflowX={"auto"} flex={1}>
          <Box h={"28px"} display="flex" gap={0}>
            {committeeTypes.length > 0 &&
              attendanceViewHook.weeksData[committeeTypes[0]]?.map(
                (item: WeekData, index: number) => (
                  <Box
                    key={`month-header-${index}`}
                    w={BOX_SIZE_PX}
                    minW={BOX_SIZE_PX}
                    mr={0.5}
                  >
                    {item.isHeaderItem ? (
                      <Text
                        fontSize={"14px"}
                        whiteSpace="nowrap"
                      >{`${item.weekInfo.month} ${item.weekInfo.year}`}</Text>
                    ) : (
                      <></>
                    )}
                  </Box>
                )
              )}
          </Box>
          <Box
            bgColor="gray.200"
            _dark={{
              bg: "gray.600"
            }}
            width={"fit-content"}
          >
            {committeeTypes.map((committeeType) => (
              <Box key={committeeType} mb={0} display="flex" gap={0}>
                {attendanceViewHook.weeksData[committeeType].map(
                  (weekData: WeekData, index: number) => (
                    <AttendanceBox
                      key={`${committeeType}-${index}`}
                      id={`attendance-box-${committeeType}-${index}`}
                      weekData={weekData}
                      committeeType={committeeType}
                    />
                  )
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Skeleton>
  );
}

export default AttendanceView;
