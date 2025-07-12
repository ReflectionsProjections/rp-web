import { Heading, Flex } from "@chakra-ui/react";
import { Event, usePolling } from "@rp/shared";
import EventCard, {
  EventCardSkeleton
} from "@/components/Events/EventCard.tsx";
import AddModal from "@/components/Events/AddModal.tsx";
import { useOutletContext } from "react-router-dom";
import { MainContext } from "../Main.tsx";

function Events() {
  const { authorized } = useOutletContext<MainContext>();
  const {
    data: events,
    update: updateEvents,
    isLoading
  } = usePolling("/events", authorized);

  return (
    <>
      <Flex justifyContent="center" alignItems="center">
        <Heading size="lg">Events</Heading>
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
              <EventCardSkeleton key={index} animation={authorized} />
            ))
          : events?.map((event: Event) => (
              <EventCard
                event={event}
                updateEvents={updateEvents}
                key={event.eventId}
              />
            ))}
      </Flex>
      <AddModal updateEvents={updateEvents} />
    </>
  );
}

export default Events;
