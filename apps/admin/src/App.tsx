// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import rpLogo from './assets/rp_logo.png'
// import viteLogo from '/vite.svg'
import './App.css';
// import axios from 'axios';
import {ChakraProvider, theme} from "@chakra-ui/react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Auth from "./routes/Auth";
import Login from "./routes/Login";
import Home from "./routes/Home";
import Attendance from "./routes/Attendance";
import Unauthorized from './routes/Unauthorized';
import ProtectedRoute from "./routes/ProtectedRoute";


function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/auth/" element={<Auth/>}> </Route>
          <Route path="/unauthorized/" element={<Unauthorized/>}/>
          <Route element={<ProtectedRoute/>}>
            <Route path="/home/" element={<Home/>}/>
            <Route path="/attendance/" element={<Attendance/>}/>
            <Route path="*"/>
          </Route>
          <Route path="/" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
