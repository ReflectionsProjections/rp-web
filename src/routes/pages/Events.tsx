import {
  Box,
  Stack,
  Card,
  Heading,
  CardBody,
  Text,
  Image,
  CardFooter, Button, Badge, Grid
} from '@chakra-ui/react';
import {EditIcon} from "@chakra-ui/icons";

const res = "[{\n" +
    "  \"_id\": {\n" +
    "    \"$oid\": \"66580272e3677bc19cfc4952\"\n" +
    "  },\n" +
    "  \"name\": \"Tech Conference 2024 Day 1\",\n" +
    "  \"startTime\": {\n" +
    "    \"$date\": \"2024-06-01T10:00:00.000Z\"\n" +
    "  },\n" +
    "  \"endTime\": {\n" +
    "    \"$date\": \"2024-06-01T18:00:00.000Z\"\n" +
    "  },\n" +
    "  \"points\": 50,\n" +
    "  \"description\": \"Kickoff to the Tech Conference 2024.\",\n" +
    "  \"isVirtual\": true,\n" +
    "  \"imageUrl\": \"http://localhost:5173/src/assets/rp_logo.png\",\n" +
    "  \"isVisible\": true,\n" +
    "  \"eventId\": \"6475fa93-946b-4faa-b21b-579f383d46d5\",\n" +
    "  \"__v\": 0\n" +
    "},\n" +
    "{\n" +
    "  \"_id\": {\n" +
    "    \"$oid\": \"66580282e3677bc19cfc4954\"\n" +
    "  },\n" +
    "  \"name\": \"Tech Conference 2024 Day 2\",\n" +
    "  \"startTime\": {\n" +
    "    \"$date\": \"2024-06-02T10:00:00.000Z\"\n" +
    "  },\n" +
    "  \"endTime\": {\n" +
    "    \"$date\": \"2024-06-02T18:00:00.000Z\"\n" +
    "  },\n" +
    "  \"points\": 50,\n" +
    "  \"description\": \"Second day of the Tech Conference 2024.\",\n" +
    "  \"isVirtual\": true,\n" +
    "  \"imageUrl\": \"http://localhost:5173/src/assets/rp_logo.png\",\n" +
    "  \"isVisible\": true,\n" +
    "  \"eventId\": \"b9bec496-3815-4823-8076-c5c33820bc71\",\n" +
    "  \"__v\": 0\n" +
    "},\n" +
    "{\n" +
    "  \"_id\": {\n" +
    "    \"$oid\": \"6658028de3677bc19cfc4956\"\n" +
    "  },\n" +
    "  \"name\": \"Tech Conference 2024 Day 3\",\n" +
    "  \"startTime\": {\n" +
    "    \"$date\": \"2024-06-03T10:00:00.000Z\"\n" +
    "  },\n" +
    "  \"endTime\": {\n" +
    "    \"$date\": \"2024-06-03T18:00:00.000Z\"\n" +
    "  },\n" +
    "  \"points\": 50,\n" +
    "  \"description\": \"Final day of the Tech Conference 2024.\",\n" +
    "  \"isVirtual\": true,\n" +
    "  \"imageUrl\": \"http://localhost:5173/src/assets/rp_logo.png\",\n" +
    "  \"isVisible\": true,\n" +
    "  \"eventId\": \"60f772fc-6668-481c-997e-e9eb667eb746\",\n" +
    "  \"__v\": 0\n" +
    "},\n" +
    "{\n" +
    "  \"_id\": {\n" +
    "    \"$oid\": \"6658036d5da2661b5dd1aced\"\n" +
    "  },\n" +
    "  \"name\": \"Spring Tech Expo\",\n" +
    "  \"startTime\": {\n" +
    "    \"$date\": \"2024-05-28T09:00:00.000Z\"\n" +
    "  },\n" +
    "  \"endTime\": {\n" +
    "    \"$date\": \"2024-05-30T17:00:00.000Z\"\n" +
    "  },\n" +
    "  \"points\": 100,\n" +
    "  \"description\": \"An expo showcasing the latest in spring tech innovations.\",\n" +
    "  \"isVirtual\": false,\n" +
    "  \"imageUrl\": \"http://localhost:5173/src/assets/rp_logo.png\",\n" +
    "  \"isVisible\": true,\n" +
    "  \"eventId\": \"91e7107b-c26f-40ff-9d24-0b7b90805852\",\n" +
    "  \"__v\": 0\n" +
    "},\n" +
    "{\n" +
    "  \"_id\": {\n" +
    "    \"$oid\": \"665803785da2661b5dd1acef\"\n" +
    "  },\n" +
    "  \"name\": \"Early Summer Workshop\",\n" +
    "  \"startTime\": {\n" +
    "    \"$date\": \"2024-06-02T10:00:00.000Z\"\n" +
    "  },\n" +
    "  \"endTime\": {\n" +
    "    \"$date\": \"2024-06-05T16:00:00.000Z\"\n" +
    "  },\n" +
    "  \"points\": 150,\n" +
    "  \"description\": \"A workshop focusing on early summer trends in technology.\",\n" +
    "  \"isVirtual\": true,\n" +
    "  \"imageUrl\": \"http://localhost:5173/src/assets/rp_logo.png\",\n" +
    "  \"isVisible\": true,\n" +
    "  \"eventId\": \"fec7ecbb-3079-4c19-ab11-d02a008066a5\",\n" +
    "  \"__v\": 0\n" +
    "},\n" +
    "{\n" +
    "  \"_id\": {\n" +
    "    \"$oid\": \"665803805da2661b5dd1acf1\"\n" +
    "  },\n" +
    "  \"name\": \"Tech Future Symposium\",\n" +
    "  \"startTime\": {\n" +
    "    \"$date\": \"2024-06-07T11:00:00.000Z\"\n" +
    "  },\n" +
    "  \"endTime\": {\n" +
    "    \"$date\": \"2024-06-10T18:00:00.000Z\"\n" +
    "  },\n" +
    "  \"points\": 200,\n" +
    "  \"description\": \"A symposium discussing the future of technology and innovation.\",\n" +
    "  \"isVirtual\": false,\n" +
    "  \"imageUrl\": \"http://localhost:5173/src/assets/rp_logo.png\",\n" +
    "  \"isVisible\": true,\n" +
    "  \"eventId\": \"7b94977c-d08d-4d5a-9b37-34b68bd125ed\",\n" +
    "  \"__v\": 0\n" +
    "},\n" +
    "{\n" +
    "  \"_id\": {\n" +
    "    \"$oid\": \"665807ddc669692636d7f492\"\n" +
    "  },\n" +
    "  \"name\": \"Spring Tech Expo\",\n" +
    "  \"startTime\": {\n" +
    "    \"$date\": \"2024-05-28T09:00:00.000Z\"\n" +
    "  },\n" +
    "  \"endTime\": {\n" +
    "    \"$date\": \"2024-05-30T17:00:00.000Z\"\n" +
    "  },\n" +
    "  \"points\": 100,\n" +
    "  \"description\": \"An expo showcasing the latest in spring tech innovations.\",\n" +
    "  \"isVirtual\": false,\n" +
    "  \"imageUrl\": \"http://localhost:5173/src/assets/rp_logo.png\",\n" +
    "  \"isVisible\": true,\n" +
    "  \"eventType\": \"C\",\n" +
    "  \"eventId\": \"004ee290-daa3-4fbc-888d-b10b5362e231\",\n" +
    "  \"__v\": 0\n" +
    "}]";

function getEvents() {
  const response = JSON.parse(res);
  const events = [];

  for (const e in response) {
    events.push(response[e]);
  }

  return events;

}

function Events() {
  const eventData = getEvents();

  for (const e in eventData) {
    console.log(eventData[e]);
  }

  const items = eventData.map(event=>
    <Card maxW='sm' key={event._id.$oid}>
      <CardBody>
        <Image src={event.imageUrl} alt={event.name} borderRadius='lg'/>
        <Stack mt='6' spacing='3'>
          <Heading size='md'> {event.name}</Heading>
          <Badge borderRadius="full" px="2" colorScheme={event.isVirtual ? "green" : "blue"}>
            {event.isVirtual ? "Virtual" : "In-person"}
          </Badge>
          <Text>
            {new Date(event.startTime.$date).toLocaleString()} - {new Date(event.endTime.$date).toLocaleString()}
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
        <Button leftIcon={<EditIcon/>} colorScheme="teal" variant="solid">
            Edit
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <Box flex="1" minW='90vw' p={4}>
      <Heading size="lg">Events</Heading>
      <br />
      <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}  gap={6}>
        {items}
      </Grid>
    </Box>
  );
}

export default Events;