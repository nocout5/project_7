import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from "react";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import PrivateRoutes from "./utils/PrivateRoutes.jsx";
import Header from "./components/Header.jsx";
import Profile from "./pages/Profile.jsx";
import { createGlobalStyle } from "styled-components";
import colors from "./style/color.js";

const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  box-sizing: border-box;
}

body, html{
  background-color: ${colors.secondary};
  user-select: none;
  min-height: 100vh;
  display: flex;
	align-items: center;
	justify-content: center;
  font-family: 'Lato', sans-serif;
}

a{
  color: black;
  text-decoration: none;
}
`;

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Home />} path="/" exact />
          <Route element={<Profile />} path="profile" exact />
        </Route>
        <Route element={<Login />} path="login" />
      </Routes>
    </BrowserRouter>
  );
}
