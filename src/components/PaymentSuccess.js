import React from 'react'
import Navbar from './Navbar'
import { Link, useNavigate } from 'react-router-dom'
import back_icon from "../images/back-arrow.svg";
import success_img from "../images/success.svg";
import ViewBill from './ViewBill';
//TODO
//add fetch on order id

const PaymentSuccess = ()=>{
    const navigate = useNavigate();
    
    const gotoMenu = () =>{
        navigate('/menu')
    }

    const gotoStripe = () => {
        navigate("/stripe");
    };
    const viewbill = () => {
        navigate("/viewbill");
    };
    
  return (
    <>
    <Navbar/>
    <div className="container p-4 pb-2 mt-5">
    <h5 className="mb-3 mt-3 back-arrow"><Link to={"/menu"}><span> <img src={back_icon} alt="" /> Back</span></Link></h5>
        <div className="row">
            <div className="col">
                <div className="checkout text-center">
                    <div className="checkout-box">
                    <img src={success_img} alt="" className="mt-3 waiting-img" />
                        <h4 className="mt-5">Payment Succeeded!</h4>
                        <p className="tagline">We are happy to serve you  </p>
                    </div>
                    <div className="btn-box d-flex gx-2">
                        <button onClick={viewbill} className="half-btn m-2 w-100">View Bill</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default PaymentSuccess;