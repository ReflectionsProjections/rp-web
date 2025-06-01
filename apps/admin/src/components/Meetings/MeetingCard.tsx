import { useMirrorStyles } from "@/styles/Mirror";
import {
  Card,
  CardBody,
  Stack,
  Heading,
  Badge,
  CardFooter,
  Flex,
  Text
} from "@chakra-ui/react";
import { Meeting } from "@rp/shared";
import moment from "moment";
import React from "react";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import QrModal from "./QrModal";

type MeetingCardProps = {
  meeting: Meeting;
  updateMeetings: () => void;
};

const dateFormat = "MMMM Do YYYY, h:mm a";

const MeetingCard: React.FC<MeetingCardProps> = ({
  meeting,
  updateMeetings
}) => {
  const mirrorStyles = useMirrorStyles(true, true);

  const startCST = moment.tz(meeting.startTime, "America/Chicago");

  return (
    <Card sx={mirrorStyles} maxW="sm">
      <CardBody>
        <Stack mt="6" spacing="3">
          <Heading size="md">{`${meeting.committeeType} ${startCST.format("MM/DD")}`}</Heading>
          <Badge
            borderRadius="full"
            px="2"
            colorScheme={
              meeting.committeeType === "FULL TEAM" ? "pink" : "blue"
            }
          >
            {meeting.committeeType}
          </Badge>
          <Text>{startCST.format(dateFormat)}</Text>
        </Stack>
      </CardBody>

      <CardFooter>
        <Flex justifyContent="space-between" gap={4} width="100%">
          <EditModal meeting={meeting} updateMeetings={updateMeetings} />
          <QrModal meeting={meeting} startCST={startCST} />
          <DeleteModal meeting={meeting} updateMeetings={updateMeetings} />
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default MeetingCard;
