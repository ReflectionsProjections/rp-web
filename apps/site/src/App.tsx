import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import theme from "./theme";
import Register from "./routes/Register";
import { getRequireAuth } from "@rp/shared";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {...getRequireAuth({
            children: [
              <Route key="/register" path="/register" element={<Register />} />
            ]
          })}
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
