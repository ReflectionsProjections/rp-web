import { EVENT_ICONS } from "@/constants/event-icons";
import {
  Box,
  CloseButton,
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
import FoodMenu from "./FoodMenu";
import LinkButtons from "./LinkButtons";

export default function EventModal({
  event,
  onClose
}: {
  event: Event | null;
  onClose: () => void;
}) {
  const hasFoodMenu = event?.description?.includes(":food:") || false;
  const hasLinks = event?.description?.includes(":link:") || false;

  // Extract the main description by removing both food and link sections
  let displayDescription = event?.description;
  if (displayDescription) {
    // Remove food section if present
    if (hasFoodMenu) {
      displayDescription = displayDescription.split(":food:")[0].trim();
    }
    // Remove link section if present
    if (hasLinks) {
      displayDescription = displayDescription.split(":link:")[0].trim();
    }
  }

  return (
    <Modal isOpen={event !== null} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      {event && (
        <ModalContent
          mt={{
            base: 14,
            md: "auto"
          }}
          mx={{
            base: 4,
            md: "auto"
          }}
          p={4}
          px={7}
          bg="rgba(66, 66, 66, 0.9)" // Translucent content background
          boxShadow="xl"
          color="white"
          borderRadius="xl"
          pb={20}
          backdropFilter="blur(12px)" // Further softening to achieve the frosted glass effect
        >
          <ModalHeader p={0} w="100%">
            <Flex align="flex-start" justify="space-between" w="100%">
              <Text
                fontFamily="ProRacing"
                fontSize="3xl"
                as="h2"
                transformOrigin={"top left"}
              >
                {event.name}
              </Text>
              <CloseButton onClick={onClose} />
            </Flex>
          </ModalHeader>

          <Box h="12">
            <AudioVisualizer />
          </Box>

          <Box h={1} w="100%" bgColor={"gray.400"} mt={4}></Box>
          <br />

          <EventCard event={event} />

          {displayDescription && (
            <>
              <Text
                fontSize="xl"
                fontWeight="bold"
                lineHeight="1.5"
                whiteSpace="pre-wrap"
                fontFamily="Magistral"
                letterSpacing="0.5px"
                mt={4}
                transformOrigin={"top left"}
              >
                {displayDescription}
              </Text>
              <br />
            </>
          )}

          <FoodMenu description={event.description} />

          <LinkButtons description={event.description} />

          <CheckerBoardPattern />
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
        <Flex flex="1 1 0%" alignItems="center" mb={{ base: 2, md: 0 }}>
          <Icon as={FaClock} boxSize={5} mr={2} />
          <Text
            fontSize="xl"
            mb={0.5}
            whiteSpace="normal"
            wordBreak="break-all"
            fontFamily="Magistral"
            fontWeight="bold"
            letterSpacing="0.5px"
          >
            {moment(event.startTime).format("h:mma")} –{" "}
            {moment(event.endTime).format("h:mma")}
          </Text>
        </Flex>
        <Flex flex="1 1 0%" alignItems="center">
          <Icon as={FaMapPin} boxSize={5} mr={2} />
          <Text
            fontSize="xl"
            mb={0.5}
            whiteSpace="normal"
            wordBreak="break-all"
            fontFamily="Magistral"
            letterSpacing="0.5px"
            fontWeight="bold"
          >
            {event.location || "Siebel CS"}
          </Text>
        </Flex>
      </Flex>

      <Flex
        direction={{ base: "column", md: "row" }}
        alignItems={{
          base: "flex-start",
          md: "center"
        }}
      >
        <Flex flex="1 1 0%" alignItems="center" mb={{ base: 2, md: 0 }}>
          <Icon as={EVENT_ICONS[event.eventType] ?? FaTag} boxSize={5} mr={2} />
          <Text
            fontSize="xl"
            mb={0.5}
            whiteSpace="normal"
            wordBreak="break-all"
            fontFamily="Magistral"
            fontWeight="bold"
            letterSpacing="0.5px"
          >
            {capitalCase(event.eventType)}
          </Text>
        </Flex>
        <Flex flex="1 1 0%" alignItems="center">
          <Icon as={FaAward} boxSize={5} mr={2} />
          <Text
            fontSize="xl"
            mb={0.5}
            whiteSpace="normal"
            wordBreak="break-all"
            fontFamily="Magistral"
            fontWeight="bold"
            letterSpacing="0.5px"
          >
            {event.points} points
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}

function CheckerBoardPattern() {
  return (
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
  );
}

function capitalCase(text: string) {
  if (text.length === 0) {
    return "";
  }
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
