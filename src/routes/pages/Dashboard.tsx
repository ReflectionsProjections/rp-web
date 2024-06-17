import {
  Flex,
  Box,
  Stack,
  StatGroup,
  StatLabel,
  Stat,
  StatNumber,
  StatHelpText,
  StatArrow,
  Card,
  CardHeader,
  Heading,
  CardBody,
  StackDivider,
  Badge
} from '@chakra-ui/react';

import rpLogo from '../../assets/rp_logo.png'

function Dashboard({ name }: { name: string }) {
  return (
    <Box p={4}>
      <Heading size='2xl' fontWeight='bold' mb={4} textAlign='left'>
            Welcome, {name}!
      </Heading>

      <Flex justify="space-between">
        <Box flex="1" mr={2}>
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
              <Box mt={4}>
                <StatGroup>
                  <Stat>
                    <StatLabel>Checked-In</StatLabel>
                    <StatNumber>694</StatNumber>
                    <StatHelpText>
                      {/* <StatArrow type='increase' />
                                23.36% */}
                    </StatHelpText>
                  </Stat>
                  <Stat>
                    <StatLabel>Priority Status</StatLabel>
                    <StatNumber>120</StatNumber>
                    <StatHelpText>
                      {/* <StatArrow type='decrease' />
                                9.05% */}
                    </StatHelpText>
                  </Stat>
                </StatGroup>
              </Box>
            </CardBody>
          </Card>

        </Box>

        <Box flex="1" ml={2}>
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
  )
}

export default Dashboard;