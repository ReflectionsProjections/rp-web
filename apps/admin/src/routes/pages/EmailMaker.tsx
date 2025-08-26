import {
  EmailFormValues,
  EmailFormSchema,
  EmailFormInitialValues
} from "@/components/EmailMaker/EmailSchema";
import Section from "@/components/Section";
import { useMirrorStyles } from "@/styles/Mirror";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Text,
  Select,
  Card,
  CardBody,
  useToast,
  Textarea
} from "@chakra-ui/react";
import { api } from "@rp/shared";
import { Formik, FormikHelpers } from "formik";
import { useEffect, useMemo, useState } from "react";
import { marked } from "marked";

function generateHtmlEmail(mdContent: string) {
  const markdownHtml = marked(mdContent, { async: false });
  return markdownHtml;
}

function EmailMaker() {
  const toast = useToast();
  const mirrorStyle = useMirrorStyles();

  const [emailGroups, setEmailGroups] = useState<
    { mailingList: string; subscriptions: string[] }[]
  >([]);

  useEffect(() => {
    api
      .get("/subscription")
      .then((response) => setEmailGroups(response.data))
      .catch(() => {
        toast({
          title: "Failed to load mailing lists!",
          description: "Try reloading, signing in again, or checking the api",
          status: "error",
          duration: 4000,
          isClosable: true
        });
      });
  }, []);

  const sendEmail = (
    values: EmailFormValues,
    helpers: FormikHelpers<EmailFormValues>
  ) => {
    const emailData = {
      mailingList: values.recipients,
      subject: values.subject,
      htmlBody: values.body
    };

    const request = api
      .post("/subscription/send-email", emailData)
      .catch((error) => console.error("Failed to send email:", error))
      .finally(() => helpers.setSubmitting(false));

    toast.promise(request, {
      success: { title: `Email sent to ${values.recipients}!` },
      error: { title: "Failed to send email. Try again soon!" },
      loading: { title: "Requesting email..." }
    });
  };

  // note -- the markdown rendering for the preview takes place inside
  // the <Formik /> component to interact with its values

  return (
    <>
      <Flex justifyContent="center" alignItems="center">
        <Heading size="lg">Send an Email</Heading>
      </Flex>
      <br />
      <Formik<EmailFormValues>
        initialValues={EmailFormInitialValues}
        validationSchema={EmailFormSchema}
        onSubmit={sendEmail}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          isSubmitting,
          errors,
          touched
        }) => {
          const markdownHtml = generateHtmlEmail(values.body);
          // const { compiledHtmlEmail, compiledHtmlErrors } = generateHtmlEmail(values.body);

          return (
            <Flex
              w="100%"
              p={4}
              flexWrap="wrap"
              justifyContent="space-evenly"
              gap={6}
            >
              <Card sx={mirrorStyle} overflowY="auto" height="80vh" flex={1}>
                <CardBody>
                  <form onSubmit={handleSubmit}>
                    {/* Email "to: " bar header */}
                    <FormControl
                      isRequired
                      isInvalid={!!errors.recipients && touched.recipients}
                    >
                      <Flex w="100%" flexWrap="wrap" gap={2}>
                        <Text
                          as="b"
                          flexShrink={1}
                          justifyContent="center"
                          alignContent="center"
                        >
                          Sending to:
                        </Text>
                        <Select
                          name="recipients"
                          placeholder="Select recipient group"
                          value={values.recipients}
                          onChange={handleChange}
                          flex={1}
                        >
                          {emailGroups?.map((mailingList) => (
                            <option value={mailingList.mailingList}>
                              {mailingList.mailingList}
                            </option>
                          ))}
                        </Select>
                      </Flex>
                      <FormErrorMessage>{errors.recipients}</FormErrorMessage>
                    </FormControl>
                    {/* Email maker and preview */}
                    <Flex
                      w="100%"
                      pt={8}
                      flexWrap="wrap"
                      justifyContent="space-evenly"
                      gap={6}
                      direction={{ base: "column", xl: "row" }}
                    >
                      {/* Left Side: Text Input */}

                      <Flex
                        direction="column"
                        w="100%"
                        h="100%"
                        gap={4}
                        alignItems="center"
                        flex={1}
                      >
                        <FormControl
                          isRequired
                          isInvalid={!!errors.subject && touched.subject}
                          flexShrink={0}
                        >
                          <Input
                            name="subject"
                            placeholder="Subject"
                            value={values.subject}
                            onChange={handleChange}
                          />
                          <FormErrorMessage>{errors.subject}</FormErrorMessage>
                        </FormControl>
                        <FormControl
                          isRequired
                          isInvalid={!!errors.body && touched.body}
                          flex={1}
                          display="flex"
                          flexDirection="column"
                        >
                          <Textarea
                            name="body"
                            placeholder="Message body (markdown)"
                            value={values.body}
                            onChange={handleChange}
                            flex={1}
                          />
                          <FormErrorMessage>{errors.body}</FormErrorMessage>
                        </FormControl>
                        <Button
                          type="submit"
                          colorScheme="blue"
                          isLoading={isSubmitting}
                          w="fit-content"
                          flexShrink={0}
                        >
                          Send Email
                        </Button>
                      </Flex>

                      {/* Right Side: Preview */}
                      <Flex
                        flex={1}
                        direction="column"
                        gap={2}
                        alignItems="start"
                      >
                        <Text as="b" ml={4} fontSize="xl">
                          Preview
                        </Text>
                        <Section w="100%" h="100%" p={2}>
                          {/* todo() add theming in preview? */}
                          <iframe
                            srcDoc={markdownHtml}
                            style={{
                              width: "100%",
                              height: "100%",
                              border: "1px solid white"
                            }}
                            title="Email Preview"
                            sandbox=""
                          />
                        </Section>
                      </Flex>
                    </Flex>
                  </form>
                </CardBody>
              </Card>
            </Flex>
          );
        }}
      </Formik>
    </>
  );
}

export default EmailMaker;
