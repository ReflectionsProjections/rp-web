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
  useToast,
} from "@chakra-ui/react";
import { Config } from "../../config.ts";
import axios from "axios";
import { Scanner } from "@yudiel/react-qr-scanner";

function Merch() {
  const toast = useToast();
  const [showWebcam, setShowWebcam] = useState(false); // Toggle between webcam and email input
  const [email, setEmail] = useState("");
  const [attendeeName, setAttendeeName] = useState("Attendee Name");
  const [attendeePoints, setAttendeePoints] = useState(0);

  // Indicates whether or not the merch checkbox is checked
  const [hasMerch, setHasMerch] = useState({
    Button: false,
    Cap: false,
    ToteBag: false,
  });
  // Indicates whether or not the merch item has been redeemed already
  const [redeemedMerch, setRedeemedMerch] = useState({
    Button: false,
    Cap: false,
    ToteBag: false,
  });
  // Indicates whether or not the merch item is eligible to be redeemed
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
        setAttendeePoints(user.points);
        setHasMerch({
          Button: user.hasRedeemedMerch!["Button"],
          Cap: user.hasRedeemedMerch!["Cap"],
          ToteBag: user.hasRedeemedMerch!["Tote"],
        });
        setRedeemedMerch({
          Button: user.hasRedeemedMerch!["Button"],
          Cap: user.hasRedeemedMerch!["Cap"],
          ToteBag: user.hasRedeemedMerch!["Tote"],
        });
        setEligibleMerch({
          Button: user.isEligibleMerch!["Button"],
          Cap: user.isEligibleMerch!["Cap"],
          ToteBag: user.isEligibleMerch!["Tote"],
        });
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

  // Get attendee merch info via their email
  const handleSearch = async () => {
    const jwt = localStorage.getItem("jwt");
    if (!email) {
      showToast('Please enter an email.', true);
      return;
    }

    axios
      .get(Config.API_BASE_URL + `/attendee/email/${email}`, {
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
        setRedeemedMerch({
          Button: merchInfo.hasButton,
          Cap: merchInfo.hasCap,
          ToteBag: merchInfo.hasTote,
        });
        setEligibleMerch({
          Button: merchInfo.eligibleButton,
          Cap: merchInfo.eligibleCap,
          ToteBag: merchInfo.eligibleTote,
        });
      })
      .catch(function () {
        showToast('Error fetching attendee merch info.', true);
      });
  };

  // Handle submitting the merch checkin changes
  const handleSubmit = async () => {
    const jwt = localStorage.getItem("jwt");
    if (!redeemedMerch.Button && eligibleMerch.Button && hasMerch.Button) {
      axios.post(Config.API_BASE_URL + "/attendee/redeemMerch/Button", { email: email }, {
        headers: {
          Authorization: jwt
        },
      })
        .then(function () {
          showToast('Successfully updated attendee merch info!', false);
        })
        .catch(function () {
          showToast('Error updating attendee merch info. This attendee may have already received a Button.', true);
        });
    }
    if (!redeemedMerch.Cap && eligibleMerch.Cap && hasMerch.Cap) {
      axios.post(Config.API_BASE_URL + "/attendee/redeemMerch/Cap", { email: email }, {
        headers: {
          Authorization: jwt
        },
      })
        .then(function () {
          showToast('Successfully updated attendee merch info!', false);
        })
        .catch(function () {
          showToast('Error updating attendee merch info. This attendee may have already received a Cap.', true);
        });
    }
    if (!redeemedMerch.ToteBag && eligibleMerch.ToteBag && hasMerch.ToteBag) {
      axios.post(Config.API_BASE_URL + "/attendee/redeemMerch/Tote", { email: email }, {
        headers: {
          Authorization: jwt
        },
      })
        .then(function () {
          showToast('Successfully updated attendee merch info!', false);
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
                onChange={(e) => setEmail(e.target.value)}
              />
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
  </>;
}

export default Merch;