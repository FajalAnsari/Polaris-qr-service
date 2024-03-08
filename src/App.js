import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import CheckOut from './components/AddCheckout';
import UserDetails from './components/user_details';
import Waiting from './components/waiting';
import Confirmed from './components/confirmed';
import TestuseParam from './components/TestuseParam';
import Default from './pages/default';
import Stripe from './components/Stripe';

const App = () => {

  const directory_name = '/build';

  return (
    <Router basename={directory_name}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/details" element={<UserDetails />} />
        <Route path="/waiting" element={<Waiting />} />
        <Route path="/confirmed" element={<Confirmed />} />
        <Route path="/testuseparam" element={<TestuseParam />} />
        <Route path="/stripe" element={<Stripe />} />
        <Route path="*" element={<Default/>} />
      </Routes>
    </Router>
  );
};

export default App;