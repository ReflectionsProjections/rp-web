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
  Flex,
  Center, Checkbox,
} from '@chakra-ui/react';
import {EditIcon, AddIcon} from "@chakra-ui/icons";
import moment from 'moment-timezone';
import axios from "axios";
import {Config} from "../../config.ts";
import React, {useEffect} from "react";

const readable = "MMMM Do YYYY, h:mm a";

const jwt = localStorage.getItem("jwt");

function convertToCST(date: string) {
  const m = moment.utc(date);
  m.tz('America/Chicago');
  return m;
}

function Events() {
  const [events, setEvents] = React.useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newEvent, setNewEvent] = React.useState({
    name: '',
    isVirtual: true,
    startTime: '',
    endTime: '',
    points: 0,
    imageUrl: '',
    description: '',
    location: '',
    eventType: 'A',
    isVisible: true
  });

  const createEvent = () => {
    axios.post(Config.API_BASE_URL + "/events", { ...newEvent, attendanceCount: 0 }, {
      headers: {
        Authorization: jwt
      }
    }).then(() => {
      getEvents();
      setNewEvent({
        name: '',
        isVirtual: true,
        startTime: '',
        endTime: '',
        points: 0,
        imageUrl: '',
        description: '',
        location: '',
        eventType: 'A',
        isVisible: true
      });
      onClose(); // Close the modal after creating the event
    });
  };

  function getEvents() {
    axios.get(Config.API_BASE_URL + "/events", {
      headers: {
        Authorization: jwt
      }
    }).then(function (response) {
      setEvents(response.data);
    });
  }

  function EditModal({ event }: { event: { eventId: string, name: string, startTime: string, endTime: string, points: number, description: string, isVirtual: boolean, imageUrl: string, location: string, eventType: string, isVisible: boolean } }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [updatedValues, setUpdatedValues] = React.useState(event);

    React.useEffect(() => {
      setUpdatedValues(event);
    }, [event, isOpen]);

    const handleSave = () => {
      const updatedValuesUTC = {
        ...updatedValues,
        startTime: moment(updatedValues.startTime).utc().format(),
        endTime: moment(updatedValues.endTime).utc().format()
      };

      axios.put(Config.API_BASE_URL + "/events/" + event.eventId, {
        ...updatedValuesUTC,
        attendanceCount: 0
      }, {
        headers: {
          Authorization: jwt
        }
      }).then(() => {
        getEvents();
        onClose();
      });
    };

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
                defaultValue={event.name}
                mb={4}
                onChange={(e) => setUpdatedValues({ ...updatedValues, name: e.target.value })}
              />
              <Select
                defaultValue={event.isVirtual ? "true" : "false"}
                mb={4}
                onChange={(e) => setUpdatedValues({ ...updatedValues, isVirtual: e.target.value === "true" })}
              >
                <option value="true">Virtual</option>
                <option value="false">In-Person</option>
              </Select>
              <Input
                type="datetime-local"
                defaultValue={convertToCST(event.startTime).format('yyyy-MM-DDTHH:mm')}
                mb={4}
                onChange={(e) => setUpdatedValues({ ...updatedValues, startTime: moment(e.target.value).format() })}
              />
              <Input
                type="datetime-local"
                defaultValue={convertToCST(event.endTime).format('yyyy-MM-DDTHH:mm')}
                mb={4}
                onChange={(e) => setUpdatedValues({ ...updatedValues, endTime: moment(e.target.value).format() })}
              />
              <NumberInput defaultValue={event.points} min={0}
                onChange={(_, valueAsNumber) => setUpdatedValues({
                  ...updatedValues,
                  points: valueAsNumber
                })}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Input
                defaultValue={event.imageUrl}
                mb={4}
                onChange={(e) => setUpdatedValues({ ...updatedValues, imageUrl: e.target.value })}
              />
              <Textarea
                defaultValue={event.description}
                mb={4}
                onChange={(e) => setUpdatedValues({ ...updatedValues, description: e.target.value })}
              />
              <Input
                defaultValue={event.location}
                mb={4}
                onChange={(e) => setUpdatedValues({ ...updatedValues, location: e.target.value })}
                placeholder="Location"
              />
              <Select
                defaultValue={event.eventType}
                mb={4}
                onChange={(e) => setUpdatedValues({ ...updatedValues, eventType: e.target.value })}
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </Select>
              <Checkbox
                isChecked={event.isVisible}
                onChange={(e) => setUpdatedValues({ ...updatedValues, isVisible: e.target.checked })}
              >
                  Is Visible
              </Checkbox>
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

  const deleteEvent = (eventId: string) => {
    axios.delete(Config.API_BASE_URL + "/events/" + eventId, {
      headers: {
        Authorization: jwt
      }
    }).then(() => {
      getEvents();
    });
  };

  function EventCard({ event }: { event: { eventId: string, name: string, startTime: string, endTime: string, points: number, description: string, isVirtual: boolean, imageUrl: string, location: string, eventType: string, isVisible: boolean } }) {
    const { isOpen: isDeleteOpen, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();

    const confirmDelete = () => {
      deleteEvent(event.eventId);
      onCloseDelete();
    };

    return (
      <Card maxW='sm' key={event.eventId}>
        <CardBody>
          {/*<Center>*/}
          {/*<Image src={event.imageUrl} alt={event.name} borderRadius='lg' />*/}
          {/*</Center>*/}
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
          <Flex justifyContent="space-between" width="100%">
            <EditModal event={event} />
            <Button colorScheme='red' onClick={onOpenDelete}>
                Delete
            </Button>
          </Flex>
        </CardFooter>
        <Modal isOpen={isDeleteOpen} onClose={onCloseDelete}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirm Delete</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                Are you sure you want to delete this event?
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={confirmDelete}>
                  Delete
              </Button>
              <Button onClick={onCloseDelete}>
                  Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Card>
    );
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <Box flex="1" minW='90vw' p={4}>
      <Flex justifyContent="center" alignItems="center">
        <Heading size="lg">Events</Heading>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new event</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Input
              value={newEvent.name}
              onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
              placeholder="Event name"
              mb={4}
            />
            <Select
              value={newEvent.isVirtual ? "true" : "false"}
              onChange={(e) => setNewEvent({ ...newEvent, isVirtual: e.target.value === "true" })}
              mb={4}
            >
              <option value="true">Virtual</option>
              <option value="false">In-Person</option>
            </Select>
            <Input
              type="datetime-local"
              value={newEvent.startTime}
              onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
              mb={4}
            />
            <Input
              type="datetime-local"
              value={newEvent.endTime}
              onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
              mb={4}
            />
            <NumberInput
              value={newEvent.points}
              min={0}
              onChange={(_, valueAsNumber) => setNewEvent({ ...newEvent, points: valueAsNumber })}
              mb={4}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Input
              value={newEvent.imageUrl}
              onChange={(e) => setNewEvent({ ...newEvent, imageUrl: e.target.value })}
              placeholder="Image URL"
              mb={4}
            />
            <Textarea
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              placeholder="Event description"
              mb={4}
            />
            <Input
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              placeholder="Location"
              mb={4}
            />
            <Select
              value={newEvent.eventType}
              onChange={(e) => setNewEvent({ ...newEvent, eventType: e.target.value })}
              mb={4}
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </Select>
            <Checkbox
              isChecked={newEvent.isVisible}
              onChange={(e) => setNewEvent({ ...newEvent, isVisible: e.target.checked })}
            >
                Is Visible
            </Checkbox>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={createEvent}>
                Create event
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <br />
      <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
        justifyItems='center' gap={6}>
        {events.map((event: { eventId: string, name: string, startTime: string, endTime: string, points: number, description: string, isVirtual: boolean, imageUrl: string, location: string, eventType: string, isVisible: boolean }) => <EventCard event={event} key={event.eventId} />)}
      </Grid>
      <Button
        onClick={onOpen}
        colorScheme="gray"
        position="fixed"
        bottom="20px"
        left="20px"
        borderRadius="md"
        p={4}
        zIndex="1000"
        bg="gray.300"
        width="30px"
        height="30px"
      >
        <AddIcon />
      </Button>
    </Box>
  );
}

export default Events;