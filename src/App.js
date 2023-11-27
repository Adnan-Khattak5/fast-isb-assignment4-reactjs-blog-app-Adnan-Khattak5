import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import BlogList from './Component/BlogList/BlogList';
import Login from "./Component/Login/Login";
import Signup from "./Component/Signup/Signup";
import NavBar from "../src/Component/NavBar/NavBar"
const App = () => {
  const user = localStorage.getItem("token");
  return (
    <BrowserRouter>
    <Routes>
			{user && <Route path="/posts" exact element={<><NavBar /> <BlogList /></>} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/posts" />} />
		</Routes>
    </BrowserRouter>
  );
};

export default App;