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
  Text
} from "@chakra-ui/react";
import api from "../../util/api";
import React, { useCallback } from "react";
import { path, Role } from "@rp/shared";

const TEAMS = [
  "CONTENT",
  "DEVELOPMENT",
  "MARKETING",
  "DESIGN",
  "OPERATIONS",
  "ADMIN"
];

function RolesCard({ role }: { role: Role }) {
  const toast = useToast();
  const [nameList, setNameList] = React.useState<string[]>([]);
  const [email, setEmail] = React.useState("");
  const [newTeam, setNewTeam] = React.useState("");

  const [firstRender, setFirstRender] = React.useState(true);

  const showToast = (message: string, error: boolean) => {
    toast({
      title: message,
      status: error ? "error" : "success",
      duration: 9000,
      isClosable: true
    });
  };

  const handleUpdateNewTeam = useCallback((newTeam: string) => {
    setNewTeam(newTeam);
  }, []);

  const getRoles = () => {
    api
      .get(path("/auth/:role", { role }))
      .then(function (response) {
        // handle success
        const names = response.data.map((item) => item.email);
        // console.log(names);
        setNameList(names);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  React.useEffect(() => {
    if (firstRender) {
      console.log("in here!");
      setFirstRender(false);
      getRoles();
    }
  }, [firstRender]);

  const removeFromRole = (role: string, email: string) => {
    api
      .delete("/auth", {
        data: {
          email,
          role
        }
      })
      .then((response) => {
        console.log("User role updated:", response.data);
        showToast(
          email + " User Role updated: No longer " + role + " role",
          false
        );
        getRoles();
      })
      .catch((error) => {
        console.log(error);
        showToast("Failed to update user role. Try again soon!", true);
      });
  };

  const updateUserTeam = (name: string, newTeam: string) => {
    console.log("Update user team:", name, newTeam);
    // TODO: Connect to API
  };

  const renderNamesWithButtons = (role: string, names: string[]) => {
    return names.map((name) => (
      <Flex key={name} justifyContent="space-between" alignItems="center">
        <Box flex={1} mr={7}>
          <Text textAlign={"left"}>{name}</Text>
        </Box>
        <Select
          flex={1}
          placeholder="Select team"
          value={""}
          onChange={(e) => {
            const selectedTeam = e.target.value;
            if (selectedTeam !== "") {
              updateUserTeam(name, selectedTeam);
            }
          }}
          mr={2}
        >
          {TEAMS.map((team) => (
            <option key={team} value={team}>
              {toTitleCase(team)}
            </option>
          ))}
        </Select>
        <IconButton
          size={"md"}
          icon={<CloseIcon />}
          aria-label={"Open Menu"}
          onClick={() => removeFromRole(role, name)}
        />
      </Flex>
    ));
  };

  const addToRole = (email: string) => {
    api
      .put("/auth", {
        email,
        role
      })
      .then((response) => {
        console.log("User role updated:", response.data);
        showToast(email + " User Role updated: Now " + role + " role", false);
        getRoles();
      })
      .catch((error) => {
        console.log(error);
        showToast("Failed to update user role. Try again soon!", true);
      });
  };

  const handleSubmit = () => {
    addToRole(email); // Replace 'YOUR_ROLE_HERE' with the actual role
    setEmail("");
  };

  function toTitleCase(str: string) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  return (
    <Card overflowY="auto" maxHeight="70vh">
      <CardHeader>
        <Heading size="md">{toTitleCase(role)}</Heading>
      </CardHeader>
      <CardBody>
        <Flex mb={4}>
          <Input
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            mr={2}
          />
          <Select
            placeholder="Select team"
            value={newTeam}
            onChange={(e) => handleUpdateNewTeam(e.target.value)}
            mr={2}
          >
            {TEAMS.map((team) => (
              <option key={team} value={team}>
                {toTitleCase(team)}
              </option>
            ))}
          </Select>

          <IconButton
            size={"md"}
            icon={<CheckIcon />}
            aria-label={"Open Menu"}
            onClick={handleSubmit}
          />
        </Flex>
        <Stack divider={<StackDivider />} spacing="4">
          {renderNamesWithButtons(role, nameList)}
        </Stack>
      </CardBody>
    </Card>
  );
}

export default RolesCard;
