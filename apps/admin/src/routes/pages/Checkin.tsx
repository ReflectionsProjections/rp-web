import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  List,
  ListItem,
  Switch,
  useToast,
  Text,
  useDisclosure,
  Select,
  HStack
} from "@chakra-ui/react";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { api, Event, usePolling } from "@rp/shared";
import { useOutletContext } from "react-router-dom";
import { MainContext } from "../Main.tsx";
import { ApiError } from "@rp/shared/src/api/type-wrapper.ts";
import MerchModal from "@/components/Checkin/MerchModal.tsx";

export type BasicAttendee = {
  email: string;
  userId: string;
  name: string;
};

const Checkin = () => {
  const { authorized } = useOutletContext<MainContext>();
  const { data: attendeeEmails } = usePolling("/attendee/emails", authorized);
  const { data: events } = usePolling("/events", authorized);
  const [showWebcam, setShowWebcam] = useState(false);
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAttendees, setFilteredAttendees] = useState<BasicAttendee[]>(
    []
  );
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedAttendee, setSelectedAttendee] =
    useState<BasicAttendee | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Handle QR scan
  const handleScan = (detectedCodes: IDetectedBarcode[]) => {
    const qrData = detectedCodes[0];

    if (!selectedEvent) {
      toast({
        title: "Please select an event first!",
        status: "error"
      });
      return;
    }

    toast.promise(
      api
        .post("/checkin/scan/staff", {
          eventId: selectedEvent.eventId,
          qrCode: qrData.rawValue
        })
        .then(() => {
          if (selectedEvent.eventType === "CHECKIN") {
            onOpen();
          }
        }),
      {
        success: { title: "Successfully checked into event!" },
        error: (error: ApiError) => {
          switch (error?.response?.data?.error) {
            case "QR code has expired":
              return { title: "Event QR code has expired", status: "error" };
            case "IsDuplicate":
              return {
                title: "Attendee has already checked in",
                status: "info"
              };
            default:
              return {
                title: "Something went wrong! Please contact dev team.",
                status: "error"
              };
          }
        },
        loading: { title: "Checking in attendee..." }
      }
    );
  };

  // Main check-in logic
  const handleCheckIn = () => {
    if (!selectedEvent) {
      toast({
        title: "Please select an event first!",
        status: "error"
      });
      return;
    }

    if (!selectedAttendee) {
      toast({
        title: "Please select an attendee first!",
        status: "error"
      });
      return;
    }

    toast.promise(
      api
        .post("/checkin/event", {
          eventId: selectedEvent.eventId,
          userId: selectedAttendee.userId
        })
        .finally(() => {
          console.log(selectedEvent);
          if (selectedEvent.eventType === "CHECKIN") {
            onOpen();
          }
        }),
      {
        success: { title: "Successfully checked into event!" },
        error: (error: ApiError) => {
          switch (error?.response?.data?.error) {
            case "IsDuplicate":
              return {
                title: "Attendee has already checked in",
                status: "info"
              };
            default:
              return {
                title: "Could not check in attendee. Please try again.",
                status: "error"
              };
          }
        },
        loading: { title: "Checking in attendee..." }
      }
    );
  };

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term && attendeeEmails) {
      const matches = attendeeEmails.filter(
        (attendee) =>
          attendee.email.toLowerCase().includes(term.toLowerCase()) ||
          attendee.name.toLowerCase().includes(term.toLowerCase())
      );

      setFilteredAttendees(matches);
    } else {
      setFilteredAttendees([]);
    }
  };

  // Handle selecting an attendee from dropdown
  const handleSelectAttendee = (attendee: BasicAttendee) => {
    setSearchTerm(`${attendee.name} (${attendee.email})`);
    setSelectedAttendee(attendee);
    setFilteredAttendees([]);
  };

  return (
    <>
      <Flex justifyContent="center" alignItems="center">
        <Heading size="lg">Check-in</Heading>
      </Flex>
      <br />

      <Flex
        w="100%"
        p={4}
        flexWrap="wrap"
        justifyContent="space-evenly"
        gap={6}
      >
        {/* Left Side: Scanner or Search */}
        <Box flex="1" p={4} mr={4}>
          <FormControl display="flex" alignItems="center" mb={4}>
            <FormLabel htmlFor="toggle-webcam" mb="0">
              Show Webcam
            </FormLabel>
            <Switch
              id="toggle-webcam"
              isChecked={showWebcam}
              onChange={() => setShowWebcam(!showWebcam)}
            />
          </FormControl>

          {showWebcam ? (
            <Box>
              <Scanner
                allowMultiple={true}
                scanDelay={2000}
                onScan={(codes) => void handleScan(codes)}
              />
            </Box>
          ) : (
            <FormControl>
              <FormLabel htmlFor="search">Search by Email or Name</FormLabel>
              <HStack>
                <Input
                  id="search"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  autoComplete="off"
                  pr="2.5rem"
                />
                {searchTerm && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedAttendee(null);
                      setFilteredAttendees([]);
                    }}
                  >
                    ✕
                  </Button>
                )}
              </HStack>

              {filteredAttendees.length > 0 && (
                <Box
                  mt={1}
                  border="1px solid #ccc"
                  borderRadius="md"
                  maxH="200px"
                  overflowY="auto"
                  position="absolute"
                  width="calc(100% - 2rem)"
                  bg="white"
                  zIndex={9}
                >
                  <List>
                    {filteredAttendees.map((attendee) => (
                      <ListItem
                        key={attendee.userId}
                        p={2}
                        _hover={{ bg: "gray.100", cursor: "pointer" }}
                        onClick={() => void handleSelectAttendee(attendee)}
                        color="black"
                      >
                        <Text fontWeight="medium">{attendee.name}</Text>
                        <Text fontSize="sm" color="gray.600">
                          {attendee.email}
                        </Text>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              <Button mt={4} colorScheme="blue" onClick={handleCheckIn}>
                Check in Attendee
              </Button>
            </FormControl>
          )}
        </Box>

        {/* Right Side: Event Selection */}
        <Box flex="1" p={4}>
          <FormControl>
            <FormLabel textAlign="center" fontWeight="bold" fontSize="xl">
              Select Event
            </FormLabel>

            <Select
              placeholder="Choose an event..."
              value={selectedEvent?.eventId || ""}
              onChange={(e) => {
                const eventId = e.target.value;
                const event =
                  events?.find((ev) => ev.eventId === eventId) || null;
                setSelectedEvent(event);
              }}
              size="lg"
              mb={4}
            >
              {events?.map((event) => (
                <option key={event.eventId} value={event.eventId}>
                  {event.name}
                </option>
              ))}
            </Select>

            {selectedEvent && (
              <Box
                p={3}
                border="1px solid"
                borderColor="blue.300"
                borderRadius="md"
                bg="blue.50"
              >
                <Text fontWeight="medium" mb={1}>
                  Selected: {selectedEvent.name}
                </Text>
                <Text fontSize="sm" color="gray.600" mt={1}>
                  {selectedEvent.description}
                </Text>
              </Box>
            )}
          </FormControl>
        </Box>
      </Flex>

      <MerchModal
        isOpen={isOpen}
        onClose={onClose}
        selectedAttendee={selectedAttendee}
      />
    </>
  );
};

export default Checkin;
