// import React, { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import back_icon from "../images/back-arrow.svg";
// import { Link } from "react-router-dom";
// import "../App.css";

// function ViewBill() {
//   const orderNumber = localStorage.getItem("order_num");
//   const tableNumber = localStorage.getItem("table_id");
//   const locationCode = localStorage.getItem("location");
//   const [orderDetails, setOrderDetails] = useState(null);

//   useEffect(() => {
//     const url = `${process.env.REACT_APP_API_URL}order?location=${locationCode}&table_id=${tableNumber}&order_no=${orderNumber}`;

//     fetch(url)
//       .then((response) => response.json())
//       .then((data) => setOrderDetails(data))
//       .catch((error) => console.log("failed to load :", error));
//   }, [orderNumber]);

//   const calculateTotal = () => {
//     if (!orderDetails || !orderDetails.items) return 0;

//     return orderDetails.items.reduce(
//       (acc, item) => acc + item.quantity * item.unit_price,
//       0
//     );
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="container p-4 pb-2 mt-5">
//         <h5 className="mb-3 mt-3 back-arrow">
//           <Link to={"/menu"}>
//             <span>
//               <img src={back_icon} alt="" /> Back
//             </span>
//           </Link>
//         </h5>
//         <div className="row">
//           <div className="col">
//             <div className="checkout">
//               <div className="row">
//                 <div className="col-4">
//                   Order No. <b>{orderNumber}</b>
//                 </div>
//                 <div className="col-4 text-center">
//                   Table No. <b>{tableNumber}</b>
//                 </div>
//                 <div className="col-4 text-center">
//                   Location: <b> {locationCode}</b>
//                 </div>
//               </div>
//               <hr className="ms-3" />
//               <div className="row">
//                 <div className="col-4">
//                   Item description here
//                 </div>
//                 <div className="col-4">
//                   Item quanitty here
//                 </div>
//                 <div className="col-4">
//                   Price Item price here
//                 </div>
//               </div>
//               {orderDetails ? (
//                 <div>
//                   <ul className="items-list">
//                     {orderDetails.items.map((item) => (
//                       <li key={item.id} className="order-item">
//                         <span className="description">{item.description}</span>
//                         <span className="quantity">Qty: {item.quantity}</span>
//                         <span className="price">Price: {item.unit_price}</span>
//                       </li>
//                     ))}
//                   </ul>
//                   <hr className="ms-3" />
//                   <div className="row mx-auto">
//                     <div className="col-9">
//                       <h6>Sub-Total</h6>
//                     </div>
//                     <div className="col-3 crt-price text-center">
//                       <p>{calculateTotal()}</p>
//                     </div>
//                   </div>
//                   <div className="row mx-auto">
//                     <div className="col-9">
//                       <p>Vat 0%</p>
//                     </div>
//                     <div className="col-3 crt-price text-center">
//                       <p>0</p>
//                     </div>
//                   </div>
//                   <div className="row mx-auto">
//                     <div className="col-9">
//                       <p>Disscount 0%</p>
//                     </div>
//                     <div className="col-3 crt-price text-center">
//                       <p>0</p>
//                     </div>
//                   </div>
//                   <hr className="ms-3" />
//                   <div className="row mx-auto">
//                     <div className="col-9">
//                       <h5>Total</h5>
//                     </div>
//                     <div className="col-3 crt-price text-center">
//                       <h5>{calculateTotal()}</h5>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <p>Loading...</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ViewBill;



import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import back_icon from "../images/back-arrow.svg";
import { Link } from "react-router-dom";
import "../App.css";

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

  const calculateTotal = () => {
    if (!orderDetails || !orderDetails.items) return 0;

    return orderDetails.items.reduce(
      (acc, item) => acc + item.quantity * item.unit_price,
      0
    );
  };

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
                  <ul className="items-list">
                    {orderDetails.items.map((item) => (
                      <li key={item.id} className="order-item">
                        <div className="row"> {/* Added row for each item */}
                          <div className="col-6">
                            <p className="description">{item.description}</p>
                          </div>
                          <div className="col-3">
                            <p className="quantity">Qty: {item.quantity}</p>
                          </div>
                          <div className="col-3">
                            <p className="price">Price: {item.unit_price}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <hr className="ms-3" />
                  <div className="row mx-auto">
                    <div className="col-9">
                      <h6>Sub-Total</h6>
                    </div>
                    <div className="col-3 crt-price text-center">
                      <p>{calculateTotal()}</p>
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
                      <h5>{calculateTotal()}</h5>
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
