import { useMirrorStyles } from "@/styles/Mirror";
import {
  Card,
  CardBody,
  Center,
  Stack,
  Heading,
  Badge,
  CardFooter,
  Flex,
  Image,
  Text
} from "@chakra-ui/react";
import rpLogo from "../assets/rp_logo.svg";
import { Event } from "@rp/shared";
import moment from "moment";

const readable = "MMMM Do YYYY, h:mm a";

function convertToCST(date: string) {
  const m = moment.utc(date);
  m.tz("America/Chicago");
  return m;
}

function EventCard({ event }: { event: Event | null }) {
  const mirrorStyles = useMirrorStyles(true);
  const startTimeCST = convertToCST(event?.startTime ?? "2025-03-01T22:00:00Z");
  const endTimeCST = convertToCST(event?.endTime ?? "2025-03-01T24:00:00Z");

  return (
    <Card maxW="sm" sx={mirrorStyles}>
      <CardBody>
        <Center>
          <Image
            src={rpLogo}
            alt={event?.name ?? "Sample Event"}
            borderRadius="lg"
            maxW="15vw"
          />
        </Center>
        <Stack mt="6" spacing="3">
          <Heading size="md"> {event?.name ?? "Sample Event"}</Heading>
          <Badge
            borderRadius="full"
            px="2"
            colorScheme={event?.isVirtual ? "green" : "purple"}
          >
            {event?.isVirtual ? "Virtual" : "In-person"}
          </Badge>
          <Text>
            {startTimeCST.format(readable)} - {endTimeCST.format(readable)}
          </Text>
          <Text>
            ({moment.duration(endTimeCST.diff(startTimeCST)).humanize()})
          </Text>
          <Text>Points: {event?.points ?? 0}</Text>
          <Text>
            {event?.description ?? "This is a sample event description"}
          </Text>
        </Stack>
      </CardBody>

      <CardFooter>
        <Flex justifyContent="space-between" width="100%"></Flex>
      </CardFooter>
    </Card>
  );
}

export default EventCard;
