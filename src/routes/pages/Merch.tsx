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
import { Config } from "../../config.ts";
import { QrReader } from 'react-qr-reader';
import axios from "axios";
import Result from "react-qr-reader";
import { Scanner } from "@yudiel/react-qr-scanner";

function Merch() {
  const toast = useToast();
  const [qrData, setQrData] = useState("No result");
  const [showWebcam, setShowWebcam] = useState(false); // Toggle between webcam and email input
  const [email, setEmail] = useState("");
  const [attendeeName, setAttendeeName] = useState("Attendee Name");
  const [attendeePoints, setAttendeePoints] = useState(0);
  const [hasMerch, setHasMerch] = useState({
    Button: false,
    Cap: false,
    ToteBag: false,
  });
  const [redeemedMerch, setRedeemedMerch] = useState({
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

  // const handleResult = (result?: Result. | undefined | null, error?: Error | undefined | null, codeReader?: BrowserQRCodeReader) => void;) => {

  // }
  const handleResult = (result: { text: string } | null, error: Error | null) => {
    if (error) {
      console.log(error);
      return;
    }

    if (result) {
      console.log(result);
    }
  }

  const handleScan = (data: string | null) => {
    if (data) {
      setQrData(data)
    }
    showToast('Scanned', false);
  }

  const handleScanError = () => {
    showToast('Failed', true);
  }

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
        setRedeemedMerch({
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
            // <Box border="1px solid" height="200px" textAlign="center">
            <>
              <Scanner allowMultiple={true} onScan={(result) => {console.log(result[0].rawValue);}} />;
              <p>{qrData}</p>
            </>
            // </Box>
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
