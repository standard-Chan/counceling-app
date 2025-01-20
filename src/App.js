import React from 'react';
import { BrowserRouter as Router, Route, Switch, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import AppLayout from './components/AppLayout';
import MainPage from './components/main/MainPage';
import NavMenu from './components/NavMenu';
import Info from './components/info/Info';

function App() {
  return (
    <BrowserRouter>
        <NavMenu />
        <Routes>
          <Route path="/main" element={<MainPage/>} />
          <Route path="/info" element={<Info/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;