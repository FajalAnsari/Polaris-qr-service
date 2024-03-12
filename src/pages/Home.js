import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../pages/pages.css';
import logo_home from "../images/logo.svg";
import { useDispatch } from 'react-redux';
import { STORE_Q_PARAMS } from '../redux/action/action';

const Home = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const locationParam = searchParams.get('location');
    const tableIdParam = searchParams.get('table_id');

    useEffect(() => {
        const storedLocation = localStorage.getItem('location');
        const storedTableId = localStorage.getItem('table_id');

        if (!storedLocation || !storedTableId) {
            if (!locationParam || !tableIdParam) {
                alert('Please scan the QR code again.');
            } else {
                dispatch({
                    type: STORE_Q_PARAMS,
                    payload: {
                        location: locationParam,
                        table_id: tableIdParam
                    }
                });
                localStorage.setItem('location', locationParam);
                localStorage.setItem('table_id', tableIdParam);
            }
        } else {
            dispatch({
                type: STORE_Q_PARAMS,
                payload: {
                    location: storedLocation,
                    table_id: storedTableId
                }
            });
        }
    }, [dispatch, locationParam, tableIdParam]);

    return (
        <>
            <div className="bg-img">
                <div className="transparent-box ">
                    <div className="logo-box">
                        <img src={logo_home} alt="Logo" className="logo-img" />
                    </div>

                    <div className="btn-box-home">
                        <Link to="/checkout"> <button className="half-btn m-2 w-75 text-white">Pay Now</button></Link>
                        <Link to="/menu">   <button className="half-btn m-2 w-75 text-white">View Menu</button></Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
