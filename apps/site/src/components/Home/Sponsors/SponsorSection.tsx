import { Box } from "@chakra-ui/react";
import StoolsSceneWrapper from "./StoolSponsorsWrapper";
import PitStopSceneWrapper from "./PItStopWrapper";

export default function SponsorSection() {
  return (
    <Box id="sponsors">
      <PitStopSceneWrapper />
      <StoolsSceneWrapper />
    </Box>
  );
}
