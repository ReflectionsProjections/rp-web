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
  Text
} from "@chakra-ui/react";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import api from "../../util/api.ts";
import { Event, usePolling } from "@rp/shared";
import { ApiError } from "@rp/shared/src/api/axios.ts";

const EventCheckin = () => {
  const { data: attendees } = usePolling(api, "/attendee/emails");
  const { data: events } = usePolling(api, "/events");
  const [showWebcam, setShowWebcam] = useState(false); // Toggle between webcam and email input
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [filteredEmails, setFilteredEmails] = useState<
    { email: string; userId: string }[]
  >([]);

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Handle scan
  const handleScan = (detectedCodes: IDetectedBarcode[]) => {
    const qrData = detectedCodes[0];

    if (!selectedEvent) {
      toast({
        title: "Please select an event to check in attendees to!",
        status: "error"
      });
      return;
    }

    toast.promise(
      api.post("/checkin/scan/staff", {
        eventId: selectedEvent.eventId,
        qrCode: qrData.rawValue
      }),
      {
        success: { title: "Succesfully checked into event!" },
        error: (error: ApiError) => {
          switch (error.response.data.error) {
            case "QR code has expired":
              return { title: "Event QR code has expired", status: "error" };
            case "IsDuplicate":
              return {
                title: "Attendee has already checked in",
                status: "info"
              };
            default:
              return {
                title:
                  "Woah there, something went wrong! Find dev team please :/",
                status: "error"
              };
          }
        },
        loading: { title: "Checking in attendee..." }
      }
    );
  };

  // Handle the search as the user types
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    // Perform prefix search on attendeeEmails
    if (inputEmail) {
      const filtered =
        attendees?.filter((attendee) =>
          attendee.email.toLowerCase().startsWith(inputEmail.toLowerCase())
        ) ?? [];
      setFilteredEmails(filtered);
    } else {
      setFilteredEmails([]);
    }
  };

  // Handle selecting an email from the dropdown
  const handleSelectEmail = (selectedEmail: string) => {
    setEmail(selectedEmail);
    setFilteredEmails([]); // Hide the dropdown after selecting
  };

  // Check attendee into event via their email
  const handleCheckin = () => {
    if (!selectedEvent) {
      toast({
        title: "Please select an event to check in attendees to!",
        status: "error"
      });
      return;
    }

    if (!email) {
      toast({
        title: "Please enter an email.",
        status: "error"
      });
      return;
    }

    const selectedAttendee = attendees?.find(
      (attendee) => attendee.email === email
    );
    if (!selectedAttendee) {
      toast({
        title: "This email is not registered as an R|P attendee.",
        status: "error"
      });
      return;
    }

    toast.promise(
      api.post("/checkin/event", {
        eventId: selectedEvent.eventId,
        userId: selectedAttendee.userId
      }),
      {
        success: { title: "Succesfully checked into event!" },
        error: {
          title: "Could not check in attendee to event. Please try again."
        },
        loading: { title: "Checking in attendee..." }
      }
    );
  };

  return (
    <>
      <Flex justifyContent="center" alignItems="center">
        <Heading size="lg">Event Check-in</Heading>
      </Flex>
      <br />
      <Flex
        w="100%"
        p={4}
        flexWrap="wrap"
        justifyContent="space-evenly"
        gap={6}
      >
        {/* Left Side: Webcam or Email input */}
        <Box flex="1" p={4} mr={4}>
          <FormControl display="flex" alignItems="center" mb={4} mt="0)">
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
                onScan={handleScan}
              />
            </Box>
          ) : (
            <FormControl>
              <FormLabel htmlFor="email">Enter Attendee Email</FormLabel>
              <Input
                id="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                autoComplete="off"
              />

              {filteredEmails.length > 0 && (
                <Box
                  mt={1}
                  border="1px solid #ccc"
                  borderRadius="md"
                  maxH="200px"
                  overflowY="auto"
                  position="absolute"
                  width="100%"
                  bg="white"
                  zIndex={10}
                >
                  <List>
                    {filteredEmails.map((attendee) => (
                      <ListItem
                        key={attendee.userId}
                        p={2}
                        _hover={{ bg: "gray.100", cursor: "pointer" }}
                        onClick={() => handleSelectEmail(attendee.email)}
                        color="black"
                      >
                        {attendee.email}
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              <Button mt={4} colorScheme="blue" onClick={handleCheckin}>
                Check in Attendee
              </Button>
            </FormControl>
          )}
        </Box>

        {/* Right Side: Event Selection */}
        <Box flex="1" p={4}>
          <FormControl>
            <FormLabel textAlign="center" fontWeight="bold" fontSize="xl">
              Events
            </FormLabel>

            <Text
              fontSize="md"
              fontWeight="bold"
              fontStyle="italic"
              mt={2}
              mb={3}
            >
              Selected Event: {selectedEvent?.name}
            </Text>

            <List spacing={3}>
              {events?.map((event) => (
                <ListItem
                  key={event["eventId"]}
                  p={2}
                  border="1px solid #ccc"
                  borderRadius="md"
                  _hover={{
                    bg: "gray.100",
                    cursor: "pointer",
                    color: "black"
                  }}
                  onClick={() => {
                    setSelectedEvent(event);
                  }}
                >
                  {event.name}
                </ListItem>
              ))}
            </List>
          </FormControl>
        </Box>
      </Flex>
    </>
  );
};

export default EventCheckin;
