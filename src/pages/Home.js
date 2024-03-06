import React from 'react';
import {Link } from 'react-router-dom';
import '../pages/pages.css';
import logo_home from "../images/logo.svg";


const Home = () => {
  return (
   <>
    <div className="bg-img">
        <div className="transparent-box ">
            <div className="logo-box">
                <img src={logo_home} alt="Logo" className="logo-img" />
            </div>

            <div className="btn-box-home">
            <Link to="/menu"> <button className="half-btn m-2 w-75 text-white">Pay Now</button></Link>
            <Link to="/menu">   <button className="half-btn m-2 w-75 text-white">View Menu</button></Link>
            </div>
        </div>
    </div>
   
   </>
  );
};

export default Home;
