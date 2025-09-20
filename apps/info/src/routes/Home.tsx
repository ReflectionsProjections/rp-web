// src/routes/Home.tsx
import { ExhibitSection } from "@/components/Home/ExhibitSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Home/Header";
import { SponsorSection } from "@/components/Home/SponsorSection";
import { Stats } from "@/components/Home/Stats";
import { TeamSection } from "@/components/Home/TeamSection";

export const Home = () => {
  return (
    <>
      <Header />
      <Stats />
      <ExhibitSection />
      <TeamSection />
      <SponsorSection />
      <Footer />
    </>
  );
};
