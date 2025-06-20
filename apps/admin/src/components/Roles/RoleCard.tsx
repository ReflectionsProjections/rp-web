import { CloseIcon, CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Stack,
  Card,
  CardHeader,
  Heading,
  CardBody,
  StackDivider,
  Flex,
  IconButton,
  Input,
  useToast,
  Select,
  Text,
  FormControl,
  FormErrorMessage
} from "@chakra-ui/react";
import api from "../../util/api";
import React from "react";
import { path, Role, usePolling } from "@rp/shared";
import { Config } from "@/config";
import { useMirrorStyles } from "@/styles/Mirror";
import { Formik, FormikHelpers } from "formik";
import {
  RoleFormInitialValues,
  RoleFormSchema,
  RoleFormValues
} from "./RoleSchema";
import { MainContext } from "@/routes/Main";
import { useOutletContext } from "react-router-dom";

type RolesCardProps = {
  role: Role;
};

const RolesCard: React.FC<RolesCardProps> = ({ role }) => {
  const { authorized } = useOutletContext<MainContext>();
  const {
    data: roles,
    update: updateRoles,
    isLoading
  } = usePolling(api, path("/auth/:role", { role }), authorized);
  const toast = useToast();
  const mirrorStyle = useMirrorStyles();

  const removeFromRole = (role: Role, email: string) => {
    toast.promise(
      api.delete("/auth", { data: { role, email } }).then(() => {
        updateRoles();
      }),
      {
        success: {
          title: `${email} User Role updated: No longer ${role} role`
        },
        error: { title: "Failed to update user role. Try again soon!" },
        loading: { title: "Updating user role..." }
      }
    );
  };

  const updateUserTeam = (email: string, newTeam: string) => {
    console.log("Update user team:", email, newTeam);
    // TODO: Connect to API
  };

  const addToRole = (
    values: RoleFormValues,
    helpers: FormikHelpers<RoleFormValues>
  ) => {
    toast.promise(
      api
        .put("/auth", { email: values.email, role })
        .then(() => {
          updateRoles();
        })
        .finally(() => {
          helpers.setSubmitting(false);
        }),
      {
        success: {
          title: `${values.email} User Role updated: Now ${role} role`
        },
        error: { title: "Failed to update user role. Try again soon!" },
        loading: { title: "Updating user role..." }
      }
    );
  };

  function toTitleCase(str: string) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  return (
    <Card sx={mirrorStyle} overflowY="auto" maxHeight="80vh" flex={{ xl: 1 }}>
      <CardHeader>
        <Heading size="md">{toTitleCase(role)}</Heading>
      </CardHeader>
      <CardBody>
        <Formik<RoleFormValues>
          initialValues={RoleFormInitialValues}
          validationSchema={RoleFormSchema}
          onSubmit={addToRole}
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
                <FormControl
                  mr={2}
                  isRequired
                  isInvalid={!!errors.team && touched.team}
                >
                  <Select
                    name="team"
                    placeholder="Select team"
                    value={values.team}
                    onChange={handleChange}
                  >
                    {Config.COMMITTEE_TYPES.map((team) => (
                      <option key={team} value={team}>
                        {toTitleCase(team)}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>{errors.team}</FormErrorMessage>
                </FormControl>
                <IconButton
                  size="md"
                  icon={<CheckIcon />}
                  aria-label="Add Role"
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
                <RoleCardSkeleton key={index} />
              ))
            : roles?.map((roleObject) => (
                <Flex
                  key={roleObject.userId}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box flex={1} mr={7}>
                    <Text textAlign={"left"}>{roleObject.displayName}</Text>
                  </Box>
                  <Select
                    flex={1}
                    placeholder="Select team"
                    value={""}
                    onChange={(e) => {
                      const selectedTeam = e.target.value;
                      if (selectedTeam !== "") {
                        updateUserTeam(roleObject.email, selectedTeam);
                      }
                    }}
                    mr={2}
                  >
                    {Config.COMMITTEE_TYPES.map((team) => (
                      <option key={team} value={team}>
                        {toTitleCase(team)}
                      </option>
                    ))}
                  </Select>
                  <IconButton
                    size={"md"}
                    icon={<CloseIcon />}
                    aria-label={"Remove Role"}
                    onClick={() => removeFromRole(role, roleObject.email)}
                  />
                </Flex>
              ))}
        </Stack>
      </CardBody>
    </Card>
  );
};

const RoleCardSkeleton: React.FC = () => (
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

export default RolesCard;
