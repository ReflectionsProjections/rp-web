import { Heading, Flex } from "@chakra-ui/react";
import api from "../../util/api.ts";
import { usePolling } from "@rp/shared";
import AddModal from "@/components/Meetings/AddModal.tsx";
import MeetingCard from "@/components/Meetings/MeetingCard.tsx";

function Meetings() {
  const { data: meetings, update: updateMeetings } = usePolling(
    api,
    "/meetings"
  );

  return (
    <>
      <Flex justifyContent="center" alignItems="center">
        <Heading size="lg">Meetings</Heading>
      </Flex>
      <br />
      <Flex
        w="100%"
        p={4}
        flexWrap="wrap"
        justifyContent="space-evenly"
        gap={6}
      >
        {meetings?.map((meeting) => (
          <MeetingCard
            meeting={meeting}
            updateMeetings={updateMeetings}
            key={meeting.meetingId}
          />
        ))}
      </Flex>
      <AddModal updateMeetings={updateMeetings} />
    </>
  );
}

export default Meetings;
