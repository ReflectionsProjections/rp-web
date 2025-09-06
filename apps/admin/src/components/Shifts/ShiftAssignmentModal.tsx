import React, { useState, useMemo, useRef } from "react";
import {
  VStack,
  HStack,
  Text,
  Box,
  Avatar,
  Badge,
  Button,
  IconButton,
  useColorModeValue,
  Divider,
  Flex,
  Tooltip,
  useToast,
  Card,
  CardBody,
  CardHeader,
  Heading,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay
} from "@chakra-ui/react";
import { AddIcon, CloseIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import moment from "moment-timezone";
import { api, Shift, Staff, ShiftAssignment, CommitteeType } from "@rp/shared";

// Set timezone to Chicago (Central Time)
moment.tz.setDefault("America/Chicago");

type ShiftAssignmentModalProps = {
  shift: Shift;
  staff: Staff[];
  assignments: ShiftAssignment[];
  onUpdate: () => void;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

const teamColors = {
  CONTENT: "cyan",
  CORPORATE: "green",
  DESIGN: "purple",
  DEV: "orange",
  MARKETING: "pink",
  OPERATIONS: "teal",
  "FULL TEAM": "gray"
};

const ShiftAssignmentModal: React.FC<ShiftAssignmentModalProps> = ({
  shift,
  staff,
  assignments,
  onUpdate,
  onClose,
  onEdit,
  onDelete
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [staffToUnassign, setStaffToUnassign] = useState<Staff | null>(null);
  const {
    isOpen: isUnassignOpen,
    onOpen: onUnassignOpen,
    onClose: onUnassignClose
  } = useDisclosure();
  const toast = useToast();
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const cancelRef = useRef<HTMLButtonElement>(null);

  // Get current assignments for this shift
  const currentAssignments = useMemo(() => {
    if (!assignments || assignments.length === 0) return [];

    return assignments
      .filter((assignment) => assignment.shiftId === shift.shiftId)
      .map((assignment) => staff.find((s) => s.email === assignment.staffEmail))
      .filter(Boolean) as Staff[];
  }, [assignments, staff, shift.shiftId]);

  // Get available staff (not assigned to this shift)
  const availableStaff = useMemo(() => {
    const assignedEmails = currentAssignments.map((s) => s.email);
    return staff.filter((s) => !assignedEmails.includes(s.email));
  }, [staff, currentAssignments]);

  // Group staff by team
  const staffByTeam = useMemo(() => {
    const grouped: Record<CommitteeType, Staff[]> = {
      CONTENT: [],
      CORPORATE: [],
      DESIGN: [],
      DEV: [],
      MARKETING: [],
      OPERATIONS: [],
      "FULL TEAM": []
    };

    availableStaff.forEach((member) => {
      if (grouped[member.team]) {
        grouped[member.team].push(member);
      }
    });

    return grouped;
  }, [availableStaff]);

  const handleAssignStaff = async (staffEmail: string) => {
    setIsLoading(true);
    try {
      await api.post(
        `/shifts/${shift.shiftId}/assignments` as "/shifts/:shiftId/assignments",
        {
          staffEmail
        }
      );

      toast({
        title: "Staff assigned successfully",
        status: "success",
        duration: 3000,
        isClosable: true
      });

      onUpdate();
    } catch (error) {
      console.error("Error assigning staff:", error);
      toast({
        title: "Error assigning staff",
        description: "Please try again",
        status: "error",
        duration: 5000,
        isClosable: true
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnassignStaff = async (staffEmail: string) => {
    setIsLoading(true);
    try {
      await api.delete(
        `/shifts/${shift.shiftId}/assignments` as "/shifts/:shiftId/assignments",
        {
          data: { staffEmail }
        }
      );

      toast({
        title: "Staff unassigned successfully",
        status: "success",
        duration: 3000,
        isClosable: true
      });

      onUpdate();
      onUnassignClose();
    } catch (error) {
      console.error("Error unassigning staff:", error);
      toast({
        title: "Error unassigning staff",
        description: "Please try again",
        status: "error",
        duration: 5000,
        isClosable: true
      });
    } finally {
      setIsLoading(false);
    }
  };

  const confirmUnassign = (staff: Staff) => {
    setStaffToUnassign(staff);
    onUnassignOpen();
  };

  const formatTime = (time: string) => {
    return moment.tz(time, "America/Chicago").format("MMM D, h:mm A");
  };

  return (
    <VStack spacing={6} align="stretch">
      {/* Shift Information */}
      <Card>
        <CardHeader>
          <Flex justify="space-between" align="center">
            <Heading size="md">{shift.name}</Heading>
            <HStack spacing={2}>
              <Button
                leftIcon={<EditIcon />}
                size="sm"
                colorScheme="blue"
                variant="outline"
                onClick={onEdit}
              >
                Edit Shift
              </Button>
              <Button
                leftIcon={<DeleteIcon />}
                size="sm"
                colorScheme="red"
                variant="outline"
                onClick={onDelete}
              >
                Delete Shift
              </Button>
            </HStack>
          </Flex>
        </CardHeader>
        <CardBody pt={0}>
          <VStack spacing={2} align="stretch">
            <HStack justify="space-between">
              <Text fontSize="sm" color="gray.500">
                Role:
              </Text>
              <Badge colorScheme="blue" variant="subtle">
                {shift.role.replace("_", " ")}
              </Badge>
            </HStack>
            <HStack justify="space-between">
              <Text fontSize="sm" color="gray.500">
                Time:
              </Text>
              <Text fontSize="sm">
                {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
              </Text>
            </HStack>
            <HStack justify="space-between">
              <Text fontSize="sm" color="gray.500">
                Location:
              </Text>
              <Text fontSize="sm">{shift.location}</Text>
            </HStack>
          </VStack>
        </CardBody>
      </Card>

      {/* Current Assignments */}
      <Box>
        <Text fontSize="lg" fontWeight="semibold" mb={3}>
          Assigned Staff ({currentAssignments.length})
        </Text>

        {currentAssignments.length === 0 ? (
          <Box
            p={4}
            border="2px dashed"
            borderColor={borderColor}
            borderRadius="md"
            textAlign="center"
            color="gray.500"
          >
            <Text>No staff assigned to this shift</Text>
          </Box>
        ) : (
          <HStack spacing={2} flexWrap="wrap">
            {currentAssignments.map((member) => (
              <Tooltip
                key={member.email}
                label={`${member.name} (${member.team})`}
                placement="top"
                hasArrow
              >
                <Box position="relative">
                  <Avatar
                    name={member.name}
                    size="md"
                    bg={`${teamColors[member.team]}.100`}
                    color={`${teamColors[member.team]}.800`}
                    cursor="pointer"
                  />
                  <IconButton
                    aria-label="Remove assignment"
                    icon={<CloseIcon />}
                    size="xs"
                    position="absolute"
                    top="-1"
                    right="-1"
                    bg="red.500"
                    color="white"
                    borderRadius="full"
                    minW="20px"
                    h="20px"
                    onClick={() => confirmUnassign(member)}
                    isLoading={isLoading}
                    _hover={{ bg: "red.600" }}
                  />
                </Box>
              </Tooltip>
            ))}
          </HStack>
        )}
      </Box>

      <Divider />

      {/* Available Staff */}
      <Box>
        <Text fontSize="lg" fontWeight="semibold" mb={3}>
          Available Staff
        </Text>

        {availableStaff.length === 0 ? (
          <Box
            p={4}
            border="2px dashed"
            borderColor={borderColor}
            borderRadius="md"
            textAlign="center"
            color="gray.500"
          >
            <Text>All staff are already assigned to this shift</Text>
          </Box>
        ) : (
          <VStack spacing={4} align="stretch">
            {Object.entries(staffByTeam).map(([team, teamMembers]) => {
              if (teamMembers.length === 0) return null;

              return (
                <Box key={team}>
                  <Text
                    fontSize="md"
                    fontWeight="medium"
                    mb={2}
                    color={`${teamColors[team as CommitteeType]}.400`}
                  >
                    {team} ({teamMembers.length})
                  </Text>
                  <HStack spacing={2} flexWrap="wrap">
                    {teamMembers.map((member) => (
                      <Tooltip
                        key={member.email}
                        label={`${member.name} (${member.team})`}
                        placement="top"
                        hasArrow
                      >
                        <Box position="relative">
                          <Avatar
                            name={member.name}
                            size="md"
                            bg={`${teamColors[member.team]}.100`}
                            color={`${teamColors[member.team]}.800`}
                            cursor="pointer"
                          />
                          <IconButton
                            aria-label="Assign staff"
                            icon={<AddIcon />}
                            size="xs"
                            position="absolute"
                            top="-1"
                            right="-1"
                            bg="green.500"
                            color="white"
                            borderRadius="full"
                            minW="20px"
                            h="20px"
                            onClick={() => void handleAssignStaff(member.email)}
                            isLoading={isLoading}
                            _hover={{ bg: "green.600" }}
                          />
                        </Box>
                      </Tooltip>
                    ))}
                  </HStack>
                </Box>
              );
            })}
          </VStack>
        )}
      </Box>

      {/* Action Buttons */}
      <Flex justify="flex-end" pt={4}>
        <Button onClick={onClose}>Close</Button>
      </Flex>

      {/* Unassign Confirmation Dialog */}
      <AlertDialog
        isOpen={isUnassignOpen}
        leastDestructiveRef={cancelRef}
        onClose={onUnassignClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Unassign Staff Member
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to unassign {staffToUnassign?.name} from
              this shift?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onUnassignClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() =>
                  staffToUnassign &&
                  void handleUnassignStaff(staffToUnassign.email)
                }
                ml={3}
                isLoading={isLoading}
              >
                Unassign
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </VStack>
  );
};

export default ShiftAssignmentModal;
