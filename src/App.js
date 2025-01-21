import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './components/main/MainPage';
import NavMenu from './components/NavMenu';
import Info from './components/info/Info';
import ModalProvider from './ui/modal/ModalProvider';

function App() {

  return (
    <BrowserRouter>
      <ModalProvider>
        <NavMenu />
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </ModalProvider>
    </BrowserRouter>
  );
}

export default App;