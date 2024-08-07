import {
  Box, Card, CardBody, CardHeader, Flex,
  Grid,
  Heading, IconButton, Input, Stack, StackDivider, useToast,
} from '@chakra-ui/react';
import React from "react";
import axios from "axios";
import {Config} from "../../config.ts";
import {CheckIcon, CloseIcon} from "@chakra-ui/icons";

function CorporateCard() {
  const toast = useToast();
  const [nameList, setNameList] = React.useState([]);
  const [email, setEmail] = React.useState('');

  const showToast = (message: string, error: boolean) => {
    toast({
      title: message,
      status: error ? "error" : "success",
      duration: 9000,
      isClosable: true,
    });
  }

  const getRoles = async () => {

    const jwt = localStorage.getItem("jwt"); //  no way to get corporate roles

    // axios.get(Config.API_BASE_URL + "/auth/" + role, {
    //   headers: {
    //     Authorization: jwt
    //   }
    // })
    //   .then(function (response) {
    //     // handle success
    //     const names = response.data.map((item: Record<string, string>) => item.email);
    //     // console.log(names);
    //     setNameList(names);
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   })
    // TODO
  }

  React.useEffect(() => {
    let firstRender = true;

    if (firstRender) {
      getRoles();
      firstRender = false;
    }
  }, []);

  const removeFromRole = async (email: string) => {
    const jwt = localStorage.getItem("jwt");

    try {
      const response = await axios.delete(Config.API_BASE_URL + '/auth/corporate/' + email,
        {
          headers: {
            Authorization: jwt
          }
        });

      console.log('User role updated:', response.data);
      showToast(email + ' User Role updated: No longer Corporate role', false);
      getRoles();
    } catch (error) {
      console.log(error);
      showToast('Failed to update user role. Try again soon!', true);
    }
  }

  const renderNamesWithButtons = (names: string[]) => {
    return names.map((name) => (
      <Flex key={name} justifyContent="space-between" alignItems="center">
        <Box>{name}</Box>
        <IconButton
          size={'md'}
          icon={<CloseIcon/>}
          aria-label={'Open Menu'}
          onClick={() => removeFromRole(name)}
        />
      </Flex>
    ));
  };

  const addToRole = async (email: string) => {
    const jwt = localStorage.getItem("jwt");

    try {
      const response = await axios.post(Config.API_BASE_URL + '/auth/corporate/' + email, {}, {
        headers: {
          Authorization: jwt
        }
      });

      console.log('User role updated:', response.data);
      showToast(email + ' User Role updated: Now Corporate role', false);
      getRoles();
    } catch (error) {
      console.log(error);
      showToast('Failed to update user role. Try again soon!', true);
    }
  }

  const handleSubmit = () => {
    addToRole(email); // Replace 'YOUR_ROLE_HERE' with the actual role
    setEmail('');
  };

  return (
    <Card overflowY="auto" maxHeight="70vh">
      <CardHeader>
        <Heading size='md'>Corporate</Heading>
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
            icon={<CheckIcon/>}
            aria-label={'Open Menu'}
            onClick={handleSubmit}
          />
        </Flex>
        <Stack divider={<StackDivider/>} spacing='4'>
          {renderNamesWithButtons(nameList)}
        </Stack>
      </CardBody>
    </Card>
  );
}

function Sponsors() {

  return (
    <Box flex="1" minW='90vw' p={4}>
      <Heading size="lg">Roles</Heading>
      <br/>
      <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)"}} gap={6}>
        <CorporateCard/>
      </Grid>
    </Box>
  )
}


export default Sponsors;