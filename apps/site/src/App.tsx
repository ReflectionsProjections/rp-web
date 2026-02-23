import { Box, ChakraProvider, Link, VStack } from "@chakra-ui/react";
import { AuthCallback, googleAuth, RequireAuth } from "@rp/shared";
import { useEffect, useMemo } from "react";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useLocation
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import { Profile } from "./routes/Profile";
import Register from "./routes/Register";
import Resume from "./routes/Resume";
import Speakers from "./routes/Speakers/Speakers";
import theme from "./theme";
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
            <Route key="/profile" path="/profile" element={<Profile />} />
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
      <Box
        w="100%"
        bg="yellow.400"
        py="8px"
        px={4}
        textAlign="center"
        fontFamily="magistral"
        fontWeight="bold"
        fontSize={{ base: "sm", xl: "md" }}
        color="gray.900"
        letterSpacing="wide"
        zIndex={16}
        position="relative"
      >
        <Link
          href="https://docs.google.com/forms/d/e/1FAIpQLSdRfU2T4qJDBKvHDWvMLKufP8iJ6zSfq6hhypPxVHPvr2S8xA/viewform"
          isExternal
          color="gray.900"
          _hover={{ textDecoration: "underline", color: "gray.700" }}
        >
          R|P 2026 staff applications are now open! Click here to apply! 🎉
        </Link>
      </Box>
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
