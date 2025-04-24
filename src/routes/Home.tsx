// src/routes/Home.tsx
import { Header } from "../pages/Home/Header";
import { Box } from "@chakra-ui/react";
import FoldableFAQ from "../components/Foldable";

export const Home = () => {
  return (
    <>
      <Header />
      <Box minH="calc(100vh - headerHeight)">
        {" "}
        {/* Adjust headerHeight to your header's actual height */}
        <FoldableFAQ />
      </Box>
    </>
  );
};
