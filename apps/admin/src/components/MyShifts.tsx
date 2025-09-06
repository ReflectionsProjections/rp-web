import {
  Box,
  Text,
  VStack,
  HStack,
  Badge,
  Card,
  CardBody,
  Heading,
  Spinner,
  Center,
  useColorMode
} from "@chakra-ui/react";
import { api, ShiftAssignment } from "@rp/shared";
import moment from "moment-timezone";
import { useState, useEffect } from "react";
import { useMirrorStyles } from "@/styles/Mirror";

interface MyShiftsProps {
  authorized: boolean;
}

// Use the existing ShiftAssignment type directly
type MyShiftData = ShiftAssignment;

const MyShifts: React.FC<MyShiftsProps> = ({ authorized }) => {
  const { colorMode } = useColorMode();
  const [myShifts, setMyShifts] = useState<MyShiftData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const mirrorStyles = useMirrorStyles(true);

  useEffect(() => {
    if (!authorized) {
      setIsLoading(false);
      return;
    }

    const fetchMyShifts = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/shifts/my-shifts");
        if (response.data && Array.isArray(response.data)) {
          // Filter out any assignments without shift data
          const validShifts = response.data.filter(
            (assignment: ShiftAssignment) => assignment.shifts
          );
          setMyShifts(validShifts);
        } else {
          setMyShifts([]);
        }
      } catch (error) {
        console.error("Failed to fetch my shifts:", error);
        setMyShifts([]);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchMyShifts();
  }, [authorized]);

  if (isLoading) {
    return (
      <Center py={8}>
        <Spinner size="lg" />
      </Center>
    );
  }

  if (!myShifts || myShifts.length === 0) {
    return (
      <Box textAlign="center" py={8} color="gray.500">
        <Text>No shifts assigned</Text>
      </Box>
    );
  }

  // Sort shifts by start time (filter out any without shift data)
  const sortedShifts = [...myShifts]
    .filter((shift) => shift.shifts)
    .sort((a, b) =>
      moment(a.shifts!.startTime).diff(moment(b.shifts!.startTime))
    );

  // Group shifts by date
  const shiftsByDate = sortedShifts.reduce(
    (acc, shift) => {
      const date = moment(shift.shifts!.startTime).format("YYYY-MM-DD");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(shift);
      return acc;
    },
    {} as Record<string, MyShiftData[]>
  );

  return (
    <VStack spacing={4} align="stretch">
      {Object.entries(shiftsByDate).map(([date, shifts]) => (
        <Box key={date}>
          <Text
            fontSize="md"
            fontWeight="bold"
            mb={2}
            color={colorMode === "dark" ? "gray.400" : "gray.600"}
          >
            {moment(date).format("dddd, MMMM Do")}
          </Text>
          <VStack spacing={2} align="stretch">
            {shifts.map((shift) => (
              <Card
                key={shift.shiftId}
                size="sm"
                variant="outline"
                sx={mirrorStyles}
              >
                <CardBody p={3}>
                  <VStack align="start" spacing={2}>
                    <HStack justify="space-between" w="full">
                      <Heading size="sm">{shift.shifts!.name}</Heading>
                      <Badge colorScheme="blue" size="sm">
                        {shift.shifts!.role}
                      </Badge>
                    </HStack>
                    <HStack
                      spacing={4}
                      fontSize="sm"
                      color={colorMode === "dark" ? "gray.400" : "gray.600"}
                    >
                      <Text>
                        {moment(shift.shifts!.startTime).format("h:mm A")} -{" "}
                        {moment(shift.shifts!.endTime).format("h:mm A")}
                      </Text>
                      <Text>•</Text>
                      <Text>{shift.shifts!.location}</Text>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </VStack>
        </Box>
      ))}
    </VStack>
  );
};

export default MyShifts;
