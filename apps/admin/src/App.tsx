// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import rpLogo from './assets/rp_logo.png'
// import viteLogo from '/vite.svg'
import "./App.css";
// import axios from 'axios';
import { ChakraProvider, theme } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./routes/Login";
import Attendance from "./routes/Attendance";
import Unauthorized from "./routes/Unauthorized";
import routes from "./routes";
import { AuthCallback, Config, RequireAuth } from "@rp/shared";
import api from "./util/api";
import Main from "./routes/Main";

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
              >
                <Main />
              </RequireAuth>
            }
          >
            <Route path="/attendance/" element={<Attendance />} />
            {routes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
