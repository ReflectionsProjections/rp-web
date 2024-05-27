import {
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
        <Box flex="1" p={4}>
            <Card >
                <CardHeader>
                <Heading size='md'>Welcome to R|P Admin</Heading>
                </CardHeader>

                <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                    <Box>
                    <Heading size='xs' textTransform='uppercase'>
                        Dashboard
                    </Heading>
                    <span>
                        View a summary of all your statistics.
                    </span>
                    </Box>
                    <Box>
                    <Heading size='xs' textTransform='uppercase'>
                        Editing
                    </Heading>
                    <span>
                        Edit events, emails, and other content.
                    </span>
                    </Box>
                    <Box>
                    <Heading size='xs' textTransform='uppercase'>
                        TBD
                    </Heading>
                    <span>
                        Yup. To be decided
                    </span>
                    </Box>
                </Stack>
                </CardBody>
            </Card>
            <br />
            <StatGroup>
                <Stat>
                <StatLabel>Sent</StatLabel>
                <StatNumber>345,670</StatNumber>
                <StatHelpText>
                    <StatArrow type='increase' />
                    23.36%
                </StatHelpText>
                </Stat>

                <Stat>
                <StatLabel>Clicked</StatLabel>
                <StatNumber>45</StatNumber>
                <StatHelpText>
                    <StatArrow type='decrease' />
                    9.05%
                </StatHelpText>
                </Stat>
            </StatGroup>
        </Box>
    )
}

export default Dashboard;