import { Heading, Flex } from "@chakra-ui/react";
import api from "../../util/api.ts";
import { usePolling } from "@rp/shared";
import AddModal from "@/components/Meetings/AddModal.tsx";
import MeetingCard, {
  MeetingCardSkeleton
} from "@/components/Meetings/MeetingCard.tsx";
import { useOutletContext } from "react-router-dom";
import { MainContext } from "../Main.tsx";

function Meetings() {
  const { authorized } = useOutletContext<MainContext>();
  const {
    data: meetings,
    update: updateMeetings,
    isLoading
  } = usePolling(api, "/meetings", authorized);

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
        {isLoading
          ? Array.from({ length: 16 }).map((_, index) => (
              <MeetingCardSkeleton key={index} animation={authorized} />
            ))
          : meetings?.map((meeting) => (
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
