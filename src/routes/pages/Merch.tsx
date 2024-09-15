import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Switch,
  Text,
  useToast,
} from "@chakra-ui/react";
import {Config} from "../../config.ts";
import axios from "axios";

function Merch() {
  const toast = useToast();
  const [showWebcam, setShowWebcam] = useState(false); // Toggle between webcam and email input
  const [email, setEmail] = useState("");
  const [attendeeName, setAttendeeName] = useState("Attendee Name");
  const [attendeePoints, setAttendeePoints] = useState(0);
  const [hasMerch, setHasMerch] = useState({
    Button: false,
    Cap: false,
    ToteBag: false,
  });
  const [eligibleMerch, setEligibleMerch] = useState({
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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setHasMerch((prevState) => ({ ...prevState, [name]: checked }));
  };

  // Get attendee merch info via their email
  const handleSearch = async () => {
    const jwt = localStorage.getItem("jwt");
    if (!email) {
      showToast('Please enter an email.', true);
      return;
    }
  
    axios
      .get(Config.API_BASE_URL + `/attendee/${email}`, {
        headers: {
          Authorization: jwt,
        },
      })
      .then(function (response) {
        const merchInfo = response.data;
  
        // Update the state with the fetched attendee information
        setAttendeeName(merchInfo.attendeeName);
        setAttendeePoints(merchInfo.attendeePoints);
        setHasMerch({
          Button: merchInfo.hasButton,
          Cap: merchInfo.hasCap,
          ToteBag: merchInfo.hasTote,
        });
        setEligibleMerch({
          Button: merchInfo.eligibleButton,
          Cap: merchInfo.eligibleCap,
          ToteBag: merchInfo.eligibleTote,
        })
      })
      .catch(function () {
        showToast('Error fetching attendee merch info.', true);
      });
  };

  // TODO: Write merch submit handler to call POST /attendees merch API endpoint
  const handleSubmit = () => {
    if (eligibleMerch.Button && hasMerch.Button) {
      const jwt = localStorage.getItem("jwt");
      console.log("JWT")
      console.log(jwt)
      axios
      .post(Config.API_BASE_URL + "/attendee/redeemMerch/Button", {
        headers: {
          Authorization: jwt,
        },
        data: {
          email: email,
        }
      })
      .then(function () {
        showToast('Successfully updated attendee merch info!', false);
      })
      .catch(function () {
        showToast('Error updating attendee merch info.', true);
      });
    }
    // if (eligibleMerch.Cap) {

    // }
    // if (eligibleMerch.ToteBag) {

    // }
  };

  return (
    <Box flex="1" minW="90vw" p={4}>
      <Heading size="lg">Merch</Heading>
      <br />
      <Flex>
        {/* Left Side: Webcam or Email input */}
        <Box flex="1" p={4} border="1px solid" borderRadius="md" mr={4}>
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
            <Box border="1px solid" height="200px" textAlign="center">
              {/* TODO: Put webcam feed here */}
              <Text>Webcam Feed Here</Text>
            </Box>
          ) : (
            <FormControl>
              <FormLabel htmlFor="email">Enter Attendee Email</FormLabel>
              <Input
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button mt={4} colorScheme="blue" onClick={handleSearch}>
                Search Attendee
              </Button>
            </FormControl>
          )}
        </Box>

        {/* Right Side: Attendee Name and Merch Checkboxes */}
        <Box flex="1" p={4} border="1px solid" borderRadius="md">
          <FormControl mb={4}>
            <FormLabel htmlFor="attendee-name" textAlign="center">{attendeeName}</FormLabel>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel htmlFor="attendee-name" textAlign="center">Points: {attendeePoints}</FormLabel>
          </FormControl>

          <FormControl mb={4}>
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

          <Button colorScheme="blue" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}

export default Merch;
