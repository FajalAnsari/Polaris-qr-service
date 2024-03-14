import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Webcam from "react-webcam"; // Import the Webcam component
import "../pages/pages.css";
import logo_home from "../images/logo.svg";
import { useDispatch } from "react-redux";
import { STORE_Q_PARAMS } from "../redux/action/action";
import AlertModal from "../components/AlertModal";

const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const locationParam = searchParams.get("location");
  const tableIdParam = searchParams.get("table_id");
  const [showAlert, setShowAlert] = useState(false);
  const webcamRef = useRef(null);

  useEffect(() => {
    if (locationParam && tableIdParam) {
      localStorage.setItem("location", locationParam);
      localStorage.setItem("table_id", tableIdParam);
    } else {
      locationParam = localStorage.getItem("location");
      tableIdParam = localStorage.getItem("table_id");
    }

    dispatch({
      type: STORE_Q_PARAMS,
      payload: {
        location: locationParam,
        table_id: tableIdParam,
      },
    });
  }, [dispatch, locationParam, tableIdParam]);

  const handleCancel = () => {
    setShowAlert(false);
  };

  const handleScanNow = () => {
    setShowAlert(false); // Close the alert modal
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user",
    };
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints })
      .then((stream) => {
        webcamRef.current.video.srcObject = stream;
      })
      .catch((error) => {
        console.error("Error opening camera:", error);
      });
  };

  return (
    <>
      <div className="bg-img">
        <div className="transparent-box ">
          <div className="logo-box">
            <img src={logo_home} alt="Logo" className="logo-img" />
          </div>

          <div className="btn-box-home">
            <Link to="/checkout">
              {" "}
              <button className="half-btn m-2 w-75 text-white">Pay Now</button>
            </Link>
            <Link to="/menu">
              {" "}
              <button className="half-btn m-2 w-75 text-white">
                View Menu
              </button>
            </Link>
          </div>
        </div>
      </div>
      {showAlert && (
        <AlertModal
          message="Please scan the QR code again."
          onCancel={handleCancel}
          onScanNow={handleScanNow}
        />
      )}
      <Webcam
        audio={false}
        ref={webcamRef}
        style={{ display: "none" }} // Hide the webcam element initially
      />
    </>
  );
};

export default Home;
