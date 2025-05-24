import { Config } from "@/config";
import api from "@/util/api";
import { EditIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  Button,
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
  useToast
} from "@chakra-ui/react";
import { Event, EventType, path } from "@rp/shared";
import moment from "moment";
import React, { useEffect, useState } from "react";

type EditModalProps = {
  event: Event;
  updateEvents: () => void;
};

const EditModal: React.FC<EditModalProps> = ({ event, updateEvents }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updatedValues, setUpdatedValues] = useState(event);
  const toast = useToast();

  useEffect(() => {
    setUpdatedValues(event);
  }, [event, isOpen]);

  const handleSave = () => {
    const updatedValuesUTC = {
      ...updatedValues,
      startTime: moment(updatedValues.startTime).utc().format(),
      endTime: moment(updatedValues.endTime).utc().format()
    };

    const { eventId, ...valuesWithoutEventId } = updatedValuesUTC;
    api
      .put(path("/events/:eventId", { eventId }), {
        ...valuesWithoutEventId
      })
      .then(() => {
        updateEvents();
        onClose();
      })
      .catch(() => {
        toast({ title: "Error updating event", status: "error" });
      });
  };

  return (
    <>
      <Button
        leftIcon={<EditIcon />}
        colorScheme="teal"
        variant="solid"
        onClick={onOpen}
      >
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
              onChange={(e) =>
                setUpdatedValues({ ...updatedValues, name: e.target.value })
              }
            />
            <Select
              defaultValue={event.isVirtual ? "true" : "false"}
              mb={4}
              onChange={(e) =>
                setUpdatedValues({
                  ...updatedValues,
                  isVirtual: e.target.value === "true"
                })
              }
            >
              <option value="true">Virtual</option>
              <option value="false">In-Person</option>
            </Select>
            <Input
              type="datetime-local"
              defaultValue={moment
                .tz(event.startTime, "America/Chicago")
                .format("yyyy-MM-DDTHH:mm")}
              mb={4}
              onChange={(e) =>
                setUpdatedValues({
                  ...updatedValues,
                  startTime: moment(e.target.value).format()
                })
              }
            />
            <Input
              type="datetime-local"
              defaultValue={moment
                .tz(event.endTime, "America/Chicago")
                .format("yyyy-MM-DDTHH:mm")}
              mb={4}
              onChange={(e) =>
                setUpdatedValues({
                  ...updatedValues,
                  endTime: moment(e.target.value).format()
                })
              }
            />
            <NumberInput
              defaultValue={event.points}
              min={0}
              onChange={(_, valueAsNumber) =>
                setUpdatedValues({
                  ...updatedValues,
                  points: valueAsNumber
                })
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Input
              defaultValue={event.imageUrl}
              mb={4}
              onChange={(e) =>
                setUpdatedValues({
                  ...updatedValues,
                  imageUrl: e.target.value
                })
              }
            />
            <Textarea
              defaultValue={event.description}
              mb={4}
              onChange={(e) =>
                setUpdatedValues({
                  ...updatedValues,
                  description: e.target.value
                })
              }
            />
            <Input
              defaultValue={event.location}
              mb={4}
              onChange={(e) =>
                setUpdatedValues({
                  ...updatedValues,
                  location: e.target.value
                })
              }
              placeholder="Location"
            />
            <Select
              defaultValue={event.eventType}
              mb={4}
              onChange={(e) =>
                setUpdatedValues({
                  ...updatedValues,
                  eventType: e.target.value as EventType
                })
              }
            >
              {Config.EVENT_TYPES.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </Select>
            <Checkbox
              isChecked={event.isVisible}
              onChange={(e) =>
                setUpdatedValues({
                  ...updatedValues,
                  isVisible: e.target.checked
                })
              }
            >
              Is Visible
            </Checkbox>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditModal;
