// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import rpLogo from './assets/rp_logo.png'
import "./App.css";
// import axios from 'axios';
import { ChakraProvider, theme } from "@chakra-ui/react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Attendance from "./routes/Attendance";
import routes from "./routes";
import { AuthCallback, googleAuth } from "@rp/shared";
import Main from "./routes/Main";
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
          <Route path="/auth/refresh" element={<RefreshHandler />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route element={<Main />}>
            {routes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
