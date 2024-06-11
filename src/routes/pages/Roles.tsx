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

function Roles() {
  const adminNames = ['Admin1', 'Admin2', 'Admin3', 'Admin4', 'Admin5', 'Admin6', 'Admin7', 'Admin8', 'Admin9', 'Admin10'];
  const staffNames = ['Staff1', 'Staff2', 'Staff3'];
  const corporateNames = ['Corporate1', 'Corporate2', 'Corporate3'];
  
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
              {renderNamesWithButtons(adminNames)}
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
              {renderNamesWithButtons(staffNames)}
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
              {renderNamesWithButtons(corporateNames)}
            </Stack>
          </CardBody>
        </Card>
      </Grid>
    </Box>
  )
}

export default Roles;