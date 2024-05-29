import {
    Box,
    StatGroup,
    StatLabel,
    Stat,
    StatNumber,
    StatHelpText,
    StatArrow,
    Card,
    Heading,
    CardBody,
    TableContainer,
    Table,
    TableCaption,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Tfoot
  } from '@chakra-ui/react';

function Stats() {
    return (
        <Box flex="1" p={4}>
            <Heading size="lg">Stats</Heading>
            <br />
            <StatGroup>
                <Card m={5} minWidth='40%'>
                    <CardBody>
                        <Stat>
                        <StatLabel>Sent</StatLabel>
                        <StatNumber>345,670</StatNumber>
                        <StatHelpText>
                            <StatArrow type='increase' />
                            23.36%
                        </StatHelpText>
                        </Stat>
                    </CardBody>
                </Card>
                <Card m={5} minWidth='40%'>
                    <CardBody>
                        <Stat>
                        <StatLabel>Clicked</StatLabel>
                        <StatNumber>45</StatNumber>
                        <StatHelpText>
                            <StatArrow type='decrease' />
                            9.05%
                        </StatHelpText>
                        </Stat>
                    </CardBody>
                </Card>
                <Card m={5} minWidth='90%'>
                    <TableContainer>
                        <Table variant='striped' colorScheme='teal'>
                            <TableCaption>Imperial to metric conversion factors</TableCaption>
                            <Thead>
                            <Tr>
                                <Th>To convert</Th>
                                <Th>into</Th>
                                <Th isNumeric>multiply by</Th>
                            </Tr>
                            </Thead>
                            <Tbody>
                            <Tr>
                                <Td>inches</Td>
                                <Td>millimetres (mm)</Td>
                                <Td isNumeric>25.4</Td>
                            </Tr>
                            <Tr>
                                <Td>feet</Td>
                                <Td>centimetres (cm)</Td>
                                <Td isNumeric>30.48</Td>
                            </Tr>
                            <Tr>
                                <Td>yards</Td>
                                <Td>metres (m)</Td>
                                <Td isNumeric>0.91444</Td>
                            </Tr>
                            </Tbody>
                            <Tfoot>
                            <Tr>
                                <Th>To convert</Th>
                                <Th>into</Th>
                                <Th isNumeric>multiply by</Th>
                            </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                </Card>
            </StatGroup>
        </Box>
    )
}

export default Stats;