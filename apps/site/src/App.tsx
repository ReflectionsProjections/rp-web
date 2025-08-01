import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import theme from "./theme";
import Register from "./routes/Register";
import { getRequireAuth, googleAuth } from "@rp/shared";
import { useEffect } from "react";

function RefreshHandler() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect");
    googleAuth(false, redirect ?? undefined);
  }, []);

  return <p>Redirecting to login...</p>;
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/refresh" element={<RefreshHandler />} />
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
