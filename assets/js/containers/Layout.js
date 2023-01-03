import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Main from "./Main";

const Layout = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Layout;
