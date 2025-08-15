import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import theme from "./theme";
import SponsorSection from "./routes/Sponsor";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sponsors" element={<SponsorSection />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
