import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import BlogList from './Component/BlogList/BlogList';
import UserBlogList from './Component/BlogList/UserBlogList';
import AdminBlogList from './Component/BlogList/AdminBlog';
import Login from "./Component/Login/Login";
import Signup from "./Component/Signup/Signup";
import NavBar from "../src/Component/NavBar/NavBar"
import NavBarUser from "../src/Component/NavBar/NavBarUser"
import Profile from "../src/Component/UserProfile/ProfileSetting"
const App = () => {
  const user = localStorage.getItem("token");
  return (
    <BrowserRouter>
    <Routes>
    if(path === "/posts")
    {
      user && <Route path="/posts" exact element={<><NavBar /> <BlogList /></>} />
    }
    else if(path === "/user/posts")
    {
      user && <Route path="/user/posts" exact element={<><NavBarUser /> <UserBlogList /></>} />
    }
    else{
      user && <Route path="/admin/posts" exact element={<><NavBar /> <AdminBlogList /></>} />
    }
			
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/profile" exact element={<><NavBarUser /> <Profile /></>} />
			<Route path="/" element={<Navigate replace to="/posts" />} />
		</Routes>
    </BrowserRouter>
  );
};

export default App;