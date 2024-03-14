import React from 'react'
import Navbar from './Navbar'
import { Link, useNavigate } from 'react-router-dom'
import back_icon from "../images/back-arrow.svg";
import success_img from "../images/success.svg";
//TODO
//add fetch on order id

const Confirmed = ()=>{

    const orderNumber = localStorage.getItem("order_num"); // Assuming order_num stores the order number
    const tableNumber = localStorage.getItem("table_id");
    const locationCode = localStorage.getItem("location");
    const navigate = useNavigate();
    
    const gotoMenu = () =>{
        navigate('/menu')
    }

    const gotoStripe = () => {
        navigate("/stripe");
    }; 
    const gotoViewbill = () => {
        navigate("/menu");
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
                        <h4 className="mt-5">Your order is confirmed</h4>
                        <p className="tagline">Please wait while we are preparing your food!</p>
                        <img src={success_img} alt="" className="mt-2 waiting-img" />
                        <div className="row mt-4">
                            <div className="col">
                                <p>Table No. {tableNumber}</p>
                            </div>
                            <div className="col">
                                Order code : {orderNumber}
                            </div>
                            <p>Total Paid Amount : 51.00 AED</p>
                        </div>
                    </div>
                    <div className="btn-box d-flex gx-2">
                        <button onClick={gotoMenu} className="half-btn m-2">Explore More</button>

                        <button onClick={gotoViewbill} className="half-btn m-2">View Bill</button>

                        <button className="half-btn m-2 pay-now" onClick={gotoStripe}>Pay Now</button>

                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Confirmed;