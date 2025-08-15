import PitStopScene from "@/components/PitStop";
import StoolsSponsors from "@/components/StoolSponsors";
import { Image } from "@chakra-ui/react";

export default function SponsorSection() {
  return (
    <>
      <PitStopScene />
      <StoolsSponsors />
      <Image
        src="/assets/speaker.jpg"
        alt="speaker"
        width="100%"
        height="auto"
        objectFit="cover"
      />
    </>
  );
}
