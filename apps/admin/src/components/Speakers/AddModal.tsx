import { useMirrorStyles } from "@/styles/Mirror";
import { AddIcon } from "@chakra-ui/icons";
import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import { FormikHelpers } from "formik";
import { SpeakerFormInitialValues, SpeakerFormValues } from "./SpeakerSchema";
import SpeakerForm from "./SpeakerForm";
import { api } from "@rp/shared";

type AddModalProps = {
  updateSpeakers: () => void;
};

const AddModal: React.FC<AddModalProps> = ({ updateSpeakers }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mirrorStyles = useMirrorStyles();
  const toast = useToast();

  const createSpeaker = (
    values: SpeakerFormValues,
    helpers: FormikHelpers<SpeakerFormValues>
  ) => {
    const request = api
      .post("/speakers", values)
      .then(() => {
        updateSpeakers();
        onClose();
      })
      .finally(() => {
        helpers.setSubmitting(false);
      });

    toast.promise(request, {
      success: { title: "Speaker created successfully" },
      error: { title: "Error creating speaker" },
      loading: { title: "Creating speaker..." }
    });

    return request;
  };

  return (
    <>
      <SpeakerForm
        initialValues={SpeakerFormInitialValues}
        onSubmit={(values, helpers) => {
          void createSpeaker(values, helpers);
        }}
        onCancel={onClose}
        title="Create a new speaker"
        submitText="Create Speaker"
        isOpen={isOpen}
        onClose={onClose}
      />
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
