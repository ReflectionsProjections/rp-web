import { useMirrorStyles } from "@/styles/Mirror";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormErrorMessage,
  VStack,
  HStack,
  useColorModeValue
} from "@chakra-ui/react";
import { Formik, FormikHelpers } from "formik";
import {
  SpeakerFormInitialValues,
  SpeakerFormSchema,
  SpeakerFormValues
} from "./SpeakerSchema";

interface SpeakerFormProps {
  initialValues?: SpeakerFormValues;
  onSubmit: (
    values: SpeakerFormValues,
    helpers: FormikHelpers<SpeakerFormValues>
  ) => void;
  onCancel: () => void;
  title: string;
  submitText: string;
  isOpen: boolean;
  onClose: () => void;
}

const SpeakerForm: React.FC<SpeakerFormProps> = ({
  initialValues = SpeakerFormInitialValues,
  onSubmit,
  onCancel,
  title,
  submitText,
  isOpen,
  onClose
}) => {
  const mirrorStyles = useMirrorStyles();
  const modalBg = useColorModeValue("white", "gray.800");

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent sx={mirrorStyles} bg={modalBg} color="white">
        <Formik<SpeakerFormValues>
          initialValues={initialValues}
          validationSchema={SpeakerFormSchema}
          onSubmit={onSubmit}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            isSubmitting,
            errors,
            touched,
            setFieldValue
          }) => (
            <form onSubmit={handleSubmit}>
              <ModalHeader>{title}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing={4}>
                  <FormControl
                    isRequired
                    isInvalid={!!errors.name && touched.name}
                  >
                    <FormLabel>Name</FormLabel>
                    <Input
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      placeholder="Enter speaker name"
                    />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    isRequired
                    isInvalid={!!errors.title && touched.title}
                  >
                    <FormLabel>Title</FormLabel>
                    <Input
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      placeholder="Enter speaker title"
                    />
                    <FormErrorMessage>{errors.title}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    isRequired
                    isInvalid={!!errors.bio && touched.bio}
                  >
                    <FormLabel>Bio</FormLabel>
                    <Textarea
                      name="bio"
                      value={values.bio}
                      onChange={handleChange}
                      placeholder="Enter speaker bio"
                      rows={4}
                    />
                    <FormErrorMessage>{errors.bio}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    isRequired
                    isInvalid={!!errors.imgUrl && touched.imgUrl}
                  >
                    <FormLabel>Image URL</FormLabel>
                    <HStack>
                      <Input
                        name="imgUrl"
                        value={values.imgUrl}
                        onChange={handleChange}
                        placeholder="Enter image URL"
                        flex={1}
                      />
                      <Button
                        size="md"
                        onClick={() => {
                          void setFieldValue(
                            "imgUrl",
                            "http://reflectionsprojections.org"
                          );
                        }}
                      >
                        Default
                      </Button>
                    </HStack>
                    <FormErrorMessage>{errors.imgUrl}</FormErrorMessage>
                  </FormControl>
                </VStack>
              </ModalBody>

              <ModalFooter>
                <Button variant="ghost" color="white" mr={3} onClick={onCancel}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  loadingText={submitText}
                >
                  {submitText}
                </Button>
              </ModalFooter>
            </form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default SpeakerForm;
