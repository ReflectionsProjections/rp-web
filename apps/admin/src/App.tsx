// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import rpLogo from './assets/rp_logo.png'
// import viteLogo from '/vite.svg'
import "./App.css";
// import axios from 'axios';
import { ChakraProvider, theme } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./routes/Login";
import Home from "./routes/Home";
import Attendance from "./routes/Attendance";
import Unauthorized from "./routes/Unauthorized";
import { AuthCallback, Config, RequireAuth } from "@rp/shared";
import api from "./util/api";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/unauthorized/" element={<Unauthorized />} />
          <Route path="/auth/callback" element={<AuthCallback api={api} />} />
          <Route
            element={
              <RequireAuth
                api={api}
                clientId={Config.GOOGLE_OAUTH_CLIENT_ID}
                requiredRoles={["STAFF"]}
              />
            }
          >
            <Route path="/home/" element={<Home />} />
            <Route path="/attendance/" element={<Attendance />} />
            <Route path="*" />
          </Route>
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
