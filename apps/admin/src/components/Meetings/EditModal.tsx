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
import { Meeting, path } from "@rp/shared";
import React from "react";
import MeetingForm from "./MeetingForm";
import { MeetingFormValues } from "./MeetingSchema";
import { FormikHelpers } from "formik";

type EditModalProps = {
  meeting: Meeting;
  updateMeetings: () => void;
};

const EditModal: React.FC<EditModalProps> = ({ meeting, updateMeetings }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const { meetingId, ...meetingProps } = meeting;

  const editMeeting = async (
    values: MeetingFormValues,
    helpers: FormikHelpers<MeetingFormValues>
  ) => {
    try {
      await api.put(path("/meetings/:meetingId", { meetingId }), values);
      updateMeetings();
      onClose();
    } catch {
      toast({ title: "Error updating meeting", status: "error" });
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
          <MeetingForm
            initialValues={meetingProps}
            onSubmit={editMeeting}
            onCancel={onClose}
            title="Edit meeting"
            submitText="Save"
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditModal;
