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
  List,
  ListItem,
  Switch,
  useToast,
  Text
} from "@chakra-ui/react";
import { Scanner } from "@yudiel/react-qr-scanner";
import api from "../../util/api.ts";
import { path, usePolling } from "@rp/shared";

function Merch() {
  const toast = useToast();
  const { data: emails } = usePolling(api, "/attendee/emails");
  const [showWebcam, setShowWebcam] = useState(false); // Toggle between webcam and email input
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [filteredEmails, setFilteredEmails] = useState<
    { email: string; userId: string }[]
  >([]);
  const [attendeeName, setAttendeeName] = useState("Attendee Name");
  const [attendeePoints, setAttendeePoints] = useState(0);

  // Indicates whether or not the merch checkbox is checked
  const [hasMerch, setHasMerch] = useState({
    Tshirt: false,
    Button: false,
    Cap: false,
    ToteBag: false
  });
  // Indicates whether or not the merch item has been redeemed already
  const [redeemedMerch, setRedeemedMerch] = useState({
    Tshirt: false,
    Button: false,
    Cap: false,
    ToteBag: false
  });
  // Indicates whether or not the merch item is eligible to be redeemed
  const [eligibleMerch, setEligibleMerch] = useState({
    Tshirt: false,
    Button: false,
    Cap: false,
    ToteBag: false
  });

  const getUser = (userId: string) => {
    toast.promise(
      api
        .get(path("/attendee/id/:userId", { userId }))
        .then(function (response) {
          const user = response.data;

          // Update the state with the fetched attendee information
          setAttendeeName(user.name);
          setUserId(user.userId);
          setAttendeePoints(user.points);
          setHasMerch({
            Tshirt: user.hasRedeemedMerch["Tshirt"],
            Button: user.hasRedeemedMerch["Button"],
            Cap: user.hasRedeemedMerch["Cap"],
            ToteBag: user.hasRedeemedMerch["Tote"]
          });
          setRedeemedMerch({
            Tshirt: user.hasRedeemedMerch["Tshirt"],
            Button: user.hasRedeemedMerch["Button"],
            Cap: user.hasRedeemedMerch["Cap"],
            ToteBag: user.hasRedeemedMerch["Tote"]
          });
          setEligibleMerch({
            Tshirt: user.isEligibleMerch["Tshirt"],
            Button: user.isEligibleMerch["Button"],
            Cap: user.isEligibleMerch["Cap"],
            ToteBag: user.isEligibleMerch["Tote"]
          });
        }),
      {
        success: { title: "Successfully fetched attendee merch info!" },
        error: { title: "Error fetching attendee merch info" },
        loading: { title: "Fetching attendee merch info..." }
      }
    );
  };

  // Handle QR code scanner
  const handleScan = (data: string) => {
    toast.promise(
      api
        .post("/checkin/scan/merch", { qrCode: data })
        .then(function (response) {
          const userId = response.data;
          getUser(userId);
        }),
      {
        success: { title: "Merch successfully scanned!" },
        error: { title: "Error scanning merch" },
        loading: { title: "Scanning merch" }
      }
    );
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
      const filtered =
        emails?.filter((attendee) =>
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

  // Get attendee merch info via their email
  const handleSearch = () => {
    if (!email) {
      toast({ title: "Please enter an email.", status: "error" });
      return;
    }

    // .find() could be a bit slow, possibly change to Map/something else later
    const selectedAttendee = emails?.find(
      (attendee) => attendee.email === email
    );
    if (!selectedAttendee) {
      toast({
        title: "This email is not registered as an R|P attendee.",
        status: "error"
      });
      return;
    }

    const userId = selectedAttendee.userId;
    getUser(userId);
  };

  // Handle submitting the merch checkin changes
  const handleSubmit = () => {
    if (!redeemedMerch.Tshirt && eligibleMerch.Tshirt && hasMerch.Tshirt) {
      toast.promise(
        api.post(path("/attendee/redeemMerch/:item", { item: "Tshirt" }), {
          userId: userId
        }),
        {
          success: { title: "Successfully redeemed a T-Shirt!" },
          error: {
            title:
              "Error updating attendee merch info. This attendee may have already received a T-shirt."
          },
          loading: { title: "Redeeming T-Shirt..." }
        }
      );
    }
    if (!redeemedMerch.Button && eligibleMerch.Button && hasMerch.Button) {
      toast.promise(
        api.post(path("/attendee/redeemMerch/:item", { item: "Button" }), {
          userId: userId
        }),
        {
          success: { title: "Successfully redeemed a Button!" },
          error: {
            title:
              "Error updating attendee merch info. This attendee may have already received a Button."
          },
          loading: { title: "Redeeming Button..." }
        }
      );
    }
    if (!redeemedMerch.Cap && eligibleMerch.Cap && hasMerch.Cap) {
      toast.promise(
        api.post(path("/attendee/redeemMerch/:item", { item: "Cap" }), {
          userId: userId
        }),
        {
          success: { title: "Successfully redeemed a Cap!" },
          error: {
            title:
              "Error updating attendee merch info. This attendee may have already received a Cap."
          },
          loading: { title: "Redeeming Cap..." }
        }
      );
    }
    if (!redeemedMerch.ToteBag && eligibleMerch.ToteBag && hasMerch.ToteBag) {
      toast.promise(
        api.post(path("/attendee/redeemMerch/:item", { item: "Tote" }), {
          userId: userId
        }),
        {
          success: { title: "Successfully redeemed a Tote!" },
          error: {
            title:
              "Error updating attendee merch info. This attendee may have already received a Tote."
          },
          loading: { title: "Redeeming Tote..." }
        }
      );
    }
  };

  return (
    <>
      <Flex justifyContent="center" alignItems="center">
        <Heading size="lg">Merch</Heading>
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
              <Scanner
                allowMultiple={true}
                scanDelay={2000}
                onScan={(result) => {
                  const data = result[0].rawValue;
                  console.log(result[0].rawValue);
                  handleScan(data);
                }}
              />
              ;
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
                  zIndex={9}
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
            <FormLabel htmlFor="points" textAlign="center">
              Points: {attendeePoints}
            </FormLabel>
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
              ml={4}
            >
              Button
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
            <Checkbox
              name="Cap"
              isChecked={hasMerch.Cap}
              onChange={handleCheckboxChange}
              isDisabled={!eligibleMerch.Cap}
              ml={4}
            >
              Cap
            </Checkbox>
          </FormControl>

          <Button colorScheme="blue" onClick={handleSubmit} mb={4}>
            Submit
          </Button>

          <Text fontSize="sm" fontStyle="italic" mt={2}>
            NOTE: Once you hit submit and check-in an attendee for merch, you
            cannot undo this!
          </Text>
        </Box>
      </Flex>
    </>
  );
}

export default Merch;
