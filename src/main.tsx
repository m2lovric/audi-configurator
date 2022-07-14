import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import App from './App';
import { Exterior, Interior, Login, Register, Select, Summary } from './pages';
import './scss/main.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/select' element={<Select />} />
        <Route
          path='/configure/exterior/:year/:model/:id'
          element={<Exterior />}
        />
        <Route
          path='/configure/exterior/:year/:model/'
          element={<Exterior />}
        />
        <Route
          path='/configure/interior/:year/:model/:id'
          element={<Interior />}
        />
        <Route
          path='/configure/interior/:year/:model/'
          element={<Interior />}
        />
        <Route
          path='/configure/summary/:year/:model/:id'
          element={<Summary />}
        />
        <Route path='/configure/summary/:year/:model/' element={<Summary />} />
      </Routes>
    </BrowserRouter>
  </RecoilRoot>
);
