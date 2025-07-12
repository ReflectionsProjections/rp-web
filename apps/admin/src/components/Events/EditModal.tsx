import { EditIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  useToast
} from "@chakra-ui/react";
import { api, Event, path } from "@rp/shared";
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

  const { eventId, ...eventProps } = event;

  const editEvent = (
    values: EventFormValues,
    helpers: FormikHelpers<EventFormValues>
  ) => {
    const request = api
      .put(path("/events/:eventId", { eventId }), values)
      .then(() => {
        updateEvents();
        onClose();
      })
      .finally(() => {
        helpers.setSubmitting(false);
      });

    toast.promise(request, {
      success: { title: "Event successfully updated" },
      error: { title: "Error updating event" },
      loading: { title: "Updating event..." }
    });

    return request;
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
            initialValues={eventProps}
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
