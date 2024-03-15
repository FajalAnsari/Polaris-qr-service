import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import back_icon from "../images/back-arrow.svg";
import { Link } from "react-router-dom";

function ViewBill() {
  const orderNumber = localStorage.getItem("order_num");
  const tableNumber = localStorage.getItem("table_id");
  const locationCode = localStorage.getItem("location");
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}order?location=${locationCode}&table_id=${tableNumber}&order_no=${orderNumber}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => setOrderDetails(data))
      .catch((error) => console.log("failed to load :", error));
  }, [orderNumber]);
  console.log(orderDetails);

  return (
    <>
      <Navbar />
      <div className="container p-4 pb-2 mt-5">
        <h5 className="mb-3 mt-3 back-arrow">
          <Link to={"/menu"}>
            <span>
              <img src={back_icon} alt="" /> Back
            </span>
          </Link>
        </h5>
        <div className="row">
          <div className="col">
            <div className="checkout">
              <div className="row">
                <div className="col-4">
                  Order No. <b>{orderNumber}</b>
                </div>
                <div className="col-4 text-center">
                  Table No. <b>{tableNumber}</b>
                </div>
                <div className="col-4 text-center">
                  Location: <b> {locationCode}</b>
                </div>
              </div>
              <hr className="ms-3" />
              {orderDetails ? (
                <div>
                  <ul>
                    {orderDetails.items.map((item) => (
                      <li key={item.id}>
                        {item.description} - Qty: {item.quantity} - Price:{" "}
                        {item.unit_price}
                      </li>
                    ))}
                  </ul>
                  <hr className="ms-3" />
              <div className="row mx-auto">
                <div className="col-9">
                  <h6>Sub-Total</h6>
                </div>
                <div className="col-3 crt-price text-center">
                  <p>54</p>
                </div>
              </div>
              <div className="row mx-auto">
                <div className="col-9">
                  <p>Vat 0%</p>
                </div>
                <div className="col-3 crt-price text-center">
                  <p>0</p>
                </div>
              </div>
              <div className="row mx-auto">
                <div className="col-9">
                  <p>Disscount 0%</p>
                </div>
                <div className="col-3 crt-price text-center">
                  <p>0</p>
                </div>
              </div>
              <hr className="ms-3" />
              <div className="row mx-auto">
                <div className="col-9">
                  <h5>Total</h5>
                </div>
                <div className="col-3 crt-price text-center">
                  <h5>5</h5>
                </div>
              </div>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewBill;
