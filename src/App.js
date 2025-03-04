import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './components/main/MainPage';
import NavMenu from './components/NavMenu';
import Info from './components/info/Info';
import ModalProvider from './ui/modal/ModalProvider';
import HomePage from './components/main/HomePage';
import SignupPage from './components/user/SignupPage';
import LoginPage from './components/user/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <ModalProvider>
        <NavMenu />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </ModalProvider>
    </BrowserRouter>
  );
}


export default App;