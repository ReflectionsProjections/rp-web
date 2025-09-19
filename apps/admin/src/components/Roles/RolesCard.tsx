import { CheckIcon, StarIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
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
  FormLabel,
  Button
} from "@chakra-ui/react";
import React from "react";
import {
  path,
  Role,
  usePolling,
  RoleObject,
  api,
  CommitteeType
} from "@rp/shared";
import { Config } from "@/config";
import { useMirrorStyles } from "@/styles/Mirror";
import { Formik, FormikHelpers } from "formik";
import { RoleFormValues } from "./RoleSchema";
import { MainContext } from "@/routes/Main";
import { useOutletContext } from "react-router-dom";
import { Staff } from "@rp/shared";

type RolesCardProps = Record<string, never>;

type UserWithRoles = RoleObject & {
  roles: Role[];
  team?: string;
};

const RolesCard: React.FC<RolesCardProps> = () => {
  const { authorized } = useOutletContext<MainContext>();
  const toast = useToast();
  const mirrorStyle = useMirrorStyles();

  // Fetch team members (users with STAFF or ADMIN roles)
  const {
    data: teamMembers,
    update: updateTeamMembers,
    isLoading: teamLoading
  } = usePolling("/auth/team" as const, authorized, 30000);

  // Fetch all staff members
  const {
    data: staffMembers,
    update: updateStaffMembers,
    isLoading: staffMembersLoading
  } = usePolling("/staff" as const, authorized, 30000);

  // Combine team members and identify pending users
  const allUsers = React.useMemo((): UserWithRoles[] => {
    const users: UserWithRoles[] = [];

    // Add team members (users with STAFF or ADMIN roles)
    if (teamMembers) {
      users.push(
        ...teamMembers.map(
          (user: RoleObject) =>
            ({
              ...user,
              team: undefined // Team info will come from staff lookup
            }) as UserWithRoles
        )
      );
    }

    // Create a set of emails that have roles (from team members)
    const emailsWithRoles = new Set<string>();
    teamMembers?.forEach((user: RoleObject) => {
      emailsWithRoles.add(user.email);
    });

    // Add pending users (in staff table but not in team members)
    if (staffMembers) {
      staffMembers.forEach((staff: Staff) => {
        if (!emailsWithRoles.has(staff.email)) {
          // This staff member doesn't have roles yet - they're pending
          users.push({
            userId: "", // No userId since they're not in auth system yet
            email: staff.email,
            displayName: staff.name,
            roles: ["PENDING"],
            team: staff.team
          } as UserWithRoles);
        }
      });
    }

    // Create a map of email to staff info for team lookup
    const staffByEmail = new Map<string, Staff>();
    staffMembers?.forEach((staff: Staff) => {
      staffByEmail.set(staff.email, staff);
    });

    // Add team info to all users
    return users.map((user: UserWithRoles) => {
      const staffInfo = staffByEmail.get(user.email);
      return {
        ...user,
        team: staffInfo?.team || user.team || undefined
      };
    });
  }, [teamMembers, staffMembers]);

  const isLoading = teamLoading || staffMembersLoading;

  const removeFromRole = (role: Role, userId: string, email?: string) => {
    // For PENDING users, delete their staff object
    if (role === "PENDING" && email) {
      toast.promise(
        api.delete(path("/staff/:EMAIL", { EMAIL: email })).then(() => {
          void updateTeamMembers();
          void updateStaffMembers();
        }),
        {
          success: {
            title: "Pending user removed from staff"
          },
          error: { title: "Failed to remove pending user. Try again soon!" },
          loading: { title: "Removing pending user..." }
        }
      );
      return;
    }

    // For regular roles, delete from auth system
    toast.promise(
      api.delete("/auth", { data: { userId, role } }).then(() => {
        void updateTeamMembers();
        void updateStaffMembers();
      }),
      {
        success: {
          title: `User Role updated: No longer ${role} role`
        },
        error: { title: "Failed to update user role. Try again soon!" },
        loading: { title: "Updating user role..." }
      }
    );
  };

  const addRole = (role: Role, userId: string) => {
    toast.promise(
      api.put("/auth", { userId, role }).then(() => {
        void updateTeamMembers();
        void updateStaffMembers();
      }),
      {
        success: {
          title: `User Role updated: Added ${role} role`
        },
        error: { title: "Failed to add user role. Try again soon!" },
        loading: { title: "Adding user role..." }
      }
    );
  };

  const addToRole = async (
    values: RoleFormValues,
    helpers: FormikHelpers<RoleFormValues>
  ) => {
    try {
      const staffData = {
        email: values.email,
        name: values.name,
        team: values.team as CommitteeType
      };

      await api.post("/staff/", staffData);

      // Update all data
      void updateTeamMembers();
      void updateStaffMembers();

      toast({
        title: `${values.name} added as staff member`,
        description: `Added to ${values.team} team`,
        status: "success",
        duration: 3000,
        isClosable: true
      });
    } catch (error) {
      console.error("Failed to add staff member:", error);
      toast({
        title: "Failed to add staff member",
        description: "Try again soon!",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    } finally {
      helpers.setSubmitting(false);
    }
  };

  function toTitleCase(str: string) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  const getRoleIcon = (userRole: Role) => {
    switch (userRole) {
      case "SUPER_ADMIN":
        return <StarIcon color="yellow.500" />;
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
      case "SUPER_ADMIN":
        return "yellow";
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
            name: "",
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
            touched
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
                    isInvalid={!!errors.name && touched.name}
                  >
                    <FormLabel>Name</FormLabel>
                    <Input
                      name="name"
                      placeholder="Enter full name"
                      value={values.name}
                      onChange={handleChange}
                    />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
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

                <Button
                  leftIcon={<CheckIcon />}
                  colorScheme="blue"
                  type="submit"
                  isLoading={isSubmitting}
                  isDisabled={!values.email || !values.team}
                >
                  Add Staff Member
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
                      <Text fontWeight="bold" fontSize="lg" textAlign="left">
                        {user.displayName}
                      </Text>
                      <Text fontSize="sm">{user.email}</Text>
                    </VStack>

                    <VStack align="end" justifyContent="flex-end" spacing={2}>
                      {user.team && (
                        <Badge
                          colorScheme="green"
                          variant="outline"
                          fontSize="xs"
                        >
                          {toTitleCase(user.team)}
                        </Badge>
                      )}
                      <HStack spacing={2} wrap="wrap" justifyContent="flex-end">
                        {user.roles.map((userRole: Role) => (
                          <Badge
                            key={userRole}
                            height="24px"
                            borderRadius="md"
                            colorScheme={getRoleColor(userRole)}
                            variant="subtle"
                            display="flex"
                            alignItems="center"
                            gap={1}
                            cursor={
                              userRole === "STAFF" &&
                              user.roles.includes("ADMIN")
                                ? "not-allowed"
                                : "pointer"
                            }
                            onClick={() => {
                              // Don't allow deleting STAFF if user has ADMIN role
                              if (
                                userRole === "STAFF" &&
                                user.roles.includes("ADMIN")
                              ) {
                                return;
                              }
                              if (userRole === "PENDING") {
                                removeFromRole(userRole, "", user.email);
                              } else if (user.userId) {
                                removeFromRole(userRole, user.userId);
                              }
                            }}
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
                                if (userRole === "PENDING") {
                                  removeFromRole(userRole, "", user.email);
                                } else if (user.userId) {
                                  removeFromRole(userRole, user.userId);
                                }
                              }}
                              isDisabled={
                                (userRole === "STAFF" &&
                                  user.roles.includes("ADMIN")) ||
                                (userRole === "ADMIN" &&
                                  user.roles.includes("SUPER_ADMIN"))
                              }
                              _hover={{
                                bg: "red.100"
                              }}
                            />
                          </Badge>
                        ))}

                        {/* Add role button - only show for users with userId (logged in users) */}
                        {user.userId &&
                          (!user.roles.includes("ADMIN") ||
                            !user.roles.includes("SUPER_ADMIN")) && (
                            <IconButton
                              size="xs"
                              icon={<AddIcon />}
                              aria-label="Add role"
                              colorScheme="green"
                              variant="outline"
                              onClick={() => {
                                // For now, just add ADMIN/SUPER_ADMIN role
                                // Could be expanded to show a dropdown of available roles
                                if (!user.userId) return;

                                if (!user.roles.includes("ADMIN")) {
                                  addRole("ADMIN", user.userId);
                                } else if (
                                  !user.roles.includes("SUPER_ADMIN")
                                ) {
                                  addRole("SUPER_ADMIN", user.userId);
                                }
                              }}
                              _hover={{
                                bg: "green.50"
                              }}
                            />
                          )}
                      </HStack>
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
