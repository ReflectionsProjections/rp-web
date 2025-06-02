// src/routes/Home.tsx
import { ExhibitSection } from "../pages/Home/ExhibitSection";
import { Header } from "../pages/Home/Header";
import Stats from "../pages/Home/Stats";

export const Home = () => {
  return (
    <>
      <Header />
      <Stats />
      <ExhibitSection />
    </>
  );
};
