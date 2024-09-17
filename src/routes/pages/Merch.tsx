import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
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
import { Config } from "../../config.ts";
import axios from "axios";
import { Scanner } from "@yudiel/react-qr-scanner";

function Merch() {
  const toast = useToast();
  const [showWebcam, setShowWebcam] = useState(false); // Toggle between webcam and email input
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [filteredEmails, setFilteredEmails] = useState<{ email: string; userId: string }[]>([]);
  const [attendeeEmails, setAttendeeEmails] = useState<{ email: string; userId: string }[]>([]);
  const [attendeeName, setAttendeeName] = useState("Attendee Name");
  const [attendeePoints, setAttendeePoints] = useState(0);

  // Indicates whether or not the merch checkbox is checked
  const [hasMerch, setHasMerch] = useState({
    Tshirt: false,
    Button: false,
    Cap: false,
    ToteBag: false,
  });
  // Indicates whether or not the merch item has been redeemed already
  const [redeemedMerch, setRedeemedMerch] = useState({
    Tshirt: false,
    Button: false,
    Cap: false,
    ToteBag: false,
  });
  // Indicates whether or not the merch item is eligible to be redeemed
  const [eligibleMerch, setEligibleMerch] = useState({
    Tshirt: false,
    Button: false,
    Cap: false,
    ToteBag: false,
  });

  const showToast = (message: string, error: boolean) => {
    toast({
      title: message,
      status: error ? "error" : "success",
      duration: 9000,
      isClosable: true,
    });
  };

  // Fetch all attendee emails + userIds upon loading the page
  useEffect(() => {
    const fetchAttendeeEmails = async () => {
      const jwt = localStorage.getItem("jwt");
      axios
        .get(Config.API_BASE_URL + '/attendee/emails', {
          headers: {
            Authorization: jwt,
          },
        })
        .then(function (response) {
          const attendeeData = response.data;
          setAttendeeEmails(attendeeData);
        })
        .catch(function () {
          showToast('Error fetching attendee emails + info.', true);
        });
        
    };

    fetchAttendeeEmails();
  }, []);

  const getUser = (userId: string) => {
    const jwt = localStorage.getItem("jwt");
    axios
      .get(Config.API_BASE_URL + `/attendee/id/${userId}`, {
        headers: {
          Authorization: jwt,
        },
      })
      .then(function (response) {
        const user = response.data;

        // Update the state with the fetched attendee information
        setAttendeeName(user.name);
        setUserId(user.userId);
        setAttendeePoints(user.points);
        setHasMerch({
          Tshirt: user.hasRedeemedMerch!["Tshirt"],
          Button: user.hasRedeemedMerch!["Button"],
          Cap: user.hasRedeemedMerch!["Cap"],
          ToteBag: user.hasRedeemedMerch!["Tote"],
        });
        setRedeemedMerch({
          Tshirt: user.hasRedeemedMerch!["Tshirt"],
          Button: user.hasRedeemedMerch!["Button"],
          Cap: user.hasRedeemedMerch!["Cap"],
          ToteBag: user.hasRedeemedMerch!["Tote"],
        });
        setEligibleMerch({
          Tshirt: user.isEligibleMerch!["Tshirt"],
          Button: user.isEligibleMerch!["Button"],
          Cap: user.isEligibleMerch!["Cap"],
          ToteBag: user.isEligibleMerch!["Tote"],
        });

        showToast('Successfully fetched attendee merch info!', false);
      })
      .catch(function () {
        showToast('Error fetching attendee merch info.', true);
      });
  };

  // Handle QR code scanner
  const handleScan = (data: string) => {
    const jwt = localStorage.getItem("jwt");
    axios
      .post(Config.API_BASE_URL + "/checkin/scan/merch", {qrCode: data}, {
        headers: {
          Authorization: jwt,
        },
      })
      .then(function (response) {
        const userId = response.data;
        getUser(userId);
      });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setHasMerch((prevState) => ({ ...prevState, [name]: checked }));
  };

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

  // Get attendee merch info via their email
  const handleSearch = async () => {
    if (!email) {
      showToast('Please enter an email.', true);
      return;
    }

    // .find() could be a bit slow, possibly change to Map/something else later
    const selectedAttendee = attendeeEmails.find((attendee) => attendee.email === email);
    if (!selectedAttendee) {
      showToast('This email is not registered as an R|P attendee.', true);
      return;
    }

    const userId = selectedAttendee.userId;
    getUser(userId);
  };

  // Handle submitting the merch checkin changes
  const handleSubmit = async () => {
    const jwt = localStorage.getItem("jwt");
    if (!redeemedMerch.Tshirt && eligibleMerch.Tshirt && hasMerch.Tshirt) {
      axios.post(Config.API_BASE_URL + "/attendee/redeemMerch/Tshirt", { userId: userId }, {
        headers: {
          Authorization: jwt
        },
      })
        .then(function () {
          showToast('Successfully redeemed a T-Shirt!', false);
        })
        .catch(function () {
          showToast('Error updating attendee merch info. This attendee may have already received a T-shirt.', true);
        });
    }
    if (!redeemedMerch.Button && eligibleMerch.Button && hasMerch.Button) {
      axios.post(Config.API_BASE_URL + "/attendee/redeemMerch/Button", { userId: userId }, {
        headers: {
          Authorization: jwt
        },
      })
        .then(function () {
          showToast('Successfully redeemed a Button!', false);
        })
        .catch(function () {
          showToast('Error updating attendee merch info. This attendee may have already received a Button.', true);
        });
    }
    if (!redeemedMerch.Cap && eligibleMerch.Cap && hasMerch.Cap) {
      axios.post(Config.API_BASE_URL + "/attendee/redeemMerch/Cap", { userId: userId }, {
        headers: {
          Authorization: jwt
        },
      })
        .then(function () {
          showToast('Successfully redeemed a Cap!', false);
        })
        .catch(function () {
          showToast('Error updating attendee merch info. This attendee may have already received a Cap.', true);
        });
    }
    if (!redeemedMerch.ToteBag && eligibleMerch.ToteBag && hasMerch.ToteBag) {
      axios.post(Config.API_BASE_URL + "/attendee/redeemMerch/Tote", { userId: userId }, {
        headers: {
          Authorization: jwt
        },
      })
        .then(function () {
          showToast('Successfully redeemed a Tote Bag!', false);
        })
        .catch(function () {
          showToast('Error updating attendee merch info. This attendee may have already received a Tote Bag.', true);
        });
    }
  };

  return <>
    <Box flex="1" minW="90vw" p={4}>
      <Heading size="lg">Merch</Heading>
      <br />
      <Flex>
        {/* Left Side: Webcam or Email input */}
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
            <>
              <Scanner allowMultiple={true} onScan={(result) => {
                const data = result[0].rawValue;
                console.log(result[0].rawValue);
                handleScan(data);
              }} />;
            </>
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

              <Button mt={4} colorScheme="blue" onClick={handleSearch}>
                Search Attendee
              </Button>

            </FormControl>
          )}
        </Box>

        {/* Right Side: Attendee Name and Merch Checkboxes */}
        <Box flex="1" p={4}>
          <FormControl>
            <FormLabel
              htmlFor="attendee-name"
              textAlign="center"
              fontWeight="bold"
              fontSize="xl"
            >
              {attendeeName}
            </FormLabel>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel htmlFor="attendee-name" textAlign="center">Points: {attendeePoints}</FormLabel>
          </FormControl>

          <FormControl mb={4}>
            <Checkbox
              name="Tshirt"
              isChecked={hasMerch.Tshirt}
              onChange={handleCheckboxChange}
              isDisabled={!eligibleMerch.Tshirt}
            >
                T-shirt
            </Checkbox>
            <Checkbox
              name="Button"
              isChecked={hasMerch.Button}
              onChange={handleCheckboxChange}
              isDisabled={!eligibleMerch.Button}
            >
              Button
            </Checkbox>
            <Checkbox
              name="Cap"
              isChecked={hasMerch.Cap}
              onChange={handleCheckboxChange}
              isDisabled={!eligibleMerch.Cap}
              ml={4}
            >
              Cap
            </Checkbox>
            <Checkbox
              name="ToteBag"
              isChecked={hasMerch.ToteBag}
              onChange={handleCheckboxChange}
              isDisabled={!eligibleMerch.ToteBag}
              ml={4}
            >
              Tote Bag
            </Checkbox>
          </FormControl>

          <Button colorScheme="blue" onClick={handleSubmit} mb={4}>
            Submit
          </Button>

          <Text fontSize="sm" fontStyle="italic" mt={2}>
            NOTE: Once you hit submit and check-in an attendee for merch, you cannot undo this!
          </Text>
        </Box>
      </Flex>
    </Box>
  </>;
}

export default Merch;