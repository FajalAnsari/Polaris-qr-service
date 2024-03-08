import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import back_icon from "../images/back-arrow.svg";
import Waiting from "../images/waiting.gif";

export default function waiting() {
  return (
    <>
    <Navbar/>
    <div className="container p-4 pb-2 mt-5">
    <h5 className="mb-3 mt-3 back-arrow"><Link to={"/details"}><span> <img src={back_icon} alt="" /> Back</span></Link></h5>
        <div className="row">
            <div className="col">
                <div className="checkout text-center">
                    <h4 className="mt-4 mb-3">Waiting for confirmation</h4>
                    <Link to={"/confirmed"}><img src={Waiting} alt="" className="mt-2 waiting-img" /></Link>
                    
                    <div className="row mt-4">
                        <div className="col">
                            <p>Table No. 2</p>
                        </div>
                        <div className="col">
                            Order code :  5042
                        </div>
                        <p>Total Amount : 51.00 AED</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
