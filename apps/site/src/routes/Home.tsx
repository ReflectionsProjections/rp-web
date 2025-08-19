import Landing from "../components/Home/Landing/Landing";
import Description from "../components/Home/Landing/Description";
import { FAQ } from "@/components/Home/FAQ/FAQ";
import Schedule from "@/components/Home/Schedule/Schedule";
import Footer from "@/components/Home/Footer/Footer";

const Home = () => {
  return (
    <>
      <Landing />
      <Description />
      <Schedule />
      <FAQ />
      <Footer />
    </>
  );
};

export default Home;
