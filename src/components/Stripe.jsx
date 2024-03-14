import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import Navbar from "./Navbar";
import back_icon from "../images/back-arrow.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import '../App.css';


export default function Stripe() {
  const [totalAmount, setTotalAmount] = useState(0);

  const getdata = useSelector((state) => state.addcartReducer.carts);
  const [clientSecret, setClientSecret] = useState("");
  const stripePromise = loadStripe(
    "pk_test_51OmCPzHZa7lfCwll2jacxY11BJbe8codoygmK7TXXJeKHOmU50osVylEIh2sasdkSXdD349JjPxedEcARC7LhCFW00MfqEkBPG"
  );

  useEffect(() => {
    let total = 0;
    getdata.forEach((item) => {
      total += item.item_sales_price * item.item_qoh;
    });
    setTotalAmount(total);
  }, [getdata]);


  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    //todo: change url
    fetch("http://192.168.0.12/liblib/branch_setup/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_no: localStorage.getItem("order_num"),
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <Navbar className="mb-5" />
      <div className="container p-4 pb-2 mt-5">
        <h5 className="mb-3 mt-3 back-arrow">
          <Link to={"/menu"}>
            <span>
              {" "}
              <img src={back_icon} alt="" /> Back
            </span>
          </Link>
        </h5>
        <div className="row">
          <div className="col">
            <div className="App stripe-payment">
              {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              )}
             <p>Total ammout in AED: {totalAmount}</p>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
