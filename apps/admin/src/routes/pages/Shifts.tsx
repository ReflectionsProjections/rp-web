import React, { useState, useMemo } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Badge,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tooltip,
  Button,
  IconButton,
  Heading,
  Avatar,
  AvatarGroup,
  Spinner,
  Center,
  useToast
} from "@chakra-ui/react";
import {
  AddIcon,
  EditIcon,
  DragHandleIcon,
  DeleteIcon
} from "@chakra-ui/icons";
import moment from "moment-timezone";
import { useOutletContext } from "react-router-dom";
import { MainContext } from "../Main.tsx";
import {
  usePolling,
  Shift,
  Staff,
  ShiftAssignment,
  ShiftRoleType,
  api,
  Event
} from "@rp/shared";
import { useMirrorStyles } from "@/styles/Mirror";
import ShiftForm from "../../components/Shifts/ShiftForm";
import ShiftAssignmentModal from "../../components/Shifts/ShiftAssignmentModal";

// Set timezone to Chicago (Central Time)
moment.tz.setDefault("America/Chicago");

type CalendarShift = Shift & {
  startSlot: number;
  endSlot: number;
  rowSpan: number;
  column: number;
  assignments: Staff[];
};

type CalendarEvent = Event & {
  startSlot: number;
  endSlot: number;
  rowSpan: number;
  column: number;
};

const Shifts: React.FC = () => {
  const { authorized } = useOutletContext<MainContext>();
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);
  const {
    isOpen: isFormOpen,
    onOpen: onFormOpen,
    onClose: onFormClose
  } = useDisclosure();
  const {
    isOpen: isAssignmentOpen,
    onOpen: onAssignmentOpen,
    onClose: onAssignmentClose
  } = useDisclosure();
  const mirrorStyles = useMirrorStyles();
  const toast = useToast();

  // Fetch shifts data manually (no polling)
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [shiftsLoading, setShiftsLoading] = useState(false);

  const fetchShifts = async () => {
    setShiftsLoading(true);
    try {
      const response = await api.get("/shifts");
      if (response.data && Array.isArray(response.data)) {
        setShifts(response.data);
      }
    } catch (error) {
      console.error("Error fetching shifts:", error);
    } finally {
      setShiftsLoading(false);
    }
  };

  // Fetch shifts on component mount
  React.useEffect(() => {
    if (authorized) {
      void fetchShifts();
    }
  }, [authorized]);

  const { data: staff, isLoading: staffLoading } = usePolling(
    "/staff",
    authorized
  );

  const { data: events, isLoading: eventsLoading } = usePolling(
    "/events",
    authorized
  );

  // Fetch assignments for all shifts
  const [assignments, setAssignments] = useState<ShiftAssignment[]>([]);
  const [assignmentsLoading, setAssignmentsLoading] = useState(false);

  const borderColor = useColorModeValue("gray.200", "gray.600");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const timeSlotColor = useColorModeValue("gray.600", "gray.300");
  const TIME_SLOT_HEIGHT = 50;
  const ROW_SPACING = 4;

  // Pre-calculate shift colors for different shift types
  const shiftColors = {
    CLEAN_UP: {
      bg: useColorModeValue("red.50", "red.900"),
      border: useColorModeValue("red.200", "red.700"),
      color: "red"
    },
    DINNER: {
      bg: useColorModeValue("orange.50", "orange.900"),
      border: useColorModeValue("orange.200", "orange.700"),
      color: "orange"
    },
    CHECK_IN: {
      bg: useColorModeValue("blue.50", "blue.900"),
      border: useColorModeValue("blue.200", "blue.700"),
      color: "blue"
    },
    SPEAKER_BUDDY: {
      bg: useColorModeValue("purple.50", "purple.900"),
      border: useColorModeValue("purple.200", "purple.700"),
      color: "purple"
    },
    SPONSOR_BUDDY: {
      bg: useColorModeValue("pink.50", "pink.900"),
      border: useColorModeValue("pink.200", "pink.700"),
      color: "pink"
    },
    DEV_ON_CALL: {
      bg: useColorModeValue("green.50", "green.900"),
      border: useColorModeValue("green.200", "green.700"),
      color: "green"
    },
    CHAIR_ON_CALL: {
      bg: useColorModeValue("yellow.50", "yellow.900"),
      border: useColorModeValue("yellow.200", "yellow.700"),
      color: "yellow"
    }
  };

  // Pre-calculate event colors for different event types (transparent background)
  const eventColors = {
    SPEAKER: {
      bg: useColorModeValue("blue.100", "blue.800"),
      border: useColorModeValue("blue.300", "blue.600"),
      color: "blue"
    },
    CORPORATE: {
      bg: useColorModeValue("green.100", "green.800"),
      border: useColorModeValue("green.300", "green.600"),
      color: "green"
    },
    SPECIAL: {
      bg: useColorModeValue("purple.100", "purple.800"),
      border: useColorModeValue("purple.300", "purple.600"),
      color: "purple"
    },
    PARTNERS: {
      bg: useColorModeValue("orange.100", "orange.800"),
      border: useColorModeValue("orange.300", "orange.600"),
      color: "orange"
    },
    MEALS: {
      bg: useColorModeValue("yellow.100", "yellow.800"),
      border: useColorModeValue("yellow.300", "yellow.600"),
      color: "yellow"
    },
    CHECKIN: {
      bg: useColorModeValue("teal.100", "teal.800"),
      border: useColorModeValue("teal.300", "teal.600"),
      color: "teal"
    }
  };

  // Generate time slots from 8 AM to 11 PM (half-hour intervals)
  const timeSlots = useMemo(() => {
    const slots = [];
    for (let hour = 8; hour <= 23; hour++) {
      // Add full hour slot
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
      // Add half-hour slot (except for the last hour)
      if (hour < 23) {
        slots.push(`${hour.toString().padStart(2, "0")}:30`);
      }
    }
    return slots;
  }, []);

  // Get unique dates from shifts and events
  const dates = useMemo(() => {
    const allDates = new Set<string>();

    if (shifts) {
      shifts.forEach((shift: Shift) => {
        allDates.add(
          moment.tz(shift.startTime, "America/Chicago").format("YYYY-MM-DD")
        );
      });
    }

    if (events) {
      events.forEach((event: Event) => {
        allDates.add(
          moment.tz(event.startTime, "America/Chicago").format("YYYY-MM-DD")
        );
      });
    }

    const uniqueDates = Array.from(allDates).sort();

    return uniqueDates.map((date) => ({
      key: date,
      moment: moment.tz(date, "America/Chicago"),
      display: moment.tz(date, "America/Chicago").format("ddd, MMM D")
    }));
  }, [shifts, events]);

  // Process shifts to calculate time slots and handle overlaps
  const processedShifts = useMemo(() => {
    if (!shifts || !staff) return {};

    const processed: { [dateKey: string]: CalendarShift[] } = {};

    dates.forEach((date) => {
      const dateShifts = shifts.filter(
        (shift: Shift) =>
          moment.tz(shift.startTime, "America/Chicago").format("YYYY-MM-DD") ===
          date.key
      );

      // Calculate time slots for each shift and add assignments
      const calendarShifts: CalendarShift[] = dateShifts.map((shift: Shift) => {
        const startMoment = moment.tz(shift.startTime, "America/Chicago");
        const endMoment = moment.tz(shift.endTime, "America/Chicago");

        let startSlot =
          (startMoment.hour() - 8) * 2 + Math.floor(startMoment.minute() / 30);
        let endSlot =
          (endMoment.hour() - 8) * 2 + Math.floor(endMoment.minute() / 30);

        // Handle shifts that start before 8 AM or end after 11 PM
        if (startSlot < 0) startSlot = 0;
        if (endSlot > 30) endSlot = 30; // 15 hours * 2 slots per hour = 30 slots

        // Calculate row span based on actual duration
        const rowSpan = Math.max(1, endSlot - startSlot);

        // Get assignments for this shift
        const shiftAssignments = assignments
          .filter(
            (assignment: ShiftAssignment) =>
              assignment.shiftId === shift.shiftId
          )
          .map((assignment: ShiftAssignment) =>
            staff.find((s: Staff) => s.email === assignment.staffEmail)
          )
          .filter(Boolean) as Staff[];

        return {
          ...shift,
          startSlot,
          endSlot,
          rowSpan,
          column: 0, // Will be calculated for overlap handling
          assignments: shiftAssignments
        };
      });

      // Sort shifts by start time
      calendarShifts.sort((a, b) => a.startSlot - b.startSlot);

      // Handle overlapping shifts by assigning columns
      const columns: CalendarShift[][] = [];

      calendarShifts.forEach((shift) => {
        let columnIndex = 0;

        // Find the first column where this shift doesn't overlap
        while (columnIndex < columns.length) {
          const column = columns[columnIndex];
          const hasOverlap = column.some(
            (existingShift) =>
              // Shifts overlap if they share any time period
              !(
                shift.endSlot <= existingShift.startSlot ||
                shift.startSlot >= existingShift.endSlot
              )
          );

          if (!hasOverlap) break;
          columnIndex++;
        }

        // Add to existing column or create new one
        if (columnIndex < columns.length) {
          columns[columnIndex].push(shift);
        } else {
          columns.push([shift]);
        }

        shift.column = columnIndex;
      });

      processed[date.key] = calendarShifts;
    });

    return processed;
  }, [shifts, staff, dates, assignments]);

  // Process events to calculate time slots and handle overlaps
  const processedEvents = useMemo(() => {
    if (!events) return {};

    const processed: { [dateKey: string]: CalendarEvent[] } = {};

    dates.forEach((date) => {
      const dateEvents = events.filter(
        (event: Event) =>
          moment.tz(event.startTime, "America/Chicago").format("YYYY-MM-DD") ===
          date.key
      );

      // Calculate time slots for each event
      const calendarEvents: CalendarEvent[] = dateEvents.map((event: Event) => {
        const startMoment = moment.tz(event.startTime, "America/Chicago");
        const endMoment = moment.tz(event.endTime, "America/Chicago");

        // Calculate time slots with half-hour precision
        let startSlot =
          (startMoment.hour() - 8) * 2 + Math.floor(startMoment.minute() / 30);
        let endSlot =
          (endMoment.hour() - 8) * 2 + Math.floor(endMoment.minute() / 30);

        // Handle events that start before 8 AM or end after 11 PM
        if (startSlot < 0) startSlot = 0;
        if (endSlot > 30) endSlot = 30;

        // Calculate row span based on actual duration
        const rowSpan = Math.max(1, endSlot - startSlot);

        return {
          ...event,
          startSlot,
          endSlot,
          rowSpan,
          column: 0 // Events will be in background, so no overlap handling needed
        };
      });

      processed[date.key] = calendarEvents;
    });

    return processed;
  }, [events, dates]);

  const handleShiftClick = (shift: CalendarShift) => {
    setSelectedShift(shift);
    onAssignmentOpen();
  };

  const handleCreateShift = () => {
    setSelectedShift(null);
    onFormOpen();
  };

  const handleEditShift = (shift: CalendarShift) => {
    setSelectedShift(shift);
    onFormOpen();
  };

  const getShiftColor = (role: ShiftRoleType) => {
    return shiftColors[role]?.color || "gray";
  };

  const formatTime = (time: string) => {
    return moment.tz(time, "America/Chicago").format("h:mm A");
  };

  // Fetch assignments for all shifts
  const fetchAssignments = React.useCallback(async () => {
    if (!shifts || shifts.length === 0) return;

    setAssignmentsLoading(true);
    try {
      const allAssignments: ShiftAssignment[] = [];

      // Fetch assignments for each shift
      for (const shift of shifts) {
        try {
          const response = await api.get(
            `/shifts/${shift.shiftId}/assignments` as "/shifts/:shiftId/assignments"
          );
          if (response.data && Array.isArray(response.data)) {
            allAssignments.push(...response.data);
          }
        } catch (error) {
          console.warn(
            `Failed to fetch assignments for shift ${shift.shiftId}:`,
            error
          );
        }
      }

      setAssignments(allAssignments);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    } finally {
      setAssignmentsLoading(false);
    }
  }, [shifts]);

  // Fetch assignments when shifts change
  React.useEffect(() => {
    if (shifts && shifts.length > 0) {
      void fetchAssignments();
    }
  }, [shifts, fetchAssignments]);

  const handleAssignmentUpdate = () => {
    // Refresh both shifts and assignments
    void fetchShifts();
    void fetchAssignments();
  };

  const handleShiftUpdate = () => {
    void fetchShifts();
    onFormClose();
  };

  const handleDeleteShift = async (shift: CalendarShift) => {
    try {
      await api.delete(`/shifts/${shift.shiftId}` as "/shifts/:shiftId");
      toast({
        title: "Shift deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true
      });
      void fetchShifts();
    } catch (error) {
      console.error("Error deleting shift:", error);
      toast({
        title: "Error deleting shift",
        description: "Please try again",
        status: "error",
        duration: 5000,
        isClosable: true
      });
    }
  };

  if (shiftsLoading || staffLoading || assignmentsLoading || eventsLoading) {
    return (
      <Center h="400px">
        <VStack spacing={4}>
          <Spinner size="xl" />
          <Text>Loading shifts...</Text>
        </VStack>
      </Center>
    );
  }

  return (
    <VStack spacing={6} align="stretch">
      <VStack spacing={1}>
        <Heading size="lg">Staff Shifts</Heading>
      </VStack>

      <Box sx={mirrorStyles} p={6} overflowX="auto">
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th minW="80px" w="80px" whiteSpace="nowrap">
                Time
              </Th>
              {dates.map((date) => (
                <Th key={date.key} minW="250px" textAlign="center">
                  <VStack spacing={1}>
                    <Text fontSize="sm" fontWeight="bold">
                      {date.display}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {date.moment.format("MMM D")}
                    </Text>
                  </VStack>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {timeSlots.map((timeSlot, slotIndex) => (
              <Tr key={timeSlot}>
                <Td
                  borderRight="1px solid"
                  borderColor={borderColor}
                  fontWeight="medium"
                  fontSize="sm"
                  color={timeSlotColor}
                  w="80px"
                  whiteSpace="nowrap"
                  textAlign="center"
                  position="relative"
                >
                  <Box>
                    {moment(timeSlot, "HH:mm").format("h:mm")}
                    <Text as="span" fontSize="xs" color="gray.500" ml="1px">
                      {moment(timeSlot, "HH:mm").format("A")}
                    </Text>
                  </Box>
                </Td>
                {dates.map((date) => {
                  const dateShifts = processedShifts[date.key] || [];
                  const dateEvents = processedEvents[date.key] || [];
                  const shiftsInThisSlot = dateShifts.filter(
                    (shift) => shift.startSlot === slotIndex
                  );
                  const eventsInThisSlot = dateEvents.filter(
                    (event) => event.startSlot === slotIndex
                  );

                  return (
                    <Td
                      key={`${date.key}-${timeSlot}`}
                      border="1px solid"
                      borderColor={borderColor}
                      h="50px"
                      p={2}
                      verticalAlign="top"
                      position="relative"
                    >
                      {/* Background Events (transparent, non-interactive) */}
                      {eventsInThisSlot.map((event) => (
                        <Box
                          key={`event-${event.eventId}`}
                          position="absolute"
                          top="2px"
                          left="2px"
                          right="2px"
                          height={`${event.rowSpan * TIME_SLOT_HEIGHT - ROW_SPACING}px`}
                          p={1}
                          borderRadius="sm"
                          bg={
                            eventColors[
                              event.eventType as keyof typeof eventColors
                            ]?.bg
                          }
                          border="1px solid"
                          borderColor={
                            eventColors[
                              event.eventType as keyof typeof eventColors
                            ]?.border
                          }
                          opacity={0.4}
                          pointerEvents="none"
                          zIndex={0}
                        >
                          <Text
                            fontSize="xs"
                            color="gray.600"
                            noOfLines={1}
                            fontWeight="medium"
                          >
                            {event.name}
                          </Text>
                        </Box>
                      ))}

                      {/* Foreground Shifts (interactive) */}
                      {shiftsInThisSlot.map((shift) => (
                        <Box
                          key={shift.shiftId}
                          position="absolute"
                          top="2px"
                          left={`${(shift.column * 100) / Math.max(1, Math.max(...dateShifts.map((s) => s.column + 1)))}%`}
                          width={`${100 / Math.max(1, Math.max(...dateShifts.map((s) => s.column + 1)))}%`}
                          height={`${shift.rowSpan * TIME_SLOT_HEIGHT - ROW_SPACING}px`}
                          p={2}
                          borderRadius="md"
                          cursor="pointer"
                          transition="all 0.2s"
                          bg={shiftColors[shift.role].bg}
                          border="1px solid"
                          borderColor={shiftColors[shift.role].border}
                          _hover={{
                            bg: hoverBg,
                            transform: "scale(1.02)",
                            boxShadow: "md",
                            zIndex: 10
                          }}
                          onClick={() => handleShiftClick(shift)}
                          zIndex={2}
                        >
                          <VStack
                            spacing={1}
                            align="start"
                            h="100%"
                            overflow="hidden"
                          >
                            <Tooltip
                              label={shift.name}
                              placement="top"
                              hasArrow
                            >
                              <Text
                                fontSize="xs"
                                fontWeight="semibold"
                                noOfLines={2}
                                minH="15px"
                                lineHeight="1.2"
                                overflow="hidden"
                                cursor="default"
                              >
                                {shift.name}
                              </Text>
                            </Tooltip>

                            <Flex
                              direction="row"
                              wrap="wrap"
                              gap={1}
                              align="start"
                              maxW="100%"
                              flexShrink={0}
                            >
                              <Badge
                                colorScheme={getShiftColor(shift.role)}
                                size="xs"
                                flexShrink={0}
                                noOfLines={1}
                              >
                                {shift.role.replace("_", " ")}
                              </Badge>
                              {shift.location && (
                                <Badge
                                  colorScheme="gray"
                                  size="xs"
                                  flexShrink={0}
                                  noOfLines={1}
                                >
                                  📍 {shift.location}
                                </Badge>
                              )}
                            </Flex>

                            <Text
                              fontSize="xs"
                              color="gray.500"
                              noOfLines={1}
                              lineHeight="1.2"
                            >
                              {formatTime(shift.startTime)} -{" "}
                              {formatTime(shift.endTime)}
                            </Text>

                            {/* Staff assignments */}
                            {shift.assignments.length > 0 && (
                              <Box mt={1}>
                                <AvatarGroup size="xs" max={3}>
                                  {shift.assignments.map((staff) => (
                                    <Tooltip
                                      key={staff.email}
                                      label={`${staff.name} (${staff.team})`}
                                      placement="top"
                                    >
                                      <Avatar
                                        name={staff.name}
                                        size="xs"
                                        bg={`${getShiftColor(shift.role)}.100`}
                                        color={`${getShiftColor(shift.role)}.800`}
                                      />
                                    </Tooltip>
                                  ))}
                                </AvatarGroup>
                              </Box>
                            )}

                            {/* Action buttons */}
                            <HStack spacing={1} mt="auto" justify="flex-end">
                              <Tooltip label="Edit shift" placement="top">
                                <IconButton
                                  aria-label="Edit shift"
                                  icon={<EditIcon />}
                                  size="xs"
                                  variant="solid"
                                  colorScheme="blue"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditShift(shift);
                                  }}
                                />
                              </Tooltip>
                              <Tooltip label="Assign staff" placement="top">
                                <IconButton
                                  aria-label="Assign staff"
                                  icon={<DragHandleIcon />}
                                  size="xs"
                                  variant="ghost"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleShiftClick(shift);
                                  }}
                                />
                              </Tooltip>
                              <Tooltip label="Delete shift" placement="top">
                                <IconButton
                                  aria-label="Delete shift"
                                  icon={<DeleteIcon />}
                                  size="xs"
                                  variant="ghost"
                                  colorScheme="red"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    void handleDeleteShift(shift);
                                  }}
                                />
                              </Tooltip>
                            </HStack>
                          </VStack>
                        </Box>
                      ))}
                    </Td>
                  );
                })}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Shift Form Modal */}
      <Modal isOpen={isFormOpen} onClose={onFormClose} size="lg">
        <ModalOverlay />
        <ModalContent sx={mirrorStyles} color="white">
          <ModalHeader color="white">
            {selectedShift ? "Edit Shift" : "Create New Shift"}
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody pb={6} color="white">
            <ShiftForm
              shift={selectedShift}
              events={events || []}
              onSuccess={handleShiftUpdate}
              onCancel={onFormClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Shift Assignment Modal */}
      <Modal isOpen={isAssignmentOpen} onClose={onAssignmentClose} size="xl">
        <ModalOverlay />
        <ModalContent sx={mirrorStyles} color="white">
          <ModalHeader color="white">
            {selectedShift
              ? `Assign Staff to ${selectedShift.name}`
              : "Shift Assignments"}
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody pb={6} color="white">
            {selectedShift && (
              <ShiftAssignmentModal
                shift={selectedShift}
                staff={staff || []}
                assignments={assignments || []}
                onUpdate={handleAssignmentUpdate}
                onClose={onAssignmentClose}
                onEdit={() => {
                  onAssignmentClose();
                  setSelectedShift(selectedShift);
                  onFormOpen();
                }}
                onDelete={() => {
                  onAssignmentClose();
                  // Create a minimal CalendarShift object for deletion
                  const calendarShift: CalendarShift = {
                    ...selectedShift,
                    startSlot: 0,
                    endSlot: 1,
                    rowSpan: 1,
                    column: 0,
                    assignments: []
                  };
                  void handleDeleteShift(calendarShift);
                }}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Floating Add Button */}
      <Button
        onClick={handleCreateShift}
        sx={mirrorStyles}
        position="fixed"
        bottom="20px"
        right="20px"
        zIndex="9"
        bg="gray.300"
        w="65px"
        h="65px"
      >
        <AddIcon />
      </Button>
    </VStack>
  );
};

export default Shifts;
