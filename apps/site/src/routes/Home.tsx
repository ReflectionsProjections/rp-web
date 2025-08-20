import { FAQ } from "@/components/Home/FAQ/FAQ";
import Footer from "@/components/Home/Footer/Footer";
import Schedule from "@/components/Home/Schedule/Schedule";
import SponsorSection from "@/components/Home/Sponsors/SponsorSection";
import Description from "../components/Home/Description/Description";
import Landing from "../components/Home/Landing/Landing";

const Home = () => {
  return (
    <>
      <Landing />
      <Description />
      <Schedule />
      <FAQ />
      <SponsorSection />
      <Footer />
    </>
  );
};

export default Home;
