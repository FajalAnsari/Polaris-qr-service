import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import back_icon from "../images/back-arrow.svg";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { addParamsToUrl } from "../helper/addParamsToUrl";

const UserDetails = () => {
  const navigate = useNavigate();
  const getdata = useSelector((state) => state.addcartReducer.carts);
  let prise = 0;
  getdata.map((ele, k) => {
    prise = ele.item_sales_price * ele.item_qoh + prise;
  });

  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [nameError, setNameError] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
    localStorage.setItem("name", value);
    setName(value);
    if (value.trim() === "" || /\d/.test(value)) {
      setNameError("Please enter a valid name");
    } else {
      setNameError("");
    }
  };

  const handleMobileNumberChange = (event) => {
    const value = event.target.value;
    setMobileNumber(value);
  localStorage.setItem("mobileNumber", value);
    setMobileNumber(value);
    if (!/^\d{10}$/.test(value)) {
      setMobileNumberError("Please enter a 10-digit mobile number");
    } else {
      setMobileNumberError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (name.trim() === "" || /\d/.test(name)) {
      setNameError("Please enter a valid name");
      return;
    }

    if (!/^\d{10}$/.test(mobileNumber)) {
      setMobileNumberError("Please enter a 10-digit mobile number");
      return;
    }

    const OrderDetails = {
      customer_phone: mobileNumber,
      customer_name: name,
      delivery_amount: 200,
      items: getdata.map((item) => ({
        product: item.item_sku,
        product_name: item.item_name,
        price: item.item_sales_price,
        quantity: item.item_qoh,
        special_request: "nothing",
        is_printed  : 0,
      })),
    };

    const url = addParamsToUrl(`${process.env.REACT_APP_API_URL}order`);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(OrderDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data sent successfully:", data);
        localStorage.removeItem("cart");
        localStorage.setItem("order_num", data);
        navigate("/confirmed");
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedMobileNumber = localStorage.getItem("mobileNumber");
  
    if (storedName) {
      setName(storedName);
    }
  
    if (storedMobileNumber) {
      setMobileNumber(storedMobileNumber);
    }
  }, []);
  
  return (
    <>
      <Navbar />
      <div className="container p-4 pb-2 mt-5">
        <h5 className="mb-3 mt-3 back-arrow">
          <Link to={"/checkout"}>
            <span>
              {" "}
              <img src={back_icon} alt="" /> Back
            </span>
          </Link>
        </h5>
        <div className="row">
          <div className="col">
            <div className="checkout">
              <div className="row">
                <form onSubmit={handleSubmit}>
                  <h6>Please enter your name and mobile number</h6>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control p-3 mb-2 mt-3"
                      id="NameInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter your name"
                      value={name}
                      onChange={handleNameChange}
                    />
                    {nameError && <div className="text-danger">{nameError}</div>}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control p-3 mt-2"
                      id="exampleInputNumber"
                      placeholder="Enter mobile number"
                      value={mobileNumber}
                      onChange={handleMobileNumberChange}
                    />
                    {mobileNumberError && <div className="text-danger">{mobileNumberError}</div>}
                  </div>
                  <div className="text-center mt-4">
                    <button type="submit" className="checkout-btn" disabled={nameError || mobileNumberError}>
                      Place Order
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
