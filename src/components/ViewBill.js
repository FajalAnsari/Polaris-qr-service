import React, { useState, useEffect } from 'react';

const BillDetails = () => {
    const [orderDetails, setOrderDetails] = useState(null);
    const [orderNumber, setOrderNumber] = useState(null);

    useEffect(() => {
        if (orderNumber) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`http://192.168.0.12/liblib/branch_setup/api/order?location=LLRWA&table_id=1&order_no=${orderNumber}`);
                    const data = await response.json();
                    setOrderDetails(data);
                } catch (error) {
                    console.error('Error fetching order details:', error);
                }
            };

            fetchData();
        }
    }, [orderNumber]);

    const handleOrderHistory = async () => {
        try {
            const response = await fetch('http://192.168.0.12/liblib/branch_setup/api/order?location=LLRWA&table_id=1');
            const data = await response.json();
            const latestOrder = data.find(order => order.order_no);
            setOrderNumber(latestOrder.order_no);
        } catch (error) {
            console.error('Error fetching order history:', error);
        }
    };

    return (
        <div>
            <h2>Order Details</h2>
            {orderDetails ? (
                <>
                    <p>Table ID: {orderDetails.table_id}</p>
                    <p>Location Code: {orderDetails.loc_code}</p>
                    <p>Order Number: {orderDetails.items[0].order_no}</p>
                    {/* You can add more details here */}
                </>
            ) : (
                <p>No order details available</p>
            )}
            <button onClick={handleOrderHistory}>Order History</button>
        </div>
    );
};

export default BillDetails;
