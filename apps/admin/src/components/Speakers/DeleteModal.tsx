import { useMirrorStyles } from "@/styles/Mirror";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  IconButton,
  useDisclosure,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { Speaker, api, path } from "@rp/shared";

type DeleteModalProps = {
  speaker: Speaker;
  updateSpeakers: () => void;
};

const DeleteModal: React.FC<DeleteModalProps> = ({
  speaker,
  updateSpeakers
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mirrorStyles = useMirrorStyles();
  const toast = useToast();
  const modalBg = useColorModeValue("white", "gray.800");

  const deleteSpeaker = () => {
    const request = api
      .delete(path("/speakers/:speakerId", { speakerId: speaker.speakerId }))
      .then(() => {
        updateSpeakers();
        onClose();
      });

    toast.promise(request, {
      success: { title: "Speaker deleted successfully" },
      error: { title: "Error deleting speaker" },
      loading: { title: "Deleting speaker..." }
    });

    return request;
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent sx={mirrorStyles} bg={modalBg} color="white">
          <ModalHeader>Delete Speaker</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you want to delete <strong>{speaker.name}</strong>?
              This action cannot be undone.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" color="white" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={() => void deleteSpeaker()}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <IconButton
        aria-label="Delete speaker"
        icon={<DeleteIcon />}
        size="md"
        onClick={onOpen}
        sx={mirrorStyles}
      />
    </>
  );
};

export default DeleteModal;
