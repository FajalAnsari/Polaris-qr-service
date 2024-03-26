import "../App.css";
import Navbar from "./Navbar";
import React, { useEffect, useState } from "react";
import plus_icon from "../images/plus.svg";
import minus_icon from "../images/minus.svg";
import back_icon from "../images/back-arrow.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE, ADD } from "../redux/action/action";
import { parse } from "path-browserify";

export default function AddCheckout() {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.addcartReducer.carts);
  let getdata = [];
  if(cartData){
    getdata = cartData.map(item=>{
      let price = Number(item.item_sales_price);
      if(item.modifieritems){
        price += item.modifieritems.reduce((acc,mod)=>acc+Number(mod.modifier_price),0); 
      }
      item.total_price = price * item.item_qoh;
      console.log(item);
      return item;
    })
  }


  const [price, setPrice] = useState(0);
  const [cart, setCart] = useState("");

  const send = (e) => {
    dispatch(ADD(e));
  };



  const remove = (item) => {
    dispatch(REMOVE(item));
  };

  const total = () => {
    setPrice(getdata.reduce((acc,item)=>acc+item.total_price,0));
  };

  useEffect(() => {
    total();
    const storedCart = localStorage.getItem('cart');
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
                            <p>{e.item_name} <li className="d-block modifier-items"> </li></p>      
                          </div>
                          <div className="col-3 text-center">
                            <div className="count ">
                              <div className="d-flex justify-content-between align-items-center px-2">
                                <span
                                  style={{ cursor: "pointer" }}
                                  onClick={ () => remove(e) }
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
                            <p>{e.total_price}</p>
                          </div>
                          { e.modifieritems && e.modifieritems.map((mod)=>{
                              return (
                                <>
                                <div className="col-1"></div>
                                <div className="col-11">
                                    <p>{mod.modifier_name} ({mod.modifier_price})</p>      
                                </div>
                                </>
                              );
                            })
                          }
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
                  <p>{price}</p>
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
                  <h5>{price}</h5>
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
