import { CloseIcon, CheckIcon } from '@chakra-ui/icons';
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
} from '@chakra-ui/react';

import axios from 'axios';
import React from 'react';
import { Config } from '../../config';

function RolesCard({ role }: { role: string }) {
  const toast = useToast();
  const [nameList, setNameList] = React.useState([]);
  const [email, setEmail] = React.useState('');
  const [firstRender, setFirstRender] = React.useState(true);

  const showToast = (message: string, error: boolean) => {
    toast({
      title: message,
      status: error ? "error" : "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const getRoles = async () => {

    const jwt = localStorage.getItem("jwt");

    axios.get(Config.API_BASE_URL + "/auth/" + role, {
      headers: {
        Authorization: jwt
      }
    })
      .then(function (response) {
        // handle success
        const names = response.data.map((item: Record<string, string>) => item.email);
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

  const removeFromRole = async (role: string, email: string) => {
    const jwt = localStorage.getItem("jwt");
    
    try {
      const response = await axios.delete(Config.API_BASE_URL + '/auth/', {
        data: {
          email,
          role
        },
        headers: {
          Authorization: jwt
        }
      });

      console.log('User role updated:', response.data);
      showToast(email+' User Role updated: No longer '+role+' role', false);
      getRoles();
    } catch (error) {
      console.log(error);
      showToast('Failed to update user role. Try again soon!', true);
    }
  };

  const renderNamesWithButtons = (role: string, names: string[]) => {
    return names.map((name) => (
      <Flex key={name} justifyContent="space-between" alignItems="center">
        <Box>{name}</Box>
        <IconButton
          size={'md'}
          icon={ <CloseIcon /> }
          aria-label={'Open Menu'}
          onClick={() => removeFromRole(role, name)}
        />
      </Flex>
    ));
  };

  const addToRole = async ( email: string) => {
    const jwt = localStorage.getItem("jwt");
    
    try {
      const response = await axios.put(Config.API_BASE_URL + '/auth/', {
        email,
        role
      }, {
        headers: {
          Authorization: jwt
        }
      });

      console.log('User role updated:', response.data);
      showToast(email+' User Role updated: Now '+role+' role', false);
      getRoles();
    } catch (error) {
      console.log(error);
      showToast('Failed to update user role. Try again soon!', true);
    }
  };

  const handleSubmit = () => {
    addToRole(email); // Replace 'YOUR_ROLE_HERE' with the actual role
    setEmail('');
  };

  function toTitleCase(str: string) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  return (
    <Card overflowY="auto" maxHeight="70vh">
      <CardHeader>
        <Heading size='md'>{toTitleCase(role)}</Heading>
      </CardHeader>
      <CardBody>
        <Flex mb={4}>
          <Input
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            mr={2}
          />
          <IconButton
            size={'md'}
            icon={<CheckIcon />}
            aria-label={'Open Menu'}
            onClick={handleSubmit}
          />
        </Flex>
        <Stack divider={<StackDivider />} spacing='4'>
          {renderNamesWithButtons(role, nameList)}
        </Stack>
      </CardBody>
    </Card>
  );
}

export default RolesCard;
