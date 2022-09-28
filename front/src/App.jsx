import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from "react";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import PrivateRoutes from "./utils/PrivateRoutes.jsx";
import Register from "./pages/Register.jsx";
import Header from "./components/Header.jsx";
import Profile from "./pages/Profile.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Home />} path="home" exact />
          <Route element={<Profile />} path="profile" exact />
        </Route>
        <Route element={<Login />} path="login" />
        <Route element={<Register />} path="register" />
      </Routes>
    </BrowserRouter>
  );
}
