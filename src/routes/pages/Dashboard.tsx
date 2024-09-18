import {
  Flex,
  Box,
  Stack,
  StatGroup,
  StatLabel,
  Stat,
  StatNumber,
  StatHelpText,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Badge,
  useBreakpointValue
} from '@chakra-ui/react';

import rpLogo from '../../assets/rp_logo.png';
import StatusMonitor from '../../components/StatusMonitor';

function Dashboard({ name }: { name: string }) {

  const flexDirection = useBreakpointValue({ base: 'column', md: 'row' });

  const CustomStatBox = ({ label, number, helpText }: { label: string, number: number, helpText: string }) => {
    return (
      <Stat boxShadow="0px 1px 2px gray" borderRadius="12px" margin="8px" paddingTop="7px">
        <StatLabel>{label}</StatLabel>
        <StatNumber>{number}</StatNumber>
        <StatHelpText>{helpText}</StatHelpText>
      </Stat>
    );
  };

  return (
    <Box p={4}>
      <Heading size='2xl' fontWeight='bold' mb={4} textAlign='left'>
        Welcome, {name}!
      </Heading>

      <Flex direction={flexDirection == 'column' ? 'column' : 'row'} justify="space-between">
        <Box flex="1" mr={flexDirection == 'column' ? 0 : 2}>
          <Card>
            <CardHeader>
              <Heading size='md'>Overall Stats</Heading>
            </CardHeader>
            <CardBody>
              {/* <Stack divider={<StackDivider />} spacing='4'>
                    <Box>
                        <Heading size='xs' textTransform='uppercase'>
                        Dashboard
                        </Heading>
                        
                        View a summary of all your statistics.
                        
                    </Box>
                    <Box>
                        <Heading size='xs' textTransform='uppercase'>
                        Editing
                        </Heading>
                        
                        Edit events, emails, and other content.
                        
                    </Box>
                    <Box>
                        <Heading size='xs' textTransform='uppercase'>
                        TBD
                        </Heading>
                        
                        Yup. To be decided.
                        
                    </Box>
                    </Stack> */}
              <Box mt={0}>
                <StatGroup>
                  <CustomStatBox label='Checked-In' number={694} helpText='' />
                  <CustomStatBox label='Priority Status' number={120} helpText='' />
                </StatGroup>
                <StatusMonitor />
              </Box>
            </CardBody>
          </Card>

        </Box>

        <Box flex="1" ml={flexDirection == 'column' ? 0 : 2} mt={flexDirection == 'column' ? 4 : 0}>
          <Card>
            <CardHeader>
              <Heading size='md'>Upcoming Events</Heading>
            </CardHeader>
            <CardBody>
              {/* Add content for Events here */}
              <Card>
                <CardBody>
                  <Flex flexDirection="column" align="center">
                    <img src={rpLogo} alt='R|P Logo' style={{ width: '150px' }} />
                  </Flex>
                  <Stack mt='6' spacing='3'>
                    <Heading size='md'>R|P Opening Event</Heading>
                    <Badge borderRadius="full" px="2" colorScheme={"green"}>
                      Virtual
                    </Badge>
                    <p>
                      June 17th, 9:30 PM - 10:30 PM
                    </p>
                    <p>
                      Points: 10
                    </p>
                    <p>Get ready to learn all about R|P 2024!</p>
                  </Stack>
                </CardBody>
              </Card>
              <br />
              Details about upcoming events will go here.
            </CardBody>
          </Card>
        </Box>
      </Flex>
    </Box>
  );
}

export default Dashboard;