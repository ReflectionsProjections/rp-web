import { useMirrorStyles } from "@/styles/Mirror";
import api from "@/util/api";
import { AddIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Button,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { FormikHelpers } from "formik";
import { EventFormInitialValues, EventFormValues } from "./EventSchema";
import EventForm from "./EventForm";

type AddModalProps = {
  updateEvents: () => void;
};

const AddModal: React.FC<AddModalProps> = ({ updateEvents }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mirrorStyles = useMirrorStyles();
  const toast = useToast();

  const createEvent = async (
    values: EventFormValues,
    helpers: FormikHelpers<EventFormValues>
  ) => {
    try {
      await api.post("/events", { ...values, attendanceCount: 0 });
      updateEvents();
      onClose(); // Close the modal after creating the event
    } catch {
      toast({ title: "Error creating event", status: "error" });
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <EventForm
            initialValues={EventFormInitialValues}
            onSubmit={createEvent}
            onCancel={onClose}
            title="Create a new event"
            submitText="Create Event"
          />
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
