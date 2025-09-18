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
  Textarea,
  Switch,
  FormLabel,
  Image,
  Box,
  Tooltip
} from "@chakra-ui/react";
import { api, path } from "@rp/shared";
import { Formik, FormikHelpers } from "formik";
import { useEffect, useRef, useState } from "react";
import { marked } from "marked";
import {
  rpMainTemplate,
  rpEmptyTemplate,
  rpNoneTemplate
} from "@/components/EmailMaker/EmailTemplate";
import DOMPurify from "dompurify";

marked.use({
  renderer: {
    heading({ tokens, depth }) {
      const text = this.parser.parseInline(tokens);

      if (depth == 2) {
        return `
            <h2 class="section-title">
              ${text}
            </h2>`;
      }

      return `
            <h${depth}>
              ${text}
            </h${depth}>`;
      // default
    }
  }
});

function generateHtmlEmail(mdContent: string, templateName: string) {
  const emailTemplate = rpEmailTemplates.find(
    (template) => template.key === templateName
  );
  const generateTemplate = emailTemplate
    ? emailTemplate.templateFn
    : rpNoneTemplate;
  const markdownHtml = marked(mdContent, { async: false });
  const sanitizedHtml = DOMPurify.sanitize(markdownHtml);
  const compiledHtmlEmail = generateTemplate(sanitizedHtml);
  return compiledHtmlEmail;
}

const NOTIF_TITLE_PREVIEW_LENGTH: number = 50;
const NOTIF_PREVIEW_CUTOFF_LENGTH: number = 110;
const NOTIF_MAX_LENGTH: number = 220;

const rpEmailTemplates = [
  {
    key: "main",
    displayName: "R|P 2025 Main Template",
    templateFn: rpMainTemplate
  },
  {
    key: "empty",
    displayName: "R|P 2025 Empty Template",
    templateFn: rpEmptyTemplate
  },
  { key: "none", displayName: "Unformatted", templateFn: rpNoneTemplate }
];

function HtmlPreviewIframe({ markdownHtml }: { markdownHtml: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframeDoc = iframeRef?.current?.contentDocument;
    if (!iframeDoc) return;

    iframeDoc.body.innerHTML = markdownHtml;
  }, [markdownHtml]);

  return (
    <iframe
      ref={iframeRef}
      style={{
        width: "100%",
        height: "100%",
        overflowY: "visible"
      }}
      title="Email Preview"
    />
  );
}

function EmailMaker() {
  const toast = useToast();
  const mirrorStyle = useMirrorStyles();

  const [emailGroups, setEmailGroups] = useState<
    { mailingList: string; subscriptions: string[] }[]
  >([]);
  const [notifGroups, setNotifGroups] = useState<string[]>([]);
  const [showExtendedNotifPreview, setShowExtendedEmailPreview] =
    useState<boolean>(false);

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

  useEffect(() => {
    api
      .get("/notifications/topics")
      .then((response) => setNotifGroups(response.data?.topics))
      .catch(() => {
        toast({
          title: "Failed to load notification topics!",
          description: "Try reloading, signing in again, or checking the api",
          status: "error",
          duration: 4000,
          isClosable: true
        });
      });
  }, []);

  const sendMassmail = (
    values: EmailFormValues,
    helpers: FormikHelpers<EmailFormValues>
  ) => {
    if (
      !window.confirm(
        `Are you sure you want to send this ${values.isMobileNotification ? "notification" : "email"}?`
      )
    ) {
      helpers.setSubmitting(false);
      return;
    }
    if (values.isMobileNotification) {
      const notifData = {
        title: values.subject,
        body: values.body
      };
      const topic = values.recipient;

      const request = api
        .post(path("/notifications/topics/:topic", { topic }), notifData)
        .then(async () => {
          helpers.resetForm();
          await helpers.setFieldValue("isMobileNotification", true);
        })
        .finally(() => helpers.setSubmitting(false));

      toast.promise(request, {
        success: { title: `Notification sent to topic "${topic}"!` },
        error: { title: "Failed to send notification. Try again soon!" },
        loading: { title: "Requesting notification..." }
      });
      return;
    }
    if (values.isIndividualEmail) {
      const emailData = {
        email: values.recipient,
        subject: values.subject,
        htmlBody: generateHtmlEmail(values.body, values.template)
      };

      const request = api
        .post("/subscription/send-email/single", emailData)
        .then(async () => {
          helpers.resetForm();
          await helpers.setFieldValue("isMobileNotification", false);
        })
        .finally(() => helpers.setSubmitting(false));

      toast.promise(request, {
        success: { title: `Email sent to ${values.recipient}!` },
        error: { title: "Failed to send email. Try again soon!" },
        loading: { title: "Requesting email..." }
      });
      return;
    }
    const emailData = {
      mailingList: values.recipient,
      subject: values.subject,
      htmlBody: generateHtmlEmail(values.body, values.template)
    };

    const request = api
      .post("/subscription/send-email", emailData)
      .then(async () => {
        helpers.resetForm();
        await helpers.setFieldValue("isMobileNotification", false);
      })
      .finally(() => helpers.setSubmitting(false));

    toast.promise(request, {
      success: { title: `Email sent to ${values.recipient}!` },
      error: { title: "Failed to send email. Try again soon!" },
      loading: { title: "Requesting email..." }
    });
    return;
  };
  // note -- the markdown rendering for the preview takes place inside
  // the <Formik /> component to interact with its values

  return (
    <Formik<EmailFormValues>
      initialValues={EmailFormInitialValues}
      validationSchema={EmailFormSchema}
      onSubmit={sendMassmail}
    >
      {({
        values,
        handleChange,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
        isSubmitting,
        errors,
        touched
      }) => {
        const markdownHtml = generateHtmlEmail(values.body, values.template);
        // const { compiledHtmlEmail, compiledHtmlErrors } = generateHtmlEmail(values.body);
        const resetRecipient = () => {
          void setFieldValue("recipient", "").then(
            void setFieldTouched("recipient", false)
          );
        };

        return (
          <>
            <Flex justifyContent="center" alignItems="center">
              <Heading size="lg">
                {values.isMobileNotification
                  ? "Send a Notification"
                  : "Send an Email"}
              </Heading>
            </Flex>
            <br />
            <Flex w="100%" p={4} justifyContent="space-evenly" gap={6}>
              <Card sx={mirrorStyle} overflowY="auto" minH="80vh" flex={1}>
                <CardBody>
                  <form
                    onSubmit={handleSubmit}
                    style={{ height: "calc(100% - 40px)" }}
                  >
                    {/* Email "to: " bar header */}
                    <FormControl
                      isRequired
                      isInvalid={!!errors.recipient && touched.recipient}
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
                        {values.isMobileNotification ? (
                          <Select
                            name="recipient"
                            placeholder="Select recipient topic"
                            value={values.recipient}
                            onChange={handleChange}
                            flex={1}
                          >
                            {notifGroups?.map((topic) => (
                              <option key={topic} value={topic}>
                                {topic}
                              </option>
                            ))}
                          </Select>
                        ) : values.isIndividualEmail ? (
                          <Input
                            name="recipient"
                            placeholder="email@example.com"
                            value={values.recipient}
                            onChange={handleChange}
                            flex={1}
                          />
                        ) : (
                          <Select
                            name="recipient"
                            placeholder="Select recipient group"
                            value={values.recipient}
                            onChange={handleChange}
                            flex={1}
                          >
                            {emailGroups?.map((mailingList) => (
                              <option
                                key={mailingList.mailingList}
                                value={mailingList.mailingList}
                              >
                                {mailingList.mailingList}
                              </option>
                            ))}
                          </Select>
                        )}
                        {!values.isMobileNotification && (
                          <Button
                            type="button"
                            name="isIndividualEmail"
                            onClick={() => {
                              resetRecipient();
                              void setFieldValue(
                                "isIndividualEmail",
                                !values.isIndividualEmail
                              );
                            }}
                          >
                            {values.isIndividualEmail
                              ? "Send to mailing list"
                              : "Send to individual"}
                          </Button>
                        )}
                      </Flex>
                      <FormErrorMessage>{errors.recipient}</FormErrorMessage>
                    </FormControl>
                    {/* Email maker and preview */}
                    <Flex
                      id="container"
                      w="100%"
                      h="100%"
                      pt={8}
                      flexWrap="wrap"
                      justifyContent="space-between"
                      direction={{ base: "column", xl: "row" }}
                      gap={4}
                      flex={1}
                    >
                      {/* Left Side: Text Input */}
                      <Flex
                        direction="column"
                        w={{ base: "100%", xl: "49%" }}
                        h={{ base: "fit-content", xl: "100%" }}
                        gap={4}
                        alignItems="center"
                      >
                        <FormControl
                          display="flex"
                          alignItems="center"
                          mb={-0.5}
                          ml={4}
                        >
                          <FormLabel mb={0} marginInlineEnd={3}>
                            Email
                          </FormLabel>
                          <Switch
                            name="isMobileNotification"
                            isChecked={values.isMobileNotification}
                            onChange={(e) => {
                              resetRecipient();
                              handleChange(e);
                            }}
                          />
                          <FormLabel mb={0} marginInlineStart={3}>
                            Mobile Notification
                          </FormLabel>
                        </FormControl>
                        <FormControl
                          isRequired
                          isInvalid={!!errors.subject && touched.subject}
                          flexShrink={0}
                        >
                          <Input
                            name="subject"
                            placeholder={
                              values.isMobileNotification ? "Title" : "Subject"
                            }
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
                            placeholder={
                              values.isMobileNotification
                                ? "Notification body"
                                : "Message body (markdown)"
                            }
                            value={values.body}
                            onChange={handleChange}
                            flex={1}
                            minH="200px"
                          />
                          <FormErrorMessage>{errors.body}</FormErrorMessage>
                        </FormControl>
                        {!values.isMobileNotification && (
                          <FormControl
                            isInvalid={!!errors.template && touched.template}
                            flexShrink={0}
                          >
                            <Select
                              name="template"
                              value={values.template}
                              onChange={handleChange}
                              flex={1}
                            >
                              {rpEmailTemplates?.map((template) => (
                                <option key={template.key} value={template.key}>
                                  {template.displayName}
                                </option>
                              ))}
                            </Select>
                            <FormErrorMessage>
                              {errors.template}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                        <Button
                          type="submit"
                          colorScheme="blue"
                          isLoading={isSubmitting}
                          w="fit-content"
                          flexShrink={0}
                        >
                          Send{" "}
                          {values.isMobileNotification
                            ? "Notification"
                            : "Email"}
                        </Button>
                      </Flex>

                      {/* Right Side: Preview */}
                      <Flex
                        w={{ base: "100%", xl: "49%" }}
                        h={{ base: "fit-content", xl: "100%" }}
                        direction="column"
                        gap={2}
                        alignItems="start"
                      >
                        <Text as="b" ml={4} fontSize="xl">
                          Preview
                        </Text>
                        <Section
                          w="100%"
                          h="100%"
                          minH="300px"
                          p={2}
                          bg="none" // bg={values.isMobileNotification ? "none" : "gray.200"}
                        >
                          {values.isMobileNotification ? (
                            <Section w="100%" h="100%" sx={mirrorStyle}>
                              <Card
                                w="100%"
                                // maxH="200px"
                                m="auto"
                                title="Notification Preview"
                                textAlign="left"
                                sx={{ ...mirrorStyle, px: 3 }}
                                wordBreak="break-word"
                                minW={0}
                              >
                                <Flex flexDirection="row" alignItems="center">
                                  <Box
                                    minW="45px"
                                    w="45px"
                                    minH="45px"
                                    h="45px"
                                    mr={3}
                                    borderRadius="lg"
                                    bg="gray.100"
                                    p="5px"
                                  >
                                    <Image
                                      src="rp_logo.svg"
                                      w="100%"
                                      h="100%"
                                    />
                                  </Box>
                                  <Flex
                                    flexDirection="column"
                                    overflow="hidden"
                                  >
                                    <Text
                                      as="b"
                                      w="100%"
                                      // maxH="3rem"
                                      overflow="hidden"
                                      textOverflow="ellipsis"
                                      // wordBreak="break-word"
                                      whiteSpace="nowrap"
                                    >
                                      {values.subject.length > 0
                                        ? values.subject.length >
                                          NOTIF_TITLE_PREVIEW_LENGTH
                                          ? values.subject.slice(
                                              0,
                                              NOTIF_TITLE_PREVIEW_LENGTH
                                            ) + "..."
                                          : values.subject
                                        : "Notification title"}
                                    </Text>
                                    <Text>
                                      {values.body.length > 0
                                        ? values.body.length >
                                          NOTIF_PREVIEW_CUTOFF_LENGTH
                                          ? values.body.slice(
                                              0,
                                              NOTIF_PREVIEW_CUTOFF_LENGTH
                                            ) + "..."
                                          : values.body
                                        : "Share some info!"}
                                    </Text>
                                    {values.body.length >
                                    NOTIF_PREVIEW_CUTOFF_LENGTH ? (
                                      <Tooltip label="The user can press and hold to view roughly this much extra, but we can't guarantee the exact amount, so be cautious of using it!">
                                        {showExtendedNotifPreview ? (
                                          <Text
                                            fontStyle="oblique"
                                            opacity="0.6"
                                          >
                                            {values.body.slice(
                                              NOTIF_PREVIEW_CUTOFF_LENGTH,
                                              NOTIF_MAX_LENGTH
                                            )}
                                          </Text>
                                        ) : (
                                          <Text
                                            fontStyle="oblique"
                                            opacity="0.6"
                                            onClick={() =>
                                              setShowExtendedEmailPreview(
                                                (current) => !current
                                              )
                                            }
                                            textDecoration="underline"
                                          >
                                            show extended notification preview
                                          </Text>
                                        )}
                                      </Tooltip>
                                    ) : (
                                      <></>
                                    )}
                                  </Flex>
                                </Flex>
                              </Card>
                            </Section>
                          ) : (
                            <HtmlPreviewIframe markdownHtml={markdownHtml} />
                          )}
                        </Section>
                      </Flex>
                    </Flex>
                  </form>
                </CardBody>
              </Card>
            </Flex>
          </>
        );
      }}
    </Formik>
  );
}

export default EmailMaker;
