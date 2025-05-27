import api from "@/util/api";
import { EditIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  useToast
} from "@chakra-ui/react";
import { Event, path } from "@rp/shared";
import React from "react";
import EventForm from "./EventForm";
import { EventFormValues } from "./EventSchema";
import { FormikHelpers } from "formik";

type EditModalProps = {
  event: Event;
  updateEvents: () => void;
};

const EditModal: React.FC<EditModalProps> = ({ event, updateEvents }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const editEvent = async (
    values: EventFormValues,
    helpers: FormikHelpers<EventFormValues>
  ) => {
    try {
      await api.put(
        path("/events/:eventId", { eventId: event.eventId }),
        values
      );
      updateEvents();
      onClose();
    } catch {
      toast({ title: "Error updating event", status: "error" });
    } finally {
      helpers.setSubmitting(false);
    }
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
          <EventForm
            initialValues={event}
            onSubmit={editEvent}
            onCancel={onClose}
            title="Edit event"
            submitText="Save"
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditModal;
