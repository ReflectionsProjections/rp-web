import Landing from "../components/Home/Landing/Landing";
import Description from "../components/Home/Description/Description";
import { FAQ } from "@/components/Home/FAQ/FAQ";
import Schedule from "@/components/Home/Schedule/Schedule";
import Footer from "@/components/Home/Footer/Footer";
import SponsorSection from "@/components/Home/Sponsors/SponsorSection";

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
