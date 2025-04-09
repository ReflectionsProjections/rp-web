// src/routes/Home.tsx
import { Header } from "../pages/Home/Header";

import CircularCarousel from "../components/Carousel";
import { Box, Spacer } from "@chakra-ui/react";

const teamSections = [
  { title: "OPERATIONS", image: "/images/operations-team.jpg" },
  { title: "DESIGN", image: "/images/design-team.jpg" },
  { title: "DEV", image: "/images/dev-team.jpg" },
  { title: "CONTENT", image: "/images/content-team.jpg" },
  { title: "MARKETING", image: "/images/marketing-team.jpg" },
];

export const Home = () => {
  return (
    <>
      <Header />
      <Box>
        <CircularCarousel items={teamSections} />
        <Spacer h="100px" />
      </Box>
    </>
  );
};
