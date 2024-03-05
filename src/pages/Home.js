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
                <button className="half-btn m-2 w-75"><Link to="/menu">Pay Now</Link></button>
                <button className="half-btn m-2 w-75"><Link to="/menu">View Menu</Link></button>
            </div>
        </div>
    </div>
   
   </>
  );
};

export default Home;
