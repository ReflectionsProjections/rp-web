// src/routes/Home.tsx
import { ExhibitSection } from "@/components/Home/ExhibitSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Home/Header";
import { SponsorSection } from "@/components/Home/SponsorSection";
import { Stats } from "@/components/Home/Stats";
import { TeamSection } from "@/components/Home/TeamSection";

import { Box } from "@chakra-ui/react";

export const Home = () => {
  return (
    <>
      <Box id="home">
        <Header />
      </Box>
      <Box id="exhibits">
        <ExhibitSection />
      </Box>
      <Stats />

      <Box id="team">
        <TeamSection />
      </Box>
      <Box id="sponsors">
        <SponsorSection />
      </Box>
      <Box id="footer">
        <Footer />
      </Box>
    </>
  );
};
