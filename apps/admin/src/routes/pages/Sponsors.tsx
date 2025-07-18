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
import { useOutletContext } from "react-router-dom";
import { MainContext } from "../Main";

const Sponsors = () => {
  const { authorized } = useOutletContext<MainContext>();
  const {
    data: sponsors,
    update: updateSponsors,
    isLoading
  } = usePolling(api, "/auth/corporate", authorized);
  const toast = useToast();
  const mirrorStyle = useMirrorStyles();

  const removeSponsor = (email: string) => {
    toast.promise(
      api
        .delete("/auth/corporate", { data: { email } })
        .then(() => updateSponsors()),
      {
        success: { title: `${email} is no longer a sponsor` },
        error: { title: "Failed to remove sponsor. Try again soon!" },
        loading: { title: "Removing sponsor..." }
      }
    );
  };

  const addSponsor = (
    values: SponsorFormValues,
    helpers: FormikHelpers<SponsorFormValues>
  ) => {
    const request = api
      .post("/auth/corporate", {
        name: values.name,
        email: values.email
      })
      .then(() => {
        updateSponsors();
      })
      .finally(() => {
        helpers.setSubmitting(false);
      });

    toast.promise(request, {
      success: { title: `${values.name} is now a sponsor` },
      error: { title: "Failed to add sponsor. Try again soon!" },
      loading: { title: "Adding sponsor..." }
    });
    return request;
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
              {isLoading
                ? Array.from({ length: 10 }).map((_, index) => (
                    <SponsorCardSkeleton key={index} />
                  ))
                : sponsors?.map((sponsor) => (
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

const SponsorCardSkeleton: React.FC = () => (
  <Flex justifyContent="space-between" alignItems="center" py={2} opacity={0.7}>
    <Box flex={1} mr={7}>
      <Box height="20px" bg="gray.200" borderRadius="md" width="70%" />
    </Box>
    <Box flex={1} mr={2}>
      <Box height="32px" bg="gray.200" borderRadius="md" />
    </Box>
    <Box>
      <Box height="32px" width="32px" bg="gray.200" borderRadius="full" />
    </Box>
  </Flex>
);

export default Sponsors;
