import { CloseIcon, CheckIcon } from '@chakra-ui/icons';
import {
    Box,
    Stack,
    Card,
    CardHeader,
    Heading,
    CardBody,
    StackDivider,
    Grid,
    Flex,
    IconButton,
    Input
  } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { Config } from '../../config';

function Roles() {
    // const adminNames = ['Admin1', 'Admin2', 'Admin3', 'Admin4', 'Admin5', 'Admin6', 'Admin7', 'Admin8', 'Admin9', 'Admin10'];
    const [adminList, setAdminList] = React.useState([]);
    const [staffList, setStaffList] = React.useState([]);
    const [corpList, setCorpList] = React.useState([]);

    const getRoles = async () => {

        const jwt = localStorage.getItem("jwt");

        axios.get(Config.API_BASE_URL + "/auth/ADMIN", {
            headers: {
                Authorization: jwt
            }
        })
        .then(function (response) {
            // handle success
            const names = response.data.map((item: Record<string, string>) => item.email);
            // console.log(names);
            setAdminList(names);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

        axios.get(Config.API_BASE_URL + "/auth/STAFF", {
            headers: {
                Authorization: jwt
            }
        })
        .then(function (response) {
            // handle success
            const names = response.data.map((item: Record<string, string>) => item.email);
            // console.log(names);
            setStaffList(names);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

        axios.get(Config.API_BASE_URL + "/auth/CORPORATE", {
            headers: {
                Authorization: jwt
            }
        })
        .then(function (response) {
            // handle success
            const names = response.data.map((item: Record<string, string>) => item.email);
            // console.log(names);
            setCorpList(names);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

    }

    React.useEffect(() => {
        getRoles();
    }, []);

    const removeFromRole = (role: string, email: string) => {
        
    }



  
    const renderNamesWithButtons = (names: string[]) => {
        return names.map((name) => (
            <Flex key={name} justifyContent="space-between" alignItems="center">
                <Box>{name}</Box>
                <IconButton
                    size={'md'}
                    icon={ <CloseIcon /> }
                    aria-label={'Open Menu'}
                />
            </Flex>
        ));
    };

    const renderInputField = () => (
        <Flex mb={4}>
          <Input placeholder="Enter email" mr={2} />
          <IconButton
                size={'md'}
                icon={ <CheckIcon /> }
                aria-label={'Open Menu'}
            />
        </Flex>
      );
  
    return (
        <Box flex="1" minW='90vw' p={4}>
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              <Card overflowY="auto" maxHeight="70vh">
                  <CardHeader>
                  <Heading size='md'>Admin</Heading>
                  </CardHeader>
                  <CardBody>
                  {renderInputField()}
                  <Stack divider={<StackDivider />} spacing='4'>
                      {renderNamesWithButtons(adminList)}
                  </Stack>
                  </CardBody>
              </Card>
  
              <Card overflowY="auto" maxHeight="70vh">
                  <CardHeader>
                  <Heading size='md'>Staff</Heading>
                  </CardHeader>
                  <CardBody>
                  {renderInputField()}
                  <Stack divider={<StackDivider />} spacing='4'>
                      {renderNamesWithButtons(staffList)}
                  </Stack>
                  </CardBody>
              </Card>
  
              <Card overflowY="auto" maxHeight="70vh">
                  <CardHeader>
                  <Heading size='md'>Corporate</Heading>
                  </CardHeader>
                  <CardBody>
                  {renderInputField()}
                  <Stack divider={<StackDivider />} spacing='4'>
                      {renderNamesWithButtons(corpList)}
                  </Stack>
                  </CardBody>
              </Card>
              </Grid>
          </Box>
      )
  }

export default Roles;