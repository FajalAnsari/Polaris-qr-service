import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import back_icon from "../images/back-arrow.svg";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";


const UserDetails = () => {


  // to get url values
  const params = useParams();
  console.log(params);
  const { location, table_id } = params;
  console.log("Location : ", location);
  console.log("Table : ", location);
    // to get url values end

  

  console.log("Location : ", location);
  console.log("Table : ", table_id);

  const navigate = useNavigate();
  const getdata = useSelector((state) => state.addcartReducer.carts);
  console.log(getdata);
  let prise = 0;
  getdata.map((ele, k) => {
    prise = ele.item_sales_price * ele.item_qoh + prise;
  });

  // setTotalPrice(prise);

  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleMobileNumberChange = (event) => {
    setMobileNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

       // Checking number is filed or not
       if (!name.trim() || !mobileNumber.trim()) {
        setError("Please fill in all the details.");
        return;
      }

    const OrderDetails = [
    {
      table_id: "1",
      loc_code: "GRLBA",
      discount_code: null,
      discount_amount: 10.0,
      delivery_amount: 200.0,
      items:
       [
        getdata.map((item) => ({
          product: item.item_barcode,
          product_name: item.item_name,
          price:item.item_sales_price,
          quantity: item.item_qoh,
              special_request: "",
              modifieritems: [
                
              ]
        }))
      ],
      orderInfo: {
        dining_option: 1,
        payment_type: "",
        notes: "//// Cash On Delivery //// Test from polaris /////Mobile app order id: 73566////",
        source: "mobileapplication",
        customer: {
          full_name: name,
          phone: mobileNumber,
          email: `${name.replace(/\s/g, '').toLowerCase()}${mobileNumber.substring(0, 4)}@gmail.com`,
        },
    totalAmount : prise,
  }
}
  ]
    

    fetch("http://localhost:3031/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(OrderDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data sent successfully:", data);
        navigate('/waiting');
        localStorage.removeItem("cart");
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

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
                  <h6>Please enter your details</h6>
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
                  </div>
                  {error && <div className="text-danger">{error}</div>}
                  <div className="text-center mt-4">
                    <button type="submit" className="checkout-btn">
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
