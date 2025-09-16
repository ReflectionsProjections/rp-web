import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useLocation
} from "react-router-dom";
import Home from "./routes/Home";
import Register from "./routes/Register";
import { AuthCallback, googleAuth, RequireAuth } from "@rp/shared";
import { useEffect, useMemo } from "react";
import Resume from "./routes/Resume";
import { Box, ChakraProvider, VStack } from "@chakra-ui/react";
import theme from "./theme";
import Navbar from "./components/Navbar";
import Speakers from "./routes/Speakers/Speakers";
import AppScreen from "./routes/AppScreen";
import NotFound from "./routes/NotFound";

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
          <Route element={<Main />}>
            <Route path="/" element={<Home />} />
            <Route path="/speakers" element={<Speakers />} />
            <Route path="/app" element={<AppScreen />} />
            <Route element={<RequireAuth />}>
              <Route key="/register" path="/register" element={<Register />} />
            </Route>
          </Route>
          <Route element={<RequireAuth />}>
            <Route key="/resume" path="/resume" element={<Resume />} />
          </Route>
          <Route path="/auth/refresh" element={<RefreshHandler />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

const FLUSH_ROUTES = ["/register"];

function Main() {
  const { pathname } = useLocation();

  const isFlush = useMemo(() => FLUSH_ROUTES.includes(pathname), [pathname]);

  return (
    <VStack
      w="100%"
      h="100dvh"
      position="relative"
      zIndex={9}
      gap={0}
      backgroundColor="#100e0e"
      overflowY={isFlush ? undefined : "scroll"}
      sx={{
        scrollbarWidth: "thin",
        scrollbarColor: "#888 transparent",
        scrollbarGutter: "stable",
        "&::-webkit-scrollbar": {
          width: "8px"
        },
        "&::-webkit-scrollbar-track": {
          background: "none"
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#888",
          borderRadius: "8px"
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#555"
        }
      }}
    >
      <Navbar isFlush={isFlush} />
      <Box
        w="100%"
        h="100%"
        position="relative"
        overflowY={isFlush ? "hidden" : undefined}
      >
        <Outlet />
      </Box>
    </VStack>
  );
}

export default App;
