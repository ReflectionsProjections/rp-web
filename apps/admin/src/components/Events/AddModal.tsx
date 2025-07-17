import { useMirrorStyles } from "@/styles/Mirror";
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
import { api } from "@rp/shared";

type AddModalProps = {
  updateEvents: () => void;
};

const AddModal: React.FC<AddModalProps> = ({ updateEvents }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mirrorStyles = useMirrorStyles();
  const toast = useToast();

  const createEvent = (
    values: EventFormValues,
    helpers: FormikHelpers<EventFormValues>
  ) => {
    const request = api
      .post("/events", { ...values, attendanceCount: 0 })
      .then(() => {
        updateEvents();
        onClose();
      })
      .finally(() => {
        helpers.setSubmitting(false);
      });

    toast.promise(request, {
      success: { title: "Event created" },
      error: { title: "Error creating event" },
      loading: { title: "Creating event..." }
    });

    return request;
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
        zIndex="9"
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
