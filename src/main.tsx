import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Register, Login, Select, Exterior } from './pages';
import './scss/main.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/select' element={<Select />} />
        <Route path='/configure/exterior/:year/:model' element={<Exterior />} />
      </Routes>
    </BrowserRouter>
  </RecoilRoot>
);
