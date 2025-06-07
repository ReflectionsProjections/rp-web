import { useMirrorStyles } from "@/styles/Mirror";
import {
  Card,
  CardBody,
  Stack,
  Heading,
  Badge,
  CardFooter,
  Flex,
  Text,
  Skeleton,
  SkeletonText
} from "@chakra-ui/react";
import { Event } from "@rp/shared";
import moment from "moment";
import React from "react";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

type EventCardProps = {
  event: Event;
  updateEvents: () => void;
};

const dateFormat = "MMMM Do YYYY, h:mm a";

const EventCard: React.FC<EventCardProps> = ({ event, updateEvents }) => {
  const mirrorStyles = useMirrorStyles(true, true);

  const startCST = moment.tz(event.startTime, "America/Chicago");
  const endCST = moment.tz(event.endTime, "America/Chicago");

  return (
    <Card sx={mirrorStyles} maxW="sm">
      <CardBody>
        <Stack mt="6" spacing="3">
          <Heading size="md"> {event.name}</Heading>
          <Badge
            borderRadius="full"
            px="2"
            colorScheme={event.isVirtual ? "green" : "blue"}
          >
            {event.isVirtual ? "Virtual" : "In-person"}
          </Badge>
          <Text>
            {startCST.format(dateFormat)} - {endCST.format(dateFormat)}
          </Text>
          <Text>({moment.duration(startCST.diff(endCST)).humanize()})</Text>
          <Text>Points: {event.points}</Text>
          <Text>{event.description}</Text>
        </Stack>
      </CardBody>

      <CardFooter>
        <Flex justifyContent="space-between" width="100%">
          <EditModal event={event} updateEvents={updateEvents} />
          <DeleteModal event={event} updateEvents={updateEvents} />
        </Flex>
      </CardFooter>
    </Card>
  );
};

type EventCardSkeletonProps = {
  animation?: boolean;
};

export const EventCardSkeleton: React.FC<EventCardSkeletonProps> = ({
  animation = true
}) => {
  const mirrorStyles = useMirrorStyles();
  const speed = animation ? undefined : 0;

  return (
    <Card sx={mirrorStyles} w="sm">
      <CardBody>
        <Stack mt="6" spacing="3" alignItems="center">
          <Skeleton height="24px" width="60%" speed={speed} />
          <Skeleton
            height="20px"
            width="100%"
            borderRadius="full"
            speed={speed}
          />
          <SkeletonText noOfLines={1} spacing="2" width="80%" speed={speed} />
          <SkeletonText noOfLines={1} spacing="2" width="40%" speed={speed} />
          <SkeletonText noOfLines={1} spacing="2" width="30%" speed={speed} />
          <SkeletonText noOfLines={6} spacing="6" width="80%" speed={speed} />
        </Stack>
      </CardBody>
      <CardFooter>
        <Flex justifyContent="space-between" width="100%">
          <Skeleton
            height="36px"
            width="80px"
            borderRadius="md"
            speed={speed}
          />
          <Skeleton
            height="36px"
            width="80px"
            borderRadius="md"
            speed={speed}
          />
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
