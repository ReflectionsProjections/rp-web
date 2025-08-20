import { FAQ } from "@/components/Home/FAQ/FAQ";
import Footer from "@/components/Home/Footer/Footer";
import Schedule from "@/components/Home/Schedule/Schedule";
import SponsorSection from "@/components/Home/Sponsors/SponsorSection";
import Description from "../components/Home/Description/Description";
import Landing from "../components/Home/Landing/Landing";
import { Box } from "@chakra-ui/react";

const Home = () => {
  return (
    <Box bg="#100E0E">
      <Landing />
      <Description />
      <Schedule />
      <FAQ />
      <SponsorSection />
      <Footer />
    </Box>
  );
};

export default Home;
