import React, { useState, useEffect } from "react";

function ViewBill() {
  const orderNumber = localStorage.getItem("order_num"); // Assuming order_num stores the order number
  const tableNumber = localStorage.getItem("table_id");
  const locationCode = localStorage.getItem("location");
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const endpoint = `http://192.168.0.12/liblib/branch_setup/api/order?location=${locationCode}&table_id=${tableNumber}&order_no=${orderNumber}`;
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setOrderDetails(data);
      })
      .catch((error) => {
        console.log("failed to load : ", error);
      });
  }, [orderNumber]);

  return (
    <>
      {orderDetails ? (
        <div>
          <h3>Order Number: {orderNumber}</h3> {/* Access orderNumber directly */}
          <h4>Table Number: {orderDetails.table_id}</h4>
          <h4>Location: {orderDetails.loc_code}</h4>
          <ul>
            {orderDetails.items.map((item) => (
              <li key={item.id}>
                {item.description} - Qty: {item.quantity} - Price: {item.unit_price}
              </li>
            ))}
          </ul>
          <p>Total Delivery Amount: {orderDetails.delivery_amount}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default ViewBill;