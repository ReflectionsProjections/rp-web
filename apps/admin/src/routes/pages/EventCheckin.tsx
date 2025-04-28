import { useEffect, useState } from "react";
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
  useMediaQuery
} from "@chakra-ui/react";
import { Scanner } from "@yudiel/react-qr-scanner";
import api from "../../util/api.ts";

function EventCheckin() {

  const [isSmall] = useMediaQuery("(max-width: 600px)");

  const toast = useToast();
  const [showWebcam, setShowWebcam] = useState(false); // Toggle between webcam and email input
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [qrData, setQrData] = useState("");
  const [filteredEmails, setFilteredEmails] = useState<{ email: string; userId: string }[]>([]);
  const [attendeeEmails, setAttendeeEmails] = useState<{ email: string; userId: string }[]>([]);
  const [attendeeName, setAttendeeName] = useState("Attendee Name");

  const [events, setEvents] = useState<[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const showToast = (message: string, error: boolean) => {
    toast({
      title: message,
      status: error ? "error" : "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const showQuickToast = (message: string, error: boolean) => {
    toast({
      title: message,
      status: error ? "error" : "success",
      duration: 2000,
      isClosable: true,
    });
  };

  useEffect(() => {
    api
      .get('/attendee/emails')
      .then(function (response) {
        const attendeeData = response.data;
        setAttendeeEmails(attendeeData);
      })
      .catch(function () {
        showToast('Error fetching attendee emails + info.', true);
      });

    api
      .get("/events")
      .then(function (response) {
        const eventData = response.data;
        setEvents(eventData);
      })
      .catch(function () {
        showToast("Error fetching events.", true);
      });
  }, []);

  useEffect(() => {
    if (userId == "") {
      return;
    }

    api
      .get(`/attendee/id/${userId}`)
      .then((response) => {
        const user = response.data;
        setAttendeeName(user["name"]);
        console.log("NAME: ", attendeeName);
      })
      .catch((err) =>  {
        console.log(err);
        showToast('Error fetching attendee.', true);
      });
  }, [userId]);


  // Handle scan
  useEffect(() => {
    if (qrData == "") {
      console.log("NO QR DATA");
      return;
    }

    if (!selectedEvent) {
      showToast('Please select an event to check in attendees to!', true);
      return;
    }

    api
      .post("/checkin/scan/staff", { eventId: selectedEventId, qrCode: qrData })
      .then((response) => {
        const userId = response.data;
        setUserId(userId);
        showQuickToast(`Succesfully checked into event!`, false);
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.status == 403) {
          showQuickToast('Attendee has already checked in.', true);
        } else {
          showQuickToast('Woah there, something went wrong! Find dev team please :/', true);
        }
      });
    setQrData("");
  }, [qrData]);

  // Handle the search as the user types
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    // Perform prefix search on attendeeEmails
    if (inputEmail) {
      const filtered = attendeeEmails.filter((attendee) =>
        attendee.email.toLowerCase().startsWith(inputEmail.toLowerCase())
      );
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
  const handleCheckin = async () => {
    if (!selectedEvent) {
      showToast('Please select an event to check in attendees to!', true);
      return;
    }

    if (!email) {
      showToast('Please enter an email.', true);
      return;
    }

    const selectedAttendee = attendeeEmails.find((attendee) => attendee.email === email);
    if (!selectedAttendee) {
      showToast('This email is not registered as an R|P attendee.', true);
      return;
    }

    const userId = selectedAttendee.userId;
    setUserId(userId);

    api
      .post("/checkin/event", { eventId: selectedEventId, userId: userId })
      .then(function () {
        showQuickToast(`Succesfully checked into event!`, false);
      })
      .catch(function (error) {
        showQuickToast('Could not check in attendee to event. Please try again.', true);
        console.log(error);
      });
  };


  return <>
    <Box flex="1" minW="90vw" p={4}>
      <Heading size="lg">Event Checkin</Heading>
      <br />
      <Flex direction={isSmall ? 'column' : 'row'}>
        {/* Left Side: Webcam or Email input */}
        <Box flex="1"  p={4} mr={4}>
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
              <Scanner allowMultiple={true} styles={{}} onScan={(result) => {
                setQrData(result[0].rawValue);
              }} />;
            </ Box>
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
                        _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                        onClick={() => handleSelectEmail(attendee.email)}
                        color='black'
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

            <Text fontSize="md" fontWeight="bold" fontStyle="italic" mt={2} mb={3}>
              Selected Event: {selectedEvent}
            </Text>

            <List spacing={3}>
              {events.map((event) => (
                <ListItem
                  key={event["eventId"]}
                  p={2}
                  border="1px solid #ccc"
                  borderRadius="md"
                  _hover={{ bg: "gray.100", cursor: "pointer", color: "black" }}
                  onClick={() => {
                    setQrData("");
                    setSelectedEvent(event["name"]);
                    setSelectedEventId(event["eventId"]);
                  }}
                >
                  {event["name"]}
                </ListItem>
              ))}
            </List>
          </FormControl>
        </Box>
      </Flex >
    </Box >
  </>;
}

export default EventCheckin;
