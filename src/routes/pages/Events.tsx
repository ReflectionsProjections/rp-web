import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Textarea,
  useDisclosure,
  Heading,
  Text,
  Image,
  Grid,
  CardFooter,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import {EditIcon} from "@chakra-ui/icons";
import moment from 'moment-timezone';
import {useState, useEffect} from "react";

const api_base_url = "https://api.reflectionsprojections.org/events";
const readable = "MMMM Do YYYY, h:mm a"

function convertToCST(date: string) {
  const m = moment.utc(date);
  m.tz('America/Chicago');
  return m;
}

function EventCard({event, state}) {
  return (
    <Card maxW='sm' key={event.eventId} opacity={(event.isVisible) ? "1.0" : "0.6"}>
      <CardBody>
        <Image src={event.imageUrl} alt={event.name} borderRadius='lg'/>
        <Stack mt='6' spacing='3'>
          <Heading size='md'> {event.name}</Heading>
          <Badge borderRadius="full" px="2" colorScheme={event.isVirtual ? "green" : "blue"}>
            {event.isVirtual ? "Virtual" : "In-person"}
          </Badge>
          <Text>
            {convertToCST(event.startTime).format(readable)} - {convertToCST(event.endTime).format(readable)}
          </Text>
          <Text>
                        ({moment.duration(convertToCST(event.endTime).diff(convertToCST(event.startTime))).humanize()})
          </Text>
          <Text>
                        Points: {event.points}
          </Text>
          <Text>
            {event.description}
          </Text>
        </Stack>
      </CardBody>

      <CardFooter>
        <EditModal event={event} state={state}/>
      </CardFooter>
    </Card>
  )
}

function EditModal({event, state}) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [formData, setFormData] = useState({
    eventId: event.eventId,
    eventType: event.eventType,
    name: event.name,
    isVirtual: event.isVirtual,
    startTime: convertToCST(event.startTime).format('yyyy-MM-DDTHH:mm'),
    endTime: convertToCST(event.endTime).format('yyyy-MM-DDTHH:mm'),
    points: event.points,
    description: event.description,
    imageUrl: event.imageUrl,
    isVisible: event.isVisible
  });

  const handleChange = (e) => {
    const {name, value, type, checked} = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // useEffect(() => {
  //   async function handleSave = () => {
  //     const req = {...formData};
  //     req.startTime = moment(formData.startTime).toISOString();
  //     req.endTime = moment(formData.endTime).toISOString();
  //
  //     req.isVirtual = formData.isVirtual === "true";
  //     req.isVisible = formData.isVisible === "true";
  //
  //     const currstate = await fetch(api_base_url).then((data) => data.json());
  //     if (currstate === state) {
  //
  //     }
  //   };
  //
  // , []});

  return (
    <>
      <Button leftIcon={<EditIcon />} colorScheme="teal" variant="solid" onClick={onOpen}>
          Edit
      </Button>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit event</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              mb={4}
              placeholder="Event Name"
            />
            <Select
              name="isVirtual"
              value={formData.isVirtual ? "true" : "false"}
              onChange={handleChange}
            >
              <option value="true">Virtual</option>
              <option value="false">In-Person</option>
            </Select>
            <Input
              name="startTime"
              type="datetime-local"
              value={formData.startTime}
              onChange={handleChange}
              mb={4}
              placeholder="Start Time"
            />
            <Input
              name="endTime"
              type="datetime-local"
              value={formData.endTime}
              onChange={handleChange}
              mb={4}
              placeholder="End Time"
            />
            <NumberInput
              name="points"
              value={formData.points}
              onChange={(valueString) => setFormData(prevState => ({ ...prevState, points: parseInt(valueString) }))}
              min={0}
              mb={4}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              mb={4}
              placeholder="Description"
            />
            <Input
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              mb={4}
              placeholder="Image URL"
            />
            <Select
              name="isVisible"
              value={formData.isVisible ? "true" : "false"}
              onChange={handleChange}
            >
              <option value="true">Visible</option>
              <option value="false">Hidden</option>
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSave}>
                Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function Events() {
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    fetch(api_base_url)
      .then((response) => response.json())
      .then((data) => setEventData(data));
  }, []);

  return (
    <Box flex="1" minW='90vw' p={4}>
      <Heading size="lg">Events</Heading>
      <br/>
      <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)"}}
        justifyItems='center' gap={6}>
        {eventData.map((event) => EventCard({event, eventData}))}
      </Grid>
    </Box>
  );
}

export default Events;