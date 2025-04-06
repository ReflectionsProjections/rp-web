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
  Text,
  Image,
  Center,
  useBreakpointValue,
  CardFooter
} from '@chakra-ui/react';

import rpLogo from '../../assets/rp_logo.svg';
import StatusMonitor from '../../components/StatusMonitor';
import { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import api from '../../util/api';

const readable = "MMMM Do YYYY, h:mm a";

function convertToCST(date: string) {
  const m = moment.utc(date);
  m.tz('America/Chicago');
  return m;
}

function EventCard({ event }: { event: { eventId: string, name: string, startTime: string, endTime: string, points: number, description: string, isVirtual: boolean, imageUrl: string, location: string, eventType: string, isVisible: boolean } }) {
  // const { isOpen: isDeleteOpen, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();

  return (
    <Card maxW='sm' key={event.eventId}>
      <CardBody>
        <Center>
          <Image src={rpLogo} alt={event.name} borderRadius='lg' maxW='15vw'/>
        </Center>
        <Stack mt='6' spacing='3'>
          <Heading size='md'> {event.name}</Heading>
          <Badge borderRadius="full" px="2" colorScheme={event.isVirtual ? "green" : "blue"}>
            {event.isVirtual ? "Virtual" : "In-person"}
          </Badge>
          <Text>
            {convertToCST(event.startTime).format(readable)} - {convertToCST(event.endTime).format(readable)}
          </Text>
          <Text>
              ({moment.duration(convertToCST(event.endTime).diff(convertToCST(event.startTime))).humanize()})
          </Text>
          <Text>
              Points: {event.points}
          </Text>
          <Text>
            {event.description}
          </Text>
        </Stack>
      </CardBody>

      <CardFooter>
        <Flex justifyContent="space-between" width="100%">
        </Flex>
      </CardFooter>
    </Card>
  );
}




function Dashboard({ name }: { name: string }) {

  const [currentEvent, setCurrentEvent] = useState<{ eventId: string, name: string, startTime: string, endTime: string, points: number, description: string, isVirtual: boolean, imageUrl: string, location: string, eventType: string, isVisible: boolean } | null>(null);
  const [stats, setStats] = useState(0);
  const [status, setStatus] = useState(0);
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

  function getUpcomingEvent() {
    const jwt = localStorage.getItem("jwt");
    api.get("/events/currentOrNext", {
      headers: {
        Authorization: jwt
      }
    }).then(function (response) {
      // console.log(response.data);
      setCurrentEvent(response.data);
    });
  }

  function getStats() {
    const jwt = localStorage.getItem("jwt");
    api.get("/stats/check-in/", {
      headers: {
        Authorization: jwt
      }
    }).then((response) => {
      setStats(response.data.count);
    });
  }

  function getStatus() {
    const jwt = localStorage.getItem("jwt");
    api.get("/stats/priority-attendee/", {
      headers: {
        Authorization: jwt
      }
    }).then((response) => {
      setStatus(response.data.count);
    });
  }

  useEffect(() => {
    getUpcomingEvent();
    getStats();
    getStatus();
  }, []);
  
  
  return (
    <Box p={4}>
      <Heading size='2xl' fontWeight='bold' mb={4} textAlign='left'>
        Welcome, {name}!
      </Heading>

      <Flex direction={flexDirection == 'column' ? 'column' : 'row'} justify="space-between">
        <Box flex="1" mr={flexDirection == 'column' ? 0 : 2}>
          <Card>
            <CardHeader>
              <Heading size='lg'>Overall Stats</Heading>
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
                  <CustomStatBox label='Checked-In' number={stats} helpText='' />
                  <CustomStatBox label='Priority Status' number={status} helpText='' />
                </StatGroup>
                <StatusMonitor />
              </Box>
            </CardBody>
          </Card>

        </Box>

        <Box flex="1" ml={flexDirection == 'column' ? 0 : 2} mt={flexDirection == 'column' ? 4 : 0}>
          <Card alignItems={'center'}>
            <CardHeader>
              <Heading size='lg'>Upcoming Events</Heading>
            </CardHeader>
            <CardBody>
              {/* Add content for Events here */}
              <EventCard event={{
                eventId: currentEvent?.eventId || "1",
                name: currentEvent?.name || "Sample Event",
                startTime: currentEvent?.startTime || "2025-03-01T10:00:00Z",
                endTime: currentEvent?.endTime || "2025-03-01T12:00:00Z",
                points: currentEvent?.points || 0,
                description: currentEvent?.description || "This is a sample event description.",
                isVirtual: currentEvent?.isVirtual || true,
                imageUrl: currentEvent?.imageUrl || "",
                location: currentEvent?.location || "Online",
                eventType: currentEvent?.eventType || "Webinar",
                isVisible: currentEvent?.isVisible || true
              }} />
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
