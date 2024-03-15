import "../App.css";
import Navbar from "./Navbar";
import React, { useEffect, useState } from "react";
import plus_icon from "../images/plus.svg";
import minus_icon from "../images/minus.svg";
import back_icon from "../images/back-arrow.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DLT, REMOVE, ADD } from "../redux/action/action";

export default function AddCheckout() {
  const dispatch = useDispatch();

  const getdata = useSelector((state) => state.addcartReducer.carts);

  const [prise, setPrise] = useState(0);
  const [cart, setCart] = useState("");

  const send = (e) => {
    dispatch(ADD(e));
  };

  const dlt = (id) => {
    dispatch(DLT(id));
  };

  const remove = (item) => {
    dispatch(REMOVE(item));
  };

  const total = () => {
    let prise = 0;
    getdata.map((ele, k) => {
      prise = ele.item_sales_price * ele.item_qoh + prise;
    });
    setPrise(prise);
  };

  useEffect(() => {
    total();
    const storedCart = localStorage.getItem('cart');
    // if(storedCart){
    //   console.log(JSON.parse(storedCart));
    //   setCart(JSON.parse(storedCart));
    
    // }
    
  }, [total]);

  return (
    <>
      <Navbar />
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
            <div className="checkout">
              <div className="row">
              <div className="col-6">
                Items
              </div>
              <div className="col-3 text-center">
                Qty
              </div>
              <div className="col-3 text-center">
                Price
              </div>
              </div>
             
            <hr className="ms-3" />
            
              {getdata.length == 0
                ?  <p className="text-center">No item found in cart, Add Now!</p>
                : getdata.map((e) => {
                    return (
                      <>
                        <div className="row mx-auto"> 
                          <div className="col-6">
                            <p>{e.item_name}</p>
                          </div>
                          <div className="col-3 text-center">
                            <div className="count ">
                              <div className="d-flex justify-content-between align-items-center px-2">
                                <span
                                  style={{ cursor: "pointer" }}
                                  onClick={
                                    e.item_qoh <= 1
                                      ? () => dlt(e.item_sku)
                                      : () => remove(e)
                                  }
                                >
                                  <img src={minus_icon} />
                                </span>
                                <span>{e.item_qoh}</span>
                                <span
                                  style={{ cursor: "pointer" }}
                                  onClick={() => send(e)}
                                >
                                  <img src={plus_icon} className="clickhere" />
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-3 crt-price text-center">
                            <p>{e.item_sales_price * e.item_qoh}</p>
                          </div>
                        </div>
                      </>
                    );
                  })}

              <hr className="ms-3" />
              <div className="row mx-auto">
                <div className="col-9">
                  <h6>Sub-Total</h6>
                </div>
                <div className="col-3 crt-price text-center">
                  <p>{prise}</p>
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
                  <h5>{prise}</h5>
                </div>
              </div>

              <div></div>
              <div className="text-center mt-3">
                <Link button to={"/details"}>
                  <button className="checkout-btn">Place Order</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
