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
    StackDivider
  } from '@chakra-ui/react';

function Dashboard() {
    return (
        <Box p={4}>
    <Heading size='2xl' fontWeight='bold' mb={4} textAlign='left'>
      Welcome User!
    </Heading>

    <Flex justify="space-between">
      <Box flex="1" mr={2}>
        <Card>
          <CardHeader>
            <Heading size='md'>R|P Stats</Heading>
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
                    <StatNumber>345,670</StatNumber>
                    <StatHelpText>
                        {/* <StatArrow type='increase' />
                        23.36% */}
                    </StatHelpText>
                    </Stat>
                    <Stat>
                    <StatLabel>Priority Status</StatLabel>
                    <StatNumber>45</StatNumber>
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
            <Heading size='md'>Events</Heading>
          </CardHeader>
          <CardBody>
            {/* Add content for Events here */}
            Details about upcoming events will go here.
          </CardBody>
        </Card>
      </Box>
    </Flex>
  </Box>
    )
}

export default Dashboard;