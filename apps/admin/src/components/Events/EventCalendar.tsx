import React, { useState, useMemo } from "react";
import {
  Box,
  Text,
  VStack,
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
  Tooltip
} from "@chakra-ui/react";
import { Event } from "@rp/shared";
import moment from "moment-timezone";
import { useMirrorStyles } from "@/styles/Mirror";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

// Set timezone to Chicago (Central Time)
moment.tz.setDefault("America/Chicago");

type EventCalendarProps = {
  events: Event[];
  updateEvents: () => void;
};

type CalendarEvent = Event & {
  startSlot: number;
  endSlot: number;
  rowSpan: number;
  column: number;
};

const EventCalendar: React.FC<EventCalendarProps> = ({
  events,
  updateEvents
}) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mirrorStyles = useMirrorStyles();
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const timeSlotColor = useColorModeValue("gray.600", "gray.300");

  // Pre-calculate event colors for different event types
  const eventColors = {
    SPEAKER: {
      bg: useColorModeValue("blue.50", "blue.900"),
      border: useColorModeValue("blue.200", "blue.700")
    },
    CORPORATE: {
      bg: useColorModeValue("green.50", "green.900"),
      border: useColorModeValue("green.200", "green.700")
    },
    SPECIAL: {
      bg: useColorModeValue("purple.50", "purple.900"),
      border: useColorModeValue("purple.200", "purple.700")
    },
    PARTNERS: {
      bg: useColorModeValue("orange.50", "orange.900"),
      border: useColorModeValue("orange.200", "orange.700")
    },
    MEALS: {
      bg: useColorModeValue("yellow.50", "yellow.900"),
      border: useColorModeValue("yellow.200", "yellow.700")
    },
    CHECKIN: {
      bg: useColorModeValue("teal.50", "teal.900"),
      border: useColorModeValue("teal.200", "teal.700")
    }
  };

  // Generate time slots from 8 AM to 10 PM (half-hour intervals)
  const timeSlots = useMemo(() => {
    const slots = [];
    for (let hour = 8; hour <= 22; hour++) {
      // Add full hour slot
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
      // Add half-hour slot (except for the last hour)
      if (hour < 22) {
        slots.push(`${hour.toString().padStart(2, "0")}:30`);
      }
    }
    return slots;
  }, []);

  // Get unique dates from events
  const dates = useMemo(() => {
    const uniqueDates = [
      ...new Set(
        events.map((event) =>
          moment.tz(event.startTime, "America/Chicago").format("YYYY-MM-DD")
        )
      )
    ].sort();

    return uniqueDates.map((date) => ({
      key: date,
      moment: moment.tz(date, "America/Chicago"),
      display: moment.tz(date, "America/Chicago").format("ddd, MMM D")
    }));
  }, [events]);

  // Process events to calculate time slots and handle overlaps
  const processedEvents = useMemo(() => {
    const processed: { [dateKey: string]: CalendarEvent[] } = {};

    dates.forEach((date) => {
      const dateEvents = events.filter(
        (event) =>
          moment.tz(event.startTime, "America/Chicago").format("YYYY-MM-DD") ===
          date.key
      );

      // Calculate time slots for each event
      const calendarEvents: CalendarEvent[] = dateEvents.map((event) => {
        const startMoment = moment.tz(event.startTime, "America/Chicago");
        const endMoment = moment.tz(event.endTime, "America/Chicago");

        // Calculate time slots with half-hour precision
        // Each hour has 2 slots (00 and 30 minutes)
        // 8:00 = slot 0, 8:30 = slot 1, 9:00 = slot 2, etc.
        let startSlot =
          (startMoment.hour() - 8) * 2 + Math.floor(startMoment.minute() / 30);
        let endSlot =
          (endMoment.hour() - 8) * 2 + Math.floor(endMoment.minute() / 30);

        // Handle events that start before 8 AM or end after 10 PM
        if (startSlot < 0) startSlot = 0;
        if (endSlot > 28) endSlot = 28; // 14 hours * 2 slots per hour = 28 slots

        // Calculate row span based on actual duration
        const rowSpan = Math.max(1, endSlot - startSlot);

        // Debug logging for event time calculations
        console.log(`Event: ${event.name}`, {
          startTime: event.startTime,
          endTime: event.endTime,
          startHour: startMoment.hour(),
          startMinute: startMoment.minute(),
          endHour: endMoment.hour(),
          endMinute: endMoment.minute(),
          startSlot,
          endSlot,
          rowSpan,
          expectedHeight: `${rowSpan * 40 - 4}px`, // Half the height since we have twice as many slots
          duration: `${endMoment.diff(startMoment, "minutes")} minutes`
        });

        return {
          ...event,
          startSlot,
          endSlot,
          rowSpan,
          column: 0 // Will be calculated for overlap handling
        };
      });

      // Sort events by start time
      calendarEvents.sort((a, b) => a.startSlot - b.startSlot);

      // Handle overlapping events by assigning columns
      const columns: CalendarEvent[][] = [];

      calendarEvents.forEach((event) => {
        let columnIndex = 0;

        // Find the first column where this event doesn't overlap
        while (columnIndex < columns.length) {
          const column = columns[columnIndex];
          const hasOverlap = column.some(
            (existingEvent) =>
              // Events overlap if they share any time period
              // Event A starts before Event B ends AND Event A ends after Event B starts
              !(
                event.endSlot <= existingEvent.startSlot ||
                event.startSlot >= existingEvent.endSlot
              )
          );

          if (!hasOverlap) break;
          columnIndex++;
        }

        // Add to existing column or create new one
        if (columnIndex < columns.length) {
          columns[columnIndex].push(event);
        } else {
          columns.push([event]);
        }

        event.column = columnIndex;
      });

      processed[date.key] = calendarEvents;
    });

    return processed;
  }, [events, dates]);

  const handleEventClick = (event: CalendarEvent) => {
    // Extract only the original Event properties, excluding calendar-specific ones
    const originalEvent: Event = {
      eventId: event.eventId,
      name: event.name,
      description: event.description,
      startTime: event.startTime,
      endTime: event.endTime,
      eventType: event.eventType,
      points: event.points,
      location: event.location,
      isVirtual: event.isVirtual,
      imageUrl: event.imageUrl,
      isVisible: event.isVisible,
      attendanceCount: event.attendanceCount
    };

    // Debug logging
    console.log("Original calendar event:", event);
    console.log("Cleaned event for modal:", originalEvent);

    setSelectedEvent(originalEvent);
    onOpen();
  };

  const getEventColor = (eventType: string) => {
    switch (eventType) {
      case "SPEAKER":
        return "blue";
      case "CORPORATE":
        return "green";
      case "SPECIAL":
        return "purple";
      case "PARTNERS":
        return "orange";
      case "MEALS":
        return "yellow";
      case "CHECKIN":
        return "teal";
      default:
        return "gray";
    }
  };

  const formatTime = (time: string) => {
    return moment.tz(time, "America/Chicago").format("h:mm A");
  };

  if (events.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Text fontSize="lg" color="gray.500">
          No events found
        </Text>
      </Box>
    );
  }

  return (
    <>
      <Box sx={mirrorStyles} p={6} overflowX="auto">
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th minW="60px" w="60px" whiteSpace="nowrap">
                Time
              </Th>
              {dates.map((date) => (
                <Th key={date.key} minW="200px" textAlign="center">
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
                  w="60px"
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
                  const dateEvents = processedEvents[date.key] || [];
                  const eventsInThisSlot = dateEvents.filter(
                    (event) => event.startSlot === slotIndex
                  );

                  return (
                    <Td
                      key={`${date.key}-${timeSlot}`}
                      border="1px solid"
                      borderColor={borderColor}
                      h="40px"
                      p={2}
                      verticalAlign="top"
                      position="relative"
                    >
                      {eventsInThisSlot.map((event) => (
                        <Box
                          key={event.eventId}
                          position="absolute"
                          top="2px"
                          left={`${(event.column * 100) / Math.max(1, Math.max(...dateEvents.map((e) => e.column + 1)))}%`}
                          width={`${100 / Math.max(1, Math.max(...dateEvents.map((e) => e.column + 1)))}%`}
                          height={`${event.rowSpan * 40 - 4}px`}
                          p={2}
                          borderRadius="md"
                          cursor="pointer"
                          transition="all 0.2s"
                          bg={
                            eventColors[
                              event.eventType as keyof typeof eventColors
                            ].bg
                          }
                          border="1px solid"
                          borderColor={
                            eventColors[
                              event.eventType as keyof typeof eventColors
                            ].border
                          }
                          _hover={{
                            bg: hoverBg,
                            transform: "scale(1.02)",
                            boxShadow: "md",
                            zIndex: 10
                          }}
                          onClick={() => handleEventClick(event)}
                          zIndex={1}
                        >
                          <VStack
                            spacing={1}
                            align="start"
                            h="100%"
                            overflow="hidden"
                          >
                            <Tooltip
                              label={event.name}
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
                                {event.name}
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
                                colorScheme={getEventColor(event.eventType)}
                                size="xs"
                                flexShrink={0}
                                noOfLines={1}
                              >
                                {event.eventType}
                              </Badge>
                              {event.location && (
                                <Badge
                                  colorScheme="gray"
                                  size="xs"
                                  flexShrink={0}
                                  noOfLines={1}
                                >
                                  📍 {event.location}
                                </Badge>
                              )}
                            </Flex>
                            <Text
                              fontSize="xs"
                              color="gray.500"
                              noOfLines={1}
                              lineHeight="1.2"
                            >
                              {formatTime(event.startTime)} -{" "}
                              {formatTime(event.endTime)}
                            </Text>
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

      {/* Event Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedEvent?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedEvent && (
              <VStack spacing={4} align="stretch">
                <Box>
                  <Text fontWeight="bold">Time:</Text>
                  <Text>
                    {moment
                      .tz(selectedEvent.startTime, "America/Chicago")
                      .format("MMMM Do YYYY, h:mm A")}{" "}
                    -
                    {moment
                      .tz(selectedEvent.endTime, "America/Chicago")
                      .format("h:mm A")}
                  </Text>
                </Box>

                <Box>
                  <Text fontWeight="bold">Description:</Text>
                  <Text>{selectedEvent.description}</Text>
                </Box>

                <Box>
                  <Text fontWeight="bold">Points:</Text>
                  <Text>{selectedEvent.points}</Text>
                </Box>

                {selectedEvent.location && (
                  <Box>
                    <Text fontWeight="bold">Location:</Text>
                    <Text>{selectedEvent.location}</Text>
                  </Box>
                )}

                <Flex gap={2} mt={4}>
                  <EditModal
                    event={selectedEvent}
                    updateEvents={updateEvents}
                  />
                  <DeleteModal
                    event={selectedEvent}
                    updateEvents={updateEvents}
                  />
                </Flex>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EventCalendar;
