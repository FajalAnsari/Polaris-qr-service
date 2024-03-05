import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import CheckOut from './components/AddCheckout';
import User_details from './components/user_details';
import Waiting from './components/waiting';
import Confirmed from './components/confirmed';
import Default from './pages/default';

const App = () => {

  
  const directory_name = '/build';

  return (
    <Router basename={directory_name}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/details" element={<User_details />} />
        <Route path="/waiting" element={<Waiting />} />
        <Route path="/confirmed" element={<Confirmed />} />
        <Route path="*" element={<Default/>} />
      </Routes>
    </Router>
  );
};

export default App;