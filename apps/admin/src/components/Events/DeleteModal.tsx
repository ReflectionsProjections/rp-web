import { MainContext } from "@/routes/Main";
import api from "@/util/api";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { Event, path } from "@rp/shared";
import { useOutletContext } from "react-router-dom";

type DeleteModalProps = {
  event: Event;
  updateEvents: () => void;
};

const DeleteModal: React.FC<DeleteModalProps> = ({ event, updateEvents }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const context = useOutletContext<MainContext>();
  const toast = useToast();

  const deleteEvent = () => {
    toast.promise(
      api
        .delete(path("/events/:eventId", { eventId: event.eventId }))
        .then(() => {
          updateEvents();
          onClose();
        }),
      {
        success: { title: "Event deleted" },
        error: { title: "Error deleting event" },
        loading: { title: "Deleting event..." }
      }
    );
  };

  return (
    <>
      <Button
        colorScheme="red"
        onClick={onOpen}
        isDisabled={!context.roles.includes("ADMIN")}
      >
        Delete
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this event?</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={deleteEvent}>
              Delete
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModal;
