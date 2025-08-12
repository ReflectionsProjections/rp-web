import { CheckIcon, StarIcon, CloseIcon } from "@chakra-ui/icons";
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
  FormErrorMessage,
  Badge,
  VStack,
  HStack,
  Checkbox,
  FormLabel,
  Button
} from "@chakra-ui/react";
import api from "../../util/api";
import React from "react";
import { path, Role, usePolling, RoleObject } from "@rp/shared";
import { Config } from "@/config";
import { useMirrorStyles } from "@/styles/Mirror";
import { Formik, FormikHelpers } from "formik";
import { RoleFormValues } from "./RoleSchema";
import { MainContext } from "@/routes/Main";
import { useOutletContext } from "react-router-dom";

type RolesCardProps = Record<string, never>;

type UserWithRoles = RoleObject & {
  roles: Role[];
};

const RolesCard: React.FC<RolesCardProps> = () => {
  const { authorized } = useOutletContext<MainContext>();
  const toast = useToast();
  const mirrorStyle = useMirrorStyles();

  // Fetch both ADMIN and STAFF users to show unified list
  const {
    data: adminUsers,
    update: updateAdminUsers,
    isLoading: adminLoading
  } = usePolling(api, path("/auth/:role", { role: "ADMIN" }), authorized);

  const {
    data: staffUsers,
    update: updateStaffUsers,
    isLoading: staffLoading
  } = usePolling(api, path("/auth/:role", { role: "STAFF" }), authorized);

  // Combine and deduplicate users
  const allUsers = React.useMemo((): UserWithRoles[] => {
    const userMap = new Map<string, UserWithRoles>();

    // Add admin users
    adminUsers?.forEach((user: RoleObject) => {
      userMap.set(user.email, {
        ...user,
        roles: ["ADMIN"]
      });
    });

    // Add staff users, merging roles if user already exists
    staffUsers?.forEach((user: RoleObject) => {
      if (userMap.has(user.email)) {
        const existingUser = userMap.get(user.email)!;
        userMap.set(user.email, {
          ...existingUser,
          roles: [...existingUser.roles, "STAFF"]
        });
      } else {
        userMap.set(user.email, {
          ...user,
          roles: ["STAFF"]
        });
      }
    });

    return Array.from(userMap.values());
  }, [adminUsers, staffUsers]);

  const isLoading = adminLoading || staffLoading;

  const removeFromRole = (role: Role, email: string) => {
    toast.promise(
      api.delete("/auth", { data: { email, role } }).then(() => {
        void updateAdminUsers();
        void updateStaffUsers();
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
    // TODO: Connect to API
    console.log("Update user team:", email, newTeam);
  };

  const addToRole = (
    values: RoleFormValues,
    helpers: FormikHelpers<RoleFormValues>
  ) => {
    // Add each selected role
    const addPromises = values.roles.map((selectedRole: Role) => {
      const requestData = { email: values.email, role: selectedRole };
      return api.put("/auth", requestData);
    });

    toast.promise(
      Promise.all(addPromises)
        .then(() => {
          void updateAdminUsers();
          void updateStaffUsers();
        })
        .catch((error) => {
          console.error("Failed to update user roles:", error);
          throw error;
        })
        .finally(() => {
          helpers.setSubmitting(false);
        }),
      {
        success: {
          title: `${values.email} User Roles updated`,
          description: `Added roles: ${values.roles.join(", ")}`
        },
        error: { title: "Failed to update user roles. Try again soon!" },
        loading: { title: "Updating user roles..." }
      }
    );
  };

  function toTitleCase(str: string) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  const getRoleIcon = (userRole: Role) => {
    switch (userRole) {
      case "ADMIN":
        return <StarIcon color="red.500" />;
      case "STAFF":
        return <StarIcon color="blue.500" />;
      default:
        return null;
    }
  };

  const getRoleColor = (userRole: Role) => {
    switch (userRole) {
      case "ADMIN":
        return "red";
      case "STAFF":
        return "blue";
      case "CORPORATE":
        return "green";
      case "PUZZLEBANG":
        return "purple";
      default:
        return "gray";
    }
  };

  return (
    <Card sx={mirrorStyle} overflowY="auto" maxHeight="80vh" flex={{ xl: 1 }}>
      <CardHeader>
        <Heading size="md">All Users</Heading>
      </CardHeader>
      <CardBody>
        <Formik<RoleFormValues>
          initialValues={{
            email: "",
            team: "",
            roles: ["STAFF"]
          }}
          onSubmit={addToRole}
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
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <VStack spacing={4} align="stretch">
                <Flex>
                  <FormControl
                    mr={2}
                    isRequired
                    isInvalid={!!errors.email && touched.email}
                  >
                    <FormLabel>Email</FormLabel>
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
                    <FormLabel>Team</FormLabel>
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
                </Flex>

                <FormControl isInvalid={!!errors.roles && touched.roles}>
                  <FormLabel>Roles</FormLabel>
                  <HStack spacing={4}>
                    <Checkbox
                      isChecked={values.roles.includes("ADMIN")}
                      onChange={(e) => {
                        if (e.target.checked) {
                          void setFieldValue("roles", [
                            ...values.roles,
                            "ADMIN"
                          ]);
                        } else {
                          void setFieldValue(
                            "roles",
                            values.roles.filter((r: Role) => r !== "ADMIN")
                          );
                        }
                      }}
                    >
                      <HStack>
                        <StarIcon color="red.500" />
                        <Text>Admin</Text>
                      </HStack>
                    </Checkbox>
                    <Checkbox
                      isChecked={values.roles.includes("STAFF")}
                      onChange={(e) => {
                        if (e.target.checked) {
                          void setFieldValue("roles", [
                            ...values.roles,
                            "STAFF"
                          ]);
                        } else {
                          void setFieldValue(
                            "roles",
                            values.roles.filter((r: Role) => r !== "STAFF")
                          );
                        }
                      }}
                    >
                      <HStack>
                        <StarIcon color="blue.500" />
                        <Text>Staff</Text>
                      </HStack>
                    </Checkbox>
                  </HStack>
                  <FormErrorMessage>{errors.roles}</FormErrorMessage>
                </FormControl>

                <Button
                  leftIcon={<CheckIcon />}
                  colorScheme="blue"
                  type="submit"
                  isLoading={isSubmitting}
                  isDisabled={
                    !values.email || !values.team || values.roles.length === 0
                  }
                >
                  Add User Roles
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
        <Stack divider={<StackDivider />} spacing="4" mt={8}>
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <RoleCardSkeleton key={index} />
              ))
            : allUsers?.map((user) => (
                <Box
                  key={user.userId}
                  p={4}
                  sx={mirrorStyle}
                  borderRadius="md"
                  border="1px solid"
                >
                  <Flex justifyContent="space-between" alignItems="start">
                    <VStack align="start" spacing={2} flex={1}>
                      <Text fontWeight="bold" fontSize="lg">
                        {user.displayName}
                      </Text>
                      <Text fontSize="sm">{user.email}</Text>
                      <HStack spacing={2} wrap="wrap">
                        {user.roles.map((userRole: Role) => (
                          <Badge
                            key={userRole}
                            colorScheme={getRoleColor(userRole)}
                            variant="subtle"
                            display="flex"
                            alignItems="center"
                            gap={1}
                            cursor="pointer"
                            onClick={() => removeFromRole(userRole, user.email)}
                            _hover={{
                              opacity: 0.8,
                              transform: "scale(1.05)"
                            }}
                            transition="all 0.2s"
                            position="relative"
                            pr={6}
                          >
                            {getRoleIcon(userRole)}
                            {userRole}
                            <IconButton
                              size="xl"
                              icon={<CloseIcon />}
                              aria-label={`Remove ${userRole} role`}
                              colorScheme="red"
                              variant="ghost"
                              position="absolute"
                              right={1}
                              top="50%"
                              transform="translateY(-50%)"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFromRole(userRole, user.email);
                              }}
                              _hover={{
                                bg: "red.100"
                              }}
                            />
                          </Badge>
                        ))}
                      </HStack>
                    </VStack>

                    <VStack align="end" spacing={2}>
                      <Select
                        placeholder="Select team"
                        size="sm"
                        width="150px"
                        value=""
                        onChange={(e) => {
                          const selectedTeam = e.target.value;
                          if (selectedTeam !== "") {
                            updateUserTeam(user.email, selectedTeam);
                          }
                        }}
                      >
                        {Config.COMMITTEE_TYPES.map((team) => (
                          <option key={team} value={team}>
                            {toTitleCase(team)}
                          </option>
                        ))}
                      </Select>
                    </VStack>
                  </Flex>
                </Box>
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
