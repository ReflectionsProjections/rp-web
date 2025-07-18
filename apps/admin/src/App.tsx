// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import rpLogo from './assets/rp_logo.png'
// import viteLogo from '/vite.svg'
import "./App.css";
// import axios from 'axios';
import { ChakraProvider, theme } from "@chakra-ui/react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Attendance from "./routes/Attendance";
import routes from "./routes";
import { AuthCallback } from "@rp/shared";
import api from "./util/api";
import Main from "./routes/Main";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/auth/callback" element={<AuthCallback api={api} />} />
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
