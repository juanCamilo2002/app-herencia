import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import LoginPage from './features/auth/pages/LoginPage';
import Privateroute from './components/PrivateRoute';
import { useSelector } from 'react-redux';
import Dashboard from './features/dashboard/pages/Dashboard';
import NotFoundPage from './features/not-found/pages/NotFoundPage';
import ForgotPasswordPage from './features/auth/pages/ForgotPasswordPage';
import DefaultLayout from './layout/DefaultLayout';
import Sales from './features/sales/pages/Sales';
import CustomersPage from './features/customers/pages/CustomersPage';
import SellersPage from './features/sellers/pages/SellersPage';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route element={<Privateroute isAuthenticated={isAuthenticated} />}>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path='/sales' element={<Sales />} />
            <Route path='/customers' element={<CustomersPage/>} />
            <Route path='/sellers' element={<SellersPage/>} />

          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
