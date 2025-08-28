import { ChakraProvider, Text, theme } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Text>Hello World!</Text>} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
