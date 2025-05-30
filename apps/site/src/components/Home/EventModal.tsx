import {
  Box,
  Flex,
  Icon,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text
} from "@chakra-ui/react";
import { Event } from "@rp/shared";
import moment from "moment";
import { FaAward, FaClock, FaMapPin, FaTag } from "react-icons/fa";
import { AudioVisualizer } from "./AudioVisualizer";

export default function EventModal({
  event,
  onClose
}: {
  event: Event | null;
  onClose: () => void;
}) {
  return (
    <Modal
      isOpen={event !== null}
      onClose={onClose}
      size="xl"
      isCentered
      scrollBehavior="inside"
    >
      <ModalOverlay />
      {event && (
        <ModalContent
          p={4}
          px={7}
          bg="rgba(129, 26, 26, 0.9)" // translucent content background
          color="white"
          borderRadius="xl"
          pb={20}
          backdropFilter="blur(12px)" // further soften inside
        >
          <ModalHeader
            p={0}
            fontWeight={"bold"}
            fontStyle="italic"
            fontSize={"2xl"}
          >
            {event.name.toUpperCase()}
          </ModalHeader>

          <Box h="12">
            <AudioVisualizer />
          </Box>

          <Box h={1} w="100%" bgColor={"gray.400"} mt={4}></Box>
          <br />

          <EventCard event={event} />

          <Text
            fontSize="md"
            fontWeight="normal"
            lineHeight="1.5"
            whiteSpace="pre-wrap"
            mt={4}
          >
            {event.description}
          </Text>
          <br />

          <Box
            position="absolute"
            bottom={8}
            left={0}
            width="100%"
            height="40px"
            bg="white"
            backgroundImage={`
                        linear-gradient(
                            45deg,
                            black 25%,
                            transparent 25%,
                            transparent 75%,
                            black 75%,
                            black
                        ),
                        linear-gradient(
                            45deg,
                            black 25%,
                            transparent 25%,
                            transparent 75%,
                            black 75%,
                            black
                        )
                        `}
            backgroundPosition="0 0, 10px 10px"
            backgroundSize="20px 20px"
          />
        </ModalContent>
      )}
    </Modal>
  );
}

function EventCard({ event }: { event: Event }) {
  return (
    <Box
      borderRadius="md"
      p={4}
      w="100%"
      boxShadow={"lg"}
      bgColor={"whiteAlpha.200"}
    >
      {/* Time & Location */}
      <Flex
        direction={{ base: "column", md: "row" }}
        alignItems={{
          base: "flex-start",
          md: "center"
        }}
        mb={{
          base: 2,
          md: 4
        }}
      >
        <Flex flex={1} alignItems="center" mb={{ base: 2, md: 0 }}>
          <Icon as={FaClock} boxSize={5} mr={2} />
          <Text fontSize="md" mb={0.5}>
            {moment(event.startTime).format("h:mma")} –{" "}
            {moment(event.endTime).format("h:mma")}
          </Text>
        </Flex>
        <Flex flex={1} alignItems="center">
          <Icon as={FaMapPin} boxSize={5} mr={2} />
          <Text fontSize="md" mb={0.5}>
            {event.location}
          </Text>
        </Flex>
      </Flex>

      {/* Type & Points */}
      <Flex
        direction={{ base: "column", md: "row" }}
        alignItems={{
          base: "flex-start",
          md: "center"
        }}
      >
        <Flex flex={1} alignItems="center" mb={{ base: 2, md: 0 }}>
          <Icon as={FaTag} boxSize={5} mr={2} />
          <Text fontSize="md" mb={0.5}>
            {event.eventType}
          </Text>
        </Flex>
        <Flex flex={1} alignItems="center">
          <Icon as={FaAward} boxSize={5} mr={2} />
          <Text fontSize="md" mb={0.5}>
            {event.points} points
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}
