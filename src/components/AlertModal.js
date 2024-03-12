import React from 'react';
import '../components/AlertModal.css';

const AlertModal = ({ message, onCancel, onScanNow }) => {
    return (
        <div className="alert-modal">
            <p>{message}</p>
            <div className="button-container">
                <button className="cancel-button" onClick={onCancel}>Cancel</button>
                <button className="scan-now-button" onClick={onScanNow}>Scan Now</button>
            </div>
        </div>
    );
};

export default AlertModal;
