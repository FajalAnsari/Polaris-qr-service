import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import back_icon from "../images/back-arrow.svg";
import Waiting from "../images/waiting.gif";

export default function waiting() {
  return (
    <>
    <Navbar/>
    <div class="container p-4 pb-2 mt-5">
    <h5 class="mb-3 mt-3 back-arrow"><Link to={"/details"}><span> <img src={back_icon} alt="" /> Back</span></Link></h5>
        <div class="row">
            <div class="col">
                <div class="checkout text-center">
                    <h4 class="mt-4 mb-3">Waiting for confirmation</h4>
                    <Link to={"/confirmed"}><img src={Waiting} alt="" class="mt-2 waiting-img" /></Link>
                    
                    <div class="row mt-4">
                        <div class="col">
                            <p>Table No. 2</p>
                        </div>
                        <div class="col">
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
