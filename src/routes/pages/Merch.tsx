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
} from "@chakra-ui/react";

function Merch() {
  const [showWebcam, setShowWebcam] = useState(false); // Toggle between webcam and email input
  const [attendeeName, setAttendeeName] = useState("Attendee Name");
  const [merch, setMerch] = useState({
    Button: false,
    Cap: false,
    ToteBag: false,
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setMerch((prevState) => ({ ...prevState, [name]: checked }));
  };

  // TODO: Write attendee search handler to call GET /attendees API endpoint
  const handleSearch = () => {
    console.log({
        attendeeName,
        merch,
    });
  }

  // TODO: Write merch submit handler to call POST /attendees merch API endpoint
  const handleSubmit = () => {
    console.log({
        attendeeName,
        merch,
    });
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
              <Input id="email" placeholder="Email" />
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
            <Checkbox
              name="Button"
              isChecked={merch.Button}
              onChange={handleCheckboxChange}
            >
              Button
            </Checkbox>
            <Checkbox
              name="Cap"
              isChecked={merch.Cap}
              onChange={handleCheckboxChange}
              ml={4}
            >
              Cap
            </Checkbox>
            <Checkbox
              name="ToteBag"
              isChecked={merch.ToteBag}
              onChange={handleCheckboxChange}
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
