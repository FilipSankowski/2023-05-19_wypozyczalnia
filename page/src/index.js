import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Error from './pages/Error';
import AdminLayout from './layouts/AdminLayout';
import AdminPage from './pages/AdminPage';
import ProductStats from './pages/ProductStats';
import CustomerStats from './pages/CustomerStats';
import RentalStats from './pages/RentalStats';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='adminPage' element={<AdminLayout />}>
            <Route index element={<AdminPage />} />
            <Route path='productStats' element={<ProductStats />} />
            <Route path='customerStats' element={<CustomerStats />} />
            <Route path='rentalStats' element={<RentalStats />} />
            <Route path='*' element={<Error />} />
          </Route>
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
)
