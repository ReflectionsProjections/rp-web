import { FAQ } from "@/components/Home/FAQ/FAQ";
import Footer from "@/components/Home/Footer/Footer";
import Schedule from "@/components/Home/Schedule/Schedule";
import SponsorSection from "@/components/Home/Sponsors/SponsorSection";
import Description from "../components/Home/Description/Description";
import Landing from "../components/Home/Landing/Landing";
import { Box } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const { hash } = useLocation();

  useEffect(() => {
    const section = document.getElementById(hash.slice(1));
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, [hash]);

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
