import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Main from "./Main";
import { fetchDragDrop } from "../store/dragdrop";
import { useDispatch } from "react-redux";

const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDragDrop());
  }, []);

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
