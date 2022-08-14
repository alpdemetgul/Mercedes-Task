import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import CarTable from './CarTable/MainPage/CarTable';
import EditPage from './CarTable/EditPage/EditPage';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<CarTable />} />
        <Route path="/Car/:id" element={<EditPage />} />
      </Routes>
    </BrowserRouter>
      </React.StrictMode>
);

reportWebVitals();
