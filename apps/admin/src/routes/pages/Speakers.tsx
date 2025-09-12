import { Heading, Flex } from "@chakra-ui/react";
import { Speaker, usePolling } from "@rp/shared";
import SpeakerCard, {
  SpeakerCardSkeleton
} from "@/components/Speakers/SpeakerCard.tsx";
import AddModal from "@/components/Speakers/AddModal.tsx";
import { useOutletContext } from "react-router-dom";
import { MainContext } from "../Main.tsx";

function Speakers() {
  const { authorized } = useOutletContext<MainContext>();
  const {
    data: speakers,
    update: updateSpeakers,
    isLoading
  } = usePolling("/speakers", authorized);

  return (
    <>
      <Flex justifyContent="center" alignItems="center">
        <Heading size="lg">Speakers</Heading>
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
          ? Array.from({ length: 12 }).map((_, index) => (
              <SpeakerCardSkeleton key={index} animation={authorized} />
            ))
          : speakers?.map((speaker: Speaker) => (
              <SpeakerCard
                speaker={speaker}
                updateSpeakers={updateSpeakers}
                key={speaker.speakerId}
              />
            ))}
      </Flex>
      <AddModal updateSpeakers={updateSpeakers} />
    </>
  );
}

export default Speakers;
