import { Heading, Flex } from "@chakra-ui/react";
import api from "../../util/api.ts";
import { Event, usePolling } from "@rp/shared";
import EventCard from "@/components/Events/EventCard.tsx";
import AddModal from "@/components/Events/AddModal.tsx";

function Events() {
  const { data: events, update: updateEvents } = usePolling(api, "/events");

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
        {events?.map((event: Event) => (
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
