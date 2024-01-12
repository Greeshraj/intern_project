import './pages/About/aboutnew';
import React from 'react';
import './App.css';
import HomeNew from './pages/Homepage/HomepageNew'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignIn_New/SignUp';
import SignIn from './pages/SignIn_New/SignIn';
import Profile from './pages/Profile/Profile';
import { useEffect, useState } from "react";
import Api from './API/Api';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    };
    fetch(`Api/user/login_check`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        // setUser(data.user);
        setLoading(false);
      })
      .catch((err) => { console.log(err); localStorage.removeItem('token'); })
      .finally(() => setLoading(false));
  }
 
  , []);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeNew />} />
        <Route path='/SignUp' getMessage={({ params }) => params.message} element={<SignUp />} />
        <Route path='/SignIn' element={<SignIn />} />
        <Route path='/Profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
