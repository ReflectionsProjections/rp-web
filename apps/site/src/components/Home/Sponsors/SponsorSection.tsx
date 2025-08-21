import { Box } from "@chakra-ui/react";
import PitStopSceneWrapper from "./PItStopWrapper";
import StoolsSceneWrapper from "./StoolSponsorsWrapper";

export default function SponsorSection() {
  return (
    <Box id="sponsors">
      <PitStopSceneWrapper />
      <StoolsSceneWrapper />
    </Box>
  );
}
