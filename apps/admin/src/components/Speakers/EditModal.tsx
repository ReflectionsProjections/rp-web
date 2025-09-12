import { useMirrorStyles } from "@/styles/Mirror";
import { EditIcon } from "@chakra-ui/icons";
import { IconButton, useDisclosure, useToast } from "@chakra-ui/react";
import { FormikHelpers } from "formik";
import { Speaker, api, path } from "@rp/shared";
import { SpeakerFormValues } from "./SpeakerSchema";
import SpeakerForm from "./SpeakerForm";

type EditModalProps = {
  speaker: Speaker;
  updateSpeakers: () => void;
};

const EditModal: React.FC<EditModalProps> = ({ speaker, updateSpeakers }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mirrorStyles = useMirrorStyles();
  const toast = useToast();

  const updateSpeaker = (
    values: SpeakerFormValues,
    helpers: FormikHelpers<SpeakerFormValues>
  ) => {
    const request = api
      .put(
        path("/speakers/:speakerId", { speakerId: speaker.speakerId }),
        values
      )
      .then(() => {
        updateSpeakers();
        onClose();
      })
      .finally(() => {
        helpers.setSubmitting(false);
      });

    toast.promise(request, {
      success: { title: "Speaker updated successfully" },
      error: { title: "Error updating speaker" },
      loading: { title: "Updating speaker..." }
    });

    return request;
  };

  const initialValues: SpeakerFormValues = {
    name: speaker.name,
    title: speaker.title,
    bio: speaker.bio,
    eventTitle: speaker.eventTitle || "N/A",
    eventDescription: speaker.eventDescription || "N/A",
    imgUrl: speaker.imgUrl
  };

  return (
    <>
      <SpeakerForm
        initialValues={initialValues}
        onSubmit={(values, helpers) => {
          void updateSpeaker(values, helpers);
        }}
        onCancel={onClose}
        title="Edit speaker"
        submitText="Update Speaker"
        isOpen={isOpen}
        onClose={onClose}
      />
      <IconButton
        aria-label="Edit speaker"
        icon={<EditIcon />}
        size="md"
        onClick={onOpen}
        sx={mirrorStyles}
      />
    </>
  );
};

export default EditModal;
