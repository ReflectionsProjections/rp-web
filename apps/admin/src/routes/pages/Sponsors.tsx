import { CloseIcon, CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Stack,
  Card,
  CardBody,
  StackDivider,
  Flex,
  IconButton,
  Input,
  useToast,
  FormControl,
  FormErrorMessage,
  Heading
} from "@chakra-ui/react";
import api from "../../util/api";
import { usePolling } from "@rp/shared";
import { useMirrorStyles } from "@/styles/Mirror";
import { Formik, FormikHelpers } from "formik";
import {
  SponsorFormInitialValues,
  SponsorFormSchema,
  SponsorFormValues
} from "@/components/Sponsors/SponsorSchema";

const Sponsors = () => {
  const { data: sponsors, update: updateSponsors } = usePolling(
    api,
    "/auth/corporate"
  );
  const toast = useToast();
  const mirrorStyle = useMirrorStyles();

  const removeSponsor = (email: string) => {
    api
      .delete("/auth/corporate", { data: { email } })
      .then(() => {
        toast({
          title: `${email} is no longer a sponsor`,
          status: "success"
        });
        updateSponsors();
      })
      .catch(() => {
        toast({
          title: "Failed to remove sponsor. Try again soon!",
          status: "error"
        });
      });
  };

  const addSponsor = async (
    values: SponsorFormValues,
    helpers: FormikHelpers<SponsorFormValues>
  ) => {
    try {
      await api.post("/auth/corporate", {
        name: values.name,
        email: values.email
      });
      toast({
        title: `${values.name} is now a sponsor`,
        status: "success"
      });
      updateSponsors();
    } catch {
      toast({
        title: "Failed to add sponsor. Try again soon!",
        status: "success"
      });
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return (
    <>
      <Flex justifyContent="center" alignItems="center">
        <Heading size="lg">Sponsors</Heading>
      </Flex>
      <br />
      <Flex
        w="100%"
        p={4}
        flexWrap="wrap"
        justifyContent="space-evenly"
        gap={6}
      >
        <Card
          sx={mirrorStyle}
          overflowY="auto"
          maxHeight="80vh"
          flex={{ xl: 1 }}
        >
          <CardBody>
            <Formik<SponsorFormValues>
              initialValues={SponsorFormInitialValues}
              validationSchema={SponsorFormSchema}
              onSubmit={addSponsor}
            >
              {({
                values,
                handleChange,
                handleSubmit,
                isSubmitting,
                errors,
                touched
              }) => (
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                  <Flex mb={4}>
                    <FormControl
                      mr={2}
                      isRequired
                      isInvalid={!!errors.name && touched.name}
                    >
                      <Input
                        name="name"
                        placeholder="Enter name"
                        value={values.name}
                        onChange={handleChange}
                      />
                      <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      mr={2}
                      isRequired
                      isInvalid={!!errors.email && touched.email}
                    >
                      <Input
                        name="email"
                        placeholder="Enter email"
                        value={values.email}
                        onChange={handleChange}
                      />
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                    <IconButton
                      size="md"
                      icon={<CheckIcon />}
                      aria-label="Add Sponsor"
                      type="submit"
                      isLoading={isSubmitting}
                    />
                  </Flex>
                </form>
              )}
            </Formik>
            <Stack divider={<StackDivider />} spacing="4" mt={8}>
              {sponsors?.map((sponsor) => (
                <Flex
                  key={sponsor.email}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box flex="1" textAlign="left">
                    {sponsor.name}
                  </Box>
                  <Box flex="1" textAlign="left">
                    {sponsor.email}
                  </Box>
                  <IconButton
                    size={"md"}
                    icon={<CloseIcon />}
                    aria-label={"Open Menu"}
                    onClick={() => removeSponsor(sponsor.email)}
                  />
                </Flex>
              ))}
            </Stack>
          </CardBody>
        </Card>
      </Flex>
    </>
  );
};

export default Sponsors;
