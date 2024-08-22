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
} from '@chakra-ui/react';
import {EditIcon} from "@chakra-ui/icons";
import moment from 'moment-timezone';
import axios from "axios";
import {Config} from "../../config.ts";
import React, {useEffect} from "react";

const readable = "MMMM Do YYYY, h:mm a"

const jwt = localStorage.getItem("jwt");

function convertToCST(date: string) {
  const m = moment.utc(date);
  m.tz('America/Chicago');
  return m;
}

function Events() {
  const [events, setEvents] = React.useState([]);
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const [newEvent, setNewEvent] = React.useState({
  //   name: '',
  //   isVirtual: true,
  //   startTime: '',
  //   endTime: '',
  //   points: 0,
  //   imageUrl: '',
  //   description: ''
  // });

  // const createEvent = () => {
  //   axios.post(Config.API_BASE_URL + "/events", newEvent, {
  //     headers: {
  //       Authorization: jwt
  //     }
  //   }).then(() => {
  //     getEvents();
  //     setNewEvent({
  //       name: '',
  //       isVirtual: true,
  //       startTime: '',
  //       endTime: '',
  //       points: 0,
  //       imageUrl: '',
  //       description: ''
  //     });
  //     onClose(); // Close the modal after creating the event
  //   });
  // };

  function getEvents() {
    axios.get(Config.API_BASE_URL + "/events", {
      headers: {
        Authorization: jwt
      }
    }).then(function (response) {
      setEvents(response.data);
    });
  }

  function EditModal({event}: {event: { eventId: string,
      name: string,
      startTime: string,
      endTime: string,
      points: number,
      description: string,
      isVirtual: boolean,
      imageUrl: string,
      location: string | object,
      eventType: string}}) {
    const {isOpen, onOpen, onClose} = useDisclosure()
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
        ...updatedValuesUTC
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
        <Button leftIcon={<EditIcon/>} colorScheme="teal" variant="solid" onClick={onOpen}>
            Edit
        </Button>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay/>
          <ModalContent>
            <ModalHeader>Edit event</ModalHeader>
            <ModalCloseButton/>
            <ModalBody pb={6}>
              <Input
                defaultValue={event.name}
                mb={4}
                onChange={(e) => setUpdatedValues({...updatedValues, name: e.target.value})}
              />
              <Select
                defaultValue={event.isVirtual ? "true" : "false"}
                mb={4}
                onChange={(e) => setUpdatedValues({...updatedValues, isVirtual: e.target.value === "true"})}
              >
                <option value="true">Virtual</option>
                <option value="false">In-Person</option>
              </Select>
              <Input
                type="datetime-local"
                defaultValue={convertToCST(event.startTime).format('yyyy-MM-DDTHH:mm')}
                mb={4}
                onChange={(e) => setUpdatedValues({...updatedValues, startTime: moment(e.target.value).format()})}
              />
              <Input
                type="datetime-local"
                defaultValue={convertToCST(event.endTime).format('yyyy-MM-DDTHH:mm')}
                mb={4}
                onChange={(e) => setUpdatedValues({...updatedValues, endTime: moment(e.target.value).format()})}
              />
              <NumberInput defaultValue={event.points} min={0}
                onChange={(_, valueAsNumber) => setUpdatedValues({
                  ...updatedValues,
                  points: valueAsNumber
                })}>
                <NumberInputField/>
                <NumberInputStepper>
                  <NumberIncrementStepper/>
                  <NumberDecrementStepper/>
                </NumberInputStepper>
              </NumberInput>
              <Input
                defaultValue={event.imageUrl}
                mb={4}
                onChange={(e) => setUpdatedValues({...updatedValues, imageUrl: e.target.value})}
              />
              <Textarea
                defaultValue={event.description}
                mb={4}
                onChange={(e) => setUpdatedValues({...updatedValues, description: e.target.value})}
              />
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
    )
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

  function EventCard({event}: {event: { eventId: string,
      name: string,
      startTime: string,
      endTime: string,
      points: number,
      description: string,
      isVirtual: boolean,
      imageUrl: string,
      location: string | object,
      eventType: string}}) {
    const { isOpen: isDeleteOpen, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();

    const confirmDelete = () => {
      deleteEvent(event.eventId);
      onCloseDelete();
    };

    return (
      <Card maxW='sm' key={event.eventId}>
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
          <Flex justifyContent="space-between" width="100%">
            <EditModal event={event}/>
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
    )
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <Box flex="1" minW='90vw' p={4}>
      <Heading size="lg">Events</Heading>
      {/*<Button onClick={onOpen}>Create event</Button> /!* Button to open the modal *!/*/}
      {/*<Modal isOpen={isOpen} onClose={onClose}>*/}
      {/*  <ModalOverlay />*/}
      {/*  <ModalContent>*/}
      {/*    <ModalHeader>Create a new event</ModalHeader>*/}
      {/*    <ModalCloseButton />*/}
      {/*    <ModalBody>*/}
      {/*      <Input*/}
      {/*        value={newEvent.name}*/}
      {/*        onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}*/}
      {/*        placeholder="Event name"*/}
      {/*      />*/}
      {/*    </ModalBody>*/}
      {/*    <ModalFooter>*/}
      {/*      <Button type="submit" onClick={createEvent}>Create event</Button>*/}
      {/*      <Button colorScheme="blue" mr={3} onClick={onClose}>*/}
      {/*        Close*/}
      {/*      </Button>*/}
      {/*    </ModalFooter>*/}
      {/*  </ModalContent>*/}
      {/*</Modal>*/}
      <br/>
      <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)"}}
        justifyItems='center' gap={6}>
        {events.map(({event}: {event: { eventId: string,
            name: string,
            startTime: string,
            endTime: string,
            points: number,
            description: string,
            isVirtual: boolean,
            imageUrl: string,
            location: string | object,
            eventType: string}}) => <EventCard event={event} key={event.eventId}/>)}
      </Grid>
    </Box>
  );
}

export default Events;