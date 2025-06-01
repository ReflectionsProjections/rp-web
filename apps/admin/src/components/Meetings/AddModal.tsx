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
import { MeetingFormInitialValues, MeetingFormValues } from "./MeetingSchema";
import MeetingForm from "./MeetingForm";

type AddModalProps = {
  updateMeetings: () => void;
};

const AddModal: React.FC<AddModalProps> = ({ updateMeetings }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mirrorStyles = useMirrorStyles();
  const toast = useToast();

  const createMeeting = async (
    values: MeetingFormValues,
    helpers: FormikHelpers<MeetingFormValues>
  ) => {
    try {
      await api.post("/meetings", values);
      updateMeetings();
      onClose(); // Close the modal after creating the meeting
    } catch {
      toast({ title: "Error creating meeting", status: "error" });
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <MeetingForm
            initialValues={MeetingFormInitialValues}
            onSubmit={createMeeting}
            onCancel={onClose}
            title="Create a new meeting"
            submitText="Create Meeting"
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
