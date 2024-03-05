import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import back_icon from "../images/back-arrow.svg";
import success_img from "../images/success.svg";

export default function waiting() {
  return (
    <>
    <Navbar/>
    <div class="container p-4 pb-2 mt-5">
    <h5 class="mb-3 mt-3 back-arrow"><Link to={"/waiting"}><span> <img src={back_icon} alt="" /> Back</span></Link></h5>
        <div class="row">
            <div class="col">
                <div class="checkout text-center">
                    <div class="checkout-box">
                        <h4 class="mt-5">Your order is confirmed</h4>
                        <p class="tagline">Please wait while we are preparing your food!</p>
                        <img src={success_img} alt="" class="mt-2 waiting-img" />
                        <div class="row mt-4">
                            <div class="col">
                                <p>Table No. 2</p>
                            </div>
                            <div class="col">
                                Order code : 5042
                            </div>
                            <p>Total Amount : 51.00 AED</p>
                        </div>
                    </div>
                    <div class="btn-box d-flex gx-2">
                        <button class="half-btn m-2">View Bill</button>
                        <button onclick="window.location.href = 'pay_qr.html'" class="half-btn m-2">Explore More</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
