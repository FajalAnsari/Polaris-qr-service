import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";


// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.

export default function Stripe() {
  const [clientSecret, setClientSecret] = useState("");
  const stripePromise = loadStripe("pk_test_51OmCPzHZa7lfCwll2jacxY11BJbe8codoygmK7TXXJeKHOmU50osVylEIh2sasdkSXdD349JjPxedEcARC7LhCFW00MfqEkBPG");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    //todo: change url
    fetch("http://192.168.0.12/liblib/branch_setup/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" } ,
        body: JSON.stringify({
          order_no: localStorage.getItem('order_num')
        })
      })
      .then((res) => res.json())  
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}