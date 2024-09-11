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
  const [sponsorList, setSponsors] = React.useState([]);
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');

  const showToast = (message: string, error: boolean) => {
    toast({
      title: message,
      status: error ? "error" : "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const refreshSponsors = async () => {
    const jwt = localStorage.getItem("jwt");
    axios.get(Config.API_BASE_URL + "/auth/corporate", {
      headers: {
        Authorization: jwt
      }
    })
      .then(function (response) {
        const sponsorData = response.data.map((item: Record<string, string>) => ({
          name: item.name,
          email: item.email,
        }));
        setSponsors(sponsorData);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  React.useEffect(() => {
    let firstRender = true;

    if (firstRender) {
      refreshSponsors();
      firstRender = false;
    }
  }, []);

  const removeFromRole = async (email: string) => {
    const jwt = localStorage.getItem("jwt");

    try {
      const response = await axios.delete(Config.API_BASE_URL + '/auth/corporate/',
        {
          headers: {
            Authorization: jwt
          },
          data: {
            "email": email,
          }
        });

      console.log('User role updated:', response.data);
      showToast(email + ' User Role updated: No longer Corporate role', false);
      refreshSponsors();
    } catch (error) {
      console.log(error);
      showToast('Failed to update user role. Try again soon!', true);
    }
  };

  const renderSponsors = (sponsors: {name: string, email: string}[]) => {
    return sponsors.map((sponsor) => (
      <Flex key={sponsor.email} justifyContent="space-between" alignItems="center">
{/*         <Box>{sponsor.name}</Box> */}
{/*         <Box>{sponsor.email}</Box> */}
        <Box flex="1" textAlign="left">{sponsor.name}</Box>
        <Box flex="1" textAlign="left">{sponsor.email}</Box>
        <IconButton
          size={'md'}
          icon={<CloseIcon/>}
          aria-label={'Open Menu'}
          onClick={() => removeFromRole(sponsor.email)}
        />
      </Flex>
    ));
  };

  const addToRole = async (name:string, email: string) => {
    const jwt = localStorage.getItem("jwt");

    try {
      const response = await axios.post(Config.API_BASE_URL + '/auth/corporate', {name: name, email: email}, {
        headers: {
          Authorization: jwt
        }
      });

      console.log('User role updated:', response.data);
      showToast(email + ' User Role updated: Now Corporate role', false);
      refreshSponsors();
    } catch (error) {
      console.log(error);
      showToast('Failed to update user role. Try again soon!', true);
    }
  };

  const handleSubmit = () => {
    addToRole(name, email); // Replace 'YOUR_ROLE_HERE' with the actual role
    setEmail('');
    setName('');
  };

  return (
    <Card overflowY="auto" maxHeight="70vh">
      <CardHeader>
        <Heading size='md'>Corporate</Heading>
      </CardHeader>
      <CardBody>
        <Flex mb={4}>
          <Input
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            mr={2}
          />
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
          {renderSponsors(sponsorList)}
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
      <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(1, 1fr)", lg: "repeat(1, 1fr)"}} gap={6}>
        <CorporateCard/>
      </Grid>
    </Box>
  );
}


export default Sponsors;
