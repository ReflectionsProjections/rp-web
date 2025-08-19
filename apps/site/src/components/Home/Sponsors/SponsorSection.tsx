import PitStopScene from "@/components/Home/Sponsors/PitStop";
import StoolsSponsors from "@/components/Home/Sponsors/StoolSponsors";
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
