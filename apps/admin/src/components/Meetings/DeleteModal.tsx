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
import { Meeting, path } from "@rp/shared";
import { useOutletContext } from "react-router-dom";

type DeleteModalProps = {
  meeting: Meeting;
  updateMeetings: () => void;
};

const DeleteModal: React.FC<DeleteModalProps> = ({
  meeting,
  updateMeetings
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const context = useOutletContext<MainContext>();
  const toast = useToast();

  const deleteMeeting = () => {
    toast.promise(
      api
        .delete(path("/meetings/:meetingId", { meetingId: meeting.meetingId }))
        .then(() => {
          updateMeetings();
          onClose();
        }),
      {
        success: { title: "Meeting deleted" },
        error: { title: "Error deleting meeting" },
        loading: { title: "Deleting meeting..." }
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
          <ModalBody>Are you sure you want to delete this meeting?</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={deleteMeeting}>
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
