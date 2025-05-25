import { Config } from "@/config";
import { useMirrorStyles } from "@/styles/Mirror";
import api from "@/util/api";
import { AddIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  Checkbox,
  ModalFooter,
  Button,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { EventType, RequestType } from "@rp/shared";
import { useState } from "react";

type AddModalProps = {
  updateEvents: () => void;
};

const AddModal: React.FC<AddModalProps> = ({ updateEvents }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mirrorStyles = useMirrorStyles();
  const [newEvent, setNewEvent] = useState<RequestType<"/events", "POST">>({
    name: "",
    isVirtual: true,
    startTime: "",
    endTime: "",
    points: 0,
    imageUrl: "",
    description: "",
    location: "",
    eventType: "SPEAKER",
    isVisible: true,
    attendanceCount: 0
  });
  const toast = useToast();

  const createEvent = () => {
    api
      .post("/events", newEvent)
      .then(() => {
        updateEvents();
        setNewEvent({
          name: "",
          isVirtual: true,
          startTime: "",
          endTime: "",
          points: 0,
          imageUrl: "",
          description: "",
          location: "",
          eventType: "SPEAKER",
          isVisible: true,
          attendanceCount: 0
        });
        onClose(); // Close the modal after creating the event
      })
      .catch(() => {
        toast({ title: "Error creating event", status: "error" });
      });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new event</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Input
              value={newEvent.name}
              onChange={(e) =>
                setNewEvent({ ...newEvent, name: e.target.value })
              }
              placeholder="Event name"
              mb={4}
            />
            <Select
              value={newEvent.isVirtual ? "true" : "false"}
              onChange={(e) =>
                setNewEvent({
                  ...newEvent,
                  isVirtual: e.target.value === "true"
                })
              }
              mb={4}
            >
              <option value="true">Virtual</option>
              <option value="false">In-Person</option>
            </Select>
            <Input
              type="datetime-local"
              value={newEvent.startTime}
              onChange={(e) =>
                setNewEvent({ ...newEvent, startTime: e.target.value })
              }
              mb={4}
            />
            <Input
              type="datetime-local"
              value={newEvent.endTime}
              onChange={(e) =>
                setNewEvent({ ...newEvent, endTime: e.target.value })
              }
              mb={4}
            />
            <NumberInput
              value={newEvent.points}
              min={0}
              onChange={(_, valueAsNumber) =>
                setNewEvent({ ...newEvent, points: valueAsNumber })
              }
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
              onChange={(e) =>
                setNewEvent({ ...newEvent, imageUrl: e.target.value })
              }
              placeholder="Image URL"
              mb={4}
            />
            <Textarea
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
              placeholder="Event description"
              mb={4}
            />
            <Input
              value={newEvent.location}
              onChange={(e) =>
                setNewEvent({ ...newEvent, location: e.target.value })
              }
              placeholder="Location"
              mb={4}
            />
            <Select
              value={newEvent.eventType}
              onChange={(e) =>
                setNewEvent({
                  ...newEvent,
                  eventType: e.target.value as EventType
                })
              }
              mb={4}
            >
              {Config.EVENT_TYPES.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </Select>
            <Checkbox
              isChecked={newEvent.isVisible}
              onChange={(e) =>
                setNewEvent({ ...newEvent, isVisible: e.target.checked })
              }
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
      <Button
        onClick={onOpen}
        sx={mirrorStyles}
        position="fixed"
        bottom="20px"
        right="20px"
        zIndex="1000"
        bg="gray.300"
        w="65px"
        h="65px"
      >
        <AddIcon />
      </Button>
    </>
  );
};

export default AddModal;
