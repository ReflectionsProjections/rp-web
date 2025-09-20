import { useMirrorStyles } from "@/styles/Mirror";
import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Switch,
  Textarea,
  useDisclosure,
  UseDisclosureReturn,
  useToast
} from "@chakra-ui/react";
import { api, DashboardMessageRequest, path } from "@rp/shared";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

type MessageForm = {
  isEmbed: boolean;
  embedFullscreen: boolean;
  embedIframe: boolean;
  message: string;
};

const validationSchema = Yup.object().shape({
  isEmbed: Yup.boolean(),
  embedFullscreen: Yup.boolean(),
  embedIframe: Yup.boolean(),
  message: Yup.string().when("isEmbed", {
    is: true,
    then: (s) => s.url("Must be a valid URL").required("URL is required"),
    otherwise: (s) => s.required("Message is required")
  })
});

const initialValues: MessageForm = {
  isEmbed: false,
  embedFullscreen: false,
  embedIframe: false,
  message: ""
};

export default function MessageModal({
  target,
  disclosure: disclosureOverride
}: {
  target: number | null;
  disclosure?: UseDisclosureReturn;
}) {
  const disclosure = useDisclosure();
  const { isOpen, onOpen, onClose } = disclosureOverride
    ? disclosureOverride
    : disclosure;
  const mirrorStyle = useMirrorStyles();
  const toast = useToast();

  function onSubmit({
    isEmbed,
    message,
    embedFullscreen,
    embedIframe
  }: MessageForm) {
    const data: DashboardMessageRequest = !isEmbed
      ? { message }
      : { url: message, fullscreen: embedFullscreen, iframe: embedIframe };
    onClose();
    api
      .post(
        target !== null
          ? path("/dashboard/message/:id", { id: target })
          : "/dashboard/message",
        data
      )
      .then(() => {
        toast({
          title: `Sent message to ${target !== null ? `display #${target}` : "all displays"}`,
          status: "success"
        });
      })
      .catch((err) => {
        console.error(err);
        toast({
          title: `Failed to send message to ${target !== null ? `display #${target}` : "all displays"}`,
          status: "error"
        });
      });
  }

  return (
    <>
      <Button variant="outline" colorScheme="orange" onClick={onOpen}>
        {target !== undefined ? "Message" : "Message All"}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        messageModalDisclosure
        <ModalOverlay />
        <ModalContent sx={mirrorStyle}>
          <ModalHeader>
            Send a message to{" "}
            {target !== undefined ? `display #${target}` : "all displays"}
          </ModalHeader>
          <ModalBody>
            <Formik<MessageForm>
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ values, errors, touched, isValid }) => (
                <Form>
                  <FormControl display="flex" alignItems="center" mb={4}>
                    <FormLabel htmlFor="isEmbed" mb="0">
                      Text
                    </FormLabel>
                    <Field as={Switch} id="isEmbed" name="isEmbed" />
                    <FormLabel htmlFor="isEmbed" ml={2} mb="0">
                      Embed
                    </FormLabel>
                  </FormControl>

                  {values.isEmbed ? (
                    <>
                      <FormControl
                        mb={4}
                        isInvalid={!!touched.message && !!errors.message}
                      >
                        <FormLabel>Embed URL</FormLabel>
                        <Field
                          as={Input}
                          type="url"
                          name="message"
                          placeholder="https://example.com"
                        />
                        <ErrorMessage
                          name="message"
                          component={FormErrorMessage}
                        />
                      </FormControl>

                      <FormControl mb={4}>
                        <Field as={Checkbox} name="embedFullscreen">
                          Fullscreen?
                        </Field>
                      </FormControl>

                      <FormControl mb={4}>
                        <Field as={Checkbox} name="embedIframe">
                          Iframe?
                        </Field>
                      </FormControl>
                    </>
                  ) : (
                    <FormControl
                      mb={4}
                      isInvalid={!!touched.message && !!errors.message}
                    >
                      <FormLabel>Text Message</FormLabel>
                      <Field
                        as={Textarea}
                        name="message"
                        placeholder="Enter your message..."
                      />
                      <ErrorMessage
                        name="message"
                        component={FormErrorMessage}
                      />
                    </FormControl>
                  )}

                  <Button
                    colorScheme="orange"
                    mt={4}
                    type="submit"
                    disabled={!isValid}
                  >
                    Send
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
