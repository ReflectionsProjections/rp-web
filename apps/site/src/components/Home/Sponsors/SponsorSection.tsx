import PitStopScene from "@/components/Home/Sponsors/PitStop";
import StoolsSponsors from "@/components/Home/Sponsors/StoolSponsors";
import { Box, Image } from "@chakra-ui/react";

export default function SponsorSection() {
  return (
    <Box id="sponsors">
      <PitStopScene />
      <StoolsSponsors />
      <Image
        src="/sponsors/speaker.jpg"
        alt="speaker"
        width="100%"
        height="auto"
        objectFit="cover"
      />
    </Box>
  );
}
